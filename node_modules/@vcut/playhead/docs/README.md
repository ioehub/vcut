# vCut Playhead 모듈

Playhead 모듈은 비디오 편집 애플리케이션 vCut의 핵심 컴포넌트로, 타임라인에서 현재 재생 위치를 시각적으로 표현하고 제어하는 기능을 제공합니다.

## 목차

1. [모듈 목적](#모듈-목적)
2. [구성 요소](#구성-요소)
3. [구현된 기능](#구현된-기능)
4. [사용법](#사용법)
5. [API 참조](#api-참조)
6. [개발 가이드](#개발-가이드)
7. [향후 개발 계획](#향후-개발-계획)

## 모듈 목적

Playhead 모듈은 다음과 같은 주요 목적을 가지고 있습니다:

- 타임라인에서 현재 재생 위치를 시각적으로 표현
- 비디오 재생 제어(재생, 일시정지, 프레임 이동 등)
- 인/아웃 포인트 설정 및 관리
- 시간 눈금자(Time Ruler) 제공
- 직관적인 사용자 인터페이스로 편집 경험 향상

## 구성 요소

Playhead 모듈은 다음과 같은 주요 컴포넌트로 구성되어 있습니다:

1. **Playhead**: 타임라인에서 현재 재생 위치를 나타내는 세로 선 컴포넌트
2. **PlayheadControls**: 재생, 일시정지, 프레임 이동 등의 제어 기능을 제공하는 컨트롤 패널
3. **TimeRuler**: 타임라인 상단에 위치한 시간 눈금자로, 시간 표시 및 클릭으로 위치 이동 기능 제공
4. **usePlayhead**: Playhead 상태 관리 및 제어 로직을 제공하는 커스텀 훅

구조는 아래와 같은 계층으로 구성되어 있습니다:

```
src/
├── components/
│   ├── Playhead.tsx         # 재생 위치 표시 컴포넌트
│   ├── PlayheadControls.tsx # 재생 제어 컴포넌트
│   └── TimeRuler.tsx        # 시간 눈금자 컴포넌트
├── hooks/
│   └── usePlayhead.ts       # Playhead 상태 관리 커스텀 훅
├── pages/
│   └── TestPlayhead.tsx     # 테스트 페이지
└── types.ts                 # 타입 정의
```

## 구현된 기능

### 1. Playhead 핵심 기능

- **재생 위치 표시**: 타임라인에서 현재 재생 위치를 시각적으로 표시
- **드래그 인터랙션**: 마우스/터치로 Playhead를 드래그하여 시간 이동
- **시간 표시**: 현재 위치의 시간을 직관적으로 표시
- **애니메이션**: 재생 중 부드러운 Playhead 이동 애니메이션

### 2. 제어 기능

- **재생/일시정지**: 비디오 재생 및 일시정지 제어
- **프레임 이동**: 한 프레임 단위로 앞/뒤 이동
- **타임라인 이동**: 타임라인의 시작/끝으로 이동
- **재생 속도 조절**: 다양한 재생 속도 옵션 제공 (0.25x ~ 2x)

### 3. 인/아웃 포인트

- **인/아웃 포인트 설정**: 편집 범위 시작점과 끝점 설정
- **인/아웃 포인트 표시**: 설정된 범위를 시각적으로 표시
- **제한된 재생**: 설정된 인/아웃 포인트 범위 내에서만 재생

### 4. 시간 눈금자

- **시간 표시**: 타임라인의 시간을 눈금과 숫자로 표시
- **시간 이동**: 눈금자 클릭으로 해당 위치로 이동
- **확대/축소 대응**: 타임라인 스케일에 따라 눈금 간격 자동 조정

### 5. 단축키 지원

- **스페이스바**: 재생/일시정지
- **화살표 키**: 프레임 단위 앞/뒤 이동
- **Home/End**: 타임라인 시작/끝으로 이동
- **Ctrl+I/O**: 인/아웃 포인트 설정
- **Ctrl+X**: 인/아웃 포인트 제거

## 사용법

Playhead 모듈은 다음과 같이 사용할 수 있습니다:

### 기본 사용법

```tsx
import { Playhead, PlayheadControls, TimeRuler, usePlayhead } from '../src';

function MyTimeline() {
  const duration = 60; // 영상 총 길이 (초)
  const scale = 100;   // 시간 스케일 (1초 = 100px)
  
  // Playhead 상태 관리 훅 사용
  const playhead = usePlayhead({
    duration,
    initialTime: 0,
    initialPlaybackRate: 1.0,
    fps: 30
  });
  
  return (
    <div style={{ position: 'relative' }}>
      {/* 시간 눈금자 */}
      <TimeRuler
        duration={duration}
        scale={scale}
        currentTime={playhead.currentTime}
        onTimeChange={playhead.setCurrentTime}
      />
      
      {/* 타임라인 내용 */}
      <div style={{ position: 'relative', height: '300px' }}>
        {/* 여기에 트랙, 클립 등 타임라인 콘텐츠 */}
        
        {/* 플레이헤드 */}
        <Playhead
          currentTime={playhead.currentTime}
          duration={duration}
          scale={scale}
          isPlaying={playhead.isPlaying}
          playbackRate={playhead.playbackRate}
          onTimeChange={playhead.setCurrentTime}
          onPlayPause={playhead.setPlaying}
        />
      </div>
      
      {/* 재생 컨트롤 */}
      <PlayheadControls
        currentTime={playhead.currentTime}
        duration={duration}
        isPlaying={playhead.isPlaying}
        playbackRate={playhead.playbackRate}
        onTimeChange={playhead.setCurrentTime}
        onPlayPause={playhead.setPlaying}
        onPlaybackRateChange={playhead.setPlaybackRate}
        onFrameStep={playhead.stepFrame}
        onJumpToStart={playhead.jumpToStart}
        onJumpToEnd={playhead.jumpToEnd}
      />
    </div>
  );
}
```

### 인/아웃 포인트 사용 예제

```tsx
// 인/아웃 포인트 설정
const handleSetInPoint = () => {
  playhead.setInPoint(playhead.currentTime);
};

const handleSetOutPoint = () => {
  playhead.setOutPoint(playhead.currentTime);
};

// 플레이헤드에 인/아웃 포인트 전달
<Playhead
  currentTime={playhead.currentTime}
  duration={duration}
  scale={scale}
  isPlaying={playhead.isPlaying}
  playbackRate={playhead.playbackRate}
  inPoint={playhead.inPoint}
  outPoint={playhead.outPoint}
  onTimeChange={playhead.setCurrentTime}
  onPlayPause={playhead.setPlaying}
/>
```

## API 참조

### Playhead 컴포넌트

| 속성 | 타입 | 설명 |
|------|------|------|
| currentTime | number | 현재 재생 시간 (초) |
| duration | number | 영상 총 길이 (초) |
| scale | number | 시간 스케일 (픽셀/초) |
| isPlaying | boolean | 재생 상태 |
| isLooping | boolean | 루프 재생 여부 |
| playbackRate | number | 재생 속도 |
| inPoint | number \| undefined | 인 포인트 시간 |
| outPoint | number \| undefined | 아웃 포인트 시간 |
| timelineOffset | number | 타임라인 좌측 오프셋 (트랙 레이블 너비) |
| onTimeChange | (time: number) => void | 시간 변경 이벤트 핸들러 |
| onPlayPause | (isPlaying: boolean) => void | 재생/일시정지 이벤트 핸들러 |
| onDragStart | () => void | 드래그 시작 이벤트 핸들러 |
| onDragEnd | () => void | 드래그 종료 이벤트 핸들러 |

### PlayheadControls 컴포넌트

| 속성 | 타입 | 설명 |
|------|------|------|
| currentTime | number | 현재 재생 시간 (초) |
| duration | number | 영상 총 길이 (초) |
| isPlaying | boolean | 재생 상태 |
| playbackRate | number | 재생 속도 |
| onTimeChange | (time: number) => void | 시간 변경 이벤트 핸들러 |
| onPlayPause | (isPlaying: boolean) => void | 재생/일시정지 이벤트 핸들러 |
| onPlaybackRateChange | (rate: number) => void | 재생 속도 변경 이벤트 핸들러 |
| onFrameStep | (direction: 'forward' \| 'backward') => void | 프레임 이동 이벤트 핸들러 |
| onJumpToStart | () => void | 시작 위치로 이동 이벤트 핸들러 |
| onJumpToEnd | () => void | 끝 위치로 이동 이벤트 핸들러 |

### TimeRuler 컴포넌트

| 속성 | 타입 | 설명 |
|------|------|------|
| duration | number | 영상 총 길이 (초) |
| scale | number | 시간 스케일 (픽셀/초) |
| currentTime | number | 현재 재생 시간 (초) |
| timelineOffset | number | 타임라인 좌측 오프셋 (트랙 레이블 너비) |
| onTimeChange | (time: number) => void | 시간 변경 이벤트 핸들러 |
| timeInterval | number | 시간 눈금 간격 (초) |

### usePlayhead 훅

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| duration | number | 영상 총 길이 (초) |
| initialTime | number | 초기 재생 시간 |
| initialPlaybackRate | number | 초기 재생 속도 |
| initialInPoint | number \| undefined | 초기 인 포인트 |
| initialOutPoint | number \| undefined | 초기 아웃 포인트 |
| onTimeUpdate | (time: number) => void | 시간 업데이트 콜백 |
| fps | number | 초당 프레임 수 |

#### 반환값

| 속성 | 타입 | 설명 |
|------|------|------|
| currentTime | number | 현재 재생 시간 (초) |
| isPlaying | boolean | 재생 상태 |
| playbackRate | number | 재생 속도 |
| inPoint | number \| undefined | 인 포인트 시간 |
| outPoint | number \| undefined | 아웃 포인트 시간 |
| fps | number | 초당 프레임 수 |
| frameTime | number | 1프레임 시간 (초) |
| setCurrentTime | (time: number) => void | 현재 시간 설정 함수 |
| setPlaying | (isPlaying: boolean) => void | 재생 상태 설정 함수 |
| setPlaybackRate | (rate: number) => void | 재생 속도 설정 함수 |
| stepFrame | (direction: 'forward' \| 'backward') => void | 프레임 이동 함수 |
| jumpToStart | () => void | 시작 위치로 이동 함수 |
| jumpToEnd | () => void | 끝 위치로 이동 함수 |
| setInPoint | (time?: number) => void | 인 포인트 설정 함수 |
| setOutPoint | (time?: number) => void | 아웃 포인트 설정 함수 |

## 개발 가이드

Playhead 모듈을 개발하거나 확장할 때 다음 사항을 참고하세요:

### 프로젝트 설정

1. 필요한 의존성을 설치합니다:
   ```bash
   cd packages/playhead
   npm install
   ```

2. 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 빌드:
   ```bash
   npm run build
   ```

### 컴포넌트 스타일링

Playhead 모듈에서는 스타일을 다음과 같은 방식으로 적용합니다:

1. **인라인 스타일**: 컴포넌트 자체에서 인라인으로 스타일을 정의
2. **CSS 변수**: `:root` 선택자에 CSS 변수를 정의하여 일관된 스타일 적용
3. **반응형 디자인**: 미디어 쿼리를 사용하여 다양한 화면 크기 지원

### 성능 최적화

1. **requestAnimationFrame**: 부드러운 애니메이션을 위해 `requestAnimationFrame` 사용
2. **메모이제이션**: 불필요한 렌더링 방지를 위해 `useCallback` 및 `useMemo` 활용
3. **이벤트 디바운싱**: 빈번한 이벤트 처리 시 성능 최적화

## 향후 개발 계획

Playhead 모듈의 향후 개발 계획은 다음과 같습니다:

1. **마커 기능 추가**: 타임라인에 북마크 및 메모 추가 기능
2. **키프레임 지원**: 애니메이션 키프레임 표시 및 편집
3. **다중 트랙 확장**: 여러 트랙의 재생 상태 동기화
4. **실시간 미리보기 연동**: 비디오 미리보기 화면과 연동
5. **애니메이션 효과 향상**: 부드러운 전환 및 시각적 효과
6. **다국어 지원**: 다양한 언어로 UI 제공
7. **테마 지원**: 라이트/다크 모드 및 사용자 정의 테마
8. **접근성 향상**: 웹 접근성 표준 준수 및 키보드 네비게이션 개선

---

© 2025 vCut. 모든 권리 보유.
