/**
 * AudioService 클래스 - 오디오 처리 및 재생 관리
 */
export class AudioService {
  private audioContext: AudioContext;
  private masterGainNode: GainNode;
  private sourceNode: AudioBufferSourceNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  
  private startTime: number = 0;
  private pauseTime: number = 0;
  
  private fadeInDuration: number = 0;
  private fadeOutDuration: number = 0;
  
  // 이벤트 콜백 함수들
  private onPlayCallback: (() => void) | null = null;
  private onPauseCallback: (() => void) | null = null;
  private onStopCallback: (() => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  
  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    
    this.setupAutoResume();
    
    console.log('AudioService 초기화 완료');
  }
  
  /**
   * 사용자 상호작용 시 오디오 컨텍스트 자동 재개 설정
   */
  private setupAutoResume(): void {
    const resumeEvents = ['mousedown', 'keydown', 'touchstart'];
    
    const resumeOnInteraction = () => {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('AudioContext 재개됨 (사용자 상호작용)');
        });
      }
    };
    
    resumeEvents.forEach(event => {
      document.addEventListener(event, resumeOnInteraction, { once: true });
    });
  }
  
  /**
   * 오디오 컨텍스트 상태 확인 및 재개
   */
  public async resumeAudioContext(): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
      console.log('AudioContext 수동 재개');
    }
  }
  
  /**
   * ArrayBuffer에서 오디오 데이터 디코딩
   */
  private async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
    try {
      console.log('오디오 버퍼 디코딩 중...');
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log(`오디오 디코딩 완료 - 길이: ${audioBuffer.duration.toFixed(2)}초`);
      return audioBuffer;
    } catch (error) {
      console.error('오디오 디코딩 실패:', error);
      throw error;
    }
  }
  
  /**
   * 파일 객체에서 오디오 로드
   */
  public async loadAudioFile(file: File): Promise<boolean> {
    try {
      console.log(`오디오 파일 로드 중: ${file.name}`);
      
      // 이전 재생 중지
      this.stop();
      
      // 파일 읽기
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
      
      // 오디오 디코딩
      this.audioBuffer = await this.decodeAudioData(arrayBuffer);
      
      console.log(`오디오 파일 로드 완료: ${file.name}, 길이: ${this.audioBuffer.duration.toFixed(2)}초`);
      
      // 시간 업데이트 이벤트 발생
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(0);
      }
      
      return true;
    } catch (error) {
      console.error('오디오 파일 로드 실패:', error);
      return false;
    }
  }
  
  /**
   * ArrayBuffer에서 직접 오디오 로드
   */
  public async loadAudioArrayBuffer(arrayBuffer: ArrayBuffer): Promise<boolean> {
    try {
      // 이전 재생 중지
      this.stop();
      
      // 오디오 디코딩
      this.audioBuffer = await this.decodeAudioData(arrayBuffer);
      
      console.log(`오디오 버퍼 로드 완료, 길이: ${this.audioBuffer.duration.toFixed(2)}초`);
      
      // 시간 업데이트 이벤트 발생
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(0);
      }
      
      return true;
    } catch (error) {
      console.error('오디오 버퍼 로드 실패:', error);
      return false;
    }
  }
  
  /**
   * 오디오 재생
   */
  public play(startTime: number = 0, duration?: number): void {
    try {
      if (!this.audioBuffer) {
        console.warn('재생할 오디오 버퍼가 없습니다.');
        return;
      }
      
      console.log(`재생 요청: 시작 시간 ${startTime}초${duration ? `, 길이 ${duration}초` : ''}`);
      
      // 시작 지점 검증
      if (startTime >= this.audioBuffer.duration) {
        console.warn(`시작 시간(${startTime}초)이 버퍼 길이(${this.audioBuffer.duration.toFixed(2)}초)보다 큽니다. 시작 지점을 0으로 재설정합니다.`);
        startTime = 0;
      }
      
      // 길이가 제공되지 않으면 전체 길이 사용
      if (duration === undefined) {
        duration = this.audioBuffer.duration - startTime;
        console.log(`명시적 길이 지정되지 않음, 남은 길이 사용: ${duration.toFixed(2)}초`);
      }
      
      // 길이 검증
      const remainingDuration = this.audioBuffer.duration - startTime;
      if (duration > remainingDuration) {
        console.warn(`요청된 길이(${duration.toFixed(2)}초)가 남은 버퍼 길이(${remainingDuration.toFixed(2)}초)보다 큽니다. 길이를 조정합니다.`);
        duration = remainingDuration;
      }
      
      // 기존 소스 노드 정리
      if (this.sourceNode) {
        try {
          this.sourceNode.stop();
        } catch (e) {
          // 이미 정지된 경우 무시
        }
        this.sourceNode.disconnect();
        this.sourceNode = null;
      }
      
      // 새 소스 노드 생성
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      
      // 페이드 인/아웃 효과 적용
      if (this.fadeInDuration > 0 || this.fadeOutDuration > 0) {
        console.log('페이드 효과 적용 중...');
        
        if (this.fadeInDuration > 0) {
          this.applyFadeIn(this.sourceNode);
        } else {
          this.sourceNode.connect(this.masterGainNode);
        }
        
        if (this.fadeOutDuration > 0) {
          this.applyFadeOut(this.sourceNode, duration);
        }
      } else {
        // 페이드 효과가 없는 경우 기본 연결
        this.sourceNode.connect(this.masterGainNode);
      }
      
      // 종료 이벤트 설정
      this.sourceNode.onended = this.handleSourceEnded.bind(this);
      
      // 오디오 컨텍스트 상태 확인 및 재생
      if (this.audioContext.state === 'suspended') {
        console.log('AudioContext suspended 상태, 재개 시도...');
        this.audioContext.resume().then(() => {
          console.log('AudioContext 재개됨, 재생 시작');
          this.startSourceNode(startTime, duration);
        });
      } else {
        this.startSourceNode(startTime, duration);
      }
      
      // 상태 업데이트
      this.isPlaying = true;
      this.isPaused = false;
      
      // 재생 콜백 실행
      if (this.onPlayCallback) {
        this.onPlayCallback();
      }
      
    } catch (error) {
      console.error('오디오 재생 중 오류 발생:', error);
    }
  }
  
  /**
   * 소스 노드 시작
   */
  private startSourceNode(startTime: number = 0, duration?: number): void {
    if (!this.sourceNode || !this.sourceNode.buffer) {
      console.error('소스 노드가 없거나 버퍼가 설정되지 않았습니다.');
      return;
    }
    
    console.log(`소스 노드 시작: 오프셋=${startTime}초, 길이=${duration ? duration : '전체'}초`);
    
    if (duration) {
      this.sourceNode.start(0, startTime, duration);
    } else {
      this.sourceNode.start(0, startTime);
    }
    
    this.startTime = this.audioContext.currentTime;
    this.pauseTime = startTime;
  }
  
  /**
   * 소스 노드 종료 시 처리
   */
  private handleSourceEnded(): void {
    console.log('소스 노드 재생 완료');
    
    this.isPlaying = false;
    this.isPaused = false;
    this.pauseTime = 0;
    
    // 종료 콜백 실행
    if (this.onEndedCallback) {
      this.onEndedCallback();
    }
  }
  
  /**
   * 재생 일시정지
   */
  public pause(): void {
    if (!this.isPlaying || this.isPaused) {
      console.warn('이미 일시정지 되었거나 재생 중이 아닙니다.');
      return;
    }
    
    try {
      if (this.sourceNode) {
        this.sourceNode.stop();
        this.sourceNode.disconnect();
        this.sourceNode = null;
      }
      
      this.pauseTime = this.getCurrentTime();
      this.isPlaying = false;
      this.isPaused = true;
      
      console.log(`재생 일시정지됨: ${this.pauseTime.toFixed(2)}초`);
      
      // 일시정지 콜백 실행
      if (this.onPauseCallback) {
        this.onPauseCallback();
      }
      
    } catch (error) {
      console.error('일시정지 중 오류 발생:', error);
    }
  }
  
  /**
   * 재생 정지
   */
  public stop(): void {
    try {
      if (this.sourceNode) {
        try {
          this.sourceNode.stop();
        } catch (e) {
          // 이미 정지된 경우 무시
        }
        this.sourceNode.disconnect();
        this.sourceNode = null;
      }
      
      this.isPlaying = false;
      this.isPaused = false;
      this.pauseTime = 0;
      
      console.log('재생 정지됨');
      
      // 정지 콜백 실행
      if (this.onStopCallback) {
        this.onStopCallback();
      }
      
      // 시간 업데이트 콜백 실행 (0으로 리셋)
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(0);
      }
      
    } catch (error) {
      console.error('정지 중 오류 발생:', error);
    }
  }
  
  /**
   * 현재 재생 시간 반환
   */
  public getCurrentTime(): number {
    if (!this.isPlaying) {
      return this.pauseTime;
    }
    
    if (!this.audioContext || !this.startTime) {
      return 0;
    }
    
    // 현재 오디오 컨텍스트 시간에서 시작 시간을 뺌
    const playbackTime = this.audioContext.currentTime - this.startTime;
    // 일시정지 시간에 재생 시간을 더함
    return this.pauseTime + playbackTime;
  }
  
  /**
   * 오디오 버퍼 총 길이 반환
   */
  public getDuration(): number {
    return this.audioBuffer ? this.audioBuffer.duration : 0;
  }
  
  /**
   * 현재 재생 중인지 확인
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * 현재 일시정지 상태인지 확인
   */
  public getIsPaused(): boolean {
    return this.isPaused;
  }
  
  /**
   * 페이드 인/아웃 효과 설정
   */
  public applyFadeEffect(fadeInDuration: number = 0, fadeOutDuration: number = 0): boolean {
    if (!this.audioBuffer) {
      console.warn('페이드 효과를 적용할 오디오 버퍼가 없습니다.');
      return false;
    }
    
    this.fadeInDuration = fadeInDuration;
    this.fadeOutDuration = fadeOutDuration;
    
    console.log(`페이드 효과 설정: 인=${fadeInDuration}초, 아웃=${fadeOutDuration}초`);
    return true;
  }
  
  /**
   * 페이드 인 효과 적용
   */
  private applyFadeIn(sourceNode: AudioBufferSourceNode): GainNode {
    if (this.fadeInDuration <= 0) {
      sourceNode.connect(this.masterGainNode);
      return this.masterGainNode;
    }
    
    const gainNode = this.audioContext.createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(this.masterGainNode);
    
    // 시작 시 볼륨 0에서 시작
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    // fadeInDuration 시간에 걸쳐 볼륨 1로 증가
    gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + this.fadeInDuration);
    
    console.log(`페이드 인 효과 적용: ${this.fadeInDuration}초`);
    return gainNode;
  }
  
  /**
   * 페이드 아웃 효과 적용
   */
  private applyFadeOut(sourceNode: AudioBufferSourceNode, duration: number): GainNode {
    if (this.fadeOutDuration <= 0) {
      if (!sourceNode.numberOfOutputs) { // 아직 연결되지 않은 경우
        sourceNode.connect(this.masterGainNode);
      }
      return this.masterGainNode;
    }
    
    const gainNode = this.audioContext.createGain();
    sourceNode.connect(gainNode);
    gainNode.connect(this.masterGainNode);
    
    // 현재 볼륨 1 유지
    gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    
    // 종료 시점 계산
    const endTime = this.audioContext.currentTime + duration;
    const fadeOutStartTime = endTime - this.fadeOutDuration;
    
    // fadeOutDuration 시간에 걸쳐 볼륨 0으로 감소
    gainNode.gain.setValueAtTime(1, fadeOutStartTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime);
    
    console.log(`페이드 아웃 효과 적용: ${this.fadeOutDuration}초`);
    return gainNode;
  }
  
  /**
   * 오디오 파형 데이터 생성
   */
  public generateWaveformData(samplesCount: number = 1000): Float32Array | null {
    if (!this.audioBuffer) {
      return null;
    }
    
    const channelData = this.audioBuffer.getChannelData(0);
    const blockSize = Math.floor(channelData.length / samplesCount);
    const waveformData = new Float32Array(samplesCount);
    
    for (let i = 0; i < samplesCount; i++) {
      const start = i * blockSize;
      let sum = 0;
      
      // 블록 내의 샘플 평균 계산
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[start + j]);
      }
      
      waveformData[i] = sum / blockSize;
    }
    
    return waveformData;
  }
  
  /**
   * 볼륨 설정
   */
  public setVolume(volume: number): void {
    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;
    
    this.masterGainNode.gain.value = volume;
    console.log(`볼륨 설정: ${(volume * 100).toFixed(0)}%`);
  }
  
  /**
   * 볼륨 가져오기
   */
  public getVolume(): number {
    return this.masterGainNode.gain.value;
  }
  
  /**
   * 이벤트 콜백 설정
   */
  public setOnPlay(callback: () => void): void {
    this.onPlayCallback = callback;
  }
  
  public setOnPause(callback: () => void): void {
    this.onPauseCallback = callback;
  }
  
  public setOnStop(callback: () => void): void {
    this.onStopCallback = callback;
  }
  
  public setOnEnded(callback: () => void): void {
    this.onEndedCallback = callback;
  }
  
  public setOnTimeUpdate(callback: (time: number) => void): void {
    this.onTimeUpdateCallback = callback;
  }
}
