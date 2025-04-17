import React from 'react';

// 컴포넌트 타입 선언
export const AudioTrack: React.FC<any>;
export const TrackList: React.FC<any>;
export const EffectsPanel: React.FC<any>;
export const TransportControls: React.FC<any>;
export const AudioFileUploader: React.FC<any>;

// 페이지 타입 선언
export const TestAudioEditor: React.FC;

// 컨텍스트 및 훅 타입 선언
export interface AudioEditorContextType {
  // 필요한 속성들을 여기에 추가
  tracks: any[];
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  addTrack: (track: any) => void;
  removeTrack: (trackId: string) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

export const AudioEditorProvider: React.FC<{children: React.ReactNode}>;
export function useAudioEditor(): AudioEditorContextType;

// 서비스 타입 선언
export const AudioService: any;

// 타입 내보내기
export interface AudioTrackType {
  id: string;
  name: string;
  audioBuffer?: AudioBuffer;
  source?: string;
  volume: number;
  muted: boolean;
  effects: any[];
}

export interface AudioEffect {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  parameters: AudioEffectParameter[];
}

export interface AudioEffectParameter {
  id: string;
  name: string;
  type: string;
  min?: number;
  max?: number;
  defaultValue: any;
  currentValue: any;
}
