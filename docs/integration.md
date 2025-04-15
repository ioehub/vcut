# vCut 패키지 통합 가이드

이 문서는 vCut 비디오 편집기의 다양한 패키지들을 통합하는 방법에 대한 포괄적인 가이드를 제공합니다. 이 가이드는 개발자와 인공지능이 vCut 프로젝트의 구조와 패키지 간 상호작용을 이해하는 데 도움이 될 것입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [패키지 구조](#패키지-구조)
- [패키지 간 의존성](#패키지-간-의존성)
- [통합 아키텍처](#통합-아키텍처)
- [데이터 흐름](#데이터-흐름)
- [통합 예제](#통합-예제)
- [확장 가이드](#확장-가이드)

## 프로젝트 개요

vCut은 모노레포 구조를 가진 비디오 편집 애플리케이션입니다. 이 프로젝트는 다양한 기능을 담당하는 여러 패키지로 구성되어 있으며, 이들이 함께 작동하여 완전한 비디오 편집 경험을 제공합니다.

### 핵심 기능

- 비디오 및 오디오 편집
- 타임라인 기반 편집 인터페이스
- 미디어 재생 및 제어
- 효과 및 전환 적용
- 비디오 렌더링 및 내보내기

## 패키지 구조

vCut 프로젝트는 다음과 같은 주요 패키지로 구성되어 있습니다:

### 핵심 서비스 패키지

- **ffmpeg-service**: FFmpeg를 사용한 비디오/오디오 처리 기능 제공
- **mcp-service**: 미디어 제어 프로토콜 서비스 (재생, 일시 정지, 시크 등)
- **media**: 미디어 파일 관리 및 메타데이터 처리

### UI 컴포넌트 패키지

- **editor-page**: 비디오 편집 인터페이스 제공
- **playhead**: 비디오 타임라인 컨트롤 제공
- **audio-editor**: 오디오 편집 기능 제공
- **preview-player**: 비디오 미리보기 및 재생 기능 제공
- **timeline**: 타임라인 인터페이스 및 기능 제공
- **toolbar**: 편집 도구 모음 제공
- **effects**: 비디오 및 오디오 효과 제공

### 기타 패키지

- **rendering**: 비디오 렌더링 및 내보내기 기능 제공

## 패키지 간 의존성

vCut 패키지들은 다음과 같은 의존성 관계를 가지고 있습니다:

```
editor-page
  ├── preview-player
  │     ├── mcp-service
  │     └── playhead
  ├── timeline
  │     └── playhead
  ├── toolbar
  ├── audio-editor
  │     └── mcp-service
  └── effects
        └── ffmpeg-service

rendering
  ├── ffmpeg-service
  └── media
```

### 주요 의존성 설명

1. **editor-page**는 전체 편집 인터페이스를 제공하며, 다른 UI 컴포넌트 패키지들을 통합합니다.
2. **preview-player**는 **mcp-service**를 사용하여 미디어 재생을 제어하고, **playhead**를 사용하여 재생 위치를 표시합니다.
3. **timeline**은 **playhead**를 사용하여 타임라인 상의 현재 위치를 관리합니다.
4. **audio-editor**는 **mcp-service**를 사용하여 오디오 재생을 제어합니다.
5. **effects**는 **ffmpeg-service**를 사용하여 비디오 및 오디오 효과를 적용합니다.
6. **rendering**은 **ffmpeg-service**를 사용하여 최종 비디오를 렌더링하고, **media** 패키지를 사용하여 미디어 파일을 관리합니다.

## 통합 아키텍처

vCut의 통합 아키텍처는 다음과 같은 계층 구조를 가집니다:

1. **서비스 계층**: 기본 기능을 제공하는 서비스 패키지들 (ffmpeg-service, mcp-service, media)
2. **컴포넌트 계층**: UI 컴포넌트 패키지들 (playhead, timeline, toolbar, effects 등)
3. **통합 계층**: 컴포넌트들을 통합하는 패키지들 (editor-page)
4. **애플리케이션 계층**: 최종 사용자 애플리케이션 (desktop)

### 통합 다이어그램

```
+---------------------+
|      Desktop App    |
+---------------------+
          |
+---------------------+
|     Editor Page     |
+---------------------+
    |       |       |
+-------+ +-------+ +-------+
|Timeline| |Preview| |Toolbar|
+-------+ |Player | +-------+
    |     +-------+     |
+-------+     |     +-------+
|Playhead|    |     |Effects|
+-------+     |     +-------+
              |         |
        +------------+  |
        |MCP Service |  |
        +------------+  |
                        |
                +---------------+
                |FFmpeg Service |
                +---------------+
```

## 데이터 흐름

vCut 애플리케이션에서의 데이터 흐름은 다음과 같습니다:

### 프로젝트 데이터 흐름

1. 사용자가 미디어 파일을 가져오면 **media** 패키지가 이를 처리하고 메타데이터를 추출합니다.
2. 미디어 파일은 **timeline**에 추가되고, **preview-player**를 통해 미리볼 수 있습니다.
3. 사용자가 편집 작업을 수행하면 해당 작업은 프로젝트 상태에 저장됩니다.
4. 편집 작업은 **ffmpeg-service**를 통해 미리보기에 실시간으로 적용될 수 있습니다.
5. 최종 비디오는 **rendering** 패키지를 통해 렌더링되어 내보내집니다.

### 사용자 상호작용 흐름

1. 사용자는 **toolbar**를 통해 편집 도구를 선택합니다.
2. 선택한 도구에 따라 **editor-page**는 적절한 편집 인터페이스를 표시합니다.
3. 사용자가 타임라인에서 클립을 조작하면 **timeline**과 **playhead**가 이를 처리합니다.
4. 재생 제어는 **preview-player**를 통해 **mcp-service**로 전달됩니다.
5. 효과 적용은 **effects** 패키지를 통해 **ffmpeg-service**로 전달됩니다.

## 통합 예제

다음은 vCut 패키지들을 통합하는 예제 코드입니다:

### 기본 애플리케이션 통합

```tsx
// apps/desktop/src/App.tsx
import React from 'react';
import { EditorPage, EditorPageProvider } from '@vcut/editor-page';
import { MediaProvider } from '@vcut/media';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { FFmpegService } from '@vcut/ffmpeg-service';

// 서비스 인스턴스 생성
const mcpFactory = new MCPServiceFactory();
const ffmpegService = new FFmpegService();

const App: React.FC = () => {
  return (
    <MediaProvider>
      <EditorPageProvider 
        mcpFactory={mcpFactory}
        ffmpegService={ffmpegService}
      >
        <EditorPage />
      </EditorPageProvider>
    </MediaProvider>
  );
};

export default App;
```

### 편집 페이지 구성

```tsx
// packages/editor-page/src/components/EditorPage.tsx
import React from 'react';
import { Timeline } from '@vcut/timeline';
import { PreviewPlayer } from '@vcut/preview-player';
import { Toolbar } from '@vcut/toolbar';
import { AudioEditor } from '@vcut/audio-editor';
import { useEditorPage } from '../context/EditorPageContext';
import '../styles/EditorPage.css';

const EditorPage: React.FC = () => {
  const { currentProject, selectedClip } = useEditorPage();
  
  return (
    <div className="editor-page">
      <div className="editor-header">
        <h1>{currentProject?.name || 'Untitled Project'}</h1>
      </div>
      
      <div className="editor-toolbar">
        <Toolbar />
      </div>
      
      <div className="editor-main">
        <div className="editor-preview">
          <PreviewPlayer />
        </div>
        
        <div className="editor-timeline">
          <Timeline />
        </div>
      </div>
      
      {selectedClip?.type === 'audio' && (
        <div className="editor-audio">
          <AudioEditor clipId={selectedClip.id} />
        </div>
      )}
    </div>
  );
};

export default EditorPage;
```

### 컨텍스트 통합

```tsx
// packages/editor-page/src/context/EditorPageContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { FFmpegService } from '@vcut/ffmpeg-service';

// 컨텍스트 타입 정의
interface EditorPageContextType {
  currentProject: any;
  selectedClip: any;
  mcpFactory: MCPServiceFactory;
  ffmpegService: FFmpegService;
  // 기타 상태 및 액션...
}

// 컨텍스트 생성
const EditorPageContext = createContext<EditorPageContextType | undefined>(undefined);

// 프로바이더 컴포넌트
interface EditorPageProviderProps {
  children: ReactNode;
  mcpFactory: MCPServiceFactory;
  ffmpegService: FFmpegService;
}

export const EditorPageProvider: React.FC<EditorPageProviderProps> = ({ 
  children, 
  mcpFactory, 
  ffmpegService 
}) => {
  // 상태 관리 로직...
  
  const value: EditorPageContextType = {
    currentProject: {/* 프로젝트 데이터 */},
    selectedClip: null,
    mcpFactory,
    ffmpegService,
    // 기타 상태 및 액션...
  };
  
  return (
    <EditorPageContext.Provider value={value}>
      {children}
    </EditorPageContext.Provider>
  );
};

// 컨텍스트 훅
export const useEditorPage = (): EditorPageContextType => {
  const context = useContext(EditorPageContext);
  if (context === undefined) {
    throw new Error('useEditorPage must be used within an EditorPageProvider');
  }
  return context;
};
```

### 미디어 재생 통합

```tsx
// packages/preview-player/src/components/PreviewPlayer.tsx
import React, { useEffect, useRef } from 'react';
import { useEditorPage } from '@vcut/editor-page';
import { HTML5MediaAdapter, MediaEventType } from '@vcut/mcp-service';
import { Playhead } from '@vcut/playhead';
import '../styles/PreviewPlayer.css';

const PreviewPlayer: React.FC = () => {
  const { currentProject, mcpFactory } = useEditorPage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaAdapterRef = useRef<HTML5MediaAdapter | null>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // HTML5 미디어 어댑터 생성 및 비디오 요소 연결
      const mediaAdapter = new HTML5MediaAdapter(videoRef.current);
      mediaAdapterRef.current = mediaAdapter;
      
      // 이벤트 리스너 등록
      mediaAdapter.on(MediaEventType.TIME_UPDATE, (event) => {
        // 타임라인 업데이트 로직...
      });
      
      // 현재 프로젝트의 미디어 로드
      if (currentProject?.mediaUrl) {
        mediaAdapter.load(currentProject.mediaUrl);
      }
    }
    
    return () => {
      // 정리 로직
      if (mediaAdapterRef.current) {
        mediaAdapterRef.current.dispose();
      }
    };
  }, [currentProject?.mediaUrl]);
  
  return (
    <div className="preview-player">
      <div className="video-container">
        <video ref={videoRef} />
      </div>
      
      <div className="player-controls">
        <Playhead 
          duration={currentProject?.duration || 0}
          onSeek={(time) => mediaAdapterRef.current?.seek(time)}
        />
        
        <div className="control-buttons">
          <button onClick={() => mediaAdapterRef.current?.play()}>재생</button>
          <button onClick={() => mediaAdapterRef.current?.pause()}>일시정지</button>
          {/* 기타 제어 버튼 */}
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayer;
```

### 효과 적용 통합

```tsx
// packages/effects/src/components/EffectPanel.tsx
import React from 'react';
import { useEditorPage } from '@vcut/editor-page';
import { FilterOptions } from '@vcut/ffmpeg-service';
import '../styles/EffectPanel.css';

const EffectPanel: React.FC = () => {
  const { selectedClip, ffmpegService } = useEditorPage();
  
  const applyEffect = async (type: string, value: number) => {
    if (!selectedClip) return;
    
    const options: FilterOptions = {
      type: type as any,
      value,
      encodingOptions: {
        format: 'mp4',
        videoCodec: 'libx264',
        audioBitrate: 128
      }
    };
    
    try {
      // 효과 적용
      const outputPath = await ffmpegService.applyFilter(
        selectedClip.path,
        `temp/${selectedClip.id}_${type}.mp4`,
        options
      );
      
      // 미리보기 업데이트 로직...
      
    } catch (error) {
      console.error('효과 적용 실패:', error);
    }
  };
  
  return (
    <div className="effect-panel">
      <h3>비디오 효과</h3>
      
      <div className="effect-controls">
        <div className="effect-control">
          <label>밝기</label>
          <input 
            type="range" 
            min="-1" 
            max="1" 
            step="0.1" 
            defaultValue="0"
            onChange={(e) => applyEffect('brightness', parseFloat(e.target.value))}
          />
        </div>
        
        <div className="effect-control">
          <label>대비</label>
          <input 
            type="range" 
            min="-1" 
            max="1" 
            step="0.1" 
            defaultValue="0"
            onChange={(e) => applyEffect('contrast', parseFloat(e.target.value))}
          />
        </div>
        
        {/* 기타 효과 컨트롤 */}
      </div>
    </div>
  );
};

export default EffectPanel;
```

## 확장 가이드

vCut 프로젝트를 확장하려면 다음 가이드라인을 따르세요:

### 새 패키지 추가

1. 패키지 디렉토리 생성: `packages/[package-name]`
2. 패키지 구조 설정:
   - `package.json`: 패키지 정보 및 의존성
   - `tsconfig.json`: TypeScript 설정
   - `src/`: 소스 코드
   - `docs/`: 문서

### 기존 패키지 확장

1. 패키지의 `index.ts` 파일에서 새 컴포넌트 또는 기능 내보내기
2. 필요한 경우 타입 정의 업데이트
3. 문서 업데이트

### 패키지 간 통합

1. 패키지 의존성 추가: `package.json`의 dependencies에 다른 패키지 추가
2. 컨텍스트 API를 통한 상태 공유
3. 이벤트 시스템을 통한 통신

### 모범 사례

1. **단일 책임 원칙**: 각 패키지는 명확한 단일 책임을 가져야 합니다.
2. **느슨한 결합**: 패키지 간 직접적인 의존성을 최소화하고, 인터페이스를 통해 통신하세요.
3. **문서화**: 모든 패키지는 명확한 문서와 사용 예제를 제공해야 합니다.
4. **테스트**: 각 패키지는 독립적으로 테스트 가능해야 합니다.
5. **일관된 API**: 패키지 간 일관된 API 설계를 유지하세요.

## 결론

이 문서는 vCut 비디오 편집기의 다양한 패키지들을 통합하는 방법에 대한 포괄적인 가이드를 제공했습니다. 이 가이드를 따라 패키지들을 효과적으로 통합하고, 확장 가능한 비디오 편집 애플리케이션을 구축할 수 있습니다.

각 패키지의 자세한 API 문서는 해당 패키지의 `docs` 디렉토리에서 확인할 수 있습니다.
