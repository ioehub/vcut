# vCut 미디어 제어 프로토콜 (MCP) 서비스

vCut 비디오 편집기의 미디어 제어 프로토콜 서비스 모듈입니다. 이 패키지는 비디오 및 오디오 재생 제어를 위한 통합 인터페이스를 제공합니다.

## 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [설치](#설치)
- [사용 방법](#사용-방법)
- [API 참조](#api-참조)
- [예제](#예제)
- [아키텍처](#아키텍처)

## 개요

MCP 서비스는 vCut 비디오 편집기에서 미디어 재생 및 제어를 위한 핵심 서비스입니다. 이 서비스는 다양한 미디어 소스(로컬 파일, 스트리밍 URL 등)를 통합적으로 관리하고 제어할 수 있는 인터페이스를 제공합니다.

주요 특징:
- 표준화된 미디어 제어 인터페이스
- 다양한 미디어 소스 지원
- 이벤트 기반 아키텍처
- HTML5 미디어 요소와의 통합

## 주요 기능

- **미디어 재생 제어**: 재생, 일시 정지, 정지, 시크 등의 기본적인 미디어 제어 기능
- **볼륨 및 음소거 제어**: 볼륨 조절 및 음소거 기능
- **재생 속도 제어**: 미디어 재생 속도 조절 기능
- **미디어 정보 제공**: 길이, 해상도, 코덱 등의 미디어 메타데이터 제공
- **이벤트 시스템**: 미디어 상태 변화, 시간 업데이트 등의 이벤트 알림
- **HTML5 통합**: 웹 기반 환경에서 HTML5 비디오/오디오 요소와 통합

## 설치

```bash
# npm을 사용하는 경우
npm install @vcut/mcp-service

# yarn을 사용하는 경우
yarn add @vcut/mcp-service
```

## 사용 방법

### 기본 사용법

```typescript
import { MCPService, MediaControlOptions } from '@vcut/mcp-service';

// MCP 서비스 인스턴스 생성
const mcpService = new MCPService();

// 미디어 로드
const options: MediaControlOptions = {
  autoPlay: true,
  volume: 0.8
};

// 미디어 로드 및 재생
async function playVideo() {
  try {
    await mcpService.load('path/to/video.mp4', options);
    console.log('비디오가 로드되었습니다.');
  } catch (error) {
    console.error('비디오 로드 중 오류 발생:', error);
  }
}

playVideo();

// 이벤트 리스너 등록
mcpService.on('timeUpdate', (event) => {
  console.log('현재 시간:', event.data.currentTime);
});

// 재생 제어
mcpService.pause();
mcpService.play();
mcpService.seek(30); // 30초 위치로 이동
mcpService.setVolume(0.5); // 볼륨 50%로 설정
```

### HTML5 미디어 요소와 통합

```typescript
import { HTML5MediaAdapter } from '@vcut/mcp-service';

// HTML 비디오 요소 가져오기
const videoElement = document.getElementById('video') as HTMLVideoElement;

// HTML5 미디어 어댑터 생성 및 비디오 요소 연결
const mediaAdapter = new HTML5MediaAdapter(videoElement);

// 미디어 로드 및 재생
mediaAdapter.load('https://example.com/video.mp4', { autoPlay: true });

// 이벤트 리스너 등록
mediaAdapter.on('stateChange', (event) => {
  console.log('미디어 상태 변경:', event.data.state);
});
```

### 여러 미디어 컨트롤러 관리

```typescript
import { MCPServiceFactory, MediaEventType } from '@vcut/mcp-service';

// MCP 서비스 팩토리 생성
const factory = new MCPServiceFactory();

// 여러 미디어 컨트롤러 생성
const controller1 = factory.createController();
const controller2 = factory.createController();

// 모든 컨트롤러의 이벤트 수신
factory.on(MediaEventType.STATE_CHANGE, (event) => {
  console.log(`컨트롤러 ${event.mediaId}의 상태 변경:`, event.data.state);
});

// 미디어 로드
controller1.load('video1.mp4');
controller2.load('video2.mp4');

// 특정 컨트롤러 가져오기
const id = controller1.getMediaInfo().id;
const retrievedController = factory.getController(id);
```

## API 참조

### 주요 클래스

- **MCPService**: 기본 미디어 제어 서비스 클래스
- **MCPServiceFactory**: 여러 미디어 컨트롤러를 관리하기 위한 팩토리 클래스
- **HTML5MediaAdapter**: HTML5 비디오/오디오 요소와 통합하기 위한 어댑터 클래스

### 주요 인터페이스

- **MediaController**: 미디어 제어 인터페이스
- **MediaInfo**: 미디어 정보 인터페이스
- **MediaStatus**: 미디어 상태 인터페이스
- **MediaEvent**: 미디어 이벤트 인터페이스
- **MediaControlOptions**: 미디어 제어 옵션 인터페이스

### 열거형

- **MediaType**: 미디어 타입 열거형 (VIDEO, AUDIO)
- **MediaState**: 미디어 상태 열거형 (IDLE, LOADING, READY, PLAYING, PAUSED, SEEKING, BUFFERING, ENDED, ERROR)
- **MediaEventType**: 미디어 이벤트 타입 열거형 (STATE_CHANGE, TIME_UPDATE, DURATION_CHANGE 등)

### 유틸리티 함수

- **formatTime**: 초를 HH:MM:SS 형식으로 변환
- **formatTimeCompact**: 초를 MM:SS 형식으로 변환 (1시간 미만인 경우)
- **parseTimeString**: HH:MM:SS 형식의 문자열을 초로 변환
- **timeToFrameNumber**: 시간을 프레임 번호로 변환
- **frameNumberToTime**: 프레임 번호를 시간으로 변환

## 예제

### 기본 재생 제어

```typescript
import { MCPService, MediaEventType } from '@vcut/mcp-service';

const player = new MCPService();

// 이벤트 리스너 등록
player.on(MediaEventType.STATE_CHANGE, (event) => {
  console.log('상태 변경:', event.data.state);
});

player.on(MediaEventType.TIME_UPDATE, (event) => {
  console.log('시간 업데이트:', event.data.currentTime);
});

// 미디어 로드 및 재생
async function initPlayer() {
  await player.load('video.mp4', { autoPlay: true });
  
  // 10초 후 일시 정지
  setTimeout(() => {
    player.pause();
    console.log('일시 정지됨');
    
    // 3초 후 다시 재생
    setTimeout(() => {
      player.play();
      console.log('재생 재개');
    }, 3000);
  }, 10000);
}

initPlayer().catch(console.error);
```

### 구간 반복 재생

```typescript
import { MCPService, MediaEventType } from '@vcut/mcp-service';

const player = new MCPService();
const startTime = 10; // 시작 시간 (초)
const endTime = 20;   // 종료 시간 (초)

// 시간 업데이트 이벤트 리스너 등록
player.on(MediaEventType.TIME_UPDATE, (event) => {
  const currentTime = event.data.currentTime;
  
  // 종료 시간에 도달하면 시작 시간으로 돌아가기
  if (currentTime >= endTime) {
    player.seek(startTime);
  }
});

// 미디어 로드 및 재생
async function playSegment() {
  await player.load('video.mp4');
  player.seek(startTime);
  player.play();
}

playSegment().catch(console.error);
```

## 아키텍처

MCP 서비스는 다음과 같은 구조로 설계되었습니다:

```
mcp-service/
├── MCPService.ts           # 기본 미디어 제어 서비스
├── MCPServiceFactory.ts    # 미디어 컨트롤러 팩토리
├── types.ts                # 타입 정의
├── adapters/               # 미디어 어댑터
│   └── HTML5MediaAdapter.ts # HTML5 미디어 어댑터
└── utils/                  # 유틸리티 함수
    └── timeUtils.ts        # 시간 관련 유틸리티
```

### 컴포넌트 간 상호작용

1. **MCPService**: 기본 미디어 제어 기능을 제공하는 핵심 클래스
2. **MCPServiceFactory**: 여러 MCPService 인스턴스를 생성하고 관리
3. **HTML5MediaAdapter**: HTML5 미디어 요소와 통합하기 위한 어댑터
4. **이벤트 시스템**: EventEmitter를 사용한 이벤트 기반 아키텍처

### 확장성

MCP 서비스는 다양한 미디어 소스와 플랫폼을 지원하도록 설계되었습니다. 새로운 미디어 소스나 플랫폼을 지원하려면 MediaController 인터페이스를 구현하는 새로운 어댑터를 추가하면 됩니다.

예를 들어, 다음과 같은 어댑터를 추가로 구현할 수 있습니다:
- FFmpegAdapter: FFmpeg를 사용한 미디어 제어
- HLSAdapter: HLS 스트리밍 프로토콜 지원
- DASHAdapter: DASH 스트리밍 프로토콜 지원
