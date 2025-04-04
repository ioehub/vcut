# vCut Audio Editor 모듈 개발 문서

## 개요
vCut 프로젝트의 오디오 에디터 모듈은 다중 오디오 트랙을 관리하고 재생, 편집, 시각화 기능을 제공합니다. Web Audio API를 기반으로 구현되었으며, 오디오 편집 시 필요한 다양한 기능을 지원합니다.

## 주요 기능
- 로컬 및 원격 오디오 파일 로드
- 다중 오디오 트랙 재생 및 편집
- 오디오 파형 시각화
- 재생 제어 (재생, 일시정지, 정지)
- 볼륨 및 팬 조절
- 시간 표시 및 타임라인 마커
- 구간 반복 재생 (루프)
- 오디오 이펙트 처리

## 구성 요소

### 1. AudioService (src/services/AudioService.ts)
오디오 처리 및 재생 핵심 서비스:
- AudioContext 초기화 및 관리
- 오디오 파일 로드 및 디코딩
- 오디오 노드 생성 및 연결
- 재생 제어 및 시간 관리
- 오디오 이펙트 처리

#### 주요 문제 해결
- AudioContext 상태 관리 (suspended, running, closed)
- 사용자 상호작용 기반 AudioContext 재개
- 오디오 버퍼 디코딩 안정성 개선
- 일시정지 및 재개 기능 최적화
- 시간 업데이트 정확도 향상

### 2. AudioEditorContext (src/context/AudioEditorContext.tsx)
상태 관리 및 컨텍스트 제공:
- 트랙 추가/제거/업데이트
- 재생 상태 관리
- 볼륨 및 팬 설정
- 시간 위치 추적
- 이펙트 및 마커 관리

#### 주요 문제 해결
- 복잡한 상태 관리를 위한 리듀서 패턴 구현
- AudioService 초기화 및 수명 주기 관리
- 일관된 재생 시간 업데이트 메커니즘
- 예외 처리 및 오류 복구

### 3. TransportControls (src/components/TransportControls.tsx)
재생 제어 UI 컴포넌트:
- 재생/일시정지/정지 버튼
- 시간 표시 및 포맷팅
- 루프 설정 인터페이스
- 이동 제어 (앞으로/뒤로)

#### 주요 문제 해결
- 시간 포맷팅 정확도 개선
- UI 상태와 오디오 상태 동기화
- 모바일 환경 지원 최적화

## 구현 세부 사항

### AudioContext 관리
```typescript
// AudioContext 생성 및 초기화
this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// 사용자 상호작용으로 AudioContext 재개
const resumeAudioContext = () => {
  if (this.audioContext.state === 'suspended') {
    this.audioContext.resume().then(() => {
      console.log('AudioContext 재개 성공');
    }).catch(err => {
      console.error('AudioContext 재개 실패:', err);
    });
  }
};

// 이벤트 리스너 등록
const interactionEvents = ['click', 'touchstart', 'keydown'];
interactionEvents.forEach(eventType => {
  document.addEventListener(eventType, resumeAudioContext, { once: true });
});
```

### 오디오 파일 로드 및 디코딩
```typescript
public async loadAudioFile(url: string): Promise<AudioBuffer> {
  try {
    console.log(`오디오 파일 로드 시도: ${url}`);
    
    // AudioContext 상태 확인 및 처리
    if (this.audioContext.state === 'suspended' || this.audioContext.state === 'closed') {
      console.log(`AudioContext가 ${this.audioContext.state} 상태입니다. 재개 시도...`);
      
      // AudioContext가 closed 상태이면 재생성
      if (this.audioContext.state === 'closed') {
        console.log('AudioContext가 closed 상태입니다. 새로 생성합니다.');
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // 마스터 게인 노드를 다시 생성하고 연결
        this.masterGainNode = this.audioContext.createGain();
        this.masterGainNode.gain.value = 1.0;
        this.masterGainNode.connect(this.audioContext.destination);
      } else {
        // suspended 상태라면 resume 시도
        try {
          await this.audioContext.resume();
          console.log('AudioContext가 성공적으로 재개되었습니다.');
        } catch (resumeErr) {
          console.error('AudioContext resume 실패:', resumeErr);
        }
      }
    }
    
    // 파일 로드 및 디코딩
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    console.log(`파일 다운로드 완료, 크기: ${arrayBuffer.byteLength} 바이트, 디코딩 시작...`);
    
    const audioBuffer = await this.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } catch (error) {
    console.error('오디오 파일 로드 실패:', error);
    throw error;
  }
}
```

### 재생 제어
```typescript
// 재생 시작
public playAllTracks(startPosition: number = 0): void {
  try {
    if (this.trackNodes.size === 0) {
      console.warn('재생할 트랙이 없습니다. 먼저 오디오 파일을 로드하세요.');
      return;
    }
    
    if (this.isPlaying) {
      console.log('이미 재생 중입니다. 먼저 정지하세요.');
      this.stopAllTracks();
    }
    
    // AudioContext 상태 확인
    if (this.audioContext.state === 'suspended') {
      console.log('AudioContext가 suspended 상태입니다. 재개 시도...');
      this.audioContext.resume().catch(err => {
        console.error('AudioContext resume 실패:', err);
      });
    }
    
    // 각 트랙에 대해 소스 노드 생성 및 재생
    this.startTime = this.audioContext.currentTime - startPosition;
    this.isPlaying = true;
    this.isPaused = false;
    
    console.log(`재생 시작: 시작 위치 ${startPosition}초, 현재 AudioContext 시간: ${this.audioContext.currentTime}초`);
    
    // 각 트랙 재생 로직...
  } catch (error) {
    console.error('재생 시작 중 오류 발생:', error);
  }
}

// 일시정지
public pausePlayback(): void {
  if (!this.isPlaying || this.isPaused) {
    return;
  }
  
  // 현재 시간 기록
  this.pauseTime = this.audioContext.currentTime;
  this.pausedPosition = this.getCurrentTime();
  
  // 모든 트랙 일시정지
  this.trackNodes.forEach((nodes, trackId) => {
    if (nodes.length > 0 && nodes[0] instanceof AudioBufferSourceNode) {
      const sourceNode = nodes[0] as AudioBufferSourceNode;
      sourceNode.stop();
    }
  });
  
  this.trackNodes.clear();
  this.isPaused = true;
  this.isPlaying = false;
  
  console.log(`재생 일시정지: ${this.pausedPosition.toFixed(2)}초 지점`);
}

// 재생 재개
public resumePlayback(): void {
  if (!this.isPaused) {
    return;
  }
  
  // 일시정지된 지점부터 재생 재개
  this.playAllTracks(this.pausedPosition);
}
```

### 시간 표시 및 포맷팅
```typescript
// 현재 시간 계산
public getCurrentTime(): number {
  if (!this.isPlaying) {
    if (this.isPaused) {
      return this.pausedPosition;
    }
    return 0;
  }
  
  // 재생 중인 경우 경과 시간 계산
  const elapsedSinceStart = this.audioContext.currentTime - this.startTime;
  return Math.max(0, elapsedSinceStart);
}

// 시간 포맷팅 (분:초.밀리초)
export const formatTime = (timeInSeconds: number): string => {
  if (timeInSeconds === undefined || timeInSeconds === null || isNaN(timeInSeconds)) {
    console.warn(`유효하지 않은 시간값: ${timeInSeconds}`);
    return '00:00.000';
  }
  
  // 시간 포맷팅 로직...
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}
```

## 개선 사항 및 향후 계획
1. **오디오 처리 성능 최적화**: 대용량 오디오 파일 처리 시 메모리 사용량 및 성능 개선
2. **오프라인 렌더링 지원**: 오디오 처리 작업을 오프라인에서 렌더링하여 성능 향상
3. **추가 오디오 효과**: 이퀄라이저, 컴프레서, 리버브 등 다양한 효과 구현
4. **플러그인 시스템**: 사용자 정의 효과 플러그인 지원
5. **MIDI 지원**: MIDI 장치 연동 및 제어 기능 추가
6. **멀티채널 오디오**: 5.1, 7.1 등 서라운드 오디오 포맷 지원
7. **다양한 오디오 포맷**: 추가 오디오 포맷 지원 확장
8. **비디오 싱크**: 비디오 타임라인과의 동기화 개선

## 테스트 전략
1. **단위 테스트**: 개별 기능 및 메서드 테스트
2. **통합 테스트**: 컴포넌트 간 상호작용 테스트
3. **E2E 테스트**: 사용자 시나리오 기반 전체 흐름 테스트
4. **성능 테스트**: 대용량 오디오 파일 처리 성능 측정
5. **호환성 테스트**: 다양한 브라우저 및 환경 테스트
6. **에러 복구 테스트**: 예외 상황 및 복구 메커니즘 테스트
