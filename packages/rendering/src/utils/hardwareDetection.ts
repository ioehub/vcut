import { HardwareInfo } from '../types';

/**
 * 하드웨어 가속을 위한 GPU 정보를 감지합니다.
 * 실제 환경에서는 Electron의 system-info 또는 외부 라이브러리를 사용할 수 있습니다.
 */
export const detectGPU = (): HardwareInfo => {
  // 테스트용 구현 - 실제 환경에서는 시스템 정보를 가져오는 로직으로 대체
  // 이 함수는 테스트 목적으로 랜덤하게 GPU 정보를 반환합니다
  const vendors = ['nvidia', 'amd', 'intel', 'none'];
  const randomVendor = vendors[Math.floor(Math.random() * 3)]; // 항상 GPU가 있다고 가정
  
  const models: Record<string, string[]> = {
    'nvidia': ['RTX 3090', 'RTX 3080', 'RTX 3070', 'GTX 1660'],
    'amd': ['RX 6900 XT', 'RX 6800', 'RX 6700 XT', 'RX 5700'],
    'intel': ['Arc A770', 'Arc A750', 'UHD Graphics 770', 'Iris Xe'],
    'none': ['기본 그래픽']
  };
  
  const randomModel = models[randomVendor][Math.floor(Math.random() * models[randomVendor].length)];
  const randomVRAM = randomVendor !== 'none' ? Math.floor(Math.random() * 12) + 4 : 0; // 4-16GB
  
  return {
    vendor: randomVendor,
    model: randomModel,
    vram: randomVendor !== 'none' ? randomVRAM * 1024 : undefined,
    supported: randomVendor !== 'none'
  };
};

/**
 * 하드웨어 가속을 위한 FFmpeg 인수를 생성합니다.
 */
export const getHardwareAccelerationArgs = (hardwareInfo: HardwareInfo): string[] => {
  const ffmpegArgs: string[] = [];
  
  if (!hardwareInfo.supported) {
    return ffmpegArgs;
  }
  
  switch (hardwareInfo.vendor) {
    case 'nvidia':
      ffmpegArgs.push('-hwaccel', 'cuda');
      ffmpegArgs.push('-c:v', 'h264_nvenc');
      break;
    case 'amd':
      ffmpegArgs.push('-hwaccel', 'amf');
      ffmpegArgs.push('-c:v', 'h264_amf');
      break;
    case 'intel':
      ffmpegArgs.push('-hwaccel', 'qsv');
      ffmpegArgs.push('-c:v', 'h264_qsv');
      break;
    default:
      // 하드웨어 가속 사용 불가
      break;
  }
  
  return ffmpegArgs;
};
