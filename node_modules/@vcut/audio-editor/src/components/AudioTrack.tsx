import React, { useRef, useEffect } from 'react';
import { AudioTrack as AudioTrackType } from '../types';
import { useAudioEditor } from '../context/AudioEditorContext';

interface AudioTrackProps {
  track: AudioTrackType;
}

const AudioTrack: React.FC<AudioTrackProps> = ({ track }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    setSelectedTrack,
    setTrackVolume,
    toggleTrackMute,
    toggleTrackSolo,
    removeTrack
  } = useAudioEditor();

  // 파형 데이터를 캔버스에 그리는 함수
  useEffect(() => {
    if (!canvasRef.current || !track.waveformData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 파형 그리기
    const waveformData = track.waveformData;
    const dataLength = waveformData.length;
    const barWidth = canvas.width / dataLength;
    const canvasHeight = canvas.height;

    ctx.fillStyle = track.isSelected ? '#4f9df3' : '#3a7abd';
    ctx.strokeStyle = track.isSelected ? '#7fb5f5' : '#5a8fd3';
    ctx.lineWidth = 1;

    for (let i = 0; i < dataLength; i++) {
      const x = i * barWidth;
      const height = waveformData[i] * canvasHeight;
      const y = (canvasHeight - height) / 2;
      
      ctx.fillRect(x, y, barWidth, height);
      ctx.strokeRect(x, y, barWidth, height);
    }

    // 마커 그리기
    if (track.markers && track.markers.length > 0) {
      track.markers.forEach(marker => {
        const markerPosition = (marker.time / track.duration) * canvas.width;
        
        // 마커 선 그리기
        ctx.beginPath();
        ctx.moveTo(markerPosition, 0);
        ctx.lineTo(markerPosition, canvas.height);
        ctx.strokeStyle = marker.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 마커 이름 그리기
        ctx.fillStyle = marker.color;
        ctx.font = '10px Arial';
        ctx.fillText(marker.name, markerPosition + 2, 10);
      });
    }
  }, [track]);

  // 볼륨 변경 핸들러
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setTrackVolume(track.id, volume);
  };

  // 트랙 클릭 핸들러
  const handleTrackClick = () => {
    setSelectedTrack(track.id);
  };

  return (
    <div 
      className={`audio-track ${track.isSelected ? 'selected' : ''}`}
      onClick={handleTrackClick}
      style={{ 
        padding: '10px', 
        marginBottom: '10px', 
        border: `1px solid ${track.isSelected ? '#4f9df3' : '#ccc'}`,
        borderRadius: '4px',
        backgroundColor: track.isSelected ? '#f0f7ff' : '#f9f9f9',
        position: 'relative'
      }}
    >
      <div className="track-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div className="track-name" style={{ fontWeight: 'bold' }}>{track.name}</div>
        <div className="track-controls" style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackMute(track.id); }}
            style={{ 
              backgroundColor: track.muted ? '#ff6b6b' : '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            {track.muted ? '음소거 해제' : '음소거'}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleTrackSolo(track.id); }}
            style={{ 
              backgroundColor: track.solo ? '#ffd43b' : '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            {track.solo ? '솔로 해제' : '솔로'}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); removeTrack(track.id); }}
            style={{ 
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            제거
          </button>
        </div>
      </div>
      
      <div className="track-waveform" style={{ position: 'relative', marginBottom: '10px' }}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={100} 
          style={{ width: '100%', height: '100px' }}
        />
      </div>
      
      <div className="track-volume" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>볼륨:</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={track.volume} 
          onChange={handleVolumeChange}
          onClick={(e) => e.stopPropagation()}
          style={{ flex: 1 }}
        />
        <span>{Math.round(track.volume * 100)}%</span>
      </div>
      
      <div className="track-info" style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
        <span>시작: {track.startTime.toFixed(2)}초</span>
        <span style={{ marginLeft: '10px' }}>길이: {track.duration.toFixed(2)}초</span>
        {track.effects.length > 0 && (
          <span style={{ marginLeft: '10px' }}>효과: {track.effects.length}개</span>
        )}
      </div>
    </div>
  );
};

export default AudioTrack;
