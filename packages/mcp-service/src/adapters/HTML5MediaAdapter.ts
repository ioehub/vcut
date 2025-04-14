import EventEmitter from 'eventemitter3';
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
} from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * HTML5 미디어 어댑터 클래스
 * HTML5 비디오/오디오 요소와 통합하기 위한 어댑터
 */
export class HTML5MediaAdapter implements MediaController {
  private id: string;
  private mediaElement: HTMLVideoElement | HTMLAudioElement | null = null;
  private mediaInfo: MediaInfo;
  private state: MediaState = MediaState.IDLE;
  private eventEmitter: EventEmitter;
  private startTime: number = 0;
  private endTime: number = 0;
  private loop: boolean = false;
  private timeUpdateInterval: number | null = null;

  /**
   * HTML5MediaAdapter 생성자
   * @param mediaElement HTML 비디오/오디오 요소 (선택 사항)
   * @param id 미디어 ID (선택 사항, 제공하지 않으면 자동 생성)
   */
  constructor(mediaElement?: HTMLVideoElement | HTMLAudioElement, id?: string) {
    this.id = id || uuidv4();
    this.eventEmitter = new EventEmitter();
    
    this.mediaInfo = {
      id: this.id,
      type: MediaType.VIDEO,
      source: ''
    };
    
    if (mediaElement) {
      this.attachMediaElement(mediaElement);
    }
  }

  /**
   * HTML 미디어 요소 연결
   * @param mediaElement HTML 비디오/오디오 요소
   */
  public attachMediaElement(mediaElement: HTMLVideoElement | HTMLAudioElement): void {
    // 기존 미디어 요소가 있으면 이벤트 리스너 제거
    if (this.mediaElement) {
      this.detachMediaElement();
    }
    
    this.mediaElement = mediaElement;
    this.mediaInfo.type = mediaElement instanceof HTMLVideoElement ? MediaType.VIDEO : MediaType.AUDIO;
    
    // 미디어 요소에 이벤트 리스너 추가
    this.addMediaElementEventListeners();
    
    // 미디어 요소에 소스가 있으면 미디어 정보 업데이트
    if (mediaElement.src) {
      this.mediaInfo.source = mediaElement.src;
      
      if (mediaElement.readyState >= 1) {
        this.updateMediaInfo();
      }
    }
  }

  /**
   * HTML 미디어 요소 분리
   */
  public detachMediaElement(): void {
    if (this.mediaElement) {
      this.removeMediaElementEventListeners();
      this.mediaElement = null;
    }
    
    this.stopTimeUpdateInterval();
  }

  /**
   * 미디어 로드
   * @param source 미디어 소스 URL 또는 미디어 정보 객체
   * @param options 미디어 제어 옵션
   */
  public async load(source: string | MediaInfo, options?: MediaControlOptions): Promise<void> {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    try {
      this.setState(MediaState.LOADING);
      
      // 미디어 정보 설정
      if (typeof source === 'string') {
        this.mediaInfo = {
          id: this.id,
          type: this.mediaElement instanceof HTMLVideoElement ? MediaType.VIDEO : MediaType.AUDIO,
          source
        };
        this.mediaElement.src = source;
      } else {
        this.mediaInfo = {
          ...source,
          id: this.id
        };
        this.mediaElement.src = source.source;
      }
      
      // 옵션 적용
      if (options) {
        if (options.volume !== undefined) {
          this.mediaElement.volume = options.volume;
        }
        
        if (options.muted !== undefined) {
          this.mediaElement.muted = options.muted;
        }
        
        if (options.playbackRate !== undefined) {
          this.mediaElement.playbackRate = options.playbackRate;
        }
        
        this.loop = options.loop !== undefined ? options.loop : false;
        this.startTime = options.startTime !== undefined ? options.startTime : 0;
        this.endTime = options.endTime !== undefined ? options.endTime : 0;
      }
      
      // 미디어 로드
      await new Promise<void>((resolve, reject) => {
        if (!this.mediaElement) {
          reject(new Error('No media element attached'));
          return;
        }
        
        const loadedMetadataHandler = () => {
          this.updateMediaInfo();
          
          // 종료 시간 설정
          if (this.endTime <= 0 || this.endTime > this.mediaElement!.duration) {
            this.endTime = this.mediaElement!.duration;
          }
          
          // 시작 시간 설정
          if (this.startTime > 0) {
            this.mediaElement!.currentTime = this.startTime;
          }
          
          this.mediaElement!.removeEventListener('loadedmetadata', loadedMetadataHandler);
          this.setState(MediaState.READY);
          resolve();
        };
        
        const errorHandler = (e: Event) => {
          this.mediaElement!.removeEventListener('error', errorHandler);
          this.mediaElement!.removeEventListener('loadedmetadata', loadedMetadataHandler);
          this.setState(MediaState.ERROR);
          reject(new Error('Failed to load media'));
        };
        
        this.mediaElement.addEventListener('loadedmetadata', loadedMetadataHandler);
        this.mediaElement.addEventListener('error', errorHandler);
        
        // 이미 메타데이터가 로드된 경우
        if (this.mediaElement.readyState >= 1) {
          loadedMetadataHandler();
        }
      });
      
      // 자동 재생
      if (options?.autoPlay) {
        await this.play();
      }
      
      // 시간 업데이트 간격 시작
      this.startTimeUpdateInterval();
      
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
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    if (this.state === MediaState.PLAYING) {
      return;
    }
    
    try {
      this.setState(MediaState.PLAYING);
      await this.mediaElement.play();
      this.startTimeUpdateInterval();
    } catch (error) {
      this.setState(MediaState.PAUSED);
      throw error;
    }
  }

  /**
   * 일시 정지
   */
  public async pause(): Promise<void> {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    if (this.state !== MediaState.PLAYING) {
      return;
    }
    
    this.mediaElement.pause();
    this.setState(MediaState.PAUSED);
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
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    this.mediaElement.pause();
    this.mediaElement.currentTime = this.startTime;
    this.setState(MediaState.READY);
    this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.mediaElement.currentTime });
  }

  /**
   * 특정 시간으로 이동
   * @param time 이동할 시간 (초)
   * @param options 시크 옵션
   */
  public async seek(time: number, options?: SeekOptions): Promise<void> {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    this.setState(MediaState.SEEKING);
    this.emitEvent(MediaEventType.SEEKING, { time });
    
    // 상대적 시크인 경우 현재 시간에 추가
    if (options?.relative) {
      this.mediaElement.currentTime += time;
    } else {
      this.mediaElement.currentTime = time;
    }
    
    // 범위 제한
    if (this.mediaElement.currentTime < this.startTime) {
      this.mediaElement.currentTime = this.startTime;
    } else if (this.mediaElement.currentTime > this.endTime) {
      this.mediaElement.currentTime = this.endTime;
    }
  }

  /**
   * 볼륨 설정
   * @param volume 볼륨 값 (0-1)
   */
  public setVolume(volume: number): void {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    // 볼륨 범위 제한
    this.mediaElement.volume = Math.max(0, Math.min(volume, 1));
  }

  /**
   * 음소거 설정
   * @param muted 음소거 여부
   */
  public setMuted(muted: boolean): void {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    this.mediaElement.muted = muted;
  }

  /**
   * 음소거 토글
   */
  public toggleMute(): void {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    this.mediaElement.muted = !this.mediaElement.muted;
  }

  /**
   * 재생 속도 설정
   * @param rate 재생 속도 (1.0 = 정상 속도)
   */
  public setPlaybackRate(rate: number): void {
    if (!this.mediaElement) {
      throw new Error('No media element attached');
    }
    
    this.mediaElement.playbackRate = rate;
  }

  /**
   * 현재 상태 가져오기
   * @returns 미디어 상태 객체
   */
  public getStatus(): MediaStatus {
    if (!this.mediaElement) {
      return {
        id: this.id,
        state: this.state,
        currentTime: 0,
        duration: 0,
        volume: 0,
        muted: false,
        playbackRate: 1,
        buffered: 0,
        mediaInfo: this.mediaInfo
      };
    }
    
    // 버퍼링 계산
    let buffered = 0;
    if (this.mediaElement.buffered.length > 0) {
      buffered = this.mediaElement.buffered.end(this.mediaElement.buffered.length - 1) / this.mediaElement.duration;
    }
    
    return {
      id: this.id,
      state: this.state,
      currentTime: this.mediaElement.currentTime,
      duration: this.mediaElement.duration || 0,
      volume: this.mediaElement.volume,
      muted: this.mediaElement.muted,
      playbackRate: this.mediaElement.playbackRate,
      buffered,
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
    this.detachMediaElement();
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
   * 미디어 요소 이벤트 리스너 추가
   */
  private addMediaElementEventListeners(): void {
    if (!this.mediaElement) return;
    
    // 미디어 이벤트 핸들러
    this.mediaElement.addEventListener('play', this.handlePlay);
    this.mediaElement.addEventListener('pause', this.handlePause);
    this.mediaElement.addEventListener('ended', this.handleEnded);
    this.mediaElement.addEventListener('seeking', this.handleSeeking);
    this.mediaElement.addEventListener('seeked', this.handleSeeked);
    this.mediaElement.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.mediaElement.addEventListener('volumechange', this.handleVolumeChange);
    this.mediaElement.addEventListener('ratechange', this.handleRateChange);
    this.mediaElement.addEventListener('waiting', this.handleWaiting);
    this.mediaElement.addEventListener('error', this.handleError);
    this.mediaElement.addEventListener('progress', this.handleProgress);
  }

  /**
   * 미디어 요소 이벤트 리스너 제거
   */
  private removeMediaElementEventListeners(): void {
    if (!this.mediaElement) return;
    
    this.mediaElement.removeEventListener('play', this.handlePlay);
    this.mediaElement.removeEventListener('pause', this.handlePause);
    this.mediaElement.removeEventListener('ended', this.handleEnded);
    this.mediaElement.removeEventListener('seeking', this.handleSeeking);
    this.mediaElement.removeEventListener('seeked', this.handleSeeked);
    this.mediaElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.mediaElement.removeEventListener('volumechange', this.handleVolumeChange);
    this.mediaElement.removeEventListener('ratechange', this.handleRateChange);
    this.mediaElement.removeEventListener('waiting', this.handleWaiting);
    this.mediaElement.removeEventListener('error', this.handleError);
    this.mediaElement.removeEventListener('progress', this.handleProgress);
  }

  /**
   * 미디어 정보 업데이트
   */
  private updateMediaInfo(): void {
    if (!this.mediaElement) return;
    
    this.mediaInfo.duration = this.mediaElement.duration;
    
    if (this.mediaElement instanceof HTMLVideoElement) {
      this.mediaInfo.width = this.mediaElement.videoWidth;
      this.mediaInfo.height = this.mediaElement.videoHeight;
    }
    
    this.emitEvent(MediaEventType.LOADED_METADATA, {
      duration: this.mediaInfo.duration,
      width: this.mediaInfo.width,
      height: this.mediaInfo.height
    });
  }

  /**
   * 시간 업데이트 간격 시작
   */
  private startTimeUpdateInterval(): void {
    if (this.timeUpdateInterval) {
      this.stopTimeUpdateInterval();
    }
    
    // 100ms 간격으로 시간 업데이트 이벤트 발생
    this.timeUpdateInterval = window.setInterval(() => {
      if (!this.mediaElement) return;
      
      // 종료 시간 체크
      if (this.mediaElement.currentTime >= this.endTime && this.state === MediaState.PLAYING) {
        if (this.loop) {
          this.mediaElement.currentTime = this.startTime;
        } else {
          this.mediaElement.pause();
          this.setState(MediaState.ENDED);
          this.emitEvent(MediaEventType.ENDED, {});
        }
      }
      
      this.emitEvent(MediaEventType.TIME_UPDATE, { currentTime: this.mediaElement.currentTime });
    }, 100);
  }

  /**
   * 시간 업데이트 간격 중지
   */
  private stopTimeUpdateInterval(): void {
    if (this.timeUpdateInterval) {
      window.clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
  }

  // 이벤트 핸들러
  private handlePlay = (): void => {
    this.setState(MediaState.PLAYING);
  };
  
  private handlePause = (): void => {
    if (this.state !== MediaState.ENDED) {
      this.setState(MediaState.PAUSED);
    }
  };
  
  private handleEnded = (): void => {
    this.setState(MediaState.ENDED);
    this.emitEvent(MediaEventType.ENDED, {});
  };
  
  private handleSeeking = (): void => {
    this.setState(MediaState.SEEKING);
    this.emitEvent(MediaEventType.SEEKING, { time: this.mediaElement?.currentTime });
  };
  
  private handleSeeked = (): void => {
    this.emitEvent(MediaEventType.SEEKED, { currentTime: this.mediaElement?.currentTime });
    
    if (this.mediaElement?.paused) {
      this.setState(MediaState.PAUSED);
    } else {
      this.setState(MediaState.PLAYING);
    }
  };
  
  private handleLoadedMetadata = (): void => {
    this.updateMediaInfo();
  };
  
  private handleVolumeChange = (): void => {
    if (!this.mediaElement) return;
    
    this.emitEvent(MediaEventType.VOLUME_CHANGE, { volume: this.mediaElement.volume });
    this.emitEvent(MediaEventType.MUTE_CHANGE, { muted: this.mediaElement.muted });
  };
  
  private handleRateChange = (): void => {
    if (!this.mediaElement) return;
    
    this.emitEvent(MediaEventType.PLAYBACK_RATE_CHANGE, { playbackRate: this.mediaElement.playbackRate });
  };
  
  private handleWaiting = (): void => {
    this.setState(MediaState.BUFFERING);
  };
  
  private handleError = (e: Event): void => {
    this.setState(MediaState.ERROR);
    this.emitEvent(MediaEventType.ERROR, { error: this.mediaElement?.error });
  };
  
  private handleProgress = (): void => {
    if (!this.mediaElement) return;
    
    let buffered = 0;
    if (this.mediaElement.buffered.length > 0) {
      buffered = this.mediaElement.buffered.end(this.mediaElement.buffered.length - 1) / this.mediaElement.duration;
    }
    
    this.emitEvent(MediaEventType.BUFFER_UPDATE, { buffered });
  };
}
