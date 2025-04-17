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
    <div 
      className="effects-list"
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}
    >
      <h3 
        style={{ 
          marginTop: 0, 
          marginBottom: '16px' 
        }}
      >
        사용 가능한 효과
      </h3>
      {state.isLoading ? (
        <p 
          style={{ 
            textAlign: 'center', 
            padding: '20px' 
          }}
        >
          로딩 중...
        </p>
      ) : (
        <div 
          className="effects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '12px'
          }}
        >
          {filteredEffects.length === 0 ? (
            <p 
              style={{ 
                textAlign: 'center', 
                padding: '20px' 
              }}
            >
              사용 가능한 효과가 없습니다.
            </p>
          ) : (
            filteredEffects.map(effect => (
              <div 
                key={effect.id} 
                className="effect-item"
                onClick={() => onSelectEffect(effect.id)}
                style={{
                  backgroundColor: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {effect.thumbnail && (
                  <div 
                    className="effect-thumbnail"
                    style={{
                      width: '100%',
                      height: '70px',
                      marginBottom: '8px',
                      overflow: 'hidden',
                      borderRadius: '3px',
                      backgroundColor: '#f0f0f0'
                    }}
                  >
                    {/* 실제 이미지 대신 색상 블록으로 대체 */}
                    <div 
                      className="effect-thumbnail-placeholder"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        backgroundColor: 
                          effect.type === EffectType.VIDEO ? '#1890ff' : 
                          effect.type === EffectType.AUDIO ? '#52c41a' : 
                          effect.type === EffectType.TRANSITION ? '#faad14' : '#d9d9d9'
                      }} 
                    />
                  </div>
                )}
                <div 
                  className="effect-info"
                  style={{
                    textAlign: 'center'
                  }}
                >
                  <div 
                    className="effect-name"
                    style={{
                      fontWeight: '500',
                      fontSize: '0.9em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {effect.name}
                  </div>
                  <div 
                    className="effect-type"
                    style={{
                      fontSize: '0.8em',
                      color: '#888',
                      marginTop: '2px'
                    }}
                  >
                    {effect.category}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {state.error && (
        <div 
          className="error-message"
          style={{
            color: '#ff4d4f',
            padding: '12px',
            backgroundColor: '#fff1f0',
            border: '1px solid #ffccc7',
            borderRadius: '4px',
            marginTop: '16px'
          }}
        >
          {state.error}
        </div>
      )}
    </div>
  );
};
