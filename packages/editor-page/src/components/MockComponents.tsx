import React from 'react';

// 다른 패키지의 컴포넌트를 임시로 대체할 목업 컴포넌트들
export const Playhead: React.FC = () => (
  <div className="mock-playhead" style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#333',
    color: 'white'
  }}>
    Playhead 컴포넌트 (목업)
  </div>
);

export const Timeline: React.FC<{ zoom: number, scrollPosition: number }> = ({ zoom, scrollPosition }) => (
  <div className="mock-timeline" style={{ 
    width: '100%', 
    height: '100%', 
    backgroundColor: '#252525',
    color: 'white',
    padding: '10px'
  }}>
    <p>Timeline 컴포넌트 (목업)</p>
    <p>줌: {zoom}, 스크롤 위치: {scrollPosition}</p>
  </div>
);

export const Toolbar: React.FC<{ 
  currentMode: string, 
  onModeChange: (mode: any) => void,
  onSave: () => void,
  onExport: (options: any) => void
}> = ({ currentMode, onModeChange }) => (
  <div className="mock-toolbar" style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    color: 'white',
    padding: '0 10px'
  }}>
    <span>Toolbar 컴포넌트 (목업) - 현재 모드: {currentMode}</span>
    <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
      <button onClick={() => onModeChange('video')}>비디오</button>
      <button onClick={() => onModeChange('audio')}>오디오</button>
      <button onClick={() => onModeChange('text')}>텍스트</button>
      <button onClick={() => onModeChange('effects')}>효과</button>
    </div>
  </div>
);

export const MediaBrowser: React.FC<{ 
  mediaFiles: any[], 
  selectedMediaId: string | null 
}> = ({ mediaFiles, selectedMediaId }) => (
  <div className="mock-media-browser" style={{ 
    width: '100%', 
    height: '100%', 
    backgroundColor: '#252525',
    color: 'white',
    padding: '10px'
  }}>
    <p>MediaBrowser 컴포넌트 (목업)</p>
    <p>미디어 파일 수: {mediaFiles.length}</p>
    <p>선택된 미디어 ID: {selectedMediaId || '없음'}</p>
  </div>
);

export const EffectsPanel: React.FC = () => (
  <div className="mock-effects-panel" style={{ 
    width: '100%', 
    height: '100%', 
    backgroundColor: '#252525',
    color: 'white',
    padding: '10px'
  }}>
    <p>EffectsPanel 컴포넌트 (목업)</p>
    <ul>
      <li>효과 1</li>
      <li>효과 2</li>
      <li>효과 3</li>
    </ul>
  </div>
);
