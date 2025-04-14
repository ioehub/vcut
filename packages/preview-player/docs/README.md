# Preview Player

## 개요

`preview-player` 패키지는 vCut 비디오 편집기에서 비디오 미리보기 및 재생 기능을 제공하는 React 컴포넌트입니다. 이 패키지는 HTML5 비디오 플레이어를 기반으로 하며, 추가적인 기능과 커스텀 컨트롤을 제공합니다.

## 기능

이 패키지는 다음과 같은 주요 기능을 제공합니다:

1. **비디오 재생**: 기본적인 비디오 재생, 일시정지, 정지 기능
2. **시간 제어**: 특정 시작 및 종료 시간 지정 가능
3. **커스텀 컨트롤**: 재생/일시정지, 볼륨, 전체화면 등의 컨트롤
4. **썸네일 표시**: 비디오 포스터 이미지 지원
5. **진행 표시**: 비디오 재생 진행률 및 버퍼링 상태 표시
6. **이벤트 핸들링**: 다양한 비디오 이벤트 처리 및 콜백 제공
7. **반응형 디자인**: 모바일 및 데스크톱 환경 모두 지원

## 구조

```
preview-player/
├── dist/                # 빌드된 파일
├── docs/                # 문서
├── src/                 # 소스 코드
│   ├── index.ts                 # 패키지 진입점
│   ├── types.ts                 # 타입 정의
│   ├── PreviewPlayer.tsx        # 메인 플레이어 컴포넌트
│   ├── PreviewPlayer.css        # 플레이어 스타일
│   ├── PlayerContext.tsx        # 플레이어 상태 관리 컨텍스트
│   ├── PlayerControls.tsx       # 플레이어 컨트롤 컴포넌트
│   └── PlayerControls.css       # 컨트롤 스타일
├── package.json         # 패키지 정보 및 의존성
└── tsconfig.json        # TypeScript 설정
```

## 주요 컴포넌트 및 인터페이스

### 1. PreviewPlayer

메인 비디오 플레이어 컴포넌트입니다.

```tsx
import { PreviewPlayer } from '@vcut/preview-player';

// 기본 사용법
<PreviewPlayer
  src="/path/to/video.mp4"
  controls={true}
  autoPlay={false}
  width="640px"
  height="360px"
/>

// 고급 사용법
<PreviewPlayer
  src="/path/to/video.mp4"
  controls={true}
  autoPlay={false}
  loop={true}
  muted={false}
  poster="/path/to/poster.jpg"
  startTime={10}
  endTime={30}
  width="100%"
  height="auto"
  onPlayStateChange={(isPlaying) => console.log(`재생 상태: ${isPlaying}`)}
  onTimeUpdate={(currentTime) => console.log(`현재 시간: ${currentTime}초`)}
  onLoadedData={() => console.log('비디오 로드 완료')}
  onEnded={() => console.log('비디오 재생 종료')}
  onError={(error) => console.error('오류 발생:', error)}
  className="custom-player"
  style={{ margin: '20px 0' }}
/>
```

### 2. PlayerContext

플레이어 상태 관리를 위한 React Context입니다.

```tsx
import { PlayerProvider, usePlayer } from '@vcut/preview-player';

// 컨텍스트 제공자
<PlayerProvider>
  <YourComponent />
</PlayerProvider>

// 컨텍스트 사용
function YourComponent() {
  const { state, dispatch, videoRef } = usePlayer();
  
  // 상태 접근
  console.log(`현재 시간: ${state.currentTime}초`);
  console.log(`재생 중: ${state.isPlaying}`);
  
  // 액션 디스패치
  const handleSeek = (time) => {
    dispatch({ type: 'SEEK', payload: time });
    videoRef.current.currentTime = time;
  };
  
  return (
    <div>
      <p>현재 시간: {state.currentTime}초</p>
      <button onClick={() => handleSeek(10)}>10초로 이동</button>
    </div>
  );
}
```

### 3. PlayerControls

비디오 플레이어 컨트롤 컴포넌트입니다. 일반적으로 PreviewPlayer 내부에서 사용되지만, 필요한 경우 독립적으로 사용할 수 있습니다.

```tsx
import { PlayerProvider } from '@vcut/preview-player';
import PlayerControls from '@vcut/preview-player/dist/PlayerControls';

<PlayerProvider>
  <video ref={videoRef} src="/path/to/video.mp4" />
  <PlayerControls 
    showControls={true}
    timeFormat="mm:ss"
    showVolumeControl={true}
    showFullscreenButton={true}
    showProgressBar={true}
  />
</PlayerProvider>
```

### 4. 주요 타입 정의

```typescript
// PreviewPlayer 컴포넌트 속성 타입
interface PreviewPlayerProps {
  src: string;              // 비디오 소스 URL
  autoPlay?: boolean;       // 자동 재생 여부
  controls?: boolean;       // 컨트롤 표시 여부
  loop?: boolean;           // 루프 재생 여부
  muted?: boolean;          // 음소거 여부
  poster?: string;          // 포스터 이미지 URL
  startTime?: number;       // 재생 시작 시간 (초)
  endTime?: number;         // 재생 종료 시간 (초)
  width?: number | string;  // 너비 (픽셀 또는 CSS 값)
  height?: number | string; // 높이 (픽셀 또는 CSS 값)
  onPlayStateChange?: (isPlaying: boolean) => void;  // 재생 상태 변경 이벤트 핸들러
  onTimeUpdate?: (currentTime: number) => void;      // 시간 변경 이벤트 핸들러
  onLoadedData?: () => void;                         // 비디오 로드 완료 이벤트 핸들러
  onEnded?: () => void;                              // 비디오 종료 이벤트 핸들러
  onError?: (error: Error) => void;                  // 에러 발생 이벤트 핸들러
  className?: string;                                // 추가 CSS 클래스
  style?: React.CSSProperties;                       // 추가 스타일
}

// 플레이어 상태 타입
interface PlayerState {
  isPlaying: boolean;      // 현재 재생 중인지 여부
  currentTime: number;     // 현재 시간 (초)
  duration: number;        // 비디오 총 길이 (초)
  volume: number;          // 볼륨 (0-1)
  isMuted: boolean;        // 음소거 여부
  isBuffering: boolean;    // 버퍼링 중인지 여부
  isLoaded: boolean;       // 비디오가 로드되었는지 여부
  isFullscreen: boolean;   // 전체 화면 모드인지 여부
}

// 플레이어 컨트롤 액션 타입
type PlayerAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SEEK'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_BUFFERING'; payload: boolean }
  | { type: 'SET_LOADED'; payload: boolean };
```

## 사용 예시

### 1. 기본 비디오 플레이어

```jsx
import React from 'react';
import { PreviewPlayer } from '@vcut/preview-player';

function VideoPlayer() {
  return (
    <div className="video-container">
      <h2>샘플 비디오</h2>
      <PreviewPlayer
        src="https://example.com/sample.mp4"
        controls={true}
        width="640px"
        height="360px"
      />
    </div>
  );
}
```

### 2. 시간 제한 비디오 플레이어

```jsx
import React from 'react';
import { PreviewPlayer } from '@vcut/preview-player';

function TimeLimitedPlayer() {
  return (
    <div className="video-container">
      <h2>10초~30초 구간 재생</h2>
      <PreviewPlayer
        src="https://example.com/sample.mp4"
        controls={true}
        startTime={10}
        endTime={30}
        width="640px"
        height="360px"
        onTimeUpdate={(currentTime) => console.log(`현재 시간: ${currentTime}초`)}
      />
    </div>
  );
}
```

### 3. 커스텀 컨트롤 구현

```jsx
import React from 'react';
import { PlayerProvider, usePlayer } from '@vcut/preview-player';

function CustomVideoPlayer() {
  return (
    <PlayerProvider>
      <VideoWithCustomControls />
    </PlayerProvider>
  );
}

function VideoWithCustomControls() {
  const { state, dispatch, videoRef } = usePlayer();
  
  const handlePlayPause = () => {
    if (state.isPlaying) {
      videoRef.current.pause();
      dispatch({ type: 'PAUSE' });
    } else {
      videoRef.current.play();
      dispatch({ type: 'PLAY' });
    }
  };
  
  const handleSeek = (time) => {
    videoRef.current.currentTime = time;
    dispatch({ type: 'SEEK', payload: time });
  };
  
  return (
    <div className="custom-player">
      <video
        ref={videoRef}
        src="https://example.com/sample.mp4"
        style={{ width: '100%', height: 'auto' }}
      />
      
      <div className="custom-controls">
        <button onClick={handlePlayPause}>
          {state.isPlaying ? '일시정지' : '재생'}
        </button>
        
        <div className="time-controls">
          <button onClick={() => handleSeek(0)}>처음으로</button>
          <button onClick={() => handleSeek(state.currentTime - 10)}>-10초</button>
          <span>{Math.floor(state.currentTime)}초 / {Math.floor(state.duration)}초</span>
          <button onClick={() => handleSeek(state.currentTime + 10)}>+10초</button>
        </div>
      </div>
    </div>
  );
}
```

## 스타일링

패키지는 기본 스타일을 제공하지만, 필요에 따라 CSS 클래스를 오버라이드하여 커스텀 스타일을 적용할 수 있습니다.

```css
/* 커스텀 스타일 예시 */
.preview-player-container {
  border: 2px solid #007bff;
  border-radius: 8px;
  overflow: hidden;
}

.player-controls {
  background-color: rgba(0, 0, 0, 0.8);
}

.progress-indicator {
  background-color: #ff5722;
}

.control-button {
  color: #ff5722;
}
```

## 의존성

- **React**: UI 컴포넌트 구현
- **React DOM**: DOM 조작
- **TypeScript**: 타입 안전성을 위한 JavaScript 확장

## 브라우저 호환성

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+
- iOS Safari 11+
- Android Chrome 60+

## 접근성

이 컴포넌트는 웹 접근성 지침(WCAG)을 준수하기 위해 다음과 같은 기능을 제공합니다:

1. 키보드 탐색 지원
2. ARIA 속성 사용
3. 고대비 모드 지원
4. 스크린 리더 호환성

## 성능 최적화

1. 불필요한 렌더링 방지를 위한 메모이제이션 사용
2. 이벤트 리스너 최적화
3. 비디오 로딩 및 렌더링 성능 최적화

## 향후 개선 사항

1. 더 많은 비디오 포맷 지원
2. 자막 기능 추가
3. 고급 비디오 효과 및 필터 지원
4. 플레이리스트 기능 추가
5. 더 많은 커스터마이징 옵션 제공
