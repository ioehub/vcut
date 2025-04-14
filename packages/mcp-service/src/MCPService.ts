import EventEmitter from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';
import {
  MediaType,
  MediaState,
  MediaEventType,
  MediaInfo,
  MediaStatus,
  MediaEvent,
  MediaControlOptions,
  SeekOptions,
  MediaController
} from './types';

/**
 * 미디어 제어 프로토콜 서비스 클래스
 * 비디오 및 오디오 재생 제어를 위한 서비스
 */
export class MCPService implements MediaController {
  private id: string;
  private mediaInfo: MediaInfo;
  private state: MediaState = MediaState.IDLE;
  private currentTime: number = 0;
  private duration: number = 0;
  private volume: number = 1;
  private muted: boolean = false;
  private playbackRate: number = 1;
  private buffered: number = 0;
  private loop: boolean = false;
  private startTime: number = 0;
  private endTime: number = 0;
  private eventEmitter: EventEmitter;
  private lastUpdateTime: number = 0;
  private updateInterval: NodeJS.Timeout | null = null;

  /**
   * MCPService 생성자
   * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
   */
  constructor(id?: string) {
    this.id = id || uuidv4();
    this.mediaInfo = {
      id: this.id,
      type: MediaType.VIDEO,
      source: ''
    };
    this.eventEmitter = new EventEmitter();
  }

  /**
   * 미디어 로드
   * @param source 미디어 소스 URL 또는 미디어 정보 객체
   * @param options 미디어 제어 옵션
   */
  public async load(source: string | MediaInfo, options?: MediaControlOptions): Promise<void> {
    try {
      this.setState(MediaState.LOADING);
      
      // 미디어 정보 설정
      if (typeof source === 'string') {
        this.mediaInfo = {
          id: this.id,
          type: this.determineMediaType(source),
          source
        };
      } else {
        this.mediaInfo = {
          ...source,
          id: this.id
        };
      }

      // 옵션 적용
      if (options) {
        this.volume = options.volume !== undefined ? options.volume : this.volume;
        this.muted = options.muted !== undefined ? options.muted : this.muted;
        this.playbackRate = options.playbackRate !== undefined ? options.playbackRate : this.playbackRate;
        this.loop = options.loop !== undefined ? options.loop : this.loop;
        this.startTime = options.startTime !== undefined ? options.startTime : 0;
        this.endTime = options.endTime !== undefined ? options.endTime : 0;
      }

      // 미디어 메타데이터 로드 시뮬레이션
      await this.loadMediaMetadata();

      // 시작 시간 설정
      if (this.startTime > 0 && this.startTime < this.duration) {
        this.currentTime = this.startTime;
      }

      // 종료 시간 설정
      if (this.endTime > 0 && this.endTime <= this.duration) {
        this.endTime = this.endTime;
      } else {
        this.endTime = this.duration;
      }

      // 상태 업데이트
      this.setState(MediaState.READY);
      this.emitEvent(MediaEventType.LOADED_METADATA, {
        duration: this.duration,
        width: this.mediaInfo.width,
        height: this.mediaInfo.height
      });

      // 자동 재생
      if (options?.autoPlay) {
        await this.play();
      }
    } catch (error) {
      this.setState(MediaState.ERROR);
      this.emitEvent(MediaEventType.ERROR, { error });
      throw error;
    }
  }

  /**
   * 재생 시작
   */
  public async play(): Promise<void> {
    if (this.state === MediaState.PLAYING) {
      return;
    }

    if (this.state !== MediaState.READY && this.state !== MediaState.PAUSED) {
      throw new Error('Cannot play media in current state: ' + this.state);
    }

    this.setState(MediaState.PLAYING);
    this.startTimeUpdates();
    
    return Promise.resolve();
  }

  /**
   * 일시 정지
   */
  public async pause(): Promise<void> {
    if (this.state !== MediaState.PLAYING) {
      return;
    }

    this.setState(MediaState.PAUSED);
    this.stopTimeUpdates();
    
    return Promise.resolve();
  }

  /**
   * 재생/일시정지 토글
   */
  public async togglePlay(): Promise<void> {
    if (this.state === MediaState.PLAYING) {
      return this.pause();
    } else {
      return this.play();
    }
  }

  /**
   * 정지 (처음으로 돌아가고 일시 정지)
   */
  public async stop(): Promise<void> {
    this.stopTimeUpdates();
    this.currentTime = this.startTime;
    this.setState(MediaState.READY);
    this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.currentTime });
    
    return Promise.resolve();
  }

  /**
   * 특정 시간으로 이동
   * @param time 이동할 시간 (초)
   * @param options 시크 옵션
   */
  public async seek(time: number, options?: SeekOptions): Promise<void> {
    const wasPlaying = this.state === MediaState.PLAYING;
    
    if (wasPlaying) {
      this.stopTimeUpdates();
    }

    this.setState(MediaState.SEEKING);
    this.emitEvent(MediaEventType.SEEKING, { time });

    // 상대적 시크인 경우 현재 시간에 추가
    if (options?.relative) {
      this.currentTime += time;
    } else {
      this.currentTime = time;
    }

    // 범위 제한
    this.currentTime = Math.max(this.startTime, Math.min(this.currentTime, this.endTime));

    // 시크 완료 이벤트 발생 (실제로는 비동기 작업일 수 있음)
    setTimeout(() => {
      this.emitEvent(MediaEventType.SEEKED, { currentTime: this.currentTime });
      this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.currentTime });
      
      if (wasPlaying) {
        this.setState(MediaState.PLAYING);
        this.startTimeUpdates();
      } else {
        this.setState(MediaState.PAUSED);
      }
    }, 100);

    return Promise.resolve();
  }

  /**
   * 볼륨 설정
   * @param volume 볼륨 값 (0-1)
   */
  public setVolume(volume: number): void {
    // 볼륨 범위 제한
    this.volume = Math.max(0, Math.min(volume, 1));
    this.emitEvent(MediaEventType.VOLUME_CHANGE, { volume: this.volume });
  }

  /**
   * 음소거 설정
   * @param muted 음소거 여부
   */
  public setMuted(muted: boolean): void {
    this.muted = muted;
    this.emitEvent(MediaEventType.MUTE_CHANGE, { muted: this.muted });
  }

  /**
   * 음소거 토글
   */
  public toggleMute(): void {
    this.setMuted(!this.muted);
  }

  /**
   * 재생 속도 설정
   * @param rate 재생 속도 (1.0 = 정상 속도)
   */
  public setPlaybackRate(rate: number): void {
    this.playbackRate = rate;
    this.emitEvent(MediaEventType.PLAYBACK_RATE_CHANGE, { playbackRate: this.playbackRate });
  }

  /**
   * 현재 상태 가져오기
   * @returns 미디어 상태 객체
   */
  public getStatus(): MediaStatus {
    return {
      id: this.id,
      state: this.state,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      muted: this.muted,
      playbackRate: this.playbackRate,
      buffered: this.buffered,
      mediaInfo: this.mediaInfo
    };
  }

  /**
   * 미디어 정보 가져오기
   * @returns 미디어 정보 객체
   */
  public getMediaInfo(): MediaInfo {
    return this.mediaInfo;
  }

  /**
   * 이벤트 리스너 등록
   * @param event 이벤트 타입
   * @param callback 콜백 함수
   */
  public on(event: MediaEventType, callback: (event: MediaEvent) => void): void {
    this.eventEmitter.on(event, callback);
  }

  /**
   * 이벤트 리스너 제거
   * @param event 이벤트 타입
   * @param callback 콜백 함수
   */
  public off(event: MediaEventType, callback: (event: MediaEvent) => void): void {
    this.eventEmitter.off(event, callback);
  }

  /**
   * 모든 이벤트 리스너 제거
   */
  public removeAllListeners(): void {
    this.eventEmitter.removeAllListeners();
  }

  /**
   * 미디어 컨트롤러 해제
   */
  public dispose(): void {
    this.stopTimeUpdates();
    this.removeAllListeners();
    this.setState(MediaState.IDLE);
  }

  /**
   * 상태 설정
   * @param state 새 상태
   */
  private setState(state: MediaState): void {
    if (this.state !== state) {
      this.state = state;
      this.emitEvent(MediaEventType.STATE_CHANGE, { state });
    }
  }

  /**
   * 이벤트 발생
   * @param type 이벤트 타입
   * @param data 이벤트 데이터
   */
  private emitEvent(type: MediaEventType, data?: any): void {
    const event: MediaEvent = {
      type,
      mediaId: this.id,
      data,
      timestamp: Date.now()
    };
    this.eventEmitter.emit(type, event);
  }

  /**
   * 시간 업데이트 시작
   */
  private startTimeUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.lastUpdateTime = Date.now();
    
    // 100ms 간격으로 시간 업데이트
    this.updateInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;

      // 재생 속도 적용
      this.currentTime += elapsed * this.playbackRate;

      // 종료 시간 체크
      if (this.currentTime >= this.endTime) {
        if (this.loop) {
          this.currentTime = this.startTime;
          this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.currentTime });
        } else {
          this.currentTime = this.endTime;
          this.stopTimeUpdates();
          this.setState(MediaState.ENDED);
          this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.currentTime });
          this.emitEvent(MediaEventType.ENDED, {});
          return;
        }
      }

      // 버퍼링 시뮬레이션
      this.updateBuffered();

      // 시간 업데이트 이벤트 발생
      this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.currentTime });
    }, 100);
  }

  /**
   * 시간 업데이트 중지
   */
  private stopTimeUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * 버퍼링 업데이트
   */
  private updateBuffered(): void {
    // 실제 구현에서는 미디어 요소의 버퍼링 상태를 확인
    // 여기서는 간단한 시뮬레이션만 수행
    const newBuffered = Math.min(1, this.currentTime / this.duration + 0.1);
    
    if (newBuffered !== this.buffered) {
      this.buffered = newBuffered;
      this.emitEvent(MediaEventType.BUFFER_UPDATE, { buffered: this.buffered });
    }

    // 버퍼링 상태 시뮬레이션 (5% 확률로 버퍼링 발생)
    if (Math.random() < 0.05 && this.state === MediaState.PLAYING) {
      this.setState(MediaState.BUFFERING);
      
      // 1초 후 다시 재생 상태로 전환
      setTimeout(() => {
        if (this.state === MediaState.BUFFERING) {
          this.setState(MediaState.PLAYING);
        }
      }, 1000);
    }
  }

  /**
   * 미디어 타입 결정
   * @param source 미디어 소스 URL
   * @returns 미디어 타입
   */
  private determineMediaType(source: string): MediaType {
    const extension = source.split('.').pop()?.toLowerCase();
    
    if (extension) {
      const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
      const audioExtensions = ['mp3', 'wav', 'aac', 'flac', 'ogg'];
      
      if (videoExtensions.includes(extension)) {
        return MediaType.VIDEO;
      } else if (audioExtensions.includes(extension)) {
        return MediaType.AUDIO;
      }
    }
    
    // 기본값은 비디오
    return MediaType.VIDEO;
  }

  /**
   * 미디어 메타데이터 로드
   * 실제 구현에서는 미디어 파일에서 메타데이터를 추출
   */
  private async loadMediaMetadata(): Promise<void> {
    return new Promise<void>((resolve) => {
      // 메타데이터 로드 시뮬레이션 (실제로는 비동기 작업)
      setTimeout(() => {
        // 기본 메타데이터 설정
        this.duration = 120; // 2분 기본 길이
        
        // 미디어 타입에 따라 다른 메타데이터 설정
        if (this.mediaInfo.type === MediaType.VIDEO) {
          this.mediaInfo.width = 1280;
          this.mediaInfo.height = 720;
          this.mediaInfo.bitrate = 5000000; // 5 Mbps
          this.mediaInfo.codec = 'h264';
        } else {
          this.mediaInfo.bitrate = 320000; // 320 kbps
          this.mediaInfo.codec = 'aac';
        }
        
        resolve();
      }, 500);
    });
  }
}
