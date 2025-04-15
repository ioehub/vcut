/**
 * 미디어 시간 관련 유틸리티 함수
 */
/**
 * 초를 HH:MM:SS 형식으로 변환
 * @param seconds 초
 * @returns 시간 문자열 (HH:MM:SS)
 */
export declare function formatTime(seconds: number): string;
/**
 * 초를 MM:SS 형식으로 변환 (1시간 미만인 경우)
 * @param seconds 초
 * @returns 시간 문자열 (MM:SS 또는 HH:MM:SS)
 */
export declare function formatTimeCompact(seconds: number): string;
/**
 * HH:MM:SS 형식의 문자열을 초로 변환
 * @param timeString 시간 문자열 (HH:MM:SS 또는 MM:SS)
 * @returns 초
 */
export declare function parseTimeString(timeString: string): number;
/**
 * 시간을 프레임 번호로 변환
 * @param seconds 초
 * @param frameRate 프레임 레이트 (fps)
 * @returns 프레임 번호
 */
export declare function timeToFrameNumber(seconds: number, frameRate: number): number;
/**
 * 프레임 번호를 시간으로 변환
 * @param frameNumber 프레임 번호
 * @param frameRate 프레임 레이트 (fps)
 * @returns 초
 */
export declare function frameNumberToTime(frameNumber: number, frameRate: number): number;
/**
 * 시간 범위가 유효한지 확인
 * @param startTime 시작 시간 (초)
 * @param endTime 종료 시간 (초)
 * @param duration 미디어 길이 (초)
 * @returns 유효 여부
 */
export declare function isValidTimeRange(startTime: number, endTime: number, duration: number): boolean;
/**
 * 버퍼 범위를 문자열로 변환
 * @param buffered 버퍼 범위 배열 [시작, 끝][]
 * @returns 버퍼 범위 문자열
 */
export declare function formatBufferedRanges(buffered: [number, number][]): string;
