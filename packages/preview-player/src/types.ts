/**
 * PreviewPlayer 컴포넌트 속성 타입
 */
export interface PreviewPlayerProps {
  /** 비디오 소스 URL */
  src: string;
  /** 자동 재생 여부 */
  autoPlay?: boolean;
  /** 컨트롤 표시 여부 */
  controls?: boolean;
  /** 루프 재생 여부 */
  loop?: boolean;
  /** 음소거 여부 */
  muted?: boolean;
  /** 포스터 이미지 URL */
  poster?: string;
  /** 재생 시작 시간 (초) */
  startTime?: number;
  /** 재생 종료 시간 (초) */
  endTime?: number;
  /** 너비 (픽셀 또는 CSS 값) */
  width?: number | string;
  /** 높이 (픽셀 또는 CSS 값) */
  height?: number | string;
  /** 재생 상태 변경 이벤트 핸들러 */
  onPlayStateChange?: (isPlaying: boolean) => void;
  /** 시간 변경 이벤트 핸들러 */
  onTimeUpdate?: (currentTime: number) => void;
  /** 비디오 로드 완료 이벤트 핸들러 */
  onLoadedData?: () => void;
  /** 비디오 종료 이벤트 핸들러 */
  onEnded?: () => void;
  /** 에러 발생 이벤트 핸들러 */
  onError?: (error: Error) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 플레이어 상태 타입
 */
export interface PlayerState {
  /** 현재 재생 중인지 여부 */
  isPlaying: boolean;
  /** 현재 시간 (초) */
  currentTime: number;
  /** 비디오 총 길이 (초) */
  duration: number;
  /** 볼륨 (0-1) */
  volume: number;
  /** 음소거 여부 */
  isMuted: boolean;
  /** 버퍼링 중인지 여부 */
  isBuffering: boolean;
  /** 비디오가 로드되었는지 여부 */
  isLoaded: boolean;
  /** 전체 화면 모드인지 여부 */
  isFullscreen: boolean;
}

/**
 * 플레이어 컨트롤 액션 타입
 */
export type PlayerAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SEEK'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_BUFFERING'; payload: boolean }
  | { type: 'SET_LOADED'; payload: boolean };

/**
 * 플레이어 컨텍스트 타입
 */
export interface PlayerContextType {
  /** 플레이어 상태 */
  state: PlayerState;
  /** 플레이어 액션 디스패치 함수 */
  dispatch: React.Dispatch<PlayerAction>;
  /** 비디오 요소 참조 */
  videoRef: React.RefObject<HTMLVideoElement>;
}
