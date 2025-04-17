import React from 'react';
import { PlayheadControlsProps } from '../types';
import { formatTime } from './Playhead';

/**
 * 재생 제어를 위한 컨트롤 컴포넌트
 * 
 * 재생/일시정지, 프레임 이동, 시간 표시 등의 기능을 제공합니다.
 */
export const PlayheadControls: React.FC<PlayheadControlsProps> = ({
  currentTime,
  duration,
  isPlaying,
  playbackRate,
  _onTimeChange, // 현재 사용되지 않음
  onPlayPause,
  onPlaybackRateChange,
  onFrameStep,
  onJumpToStart,
  onJumpToEnd
}) => {
  // 재생 속도 옵션
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  
  // 키보드 단축키 핸들러
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 다른 요소가 포커스되어 있을 때는 무시 (예: 입력 필드)
      if (document.activeElement instanceof HTMLInputElement || 
          document.activeElement instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case ' ': // 스페이스바: 재생/일시정지
          e.preventDefault();
          onPlayPause(!isPlaying);
          break;
        case 'ArrowLeft': // 왼쪽 화살표: 프레임 뒤로
          e.preventDefault();
          onFrameStep('backward');
          break;
        case 'ArrowRight': // 오른쪽 화살표: 프레임 앞으로
          e.preventDefault();
          onFrameStep('forward');
          break;
        case 'Home': // Home: 처음으로
          e.preventDefault();
          onJumpToStart();
          break;
        case 'End': // End: 끝으로
          e.preventDefault();
          onJumpToEnd();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, onPlayPause, onFrameStep, onJumpToStart, onJumpToEnd]);
  
  return (
    <div className="playhead-controls" style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      margin: '8px 0',
      gap: '8px'
    }}>
      {/* 현재 시간 표시 */}
      <div className="time-display" style={{
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '4px 8px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '4px',
        userSelect: 'none'
      }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      
      {/* 처음으로 버튼 */}
      <button 
        onClick={onJumpToStart}
        title="처음으로 (Home)"
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
          borderRadius: '4px',
          color: '#333'
        }}
      >
        ⏮️
      </button>
      
      {/* 프레임 뒤로 버튼 */}
      <button 
        onClick={() => onFrameStep('backward')}
        title="프레임 뒤로 (← 화살표)"
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
          borderRadius: '4px',
          color: '#333'
        }}
      >
        ⏪
      </button>
      
      {/* 재생/일시정지 버튼 */}
      <button 
        onClick={() => onPlayPause(!isPlaying)}
        title={isPlaying ? "일시정지 (Space)" : "재생 (Space)"}
        style={{
          border: 'none',
          backgroundColor: '#2196f3',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '8px 12px',
          borderRadius: '4px',
          color: 'white'
        }}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      
      {/* 프레임 앞으로 버튼 */}
      <button 
        onClick={() => onFrameStep('forward')}
        title="프레임 앞으로 (→ 화살표)"
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
          borderRadius: '4px',
          color: '#333'
        }}
      >
        ⏩
      </button>
      
      {/* 끝으로 버튼 */}
      <button 
        onClick={onJumpToEnd}
        title="끝으로 (End)"
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
          borderRadius: '4px',
          color: '#333'
        }}
      >
        ⏭️
      </button>
      
      {/* 재생 속도 선택 */}
      <select 
        value={playbackRate} 
        onChange={(e) => onPlaybackRateChange(parseFloat(e.target.value))}
        title="재생 속도"
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginLeft: '8px'
        }}
      >
        {speedOptions.map(speed => (
          <option key={speed} value={speed}>
            {speed}x
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlayheadControls;
