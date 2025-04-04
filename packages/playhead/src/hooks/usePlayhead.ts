import { useReducer, useCallback, useEffect } from 'react';
import { PlayheadState, PlayheadAction } from '../types';

/**
 * Playhead 상태 관리를 위한 리듀서
 */
function playheadReducer(state: PlayheadState, action: PlayheadAction): PlayheadState {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
    case 'SET_IN_POINT':
      return { ...state, inPoint: action.payload };
    case 'SET_OUT_POINT':
      return { ...state, outPoint: action.payload };
    case 'CLEAR_IN_POINT':
      return { ...state, inPoint: undefined };
    case 'CLEAR_OUT_POINT':
      return { ...state, outPoint: undefined };
    case 'STEP_FORWARD': {
      // 프레임 단위 이동 (기본 30fps 가정)
      const frameTime = 1 / 30; // 30분의 1초
      const newTime = Math.min(state.currentTime + frameTime, action.payload);
      return { ...state, currentTime: newTime };
    }
    case 'STEP_BACKWARD': {
      // 프레임 단위 이동 (기본 30fps 가정)
      const frameTime = 1 / 30; // 30분의 1초
      const newTime = Math.max(state.currentTime - frameTime, 0);
      return { ...state, currentTime: newTime };
    }
    case 'JUMP_TO_START':
      // 시작 위치로 이동 (인포인트 또는 0)
      return { ...state, currentTime: state.inPoint !== undefined ? state.inPoint : 0 };
    case 'JUMP_TO_END':
      // 끝 위치로 이동 (아웃포인트 또는 전체 길이)
      return { ...state, currentTime: state.outPoint !== undefined ? state.outPoint : action.payload };
    default:
      return state;
  }
}

interface UsePlayheadOptions {
  /**
   * 전체 타임라인 길이 (초 단위)
   */
  duration: number;
  
  /**
   * 초기 재생 시간 (초 단위)
   */
  initialTime?: number;
  
  /**
   * 초기 재생 속도
   */
  initialPlaybackRate?: number;
  
  /**
   * 초기 인 포인트 (시작 마커)
   */
  initialInPoint?: number;
  
  /**
   * 초기 아웃 포인트 (종료 마커)
   */
  initialOutPoint?: number;
  
  /**
   * 시간 변경 콜백
   */
  onTimeUpdate?: (time: number) => void;
  
  /**
   * FPS (초당 프레임 수)
   */
  fps?: number;
}

/**
 * Playhead 상태 관리를 위한 커스텀 훅
 */
export function usePlayhead({
  duration,
  initialTime = 0,
  initialPlaybackRate = 1.0,
  initialInPoint,
  initialOutPoint,
  onTimeUpdate,
  fps = 30
}: UsePlayheadOptions) {
  // 초기 상태
  const initialState: PlayheadState = {
    currentTime: initialTime,
    isPlaying: false,
    playbackRate: initialPlaybackRate,
    inPoint: initialInPoint,
    outPoint: initialOutPoint
  };
  
  // 리듀서를 통한 상태 관리
  const [state, dispatch] = useReducer(playheadReducer, initialState);
  
  // 시간 업데이트 이펙트
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(state.currentTime);
    }
  }, [state.currentTime, onTimeUpdate]);
  
  // 키보드 단축키 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 다른 요소가 포커스되어 있을 때는 무시 (예: 입력 필드)
      if (document.activeElement instanceof HTMLInputElement || 
          document.activeElement instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case ' ': // 스페이스바: 재생/일시정지
          e.preventDefault();
          dispatch({ type: 'SET_PLAYING', payload: !state.isPlaying });
          break;
        case 'ArrowLeft': // 왼쪽 화살표: 프레임 뒤로
          e.preventDefault();
          dispatch({ type: 'STEP_BACKWARD', payload: null });
          break;
        case 'ArrowRight': // 오른쪽 화살표: 프레임 앞으로
          e.preventDefault();
          dispatch({ type: 'STEP_FORWARD', payload: duration });
          break;
        case 'Home': // Home: 처음으로
          e.preventDefault();
          dispatch({ type: 'JUMP_TO_START', payload: null });
          break;
        case 'End': // End: 끝으로
          e.preventDefault();
          dispatch({ type: 'JUMP_TO_END', payload: duration });
          break;
        case 'i': // i: 인 포인트 설정
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            dispatch({ type: 'SET_IN_POINT', payload: state.currentTime });
          }
          break;
        case 'o': // o: 아웃 포인트 설정
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            dispatch({ type: 'SET_OUT_POINT', payload: state.currentTime });
          }
          break;
        case 'x': // x: 인/아웃 포인트 제거
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            dispatch({ type: 'CLEAR_IN_POINT', payload: null });
            dispatch({ type: 'CLEAR_OUT_POINT', payload: null });
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isPlaying, state.currentTime, duration]);
  
  // 메모이즈된 액션 생성 함수들
  const setCurrentTime = useCallback((time: number) => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  }, []);
  
  const setPlaying = useCallback((isPlaying: boolean) => {
    dispatch({ type: 'SET_PLAYING', payload: isPlaying });
  }, []);
  
  const setPlaybackRate = useCallback((rate: number) => {
    dispatch({ type: 'SET_PLAYBACK_RATE', payload: rate });
  }, []);
  
  const stepFrame = useCallback((direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      dispatch({ type: 'STEP_FORWARD', payload: duration });
    } else {
      dispatch({ type: 'STEP_BACKWARD', payload: null });
    }
  }, [duration]);
  
  const jumpToStart = useCallback(() => {
    dispatch({ type: 'JUMP_TO_START', payload: null });
  }, []);
  
  const jumpToEnd = useCallback(() => {
    dispatch({ type: 'JUMP_TO_END', payload: duration });
  }, [duration]);
  
  const setInPoint = useCallback((time?: number) => {
    if (time !== undefined) {
      dispatch({ type: 'SET_IN_POINT', payload: time });
    } else {
      dispatch({ type: 'CLEAR_IN_POINT', payload: null });
    }
  }, []);
  
  const setOutPoint = useCallback((time?: number) => {
    if (time !== undefined) {
      dispatch({ type: 'SET_OUT_POINT', payload: time });
    } else {
      dispatch({ type: 'CLEAR_OUT_POINT', payload: null });
    }
  }, []);
  
  // 1프레임 시간 계산 (초 단위)
  const frameTime = 1 / fps;
  
  return {
    // 상태
    ...state,
    
    // 프레임 정보
    fps,
    frameTime,
    
    // 액션
    setCurrentTime,
    setPlaying,
    setPlaybackRate,
    stepFrame,
    jumpToStart,
    jumpToEnd,
    setInPoint,
    setOutPoint
  };
}

export default usePlayhead;
