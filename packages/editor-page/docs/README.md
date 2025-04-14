# Editor Page

## 개요

`editor-page` 패키지는 vCut 비디오 편집기의 핵심 편집 인터페이스를 제공하는 React 컴포넌트입니다. 이 패키지는 비디오 편집을 위한 다양한 도구와 기능을 통합하여 사용자 친화적인 인터페이스를 제공합니다.

## 기능

이 패키지는 다음과 같은 주요 기능을 제공합니다:

1. **비디오 미리보기**: 편집 중인 비디오의 실시간 미리보기
2. **타임라인 편집**: 비디오 클립의 순서, 길이, 트랜지션 편집
3. **효과 적용**: 비디오 및 오디오 효과 적용
4. **텍스트 및 오버레이**: 비디오에 텍스트, 이미지, 그래픽 추가
5. **오디오 편집**: 오디오 트랙 편집 및 믹싱
6. **내보내기 옵션**: 다양한 형식과 품질로 비디오 내보내기
7. **프로젝트 관리**: 편집 프로젝트 저장, 불러오기, 관리

## 구조

```
editor-page/
├── dist/                # 빌드된 파일
├── docs/                # 문서
├── src/                 # 소스 코드
│   ├── index.ts                 # 패키지 진입점
│   ├── types.ts                 # 타입 정의
│   ├── EditorPage.tsx           # 메인 에디터 페이지 컴포넌트
│   ├── EditorPage.css           # 에디터 페이지 스타일
│   ├── EditorPageContext.tsx    # 에디터 상태 관리 컨텍스트
│   ├── components/              # 하위 컴포넌트
│   │   ├── Toolbar.tsx          # 도구 모음 컴포넌트
│   │   ├── Timeline.tsx         # 타임라인 컴포넌트
│   │   ├── PreviewPane.tsx      # 미리보기 패널 컴포넌트
│   │   ├── EffectsPanel.tsx     # 효과 패널 컴포넌트
│   │   └── ExportDialog.tsx     # 내보내기 대화상자 컴포넌트
│   ├── hooks/                   # 커스텀 훅
│   │   ├── useVideoEditor.ts    # 비디오 편집 훅
│   │   ├── useTimeline.ts       # 타임라인 관리 훅
│   │   └── useProjectState.ts   # 프로젝트 상태 관리 훅
│   └── utils/                   # 유틸리티 함수
│       ├── formatUtils.ts       # 포맷 관련 유틸리티
│       └── editorUtils.ts       # 에디터 관련 유틸리티
├── package.json         # 패키지 정보 및 의존성
└── tsconfig.json        # TypeScript 설정
```

## 주요 컴포넌트 및 인터페이스

### 1. EditorPage

메인 에디터 페이지 컴포넌트입니다.

```tsx
import { EditorPage } from '@vcut/editor-page';

// 기본 사용법
<EditorPage
  projectId="project-123"
  initialMedia={[
    { id: 'video-1', type: 'video', src: '/path/to/video.mp4' },
    { id: 'audio-1', type: 'audio', src: '/path/to/audio.mp3' }
  ]}
  onSave={(projectData) => saveToServer(projectData)}
/>

// 고급 사용법
<EditorPage
  projectId="project-123"
  initialMedia={mediaFiles}
  initialTimeline={timelineData}
  initialEffects={effectsData}
  theme="dark"
  autoSave={true}
  saveInterval={60000} // 60초마다 자동 저장
  onSave={handleSave}
  onExport={handleExport}
  onError={handleError}
  plugins={customPlugins}
  renderCustomToolbar={CustomToolbarComponent}
/>
```

### 2. EditorPageContext

에디터 상태 관리를 위한 React Context입니다.

```tsx
import { EditorProvider, useEditor } from '@vcut/editor-page';

// 컨텍스트 제공자
<EditorProvider
  initialState={initialEditorState}
  ffmpegService={ffmpegServiceInstance}
>
  <YourComponent />
</EditorProvider>

// 컨텍스트 사용
function YourComponent() {
  const {
    state,
    dispatch,
    currentProject,
    timeline,
    selectedClip,
    previewState,
    addMediaToTimeline,
    removeClipFromTimeline,
    splitClipAtTime,
    applyEffectToClip,
    exportProject
  } = useEditor();
  
  // 에디터 기능 사용
  const handleAddMedia = (file) => {
    addMediaToTimeline(file);
  };
  
  const handleSplitClip = () => {
    if (selectedClip && previewState.currentTime) {
      splitClipAtTime(selectedClip.id, previewState.currentTime);
    }
  };
  
  return (
    <div>
      <button onClick={handleAddMedia}>미디어 추가</button>
      <button onClick={handleSplitClip}>클립 분할</button>
    </div>
  );
}
```

### 3. 주요 타입 정의

```typescript
// 프로젝트 타입
interface Project {
  id: string;                // 프로젝트 ID
  name: string;              // 프로젝트 이름
  createdAt: string;         // 생성 일시
  updatedAt: string;         // 수정 일시
  duration: number;          // 총 길이 (초)
  resolution: {              // 해상도
    width: number;           // 너비 (픽셀)
    height: number;          // 높이 (픽셀)
  };
  frameRate: number;         // 프레임 레이트 (fps)
  mediaFiles: MediaFile[];   // 미디어 파일 목록
  timeline: Timeline;        // 타임라인 데이터
  effects: Effect[];         // 효과 목록
}

// 미디어 파일 타입
interface MediaFile {
  id: string;                // 미디어 ID
  type: 'video' | 'audio' | 'image';  // 미디어 타입
  src: string;               // 소스 경로
  name: string;              // 파일 이름
  duration?: number;         // 길이 (초, 비디오/오디오만)
  width?: number;            // 너비 (픽셀, 비디오/이미지만)
  height?: number;           // 높이 (픽셀, 비디오/이미지만)
  thumbnail?: string;        // 썸네일 URL
}

// 타임라인 타입
interface Timeline {
  id: string;                // 타임라인 ID
  tracks: Track[];           // 트랙 목록
  duration: number;          // 총 길이 (초)
}

// 트랙 타입
interface Track {
  id: string;                // 트랙 ID
  type: 'video' | 'audio' | 'text' | 'effect';  // 트랙 타입
  clips: Clip[];             // 클립 목록
  name: string;              // 트랙 이름
  isLocked: boolean;         // 잠금 여부
  isVisible: boolean;        // 표시 여부
}

// 클립 타입
interface Clip {
  id: string;                // 클립 ID
  mediaId?: string;          // 연결된 미디어 ID
  startTime: number;         // 시작 시간 (초)
  endTime: number;           // 종료 시간 (초)
  inPoint: number;           // 미디어 내 시작 지점 (초)
  outPoint: number;          // 미디어 내 종료 지점 (초)
  speed: number;             // 재생 속도 (1.0 = 정상)
  volume: number;            // 볼륨 (0-1)
  effects: Effect[];         // 적용된 효과 목록
  transitions: Transition[];  // 트랜지션 목록
}

// 효과 타입
interface Effect {
  id: string;                // 효과 ID
  type: string;              // 효과 타입
  name: string;              // 효과 이름
  params: Record<string, any>;  // 효과 매개변수
  startTime?: number;        // 시작 시간 (초)
  endTime?: number;          // 종료 시간 (초)
}

// 에디터 상태 타입
interface EditorState {
  currentProject: Project | null;  // 현재 프로젝트
  selectedClipId: string | null;   // 선택된 클립 ID
  selectedTrackId: string | null;  // 선택된 트랙 ID
  selectedEffectId: string | null; // 선택된 효과 ID
  previewState: {                  // 미리보기 상태
    isPlaying: boolean;            // 재생 중인지 여부
    currentTime: number;           // 현재 시간 (초)
    isFullscreen: boolean;         // 전체 화면 모드인지 여부
    volume: number;                // 볼륨 (0-1)
    isMuted: boolean;              // 음소거 여부
  };
  zoom: number;                    // 타임라인 확대/축소 레벨
  history: {                       // 편집 히스토리
    past: EditorAction[];          // 과거 액션
    future: EditorAction[];        // 미래 액션
  };
  isExporting: boolean;            // 내보내기 중인지 여부
  isSaving: boolean;               // 저장 중인지 여부
  errors: Error[];                 // 오류 목록
}
```

## 사용 예시

### 1. 기본 에디터 페이지 구현

```jsx
import React, { useState, useEffect } from 'react';
import { EditorPage } from '@vcut/editor-page';
import { FFmpegServiceExtended } from '@vcut/ffmpeg-service';

function VideoEditorApp() {
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 프로젝트 데이터 로드
  useEffect(() => {
    async function loadProject() {
      try {
        const response = await fetch('/api/projects/123');
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error('프로젝트 로드 오류:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProject();
  }, []);
  
  // 프로젝트 저장 핸들러
  const handleSave = async (data) => {
    try {
      await fetch('/api/projects/123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log('프로젝트 저장 완료');
    } catch (error) {
      console.error('프로젝트 저장 오류:', error);
    }
  };
  
  // 프로젝트 내보내기 핸들러
  const handleExport = async (options) => {
    console.log('내보내기 옵션:', options);
    // 내보내기 로직 구현
  };
  
  if (isLoading) {
    return <div>프로젝트 로딩 중...</div>;
  }
  
  return (
    <div className="editor-container">
      <EditorPage
        projectId="123"
        initialMedia={projectData.mediaFiles}
        initialTimeline={projectData.timeline}
        initialEffects={projectData.effects}
        onSave={handleSave}
        onExport={handleExport}
        autoSave={true}
        saveInterval={30000} // 30초마다 자동 저장
      />
    </div>
  );
}
```

### 2. 커스텀 도구 모음 구현

```jsx
import React from 'react';
import { EditorPage, EditorProvider, useEditor } from '@vcut/editor-page';

function CustomToolbar() {
  const { 
    addMediaToTimeline, 
    splitClipAtTime, 
    removeSelectedClip,
    undoLastAction,
    redoAction,
    previewState,
    togglePlay
  } = useEditor();
  
  return (
    <div className="custom-toolbar">
      <button onClick={() => document.getElementById('media-input').click()}>
        미디어 추가
      </button>
      <input
        id="media-input"
        type="file"
        accept="video/*,audio/*,image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            addMediaToTimeline(e.target.files[0]);
          }
        }}
      />
      
      <button onClick={splitClipAtTime}>클립 분할</button>
      <button onClick={removeSelectedClip}>클립 삭제</button>
      <button onClick={undoLastAction}>실행 취소</button>
      <button onClick={redoAction}>다시 실행</button>
      <button onClick={togglePlay}>
        {previewState.isPlaying ? '일시정지' : '재생'}
      </button>
    </div>
  );
}

function VideoEditorWithCustomToolbar() {
  return (
    <EditorProvider>
      <div className="editor-with-custom-toolbar">
        <CustomToolbar />
        <EditorPage
          projectId="123"
          renderCustomToolbar={() => null} // 기본 도구 모음 숨기기
        />
      </div>
    </EditorProvider>
  );
}
```

### 3. 플러그인 시스템 활용

```jsx
import React from 'react';
import { EditorPage } from '@vcut/editor-page';

// 커스텀 효과 플러그인
const customEffectsPlugin = {
  id: 'custom-effects',
  name: 'Custom Effects',
  effects: [
    {
      id: 'sepia',
      name: 'Sepia',
      description: '세피아 톤 효과',
      type: 'video',
      thumbnail: '/effects/sepia.jpg',
      params: [
        {
          id: 'intensity',
          name: '강도',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.1,
          default: 0.5
        }
      ],
      apply: (clip, params) => {
        // 효과 적용 로직
        return {
          ...clip,
          effects: [
            ...clip.effects,
            {
              id: 'sepia-' + Date.now(),
              type: 'sepia',
              params: {
                intensity: params.intensity || 0.5
              }
            }
          ]
        };
      }
    }
  ]
};

// 커스텀 내보내기 플러그인
const customExportPlugin = {
  id: 'custom-export',
  name: 'Custom Export',
  exportFormats: [
    {
      id: 'gif',
      name: 'GIF',
      description: 'GIF 애니메이션',
      extension: '.gif',
      options: [
        {
          id: 'quality',
          name: '품질',
          type: 'select',
          options: [
            { value: 'low', label: '낮음' },
            { value: 'medium', label: '중간' },
            { value: 'high', label: '높음' }
          ],
          default: 'medium'
        },
        {
          id: 'fps',
          name: '프레임 레이트',
          type: 'number',
          min: 10,
          max: 30,
          step: 1,
          default: 15
        }
      ],
      process: (project, options) => {
        // GIF 내보내기 로직
        console.log('GIF 내보내기:', project, options);
      }
    }
  ]
};

function VideoEditorWithPlugins() {
  return (
    <EditorPage
      projectId="123"
      plugins={[customEffectsPlugin, customExportPlugin]}
    />
  );
}
```

## 스타일링

패키지는 기본 스타일을 제공하지만, 필요에 따라 CSS 클래스를 오버라이드하여 커스텀 스타일을 적용할 수 있습니다.

```css
/* 커스텀 스타일 예시 */
.editor-page-container {
  background-color: #1e1e1e;
  color: #ffffff;
}

.timeline-track {
  background-color: #2d2d2d;
  border-bottom: 1px solid #3e3e3e;
}

.timeline-clip {
  background-color: #4285f4;
  border-radius: 4px;
}

.timeline-clip.selected {
  border: 2px solid #ffffff;
}

.toolbar-button {
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
}

.toolbar-button:hover {
  background-color: #444444;
}
```

## 통합

이 패키지는 다른 vCut 패키지와 함께 사용하여 완전한 비디오 편집 솔루션을 구축할 수 있습니다:

1. **ffmpeg-service**: 비디오 처리 및 인코딩
2. **preview-player**: 비디오 미리보기 및 재생
3. **playhead**: 타임라인 플레이헤드 컨트롤
4. **audio-editor**: 오디오 편집 기능

```jsx
import { EditorPage, EditorProvider } from '@vcut/editor-page';
import { FFmpegServiceExtended } from '@vcut/ffmpeg-service';
import { PreviewPlayer } from '@vcut/preview-player';
import { Playhead } from '@vcut/playhead';
import { AudioEditor } from '@vcut/audio-editor';

function IntegratedVideoEditor() {
  const ffmpegService = new FFmpegServiceExtended();
  
  return (
    <EditorProvider ffmpegService={ffmpegService}>
      <EditorPage
        projectId="123"
        renderCustomPreview={(previewProps) => (
          <PreviewPlayer {...previewProps} />
        )}
        renderCustomTimeline={(timelineProps) => (
          <div className="custom-timeline-container">
            <Playhead {...timelineProps} />
          </div>
        )}
        renderCustomAudioEditor={(audioProps) => (
          <AudioEditor {...audioProps} />
        )}
      />
    </EditorProvider>
  );
}
```

## 의존성

- **React**: UI 컴포넌트 구현
- **React DOM**: DOM 조작
- **TypeScript**: 타입 안전성을 위한 JavaScript 확장
- **@vcut/ffmpeg-service**: 비디오 처리 기능 (선택적)
- **@vcut/preview-player**: 비디오 미리보기 (선택적)
- **@vcut/playhead**: 타임라인 플레이헤드 (선택적)
- **@vcut/audio-editor**: 오디오 편집 (선택적)

## 성능 최적화

1. 가상 스크롤을 통한 타임라인 렌더링 최적화
2. 메모이제이션을 통한 불필요한 렌더링 방지
3. 웹 워커를 활용한 백그라운드 처리
4. 지연 로딩을 통한 초기 로딩 시간 단축

## 접근성

이 컴포넌트는 웹 접근성 지침(WCAG)을 준수하기 위해 다음과 같은 기능을 제공합니다:

1. 키보드 단축키 지원
2. 스크린 리더 호환성
3. 고대비 모드 지원
4. 확대/축소 기능

## 향후 개선 사항

1. 협업 편집 기능 추가
2. AI 기반 자동 편집 기능 통합
3. 더 많은 효과 및 트랜지션 추가
4. 모바일 환경 최적화
5. 성능 개선 및 메모리 사용량 최적화
