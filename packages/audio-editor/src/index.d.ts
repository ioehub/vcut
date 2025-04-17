// 컴포넌트 타입 선언
export const AudioTrack: React.FC<any>;
export const TrackList: React.FC<any>;
export const EffectsPanel: React.FC<any>;
export const TransportControls: React.FC<any>;
export const AudioFileUploader: React.FC<any>;

// 페이지 타입 선언
export const TestAudioEditor: React.FC;

// 컨텍스트 및 훅 타입 선언
export const AudioEditorProvider: React.FC<{children: React.ReactNode}>;
export function useAudioEditor(): any;

// 서비스 타입 선언
export const AudioService: any;

// 타입 내보내기
export * from './types';
