import { describe, it, expect } from 'vitest';
import { formatFileSize, formatDuration, getFileExtension, getBasename } from './formatters';

describe('포맷터 유틸리티', () => {
  describe('formatFileSize', () => {
    it('0 바이트를 올바르게 포맷팅', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    it('킬로바이트 단위를 올바르게 포맷팅', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    it('메가바이트 단위를 올바르게 포맷팅', () => {
      expect(formatFileSize(2097152)).toBe('2 MB');
    });

    it('기가바이트 단위를 올바르게 포맷팅', () => {
      expect(formatFileSize(3221225472)).toBe('3 GB');
    });
  });

  describe('formatDuration', () => {
    it('분:초 형식으로 짧은 시간을 올바르게 포맷팅', () => {
      expect(formatDuration(65)).toBe('01:05');
    });

    it('시:분:초 형식으로 긴 시간을 올바르게 포맷팅', () => {
      expect(formatDuration(3665)).toBe('01:01:05');
    });

    it('NaN을 입력하면 기본값 반환', () => {
      expect(formatDuration(NaN)).toBe('00:00');
    });
  });

  describe('getFileExtension', () => {
    it('기본 파일 확장자를 올바르게 추출', () => {
      expect(getFileExtension('document.pdf')).toBe('pdf');
    });

    it('대문자 확장자를 소문자로 변환', () => {
      expect(getFileExtension('image.JPG')).toBe('jpg');
    });

    it('확장자가 없는 경우 빈 문자열 반환', () => {
      expect(getFileExtension('filename')).toBe('');
    });

    it('다중 점이 있는 파일명에서 마지막 확장자 추출', () => {
      expect(getFileExtension('archive.tar.gz')).toBe('gz');
    });
  });

  describe('getBasename', () => {
    it('Windows 경로에서 파일명 추출', () => {
      expect(getBasename('C:\\folder\\subfolder\\file.txt')).toBe('file.txt');
    });

    it('UNIX 경로에서 파일명 추출', () => {
      expect(getBasename('/home/user/documents/file.txt')).toBe('file.txt');
    });

    it('파일명만 있는 경우 그대로 반환', () => {
      expect(getBasename('file.txt')).toBe('file.txt');
    });

    it('경로 구분자로 끝나는 경우 빈 문자열 반환', () => {
      expect(getBasename('C:\\folder\\subfolder\\')).toBe('');
    });
  });
});
