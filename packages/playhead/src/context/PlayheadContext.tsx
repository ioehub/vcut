import React, { createContext, useContext, ReactNode } from 'react';
import usePlayhead from '../hooks/usePlayhead';

// 타입 정의
type PlayheadContextType = {
  currentTime: number;
  isPlaying: boolean;
  playbackRate: number;
  inPoint?: number;
  outPoint?: number;
  fps: number;
  frameTime: number;
  setCurrentTime: (time: number) => void;
  setPlaying: (isPlaying: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  stepFrame: (direction: 'forward' | 'backward') => void;
  jumpToStart: () => void;
  jumpToEnd: () => void;
  setInPoint: (time?: number) => void;
  setOutPoint: (time?: number) => void;
};

// 기본 컨텍스트 값
const defaultContextValue: PlayheadContextType = {
  currentTime: 0,
  isPlaying: false,
  playbackRate: 1.0,
  inPoint: undefined,
  outPoint: undefined,
  fps: 30,
  frameTime: 1/30,
  setCurrentTime: () => {},
  setPlaying: () => {},
  setPlaybackRate: () => {},
  stepFrame: () => {},
  jumpToStart: () => {},
  jumpToEnd: () => {},
  setInPoint: () => {},
  setOutPoint: () => {}
};

// 컨텍스트 생성
export const PlayheadContext = createContext<PlayheadContextType>(defaultContextValue);

// Provider 컴포넌트
export const PlayheadPlayheadProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const playheadState = usePlayhead({
    duration: 60, // 기본값
    initialTime: 0,
    onTimeUpdate: () => {}
  });

  return (
    <PlayheadContext.Provider value={playheadState as unknown as PlayheadContextType}>
      {children}
    </PlayheadContext.Provider>
  );
};

// 커스텀 훅
export const usePlayheadContext = () => useContext(PlayheadContext);
