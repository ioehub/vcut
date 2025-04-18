// 컴포넌트 내보내기
export { default as Playhead } from './components/Playhead';
export { default as PlayheadControls } from './components/PlayheadControls';
export { default as TimeRuler } from './components/TimeRuler';

// 컨텍스트 및 훅 내보내기
export { default as usePlayhead } from './hooks/usePlayhead';
export { PlayheadPlayheadProvider, usePlayheadContext } from './context/PlayheadContext';

// 타입 내보내기
export * from './types';

// 유틸리티 함수 내보내기
export { formatTime } from './components/Playhead';

// UMD 호환성을 위한 기본 내보내기
import { PlayheadPlayheadProvider } from './context/PlayheadContext';
import { default as Playhead } from './components/Playhead';
import { default as PlayheadControls } from './components/PlayheadControls';
import { default as TimeRuler } from './components/TimeRuler';
import { default as usePlayhead } from './hooks/usePlayhead';
import { formatTime } from './components/Playhead';

export default {
  Provider: PlayheadPlayheadProvider,
  Playhead,
  PlayheadControls,
  TimeRuler,
  usePlayhead,
  formatTime
};
