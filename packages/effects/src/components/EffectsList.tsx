import React, { useEffect } from 'react';
import { useEffects } from '../context/EffectsContext';
import { EffectType, EffectCategory } from '../types';

interface EffectsListProps {
  type?: EffectType;
  category?: EffectCategory;
  onSelectEffect: (effectId: string) => void;
}

/**
 * 사용 가능한 효과 목록을 표시하는 컴포넌트
 */
export const EffectsList: React.FC<EffectsListProps> = ({ type, category, onSelectEffect }) => {
  const { state, loadEffects, getEffectsByType, getEffectsByCategory } = useEffects();

  useEffect(() => {
    loadEffects();
  }, [loadEffects]);

  // 필터링된 효과 목록 가져오기
  const getFilteredEffects = () => {
    if (type && category) {
      return state.availableEffects.filter(
        effect => effect.type === type && effect.category === category
      );
    } else if (type) {
      return getEffectsByType(type);
    } else if (category) {
      return getEffectsByCategory(category);
    }
    return state.availableEffects;
  };

  const filteredEffects = getFilteredEffects();

  return (
    <div className="effects-list">
      <h3>사용 가능한 효과</h3>
      {state.isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="effects-grid">
          {filteredEffects.length === 0 ? (
            <p>사용 가능한 효과가 없습니다.</p>
          ) : (
            filteredEffects.map(effect => (
              <div 
                key={effect.id} 
                className="effect-item"
                onClick={() => onSelectEffect(effect.id)}
              >
                {effect.thumbnail && (
                  <div className="effect-thumbnail">
                    {/* 실제 이미지 대신 색상 블록으로 대체 */}
                    <div 
                      className="effect-thumbnail-placeholder"
                      style={{ 
                        backgroundColor: 
                          effect.type === EffectType.VIDEO ? '#1890ff' : 
                          effect.type === EffectType.AUDIO ? '#52c41a' : 
                          effect.type === EffectType.TRANSITION ? '#faad14' : '#d9d9d9'
                      }} 
                    />
                  </div>
                )}
                <div className="effect-info">
                  <div className="effect-name">{effect.name}</div>
                  <div className="effect-type">{effect.category}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {state.error && (
        <div className="error-message">{state.error}</div>
      )}

      <style jsx>{`
        .effects-list {
          padding: 16px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        
        h3 {
          margin-top: 0;
          margin-bottom: 16px;
        }
        
        .effects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }
        
        .effect-item {
          background-color: #fff;
          border-radius: 4px;
          padding: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .effect-item:hover {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .effect-thumbnail {
          width: 100%;
          height: 70px;
          margin-bottom: 8px;
          overflow: hidden;
          border-radius: 3px;
          background-color: #f0f0f0;
        }
        
        .effect-thumbnail-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .effect-info {
          text-align: center;
        }
        
        .effect-name {
          font-weight: 500;
          font-size: 0.9em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .effect-type {
          font-size: 0.8em;
          color: #888;
          margin-top: 2px;
        }
        
        .error-message {
          margin-top: 16px;
          color: #ff4d4f;
        }
      `}</style>
    </div>
  );
};
