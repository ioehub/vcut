/**
 * 포맷 유틸리티 함수
 */

/**
 * 시간을 HH:MM:SS.mmm 형식으로 변환
 * @param seconds 초 단위 시간
 * @returns 포맷된 시간 문자열
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const milliseconds = Math.floor((seconds % 1) * 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

/**
 * 시간 문자열을 초 단위로 변환
 * @param timeString HH:MM:SS.mmm 형식의 시간 문자열
 * @returns 초 단위 시간
 */
export function parseDuration(timeString: string): number {
  const parts = timeString.split(':');
  
  if (parts.length !== 3) {
    throw new Error('시간 문자열 형식이 잘못되었습니다. HH:MM:SS.mmm 형식이어야 합니다.');
  }
  
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  
  let seconds = 0;
  let milliseconds = 0;
  
  if (parts[2].includes('.')) {
    const secParts = parts[2].split('.');
    seconds = parseInt(secParts[0], 10);
    milliseconds = parseInt(secParts[1], 10);
  } else {
    seconds = parseInt(parts[2], 10);
  }
  
  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

/**
 * 비트레이트를 사람이 읽기 쉬운 형식으로 변환
 * @param bitrate 비트레이트 (bps)
 * @returns 포맷된 비트레이트 문자열
 */
export function formatBitrate(bitrate: number): string {
  if (bitrate >= 1000000) {
    return `${(bitrate / 1000000).toFixed(2)} Mbps`;
  } else if (bitrate >= 1000) {
    return `${(bitrate / 1000).toFixed(2)} kbps`;
  } else {
    return `${bitrate} bps`;
  }
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환
 * @param bytes 바이트 단위 파일 크기
 * @returns 포맷된 파일 크기 문자열
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 프레임 레이트를 사람이 읽기 쉬운 형식으로 변환
 * @param fps 프레임 레이트 (fps)
 * @returns 포맷된 프레임 레이트 문자열
 */
export function formatFrameRate(fps: number): string {
  return `${fps.toFixed(2)} fps`;
}

/**
 * 해상도를 사람이 읽기 쉬운 형식으로 변환
 * @param width 너비 (픽셀)
 * @param height 높이 (픽셀)
 * @returns 포맷된 해상도 문자열
 */
export function formatResolution(width: number, height: number): string {
  // 일반적인 해상도 이름 매핑
  const resolutionNames: { [key: string]: string } = {
    '3840x2160': '4K UHD',
    '2560x1440': '2K QHD',
    '1920x1080': 'Full HD',
    '1280x720': 'HD',
    '854x480': 'SD',
    '640x360': '360p',
    '426x240': '240p'
  };
  
  const resolution = `${width}x${height}`;
  return resolutionNames[resolution] ? `${resolution} (${resolutionNames[resolution]})` : resolution;
}
