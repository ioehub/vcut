/**
 * 포맷 유틸리티 함수
 */
/**
 * 시간을 HH:MM:SS.mmm 형식으로 변환
 * @param seconds 초 단위 시간
 * @returns 포맷된 시간 문자열
 */
export declare function formatDuration(seconds: number): string;
/**
 * 시간 문자열을 초 단위로 변환
 * @param timeString HH:MM:SS.mmm 형식의 시간 문자열
 * @returns 초 단위 시간
 */
export declare function parseDuration(timeString: string): number;
/**
 * 비트레이트를 사람이 읽기 쉬운 형식으로 변환
 * @param bitrate 비트레이트 (bps)
 * @returns 포맷된 비트레이트 문자열
 */
export declare function formatBitrate(bitrate: number): string;
/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환
 * @param bytes 바이트 단위 파일 크기
 * @returns 포맷된 파일 크기 문자열
 */
export declare function formatFileSize(bytes: number): string;
/**
 * 프레임 레이트를 사람이 읽기 쉬운 형식으로 변환
 * @param fps 프레임 레이트 (fps)
 * @returns 포맷된 프레임 레이트 문자열
 */
export declare function formatFrameRate(fps: number): string;
/**
 * 해상도를 사람이 읽기 쉬운 형식으로 변환
 * @param width 너비 (픽셀)
 * @param height 높이 (픽셀)
 * @returns 포맷된 해상도 문자열
 */
export declare function formatResolution(width: number, height: number): string;
