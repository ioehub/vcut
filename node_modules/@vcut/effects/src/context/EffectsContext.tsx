import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Effect, AppliedEffect, EffectsContextState, EffectsContextAction, EffectType, EffectCategory } from '../types';
import EffectsService from '../services/EffectsService';

// 초기 상태
const initialState: EffectsContextState = {
  availableEffects: [],
  appliedEffects: [],
  selectedEffectId: null,
  isLoading: false,
  error: null
};

// 리듀서 함수
function effectsReducer(state: EffectsContextState, action: EffectsContextAction): EffectsContextState {
  switch (action.type) {
    case 'LOAD_EFFECTS':
      return {
        ...state,
        availableEffects: action.payload,
        isLoading: false
      };
    case 'APPLY_EFFECT':
      return {
        ...state,
        appliedEffects: [...state.appliedEffects, action.payload]
      };
    case 'UPDATE_EFFECT':
      return {
        ...state,
        appliedEffects: state.appliedEffects.map(effect =>
          effect.id === action.payload.id
            ? { ...effect, ...action.payload.updates }
            : effect
        )
      };
    case 'REMOVE_EFFECT':
      return {
        ...state,
        appliedEffects: state.appliedEffects.filter(effect => effect.id !== action.payload),
        selectedEffectId: state.selectedEffectId === action.payload ? null : state.selectedEffectId
      };
    case 'SELECT_EFFECT':
      return {
        ...state,
        selectedEffectId: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}

// 컨텍스트 타입 정의
interface EffectsContextValue {
  state: EffectsContextState;
  loadEffects: () => Promise<void>;
  applyEffect: (effectId: string, clipId: string, trackId: string, startTime?: number, duration?: number) => Promise<AppliedEffect | null>;
  updateEffect: (id: string, updates: Partial<AppliedEffect>) => Promise<AppliedEffect | null>;
  updateEffectParameter: (effectId: string, parameterId: string, value: any) => Promise<AppliedEffect | null>;
  removeEffect: (id: string) => Promise<boolean>;
  selectEffect: (id: string | null) => void;
  getEffectsByType: (type: EffectType) => Effect[];
  getEffectsByCategory: (category: EffectCategory) => Effect[];
  getEffectsByClip: (clipId: string) => AppliedEffect[];
}

// 컨텍스트 생성
const EffectsContext = createContext<EffectsContextValue | undefined>(undefined);

// 컨텍스트 제공자 컴포넌트
export const EffectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(effectsReducer, initialState);

  // 사용 가능한 효과 불러오기
  const loadEffects = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // 효과 서비스에서 사용 가능한 모든 효과 가져오기
      const effects = EffectsService.getAvailableEffects();
      dispatch({ type: 'LOAD_EFFECTS', payload: effects });
    } catch (error) {
      console.error('효과 불러오기 실패:', error);
      dispatch({ type: 'SET_ERROR', payload: '효과를 불러오는 중 오류가 발생했습니다.' });
    }
  };

  // 효과 클립에 적용
  const applyEffect = async (
    effectId: string, 
    clipId: string, 
    trackId: string,
    startTime?: number,
    duration?: number
  ): Promise<AppliedEffect | null> => {
    try {
      const appliedEffect = EffectsService.applyEffectToClip(effectId, clipId, trackId, startTime, duration);
      
      if (appliedEffect) {
        dispatch({ type: 'APPLY_EFFECT', payload: appliedEffect });
      }
      
      return appliedEffect;
    } catch (error) {
      console.error('효과 적용 실패:', error);
      dispatch({ type: 'SET_ERROR', payload: '효과를 적용하는 중 오류가 발생했습니다.' });
      return null;
    }
  };

  // 적용된 효과 업데이트
  const updateEffect = async (
    id: string, 
    updates: Partial<AppliedEffect>
  ): Promise<AppliedEffect | null> => {
    try {
      const updatedEffect = EffectsService.updateAppliedEffect(id, updates);
      
      if (updatedEffect) {
        dispatch({ 
          type: 'UPDATE_EFFECT', 
          payload: { id, updates: updatedEffect }
        });
      }
      
      return updatedEffect;
    } catch (error) {
      console.error('효과 업데이트 실패:', error);
      dispatch({ type: 'SET_ERROR', payload: '효과를 업데이트하는 중 오류가 발생했습니다.' });
      return null;
    }
  };

  // 효과 파라미터 업데이트
  const updateEffectParameter = async (
    effectId: string, 
    parameterId: string, 
    value: any
  ): Promise<AppliedEffect | null> => {
    try {
      const updatedEffect = EffectsService.updateEffectParameter(effectId, parameterId, value);
      
      if (updatedEffect) {
        dispatch({ 
          type: 'UPDATE_EFFECT', 
          payload: { id: effectId, updates: updatedEffect }
        });
      }
      
      return updatedEffect;
    } catch (error) {
      console.error('효과 파라미터 업데이트 실패:', error);
      dispatch({ type: 'SET_ERROR', payload: '효과 파라미터를 업데이트하는 중 오류가 발생했습니다.' });
      return null;
    }
  };

  // 적용된 효과 제거
  const removeEffect = async (id: string): Promise<boolean> => {
    try {
      const success = EffectsService.removeAppliedEffect(id);
      
      if (success) {
        dispatch({ type: 'REMOVE_EFFECT', payload: id });
      }
      
      return success;
    } catch (error) {
      console.error('효과 제거 실패:', error);
      dispatch({ type: 'SET_ERROR', payload: '효과를 제거하는 중 오류가 발생했습니다.' });
      return false;
    }
  };

  // 효과 선택
  const selectEffect = (id: string | null): void => {
    dispatch({ type: 'SELECT_EFFECT', payload: id });
  };

  // 특정 타입의 효과 목록 가져오기
  const getEffectsByType = (type: EffectType): Effect[] => {
    return EffectsService.getEffectsByType(type);
  };

  // 특정 카테고리의 효과 목록 가져오기
  const getEffectsByCategory = (category: EffectCategory): Effect[] => {
    return EffectsService.getEffectsByCategory(category);
  };

  // 특정 클립에 적용된 효과 목록 가져오기
  const getEffectsByClip = (clipId: string): AppliedEffect[] => {
    return EffectsService.getEffectsByClipId(clipId);
  };

  return (
    <EffectsContext.Provider value={{
      state,
      loadEffects,
      applyEffect,
      updateEffect,
      updateEffectParameter,
      removeEffect,
      selectEffect,
      getEffectsByType,
      getEffectsByCategory,
      getEffectsByClip
    }}>
      {children}
    </EffectsContext.Provider>
  );
};

// 커스텀 훅
export const useEffects = (): EffectsContextValue => {
  const context = useContext(EffectsContext);
  
  if (context === undefined) {
    throw new Error('useEffects는 EffectsProvider 내부에서만 사용할 수 있습니다.');
  }
  
  return context;
};
