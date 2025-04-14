import React from 'react';
import './AudioControls.css';

interface AudioControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  disabled: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  disabled
}) => {
  return (
    <div className="audio-controls">
      {!isPlaying ? (
        <button 
          onClick={onPlay} 
          disabled={disabled}
          className="control-button play-button"
          title="재생"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
          재생
        </button>
      ) : (
        <button 
          onClick={onPause} 
          disabled={disabled}
          className="control-button pause-button"
          title="일시정지"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor" />
          </svg>
          일시정지
        </button>
      )}
      
      <button 
        onClick={onStop} 
        disabled={disabled || (!isPlaying && !isPaused)}
        className="control-button stop-button"
        title="정지"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M6 6h12v12H6z" fill="currentColor" />
        </svg>
        정지
      </button>
    </div>
  );
};

export default AudioControls;
