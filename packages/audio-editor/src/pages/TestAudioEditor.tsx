import React from 'react';
import { AudioEditorProvider } from '../context/AudioEditorContext';
import TrackList from '../components/TrackList';
import TransportControls from '../components/TransportControls';
import EffectsPanel from '../components/EffectsPanel';
import AudioFileUploader from '../components/AudioFileUploader';

const TestAudioEditor: React.FC = () => {
  return (
    <AudioEditorProvider>
      <div className="audio-editor-container" style={{ 
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div className="header" style={{
          marginBottom: '20px',
          borderBottom: '1px solid #dee2e6',
          paddingBottom: '20px'
        }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#343a40' }}>vCut 오디오 편집기</h1>
          <p style={{ margin: '0', color: '#6c757d' }}>
            오디오 트랙을 업로드하고 효과를 적용하여 편집해보세요.
          </p>
        </div>
        
        <div className="main-content" style={{ display: 'flex', gap: '20px' }}>
          <div className="left-panel" style={{ flex: '2', minWidth: '0' }}>
            <div className="upload-section" style={{ marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3em', color: '#343a40' }}>
                오디오 파일 업로드
              </h2>
              <AudioFileUploader />
            </div>
            
            <div className="transport-section" style={{ marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3em', color: '#343a40' }}>
                재생 컨트롤
              </h2>
              <TransportControls />
            </div>
            
            <div className="tracks-section">
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3em', color: '#343a40' }}>
                오디오 트랙
              </h2>
              <TrackList />
            </div>
          </div>
          
          <div className="right-panel" style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.3em', color: '#343a40' }}>
              오디오 효과
            </h2>
            <EffectsPanel />
          </div>
        </div>
        
        <div className="footer" style={{
          marginTop: '30px',
          borderTop: '1px solid #dee2e6',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9em'
        }}>
          vCut 오디오 편집 모듈 - 버전 0.1.0
        </div>
      </div>
    </AudioEditorProvider>
  );
};

export default TestAudioEditor;
