import React from 'react';

// 컴포넌트 타입 선언
export const Playhead: React.FC<PlayheadProps>;
export const PlayheadControls: React.FC<PlayheadControlsProps>;
export const TimeRuler: React.FC<TimeRulerProps>;

// 훅 타입 선언
export function usePlayhead(options?: UsePlayheadOptions): UsePlayheadReturn;

// 유틸리티 함수 타입 선언
export function formatTime(seconds: number, showMilliseconds?: boolean): string;

// 인터페이스 선언
export interface PlayheadProps {
  currentTime?: number;
  duration?: number;
  scale?: number;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
  [key: string]: any;
}

export interface PlayheadControlsProps {
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onSeekBackward?: () => void;
  onSeekForward?: () => void;
  [key: string]: any;
}

export interface TimeRulerProps {
  scale?: number;
  duration?: number;
  currentTime?: number;
  onTimeUpdate?: (time: number) => void;
  [key: string]: any;
}

export interface UsePlayheadOptions {
  initialTime?: number;
  duration?: number;
  autoPlay?: boolean;
}

export interface UsePlayheadReturn {
  currentTime: number;
  isPlaying: boolean;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  seekRelative: (offset: number) => void;
}
