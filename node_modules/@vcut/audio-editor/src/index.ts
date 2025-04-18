// 컴포넌트 내보내기
export { default as AudioTrack } from './components/AudioTrack';
export { default as TrackList } from './components/TrackList';
export { default as EffectsPanel } from './components/EffectsPanel';
export { default as TransportControls } from './components/TransportControls';
export { default as AudioFileUploader } from './components/AudioFileUploader';

// 페이지 내보내기
export { default as TestAudioEditor } from './pages/TestAudioEditor';

// 컨텍스트 및 훅 내보내기
export { 
  AudioEditorProvider as Provider, 
  useAudioEditor 
} from './context/AudioEditorContext';

// 서비스 내보내기
export { default as AudioService } from './services/AudioService';

// 타입 내보내기
export * from './types';

// UMD 호환성을 위한 기본 내보내기
import { AudioEditorProvider } from './context/AudioEditorContext';
export default {
  Provider: AudioEditorProvider
};
