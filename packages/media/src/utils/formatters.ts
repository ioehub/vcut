/**
 * 파일 크기를 읽기 쉬운 형식으로 포맷팅합니다
 * @param bytes 파일 크기 (바이트)
 * @returns 포맷팅된 파일 크기 문자열 (예: "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 초 단위 시간을 "HH:MM:SS" 또는 "MM:SS" 형식으로 포맷팅합니다
 * @param seconds 시간 (초)
 * @returns 포맷팅된 시간 문자열
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  
  if (hours > 0) {
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(secs)}`;
  } else {
    return `${formatNumber(minutes)}:${formatNumber(secs)}`;
  }
}

/**
 * ISO 날짜 문자열을 지역화된 날짜 문자열로 포맷팅합니다
 * @param date 날짜 객체 또는 ISO 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * 파일 확장자를 추출합니다
 * @param filename 파일명
 * @returns 파일 확장자 (예: "mp4"), 확장자가 없으면 빈 문자열
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  // 확장자가 없는 경우 (점이 없거나 파일명이 점으로 시작하는 경우)
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
}

/**
 * 마지막 경로 컴포넌트를 추출합니다 (파일명 또는 디렉토리명)
 * @param path 파일 경로
 * @returns 파일명 또는 디렉토리명
 */
export function getBasename(path: string): string {
  return path.split(/[\\/]/).pop() || '';
}
