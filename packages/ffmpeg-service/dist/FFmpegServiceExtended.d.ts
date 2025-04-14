import { TrimOptions, CropOptions, ConcatOptions, ExtractAudioOptions, ProgressCallback } from './types';
import { FFmpegService } from './FFmpegService';
/**
 * FFmpeg 서비스 확장 클래스
 * 고급 비디오 및 오디오 처리 기능 제공
 */
export declare class FFmpegServiceExtended extends FFmpegService {
    /**
     * 비디오 트림 (특정 구간 추출)
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 비디오 파일 경로
     * @param options 트림 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 트림된 비디오 파일 경로
     */
    trimVideo(inputPath: string, outputPath: string, options: TrimOptions, progressCallback?: (progress: ProgressCallback) => void): Promise<string>;
    /**
     * 비디오 자르기 (특정 영역 추출)
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 비디오 파일 경로
     * @param options 자르기 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 잘린 비디오 파일 경로
     */
    cropVideo(inputPath: string, outputPath: string, options: CropOptions, progressCallback?: (progress: ProgressCallback) => void): Promise<string>;
    /**
     * 비디오 병합
     * @param outputPath 출력 비디오 파일 경로
     * @param options 병합 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 병합된 비디오 파일 경로
     */
    concatVideos(outputPath: string, options: ConcatOptions, progressCallback?: (progress: ProgressCallback) => void): Promise<string>;
    /**
     * 오디오 추출
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 오디오 파일 경로
     * @param options 오디오 추출 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 추출된 오디오 파일 경로
     */
    extractAudio(inputPath: string, outputPath: string, options?: ExtractAudioOptions, progressCallback?: (progress: ProgressCallback) => void): Promise<string>;
}
