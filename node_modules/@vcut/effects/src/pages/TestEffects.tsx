import React, { useState } from 'react';
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
    <div 
      className="test-effects"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        color: '#333',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      <header 
        style={{
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid #e8e8e8'
        }}
      >
        <h1 style={{ fontSize: '24px', margin: 0 }}>효과 모듈 테스트 페이지</h1>
      </header>

      <div 
        className="container"
        style={{
          display: 'flex',
          gap: '24px'
        }}
      >
        <div 
          className="sidebar"
          style={{
            width: '300px',
            flexShrink: 0
          }}
        >
          <div 
            className="section"
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '12px' }}>클립 목록</h2>
            <div 
              className="clips-list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {dummyClips.map(clip => (
                <div 
                  key={clip.id} 
                  className={`clip-item ${selectedClip === clip.id ? 'selected' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedClip(clip.id)}
                >
                  <div 
                    className={`clip-type ${clip.type}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      marginRight: '8px'
                    }}
                  ></div>
                  <div className="clip-name">{clip.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="section"
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '12px' }}>효과 필터</h2>
            <div 
              className="effect-filters"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '12px'
              }}
            >
              <button 
                className={selectedEffectType === undefined ? 'active' : ''}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedEffectType(undefined)}
              >
                모든 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.VIDEO ? 'active' : ''}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedEffectType(EffectType.VIDEO)}
              >
                비디오 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.AUDIO ? 'active' : ''}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedEffectType(EffectType.AUDIO)}
              >
                오디오 효과
              </button>
              <button 
                className={selectedEffectType === EffectType.TRANSITION ? 'active' : ''}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedEffectType(EffectType.TRANSITION)}
              >
                전환 효과
              </button>
            </div>
          </div>

          <div 
            className="section"
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <EffectsList 
              type={selectedEffectType}
              onSelectEffect={handleSelectEffect}
            />
          </div>
        </div>

        <div 
          className="main-content"
          style={{
            flex: 1
          }}
        >
          <div 
            className="section"
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '12px' }}>적용된 효과</h2>
            {selectedClip ? (
              <div 
                className="applied-effects"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {getAppliedEffectsForClip().length === 0 ? (
                  <p style={{ color: '#666' }}>이 클립에 적용된 효과가 없습니다</p>
                ) : (
                  getAppliedEffectsForClip().map(effect => (
                    <div 
                      key={effect.id} 
                      className="applied-effect"
                      style={{
                        backgroundColor: '#f9f9f9',
                        padding: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <EffectEditor effectId={effect.id} />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p style={{ color: '#666' }}>클립을 선택하여 적용된 효과를 확인하세요</p>
            )}
          </div>

          <div 
            className="section"
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              marginBottom: '20px'
            }}
          >
            <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '12px' }}>미리보기</h2>
            <div 
              className="preview-container"
              style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                className="video-preview"
                style={{
                  textAlign: 'center'
                }}
              >
                <p>여기에 효과가 적용된 비디오 미리보기가 표시됩니다</p>
                <div 
                  className="placeholder-video"
                  style={{
                    width: '480px',
                    height: '270px',
                    backgroundColor: '#000',
                    margin: '0 auto',
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
