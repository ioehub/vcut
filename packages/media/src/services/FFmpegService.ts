import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { MediaMetadata, MediaType, ThumbnailOptions } from '../types';

/**
 * FFmpeg 기반 미디어 처리 서비스
 */
export class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private loaded = false;
  private loading = false;
  private logs: string = '';
  private loadAttempts = 0;
  private maxLoadAttempts = 3;
  private loadPromise: Promise<void> | null = null;

  /**
   * FFmpeg 인스턴스를 로드합니다
   */
  async load(): Promise<void> {
    if (this.loaded) return;
    
    // 이미 로딩 중인 경우 기존 Promise 반환
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }
    
    if (this.loadAttempts >= this.maxLoadAttempts) {
      console.warn(`FFmpeg 로드 최대 시도 횟수(${this.maxLoadAttempts}회) 초과, 대체 방법으로 전환`);
      this.loaded = true; // 로드 실패 시에도 기본 기능이 작동하도록 loaded 플래그 설정
      return;
    }
    
    this.loading = true;
    this.loadAttempts++;
    console.log(`FFmpeg 로드 시도 ${this.loadAttempts}/${this.maxLoadAttempts}`);

    this.ffmpeg = new FFmpeg();
    
    // 로그 수집을 위한 이벤트 리스너 설정
    this.ffmpeg.on('log', ({ message }) => {
      this.logs += message + '\n';
      console.log('FFmpeg 로그:', message);
    });
    
    // 로드 Promise 생성
    this.loadPromise = (async () => {
      try {
        console.log('FFmpeg 로드 시작 v1.5');
        
        // SharedArrayBuffer 지원 확인
        if (typeof SharedArrayBuffer === 'undefined') {
          console.warn('SharedArrayBuffer가 지원되지 않습니다. COOP/COEP 설정을 확인하세요.');
        } else {
          console.log('SharedArrayBuffer 지원됨');
        }
        
        // 로컬 파일 경로 사용 (baseURL 설정)
        // public 폴더의 파일은 빌드 시 그대로 복사되므로 URL로 접근해야 함
        const baseURL = window.location.origin;
        
        // ffmpeg가 null이 아닌지 확인
        if (this.ffmpeg) {
          await this.ffmpeg.load({
            coreURL: `${baseURL}/ffmpeg/ffmpeg-core.js`,
            wasmURL: `${baseURL}/ffmpeg/ffmpeg-core.wasm`,
            workerURL: `${baseURL}/ffmpeg/ffmpeg-core.worker.js`,
          });
        } else {
          throw new Error('FFmpeg 인스턴스가 null입니다.');
        }
        
        this.loaded = true;
        this.loadAttempts = 0; // 성공 시 시도 횟수 초기화
        console.log('FFmpeg 로드 완료 (로컬 파일)');
      } catch (error: any) {
        console.error('FFmpeg 로드 실패 (로컬 파일):', error);
        
        // 대체 방법: FFmpeg 없이 기본 메타데이터 및 썸네일 생성
        if (this.loadAttempts >= this.maxLoadAttempts) {
          console.warn('FFmpeg 로드 실패, 대체 방법으로 전환');
          // 로드 실패 시에도 기본 기능이 작동하도록 loaded 플래그 설정
          this.loaded = true;
          this.loadAttempts = 0;
        } else {
          // 재시도
          console.log('FFmpeg 로드 재시도...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
          this.loading = false;
          await this.load(); // 재귀적 재시도
        }
      } finally {
        this.loading = false;
      }
    })();
    
    return this.loadPromise;
  }

  /**
   * 미디어 파일의 메타데이터를 추출합니다
   * @param file 미디어 파일
   * @returns 미디어 메타데이터
   */
  async extractMetadata(file: File): Promise<MediaMetadata> {
    await this.ensureLoaded();
    
    try {
      // 로그 초기화
      this.logs = '';
      console.log(`파일 메타데이터 추출 시작: ${file.name}, 크기: ${file.size}바이트`);
      
      // FFmpeg가 로드되지 않았거나 오류가 발생한 경우 기본 메타데이터 반환
      if (!this.ffmpeg) {
        console.warn('FFmpeg를 사용할 수 없어 기본 메타데이터 반환');
        return this.createBasicMetadata(file);
      }
      
      // 파일 업로드
      await this.ffmpeg.writeFile('input', await fetchFile(file));
      console.log('파일 업로드 완료');
      
      // 파일 타입 감지
      const type = this.detectMediaType(file.name);
      console.log(`감지된 미디어 타입: ${type}`);
      
      // 메타데이터 추출 명령 실행
      console.log('메타데이터 추출 명령 실행');
      await this.ffmpeg.exec(['-i', 'input', '-f', 'null', '-']);
      
      // 기본 메타데이터
      const metadata: MediaMetadata = {
        width: 0,
        height: 0,
        duration: this.extractDuration(this.logs),
        bitRate: this.extractBitrate(this.logs),
        codec: this.extractCodec(this.logs, type),
      };
      
      // 비디오 또는 이미지인 경우 해상도 추출
      if (type === MediaType.VIDEO || type === MediaType.IMAGE) {
        const resolution = this.extractResolution(this.logs);
        metadata.width = resolution.width;
        metadata.height = resolution.height;
      }
      
      // 오디오인 경우 추가 정보 추출
      if (type === MediaType.AUDIO) {
        metadata.channels = this.extractAudioChannels(this.logs);
        metadata.sampleRate = this.extractSampleRate(this.logs);
      }
      
      console.log('메타데이터 추출 완료:', metadata);
      return metadata;
    } catch (error: any) {
      console.error('메타데이터 추출 실패:', error);
      
      // 오류 발생 시 기본 메타데이터 반환
      return this.createBasicMetadata(file);
    } finally {
      // 임시 파일 정리
      if (this.ffmpeg) {
        await this.ffmpeg.deleteFile('input').catch((err) => {
          console.error('임시 파일 삭제 실패:', err);
        });
      }
    }
  }

  /**
   * 기본 메타데이터를 생성합니다 (FFmpeg 없이)
   * @param file 미디어 파일
   * @returns 기본 메타데이터
   */
  private createBasicMetadata(file: File): MediaMetadata | Promise<MediaMetadata> {
    const type = this.detectMediaType(file.name);
    console.log(`기본 메타데이터 생성 (타입: ${type})`);
    
    // 오디오 파일의 경우 Web Audio API로 길이 추출 시도
    if (type === MediaType.AUDIO && typeof window !== 'undefined' && window.AudioContext) {
      return new Promise<MediaMetadata>((resolve) => {
        try {
          const audioContext = new AudioContext();
          const reader = new FileReader();
          
          reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
              resolve({
                width: 0,
                height: 0,
                duration: audioBuffer.duration,
                bitRate: Math.round((file.size * 8) / audioBuffer.duration / 1000),
                codec: 'mp3',
                channels: audioBuffer.numberOfChannels,
                sampleRate: audioBuffer.sampleRate
              });
            }, (err) => {
              console.error('오디오 디코딩 실패:', err);
              resolve(this.createFallbackMetadata(file, type));
            });
          };
          
          reader.onerror = () => {
            resolve(this.createFallbackMetadata(file, type));
          };
          
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error('Web Audio API 사용 실패:', error);
          resolve(this.createFallbackMetadata(file, type));
        }
      });
    }
    
    // 그 외 파일 타입이나 Web Audio API 사용 불가 시
    return this.createFallbackMetadata(file, type);
  }
  
  /**
   * 최후의 대체 메타데이터를 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @returns 대체 메타데이터
   */
  private createFallbackMetadata(file: File, type: MediaType): MediaMetadata {
    // 파일 크기 기반 예상 길이 (매우 대략적인 추정)
    let estimatedDuration = 0;
    
    if (type === MediaType.AUDIO) {
      // MP3 파일의 경우 대략 128kbps로 가정 (매우 대략적인 추정)
      estimatedDuration = (file.size * 8) / (128 * 1024);
    } else if (type === MediaType.VIDEO) {
      // 비디오 파일의 경우 대략 1Mbps로 가정 (매우 대략적인 추정)
      estimatedDuration = (file.size * 8) / (1024 * 1024);
    }
    
    return {
      width: type === MediaType.IMAGE || type === MediaType.VIDEO ? 640 : 0,
      height: type === MediaType.IMAGE || type === MediaType.VIDEO ? 480 : 0,
      duration: estimatedDuration,
      bitRate: type === MediaType.AUDIO ? 128 : 0,
      codec: type === MediaType.AUDIO ? 'mp3' : 'unknown',
      channels: type === MediaType.AUDIO ? 2 : undefined,
      sampleRate: type === MediaType.AUDIO ? 44100 : undefined
    };
  }

  /**
   * 미디어 파일에서 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param options 썸네일 옵션
   * @returns 썸네일 URL (base64)
   */
  async generateThumbnail(file: File, type: MediaType, options: ThumbnailOptions = {}): Promise<string> {
    await this.ensureLoaded();
    
    const { width = 320, height = 180, quality = 90, time = 0 } = options;
    console.log(`썸네일 생성 시작: ${file.name}, 타입: ${type}`);
    
    // FFmpeg가 로드되지 않았거나 오류가 발생한 경우 Canvas 기반 썸네일 생성
    if (!this.ffmpeg) {
      console.warn('FFmpeg를 사용할 수 없어 Canvas 기반 썸네일 생성');
      return this.createCanvasThumbnail(file, type, width, height, quality);
    }
    
    try {
      // 파일 업로드
      await this.ffmpeg.writeFile('input', await fetchFile(file));
      console.log('썸네일용 파일 업로드 완료');
      
      if (type === MediaType.VIDEO) {
        // 비디오에서 특정 시간에 프레임 추출
        console.log(`비디오 썸네일 추출 (시간: ${time}초)`);
        await this.ffmpeg.exec([
          '-ss', time.toString(),
          '-i', 'input',
          '-vframes', '1',
          '-q:v', (Math.floor(quality / 10)).toString(),
          '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
          'thumbnail.jpg'
        ]);
      } else if (type === MediaType.IMAGE) {
        // 이미지 리사이징
        console.log('이미지 썸네일 생성');
        await this.ffmpeg.exec([
          '-i', 'input',
          '-q:v', (Math.floor(quality / 10)).toString(),
          '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
          'thumbnail.jpg'
        ]);
      } else if (type === MediaType.AUDIO) {
        // 오디오의 경우 기본 오디오 아이콘 이미지 생성
        console.log('오디오 썸네일 생성');
        
        // 오디오 파형 이미지 생성 시도
        try {
          console.log('오디오 파형 이미지 생성 시도');
          // 오디오 파형 이미지 생성
          await this.ffmpeg.exec([
            '-i', 'input',
            '-filter_complex', 'showwavespic=s=320x180:colors=#3498db',
            '-frames:v', '1',
            'thumbnail.jpg'
          ]);
          console.log('오디오 파형 이미지 생성 성공');
        } catch (error: any) {
          console.warn('오디오 파형 썸네일 생성 실패, 기본 이미지 사용:', error);
          
          // 실패 시 기본 색상 이미지에 오디오 아이콘 추가
          try {
            await this.ffmpeg.exec([
              '-f', 'lavfi',
              '-i', 'color=c=blue:s=320x180',
              '-vf', "drawtext=text='🎵':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2",
              '-frames:v', '1',
              'thumbnail.jpg'
            ]);
          } catch (error2: any) {
            console.error('기본 오디오 썸네일 생성 실패:', error2);
            // 가장 기본적인 색상 이미지 생성
            await this.ffmpeg.exec([
              '-f', 'lavfi',
              '-i', 'color=c=blue:s=320x180',
              '-frames:v', '1',
              'thumbnail.jpg'
            ]);
          }
        }
      }
      
      // 썸네일 파일 읽기
      console.log('썸네일 파일 읽기');
      const thumbnailData = await this.ffmpeg.readFile('thumbnail.jpg') as Uint8Array;
      const blob = new Blob([thumbnailData], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      
      console.log('썸네일 생성 완료');
      return url;
    } catch (error: any) {
      console.error('썸네일 생성 실패:', error);
      
      // 오류 발생 시 Canvas 기반 썸네일 생성
      return this.createCanvasThumbnail(file, type, width, height, quality);
    } finally {
      // 임시 파일 정리
      if (this.ffmpeg) {
        await this.ffmpeg.deleteFile('input').catch(() => {});
        await this.ffmpeg.deleteFile('thumbnail.jpg').catch(() => {});
      }
    }
  }
  
  /**
   * Canvas API를 사용하여 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param width 썸네일 너비
   * @param height 썸네일 높이
   * @param quality 썸네일 품질
   * @returns 썸네일 URL (base64)
   */
  private createCanvasThumbnail(file: File, type: MediaType, width: number, height: number, quality: number): Promise<string> {
    return new Promise((resolve) => {
      if (type === MediaType.IMAGE && typeof window !== 'undefined') {
        // 이미지 파일의 경우 이미지 로드 후 리사이징
        const img = new Image();
        const url = URL.createObjectURL(file);
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            // 이미지 리사이징
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', quality / 100));
          } else {
            // Canvas 컨텍스트를 가져올 수 없는 경우 기본 썸네일 생성
            URL.revokeObjectURL(url);
            resolve(this.createDefaultThumbnail(file, type, width, height, quality));
          }
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(this.createDefaultThumbnail(file, type, width, height, quality));
        };
        
        img.src = url;
      } else {
        // 이미지가 아닌 파일의 경우 기본 썸네일 생성
        resolve(this.createDefaultThumbnail(file, type, width, height, quality));
      }
    });
  }
  
  /**
   * 기본 썸네일을 생성합니다
   * @param file 미디어 파일
   * @param type 미디어 타입
   * @param width 썸네일 너비
   * @param height 썸네일 높이
   * @param quality 썸네일 품질
   * @returns 썸네일 URL (base64)
   */
  private createDefaultThumbnail(file: File, type: MediaType, width: number, height: number, quality: number): string {
    if (typeof document === 'undefined') {
      return ''; // 서버 사이드에서는 빈 문자열 반환
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return ''; // Canvas 컨텍스트를 가져올 수 없는 경우 빈 문자열 반환
    }
    
    if (type === MediaType.AUDIO) {
      // 오디오 파일용 썸네일
      // 배경색 설정 (그라데이션)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(1, '#2980b9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // 오디오 파형 시각화 (간단한 형태)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      
      // 랜덤한 파형 생성
      ctx.beginPath();
      const segments = 20;
      const segmentWidth = width / segments;
      
      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const heightFactor = Math.random() * 0.5 + 0.2; // 0.2 ~ 0.7 사이의 높이
        const y = height / 2 + (Math.sin(i * 0.5) * height * heightFactor * 0.5);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // 오디오 아이콘 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎵', width / 2, height / 2);
      
      // 파일명 표시
      ctx.font = '12px Arial';
      ctx.fillText(file.name.substring(0, 20), width / 2, height - 20);
    } else if (type === MediaType.VIDEO) {
      // 비디오 파일용 썸네일
      // 배경색 설정 (그라데이션)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#3949ab');
      gradient.addColorStop(1, '#303f9f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // 비디오 아이콘 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎬', width / 2, height / 2);
      
      // 파일명 표시
      ctx.font = '12px Arial';
      ctx.fillText(file.name.substring(0, 20), width / 2, height - 20);
    } else {
      // 기타 파일용 썸네일
      // 배경색 설정
      ctx.fillStyle = '#43a047';
      ctx.fillRect(0, 0, width, height);
      
      // 파일 아이콘 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📁', width / 2, height / 2);
      
      // 파일명 표시
      ctx.font = '12px Arial';
      ctx.fillText(file.name.substring(0, 20), width / 2, height - 20);
    }
    
    return canvas.toDataURL('image/jpeg', quality / 100);
  }

  /**
   * FFmpeg가 로드되었는지 확인하고, 로드되지 않았다면 로드합니다
   */
  private async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    
    // 이미 로딩 중인 경우 기존 Promise 반환
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }
    
    try {
      await this.load();
    } catch (error) {
      console.error('FFmpeg 로드 확인 중 오류:', error);
      // 로드 실패 시에도 기본 기능이 작동하도록 loaded 플래그 설정
      this.loaded = true;
    }
  }

  /**
   * FFmpeg 인스턴스를 종료합니다
   */
  async terminate(): Promise<void> {
    if (this.ffmpeg) {
      await this.ffmpeg.terminate();
      this.ffmpeg = null;
      this.loaded = false;
    }
  }

  /**
   * 파일 이름에서 미디어 타입을 감지합니다
   * @param filename 파일 이름
   * @returns 미디어 타입
   */
  private detectMediaType(filename: string): MediaType {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'];
    
    if (videoExtensions.includes(extension)) {
      return MediaType.VIDEO;
    } else if (audioExtensions.includes(extension)) {
      return MediaType.AUDIO;
    } else if (imageExtensions.includes(extension)) {
      return MediaType.IMAGE;
    }
    
    return MediaType.VIDEO; // 기본값은 비디오로 설정
  }

  /**
   * FFmpeg 로그에서 미디어 지속 시간을 추출합니다
   * @param log FFmpeg 로그
   * @returns 지속 시간 (초)
   */
  private extractDuration(log: string): number {
    const durationMatch = log.match(/Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/);
    
    if (durationMatch) {
      const hours = parseInt(durationMatch[1]);
      const minutes = parseInt(durationMatch[2]);
      const seconds = parseInt(durationMatch[3]);
      const centiseconds = parseInt(durationMatch[4]);
      
      return hours * 3600 + minutes * 60 + seconds + centiseconds / 100;
    }
    
    return 0;
  }

  /**
   * FFmpeg 로그에서 비트레이트를 추출합니다
   * @param log FFmpeg 로그
   * @returns 비트레이트 (kbps)
   */
  private extractBitrate(log: string): number {
    const bitrateMatch = log.match(/bitrate: (\d+) kb\/s/);
    
    if (bitrateMatch) {
      return parseInt(bitrateMatch[1]);
    }
    
    return 0;
  }

  /**
   * FFmpeg 로그에서 해상도를 추출합니다
   * @param log FFmpeg 로그
   * @returns 해상도 (width, height)
   */
  private extractResolution(log: string): { width: number, height: number } {
    const resolutionMatch = log.match(/(\d{2,5})x(\d{2,5})/);
    
    if (resolutionMatch) {
      return {
        width: parseInt(resolutionMatch[1]),
        height: parseInt(resolutionMatch[2])
      };
    }
    
    return { width: 0, height: 0 };
  }

  /**
   * FFmpeg 로그에서 코덱 정보를 추출합니다
   * @param log FFmpeg 로그
   * @param type 미디어 타입
   * @returns 코덱 이름
   */
  private extractCodec(log: string, type: MediaType): string {
    if (type === MediaType.VIDEO) {
      const videoCodecMatch = log.match(/Video: ([^,]+)/);
      return videoCodecMatch ? videoCodecMatch[1].trim() : 'unknown';
    } else if (type === MediaType.AUDIO) {
      const audioCodecMatch = log.match(/Audio: ([^,]+)/);
      return audioCodecMatch ? audioCodecMatch[1].trim() : 'unknown';
    }
    
    return 'unknown';
  }

  /**
   * FFmpeg 로그에서 오디오 채널 수를 추출합니다
   * @param log FFmpeg 로그
   * @returns 오디오 채널 수
   */
  private extractAudioChannels(log: string): number {
    const channelsMatch = log.match(/Audio: ([^,]+), (\d+) channels/);
    
    if (channelsMatch) {
      return parseInt(channelsMatch[2]);
    }
    
    return 0;
  }

  /**
   * FFmpeg 로그에서 오디오 샘플레이트를 추출합니다
   * @param log FFmpeg 로그
   * @returns 오디오 샘플레이트 (Hz)
   */
  private extractSampleRate(log: string): number {
    const sampleRateMatch = log.match(/Audio: ([^,]+), (\d+) Hz/);
    
    if (sampleRateMatch) {
      return parseInt(sampleRateMatch[2]);
    }
    
    return 0;
  }
}

export default new FFmpegService();
