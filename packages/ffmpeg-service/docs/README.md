# FFmpeg Service

## 개요

`ffmpeg-service` 패키지는 vCut 비디오 편집기에서 비디오 및 오디오 처리 기능을 제공합니다. 이 패키지는 [FFmpeg](https://ffmpeg.org/)를 기반으로 하며, Node.js에서 FFmpeg를 쉽게 사용할 수 있도록 하는 [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) 라이브러리를 활용합니다.

## 기능

이 패키지는 다음과 같은 주요 기능을 제공합니다:

1. **비디오 정보 가져오기**: 비디오 파일의 메타데이터(길이, 해상도, 프레임 레이트, 코덱 등) 조회
2. **썸네일 생성**: 비디오의 특정 시간 위치에서 이미지 추출
3. **비디오 트림**: 비디오의 특정 구간 추출
4. **비디오 자르기**: 비디오의 특정 영역 추출
5. **비디오 병합**: 여러 비디오 파일을 하나로 병합
6. **오디오 추출**: 비디오에서 오디오 트랙 추출
7. **포맷 변환**: 비디오 및 오디오 포맷 변환

## 구조

```
ffmpeg-service/
├── dist/                # 빌드된 파일
├── docs/                # 문서
├── scripts/             # 스크립트
│   └── check-ffmpeg.js  # FFmpeg 설치 확인 스크립트
├── src/                 # 소스 코드
│   ├── FFmpegService.ts           # 기본 FFmpeg 서비스 클래스
│   ├── FFmpegServiceExtended.ts   # 확장 FFmpeg 서비스 클래스
│   ├── index.ts                   # 패키지 진입점
│   ├── types.ts                   # 타입 정의
│   ├── types/                     # 타입 선언 파일
│   │   └── fluent-ffmpeg.d.ts     # fluent-ffmpeg 타입 선언
│   └── utils/                     # 유틸리티 함수
│       ├── formatUtils.ts         # 포맷 관련 유틸리티
│       ├── index.ts               # 유틸리티 진입점
│       └── pathUtils.ts           # 경로 관련 유틸리티
├── test/                # 테스트
│   ├── sample.mp4                 # 샘플 비디오 파일
│   ├── temp/                      # 임시 출력 파일 디렉토리
│   └── test-ffmpeg-service.js     # 테스트 스크립트
├── package.json         # 패키지 정보 및 의존성
└── tsconfig.json        # TypeScript 설정
```

## 주요 클래스 및 인터페이스

### 1. FFmpegService

기본 FFmpeg 기능을 제공하는 클래스입니다.

```typescript
class FFmpegService {
  // FFmpeg 초기화 상태 확인
  isInitialized(): boolean;
  
  // 비디오 정보 가져오기
  async getVideoInfo(inputPath: string): Promise<VideoInfo>;
  
  // 썸네일 생성
  async generateThumbnail(
    inputPath: string, 
    outputPath: string, 
    options?: ThumbnailOptions
  ): Promise<string>;
  
  // 스크린샷 생성
  async generateScreenshots(
    inputPath: string, 
    outputPattern: string, 
    options?: ScreenshotOptions
  ): Promise<string[]>;
}
```

### 2. FFmpegServiceExtended

고급 FFmpeg 기능을 제공하는 클래스입니다.

```typescript
class FFmpegServiceExtended extends FFmpegService {
  // 비디오 트림 (특정 구간 추출)
  async trimVideo(
    inputPath: string, 
    outputPath: string, 
    options: TrimOptions, 
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string>;
  
  // 비디오 자르기 (특정 영역 추출)
  async cropVideo(
    inputPath: string, 
    outputPath: string, 
    options: CropOptions, 
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string>;
  
  // 비디오 병합
  async concatVideos(
    outputPath: string, 
    options: ConcatOptions, 
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string>;
  
  // 오디오 추출
  async extractAudio(
    inputPath: string, 
    outputPath: string, 
    options: ExtractAudioOptions = {}, 
    progressCallback?: (progress: ProgressCallback) => void
  ): Promise<string>;
}
```

### 3. 주요 타입 정의

```typescript
// 비디오 정보 타입
interface VideoInfo {
  duration: number;       // 길이 (초)
  width: number;          // 너비 (픽셀)
  height: number;         // 높이 (픽셀)
  frameRate: number;      // 프레임 레이트 (fps)
  bitrate: number;        // 비트레이트 (bps)
  codec: string;          // 코덱
  format: string;         // 포맷
  size: number;           // 파일 크기 (바이트)
  audioCodec?: string;    // 오디오 코덱
  audioChannels?: number; // 오디오 채널 수
  audioSampleRate?: number; // 오디오 샘플 레이트 (Hz)
}

// 썸네일 옵션 타입
interface ThumbnailOptions {
  timePosition?: number;  // 시간 위치 (초)
  width?: number;         // 너비 (픽셀)
  height?: number;        // 높이 (픽셀)
  quality?: number;       // 품질 (1-100)
}

// 트림 옵션 타입
interface TrimOptions {
  startTime: number;      // 시작 시간 (초)
  endTime: number;        // 종료 시간 (초)
  encodingOptions?: {     // 인코딩 옵션
    videoCodec?: string;  // 비디오 코덱
    audioBitrate?: string; // 오디오 비트레이트
    videoBitrate?: string; // 비디오 비트레이트
  };
}

// 진행 상황 콜백 타입
interface ProgressCallback {
  frames: number;         // 처리된 프레임 수
  currentFps: number;     // 현재 FPS
  currentKbps: number;    // 현재 Kbps
  targetSize: number;     // 대상 크기
  timemark: string;       // 시간 마크
  processedSeconds: number; // 처리된 시간 (초)
  totalSeconds: number;   // 총 시간 (초)
  percent: number;        // 진행률 (%)
}
```

## 사용 예시

### 1. 비디오 정보 가져오기

```javascript
const { FFmpegService } = require('@vcut/ffmpeg-service');

async function getVideoMetadata() {
  const ffmpegService = new FFmpegService();
  const videoInfo = await ffmpegService.getVideoInfo('input.mp4');
  
  console.log(`비디오 길이: ${videoInfo.duration}초`);
  console.log(`해상도: ${videoInfo.width}x${videoInfo.height}`);
  console.log(`프레임 레이트: ${videoInfo.frameRate}fps`);
  console.log(`코덱: ${videoInfo.codec}`);
}
```

### 2. 썸네일 생성

```javascript
const { FFmpegService } = require('@vcut/ffmpeg-service');

async function generateVideoThumbnail() {
  const ffmpegService = new FFmpegService();
  
  // 5초 위치에서 320x180 크기의 썸네일 생성
  await ffmpegService.generateThumbnail('input.mp4', 'thumbnail.jpg', {
    timePosition: 5,
    width: 320,
    height: 180,
    quality: 90
  });
  
  console.log('썸네일 생성 완료');
}
```

### 3. 비디오 트림

```javascript
const { FFmpegServiceExtended } = require('@vcut/ffmpeg-service');

async function trimVideoSegment() {
  const ffmpegService = new FFmpegServiceExtended();
  
  // 0~10초 구간 추출
  await ffmpegService.trimVideo('input.mp4', 'trimmed.mp4', {
    startTime: 0,
    endTime: 10,
    encodingOptions: {
      videoCodec: 'libx264',
      audioBitrate: '128k',
      videoBitrate: '1000k'
    }
  }, (progress) => {
    console.log(`진행률: ${progress.percent}%`);
  });
  
  console.log('비디오 트림 완료');
}
```

### 4. 오디오 추출

```javascript
const { FFmpegServiceExtended } = require('@vcut/ffmpeg-service');

async function extractAudioFromVideo() {
  const ffmpegService = new FFmpegServiceExtended();
  
  // MP3 형식으로 오디오 추출
  await ffmpegService.extractAudio('input.mp4', 'audio.mp3', {
    codec: 'libmp3lame',
    bitrate: '128k',
    channels: 2,
    format: 'mp3'
  }, (progress) => {
    console.log(`진행률: ${progress.percent}%`);
  });
  
  console.log('오디오 추출 완료');
}
```

## 의존성

- **fluent-ffmpeg**: FFmpeg 명령어 실행을 위한 Node.js 래퍼
- **node-fetch**: HTTP 요청을 위한 라이브러리
- **TypeScript**: 타입 안전성을 위한 JavaScript 확장

## 테스트

패키지에는 기본 기능을 테스트하기 위한 테스트 스크립트가 포함되어 있습니다.

```bash
# 테스트 실행
node test/test-ffmpeg-service.js

# 특정 비디오 파일로 테스트
node test/test-ffmpeg-service.js path/to/video.mp4
```

## 주의사항

1. 이 패키지를 사용하려면 시스템에 FFmpeg가 설치되어 있어야 합니다.
2. 대용량 비디오 파일을 처리할 때는 충분한 메모리와 디스크 공간이 필요합니다.
3. 비디오 처리는 CPU 집약적인 작업이므로 성능에 영향을 줄 수 있습니다.

## 향후 개선 사항

1. 병렬 처리를 통한 성능 향상
2. 더 많은 비디오 효과 및 필터 지원
3. WebAssembly 기반 FFmpeg 통합 검토
4. 클라우드 기반 처리 옵션 추가
