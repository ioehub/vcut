# vCut 타임라인 모듈 문서

## 1. 개요

vCut 타임라인 모듈은 Electron 기반 영상 편집기의 핵심 컴포넌트로, React를 사용하여 구현되었습니다. 이 모듈은 비디오, 오디오 및 자막 트랙을 시각적으로 표현하고 관리하기 위한 인터페이스를 제공합니다.

### 주요 목적
- 다양한 미디어 클립을 시간 기반으로 시각화
- 클립 재배치, 크기 조절 및 관리를 위한 인터랙티브 인터페이스 제공
- 멀티트랙 편집 환경 구성
- 반응형 디자인으로 다양한 화면 크기 지원

## 2. 컴포넌트 구조

타임라인 모듈은 다음과 같은 주요 컴포넌트로 구성됩니다:

### 핵심 컴포넌트
1. **Timeline**: 전체 타임라인 컨테이너로, 시간 눈금과 트랙들을 관리합니다.
2. **Track**: 개별 트랙을 표현하는 컴포넌트로, 여러 클립을 포함할 수 있습니다.
3. **Clip**: 비디오, 오디오, 자막 등의 미디어 클립을 표현하는 컴포넌트입니다.

### 테스트 및 데모 컴포넌트
- **TestTimeline**: 타임라인 기능을 테스트하기 위한 페이지 컴포넌트

### 타입 정의
```typescript
// 클립 타입 정의
interface Clip {
  id: string;
  type: string;  // 'video', 'audio', 'subtitle' 등
  startTime: number;
  duration: number;
  source: string;
  name: string;
}

// 트랙 타입 정의
interface Track {
  id: string;
  name: string;
  type: string;
  clips: Clip[];
}

// 타임라인 속성 타입 정의
interface TimelineProps {
  tracks: Track[];
  scale: number;
  currentTime: number;
  onClipMove: (clipId: string, trackId: string, newStartTime: number) => void;
  onTrackAdd?: () => void;
  onTrackRemove?: (trackId: string) => void;
}
```

## 3. 구현된 기능

### 기본 기능
- **트랙 관리**: 트랙 추가/삭제 기능
- **클립 드래그**: 클립을 드래그하여 시간 위치 변경
- **시간 스케일링**: 타임라인 확대/축소 기능
- **시간 표시**: 타임라인 상단에 시간 눈금 표시

### 인터랙티브 기능
- **클립 드래그 앤 드롭**: 마우스 및 터치 이벤트를 통한 클립 이동
- **시각적 피드백**: 드래그 중 시각적 피드백 제공
- **트랙 컨트롤**: 트랙 추가 및 삭제 UI

### UI 개선 사항
- **한글 인코딩 지원**: UTF-8 인코딩을 통한 한글 문자 지원
- **반응형 디자인**: 다양한 화면 크기에 적응하는 레이아웃
- **색상 구분**: 클립 타입별 색상 구분으로 시각적 명확성 제공

## 4. UI 문제 해결 및 개선

### 한글 인코딩 문제 해결
HTML 파일에 UTF-8 meta 태그를 추가하여 한글 깨짐 문제를 해결했습니다:
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vCut Timeline Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 반응형 디자인 구현
화면 크기 변화에 대응하는 반응형 디자인을 구현했습니다:

1. **브라우저 리사이즈 감지**:
```typescript
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

2. **미디어 쿼리를 활용한 CSS**:
```css
@media (max-width: 768px) {
  .timeline-container {
    min-height: 250px;
  }
  
  .test-timeline h1 {
    font-size: 1.5rem;
  }
}
```

3. **동적 컨테이너 크기 조정**:
```typescript
useEffect(() => {
  if (containerRef.current) {
    containerRef.current.style.width = `${Math.max(windowWidth - 40, 320)}px`;
  }
}, [windowWidth]);
```

### 모바일 지원 개선
터치 이벤트를 지원하여 모바일 디바이스에서도 클립을 조작할 수 있도록 했습니다:
```typescript
// 터치 이벤트 처리
const handleTouchStart = (e: React.TouchEvent) => {
  e.preventDefault();
  setIsDragging(true);
  setStartDragX(e.touches[0].clientX);
  setStartPosition(clip.startTime);
  
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", handleTouchEnd);
};
```

## 5. 사용 방법

### 기본 사용법
```tsx
import { Timeline } from 'timeline';
import { Track, Clip } from 'timeline/types';

// 트랙 데이터 정의
const tracks: Track[] = [
  {
    id: "1",
    name: "비디오 트랙",
    type: "video",
    clips: [
      {
        id: "v1",
        type: "video",
        startTime: 0,
        duration: 5,
        source: "/videos/sample.mp4",
        name: "인트로 영상"
      }
    ]
  }
];

// 타임라인 컴포넌트 사용
function MyTimeline() {
  const [scale, setScale] = useState(100);
  
  const handleClipMove = (clipId, trackId, newStartTime) => {
    // 클립 이동 처리 로직
  };
  
  return (
    <Timeline
      tracks={tracks}
      scale={scale}
      currentTime={0}
      onClipMove={handleClipMove}
    />
  );
}
```

### 확대/축소 기능 사용
```tsx
function ZoomableTimeline() {
  const [scale, setScale] = useState(100);
  
  const handleZoomIn = () => {
    setScale(prevScale => prevScale * 1.2);
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => prevScale / 1.2);
  };
  
  return (
    <div>
      <div className="controls">
        <button onClick={handleZoomIn}>확대 (+)</button>
        <button onClick={handleZoomOut}>축소 (-)</button>
      </div>
      
      <Timeline
        tracks={tracks}
        scale={scale}
        currentTime={0}
        onClipMove={handleClipMove}
      />
    </div>
  );
}
```

## 6. 스타일링

타임라인 모듈은 CSS를 사용하여 스타일링되며, 주요 스타일 파일은 다음과 같습니다:

1. **index.css**: 기본 스타일 정의
2. **responsive.css**: 반응형 디자인을 위한 스타일 정의

주요 스타일 클래스:
- `.timeline-container`: 전체 타임라인 컨테이너
- `.timeline-track`: 개별 트랙
- `.timeline-clip`: 미디어 클립
- `.controls`: 타임라인 컨트롤 버튼 영역

## 7. 향후 개발 계획

### 추가 예정 기능
- **Playhead 구현**: 재생 위치를 표시하는 Playhead 기능
- **클립 트리밍**: 클립 시작/끝 지점 조절 기능
- **키프레임 지원**: 키프레임 기반 애니메이션 지원
- **부드러운 스크롤**: 타임라인 스크롤 성능 최적화
- **다양한 트랙 유형**: 이펙트, 오버레이 등 추가 트랙 유형 지원

## 8. 기술 스택

- **React**: UI 컴포넌트 구현
- **TypeScript**: 타입 안전성 확보
- **CSS**: 스타일링 및 반응형 디자인
- **Electron**: 데스크톱 애플리케이션 프레임워크

## 9. 참고 자료

- [React 공식 문서](https://reactjs.org/docs/getting-started.html)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [Electron 공식 문서](https://www.electronjs.org/docs)
