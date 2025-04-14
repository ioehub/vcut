import React from 'react';
import './FadeEffects.css';

interface FadeEffectsProps {
  fadeInDuration: number;
  fadeOutDuration: number;
  onFadeInChange: (duration: number) => void;
  onFadeOutChange: (duration: number) => void;
  onApplyFade: () => void;
  disabled: boolean;
}

const FadeEffects: React.FC<FadeEffectsProps> = ({
  fadeInDuration,
  fadeOutDuration,
  onFadeInChange,
  onFadeOutChange,
  onApplyFade,
  disabled
}) => {
  const handleFadeInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onFadeInChange(value);
  };
  
  const handleFadeOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onFadeOutChange(value);
  };
  
  return (
    <div className="fade-effects">
      <h3>페이드 효과</h3>
      
      <div className="fade-controls">
        <div className="fade-control">
          <label htmlFor="fadeIn">페이드 인 (초)</label>
          <div className="fade-slider-container">
            <input
              type="range"
              id="fadeIn"
              min="0"
              max="5"
              step="0.1"
              value={fadeInDuration}
              onChange={handleFadeInChange}
              disabled={disabled}
              className="fade-slider"
            />
            <span className="fade-value">{fadeInDuration.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="fade-control">
          <label htmlFor="fadeOut">페이드 아웃 (초)</label>
          <div className="fade-slider-container">
            <input
              type="range"
              id="fadeOut"
              min="0"
              max="5"
              step="0.1"
              value={fadeOutDuration}
              onChange={handleFadeOutChange}
              disabled={disabled}
              className="fade-slider"
            />
            <span className="fade-value">{fadeOutDuration.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onApplyFade}
        disabled={disabled}
        className="apply-fade-button"
      >
        페이드 적용
      </button>
      
      <div className="fade-info">
        {(fadeInDuration > 0 || fadeOutDuration > 0) ? (
          <p>
            {fadeInDuration > 0 && `시작부분 ${fadeInDuration.toFixed(1)}초 동안 페이드 인`}
            {fadeInDuration > 0 && fadeOutDuration > 0 && ', '}
            {fadeOutDuration > 0 && `종료부분 ${fadeOutDuration.toFixed(1)}초 동안 페이드 아웃`}
            이 적용됩니다.
          </p>
        ) : (
          <p>페이드 효과가 적용되지 않았습니다.</p>
        )}
      </div>
    </div>
  );
};

export default FadeEffects;
