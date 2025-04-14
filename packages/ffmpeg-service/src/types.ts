/**
 * FFmpeg 서비스 관련 타입 정의
 */

/**
 * 비디오 정보 인터페이스
 */
export interface VideoInfo {
  /** 비디오 파일 경로 */
  path: string;
  /** 비디오 길이 (초) */
  duration: number;
  /** 비디오 너비 (픽셀) */
  width: number;
  /** 비디오 높이 (픽셀) */
  height: number;
  /** 프레임 레이트 (fps) */
  frameRate: number;
  /** 비트레이트 (bps) */
  bitrate: number;
  /** 코덱 정보 */
  codec: string;
  /** 오디오 스트림 정보 */
  audioStreams: AudioStreamInfo[];
  /** 비디오 스트림 정보 */
  videoStreams: VideoStreamInfo[];
  /** 기타 메타데이터 */
  metadata: Record<string, string>;
}

/**
 * 오디오 스트림 정보 인터페이스
 */
export interface AudioStreamInfo {
  /** 스트림 인덱스 */
  index: number;
  /** 코덱 이름 */
  codec: string;
  /** 샘플 레이트 (Hz) */
  sampleRate: number;
  /** 채널 수 */
  channels: number;
  /** 비트레이트 (bps) */
  bitrate: number;
  /** 언어 코드 */
  language?: string;
}

/**
 * 비디오 스트림 정보 인터페이스
 */
export interface VideoStreamInfo {
  /** 스트림 인덱스 */
  index: number;
  /** 코덱 이름 */
  codec: string;
  /** 너비 (픽셀) */
  width: number;
  /** 높이 (픽셀) */
  height: number;
  /** 프레임 레이트 (fps) */
  frameRate: number;
  /** 비트레이트 (bps) */
  bitrate: number;
}

/**
 * 썸네일 생성 옵션 인터페이스
 */
export interface ThumbnailOptions {
  /** 썸네일 너비 (픽셀) */
  width?: number;
  /** 썸네일 높이 (픽셀) */
  height?: number;
  /** 썸네일 시간 위치 (초) */
  timePosition?: number;
  /** 품질 (1-100) */
  quality?: number;
  /** 파일 형식 (jpg, png) */
  format?: 'jpg' | 'png';
}

/**
 * 비디오 인코딩 옵션 인터페이스
 */
export interface VideoEncodingOptions {
  /** 출력 파일 형식 */
  format?: string;
  /** 비디오 코덱 */
  videoCodec?: string;
  /** 오디오 코덱 */
  audioCodec?: string;
  /** 비디오 비트레이트 (bps) */
  videoBitrate?: string | number;
  /** 오디오 비트레이트 (bps) */
  audioBitrate?: string | number;
  /** 프레임 레이트 (fps) */
  frameRate?: number;
  /** 해상도 너비 (픽셀) */
  width?: number;
  /** 해상도 높이 (픽셀) */
  height?: number;
  /** 오디오 채널 수 */
  audioChannels?: number;
  /** 오디오 샘플 레이트 (Hz) */
  audioSampleRate?: number;
  /** 추가 FFmpeg 옵션 */
  additionalOptions?: string[];
}

/**
 * 비디오 트림 옵션 인터페이스
 */
export interface TrimOptions {
  /** 시작 시간 (초) */
  startTime: number;
  /** 종료 시간 (초) */
  endTime: number;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 비디오 자르기 옵션 인터페이스
 */
export interface CropOptions {
  /** 왼쪽 좌표 (픽셀) */
  x: number;
  /** 상단 좌표 (픽셀) */
  y: number;
  /** 너비 (픽셀) */
  width: number;
  /** 높이 (픽셀) */
  height: number;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 비디오 병합 옵션 인터페이스
 */
export interface ConcatOptions {
  /** 입력 파일 경로 목록 */
  inputFiles: string[];
  /** 트랜지션 유형 */
  transition?: 'none' | 'fade' | 'crossfade';
  /** 트랜지션 지속 시간 (초) */
  transitionDuration?: number;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 오디오 추출 옵션 인터페이스
 */
export interface ExtractAudioOptions {
  /** 오디오 코덱 */
  codec?: string;
  /** 비트레이트 (bps) */
  bitrate?: string | number;
  /** 샘플 레이트 (Hz) */
  sampleRate?: number;
  /** 채널 수 */
  channels?: number;
  /** 출력 형식 */
  format?: string;
  /** 볼륨 조정 (1.0 = 원본 볼륨) */
  volume?: number;
}

/**
 * 프레임 추출 옵션 인터페이스
 */
export interface ExtractFramesOptions {
  /** 프레임 레이트 (fps) - 몇 프레임마다 추출할지 */
  frameRate?: number;
  /** 특정 시간 위치 (초) - 특정 시간의 프레임만 추출 */
  timePositions?: number[];
  /** 출력 이미지 형식 */
  format?: 'jpg' | 'png';
  /** 출력 이미지 품질 (1-100) */
  quality?: number;
  /** 출력 이미지 너비 */
  width?: number;
  /** 출력 이미지 높이 */
  height?: number;
}

/**
 * 워터마크 옵션 인터페이스
 */
export interface WatermarkOptions {
  /** 워터마크 이미지 파일 경로 */
  imagePath: string;
  /** 워터마크 위치 X 좌표 (픽셀 또는 'left', 'center', 'right') */
  x: number | 'left' | 'center' | 'right';
  /** 워터마크 위치 Y 좌표 (픽셀 또는 'top', 'middle', 'bottom') */
  y: number | 'top' | 'middle' | 'bottom';
  /** 워터마크 크기 (너비) */
  width?: number;
  /** 워터마크 크기 (높이) */
  height?: number;
  /** 워터마크 투명도 (0-1) */
  opacity?: number;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 텍스트 오버레이 옵션 인터페이스
 */
export interface TextOverlayOptions {
  /** 텍스트 내용 */
  text: string;
  /** 폰트 파일 경로 */
  fontPath?: string;
  /** 폰트 크기 */
  fontSize?: number;
  /** 폰트 색상 (hex) */
  fontColor?: string;
  /** 텍스트 위치 X 좌표 (픽셀 또는 'left', 'center', 'right') */
  x: number | 'left' | 'center' | 'right';
  /** 텍스트 위치 Y 좌표 (픽셀 또는 'top', 'middle', 'bottom') */
  y: number | 'top' | 'middle' | 'bottom';
  /** 텍스트 배경색 (hex) */
  backgroundColor?: string;
  /** 텍스트 테두리 색상 (hex) */
  borderColor?: string;
  /** 텍스트 테두리 두께 */
  borderWidth?: number;
  /** 시작 시간 (초) */
  startTime?: number;
  /** 종료 시간 (초) */
  endTime?: number;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 필터 옵션 인터페이스
 */
export interface FilterOptions {
  /** 필터 유형 */
  type: 'brightness' | 'contrast' | 'saturation' | 'hue' | 'blur' | 'sharpen' | 'custom';
  /** 필터 값 */
  value: number;
  /** 사용자 정의 필터 문자열 (type이 'custom'일 때 사용) */
  customFilter?: string;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * 속도 조정 옵션 인터페이스
 */
export interface SpeedOptions {
  /** 속도 비율 (1.0 = 원본 속도, 0.5 = 절반 속도, 2.0 = 두 배 속도) */
  rate: number;
  /** 오디오 유지 여부 */
  keepAudio?: boolean;
  /** 오디오 피치 유지 여부 (keepAudio가 true일 때만 적용) */
  keepPitch?: boolean;
  /** 인코딩 옵션 */
  encodingOptions?: VideoEncodingOptions;
}

/**
 * FFmpeg 진행 상황 콜백 인터페이스
 */
export interface ProgressCallback {
  /** 현재 처리 중인 프레임 */
  frames: number;
  /** 현재 FPS */
  currentFps: number;
  /** 현재 KB */
  currentKbps: number;
  /** 대상 크기 */
  targetSize: number;
  /** 타임마크 */
  timemark: string;
  /** 처리된 시간 (초) */
  processedSeconds: number;
  /** 총 시간 (초) */
  totalSeconds: number;
  /** 진행률 (0-100) */
  percent: number;
}
