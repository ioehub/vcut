/**
 * Playhead 모듈 타입 정의
 */

export interface PlayheadOptions {
  /** 현재 재생 위치 (초 단위) */
  currentTime: number;
  /** 전체 타임라인 길이 (초 단위) */
  duration: number;
  /** 픽셀 당 초 단위 (scale이 100이면 1초가 100px) */
  scale: number;
  /** 재생 상태 */
  isPlaying: boolean;
  /** 루프 재생 여부 */
  isLooping?: boolean;
  /** 재생 속도 (1.0 = 정상 속도) */
  playbackRate?: number;
  /** 시작 마커 위치 (초 단위) */
  inPoint?: number;
  /** 종료 마커 위치 (초 단위) */
  outPoint?: number;
}

export interface PlayheadProps extends PlayheadOptions {
  /** 타임라인 컨테이너의 오프셋 (보통 트랙 레이블 너비) */
  timelineOffset?: number;
  /** 현재 시간 변경 핸들러 */
  onTimeChange: (time: number) => void;
  /** 재생 상태 변경 핸들러 */
  onPlayPause?: (isPlaying: boolean) => void;
  /** 인/아웃 포인트 변경 핸들러 */
  onInOutPointChange?: (inPoint: number | undefined, outPoint: number | undefined) => void;
  /** 인/아웃 포인트 변경 핸들러 (deprecated) */
  _onInOutPointChange?: (inPoint: number | undefined, outPoint: number | undefined) => void;
  /** 드래그 시작 핸들러 */
  onDragStart?: () => void;
  /** 드래그 종료 핸들러 */
  onDragEnd?: () => void;
}

export interface PlayheadControlsProps {
  /** 현재 재생 위치 (초 단위) */
  currentTime: number;
  /** 전체 타임라인 길이 (초 단위) */
  duration: number;
  /** 재생 상태 */
  isPlaying: boolean;
  /** 재생 속도 (1.0 = 정상 속도) */
  playbackRate: number;
  /** 현재 시간 변경 핸들러 */
  onTimeChange: (time: number) => void;
  /** 현재 시간 변경 핸들러 (deprecated) */
  _onTimeChange?: (time: number) => void;
  /** 재생 상태 변경 핸들러 */
  onPlayPause: (isPlaying: boolean) => void;
  /** 재생 속도 변경 핸들러 */
  onPlaybackRateChange: (rate: number) => void;
  /** 프레임 단위 이동 핸들러 */
  onFrameStep: (direction: 'forward' | 'backward') => void;
  /** 처음으로 이동 핸들러 */
  onJumpToStart: () => void;
  /** 끝으로 이동 핸들러 */
  onJumpToEnd: () => void;
}

export interface TimeRulerProps {
  /** 전체 타임라인 길이 (초 단위) */
  duration: number;
  /** 픽셀 당 초 단위 (scale이 100이면 1초가 100px) */
  scale: number;
  /** 현재 재생 위치 (초 단위) */
  currentTime: number;
  /** 타임라인 컨테이너의 오프셋 (보통 트랙 레이블 너비) */
  timelineOffset?: number;
  /** 시간 변경 핸들러 */
  onTimeChange: (time: number) => void;
  /** 표시할 시간 간격 (초 단위) */
  timeInterval?: number;
}

export interface PlayheadState {
  currentTime: number;
  isPlaying: boolean;
  playbackRate: number;
  inPoint?: number;
  outPoint?: number;
}

export interface PlayheadAction {
  type: 
    | 'SET_CURRENT_TIME' 
    | 'SET_PLAYING' 
    | 'SET_PLAYBACK_RATE'
    | 'SET_IN_POINT'
    | 'SET_OUT_POINT'
    | 'CLEAR_IN_POINT'
    | 'CLEAR_OUT_POINT'
    | 'STEP_FORWARD'
    | 'STEP_BACKWARD'
    | 'JUMP_TO_START'
    | 'JUMP_TO_END';
  payload?: any;
}
