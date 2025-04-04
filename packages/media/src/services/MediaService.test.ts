import { describe, it, expect, vi, beforeEach } from 'vitest';
import MediaService from './MediaService';
import { MediaType } from '../types';

// 모의 파일 생성 헬퍼 함수
function createMockFile(name: string, type: string): File {
  return new File(['mock content'], name, { type });
}

describe('MediaService', () => {
  beforeEach(() => {
    // URL 관련 모의 설정
    global.URL.createObjectURL = vi.fn(() => 'mock://url');
    global.URL.revokeObjectURL = vi.fn();
  });

  describe('detectMediaType', () => {
    it('MIME 타입으로 비디오 파일을 올바르게 감지', async () => {
      const file = createMockFile('test.mp4', 'video/mp4');
      
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['detectMediaType'](file);
      
      expect(result).toBe(MediaType.VIDEO);
    });

    it('MIME 타입으로 오디오 파일을 올바르게 감지', async () => {
      const file = createMockFile('test.mp3', 'audio/mpeg');
      
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['detectMediaType'](file);
      
      expect(result).toBe(MediaType.AUDIO);
    });

    it('MIME 타입으로 이미지 파일을 올바르게 감지', async () => {
      const file = createMockFile('test.jpg', 'image/jpeg');
      
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['detectMediaType'](file);
      
      expect(result).toBe(MediaType.IMAGE);
    });

    it('확장자로 비디오 파일을 올바르게 감지', async () => {
      const file = createMockFile('test.mkv', 'application/octet-stream');
      
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['detectMediaType'](file);
      
      expect(result).toBe(MediaType.VIDEO);
    });
  });

  describe('getMimeType', () => {
    it('비디오 타입에 대한 올바른 MIME 타입 반환', () => {
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['getMimeType'](MediaType.VIDEO);
      
      expect(result).toBe('video/mp4');
    });

    it('오디오 타입에 대한 올바른 MIME 타입 반환', () => {
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['getMimeType'](MediaType.AUDIO);
      
      expect(result).toBe('audio/mp3');
    });

    it('이미지 타입에 대한 올바른 MIME 타입 반환', () => {
      // @ts-ignore - private 메서드 테스트
      const result = MediaService['getMimeType'](MediaType.IMAGE);
      
      expect(result).toBe('image/jpeg');
    });
  });
});
