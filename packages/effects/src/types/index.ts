/**
 * 효과 모듈에서 사용되는 기본 타입 정의
 */

/**
 * 효과 종류 enum
 */
export enum EffectType {
  VIDEO = 'video',
  AUDIO = 'audio',
  TRANSITION = 'transition',
  TEXT = 'text',
  COLOR = 'color'
}

/**
 * 효과 카테고리 enum
 */
export enum EffectCategory {
  FILTER = 'filter',
  DISTORTION = 'distortion',
  ANIMATION = 'animation',
  BLUR = 'blur',
  SHARPEN = 'sharpen',
  LIGHTING = 'lighting',
  AUDIO_FILTER = 'audioFilter',
  TRANSITION = 'transition',
  COLOR_CORRECTION = 'colorCorrection'
}

/**
 * 효과 파라미터의 타입 정의
 */
export interface EffectParameter {
  id: string;
  name: string;
  type: 'number' | 'boolean' | 'select' | 'color' | 'curve';
  defaultValue: any;
  currentValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[] | { label: string, value: any }[];
}

/**
 * 효과 기본 인터페이스
 */
export interface Effect {
  id: string;
  name: string;
  type: EffectType;
  category: EffectCategory;
  description: string;
  thumbnail?: string;
  parameters: EffectParameter[];
  applyToCanvas?: (canvas: HTMLCanvasElement, parameters: Record<string, any>) => Promise<void>;
  applyToAudio?: (audioBuffer: AudioBuffer, parameters: Record<string, any>) => Promise<AudioBuffer>;
  isEnabled: boolean;
}

/**
 * 타임라인 트랙 클립에 적용된 효과 인터페이스
 */
export interface AppliedEffect extends Effect {
  clipId: string;
  trackId: string;
  startTime?: number; // 효과 시작 시간 (ms)
  duration?: number; // 효과 지속 시간 (ms)
  keyframes?: EffectKeyframe[];
}

/**
 * 효과 키프레임 인터페이스
 */
export interface EffectKeyframe {
  time: number; // 키프레임 시간 (ms)
  parameters: Record<string, any>; // 파라미터 값
}

/**
 * 효과 컨텍스트 상태 인터페이스
 */
export interface EffectsContextState {
  availableEffects: Effect[];
  appliedEffects: AppliedEffect[];
  selectedEffectId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 효과 컨텍스트 액션 타입
 */
export type EffectsContextAction =
  | { type: 'LOAD_EFFECTS'; payload: Effect[] }
  | { type: 'APPLY_EFFECT'; payload: AppliedEffect }
  | { type: 'UPDATE_EFFECT'; payload: { id: string; updates: Partial<AppliedEffect> } }
  | { type: 'REMOVE_EFFECT'; payload: string }
  | { type: 'SELECT_EFFECT'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
