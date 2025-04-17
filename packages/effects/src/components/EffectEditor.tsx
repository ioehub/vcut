import React from 'react';
import { useEffects } from '../context/EffectsContext';
import { AppliedEffect } from '../types';
import { EffectParameterEditor } from './EffectParameterEditor';

interface EffectEditorProps {
  effectId: string;
}

/**
 * 적용된 효과의 파라미터를 편집하는 컴포넌트
 */
export const EffectEditor: React.FC<EffectEditorProps> = ({ effectId }) => {
  const { state, updateEffectParameter, removeEffect } = useEffects();
  
  // 적용된 효과 찾기
  const appliedEffect = state.appliedEffects.find(effect => effect.id === effectId);
  
  if (!appliedEffect) {
    return (
      <div 
        className="effect-editor-error"
        style={{
          padding: '16px',
          color: '#ff4d4f',
          backgroundColor: '#fff1f0',
          border: '1px solid #ffccc7',
          borderRadius: '4px'
        }}
      >
        선택된 효과를 찾을 수 없습니다.
      </div>
    );
  }
  
  // 효과 파라미터 변경 처리
  const handleParameterChange = async (parameterId: string, value: any) => {
    await updateEffectParameter(effectId, parameterId, value);
  };
  
  // 효과 제거 처리
  const handleRemoveEffect = async () => {
    await removeEffect(effectId);
  };
  
  // 효과 활성화/비활성화 토글
  const handleToggleEnabled = async () => {
    const newValue = !appliedEffect.isEnabled;
    await updateEffectParameter(effectId, 'isEnabled', newValue);
  };

  return (
    <div 
      className="effect-editor"
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '16px'
      }}
    >
      <div 
        className="effect-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h3 style={{ margin: 0 }}>{appliedEffect.name}</h3>
        <div className="effect-actions">
          <button
            className={`toggle-button ${appliedEffect.isEnabled ? 'enabled' : 'disabled'}`}
            onClick={handleToggleEnabled}
            style={{
              padding: '4px 8px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {appliedEffect.isEnabled ? '활성화됨' : '비활성화됨'}
          </button>
          <button 
            className="remove-button"
            onClick={handleRemoveEffect}
            style={{
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            제거
          </button>
        </div>
      </div>

      <div 
        className="effect-parameters"
        style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '4px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}
      >
        {appliedEffect.parameters.map(param => (
          <EffectParameterEditor
            key={param.id}
            parameter={param}
            onChange={handleParameterChange}
          />
        ))}
      </div>
    </div>
  );
};
