import { RenderPreset } from '../types';

/**
 * 사전 정의된 렌더링 프리셋 모음
 */
export const RenderPresets: Record<string, RenderPreset> = {
  '480p': {
    id: 'preset-480p',
    name: '480p 표준',
    description: '작은 파일 크기, 웹 공유에 적합',
    settings: {
      resolution: {
        width: 854,
        height: 480,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h264',
      bitrate: 2000000, // 2 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 128000, // 128 kbps
        sampleRate: 44100,
        channels: 2
      }
    }
  },
  '720p': {
    id: 'preset-720p',
    name: 'HD 720p',
    description: '중간 품질, 대부분 디바이스에서 호환',
    settings: {
      resolution: {
        width: 1280,
        height: 720,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h264',
      bitrate: 5000000, // 5 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 192000, // 192 kbps
        sampleRate: 48000,
        channels: 2
      }
    }
  },
  '1080p': {
    id: 'preset-1080p',
    name: 'Full HD 1080p',
    description: '고품질, TV 및 온라인 비디오에 적합',
    settings: {
      resolution: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h264',
      bitrate: 8000000, // 8 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 192000, // 192 kbps
        sampleRate: 48000,
        channels: 2
      }
    }
  },
  '4K': {
    id: 'preset-4k',
    name: 'Ultra HD 4K',
    description: '최고 품질, 전문 제작 및 출판용',
    settings: {
      resolution: {
        width: 3840,
        height: 2160,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h265', // HEVC 코덱 사용
      bitrate: 20000000, // 20 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 320000, // 320 kbps
        sampleRate: 48000,
        channels: 2
      }
    }
  },
  'Youtube': {
    id: 'preset-youtube',
    name: '유튜브 최적화',
    description: '유튜브 업로드에 최적화된 설정',
    settings: {
      resolution: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h264',
      bitrate: 10000000, // 10 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 384000, // 384 kbps
        sampleRate: 48000,
        channels: 2
      }
    }
  },
  'Mobile': {
    id: 'preset-mobile',
    name: '모바일 최적화',
    description: '모바일 기기에 최적화된 작은 파일',
    settings: {
      resolution: {
        width: 1280,
        height: 720,
        aspectRatio: '16:9'
      },
      format: 'mp4',
      codec: 'h264',
      bitrate: 3000000, // 3 Mbps
      frameRate: 30,
      useHardwareAcceleration: true,
      audioSettings: {
        codec: 'aac',
        bitrate: 128000, // 128 kbps
        sampleRate: 44100,
        channels: 2
      }
    }
  }
};
