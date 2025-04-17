import React, { useState } from 'react';
import { useAudioEditor } from '../context/AudioEditorContext';
import { AudioEffect, AudioEffectType, AudioEffectParameter } from '../types';

const EffectsPanel: React.FC = () => {
  const { 
    state, 
    addEffect, 
    removeEffect, 
    updateEffect 
  } = useAudioEditor();
  
  const [selectedEffectType, setSelectedEffectType] = useState<AudioEffectType>(AudioEffectType.GAIN);
  const { selectedTrackId } = state;
  
  const selectedTrack = selectedTrackId 
    ? state.tracks.find(track => track.id === selectedTrackId) 
    : null;

  const handleAddEffect = () => {
    if (!selectedTrackId) return;

    // 효과 유형에 따라 기본 파라미터 생성
    const parameters: AudioEffectParameter[] = [];
    
    switch (selectedEffectType) {
      case AudioEffectType.GAIN:
        parameters.push({
          id: 'gain',
          name: '게인',
          value: 1,
          minValue: 0,
          maxValue: 2,
          defaultValue: 1,
          step: 0.01,
          unit: 'x'
        });
        break;
        
      case AudioEffectType.EQ:
        parameters.push(
          {
            id: 'type',
            name: '필터 유형',
            value: 0, // peaking을 의미
            minValue: 0,
            maxValue: 7, // 8가지 필터 유형
            defaultValue: 0,
            step: 1
          },
          {
            id: 'frequency',
            name: '주파수',
            value: 1000,
            minValue: 20,
            maxValue: 20000,
            defaultValue: 1000,
            step: 1,
            unit: 'Hz'
          },
          {
            id: 'gain',
            name: '게인',
            value: 0,
            minValue: -15,
            maxValue: 15,
            defaultValue: 0,
            step: 0.1,
            unit: 'dB'
          },
          {
            id: 'q',
            name: 'Q 값',
            value: 1,
            minValue: 0.1,
            maxValue: 10,
            defaultValue: 1,
            step: 0.1
          }
        );
        break;
        
      case AudioEffectType.COMPRESSOR:
        parameters.push(
          {
            id: 'threshold',
            name: '기준치',
            value: -24,
            minValue: -60,
            maxValue: 0,
            defaultValue: -24,
            step: 1,
            unit: 'dB'
          },
          {
            id: 'ratio',
            name: '비율',
            value: 4,
            minValue: 1,
            maxValue: 20,
            defaultValue: 4,
            step: 0.5
          },
          {
            id: 'attack',
            name: '어택',
            value: 0.003,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.003,
            step: 0.001,
            unit: 's'
          },
          {
            id: 'release',
            name: '릴리즈',
            value: 0.25,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.25,
            step: 0.01,
            unit: 's'
          },
          {
            id: 'knee',
            name: '니',
            value: 30,
            minValue: 0,
            maxValue: 40,
            defaultValue: 30,
            step: 1,
            unit: 'dB'
          }
        );
        break;
        
      case AudioEffectType.REVERB:
        parameters.push(
          {
            id: 'decay',
            name: '감쇠',
            value: 2,
            minValue: 0.1,
            maxValue: 10,
            defaultValue: 2,
            step: 0.1,
            unit: 's'
          },
          {
            id: 'wet',
            name: '웻',
            value: 0.3,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.3,
            step: 0.01
          },
          {
            id: 'dry',
            name: '드라이',
            value: 0.7,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.7,
            step: 0.01
          }
        );
        break;
        
      case AudioEffectType.DELAY:
        parameters.push(
          {
            id: 'time',
            name: '시간',
            value: 0.3,
            minValue: 0,
            maxValue: 5,
            defaultValue: 0.3,
            step: 0.01,
            unit: 's'
          },
          {
            id: 'feedback',
            name: '피드백',
            value: 0.5,
            minValue: 0,
            maxValue: 0.95,
            defaultValue: 0.5,
            step: 0.01
          },
          {
            id: 'mix',
            name: '믹스',
            value: 0.5,
            minValue: 0,
            maxValue: 1,
            defaultValue: 0.5,
            step: 0.01
          }
        );
        break;
        
      case AudioEffectType.PITCH_SHIFT:
        parameters.push(
          {
            id: 'pitch',
            name: '피치',
            value: 0,
            minValue: -12,
            maxValue: 12,
            defaultValue: 0,
            step: 1,
            unit: '반음'
          },
          {
            id: 'mix',
            name: '믹스',
            value: 1,
            minValue: 0,
            maxValue: 1,
            defaultValue: 1,
            step: 0.01
          }
        );
        break;
    }
    
    // 새 효과 추가
    const newEffect: AudioEffect = {
      id: `effect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: getEffectTypeName(selectedEffectType),
      type: selectedEffectType,
      enabled: true,
      parameters
    };
    
    addEffect(selectedTrackId, newEffect);
  };

  // 효과 유형 이름 가져오기
  const getEffectTypeName = (type: AudioEffectType): string => {
    switch (type) {
      case AudioEffectType.GAIN:
        return '게인';
      case AudioEffectType.EQ:
        return '이퀄라이저';
      case AudioEffectType.COMPRESSOR:
        return '컴프레서';
      case AudioEffectType.REVERB:
        return '리버브';
      case AudioEffectType.DELAY:
        return '딜레이';
      case AudioEffectType.NOISE_REDUCTION:
        return '노이즈 제거';
      case AudioEffectType.FADE:
        return '페이드';
      case AudioEffectType.LIMITER:
        return '리미터';
      case AudioEffectType.PITCH_SHIFT:
        return '피치 시프트';
      case AudioEffectType.TIME_STRETCH:
        return '타임 스트레치';
      default:
        return '알 수 없음';
    }
  };

  // 파라미터 값 변경 핸들러
  const handleParameterChange = (effectId: string, parameterId: string, value: number) => {
    if (!selectedTrackId) return;
    
    const track = state.tracks.find(t => t.id === selectedTrackId);
    if (!track) return;
    
    const effect = track.effects.find(e => e.id === effectId);
    if (!effect) return;
    
    // 변경된 파라미터로 새 파라미터 배열 생성
    const updatedParameters = effect.parameters.map(param =>
      param.id === parameterId 
        ? { ...param, value } 
        : param
    );
    
    // 효과 업데이트
    updateEffect(selectedTrackId, effectId, { parameters: updatedParameters });
  };

  // 효과 활성화 토글 핸들러
  const handleToggleEffect = (effectId: string) => {
    if (!selectedTrackId) return;
    
    const track = state.tracks.find(t => t.id === selectedTrackId);
    if (!track) return;
    
    const effect = track.effects.find(e => e.id === effectId);
    if (!effect) return;
    
    updateEffect(selectedTrackId, effectId, { enabled: !effect.enabled });
  };

  // 효과 제거 핸들러
  const handleRemoveEffect = (effectId: string) => {
    if (!selectedTrackId) return;
    removeEffect(selectedTrackId, effectId);
  };

  // 필터 유형을 문자열로 변환
  const getFilterTypeName = (value: number): string => {
    const types = [
      'peaking', 'lowpass', 'highpass', 'bandpass', 
      'lowshelf', 'highshelf', 'notch', 'allpass'
    ];
    return types[value] || 'peaking';
  };

  // EQ 파라미터 렌더링
  const renderEqParameters = (effect: AudioEffect, parameter: AudioEffectParameter) => {
    if (parameter.id === 'type') {
      const filterType = getFilterTypeName(parameter.value);
      return (
        <div key={parameter.id} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>{parameter.name}</label>
          <select 
            value={parameter.value} 
            onChange={(e) => handleParameterChange(
              effect.id, 
              parameter.id, 
              parseInt(e.target.value)
            )}
            style={{
              width: '100%',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          >
            <option value={0}>피킹 (Peaking)</option>
            <option value={1}>로우패스 (Lowpass)</option>
            <option value={2}>하이패스 (Highpass)</option>
            <option value={3}>밴드패스 (Bandpass)</option>
            <option value={4}>로우쉘프 (Lowshelf)</option>
            <option value={5}>하이쉘프 (Highshelf)</option>
            <option value={6}>노치 (Notch)</option>
            <option value={7}>올패스 (Allpass)</option>
          </select>
          <div style={{ fontSize: '0.8em', color: '#6c757d', marginTop: '3px' }}>
            현재: {filterType}
          </div>
        </div>
      );
    }
    
    return renderParameter(effect, parameter);
  };

  // 일반 파라미터 렌더링
  const renderParameter = (effect: AudioEffect, parameter: AudioEffectParameter) => {
    return (
      <div key={parameter.id} style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          {parameter.name} {parameter.unit ? `(${parameter.unit})` : ''}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="range" 
            min={parameter.minValue} 
            max={parameter.maxValue} 
            step={parameter.step} 
            value={parameter.value} 
            onChange={(e) => handleParameterChange(
              effect.id, 
              parameter.id, 
              parseFloat(e.target.value)
            )}
            style={{ flex: 1 }}
          />
          <input 
            type="number" 
            min={parameter.minValue} 
            max={parameter.maxValue} 
            step={parameter.step} 
            value={parameter.value} 
            onChange={(e) => handleParameterChange(
              effect.id, 
              parameter.id, 
              parseFloat(e.target.value)
            )}
            style={{ 
              width: '70px', 
              padding: '3px', 
              textAlign: 'right',
              borderRadius: '4px',
              border: '1px solid #ced4da'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="effects-panel" style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '15px' }}>효과 패널</h3>
      
      {selectedTrack ? (
        <>
          <div className="add-effect-section" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <select 
                value={selectedEffectType} 
                onChange={(e) => setSelectedEffectType(e.target.value as AudioEffectType)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ced4da'
                }}
              >
                <option value={AudioEffectType.GAIN}>게인</option>
                <option value={AudioEffectType.EQ}>이퀄라이저</option>
                <option value={AudioEffectType.COMPRESSOR}>컴프레서</option>
                <option value={AudioEffectType.REVERB}>리버브</option>
                <option value={AudioEffectType.DELAY}>딜레이</option>
                <option value={AudioEffectType.PITCH_SHIFT}>피치 시프트</option>
              </select>
              <button 
                onClick={handleAddEffect}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#4f9df3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                효과 추가
              </button>
            </div>
          </div>
          
          <div className="effects-list">
            {selectedTrack.effects.length === 0 ? (
              <div style={{ 
                padding: '15px', 
                textAlign: 'center', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px',
                color: '#6c757d'
              }}>
                효과가 없습니다. 위 드롭다운에서 효과를 선택하고 추가해 보세요.
              </div>
            ) : (
              selectedTrack.effects.map(effect => (
                <div 
                  key={effect.id} 
                  className="effect-item"
                  style={{ 
                    marginBottom: '20px', 
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: effect.enabled ? '#ffffff' : '#f8f9fa'
                  }}
                >
                  <div 
                    className="effect-header"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: effect.enabled ? '#e9f5ff' : '#f1f3f5'
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>
                      {effect.name}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleToggleEffect(effect.id)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: effect.enabled ? '#4f9df3' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9em'
                        }}
                      >
                        {effect.enabled ? '활성화됨' : '비활성화됨'}
                      </button>
                      <button 
                        onClick={() => handleRemoveEffect(effect.id)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9em'
                        }}
                      >
                        제거
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="effect-body"
                    style={{ 
                      padding: '15px',
                      opacity: effect.enabled ? 1 : 0.7
                    }}
                  >
                    {effect.parameters.map(parameter => (
                      effect.type === AudioEffectType.EQ
                        ? renderEqParameters(effect, parameter)
                        : renderParameter(effect, parameter)
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          color: '#6c757d'
        }}>
          효과를 적용할 트랙을 먼저 선택해주세요.
        </div>
      )}
    </div>
  );
};

export default EffectsPanel;
