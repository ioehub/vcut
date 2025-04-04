import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EffectsProvider, useEffects } from '../context/EffectsContext';
import { EffectsList } from '../components/EffectsList';
import { EffectEditor } from '../components/EffectEditor';
import { EffectType } from '../types';

/**
 * 테스트용 더미 클립 정보
 */
const dummyClips = [
  { id: uuidv4(), name: '비디오 클립 1', type: 'video' },
  { id: uuidv4(), name: '오디오 클립 1', type: 'audio' },
  { id: uuidv4(), name: '비디오 클립 2', type: 'video' }
];

/**
 * 효과 테스트 컴포넌트 - 내부 구현
 */
const TestEffectsContent: React.FC = () => {
  const { applyEffect, state, selectEffect } = useEffects();
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [selectedEffectType, setSelectedEffectType] = useState<EffectType | undefined>(undefined);

  // 효과 선택 처리
  const handleSelectEffect = async (effectId: string) => {
    if (selectedClip) {
      // 선택된 클립이 있으면 효과를 적용합니다
      const appliedEffect = await applyEffect(effectId, selectedClip, 'track-1');
      if (appliedEffect) {
        // 적용된 효과를 선택합니다
        selectEffect(appliedEffect.id);
      }
    } else {
      alert('먼저 클립을 선택해주세요');
    }
  };

  // 특정 클립에 적용된 모든 효과 목록 가져오기
  const getAppliedEffectsForClip = () => {
    if (!selectedClip) return [];
    return state.appliedEffects.filter(effect => effect.clipId === selectedClip);
  };

  return (
    <div className="test-effects">
      <header>
        <h1>효과 모듈 테스트 페이지</h1>
      </header>

      <div className="container">
        <div className="sidebar">
          <div className="section">
            <h2>클립 목록</h2>
            <div className="clips-list">
              {dummyClips.map(clip => (
                <div 
                  key={clip.id} 
                  className={`clip-item ${selectedClip === clip.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClip(clip.id)}
                >
                  <div className={`clip-type ${clip.type}`}></div>
                  <div className="clip-name">{clip.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>효과 필터</h2>
            <div className="effect-filters">
              <button 
                className={selectedEffectType === undefined ? 'active' : ''}
                onClick={() => setSelectedEffectType(undefined)}
              >
                모든 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.VIDEO ? 'active' : ''}
                onClick={() => setSelectedEffectType(EffectType.VIDEO)}
              >
                비디오 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.AUDIO ? 'active' : ''}
                onClick={() => setSelectedEffectType(EffectType.AUDIO)}
              >
                오디오 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.TRANSITION ? 'active' : ''}
                onClick={() => setSelectedEffectType(EffectType.TRANSITION)}
              >
                전환 효과
              </button>
            </div>
          </div>

          <div className="section">
            <EffectsList 
              type={selectedEffectType}
              onSelectEffect={handleSelectEffect}
            />
          </div>
        </div>

        <div className="main-content">
          <div className="section">
            <h2>적용된 효과</h2>
            {selectedClip ? (
              <div className="applied-effects">
                {getAppliedEffectsForClip().length === 0 ? (
                  <p>이 클립에 적용된 효과가 없습니다</p>
                ) : (
                  getAppliedEffectsForClip().map(effect => (
                    <div key={effect.id} className="applied-effect">
                      <EffectEditor effectId={effect.id} />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p>클립을 선택하여 적용된 효과를 확인하세요</p>
            )}
          </div>

          <div className="section">
            <h2>미리보기</h2>
            <div className="preview-container">
              <div className="video-preview">
                <p>여기에 효과가 적용된 비디오 미리보기가 표시됩니다</p>
                <div className="placeholder-video"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .test-effects {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        header {
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e8e8e8;
        }
        
        h1 {
          font-size: 24px;
          margin: 0;
        }
        
        h2 {
          font-size: 18px;
          margin-top: 0;
          margin-bottom: 12px;
        }
        
        .container {
          display: flex;
          gap: 24px;
        }
        
        .sidebar {
          width: 300px;
          flex-shrink: 0;
        }
        
        .main-content {
          flex: 1;
        }
        
        .section {
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 16px;
          margin-bottom: 20px;
        }
        
        .clips-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .clip-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .clip-item:hover {
          background-color: #e8e8e8;
        }
        
        .clip-item.selected {
          background-color: #e6f7ff;
          border-left: 3px solid #1890ff;
        }
        
        .clip-type {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .clip-type.video {
          background-color: #1890ff;
        }
        
        .clip-type.audio {
          background-color: #52c41a;
        }
        
        .effect-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .effect-filters button {
          padding: 6px 12px;
          background-color: #f5f5f5;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .effect-filters button:hover {
          background-color: #e8e8e8;
        }
        
        .effect-filters button.active {
          background-color: #1890ff;
          color: white;
        }
        
        .applied-effects {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .preview-container {
          background-color: #f0f0f0;
          border-radius: 4px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .video-preview {
          text-align: center;
        }
        
        .placeholder-video {
          width: 480px;
          height: 270px;
          background-color: #000;
          margin: 0 auto;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

/**
 * 효과 테스트 페이지 컴포넌트
 */
const TestEffects: React.FC = () => {
  return (
    <EffectsProvider>
      <TestEffectsContent />
    </EffectsProvider>
  );
};

export default TestEffects;
