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
    return <div className="effect-editor-error">선택된 효과를 찾을 수 없습니다.</div>;
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
    <div className="effect-editor">
      <div className="effect-header">
        <h3>{appliedEffect.name}</h3>
        <div className="effect-actions">
          <button
            className={`toggle-button ${appliedEffect.isEnabled ? 'enabled' : 'disabled'}`}
            onClick={handleToggleEnabled}
          >
            {appliedEffect.isEnabled ? '활성화됨' : '비활성화됨'}
          </button>
          <button className="remove-button" onClick={handleRemoveEffect}>
            제거
          </button>
        </div>
      </div>

      <div className="effect-parameters">
        {appliedEffect.parameters.map(param => (
          <EffectParameterEditor
            key={param.id}
            parameter={param}
            onChange={handleParameterChange}
          />
        ))}
      </div>

      <style jsx>{`
        .effect-editor {
          padding: 16px;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        
        .effect-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .effect-header h3 {
          margin: 0;
        }
        
        .effect-actions {
          display: flex;
          gap: 8px;
        }
        
        .toggle-button {
          padding: 4px 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .toggle-button.enabled {
          background-color: #52c41a;
          color: white;
        }
        
        .toggle-button.disabled {
          background-color: #d9d9d9;
          color: rgba(0, 0, 0, 0.65);
        }
        
        .remove-button {
          padding: 4px 8px;
          background-color: #ff4d4f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .remove-button:hover {
          background-color: #ff7875;
        }
        
        .effect-parameters {
          background-color: white;
          padding: 12px;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .effect-editor-error {
          padding: 16px;
          color: #ff4d4f;
          background-color: #fff1f0;
          border: 1px solid #ffccc7;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
