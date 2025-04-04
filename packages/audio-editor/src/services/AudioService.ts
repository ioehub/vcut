import { /*v4 as uuidv4*/ } from 'uuid';
import { AudioTrack, AudioEffect, AudioEffectType, /*AudioMarker*/ } from '../types';

/**
 * 오디오 처리를 위한 서비스 클래스
 * Web Audio API를 활용하여 오디오 처리 기능을 제공합니다.
 */
export default class AudioService {
  // AudioContext 및 마스터 게인 노드
  public audioContext!: AudioContext;
  private masterGainNode!: GainNode;
  
  // 오디오 트랙 관리를 위한 변수들
  private trackNodes: Map<string, {
    sourceNode?: AudioBufferSourceNode;
    gainNode: GainNode;
    panNode: StereoPannerNode;
    analyzerNode: AnalyserNode;
    effectNodes: AudioNode[];
    buffer?: AudioBuffer; // 추가된 속성
  }> = new Map();
  private effectNodes: Map<string, AudioNode> = new Map(); // 이펙트 노드 맵 추가
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private startTime: number = 0;
  private pauseTime: number = 0;
  
  // 미사용 변수 제거
  // private pausedPosition: number = 0;
  private isInitialized: boolean = false;

  /**
   * AudioService 생성자
   */
  constructor() {
    try {
      // AudioContext 생성 (브라우저 호환성 고려)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('AudioContext is not supported in this environment');
      }
      this.audioContext = new AudioContextClass();
      console.log('AudioContext 생성 성공:', this.audioContext.state);
      
      // 마스터 게인 노드 생성 및 연결
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.gain.value = 1.0;
      this.masterGainNode.connect(this.audioContext.destination);
      
      // 초기 상태 설정
      this.isInitialized = false;
      this.isPlaying = false;
      this.isPaused = false;
      this.trackNodes = new Map();
      this.startTime = 0;
      this.pauseTime = 0;
      
      // 사용자 상호작용 시 자동으로 AudioContext 재개
      this.setupAutoResume();
      
      // 디버그를 위한 글로벌 객체에 인스턴스 추가 (개발 환경에서만)
      if (process.env.NODE_ENV !== 'production') {
        (window as any).__audioService = this;
        console.log('AudioService 인스턴스가 전역 객체에 추가되었습니다. window.__audioService로 접근 가능합니다.');
      }
    } catch (error) {
      console.error('AudioService 초기화 중 오류 발생:', error);
    }
  }
  
  /**
   * 사용자 상호작용 시 AudioContext 자동 재개 설정
   */
  private setupAutoResume(): void {
    const resumeAudioContext = () => {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('사용자 상호작용으로 AudioContext가 재개되었습니다.');
        }).catch(err => {
          console.error('AudioContext 재개 실패:', err);
        });
      }
    };
    
    // 사용자 상호작용 이벤트에 리스너 추가
    ['click', 'touchstart', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, resumeAudioContext, { once: true });
    });
  }

  /**
   * 오디오 서비스 초기화
   */
  public initialize(): void {
    if (this.isInitialized) {
      console.log('AudioService가 이미 초기화되어 있습니다.');
      return;
    }
    
    try {
      console.log('AudioService 초기화 시작...');
      
      // AudioContext 생성 (이미 생성되어 있지 않은 경우에만)
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log(`AudioContext 생성됨, 상태: ${this.audioContext.state}, 샘플레이트: ${this.audioContext.sampleRate}Hz`);
      } else {
        console.log(`기존 AudioContext 사용, 상태: ${this.audioContext.state}`);
      }
      
      // 마스터 게인 노드 초기화 (이미 생성되어 있지 않은 경우에만)
      if (!this.masterGainNode) {
        this.masterGainNode = this.audioContext.createGain();
        this.masterGainNode.gain.value = 1.0;
        
        // 마스터 게인 노드를 오디오 출력에 연결
        this.masterGainNode.connect(this.audioContext.destination);
        console.log('마스터 게인 노드가 오디오 출력에 연결됨');
      }
      
      // 노드 맵 초기화
      this.trackNodes = new Map();
      this.effectNodes = new Map();
      
      // 재생 상태 초기화
      this.isPlaying = false;
      this.startTime = 0;
      this.pauseTime = 0;
      
      // 초기화 플래그 설정
      this.isInitialized = true;
      console.log('AudioService 초기화 완료');
      
      // 개발 모드에서 디버깅을 위해 글로벌 객체에 추가
      if (process.env.NODE_ENV !== 'production') {
        (window as any).__audioService = this;
        console.log('AudioService 인스턴스가 전역 객체에 추가되었습니다. window.__audioService로 접근 가능합니다.');
      }
    } catch (error) {
      console.error('AudioService 초기화 실패:', error);
      // 초기화 실패 시 상태 롤백
      this.isInitialized = false;
      throw error; // 상위 컴포넌트에서 오류 처리 가능하도록 다시 throw
    }
  }

  /**
   * URL에서 오디오 파일 로드
   * @param url 오디오 파일 URL
   */
  public async loadAudioFile(url: string): Promise<AudioBuffer> {
    console.log(`오디오 파일 로드 시작: ${url}`);
    
    try {
      // AudioContext 상태 확인 및 재시작 시도
      if (this.audioContext.state === 'suspended' || this.audioContext.state === 'closed') {
        console.log(`AudioContext가 ${this.audioContext.state} 상태입니다. 재개 시도...`);
        try {
          await this.audioContext.resume();
          console.log('AudioContext 재개 성공, 상태:', this.audioContext.state);
        } catch (resumeError) {
          console.error('AudioContext 재개 실패:', resumeError);
          
          // AudioContext 재생성 시도
          console.log('AudioContext 재생성 시도 중...');
          try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.audioContext = new AudioContextClass();
            
            // 마스터 게인 노드 재생성 및 연결
            this.masterGainNode = this.audioContext.createGain();
            this.masterGainNode.gain.value = 1.0;
            this.masterGainNode.connect(this.audioContext.destination);
            
            console.log('AudioContext 재생성 성공, 상태:', this.audioContext.state);
          } catch (recreateError) {
            console.error('AudioContext 재생성 실패:', recreateError);
            throw new Error('오디오 컨텍스트 초기화에 실패했습니다');
          }
        }
      }
      
      // URL에서 파일 다운로드
      console.log('URL로 파일 다운로드 시작...');
      let response: Response;
      
      try {
        response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`파일 다운로드 실패: ${response.status} ${response.statusText}`);
        }
      } catch (fetchError) {
        console.error('파일 다운로드 중 오류:', fetchError);
        throw new Error(`오디오 파일을 다운로드할 수 없습니다: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
      }
      
      console.log('파일 다운로드 완료, ArrayBuffer로 변환...');
      const arrayBuffer = await response.arrayBuffer();
      
      console.log(`ArrayBuffer 크기: ${arrayBuffer.byteLength} 바이트, 디코딩 시작...`);
      let audioBuffer: AudioBuffer;
      
      try {
        audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      } catch (decodeError) {
        console.error('오디오 디코딩 오류:', decodeError);
        throw new Error(`오디오 파일을 디코딩할 수 없습니다: ${decodeError instanceof Error ? decodeError.message : String(decodeError)}`);
      }
      
      console.log(`오디오 디코딩 완료 - 길이: ${audioBuffer.duration.toFixed(2)}초, 채널: ${audioBuffer.numberOfChannels}, 샘플레이트: ${audioBuffer.sampleRate}Hz`);
      
      // 디버그 용도로 콘솔에 버퍼 정보 출력
      console.log('디코딩된 오디오 샘플:', {
        channelCount: audioBuffer.numberOfChannels,
        length: audioBuffer.length,
        duration: audioBuffer.duration,
        sampleRate: audioBuffer.sampleRate,
        channelDataInfo: Array.from({ length: audioBuffer.numberOfChannels }, (_, i) => {
          const channelData = audioBuffer.getChannelData(i);
          const nonZeroCount = channelData.reduce((count, val) => count + (val !== 0 ? 1 : 0), 0);
          return {
            channel: i,
            nonZeroSamples: nonZeroCount,
            totalSamples: channelData.length,
            nonZeroPercentage: (nonZeroCount / channelData.length * 100).toFixed(2)
          };
        })
      });
      
      return audioBuffer;
    } catch (error) {
      console.error('오디오 파일 로드 중 오류 발생:', error);
      throw error;
    }
  }
  
  /**
   * 로컬 파일을 로드하고 AudioBuffer로 변환 (ArrayBuffer에서 직접 디코딩)
   * @param arrayBuffer 오디오 파일 데이터
   */
  public async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
    console.log(`오디오 데이터 디코딩 시작, 크기: ${arrayBuffer.byteLength} 바이트`);
    
    try {
      // AudioContext 상태 확인
      if (this.audioContext.state === 'suspended') {
        console.log('AudioContext가 일시 중단 상태입니다. resume 시도...');
        await this.audioContext.resume();
      }
      
      // 오디오 디코딩
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log(`오디오 디코딩 완료 - 길이: ${audioBuffer.duration.toFixed(2)}초, 채널: ${audioBuffer.numberOfChannels}`);
      
      // 이벤트를 발생시켜 AudioEditor의 duration을 업데이트할 수 있도록 함
      const durationUpdateEvent = new CustomEvent('audio-duration-updated', { 
        detail: { duration: audioBuffer.duration } 
      });
      window.dispatchEvent(durationUpdateEvent);

      return audioBuffer;
    } catch (error) {
      console.error('오디오 데이터 디코딩 중 오류 발생:', error);
      throw error;
    }
  }

  /**
   * 파형 데이터 생성 (시각화용)
   * @param audioBuffer 오디오 버퍼
   * @param samples 샘플링할 데이터 포인트 수
   */
  public generateWaveformData(audioBuffer: AudioBuffer, samples: number = 1000): number[] {
    const channelData = audioBuffer.getChannelData(0); // 첫 번째 채널 사용
    const blockSize = Math.floor(channelData.length / samples);
    const waveformData: number[] = [];

    for (let i = 0; i < samples; i++) {
      const blockStart = i * blockSize;
      let sum = 0;

      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[blockStart + j] || 0);
      }

      // 블록 평균값
      waveformData.push(sum / blockSize);
    }

    return waveformData;
  }

  /**
   * 트랙 초기 설정
   * @param track 오디오 트랙 객체
   * @returns 트랙 ID
   */
  public setupTrack(track: AudioTrack): string {
    console.log(`트랙 설정 시작: ${track.id}, 이름: ${track.name}`);
    
    // 이미 존재하는 트랙이면 업데이트
    if (this.trackNodes.has(track.id)) {
      console.log(`기존 트랙 업데이트: ${track.id}`);
      
      if (track.audioBuffer) {
        this.setTrackAudioBuffer(track.id, track.audioBuffer);
      }
      
      return track.id;
    }
    
    // 게인 노드 생성 (볼륨 조절용)
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = track.volume || 1.0;
    
    // 패너 노드 생성 (스테레오 위치 조절용)
    const pannerNode = this.audioContext.createStereoPanner();
    pannerNode.pan.value = track.pan || 0;
    
    // 애널라이저 노드 생성 (시각화용)
    const analyzerNode = this.audioContext.createAnalyser();
    analyzerNode.fftSize = 2048;
    
    // 노드 연결: 게인 노드 -> 패너 노드 -> 애널라이저 노드 -> 마스터 게인 노드 -> 출력
    gainNode.connect(pannerNode);
    pannerNode.connect(analyzerNode);
    analyzerNode.connect(this.masterGainNode);
    
    // 트랙 노드 맵에 저장
    this.trackNodes.set(track.id, {
      sourceNode: undefined,
      gainNode,
      panNode: pannerNode,
      analyzerNode,
      effectNodes: [],
      buffer: track.audioBuffer
    });
    
    console.log(`트랙 노드 생성 완료: ${track.id}`);
    
    // 오디오 버퍼가 있으면 설정
    if (track.audioBuffer) {
      console.log(`트랙에 오디오 버퍼 설정 진행: ${track.id}, 길이: ${track.audioBuffer.duration.toFixed(2)}초`);
      
      // 소스 노드 생성 및 설정
      const sourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = track.audioBuffer;
      
      // 트랙 노드 업데이트
      const trackNode = this.trackNodes.get(track.id);
      if (trackNode) {
        trackNode.sourceNode = sourceNode;
        // 소스 노드를 게인 노드에 연결 (자동 재생은 하지 않음)
        sourceNode.connect(trackNode.gainNode);
      }
    } else {
      console.warn(`트랙에 오디오 버퍼가 없습니다: ${track.id}`);
    }
    
    return track.id;
  }

  /**
   * 트랙에 오디오 버퍼 설정
   * @param trackId 트랙 ID
   * @param audioBuffer 오디오 버퍼
   */
  public setTrackAudioBuffer(trackId: string, audioBuffer: AudioBuffer): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) {
      // 트랙 노드가 없으면 기본 트랙 생성 후 재시도
      const newTrack: AudioTrack = {
        id: trackId,
        name: `Track ${trackId.substring(0, 4)}`,
        volume: 1.0,
        pan: 0,
        muted: false,
        solo: false,
        gain: 1.0,
        effects: [],
        startTime: 0,
        duration: audioBuffer ? audioBuffer.duration : 0,
        markers: [], // 마커 배열 추가
        isSelected: false // 선택 상태 추가
      };
      this.setupTrack(newTrack);
      this.setTrackAudioBuffer(trackId, audioBuffer);
      return;
    }

    // 기존 소스 노드가 있고 재생 중이면 정지
    if (trackNode.sourceNode) {
      try {
        trackNode.sourceNode.stop();
      } catch (e) {
        // 이미 정지된 경우 무시
      }
      trackNode.sourceNode.disconnect();
    }

    // 새 소스 노드 생성
    const sourceNode = this.audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    
    // 소스 노드를 게인 노드에 연결
    sourceNode.connect(trackNode.gainNode);
    
    // 트랙 노드 업데이트
    trackNode.sourceNode = sourceNode;
    trackNode.buffer = audioBuffer; // 추가된 속성
    
    console.log(`오디오 버퍼 설정 완료 - 트랙: ${trackId}, 길이: ${audioBuffer.duration.toFixed(2)}초`);
  }

  /**
   * 트랙 볼륨 설정
   * @param trackId 트랙 ID
   * @param volume 볼륨 (0~1)
   */
  public setTrackVolume(trackId: string, volume: number): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) return;

    trackNode.gainNode.gain.value = Math.max(0, Math.min(1, volume));
  }

  /**
   * 트랙 패닝 설정
   * @param trackId 트랙 ID
   * @param pan 패닝 값 (-1: 왼쪽, 0: 중앙, 1: 오른쪽)
   */
  public setTrackPan(trackId: string, pan: number): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) return;

    trackNode.panNode.pan.value = Math.max(-1, Math.min(1, pan));
  }

  /**
   * 마스터 볼륨 설정
   * @param volume 볼륨 (0~1)
   */
  public setMasterVolume(volume: number): void {
    this.masterGainNode.gain.value = Math.max(0, Math.min(1, volume));
  }

  /**
   * 트랙에 효과 적용
   * @param trackId 트랙 ID
   * @param effect 오디오 효과
   */
  public applyEffect(trackId: string, effect: AudioEffect): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) return;

    let effectNode: AudioNode | null = null;

    switch (effect.type) {
      case AudioEffectType.GAIN:
        effectNode = this.createGainEffect(effect);
        break;
      case AudioEffectType.EQ:
        effectNode = this.createEqEffect(effect);
        break;
      case AudioEffectType.COMPRESSOR:
        effectNode = this.createCompressorEffect(effect);
        break;
      case AudioEffectType.REVERB:
        // 실제 구현에서는 ConvolverNode를 사용해야 함
        effectNode = this.createReverbEffect(effect);
        break;
      case AudioEffectType.DELAY:
        effectNode = this.createDelayEffect(effect);
        break;
      // 기타 효과 추가 가능
    }

    if (effectNode) {
      // 효과 노드 연결 체인 구성
      if (trackNode.effectNodes.length === 0) {
        // 첫 번째 효과일 경우
        trackNode.gainNode.disconnect();
        trackNode.gainNode.connect(effectNode);
        effectNode.connect(trackNode.panNode);
      } else {
        // 이미 효과가 있을 경우, 체인에 추가
        const lastEffectNode = trackNode.effectNodes[trackNode.effectNodes.length - 1];
        lastEffectNode.disconnect();
        lastEffectNode.connect(effectNode);
        effectNode.connect(trackNode.panNode);
      }

      // 효과 노드 배열에 추가
      trackNode.effectNodes.push(effectNode);
    }
  }

  /**
   * 게인 효과 생성
   * @param effect 효과 데이터
   */
  private createGainEffect(effect: AudioEffect): GainNode {
    const gainNode = this.audioContext.createGain();
    const gainParam = effect.parameters.find(p => p.id === 'gain');
    if (gainParam) {
      gainNode.gain.value = gainParam.value;
    }
    return gainNode;
  }

  /**
   * EQ 효과 생성
   * @param effect 효과 데이터
   */
  private createEqEffect(effect: AudioEffect): BiquadFilterNode {
    const eqNode = this.audioContext.createBiquadFilter();
    const typeParam = effect.parameters.find(p => p.id === 'type');
    const frequencyParam = effect.parameters.find(p => p.id === 'frequency');
    const gainParam = effect.parameters.find(p => p.id === 'gain');
    const qParam = effect.parameters.find(p => p.id === 'q');

    if (typeParam) {
      // 타입 안전하게 변환 (문자열 -> BiquadFilterType)
      const filterType = typeParam.value.toString();
      switch (filterType) {
        case 'lowpass':
        case 'highpass':
        case 'bandpass':
        case 'lowshelf':
        case 'highshelf':
        case 'peaking':
        case 'notch':
        case 'allpass':
          eqNode.type = filterType as BiquadFilterType;
          break;
        default:
          console.warn(`지원되지 않는 필터 타입: ${filterType}, 기본값 'lowpass'로 설정`);
          eqNode.type = 'lowpass';
      }
    }
    if (frequencyParam) {
      eqNode.frequency.value = frequencyParam.value;
    }
    if (gainParam) {
      eqNode.gain.value = gainParam.value;
    }
    if (qParam) {
      eqNode.Q.value = qParam.value;
    }

    return eqNode;
  }

  /**
   * 컴프레서 효과 생성
   * @param effect 효과 데이터
   */
  private createCompressorEffect(effect: AudioEffect): DynamicsCompressorNode {
    const compressorNode = this.audioContext.createDynamicsCompressor();
    const thresholdParam = effect.parameters.find(p => p.id === 'threshold');
    const ratioParam = effect.parameters.find(p => p.id === 'ratio');
    const attackParam = effect.parameters.find(p => p.id === 'attack');
    const releaseParam = effect.parameters.find(p => p.id === 'release');
    const kneeParam = effect.parameters.find(p => p.id === 'knee');

    if (thresholdParam) {
      compressorNode.threshold.value = thresholdParam.value;
    }
    if (ratioParam) {
      compressorNode.ratio.value = ratioParam.value;
    }
    if (attackParam) {
      compressorNode.attack.value = attackParam.value;
    }
    if (releaseParam) {
      compressorNode.release.value = releaseParam.value;
    }
    if (kneeParam) {
      compressorNode.knee.value = kneeParam.value;
    }

    return compressorNode;
  }

  /**
   * 리버브 효과 생성 (간단 구현)
   * @param _effect 효과 데이터
   */
  private createReverbEffect(_effect: AudioEffect): ConvolverNode {
    const reverbNode = this.audioContext.createConvolver();
    // 여기서는 임시 구현으로 비워둠
    // 실제 구현에서는 임펄스 응답 파일 로드 필요
    return reverbNode;
  }

  /**
   * 딜레이 효과 생성
   * @param effect 효과 데이터
   */
  private createDelayEffect(effect: AudioEffect): DelayNode {
    const delayNode = this.audioContext.createDelay();
    const timeParam = effect.parameters.find(p => p.id === 'time');
    const feedbackParam = effect.parameters.find(p => p.id === 'feedback');

    if (timeParam) {
      delayNode.delayTime.value = timeParam.value;
    }

    if (feedbackParam) {
      // 피드백을 위한 게인 노드가 필요하지만 여기에서는 간단하게 처리
    }

    return delayNode;
  }

  /**
   * 이펙트 노드 생성 및 연결
   */
  public setupEffects(): void {
    console.log('이펙트 설정 시작');
    
    try {
      // 이펙트 노드들을 담을 맵 초기화 (이미 클래스 프로퍼티로 선언됨)
      
      // 예시: 이퀄라이저 생성
      const equalizer = this.audioContext.createBiquadFilter();
      equalizer.type = 'peaking'; // peaking 필터 타입 사용
      equalizer.frequency.value = 1000; // 1kHz 주파수
      equalizer.gain.value = 0; // 초기 게인은 0dB
      equalizer.Q.value = 1; // Q 밸류 설정
      
      // 이펙트 노드 맵에 추가
      this.effectNodes.set('equalizer', equalizer);
      console.log('이퀄라이저 생성 완료');
      
      // 예시: 컴프레서 생성
      const compressor = this.audioContext.createDynamicsCompressor();
      compressor.threshold.value = -24; // 쓰레숄드 설정 (dB)
      compressor.knee.value = 30; // 니 설정 (dB)
      compressor.ratio.value = 12; // 비율 설정
      compressor.attack.value = 0.003; // 어택 타임 (초)
      compressor.release.value = 0.25; // 릴리즈 타임 (초)
      
      // 이펙트 노드 맵에 추가
      this.effectNodes.set('compressor', compressor);
      console.log('컴프레서 생성 완료');
      
      // 노드 연결 방법 예시
      // this.masterGainNode.connect(compressor);
      // compressor.connect(this.audioContext.destination);
      
      console.log(`이펙트 설정 완료: ${this.effectNodes.size}개 노드 생성됨`);
    } catch (e) {
      console.error('이펙트 설정 중 오류:', e);
    }
  }
  
  /**
   * 특정 이펙트 노드 가져오기
   * @param effectName 이펙트 이름
   * @returns 이펙트 노드 또는 undefined
   */
  public getEffectNode(effectName: string): AudioNode | undefined {
    return this.effectNodes.get(effectName);
  }
  
  /**
   * 이펙트 파라미터 조정하기
   * @param effectName 이펙트 이름
   * @param paramName 파라미터 이름
   * @param value 값
   */
  public setEffectParameter(effectName: string, paramName: string, value: number): void {
    try {
      const effect = this.effectNodes.get(effectName);
      
      if (!effect) {
        console.error(`이펙트를 찾을 수 없음: ${effectName}`);
        return;
      }
      
      // 예시: 이퀄라이저의 게인 변경
      if (effectName === 'equalizer' && effect instanceof BiquadFilterNode) {
        if (paramName === 'gain') {
          effect.gain.value = value;
          console.log(`이퀄라이저 게인 설정: ${value}dB`);
        } else if (paramName === 'frequency') {
          effect.frequency.value = value;
          console.log(`이퀄라이저 주파수 설정: ${value}Hz`);
        } else if (paramName === 'Q') {
          effect.Q.value = value;
          console.log(`이퀄라이저 Q 값 설정: ${value}`);
        }
      }
      // 예시: 컴프레서 설정 변경
      else if (effectName === 'compressor' && effect instanceof DynamicsCompressorNode) {
        if (paramName === 'threshold') {
          effect.threshold.value = value;
          console.log(`컴프레서 쓰레숄드 설정: ${value}dB`);
        } else if (paramName === 'ratio') {
          effect.ratio.value = value;
          console.log(`컴프레서 비율 설정: ${value}:1`);
        }
      }
    } catch (e) {
      console.error(`이펙트 파라미터 설정 중 오류: ${effectName}.${paramName} = ${value}`, e);
    }
  }

  /**
   * 트랙 재생
   * @param trackId 트랙 ID
   * @param startTime 시작 시간(초)
   * @param duration 재생 길이(초)
   */
  public playTrack(trackId: string, startTime: number = 0, duration?: number): void {
    console.log(`트랙 재생 요청: ${trackId}, 시작 시간: ${startTime}초${duration ? `, 길이: ${duration}초` : ''}`);
    
    // 1. 트랙 노드 확인
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) {
      console.error(`트랙 노드를 찾을 수 없음: ${trackId}`);
      return;
    }

    // 2. 오디오 버퍼 확인
    const audioBuffer = trackNode.buffer;
    if (!audioBuffer) {
      console.error(`트랙의 오디오 버퍼가 없음: ${trackId}`);
      return;
    }
    console.log(`버퍼 확인 - 길이: ${audioBuffer.duration.toFixed(2)}초, 채널: ${audioBuffer.numberOfChannels}, 샘플레이트: ${audioBuffer.sampleRate}Hz`);

    // 시작 지점 검증
    if (startTime >= audioBuffer.duration) {
      console.warn(`시작 시간(${startTime}초)이 버퍼 길이(${audioBuffer.duration.toFixed(2)}초)보다 큽니다. 시작 지점을 0으로 재설정합니다.`);
      startTime = 0;
    }

    // 만약 duration이 제공되지 않았다면, 버퍼의 전체 길이를 사용
    // startTime부터 끝까지의 길이를 계산
    if (duration === undefined) {
      duration = audioBuffer.duration - startTime;
      console.log(`명시적 길이가 지정되지 않음, 버퍼 전체 사용: ${duration.toFixed(2)}초`);
    }

    // 길이 검증 - duration이 남은 버퍼 길이보다 크면 조정
    const remainingDuration = audioBuffer.duration - startTime;
    if (duration > remainingDuration) {
      console.warn(`요청된 길이(${duration.toFixed(2)}초)가 남은 버퍼 길이(${remainingDuration.toFixed(2)}초)보다 큽니다. 길이를 조정합니다.`);
      duration = remainingDuration;
    }

    // 3. 기존 소스 노드가 있으면 정지
    if (trackNode.sourceNode) {
      try {
        trackNode.sourceNode.stop();
      } catch (e) {
        // 이미 정지된 경우 무시
      }
      trackNode.sourceNode.disconnect();
    }

    // 4. 새 소스 노드 생성 및 연결
    try {
      const sourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      
      // 소스 노드를 게인 노드에 연결 (게인 노드는 이미 출력과 연결되어 있음)
      sourceNode.connect(trackNode.gainNode);
      
      // 트랙 노드 업데이트
      trackNode.sourceNode = sourceNode;

      // 종료 이벤트 설정 - 여기에 이벤트 핸들러 추가
      sourceNode.onended = (event) => {
        console.log(`소스 노드 재생 완료: ${event.type}`);
        // 이벤트는 AudioBufferSourceNode가 자연스럽게 끝났을 때만 발생해야 함
        console.log('onended 이벤트 발생:', event);
        
        // 관련 상태 업데이트 로직 추가 가능
        this.isPlaying = false;
        this.isPaused = false;
        this.pauseTime = 0;
      };

      // 5. 오디오 컨텍스트 상태 확인 및 재생
      if (this.audioContext.state === 'suspended') {
        console.log('AudioContext suspended 상태, 재개 시도...');
        this.audioContext.resume().then(() => {
          console.log('AudioContext 재개 성공, 재생 시작');
          this.startSourceNode(sourceNode, startTime, duration);
        }).catch(err => {
          console.error('AudioContext 재개 실패:', err);
        });
      } else {
        this.startSourceNode(sourceNode, startTime, duration);
      }
    } catch (e) {
      console.error('소스 노드 생성 또는 연결 중 오류:', e);
    }
  }
  
  /**
   * 소스 노드 재생 시작 (내부 메소드)
   */
  private startSourceNode(sourceNode: AudioBufferSourceNode, startTime: number = 0, duration?: number): void {
    try {
      // 먼저 오디오 컨텍스트 상태 체크
      if (this.audioContext.state === 'suspended') {
        console.log('startSourceNode: AudioContext가 suspended 상태입니다. 재개 시도...');
        this.audioContext.resume().then(() => {
          this.startSourceNodeInternal(sourceNode, startTime, duration);
        }).catch(err => {
          console.error('AudioContext 재개 실패:', err);
        });
        return;
      }
      
      this.startSourceNodeInternal(sourceNode, startTime, duration);
    } catch (e) {
      console.error('소스 노드 시작 오류:', e);
    }
  }
  
  /**
   * 실제 소스 노드 재생 시작 (내부 메소드)
   */
  private startSourceNodeInternal(sourceNode: AudioBufferSourceNode, startTime: number = 0, duration?: number): void {
    // Web Audio API의 start 메서드는 3가지 매개변수를 받음
    // 1. when: 재생 시작 시점 (0은 즉시 시작)
    // 2. offset: 오디오 버퍼 내 시작 지점(초)
    // 3. duration: 재생 길이(초)
    
    try {
      // 소스 노드의 버퍼가 있는지 확인
      if (!sourceNode.buffer) {
        console.error("소스 노드에 AudioBuffer가 없습니다.");
        return;
      }

      // 시작 지점이 버퍼 길이보다 크면 경고
      if (startTime >= sourceNode.buffer.duration) {
        console.warn(`시작 시간(${startTime}초)이 버퍼 길이(${sourceNode.buffer.duration.toFixed(2)}초)보다 큽니다.`);
        startTime = 0; // 시작 지점 재설정
      }
      
      // 만약 duration이 제공되지 않았다면, 버퍼의 전체 길이를 사용
      // startTime부터 끝까지의 길이를 계산
      if (duration === undefined) {
        duration = sourceNode.buffer.duration - startTime;
        console.log(`명시적 길이가 지정되지 않음, 버퍼 전체 사용: ${duration.toFixed(2)}초`);
      }
      
      // duration이 남은 버퍼 길이보다 크면 조정
      const remainingDuration = sourceNode.buffer.duration - startTime;
      if (duration > remainingDuration) {
        console.warn(`요청된 길이(${duration.toFixed(2)}초)가 남은 버퍼 길이(${remainingDuration.toFixed(2)}초)보다 큽니다. 길이를 조정합니다.`);
        duration = remainingDuration;
      }

      console.log(`소스 노드 시작: 오프셋=${startTime}초, 길이=${duration}초`);
      sourceNode.start(0, startTime, duration);
      
      // 상태 업데이트 및 이벤트 발생
      console.log(`트랙 재생 시작: 시작 시간: ${startTime}초, 길이: ${duration}초`);

      // 재생 중인 트랙에 대한 duration 정보를 알리기 위한 이벤트 발생
      const durationUpdateEvent = new CustomEvent('audio-duration-updated', { 
        detail: { duration: sourceNode.buffer.duration, currentTime: startTime } 
      });
      window.dispatchEvent(durationUpdateEvent);
      
      this.isPlaying = true;
      this.isPaused = false;
      this.startTime = this.audioContext.currentTime;
      this.pauseTime = startTime; // 재생 시작 지점으로 pauseTime 설정
    } catch (e) {
      console.error('소스 노드 내부 시작 오류:', e);
    }
  }
  
  /**
   * 모든 트랙 재생
   * @param startTime 시작 시간(초)
   */
  public playAllTracks(startTime: number = 0): void {
    console.log(`모든 트랙 재생 요청, 시작 시간: ${startTime}초, 트랙 수: ${this.trackNodes.size}`);
    
    // 트랙이 로드되었는지 확인
    if (this.trackNodes.size === 0) {
      console.warn('재생할 트랙이 없습니다. 먼저 오디오 파일을 로드하세요.');
      return;
    }
    
    // 유효한 버퍼가 있는 트랙이 하나라도 있는지 확인
    let hasValidBuffer = false;
    this.trackNodes.forEach((trackNode) => {
      if (trackNode.buffer) {
        hasValidBuffer = true;
        console.log(`유효한 버퍼를 가진 트랙 확인: 채널 수: ${trackNode.buffer.numberOfChannels}, 길이: ${trackNode.buffer.duration.toFixed(2)}초`);
      }
    });
    
    if (!hasValidBuffer) {
      console.error('재생할 유효한 오디오 버퍼가 없습니다.');
      return;
    }
    
    // AudioContext 상태 확인 및 시작
    if (this.audioContext.state === 'suspended') {
      console.log('AudioContext suspended 상태, 재개 시도...');
      
      // 사용자 상호작용을 요청하는 메시지 표시 (선택 사항)
      console.warn('오디오 재생을 위해 사용자 상호작용이 필요할 수 있습니다. 화면을 클릭하세요.');
      
      this.audioContext.resume()
        .then(() => {
          console.log('AudioContext 재개 성공, 재생 시작');
          this.playAllTracksInternal(startTime);
        })
        .catch(err => {
          console.error('AudioContext 재개 실패:', err);
        });
    } else {
      this.playAllTracksInternal(startTime);
    }
  }

  /**
   * 내부적으로 모든 트랙 재생 처리
   * @param startTime 시작 시간(초)
   */
  private playAllTracksInternal(startTime: number = 0): void {
    console.log(`모든 트랙 재생 시작, 트랙 수: ${this.trackNodes.size}, 시작 시간: ${startTime}초`);
    
    // 이미 재생 중이면 모든 트랙 먼저 정지
    if (this.isPlaying) {
      console.log('이미 재생 중이므로 모든 트랙 정지');
      this.stopAllTracks();
    }
    
    // 각 트랙에 대해 재생 처리
    if (this.trackNodes.size === 0) {
      console.warn('재생할 트랙이 없습니다.');
      return;
    }
    
    // 재생 상태 설정
    this.startTime = this.audioContext.currentTime;
    this.pauseTime = startTime;
    this.isPlaying = true;
    this.isPaused = false;
    
    console.log(`재생 시작 시간 설정: ${this.startTime}, 시작 오프셋: ${startTime}초`);
    
    // 모든 트랙 재생
    let playedTracks = 0;
    this.trackNodes.forEach((_, trackId) => {
      try {
        this.playTrack(trackId, startTime);
        playedTracks++;
      } catch (e) {
        console.error(`트랙 재생 중 오류 (${trackId}):`, e);
      }
    });
    
    console.log(`${playedTracks}개 트랙 재생 시작됨`);
  }

  /**
   * 트랙 일시 정지
   * @param trackId 트랙 ID
   */
  public pauseTrack(trackId: string): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode || !trackNode.sourceNode) return;

    try {
      // 현재 소스 노드 정지
      trackNode.sourceNode.stop();
      trackNode.sourceNode.disconnect();
      trackNode.sourceNode = undefined;
      console.log(`트랙 일시 정지: ${trackId}`);
    } catch (e) {
      console.warn(`트랙 일시 정지 중 오류 (${trackId}):`, e);
    }
  }

  /**
   * 모든 트랙 재생 일시 정지
   */
  public pauseAllTracks(): void {
    // 현재 시간 저장
    this.pauseTime = this.getCurrentTime();
    console.log(`일시 정지 시점: ${this.pauseTime.toFixed(2)}초`);
    
    // 모든 트랙 정지
    this.trackNodes.forEach((_, trackId) => {
      this.pauseTrack(trackId);
    });
    
    // 상태 업데이트
    this.isPlaying = false;
    this.isPaused = true;
    
    console.log('재생 일시 정지 완료');
  }

  /**
   * 트랙 정지
   * @param trackId 트랙 ID
   */
  public stopTrack(trackId: string): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode || !trackNode.sourceNode) return;

    // 소스 노드 정지
    try {
      trackNode.sourceNode.stop();
    } catch (e) {
      console.warn('소스 노드가 이미 정지되었습니다.');
    }
    
    this.pauseTime = 0;
    this.isPlaying = false;
  }

  /**
   * 모든 트랙 정지
   */
  public stopAllTracks(): void {
    if (!this.isPlaying && !this.isPaused) {
      console.log('이미 정지된 상태입니다.');
      return;
    }
    
    console.log('모든 트랙 재생 중지');
    
    // 각 트랙의 소스 노드 정지
    let stoppedTracks = 0;
    this.trackNodes.forEach((trackNode, trackId) => {
      if (trackNode.sourceNode) {
        try {
          trackNode.sourceNode.stop();
          trackNode.sourceNode.disconnect();
          trackNode.sourceNode = undefined; // null 대신 undefined 사용
          stoppedTracks++;
        } catch (e) {
          console.warn(`트랙 정지 중 오류 (${trackId}):`, e);
        }
      }
    });
    
    console.log(`${stoppedTracks}개 트랙 정지 완료`);
    
    // 상태 초기화
    this.isPlaying = false;
    this.isPaused = false;
    this.pauseTime = 0;
  }

  /**
   * 현재 재생 위치 가져오기
   * @returns 현재 재생 위치(초)
   */
  public getCurrentTime(): number {
    if (this.isPlaying) {
      // 재생 중일 때는 AudioContext 시간과 시작 시간의 차이에 오프셋 시간(pauseTime)을 더함
      const elapsedSinceStart = this.audioContext.currentTime - this.startTime;
      const currentTime = this.pauseTime + elapsedSinceStart;
      
      // 로그 제한 - 너무 자주 로그를 출력하지 않도록 함
      if (Math.floor(elapsedSinceStart * 10) % 30 === 0) { // 약 3초마다
        console.log(`현재 시간 계산: ${currentTime.toFixed(2)}초 (경과: ${elapsedSinceStart.toFixed(2)}초, 오프셋: ${this.pauseTime.toFixed(2)}초)`);
      }
      
      return currentTime;
    } else {
      return this.pauseTime;
    }
  }
  
  /**
   * 트랙 재생 중인지 확인
   * @returns 재생 중이면 true
   */
  public isPlayingTracks(): boolean {
    return this.isPlaying;
  }
  
  /**
   * 재생 중인지 여부 확인
   * @returns 재생 중이면 true, 아니면 false
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * 재생 일시 정지
   */
  public pausePlayback(): void {
    if (!this.isPlaying) {
      console.log('재생 중이 아니므로 일시 정지할 수 없습니다.');
      return;
    }
    
    // 현재 시간 저장
    this.pauseTime = this.getCurrentTime();
    console.log(`일시 정지 시점: ${this.pauseTime.toFixed(2)}초`);
    
    // 모든 트랙 정지
    this.trackNodes.forEach((trackNode, trackId) => {
      if (trackNode.sourceNode) {
        this.pauseTrack(trackId);
      }
    });
    
    this.isPlaying = false;
    this.isPaused = true;
    
    console.log('재생 일시 정지 완료');
  }

  /**
   * 일시 정지된 재생 재개
   */
  public resumePlayback(): void {
    if (!this.isPaused) {
      console.log('일시 정지 상태가 아니므로 재개할 수 없습니다.');
      return;
    }
    
    console.log(`일시 정지된 지점(${this.pauseTime.toFixed(2)}초)부터 재생 재개`);
    
    // 일시 정지된 지점부터 재생 재개
    this.playAllTracks(this.pauseTime);
    
    // 상태 업데이트
    this.isPaused = false;
  }
  
  /**
   * 트랙 리소스 해제
   * @param trackId 트랙 ID
   */
  public releaseTrack(trackId: string): void {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) return;

    // 소스 노드 정지 및 연결 해제
    if (trackNode.sourceNode) {
      try {
        trackNode.sourceNode.stop();
      } catch (e) {
        // 이미 정지된 경우 무시
      }
      trackNode.sourceNode.disconnect();
    }

    // 효과 노드 연결 해제
    trackNode.effectNodes.forEach(node => {
      node.disconnect();
    });

    // 게인, 패닝, 분석기 노드 연결 해제
    trackNode.gainNode.disconnect();
    trackNode.panNode.disconnect();
    trackNode.analyzerNode.disconnect();

    // 트랙 노드 맵에서 제거
    this.trackNodes.delete(trackId);
  }

  /**
   * 모든 트랙 리소스 해제
   */
  public releaseAllTracks(): void {
    this.trackNodes.forEach((_, trackId) => {
      this.releaseTrack(trackId);
    });
  }

  /**
   * 오디오 서비스 정리
   */
  public dispose(): void {
    this.releaseAllTracks();
    
    // 마스터 게인 노드 연결 해제
    this.masterGainNode.disconnect();
    
    // 오디오 컨텍스트 닫기
    if (this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    
    this.isInitialized = false;
  }

  /**
   * 트랙의 피크 레벨 데이터 가져오기
   * @param trackId 트랙 ID
   * @returns 피크 레벨 데이터 배열
   */
  public getTrackPeakData(trackId: string): Uint8Array | null {
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode) return null;

    const analyzer = trackNode.analyzerNode;
    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(dataArray);
    
    return dataArray;
  }

  /**
   * 오디오 샘플 내보내기
   * @param trackId 트랙 ID
   * @param startTime 시작 시간(초)
   * @param duration 내보낼 길이(초)
   * @param _format 내보내기 형식 ('wav', 'mp3')
   */
  public async exportAudio(trackId: string, startTime: number = 0, duration: number, _format: 'wav' | 'mp3' = 'wav'): Promise<Blob> {
    // 이 기능은 WAV 내보내기 간단 구현
    // 실제 구현에서는 더 복잡한 처리가 필요하며, MP3는 추가 인코딩 라이브러리 필요
    
    const trackNode = this.trackNodes.get(trackId);
    if (!trackNode || !trackNode.sourceNode || !trackNode.sourceNode.buffer) {
      throw new Error('유효한 오디오 트랙이 없습니다.');
    }

    const audioBuffer = trackNode.sourceNode.buffer;
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const startIndex = Math.floor(startTime * sampleRate);
    const endIndex = Math.min(Math.floor((startTime + duration) * sampleRate), audioBuffer.length);
    const length = endIndex - startIndex;

    // 새 오프라인 컨텍스트 생성
    const offlineCtx = new OfflineAudioContext(
      numberOfChannels,
      length,
      sampleRate
    );

    // 새 버퍼 소스 생성
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;

    // 소스를 대상에 연결
    source.connect(offlineCtx.destination);

    // 시작 위치에서 재생
    source.start(0, startTime);

    // 렌더링
    const renderedBuffer = await offlineCtx.startRendering();

    // WAV로 인코딩
    const wavBlob = this.encodeWAV(renderedBuffer);
    return wavBlob;
  }

  /**
   * AudioBuffer를 WAV Blob으로 인코딩
   * @param buffer AudioBuffer
   * @returns WAV Blob
   */
  private encodeWAV(buffer: AudioBuffer): Blob {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2;
    const sampleRate = buffer.sampleRate;
    const result = new ArrayBuffer(44 + length);
    const view = new DataView(result);
    
    // RIFF 헤더
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    this.writeString(view, 8, 'WAVE');
    
    // fmt 청크
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChan * 2, true);
    view.setUint16(32, numOfChan * 2, true);
    view.setUint16(34, 16, true);
    
    // 데이터 청크
    this.writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // 인터리빙된 채널 데이터 쓰기
    const channelData = [];
    let offset = 44;
    
    // 각 채널의 데이터 가져오기
    for (let i = 0; i < numOfChan; i++) {
      channelData.push(buffer.getChannelData(i));
    }
    
    // 인터리브 방식으로 데이터 쓰기
    for (let i = 0; i < buffer.length; i++) {
      for (let j = 0; j < numOfChan; j++) {
        const sample = Math.max(-1, Math.min(1, channelData[j][i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([view], { type: 'audio/wav' });
  }

  /**
   * DataView에 문자열 쓰기
   * @param view DataView
   * @param offset 시작 위치
   * @param string 쓸 문자열
   */
  private writeString(view: DataView, offset: number, string: string): void {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
}
