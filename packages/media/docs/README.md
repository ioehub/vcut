# vCut Media 패키지

## 개요
Media 패키지는 vCut 비디오 편집기의 미디어 관리 기능을 담당합니다. 이 패키지는 다양한 미디어 파일(비디오, 오디오, 이미지)을 가져오고, 메타데이터를 추출하며, 썸네일을 생성하는 기능을 제공합니다.

## 주요 기능
- 미디어 파일 가져오기 (비디오, 오디오, 이미지)
- FFmpeg를 사용한 미디어 메타데이터 추출
- 미디어 파일 썸네일 생성
- 미디어 라이브러리 관리
- MP3 파일 지원 및 오디오 시각화

## 구조
```
src/
├── components/        # React 컴포넌트
│   ├── MediaItem.tsx  # 개별 미디어 항목 컴포넌트
│   ├── MediaList.tsx  # 미디어 목록 컴포넌트
│   ├── MediaManager.tsx # 미디어 관리 컴포넌트
│   └── MediaToolbar.tsx # 미디어 도구 모음 컴포넌트
├── contexts/
│   └── MediaContext.tsx # 미디어 상태 관리 컨텍스트
├── services/
│   ├── FFmpegService.ts # FFmpeg 기반 미디어 처리 서비스
│   └── MediaService.ts  # 미디어 관리 서비스
├── types/
│   └── index.ts        # 타입 정의
└── index.ts           # 패키지 진입점
```

## 기술 스택
- TypeScript
- React
- FFmpeg.wasm: 브라우저에서 미디어 처리를 위한 WebAssembly 기반 FFmpeg
- Web Audio API: 오디오 메타데이터 추출 및 시각화
- Canvas API: 커스텀 썸네일 생성

## 빌드 설정
이 패키지는 Vite를 사용하여 빌드됩니다. 빌드 설정은 다음과 같습니다:
- 출력 형식: ES 모듈 및 UMD
- 출력 파일명: `index.es.js` 및 `index.umd.js`
- TypeScript 선언 파일: `index.d.ts`

## MP3 파일 지원
v1.5 업데이트에서 MP3 파일 지원이 추가되었습니다:
- MP3 파일 가져오기 및 메타데이터 추출
- 오디오 파일 썸네일 생성 (파형 또는 기본 아이콘)
- FFmpeg 로드 메커니즘 개선 및 오류 처리 강화

## FFmpeg 로드 메커니즘
FFmpeg 로드 과정은 다음과 같이 작동합니다:
1. 로컬 파일을 사용하여 FFmpeg 로드 시도
2. 로드 실패 시 최대 3회까지 재시도
3. 모든 시도 실패 시 대체 메서드(Web Audio API)로 전환
4. 동시 로드 요청 처리를 위한 Promise 기반 메커니즘 구현

## 사용 예시
```tsx
import { MediaProvider, MediaManager } from '@vcut/media';

function App() {
  return (
    <MediaProvider>
      <MediaManager />
    </MediaProvider>
  );
}
```
