import React from 'react';
import { EffectParameter } from '../types';

interface EffectParameterEditorProps {
  parameter: EffectParameter;
  onChange: (id: string, value: any) => void;
}

/**
 * 효과 파라미터 편집 컴포넌트
 * 파라미터 타입에 따라 다른 입력 컨트롤을 렌더링합니다.
 */
export const EffectParameterEditor: React.FC<EffectParameterEditorProps> = ({ 
  parameter, 
  onChange 
}) => {
  // 파라미터 값 변경 처리
  const handleChange = (value: any) => {
    onChange(parameter.id, value);
  };

  // 숫자 타입 파라미터 렌더링
  const renderNumberInput = () => {
    return (
      <div className="parameter-control">
        <input
          type="range"
          min={parameter.min || 0}
          max={parameter.max || 100}
          step={parameter.step || 1}
          value={parameter.currentValue}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
        />
        <div className="parameter-value">
          <input
            type="number"
            min={parameter.min || 0}
            max={parameter.max || 100}
            step={parameter.step || 1}
            value={parameter.currentValue}
            onChange={(e) => handleChange(parseFloat(e.target.value))}
          />
        </div>
      </div>
    );
  };

  // 불리언 타입 파라미터 렌더링
  const renderBooleanInput = () => {
    return (
      <div className="parameter-control">
        <input
          type="checkbox"
          checked={parameter.currentValue}
          onChange={(e) => handleChange(e.target.checked)}
        />
      </div>
    );
  };

  // 선택형 파라미터 렌더링
  const renderSelectInput = () => {
    const options = Array.isArray(parameter.options)
      ? parameter.options
      : [];

    return (
      <div className="parameter-control">
        <select
          value={parameter.currentValue}
          onChange={(e) => handleChange(e.target.value)}
        >
          {options.map((option: any) => {
            const value = typeof option === 'object' ? option.value : option;
            const label = typeof option === 'object' ? option.label : option;
            
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  // 색상 파라미터 렌더링
  const renderColorInput = () => {
    return (
      <div className="parameter-control">
        <input
          type="color"
          value={parameter.currentValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="parameter-value">
          <input
            type="text"
            value={parameter.currentValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    );
  };

  // 파라미터 타입에 따른 입력 컨트롤 렌더링
  const renderInputByType = () => {
    switch (parameter.type) {
      case 'number':
        return renderNumberInput();
      case 'boolean':
        return renderBooleanInput();
      case 'select':
        return renderSelectInput();
      case 'color':
        return renderColorInput();
      default:
        return <div>지원되지 않는 파라미터 타입: {parameter.type}</div>;
    }
  };

  return (
    <div className="parameter-editor">
      <div className="parameter-name">{parameter.name}</div>
      {renderInputByType()}

      <style jsx>{`
        .parameter-editor {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }
        
        .parameter-name {
          width: 100px;
          font-size: 14px;
          margin-right: 12px;
        }
        
        .parameter-control {
          flex: 1;
          display: flex;
          align-items: center;
        }
        
        .parameter-control input[type="range"] {
          flex: 1;
          margin-right: 8px;
        }
        
        .parameter-value {
          width: 60px;
        }
        
        .parameter-value input {
          width: 100%;
          text-align: right;
          padding: 4px;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
        }
        
        .parameter-control select {
          width: 100%;
          padding: 4px;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
        }
        
        .parameter-control input[type="color"] {
          width: 32px;
          height: 24px;
          border: none;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};
