import React, { createContext, useContext, useReducer, useRef } from 'react';
import { PlayerState, PlayerAction, PlayerContextType } from './types';

// 초기 플레이어 상태
const initialState: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isBuffering: false,
  isLoaded: false,
  isFullscreen: false,
};

// 플레이어 상태 리듀서
function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SEEK':
      return { ...state, currentTime: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_BUFFERING':
      return { ...state, isBuffering: action.payload };
    case 'SET_LOADED':
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
}

// 플레이어 컨텍스트 생성
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// 플레이어 컨텍스트 제공자 컴포넌트
export const PreviewPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const videoRef = useRef<HTMLVideoElement>(null);

  const value = { state, dispatch, videoRef };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

// 플레이어 컨텍스트 사용 훅
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PreviewPlayerProvider');
  }
  return context;
};

export default PlayerContext;
