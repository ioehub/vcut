import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { MediaMetadata, MediaType, ThumbnailOptions } from '../types';

/**
 * FFmpeg 기반 미디어 처리 서비스
 */
export class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  private loaded = false;

  /**
   * FFmpeg 인스턴스를 로드합니다
   */
  async load(): Promise<void> {
    if (this.loaded) return;

    this.ffmpeg = new FFmpeg();
    
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg';
      // FFmpeg 코어 및 WASM 파일 로드
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/core/dist/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/core/dist/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      this.loaded = true;
      console.log('FFmpeg 로드 완료');
    } catch (error) {
      console.error('FFmpeg 로드 실패:', error);
      throw new Error('FFmpeg를 로드할 수 없습니다');
    }
  }

  /**
   * 미디어 파일의 메타데이터를 추출합니다
   * @param file 미디어 파일
   * @returns 미디어 메타데이터
   */
  async extractMetadata(file: File): Promise<MediaMetadata> {
    await this.ensureLoaded();
    
    if (!this.ffmpeg) {
      throw new Error('FFmpeg가 초기화되지 않았습니다');
    }

    try {
      // 파일 업로드
      await this.ffmpeg.writeFile('input', await fetchFile(file));
      
      // FFprobe로 미디어 정보 추출
      await this.ffmpeg.exec([
        '-i', 'input',
        '-v', 'error',
        '-select_streams', 'v:0,a:0',
        '-show_entries', 'stream=width,height,duration,r_frame_rate,bit_rate,codec_name:stream_tags',
        '-of', 'json',
        'output.json'
      ]);
      
      // 결과 파일 읽기
      const data = await this.ffmpeg.readFile('output.json') as Uint8Array;
      const text = new TextDecoder().decode(data);
      const info = JSON.parse(text);
      
      const metadata: MediaMetadata = {};
      
      // 비디오 스트림 정보 추출
      const videoStream = info.streams?.find((s: any) => s.codec_type === 'video');
      if (videoStream) {
        metadata.width = parseInt(videoStream.width) || undefined;
        metadata.height = parseInt(videoStream.height) || undefined;
        metadata.codec = videoStream.codec_name;
        
        // 프레임 레이트 계산 (예: "24/1" -> 24)
        if (videoStream.r_frame_rate) {
          const [num, den] = videoStream.r_frame_rate.split('/').map(Number);
          metadata.frameRate = num / den;
        }
        
        metadata.bitRate = parseInt(videoStream.bit_rate) || undefined;
      }
      
      // 오디오 스트림 정보 추출
      const audioStream = info.streams?.find((s: any) => s.codec_type === 'audio');
      if (audioStream) {
        metadata.channels = parseInt(audioStream.channels) || undefined;
        metadata.sampleRate = parseInt(audioStream.sample_rate) || undefined;
      }
      
      // 지속 시간 (영상 길이)
      const format = info.format;
      if (format?.duration) {
        metadata.duration = parseFloat(format.duration);
      }
      
      return metadata;
    } catch (error) {
      console.error('메타데이터 추출 실패:', error);
      throw new Error('미디어 메타데이터를 추출할 수 없습니다');
    } finally {
      // 임시 파일 정리
      await this.ffmpeg.deleteFile('input');
      await this.ffmpeg.deleteFile('output.json');
    }
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
    
    if (!this.ffmpeg) {
      throw new Error('FFmpeg가 초기화되지 않았습니다');
    }
    
    const { width = 320, height = 180, quality = 90, time = 0 } = options;
    
    try {
      // 파일 업로드
      await this.ffmpeg.writeFile('input', await fetchFile(file));
      
      if (type === MediaType.VIDEO) {
        // 비디오 썸네일 추출
        await this.ffmpeg.exec([
          '-ss', time.toString(),
          '-i', 'input',
          '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
          '-vframes', '1',
          '-q:v', (31 - Math.round(quality / 3.3)).toString(),
          'thumbnail.jpg'
        ]);
      } else if (type === MediaType.IMAGE) {
        // 이미지 썸네일 추출
        await this.ffmpeg.exec([
          '-i', 'input',
          '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
          '-q:v', (31 - Math.round(quality / 3.3)).toString(),
          'thumbnail.jpg'
        ]);
      } else if (type === MediaType.AUDIO) {
        // 오디오 파일은 기본 오디오 아이콘 사용 (향후 파형 생성 기능 추가 가능)
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMzIwIDE4MCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMzMzMzMzMiLz48cGF0aCBkPSJNMTQwIDYwdjYwbDUwLTMweiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xOTAgOTBhNDAgNDAgMCAwIDEgMCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0xOTAgNzBhNjAgNjAgMCAwIDEgMCA0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTkwIDUwYTgwIDgwIDAgMCAxIDAgODAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+';
      }
      
      // 썸네일 파일 읽기
      const thumbnailData = await this.ffmpeg.readFile('thumbnail.jpg') as Uint8Array;
      const blob = new Blob([thumbnailData], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      
      return url;
    } catch (error) {
      console.error('썸네일 생성 실패:', error);
      throw new Error('썸네일을 생성할 수 없습니다');
    } finally {
      // 임시 파일 정리
      await this.ffmpeg.deleteFile('input');
      await this.ffmpeg.deleteFile('thumbnail.jpg').catch(() => {});
    }
  }

  /**
   * FFmpeg가 로드되었는지 확인하고, 로드되지 않았다면 로드합니다
   */
  private async ensureLoaded(): Promise<void> {
    if (!this.loaded) {
      await this.load();
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
}

export default new FFmpegService();
