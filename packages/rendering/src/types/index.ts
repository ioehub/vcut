// 렌더링 모듈 타입 정의

// 해상도 타입 정의
export interface Resolution {
  width: number;
  height: number;
  aspectRatio: string;
}

// 오디오 설정 타입 정의
export interface AudioSettings {
  codec: string;
  bitrate: number;
  sampleRate: number;
  channels: number;
}

// 렌더링 설정 타입 정의
export interface RenderSettings {
  id: string;
  name: string;
  resolution: Resolution;
  format: string;  // 'mp4', 'mov', 'webm' 등
  codec: string;
  bitrate: number;
  frameRate: number;
  useHardwareAcceleration: boolean;
  audioSettings: AudioSettings;
}

// 렌더링 작업 타입 정의
export interface RenderJob {
  id: string;
  projectId: string;
  name: string;
  settings: RenderSettings;
  status: 'waiting' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime?: Date;
  endTime?: Date;
  outputPath: string;
  errorMessage?: string;
  estimatedTimeRemaining?: number; // 초 단위
}

// 하드웨어 정보 타입 정의
export interface HardwareInfo {
  vendor: string;
  model: string;
  vram?: number;
  supported: boolean;
}

// 렌더링 프리셋 타입 정의
export interface RenderPreset {
  id: string;
  name: string;
  description: string;
  settings: Omit<RenderSettings, 'id' | 'name'>;
}
