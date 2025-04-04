/**
 * 오디오 편집 모듈에서 사용되는 기본 타입 정의
 */

/**
 * 오디오 트랙 인터페이스
 */
export interface AudioTrack {
  id: string;
  name: string;
  audioBuffer?: AudioBuffer;
  audioUrl?: string;
  volume: number;
  muted: boolean;
  solo: boolean;
  gain: number; // 게인 레벨 (0~2)
  pan: number; // 패닝 값 (-1: 왼쪽, 0: 중앙, 1: 오른쪽)
  duration: number;
  startTime: number;
  effects: AudioEffect[];
  markers: AudioMarker[];
  isSelected: boolean;
  waveformData?: number[]; // 파형 데이터
  peakData?: number[]; // 피크 레벨 데이터
}

/**
 * 오디오 마커 인터페이스
 */
export interface AudioMarker {
  id: string;
  name: string;
  time: number; // 마커 위치 (초)
  color: string;
}

/**
 * 오디오 효과 종류
 */
export enum AudioEffectType {
  GAIN = 'gain',
  EQ = 'eq',
  COMPRESSOR = 'compressor',
  REVERB = 'reverb',
  DELAY = 'delay',
  NOISE_REDUCTION = 'noiseReduction',
  FADE = 'fade',
  LIMITER = 'limiter',
  PITCH_SHIFT = 'pitchShift',
  TIME_STRETCH = 'timeStretch'
}

/**
 * 오디오 효과 인터페이스
 */
export interface AudioEffect {
  id: string;
  name: string;
  type: AudioEffectType;
  enabled: boolean;
  parameters: AudioEffectParameter[];
  startTime?: number; // 효과 시작 시간 (초)
  duration?: number; // 효과 지속 시간 (초)
}

/**
 * 오디오 효과 파라미터
 */
export interface AudioEffectParameter {
  id: string;
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
  unit?: string;
}

/**
 * EQ 밴드 인터페이스
 */
export interface EqBand {
  id: string;
  frequency: number;
  gain: number;
  q: number; // Q 값 (대역폭)
  type: 'lowpass' | 'highpass' | 'bandpass' | 'lowshelf' | 'highshelf' | 'peaking' | 'notch' | 'allpass';
  enabled: boolean;
}

/**
 * 오디오 편집기 상태 인터페이스
 */
export interface AudioEditorState {
  tracks: AudioTrack[];
  masterVolume: number;
  currentTime: number;
  isPlaying: boolean;
  isPaused: boolean;
  selectedTrackId: string | null;
  selectedMarker: string | null;
  zoom: number;
  loop: {
    enabled: boolean;
    start: number;
    end: number;
  };
  isRecording: boolean;
  sampleRate: number;
  duration: number;
}

/**
 * 오디오 편집기 액션 타입
 */
export type AudioEditorAction =
  | { type: 'ADD_TRACK'; payload: AudioTrack }
  | { type: 'REMOVE_TRACK'; payload: string }
  | { type: 'UPDATE_TRACK'; payload: { id: string; updates: Partial<AudioTrack> } }
  | { type: 'SET_TRACK_VOLUME'; payload: { id: string; volume: number } }
  | { type: 'TOGGLE_TRACK_MUTE'; payload: string }
  | { type: 'TOGGLE_TRACK_SOLO'; payload: string }
  | { type: 'SET_MASTER_VOLUME'; payload: number }
  | { type: 'ADD_EFFECT'; payload: { trackId: string; effect: AudioEffect } }
  | { type: 'REMOVE_EFFECT'; payload: { trackId: string; effectId: string } }
  | { type: 'UPDATE_EFFECT'; payload: { trackId: string; effectId: string; updates: Partial<AudioEffect> } }
  | { type: 'ADD_MARKER'; payload: { trackId: string; marker: AudioMarker } }
  | { type: 'REMOVE_MARKER'; payload: { trackId: string; markerId: string } }
  | { type: 'UPDATE_MARKER'; payload: { trackId: string; markerId: string; updates: Partial<AudioMarker> } }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'SET_LOOP'; payload: { enabled: boolean; start?: number; end?: number } }
  | { type: 'SELECT_TRACK'; payload: string | null }
  | { type: 'SELECT_MARKER'; payload: string | null }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_RECORDING' }
  | { type: 'SET_IS_PAUSED'; payload: boolean }
  | { type: 'SET_DURATION'; payload: number };
