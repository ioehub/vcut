/**
 * 미디어 시간 관련 유틸리티 함수
 */

/**
 * 초를 HH:MM:SS 형식으로 변환
 * @param seconds 초
 * @returns 시간 문자열 (HH:MM:SS)
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
}

/**
 * 초를 MM:SS 형식으로 변환 (1시간 미만인 경우)
 * @param seconds 초
 * @returns 시간 문자열 (MM:SS 또는 HH:MM:SS)
 */
export function formatTimeCompact(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  } else {
    return [
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  }
}

/**
 * HH:MM:SS 형식의 문자열을 초로 변환
 * @param timeString 시간 문자열 (HH:MM:SS 또는 MM:SS)
 * @returns 초
 */
export function parseTimeString(timeString: string): number {
  if (!timeString) {
    return 0;
  }

  const parts = timeString.split(':').map(part => parseInt(part, 10));
  
  if (parts.length === 3) {
    // HH:MM:SS 형식
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS 형식
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1 && !isNaN(parts[0])) {
    // 초 형식
    return parts[0];
  }
  
  return 0;
}

/**
 * 시간을 프레임 번호로 변환
 * @param seconds 초
 * @param frameRate 프레임 레이트 (fps)
 * @returns 프레임 번호
 */
export function timeToFrameNumber(seconds: number, frameRate: number): number {
  return Math.floor(seconds * frameRate);
}

/**
 * 프레임 번호를 시간으로 변환
 * @param frameNumber 프레임 번호
 * @param frameRate 프레임 레이트 (fps)
 * @returns 초
 */
export function frameNumberToTime(frameNumber: number, frameRate: number): number {
  return frameNumber / frameRate;
}

/**
 * 시간 범위가 유효한지 확인
 * @param startTime 시작 시간 (초)
 * @param endTime 종료 시간 (초)
 * @param duration 미디어 길이 (초)
 * @returns 유효 여부
 */
export function isValidTimeRange(startTime: number, endTime: number, duration: number): boolean {
  return startTime >= 0 && 
         endTime > startTime && 
         endTime <= duration;
}

/**
 * 버퍼 범위를 문자열로 변환
 * @param buffered 버퍼 범위 배열 [시작, 끝][]
 * @returns 버퍼 범위 문자열
 */
export function formatBufferedRanges(buffered: [number, number][]): string {
  return buffered.map(range => 
    `${formatTimeCompact(range[0])} - ${formatTimeCompact(range[1])}`
  ).join(', ');
}
