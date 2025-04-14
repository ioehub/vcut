import { VideoInfo, ThumbnailOptions, VideoEncodingOptions, ProgressCallback } from './types';
/**
 * FFmpeg 서비스 클래스
 * 비디오 및 오디오 처리를 위한 FFmpeg 래퍼
 */
export declare class FFmpegService {
    private ffmpegPath;
    private ffprobePath;
    private initialized;
    /**
     * FFmpeg 서비스 생성자
     * @param ffmpegPath FFmpeg 실행 파일 경로 (선택 사항)
     * @param ffprobePath FFprobe 실행 파일 경로 (선택 사항)
     */
    constructor(ffmpegPath?: string, ffprobePath?: string);
    /**
     * FFmpeg 서비스 초기화
     * @param ffmpegPath FFmpeg 실행 파일 경로 (선택 사항)
     * @param ffprobePath FFprobe 실행 파일 경로 (선택 사항)
     */
    initialize(ffmpegPath?: string, ffprobePath?: string): void;
    /**
     * 초기화 상태 확인
     * @returns 초기화 여부
     */
    isInitialized(): boolean;
    /**
     * 비디오 정보 가져오기
     * @param inputPath 입력 비디오 파일 경로
     * @returns 비디오 정보 객체
     */
    getVideoInfo(inputPath: string): Promise<VideoInfo>;
    /**
     * 썸네일 생성
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 썸네일 파일 경로
     * @param options 썸네일 생성 옵션
     * @returns 생성된 썸네일 파일 경로
     */
    generateThumbnail(inputPath: string, outputPath: string, options?: ThumbnailOptions): Promise<string>;
    /**
     * 비디오 인코딩
     * @param inputPath 입력 비디오 파일 경로
     * @param outputPath 출력 비디오 파일 경로
     * @param options 인코딩 옵션
     * @param progressCallback 진행 상황 콜백 함수
     * @returns 인코딩된 비디오 파일 경로
     */
    encodeVideo(inputPath: string, outputPath: string, options?: VideoEncodingOptions, progressCallback?: (progress: ProgressCallback) => void): Promise<string>;
}
