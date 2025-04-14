import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs';
import { 
  TrimOptions,
  CropOptions,
  ConcatOptions,
  ExtractAudioOptions,
  ExtractFramesOptions,
  WatermarkOptions,
  TextOverlayOptions,
  FilterOptions,
  SpeedOptions,
  ProgressCallback,
  VideoInfo
} from './types';
import { FFmpegService } from './FFmpegService';
import { ensureDirectoryExists, getTempFilePath } from './utils/pathUtils';

/**
 * FFmpeg 서비스 확장 클래스
 * 고급 비디오 및 오디오 처리 기능 제공
 */
export class FFmpegServiceExtended extends FFmpegService {
  /**
   * 비디오 트림 (특정 구간 추출)
   * @param inputPath 입력 비디오 파일 경로
   * @param outputPath 출력 비디오 파일 경로
   * @param options 트림 옵션
   * @param progressCallback 진행 상황 콜백 함수
   * @returns 트림된 비디오 파일 경로
   */
  public async trimVideo(
    inputPath: string,
    outputPath: string,
    options: TrimOptions,
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const command = ffmpeg(inputPath);
        
        // 시작 시간 설정
        command.seekInput(options.startTime);
        
        // 지속 시간 설정
        const duration = options.endTime - options.startTime;
        if (duration > 0) {
          command.duration(duration);
        }
        
        // 인코딩 옵션 적용
        if (options.encodingOptions) {
          // 출력 형식 설정
          if (options.encodingOptions.format) {
            command.format(options.encodingOptions.format);
          }
          
          // 비디오 코덱 설정
          if (options.encodingOptions.videoCodec) {
            command.videoCodec(options.encodingOptions.videoCodec);
          }
          
          // 오디오 코덱 설정
          if (options.encodingOptions.audioCodec) {
            command.audioCodec(options.encodingOptions.audioCodec);
          }
          
          // 기타 인코딩 옵션 설정
          if (options.encodingOptions.videoBitrate) {
            command.videoBitrate(options.encodingOptions.videoBitrate);
          }
          
          if (options.encodingOptions.audioBitrate) {
            command.audioBitrate(options.encodingOptions.audioBitrate);
          }
          
          if (options.encodingOptions.frameRate) {
            command.fps(options.encodingOptions.frameRate);
          }
          
          if (options.encodingOptions.width || options.encodingOptions.height) {
            command.size(`${options.encodingOptions.width || '?'}x${options.encodingOptions.height || '?'}`);
          }
          
          if (options.encodingOptions.additionalOptions) {
            options.encodingOptions.additionalOptions.forEach(option => {
              command.outputOptions(option);
            });
          }
        }
        
        // 디렉토리 생성
        ensureDirectoryExists(path.dirname(outputPath));
        
        // 진행 상황 콜백 설정
        if (progressCallback) {
          // 비디오 정보 미리 가져오기
          const videoInfo: VideoInfo = await this.getVideoInfo(inputPath);
          
          command.on('progress', (progress: any) => {
            const processedSeconds = parseFloat(progress.timemark.split(':').reduce((acc: number, time: string) => (60 * acc) + parseFloat(time), 0).toFixed(2));
            const totalSeconds = duration;
            const percent = Math.min(100, Math.round((processedSeconds / totalSeconds) * 100));
            
            progressCallback({
              frames: progress.frames,
              currentFps: progress.currentFps,
              currentKbps: progress.currentKbps,
              targetSize: progress.targetSize,
              timemark: progress.timemark,
              processedSeconds,
              totalSeconds,
              percent
            });
          });
        }
        
        command
          .output(outputPath)
          .on('end', () => {
            resolve(outputPath);
          })
          .on('error', (err: Error) => {
            reject(new Error(`비디오 트림 중 오류 발생: ${err.message}`));
          })
          .run();
      } catch (error) {
        reject(new Error(`비디오 트림 준비 중 오류 발생: ${(error as Error).message}`));
      }
    });
  }

  /**
   * 비디오 자르기 (특정 영역 추출)
   * @param inputPath 입력 비디오 파일 경로
   * @param outputPath 출력 비디오 파일 경로
   * @param options 자르기 옵션
   * @param progressCallback 진행 상황 콜백 함수
   * @returns 잘린 비디오 파일 경로
   */
  public async cropVideo(
    inputPath: string,
    outputPath: string,
    options: CropOptions,
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const command = ffmpeg(inputPath);
        
        // 자르기 필터 적용
        command.videoFilters(`crop=${options.width}:${options.height}:${options.x}:${options.y}`);
        
        // 인코딩 옵션 적용
        if (options.encodingOptions) {
          // 출력 형식 설정
          if (options.encodingOptions.format) {
            command.format(options.encodingOptions.format);
          }
          
          // 비디오 코덱 설정
          if (options.encodingOptions.videoCodec) {
            command.videoCodec(options.encodingOptions.videoCodec);
          }
          
          // 오디오 코덱 설정
          if (options.encodingOptions.audioCodec) {
            command.audioCodec(options.encodingOptions.audioCodec);
          }
          
          // 기타 인코딩 옵션 설정
          if (options.encodingOptions.videoBitrate) {
            command.videoBitrate(options.encodingOptions.videoBitrate);
          }
          
          if (options.encodingOptions.audioBitrate) {
            command.audioBitrate(options.encodingOptions.audioBitrate);
          }
          
          if (options.encodingOptions.frameRate) {
            command.fps(options.encodingOptions.frameRate);
          }
          
          if (options.encodingOptions.additionalOptions) {
            options.encodingOptions.additionalOptions.forEach(option => {
              command.outputOptions(option);
            });
          }
        }
        
        // 디렉토리 생성
        ensureDirectoryExists(path.dirname(outputPath));
        
        // 진행 상황 콜백 설정
        if (progressCallback) {
          // 비디오 정보 미리 가져오기
          const videoInfo: VideoInfo = await this.getVideoInfo(inputPath);
          
          command.on('progress', (progress: any) => {
            const processedSeconds = parseFloat(progress.timemark.split(':').reduce((acc: number, time: string) => (60 * acc) + parseFloat(time), 0).toFixed(2));
            const totalSeconds = videoInfo.duration;
            const percent = Math.min(100, Math.round((processedSeconds / totalSeconds) * 100));
            
            progressCallback({
              frames: progress.frames,
              currentFps: progress.currentFps,
              currentKbps: progress.currentKbps,
              targetSize: progress.targetSize,
              timemark: progress.timemark,
              processedSeconds,
              totalSeconds,
              percent
            });
          });
        }
        
        command
          .output(outputPath)
          .on('end', () => {
            resolve(outputPath);
          })
          .on('error', (err: Error) => {
            reject(new Error(`비디오 자르기 중 오류 발생: ${err.message}`));
          })
          .run();
      } catch (error) {
        reject(new Error(`비디오 자르기 준비 중 오류 발생: ${(error as Error).message}`));
      }
    });
  }

  /**
   * 비디오 병합
   * @param outputPath 출력 비디오 파일 경로
   * @param options 병합 옵션
   * @param progressCallback 진행 상황 콜백 함수
   * @returns 병합된 비디오 파일 경로
   */
  public async concatVideos(
    outputPath: string,
    options: ConcatOptions,
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (options.inputFiles.length === 0) {
          reject(new Error('병합할 파일이 없습니다'));
          return;
        }
        
        // 임시 파일 목록 생성
        const tempFilePath = getTempFilePath('concat', 'txt');
        const fileContent = options.inputFiles.map(file => `file '${file.replace(/'/g, "'\\''")}'`).join('\n');
        fs.writeFileSync(tempFilePath, fileContent);
        
        const command = ffmpeg();
        
        // 파일 목록 사용
        command.input(tempFilePath);
        command.inputOptions(['-f', 'concat', '-safe', '0']);
        
        // 트랜지션 설정
        if (options.transition && options.transition !== 'none' && options.transitionDuration) {
          // 트랜지션 구현은 복잡하므로 여기서는 생략
          // 실제 구현에서는 복잡한 필터 그래프가 필요함
        }
        
        // 인코딩 옵션 적용
        if (options.encodingOptions) {
          // 출력 형식 설정
          if (options.encodingOptions.format) {
            command.format(options.encodingOptions.format);
          }
          
          // 비디오 코덱 설정
          if (options.encodingOptions.videoCodec) {
            command.videoCodec(options.encodingOptions.videoCodec);
          }
          
          // 오디오 코덱 설정
          if (options.encodingOptions.audioCodec) {
            command.audioCodec(options.encodingOptions.audioCodec);
          }
          
          // 기타 인코딩 옵션 설정
          if (options.encodingOptions.videoBitrate) {
            command.videoBitrate(options.encodingOptions.videoBitrate);
          }
          
          if (options.encodingOptions.audioBitrate) {
            command.audioBitrate(options.encodingOptions.audioBitrate);
          }
          
          if (options.encodingOptions.frameRate) {
            command.fps(options.encodingOptions.frameRate);
          }
          
          if (options.encodingOptions.width || options.encodingOptions.height) {
            command.size(`${options.encodingOptions.width || '?'}x${options.encodingOptions.height || '?'}`);
          }
          
          if (options.encodingOptions.additionalOptions) {
            options.encodingOptions.additionalOptions.forEach(option => {
              command.outputOptions(option);
            });
          }
        }
        
        // 디렉토리 생성
        ensureDirectoryExists(path.dirname(outputPath));
        
        // 진행 상황 콜백 설정
        if (progressCallback) {
          let totalDuration = 0;
          
          // 모든 입력 파일의 총 지속 시간 계산
          for (const inputFile of options.inputFiles) {
            const videoInfo: VideoInfo = await this.getVideoInfo(inputFile);
            totalDuration += videoInfo.duration;
          }
          
          command.on('progress', (progress: any) => {
            const processedSeconds = parseFloat(progress.timemark.split(':').reduce((acc: number, time: string) => (60 * acc) + parseFloat(time), 0).toFixed(2));
            const percent = Math.min(100, Math.round((processedSeconds / totalDuration) * 100));
            
            progressCallback({
              frames: progress.frames,
              currentFps: progress.currentFps,
              currentKbps: progress.currentKbps,
              targetSize: progress.targetSize,
              timemark: progress.timemark,
              processedSeconds,
              totalSeconds: totalDuration,
              percent
            });
          });
        }
        
        command
          .output(outputPath)
          .on('end', () => {
            // 임시 파일 삭제
            fs.unlinkSync(tempFilePath);
            resolve(outputPath);
          })
          .on('error', (err: Error) => {
            // 임시 파일 삭제 시도
            try {
              if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
              }
            } catch (e) {
              console.error('임시 파일 삭제 중 오류 발생:', e);
            }
            
            reject(new Error(`비디오 병합 중 오류 발생: ${err.message}`));
          })
          .run();
      } catch (error) {
        reject(new Error(`비디오 병합 준비 중 오류 발생: ${(error as Error).message}`));
      }
    });
  }

  /**
   * 오디오 추출
   * @param inputPath 입력 비디오 파일 경로
   * @param outputPath 출력 오디오 파일 경로
   * @param options 오디오 추출 옵션
   * @param progressCallback 진행 상황 콜백 함수
   * @returns 추출된 오디오 파일 경로
   */
  public async extractAudio(
    inputPath: string,
    outputPath: string,
    options: ExtractAudioOptions = {},
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // 입력 파일 확인
        if (!fs.existsSync(inputPath)) {
          return reject(new Error(`입력 파일이 존재하지 않습니다: ${inputPath}`));
        }
        
        // 출력 디렉토리 생성
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // 기존 출력 파일이 있으면 삭제
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
        
        const command = ffmpeg(inputPath);
        
        // 비디오 스트림 제거
        command.noVideo();
        
        // 오디오 코덱 설정
        if (options.codec) {
          command.audioCodec(options.codec);
        }
        
        // 비트레이트 설정
        if (options.bitrate) {
          command.audioBitrate(options.bitrate);
        }
        
        // 샘플 레이트 설정
        if (options.sampleRate) {
          command.audioFrequency(options.sampleRate);
        }
        
        // 채널 수 설정
        if (options.channels) {
          command.audioChannels(options.channels);
        }
        
        // 출력 형식 설정
        if (options.format) {
          command.format(options.format);
        }
        
        // 볼륨 조정
        if (options.volume !== undefined && options.volume !== 1.0) {
          command.audioFilters(`volume=${options.volume}`);
        }
        
        // 진행 상황 콜백 설정
        if (progressCallback) {
          // 비디오 정보 미리 가져오기
          const videoInfo: VideoInfo = await this.getVideoInfo(inputPath);
          
          command.on('progress', (progress: any) => {
            const processedSeconds = parseFloat(progress.timemark.split(':').reduce((acc: number, time: string) => (60 * acc) + parseFloat(time), 0).toFixed(2));
            const totalSeconds = videoInfo.duration;
            const percent = Math.min(100, Math.round((processedSeconds / totalSeconds) * 100));
            
            progressCallback({
              frames: progress.frames,
              currentFps: progress.currentFps,
              currentKbps: progress.currentKbps,
              targetSize: progress.targetSize,
              timemark: progress.timemark,
              processedSeconds,
              totalSeconds,
              percent
            });
          });
        }
        
        // 임시 출력 파일 경로 생성 (확장자 유지)
        const ext = path.extname(outputPath);
        const tempOutputPath = path.join(
          path.dirname(outputPath),
          `temp_${Date.now()}${ext}`
        );
        
        command
          .output(tempOutputPath)
          .on('end', () => {
            try {
              // 임시 파일을 최종 출력 파일로 이동
              if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
              }
              fs.renameSync(tempOutputPath, outputPath);
              resolve(outputPath);
            } catch (moveError) {
              reject(new Error(`오디오 파일 이동 중 오류 발생: ${(moveError as Error).message}`));
            }
          })
          .on('error', (err: Error) => {
            // 임시 파일 정리
            try {
              if (fs.existsSync(tempOutputPath)) {
                fs.unlinkSync(tempOutputPath);
              }
            } catch (cleanupError) {
              console.error('임시 파일 정리 중 오류 발생:', cleanupError);
            }
            reject(new Error(`오디오 추출 중 오류 발생: ${err.message}`));
          })
          .run();
      } catch (error) {
        reject(new Error(`오디오 추출 준비 중 오류 발생: ${(error as Error).message}`));
      }
    });
  }
}
