import { v4 as uuidv4 } from 'uuid';
import { Effect, EffectType, EffectCategory, AppliedEffect, EffectParameter } from '../types';

/**
 * 효과 관리 서비스 클래스
 * 효과 불러오기, 적용, 업데이트, 삭제 등의 기능을 제공합니다.
 */
class EffectsService {
  private effects: Effect[] = [];
  private appliedEffects: AppliedEffect[] = [];

  /**
   * 내장된 기본 효과들을 초기화합니다.
   */
  constructor() {
    this.initializeDefaultEffects();
  }

  /**
   * 모든 사용 가능한 효과 목록을 반환합니다.
   */
  getAvailableEffects(): Effect[] {
    return [...this.effects];
  }

  /**
   * 특정 타입의 효과 목록을 반환합니다.
   * @param type 효과 타입
   */
  getEffectsByType(type: EffectType): Effect[] {
    return this.effects.filter(effect => effect.type === type);
  }

  /**
   * 특정 카테고리의 효과 목록을 반환합니다.
   * @param category 효과 카테고리
   */
  getEffectsByCategory(category: EffectCategory): Effect[] {
    return this.effects.filter(effect => effect.category === category);
  }

  /**
   * 클립에 적용된 모든 효과 목록을 반환합니다.
   * @param clipId 클립 ID
   */
  getEffectsByClipId(clipId: string): AppliedEffect[] {
    return this.appliedEffects.filter(effect => effect.clipId === clipId);
  }

  /**
   * ID로 효과를 조회합니다.
   * @param id 효과 ID
   */
  getEffectById(id: string): Effect | undefined {
    return this.effects.find(effect => effect.id === id);
  }

  /**
   * ID로 적용된 효과를 조회합니다.
   * @param id 적용된 효과 ID
   */
  getAppliedEffectById(id: string): AppliedEffect | undefined {
    return this.appliedEffects.find(effect => effect.id === id);
  }

  /**
   * 효과를 클립에 적용합니다.
   * @param effectId 효과 ID
   * @param clipId 클립 ID
   * @param trackId 트랙 ID
   * @param startTime 효과 시작 시간 (선택)
   * @param duration 효과 지속 시간 (선택)
   */
  applyEffectToClip(
    effectId: string, 
    clipId: string, 
    trackId: string,
    startTime?: number,
    duration?: number
  ): AppliedEffect | null {
    const effect = this.getEffectById(effectId);
    
    if (!effect) {
      console.error(`효과 ID ${effectId}를 찾을 수 없습니다.`);
      return null;
    }
    
    const appliedEffect: AppliedEffect = {
      ...JSON.parse(JSON.stringify(effect)), // 깊은 복사
      id: uuidv4(),
      clipId,
      trackId,
      startTime,
      duration,
      isEnabled: true
    };
    
    this.appliedEffects.push(appliedEffect);
    return appliedEffect;
  }

  /**
   * 적용된 효과를 업데이트합니다.
   * @param id 적용된 효과 ID
   * @param updates 업데이트할 속성들
   */
  updateAppliedEffect(
    id: string, 
    updates: Partial<AppliedEffect>
  ): AppliedEffect | null {
    const index = this.appliedEffects.findIndex(effect => effect.id === id);
    
    if (index === -1) {
      console.error(`적용된 효과 ID ${id}를 찾을 수 없습니다.`);
      return null;
    }
    
    // 적용된 효과 업데이트
    this.appliedEffects[index] = {
      ...this.appliedEffects[index],
      ...updates
    };
    
    return this.appliedEffects[index];
  }

  /**
   * 효과 파라미터 값을 업데이트합니다.
   * @param effectId 적용된 효과 ID
   * @param parameterId 파라미터 ID
   * @param value 새로운 값
   */
  updateEffectParameter(
    effectId: string, 
    parameterId: string, 
    value: any
  ): AppliedEffect | null {
    const effect = this.getAppliedEffectById(effectId);
    
    if (!effect) {
      console.error(`적용된 효과 ID ${effectId}를 찾을 수 없습니다.`);
      return null;
    }
    
    const paramIndex = effect.parameters.findIndex(param => param.id === parameterId);
    
    if (paramIndex === -1) {
      console.error(`파라미터 ID ${parameterId}를 찾을 수 없습니다.`);
      return null;
    }
    
    // 파라미터 값 업데이트
    const updatedEffect = { ...effect };
    updatedEffect.parameters[paramIndex] = {
      ...updatedEffect.parameters[paramIndex],
      currentValue: value
    };
    
    return this.updateAppliedEffect(effectId, updatedEffect);
  }

  /**
   * 적용된 효과를 제거합니다.
   * @param id 적용된 효과 ID
   */
  removeAppliedEffect(id: string): boolean {
    const index = this.appliedEffects.findIndex(effect => effect.id === id);
    
    if (index === -1) {
      console.error(`적용된 효과 ID ${id}를 찾을 수 없습니다.`);
      return false;
    }
    
    this.appliedEffects.splice(index, 1);
    return true;
  }

  /**
   * 기본 효과들을 초기화합니다.
   * 실제 앱에서는 이 부분이 외부 JSON 파일이나 DB에서 로딩될 수 있습니다.
   */
  private initializeDefaultEffects(): void {
    // 비디오 효과: 필터
    this.effects.push({
      id: 'effect-bw-filter',
      name: '흑백 필터',
      type: EffectType.VIDEO,
      category: EffectCategory.FILTER,
      description: '영상을 흑백으로 변환합니다.',
      thumbnail: 'assets/effects/bw-filter.png',
      parameters: [
        {
          id: 'intensity',
          name: '강도',
          type: 'number',
          defaultValue: 1.0,
          currentValue: 1.0,
          min: 0,
          max: 1,
          step: 0.01
        }
      ],
      isEnabled: true
    });

    // 비디오 효과: 블러
    this.effects.push({
      id: 'effect-gaussian-blur',
      name: '가우시안 블러',
      type: EffectType.VIDEO,
      category: EffectCategory.BLUR,
      description: '가우시안 블러 효과를 적용합니다.',
      thumbnail: 'assets/effects/blur.png',
      parameters: [
        {
          id: 'radius',
          name: '반경',
          type: 'number',
          defaultValue: 5,
          currentValue: 5,
          min: 0,
          max: 50,
          step: 1
        }
      ],
      isEnabled: true
    });

    // 비디오 효과: 색상 보정
    this.effects.push({
      id: 'effect-color-correction',
      name: '색상 보정',
      type: EffectType.VIDEO,
      category: EffectCategory.COLOR_CORRECTION,
      description: '색상, 명도, 대비 등을 조정합니다.',
      thumbnail: 'assets/effects/color-correction.png',
      parameters: [
        {
          id: 'brightness',
          name: '밝기',
          type: 'number',
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: 'contrast',
          name: '대비',
          type: 'number',
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: 'saturation',
          name: '채도',
          type: 'number',
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        },
        {
          id: 'temperature',
          name: '색온도',
          type: 'number',
          defaultValue: 0,
          currentValue: 0,
          min: -100,
          max: 100,
          step: 1
        }
      ],
      isEnabled: true
    });

    // 오디오 효과: 페이드 인/아웃
    this.effects.push({
      id: 'effect-audio-fade',
      name: '페이드',
      type: EffectType.AUDIO,
      category: EffectCategory.AUDIO_FILTER,
      description: '오디오 페이드 인/아웃 효과를 적용합니다.',
      thumbnail: 'assets/effects/audio-fade.png',
      parameters: [
        {
          id: 'fadeInDuration',
          name: '페이드 인 (초)',
          type: 'number',
          defaultValue: 1,
          currentValue: 1,
          min: 0,
          max: 10,
          step: 0.1
        },
        {
          id: 'fadeOutDuration',
          name: '페이드 아웃 (초)',
          type: 'number',
          defaultValue: 1,
          currentValue: 1,
          min: 0,
          max: 10,
          step: 0.1
        }
      ],
      isEnabled: true
    });

    // 트랜지션 효과
    this.effects.push({
      id: 'effect-transition-fade',
      name: '페이드 트랜지션',
      type: EffectType.TRANSITION,
      category: EffectCategory.TRANSITION,
      description: '두 클립 사이에 페이드 트랜지션을 적용합니다.',
      thumbnail: 'assets/effects/transition-fade.png',
      parameters: [
        {
          id: 'duration',
          name: '지속시간 (초)',
          type: 'number',
          defaultValue: 1,
          currentValue: 1,
          min: 0.1,
          max: 5,
          step: 0.1
        }
      ],
      isEnabled: true
    });
  }
}

export default new EffectsService();
