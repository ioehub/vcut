# MCP Service 통합 테스트 가이드

이 문서는 Media Control Protocol (MCP) 서비스 패키지의 통합 테스트 방법에 대한 가이드를 제공합니다. MCP 서비스는 vCut 애플리케이션의 미디어 재생 및 제어를 담당하는 핵심 컴포넌트로, 다른 패키지들과의 원활한 통합이 중요합니다.

## 목차

- [통합 테스트 개요](#통합-테스트-개요)
- [테스트 환경 설정](#테스트-환경-설정)
- [MCP Service와 다른 패키지 통합 테스트](#mcp-service와-다른-패키지-통합-테스트)
- [자동화된 테스트 예제](#자동화된-테스트-예제)
- [수동 테스트 체크리스트](#수동-테스트-체크리스트)
- [문제 해결](#문제-해결)

## 통합 테스트 개요

MCP Service는 다음과 같은 패키지들과 통합되어 작동합니다:

1. **preview-player**: 비디오 및 오디오 미리보기 및 재생 기능
2. **editor-page**: 전체 편집 인터페이스 내에서의 미디어 제어
3. **timeline**: 타임라인 상의 미디어 클립 재생 및 시크 기능
4. **playhead**: 재생 위치 표시 및 제어

통합 테스트의 목적은 MCP Service가 이러한 패키지들과 올바르게 상호작용하는지 확인하는 것입니다.

## 테스트 환경 설정

### 필수 요구사항

- Node.js 14.0.0 이상
- npm 6.0.0 이상 또는 yarn 1.22.0 이상
- Jest 및 React Testing Library (자동화된 테스트용)
- 샘플 미디어 파일 (MP4, MP3 등)

### 테스트 환경 설정

1. 의존성 설치:

```bash
# 프로젝트 루트 디렉토리에서
npm install

# 또는
yarn install
```

2. MCP Service 패키지 빌드:

```bash
# 프로젝트 루트 디렉토리에서
npm run build --scope=@vcut/mcp-service

# 또는
yarn workspace @vcut/mcp-service build
```

3. 통합 테스트를 위한 Jest 설정:

`packages/mcp-service/jest.config.js` 파일을 다음과 같이 설정합니다:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.integration.ts?(x)'
  ],
  moduleNameMapper: {
    '^@vcut/(.*)$': '<rootDir>/../$1/src'
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js']
};
```

4. 테스트 설정 파일 생성:

`packages/mcp-service/__tests__/setup.js` 파일을 생성합니다:

```javascript
// Jest DOM 확장 기능 추가
import '@testing-library/jest-dom';

// HTML5 미디어 요소 모의 설정
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

// 이벤트 리스너 모의 설정
window.HTMLMediaElement.prototype.addEventListener = jest.fn();
window.HTMLMediaElement.prototype.removeEventListener = jest.fn();

// 미디어 속성 모의 설정
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
  get: function() { return this._currentTime || 0; },
  set: function(time) { this._currentTime = time; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
  get: function() { return this._duration || 0; },
  set: function(duration) { this._duration = duration; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'volume', {
  get: function() { return this._volume || 1; },
  set: function(volume) { this._volume = volume; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', {
  get: function() { return this._muted || false; },
  set: function(muted) { this._muted = muted; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'playbackRate', {
  get: function() { return this._playbackRate || 1; },
  set: function(rate) { this._playbackRate = rate; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
  get: function() { return this._paused !== false; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'ended', {
  get: function() { return this._ended || false; }
});
```

## MCP Service와 다른 패키지 통합 테스트

### MCP Service와 Preview Player 통합 테스트

MCP Service와 Preview Player의 통합은 미디어 재생 제어의 핵심입니다. 다음 영역을 테스트해야 합니다:

1. 미디어 로드 및 초기화
2. 재생/일시 정지 제어
3. 시크 기능
4. 볼륨 및 음소거 제어
5. 재생 속도 조절
6. 이벤트 처리 (timeupdate, ended 등)

### MCP Service와 Timeline 통합 테스트

MCP Service와 Timeline의 통합은 타임라인 기반 편집의 핵심입니다. 다음 영역을 테스트해야 합니다:

1. 타임라인 클립 선택 시 미디어 로드
2. 타임라인 시크 시 미디어 위치 업데이트
3. 타임라인 재생 제어
4. 인/아웃 포인트 설정 및 루프 재생

### MCP Service와 Editor Page 통합 테스트

MCP Service와 Editor Page의 통합은 전체 편집 워크플로우의 핵심입니다. 다음 영역을 테스트해야 합니다:

1. 편집기 상태와 미디어 재생 상태 동기화
2. 편집 작업 중 미디어 제어
3. 다중 미디어 소스 관리

## 자동화된 테스트 예제

### MCP Service와 Preview Player 통합 테스트 예제

`packages/mcp-service/__tests__/MCPService-PreviewPlayer.integration.tsx` 파일을 생성합니다:

```tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MCPService } from '@vcut/mcp-service';
import { HTML5MediaAdapter } from '@vcut/mcp-service/adapters/HTML5MediaAdapter';
import { PreviewPlayer } from '@vcut/preview-player';

describe('MCP Service와 Preview Player 통합 테스트', () => {
  let mcpService: MCPService;
  
  beforeEach(() => {
    // MCP 서비스 인스턴스 생성
    mcpService = new MCPService();
  });
  
  test('Preview Player가 MCP Service를 통해 미디어를 제어할 수 있어야 함', async () => {
    // Preview Player 렌더링
    render(
      <PreviewPlayer
        mcpService={mcpService}
        source="test-video.mp4"
      />
    );
    
    // 비디오 요소 가져오기
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    
    // HTML5MediaAdapter 생성 및 MCP 서비스에 연결
    const adapter = new HTML5MediaAdapter(videoElement);
    mcpService.setMediaController(adapter);
    
    // 미디어 로드
    await act(async () => {
      await mcpService.load('test-video.mp4');
    });
    
    // 재생 버튼 클릭
    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);
    
    // 재생 메서드가 호출되었는지 확인
    expect(videoElement.play).toHaveBeenCalled();
    
    // 일시 정지 버튼 클릭
    const pauseButton = screen.getByTestId('pause-button');
    fireEvent.click(pauseButton);
    
    // 일시 정지 메서드가 호출되었는지 확인
    expect(videoElement.pause).toHaveBeenCalled();
    
    // 볼륨 조절
    const volumeSlider = screen.getByTestId('volume-slider') as HTMLInputElement;
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    
    // 볼륨이 변경되었는지 확인
    expect(videoElement.volume).toBe(0.5);
    
    // 시크 테스트
    const seekBar = screen.getByTestId('seek-bar') as HTMLInputElement;
    fireEvent.change(seekBar, { target: { value: '10' } });
    
    // 시크 위치가 변경되었는지 확인
    expect(videoElement.currentTime).toBe(10);
  });
  
  test('미디어 이벤트가 MCP Service를 통해 Preview Player에 전파되어야 함', async () => {
    // 이벤트 핸들러 모의 함수
    const onTimeUpdate = jest.fn();
    const onEnded = jest.fn();
    
    // Preview Player 렌더링
    render(
      <PreviewPlayer
        mcpService={mcpService}
        source="test-video.mp4"
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    );
    
    // 비디오 요소 가져오기
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    
    // HTML5MediaAdapter 생성 및 MCP 서비스에 연결
    const adapter = new HTML5MediaAdapter(videoElement);
    mcpService.setMediaController(adapter);
    
    // 미디어 로드
    await act(async () => {
      await mcpService.load('test-video.mp4');
    });
    
    // timeupdate 이벤트 시뮬레이션
    act(() => {
      videoElement.dispatchEvent(new Event('timeupdate'));
    });
    
    // onTimeUpdate 핸들러가 호출되었는지 확인
    expect(onTimeUpdate).toHaveBeenCalled();
    
    // ended 이벤트 시뮬레이션
    act(() => {
      videoElement.dispatchEvent(new Event('ended'));
    });
    
    // onEnded 핸들러가 호출되었는지 확인
    expect(onEnded).toHaveBeenCalled();
  });
});
```

### MCP Service와 Timeline 통합 테스트 예제

`packages/mcp-service/__tests__/MCPService-Timeline.integration.tsx` 파일을 생성합니다:

```tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MCPService } from '@vcut/mcp-service';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { Timeline } from '@vcut/timeline';
import { Playhead } from '@vcut/playhead';

describe('MCP Service와 Timeline 통합 테스트', () => {
  let mcpService: MCPService;
  let mcpFactory: MCPServiceFactory;
  
  beforeEach(() => {
    // MCP 서비스 인스턴스 생성
    mcpService = new MCPService();
    mcpFactory = new MCPServiceFactory();
    mcpFactory.registerService('main', mcpService);
  });
  
  test('Timeline에서 클립을 선택하면 MCP Service가 해당 미디어를 로드해야 함', async () => {
    // 미디어 로드 메서드 모의
    const loadSpy = jest.spyOn(mcpService, 'load');
    
    // 테스트용 타임라인 클립 데이터
    const clips = [
      { id: 'clip1', type: 'video', source: 'video1.mp4', start: 0, end: 10, trackId: 'track1' },
      { id: 'clip2', type: 'audio', source: 'audio1.mp3', start: 5, end: 15, trackId: 'track2' }
    ];
    
    // Timeline 렌더링
    render(
      <Timeline
        clips={clips}
        mcpFactory={mcpFactory}
        duration={30}
      />
    );
    
    // 첫 번째 클립 선택
    const clip1Element = screen.getByTestId('clip-clip1');
    fireEvent.click(clip1Element);
    
    // MCP Service의 load 메서드가 올바른 소스로 호출되었는지 확인
    expect(loadSpy).toHaveBeenCalledWith('video1.mp4', expect.anything());
    
    // 두 번째 클립 선택
    const clip2Element = screen.getByTestId('clip-clip2');
    fireEvent.click(clip2Element);
    
    // MCP Service의 load 메서드가 올바른 소스로 호출되었는지 확인
    expect(loadSpy).toHaveBeenCalledWith('audio1.mp3', expect.anything());
  });
  
  test('Playhead 위치 변경이 MCP Service의 currentTime을 업데이트해야 함', async () => {
    // 시크 메서드 모의
    const seekSpy = jest.spyOn(mcpService, 'seek');
    
    // Timeline과 Playhead 렌더링
    render(
      <>
        <Timeline
          clips={[]}
          mcpFactory={mcpFactory}
          duration={30}
        />
        <Playhead
          mcpService={mcpService}
          duration={30}
          position={0}
        />
      </>
    );
    
    // Playhead 요소 가져오기
    const playheadElement = screen.getByTestId('playhead');
    
    // Playhead 드래그 시뮬레이션 (10초 위치로)
    act(() => {
      // 드래그 이벤트 시뮬레이션
      fireEvent.mouseDown(playheadElement);
      // 타임라인 상의 10초 위치로 이동했다고 가정
      fireEvent.mouseMove(playheadElement, { clientX: 100 }); // 100px는 10초에 해당한다고 가정
      fireEvent.mouseUp(playheadElement);
    });
    
    // MCP Service의 seek 메서드가 올바른 시간으로 호출되었는지 확인
    expect(seekSpy).toHaveBeenCalledWith(10);
  });
});
```

### MCP Service와 Editor Page 통합 테스트 예제

`packages/mcp-service/__tests__/MCPService-EditorPage.integration.tsx` 파일을 생성합니다:

```tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { EditorPage, EditorPageProvider } from '@vcut/editor-page';
import { FFmpegService } from '@vcut/ffmpeg-service';

// FFmpeg 서비스 모의
jest.mock('@vcut/ffmpeg-service', () => {
  return {
    FFmpegService: jest.fn().mockImplementation(() => {
      return {
        initialize: jest.fn().mockResolvedValue(undefined),
        getVideoInfo: jest.fn().mockResolvedValue({
          duration: 120,
          width: 1280,
          height: 720,
          frameRate: 30,
          bitrate: 5000000,
          codec: 'h264',
          audioStreams: [],
          videoStreams: [],
          metadata: {}
        })
      };
    })
  };
});

describe('MCP Service와 Editor Page 통합 테스트', () => {
  let mcpFactory: MCPServiceFactory;
  let ffmpegService: FFmpegService;
  
  beforeEach(() => {
    // 서비스 인스턴스 생성
    mcpFactory = new MCPServiceFactory();
    ffmpegService = new FFmpegService();
  });
  
  test('Editor Page에서 미디어를 가져오면 MCP Service가 해당 미디어를 관리해야 함', async () => {
    // Editor Page 렌더링
    render(
      <EditorPageProvider
        mcpFactory={mcpFactory}
        ffmpegService={ffmpegService}
      >
        <EditorPage />
      </EditorPageProvider>
    );
    
    // 미디어 추가 버튼 클릭
    const addMediaButton = screen.getByTestId('add-media-button');
    fireEvent.click(addMediaButton);
    
    // 파일 선택 (파일 업로드 시뮬레이션)
    const fileInput = screen.getByTestId('file-input');
    const testFile = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    });
    
    // 미디어가 타임라인에 추가되었는지 확인
    const timelineClip = screen.getByTestId('timeline-clip');
    expect(timelineClip).toBeInTheDocument();
    
    // 미디어가 미리보기 플레이어에 로드되었는지 확인
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toBeInTheDocument();
    
    // 재생 버튼 클릭
    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);
    
    // 미디어가 재생 중인지 확인 (재생 버튼이 일시 정지 버튼으로 변경됨)
    const pauseButton = screen.getByTestId('pause-button');
    expect(pauseButton).toBeInTheDocument();
    
    // 일시 정지 버튼 클릭
    fireEvent.click(pauseButton);
    
    // 미디어가 일시 정지되었는지 확인 (일시 정지 버튼이 재생 버튼으로 변경됨)
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
  });
  
  test('Editor Page에서 여러 미디어 소스를 전환할 때 MCP Service가 올바르게 작동해야 함', async () => {
    // Editor Page 렌더링
    render(
      <EditorPageProvider
        mcpFactory={mcpFactory}
        ffmpegService={ffmpegService}
      >
        <EditorPage />
      </EditorPageProvider>
    );
    
    // 첫 번째 미디어 추가
    const addMediaButton = screen.getByTestId('add-media-button');
    fireEvent.click(addMediaButton);
    
    const fileInput = screen.getByTestId('file-input');
    const testFile1 = new File(['dummy content 1'], 'video1.mp4', { type: 'video/mp4' });
    
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [testFile1] } });
    });
    
    // 두 번째 미디어 추가
    fireEvent.click(addMediaButton);
    
    const testFile2 = new File(['dummy content 2'], 'video2.mp4', { type: 'video/mp4' });
    
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [testFile2] } });
    });
    
    // 첫 번째 클립 선택
    const clip1 = screen.getAllByTestId('timeline-clip')[0];
    fireEvent.click(clip1);
    
    // 미리보기 플레이어에 첫 번째 비디오가 로드되었는지 확인
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('src', expect.stringContaining('video1.mp4'));
    
    // 두 번째 클립 선택
    const clip2 = screen.getAllByTestId('timeline-clip')[1];
    fireEvent.click(clip2);
    
    // 미리보기 플레이어에 두 번째 비디오가 로드되었는지 확인
    expect(videoElement).toHaveAttribute('src', expect.stringContaining('video2.mp4'));
  });
});
```

## 수동 테스트 체크리스트

MCP Service 패키지의 통합을 수동으로 테스트하기 위한 체크리스트입니다:

### 기본 미디어 제어 테스트

- [ ] 미디어 로드
  - [ ] 비디오 파일 로드 (MP4, WebM, MOV)
  - [ ] 오디오 파일 로드 (MP3, WAV, AAC)
  - [ ] 잘못된 형식의 파일 로드 시 오류 처리

- [ ] 재생 제어
  - [ ] 재생/일시 정지 토글
  - [ ] 정지 및 처음으로 돌아가기
  - [ ] 시크 (특정 시간으로 이동)
  - [ ] 프레임 단위 이동 (앞/뒤)

- [ ] 볼륨 제어
  - [ ] 볼륨 조절
  - [ ] 음소거 토글
  - [ ] 볼륨 변경 이벤트 처리

- [ ] 재생 속도 제어
  - [ ] 다양한 재생 속도 설정 (0.5x, 1x, 1.5x, 2x)
  - [ ] 재생 속도 변경 시 오디오 유지

### Preview Player 통합 테스트

- [ ] 미디어 로드 및 표시
  - [ ] 비디오 표시 및 크기 조정
  - [ ] 오디오 파형 표시 (해당되는 경우)

- [ ] 컨트롤 UI 동작
  - [ ] 재생/일시 정지 버튼 동작
  - [ ] 시크 바 동작
  - [ ] 볼륨 컨트롤 동작
  - [ ] 전체 화면 전환

- [ ] 이벤트 처리
  - [ ] 시간 업데이트 표시
  - [ ] 버퍼링 상태 표시
  - [ ] 재생 종료 처리

### Timeline 통합 테스트

- [ ] 타임라인 클립 선택
  - [ ] 클립 선택 시 해당 미디어 로드
  - [ ] 클립 범위 내에서만 재생

- [ ] 타임라인 시크
  - [ ] 타임라인 클릭 시 해당 위치로 이동
  - [ ] 플레이헤드 드래그 시 미디어 위치 업데이트
  - [ ] 재생 중 플레이헤드 이동 표시

- [ ] 인/아웃 포인트
  - [ ] 인/아웃 포인트 설정
  - [ ] 인/아웃 포인트 사이 루프 재생

### 다중 미디어 관리 테스트

- [ ] 여러 미디어 소스 전환
  - [ ] 다른 클립 선택 시 미디어 전환
  - [ ] 전환 시 이전 미디어 상태 정리

- [ ] 다중 트랙 재생
  - [ ] 비디오 트랙과 오디오 트랙 동기화
  - [ ] 여러 오디오 트랙 믹싱

## 문제 해결

MCP Service 통합 테스트 중 발생할 수 있는 일반적인 문제와 해결 방법:

### 미디어 로드 실패

**문제**: 미디어 파일이 로드되지 않거나 오류가 발생함

**해결 방법**:
1. 미디어 파일 형식이 지원되는지 확인
2. CORS 설정 확인 (웹 환경에서 테스트하는 경우)
3. 미디어 파일 경로가 올바른지 확인
4. HTML5MediaAdapter 초기화 과정 확인

### 이벤트 처리 문제

**문제**: 미디어 이벤트가 전파되지 않거나 처리되지 않음

**해결 방법**:
1. 이벤트 리스너가 올바르게 등록되었는지 확인
2. 이벤트 핸들러가 올바르게 구현되었는지 확인
3. 이벤트 버블링 또는 캡처링 설정 확인
4. 콘솔에 이벤트 로깅 추가하여 디버깅

### 동기화 문제

**문제**: 타임라인과 미리보기 플레이어 간 동기화 문제

**해결 방법**:
1. 시간 단위 및 변환 확인 (밀리초 vs 초)
2. 이벤트 전파 지연 확인
3. 렌더링 성능 최적화
4. 디바운싱 또는 스로틀링 적용하여 이벤트 처리 최적화
