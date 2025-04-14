import React, { useEffect, useState } from 'react';
import { usePlayer } from './PlayerContext';
import './PlayerControls.css';

interface PlayerControlsProps {
  /** 컨트롤 표시 여부 */
  showControls: boolean;
  /** 시간 표시 형식 (기본: 'mm:ss') */
  timeFormat?: 'mm:ss' | 'hh:mm:ss' | 'seconds';
  /** 볼륨 컨트롤 표시 여부 */
  showVolumeControl?: boolean;
  /** 전체 화면 버튼 표시 여부 */
  showFullscreenButton?: boolean;
  /** 진행 바 표시 여부 */
  showProgressBar?: boolean;
}

/**
 * 시간을 포맷팅하는 함수
 */
const formatTime = (seconds: number, format: 'mm:ss' | 'hh:mm:ss' | 'seconds' = 'mm:ss'): string => {
  if (format === 'seconds') {
    return seconds.toFixed(1);
  }

  const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (format === 'hh:mm:ss' || hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  
  return `${pad(minutes)}:${pad(secs)}`;
};

/**
 * 플레이어 컨트롤 컴포넌트
 */
const PlayerControls: React.FC<PlayerControlsProps> = ({
  showControls,
  timeFormat = 'mm:ss',
  showVolumeControl = true,
  showFullscreenButton = true,
  showProgressBar = true,
}) => {
  const { state, dispatch, videoRef } = usePlayer();
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 컨트롤 표시 상태 관리
  useEffect(() => {
    if (!showControls) {
      setIsControlsVisible(false);
      return;
    }

    let hideTimeout: NodeJS.Timeout;
    
    const showControlsUI = () => {
      setIsControlsVisible(true);
      clearTimeout(hideTimeout);
      
      if (!state.isPlaying) return;
      
      hideTimeout = setTimeout(() => {
        if (!isDragging) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('mousemove', showControlsUI);
      videoElement.addEventListener('mouseenter', showControlsUI);
      videoElement.addEventListener('mouseleave', () => {
        if (!isDragging && state.isPlaying) {
          setIsControlsVisible(false);
        }
      });
    }

    return () => {
      clearTimeout(hideTimeout);
      if (videoElement) {
        videoElement.removeEventListener('mousemove', showControlsUI);
        videoElement.removeEventListener('mouseenter', showControlsUI);
      }
    };
  }, [showControls, state.isPlaying, isDragging, videoRef]);

  // 재생/일시정지 토글
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
      dispatch({ type: 'PAUSE' });
    } else {
      video.play();
      dispatch({ type: 'PLAY' });
    }
  };

  // 음소거 토글
  const handleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  // 볼륨 변경
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const volume = parseFloat(e.target.value);
    video.volume = volume;
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  // 시간 변경 (시크)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = parseFloat(e.target.value);
    video.currentTime = seekTime;
    dispatch({ type: 'SEEK', payload: seekTime });
  };

  // 전체 화면 토글
  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        console.error(`전체 화면 모드 전환 오류: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    
    dispatch({ type: 'TOGGLE_FULLSCREEN' });
  };

  // 진행 바 드래그 시작
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // 진행 바 드래그 종료
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 컨트롤이 표시되지 않으면 렌더링하지 않음
  if (!showControls && !isControlsVisible) {
    return null;
  }

  return (
    <div className={`player-controls ${isControlsVisible ? 'visible' : ''}`}>
      {showProgressBar && (
        <div className="progress-container">
          <input
            type="range"
            className="progress-bar"
            min={0}
            max={state.duration || 100}
            value={state.currentTime}
            onChange={handleSeek}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          />
          <div 
            className="progress-indicator" 
            style={{ width: `${(state.currentTime / (state.duration || 1)) * 100}%` }}
          />
        </div>
      )}
      
      <div className="controls-row">
        <button className="control-button" onClick={handlePlayPause}>
          {state.isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <div className="time-display">
          {formatTime(state.currentTime, timeFormat)} / {formatTime(state.duration, timeFormat)}
        </div>
        
        {showVolumeControl && (
          <div className="volume-control">
            <button className="control-button" onClick={handleMute}>
              {state.isMuted ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={1}
              step={0.1}
              value={state.volume}
              onChange={handleVolumeChange}
            />
          </div>
        )}
        
        {showFullscreenButton && (
          <button className="control-button" onClick={handleFullscreen}>
            {state.isFullscreen ? '⏹️' : '⛶'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerControls;
