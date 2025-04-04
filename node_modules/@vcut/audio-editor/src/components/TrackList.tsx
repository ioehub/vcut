import React from 'react';
import { useAudioEditor } from '../context/AudioEditorContext';
import AudioTrack from './AudioTrack';

const TrackList: React.FC = () => {
  const { state } = useAudioEditor();

  return (
    <div className="track-list" style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '15px' }}>오디오 트랙 ({state.tracks.length})</h3>
      
      {state.tracks.length === 0 ? (
        <div className="empty-state" style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          color: '#6c757d'
        }}>
          오디오 파일을 불러와 트랙을 추가해주세요.
        </div>
      ) : (
        <div className="tracks">
          {state.tracks.map(track => (
            <AudioTrack key={track.id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackList;
