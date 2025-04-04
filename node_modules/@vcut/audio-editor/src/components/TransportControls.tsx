import React from 'react';
import { useAudioEditor } from '../context/AudioEditorContext';

const TransportControls: React.FC = () => {
  const { 
    state, 
    play, 
    pause, 
    stop, 
    setCurrentTime, 
    setLoop 
  } = useAudioEditor();
  
  const { isPlaying, currentTime, duration, loop } = state;

  // 시간 형식 변환 (초 -> MM:SS.ms)
  const formatTime = (time: number): string => {
    // 유효하지 않은 시간 값 처리
    if (isNaN(time) || time < 0) {
      console.warn('유효하지 않은 시간 값:', time);
      return '00:00.00';
    }
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    
    // 디버그: 중요한 시간 변화 기록
    if (time > 0 && time % 5 < 0.03) {
      console.log(`시간 포맷: ${time} -> ${minutes}:${seconds}.${milliseconds}`);
    }
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  // 시간 위치 변경 핸들러
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  // 루프 토글 핸들러
  const handleLoopToggle = () => {
    setLoop(!loop.enabled, loop.start, loop.end);
  };

  // 루프 시작 지점 설정 핸들러
  const handleSetLoopStart = () => {
    setLoop(true, currentTime, loop.end);
  };

  // 루프 종료 지점 설정 핸들러
  const handleSetLoopEnd = () => {
    setLoop(true, loop.start, currentTime);
  };

  return (
    <div className="transport-controls" style={{ 
      padding: '15px', 
      backgroundColor: '#f1f3f5', 
      borderRadius: '6px',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="playback-controls" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '15px',
        gap: '15px'
      }}>
        <button 
          onClick={stop}
          style={{ 
            backgroundColor: '#343a40',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="정지"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect width="12" height="12" x="2" y="2" />
          </svg>
        </button>
        {isPlaying ? (
          <button 
            onClick={pause}
            style={{ 
              backgroundColor: '#495057',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="일시정지"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <rect width="4" height="14" x="3" y="1" />
              <rect width="4" height="14" x="9" y="1" />
            </svg>
          </button>
        ) : (
          <button 
            onClick={play}
            style={{ 
              backgroundColor: '#4f9df3',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="재생"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="2,1 14,8 2,15" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="time-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ minWidth: '70px', fontFamily: 'monospace' }}>
          {formatTime(currentTime)}
        </span>
        <input 
          type="range" 
          min="0" 
          max={duration || 100} 
          step="0.01" 
          value={currentTime} 
          onChange={handleTimeChange}
          style={{ flex: 1 }}
        />
        <span style={{ minWidth: '70px', fontFamily: 'monospace', textAlign: 'right' }}>
          {formatTime(duration)}
        </span>
      </div>
      
      <div className="loop-controls" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '15px',
        gap: '10px'
      }}>
        <button 
          onClick={handleLoopToggle}
          style={{ 
            backgroundColor: loop.enabled ? '#4f9df3' : '#f8f9fa',
            color: loop.enabled ? 'white' : '#495057',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          {loop.enabled ? '루프 켜짐' : '루프 꺼짐'}
        </button>
        <button 
          onClick={handleSetLoopStart}
          disabled={!loop.enabled}
          style={{ 
            backgroundColor: loop.enabled ? '#e9ecef' : '#f8f9fa',
            color: loop.enabled ? '#495057' : '#adb5bd',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: loop.enabled ? 'pointer' : 'not-allowed',
            fontSize: '0.9em'
          }}
        >
          시작: {formatTime(loop.start)}
        </button>
        <button 
          onClick={handleSetLoopEnd}
          disabled={!loop.enabled}
          style={{ 
            backgroundColor: loop.enabled ? '#e9ecef' : '#f8f9fa',
            color: loop.enabled ? '#495057' : '#adb5bd',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: loop.enabled ? 'pointer' : 'not-allowed',
            fontSize: '0.9em'
          }}
        >
          끝: {formatTime(loop.end)}
        </button>
      </div>
    </div>
  );
};

export default TransportControls;
