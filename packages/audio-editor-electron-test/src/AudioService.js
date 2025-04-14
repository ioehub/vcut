/**
 * AudioService 클래스
 * 오디오 처리와 관련된 모든 기능을 관리합니다.
 */
class AudioService {
  constructor() {
    // AudioContext 생성
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 오디오 노드 초기화
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    
    // 상태 관련 변수
    this.audioBuffer = null;
    this.sourceNode = null;
    this.isPlaying = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.volume = 1.0;
    
    // 페이드 효과 설정
    this.fadeInDuration = 0;
    this.fadeOutDuration = 0;
    
    console.log('오디오 서비스 초기화됨');
  }
  
  /**
   * 오디오 파일 로드
   * @param {File} file - 로드할 오디오 파일
   * @returns {Promise<boolean>} 로드 성공 여부
   */
  async loadAudioFile(file) {
    try {
      console.log(`오디오 파일 로드 중: ${file.name}`);
      
      const arrayBuffer = await this._readFileAsArrayBuffer(file);
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      console.log(`오디오 디코딩 완료 - 길이: ${this.audioBuffer.duration.toFixed(2)}초`);
      return true;
    } catch (error) {
      console.error('오디오 파일 로드 오류:', error);
      return false;
    }
  }
  
  /**
   * 파일을 ArrayBuffer로 읽기
   * @param {File} file - 읽을 파일
   * @returns {Promise<ArrayBuffer>} 파일 데이터
   */
  _readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      
      reader.readAsArrayBuffer(file);
    });
  }
  
  /**
   * 오디오 재생
   * @returns {boolean} 재생 성공 여부
   */
  play() {
    if (!this.audioBuffer) {
      console.error('재생할 오디오 버퍼가 없음');
      return false;
    }
    
    try {
      // 이미 재생 중이면 중지
      if (this.isPlaying) {
        this.stop();
      }
      
      // 오디오 소스 생성
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      
      // 페이드 효과가 있는 경우, GainNode 초기화
      if (this.fadeInDuration > 0 || this.fadeOutDuration > 0) {
        this._setupFadeEffect();
      }
      
      // 소스 연결 및 재생
      this.sourceNode.connect(this.gainNode);
      
      // 이전에 일시 정지한 경우
      const offset = this.pauseTime > 0 ? this.pauseTime : 0;
      
      this.sourceNode.start(0, offset);
      this.startTime = this.audioContext.currentTime - offset;
      this.isPlaying = true;
      
      // 재생 완료 이벤트
      this.sourceNode.onended = () => {
        this.isPlaying = false;
        this.pauseTime = 0;
        console.log('재생 완료');
      };
      
      console.log(`오디오 재생 시작 - 위치: ${offset.toFixed(2)}초`);
      return true;
    } catch (error) {
      console.error('오디오 재생 오류:', error);
      return false;
    }
  }
  
  /**
   * 오디오 일시 정지
   * @returns {boolean} 일시 정지 성공 여부
   */
  pause() {
    if (!this.isPlaying || !this.sourceNode) {
      console.warn('일시 정지할 오디오가 없음');
      return false;
    }
    
    try {
      this.sourceNode.stop();
      this.pauseTime = this.getCurrentTime();
      this.isPlaying = false;
      
      console.log(`오디오 일시 정지 - 위치: ${this.pauseTime.toFixed(2)}초`);
      return true;
    } catch (error) {
      console.error('오디오 일시 정지 오류:', error);
      return false;
    }
  }
  
  /**
   * 오디오 정지
   * @returns {boolean} 정지 성공 여부
   */
  stop() {
    if (!this.sourceNode) {
      console.warn('정지할 오디오가 없음');
      return false;
    }
    
    try {
      this.sourceNode.stop();
      this.sourceNode = null;
      this.isPlaying = false;
      this.pauseTime = 0;
      
      console.log('오디오 정지');
      return true;
    } catch (error) {
      console.error('오디오 정지 오류:', error);
      return false;
    }
  }
  
  /**
   * 볼륨 설정
   * @param {number} value - 볼륨 값 (0-1)
   */
  setVolume(value) {
    if (value < 0 || value > 1) {
      console.warn('볼륨 값은 0-1 사이여야 함');
      return;
    }
    
    this.volume = value;
    this.gainNode.gain.value = value;
    console.log(`볼륨 설정: ${Math.round(value * 100)}%`);
  }
  
  /**
   * 페이드 효과 설정
   * @param {number} fadeInDuration - 페이드 인 지속 시간 (초)
   * @param {number} fadeOutDuration - 페이드 아웃 지속 시간 (초)
   * @returns {boolean} 설정 성공 여부
   */
  applyFadeEffect(fadeInDuration, fadeOutDuration) {
    if (!this.audioBuffer) {
      console.error('적용할 오디오 버퍼가 없음');
      return false;
    }
    
    this.fadeInDuration = fadeInDuration;
    this.fadeOutDuration = fadeOutDuration;
    
    console.log(`페이드 효과 설정: 인=${fadeInDuration}초, 아웃=${fadeOutDuration}초`);
    return true;
  }
  
  /**
   * 페이드 효과 설정 (내부 함수)
   */
  _setupFadeEffect() {
    const currentTime = this.audioContext.currentTime;
    const duration = this.audioBuffer.duration;
    
    // 현재 게인값 설정
    this.gainNode.gain.value = this.volume;
    
    // 페이드 인
    if (this.fadeInDuration > 0) {
      this.gainNode.gain.setValueAtTime(0, currentTime);
      this.gainNode.gain.linearRampToValueAtTime(
        this.volume,
        currentTime + this.fadeInDuration
      );
    }
    
    // 페이드 아웃
    if (this.fadeOutDuration > 0) {
      const fadeOutStart = currentTime + duration - this.fadeOutDuration;
      this.gainNode.gain.setValueAtTime(this.volume, fadeOutStart);
      this.gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
    }
  }
  
  /**
   * 현재 재생 시간 가져오기
   * @returns {number} 현재 재생 시간 (초)
   */
  getCurrentTime() {
    if (!this.isPlaying) {
      return this.pauseTime;
    }
    
    return this.audioContext.currentTime - this.startTime;
  }
  
  /**
   * 오디오 총 길이 가져오기
   * @returns {number} 총 길이 (초)
   */
  getDuration() {
    return this.audioBuffer ? this.audioBuffer.duration : 0;
  }
  
  /**
   * 재생 상태 확인
   * @returns {boolean} 재생 중 여부
   */
  getIsPlaying() {
    return this.isPlaying;
  }
  
  /**
   * 웨이브폼 데이터 생성
   * @param {number} samples - 샘플 수 (기본값: 100)
   * @returns {number[]} 파형 데이터 배열
   */
  generateWaveformData(samples = 100) {
    if (!this.audioBuffer) {
      console.warn('웨이브폼을 생성할 오디오 버퍼가 없음');
      return null;
    }
    
    const channelData = this.audioBuffer.getChannelData(0);
    const blockSize = Math.floor(channelData.length / samples);
    const waveform = [];
    
    for (let i = 0; i < samples; i++) {
      const start = blockSize * i;
      let sum = 0;
      
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(channelData[start + j]);
      }
      
      // 정규화된 진폭 계산 (0-1 사이)
      waveform.push(sum / blockSize);
    }
    
    // 결과값 정규화
    const max = Math.max(...waveform);
    return waveform.map(val => val / max);
  }
}

// 클래스 내보내기
window.AudioService = AudioService;
