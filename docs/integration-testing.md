# vCut 통합 테스트 가이드

이 문서는 vCut 비디오 편집기의 통합 테스트 방법에 대한 포괄적인 가이드를 제공합니다. 이 가이드는 개발자와 인공지능이 vCut 프로젝트의 다양한 패키지들이 함께 올바르게 작동하는지 확인하는 데 도움이 될 것입니다.

## 목차

- [테스트 개요](#테스트-개요)
- [테스트 환경 설정](#테스트-환경-설정)
- [통합 테스트 방법](#통합-테스트-방법)
- [자동화된 테스트](#자동화된-테스트)
- [수동 테스트](#수동-테스트)
- [테스트 시나리오](#테스트-시나리오)
- [문제 해결](#문제-해결)
- [CI/CD 통합](#cicd-통합)

## 테스트 개요

vCut 프로젝트는 여러 패키지로 구성된 모노레포 구조를 가지고 있습니다. 각 패키지는 독립적으로 개발되고 테스트되지만, 전체 애플리케이션이 올바르게 작동하려면 이러한 패키지들이 함께 원활하게 통합되어야 합니다.

통합 테스트의 목적:
1. 패키지 간 인터페이스가 올바르게 작동하는지 확인
2. 데이터 흐름이 예상대로 작동하는지 확인
3. 사용자 시나리오가 전체 애플리케이션에서 원활하게 작동하는지 확인
4. 성능 병목 현상 식별
5. 패키지 간 의존성 문제 발견

## 테스트 환경 설정

### 필수 요구사항

- Node.js 14.0.0 이상
- npm 6.0.0 이상 또는 yarn 1.22.0 이상
- FFmpeg (ffmpeg-service 패키지 테스트용)
- Chrome 또는 Firefox 최신 버전 (UI 테스트용)

### 로컬 테스트 환경 설정

1. 저장소 클론:

```bash
git clone <repository-url>
cd vcut
```

2. 의존성 설치:

```bash
# npm 사용
npm install

# 또는 yarn 사용
yarn install
```

3. 패키지 빌드:

```bash
# npm 사용
npm run build

# 또는 yarn 사용
yarn build
```

4. 테스트 데이터 설정:

테스트에 필요한 샘플 미디어 파일을 `test-assets` 디렉토리에 복사합니다. 이 디렉토리가 없는 경우 생성하세요:

```bash
mkdir -p test-assets
# 샘플 비디오 및 오디오 파일을 test-assets 디렉토리에 복사
```

## 통합 테스트 방법

vCut 프로젝트의 통합 테스트는 다음과 같은 방법으로 수행할 수 있습니다:

1. **자동화된 통합 테스트**: Jest와 React Testing Library를 사용한 자동화된 테스트
2. **엔드 투 엔드 테스트**: Cypress 또는 Playwright를 사용한 E2E 테스트
3. **수동 테스트**: 정의된 테스트 시나리오에 따른 수동 테스트

### 테스트 범위

통합 테스트는 다음과 같은 영역을 포함해야 합니다:

- **패키지 간 통합**: 각 패키지가 다른 패키지와 올바르게 통합되는지 확인
- **데이터 흐름**: 데이터가 패키지 간에 올바르게 전달되는지 확인
- **UI 통합**: UI 컴포넌트가 올바르게 통합되고 상호작용하는지 확인
- **성능**: 통합된 애플리케이션의 성능이 허용 가능한 수준인지 확인
- **오류 처리**: 오류 상황이 올바르게 처리되는지 확인

## 자동화된 테스트

### 통합 테스트 스크립트 설정

프로젝트 루트의 `package.json` 파일에 통합 테스트 스크립트를 추가합니다:

```json
{
  "scripts": {
    "test:integration": "jest --config=jest.integration.config.js",
    "test:e2e": "cypress run"
  }
}
```

### Jest 통합 테스트 설정

프로젝트 루트에 `jest.integration.config.js` 파일을 생성합니다:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.integration.ts?(x)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@vcut/(.*)$': '<rootDir>/packages/$1/src'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.js']
};
```

`jest.integration.setup.js` 파일을 생성합니다:

```javascript
// Jest 통합 테스트 설정
import '@testing-library/jest-dom';

// 전역 모의(mock) 설정
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
        }),
        // 기타 필요한 메서드 모의
      };
    })
  };
});
```

### 통합 테스트 예제

`packages/editor-page/__tests__/EditorPage.integration.tsx` 파일을 생성합니다:

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorPage, EditorPageProvider } from '@vcut/editor-page';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { FFmpegService } from '@vcut/ffmpeg-service';

// 모의 서비스 인스턴스
const mockMcpFactory = new MCPServiceFactory();
const mockFfmpegService = new FFmpegService();

describe('EditorPage 통합 테스트', () => {
  test('EditorPage가 모든 필수 컴포넌트를 렌더링해야 함', () => {
    render(
      <EditorPageProvider
        mcpFactory={mockMcpFactory}
        ffmpegService={mockFfmpegService}
      >
        <EditorPage />
      </EditorPageProvider>
    );
    
    // 필수 UI 요소 확인
    expect(screen.getByTestId('preview-player')).toBeInTheDocument();
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });
  
  test('타임라인에 클립을 추가하면 미리보기 플레이어에 반영되어야 함', () => {
    render(
      <EditorPageProvider
        mcpFactory={mockMcpFactory}
        ffmpegService={mockFfmpegService}
      >
        <EditorPage />
      </EditorPageProvider>
    );
    
    // 미디어 추가 버튼 클릭
    fireEvent.click(screen.getByTestId('add-media-button'));
    
    // 미디어 선택 모달에서 비디오 선택
    fireEvent.click(screen.getByTestId('select-video-button'));
    
    // 타임라인에 클립이 추가되었는지 확인
    expect(screen.getByTestId('timeline-clip')).toBeInTheDocument();
    
    // 미리보기 플레이어에 비디오가 로드되었는지 확인
    expect(screen.getByTestId('video-element')).toHaveAttribute('src');
  });
  
  // 추가 통합 테스트...
});
```

### 엔드 투 엔드 테스트 설정

Cypress를 사용한 E2E 테스트 설정:

1. Cypress 설치:

```bash
npm install --save-dev cypress
```

2. Cypress 설정 파일 생성 (`cypress.json`):

```json
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280,
  "viewportHeight": 720,
  "video": true,
  "screenshotOnRunFailure": true,
  "integrationFolder": "cypress/integration"
}
```

3. E2E 테스트 예제 (`cypress/integration/editor_workflow.spec.js`):

```javascript
describe('편집기 워크플로우', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('비디오를 가져오고 타임라인에 추가할 수 있어야 함', () => {
    // 미디어 추가 버튼 클릭
    cy.get('[data-testid=add-media-button]').click();
    
    // 파일 선택 (파일 업로드 시뮬레이션)
    cy.get('input[type=file]').attachFile('sample-video.mp4');
    
    // 타임라인에 클립이 추가되었는지 확인
    cy.get('[data-testid=timeline-clip]').should('exist');
    
    // 미리보기 플레이어에 비디오가 로드되었는지 확인
    cy.get('[data-testid=video-element]').should('have.attr', 'src');
  });
  
  it('타임라인에서 클립을 편집할 수 있어야 함', () => {
    // 미디어 추가
    cy.get('[data-testid=add-media-button]').click();
    cy.get('input[type=file]').attachFile('sample-video.mp4');
    
    // 타임라인 클립 선택
    cy.get('[data-testid=timeline-clip]').click();
    
    // 클립 자르기 도구 선택
    cy.get('[data-testid=cut-tool]').click();
    
    // 클립 분할 지점 설정
    cy.get('[data-testid=timeline-playhead]').invoke('css', 'left', '50%');
    
    // 분할 버튼 클릭
    cy.get('[data-testid=split-clip-button]').click();
    
    // 클립이 두 개로 분할되었는지 확인
    cy.get('[data-testid=timeline-clip]').should('have.length', 2);
  });
  
  // 추가 E2E 테스트...
});
```

## 수동 테스트

자동화된 테스트로 모든 시나리오를 커버하기 어려운 경우, 다음과 같은 수동 테스트 절차를 수행할 수 있습니다:

### 수동 테스트 체크리스트

1. **기본 기능 테스트**:
   - [ ] 애플리케이션이 오류 없이 시작되는지 확인
   - [ ] 모든 UI 컴포넌트가 올바르게 렌더링되는지 확인
   - [ ] 기본 레이아웃이 올바르게 표시되는지 확인

2. **미디어 가져오기 테스트**:
   - [ ] 다양한 형식의 비디오 파일 가져오기 (MP4, WebM, MOV 등)
   - [ ] 다양한 형식의 오디오 파일 가져오기 (MP3, WAV, AAC 등)
   - [ ] 대용량 미디어 파일 가져오기 (1GB 이상)
   - [ ] 손상된 미디어 파일 가져오기 시 오류 처리 확인

3. **타임라인 편집 테스트**:
   - [ ] 클립 추가 및 제거
   - [ ] 클립 이동 및 크기 조정
   - [ ] 클립 분할 및 병합
   - [ ] 다중 트랙 편집
   - [ ] 클립 속성 편집 (속도, 볼륨 등)

4. **효과 및 전환 테스트**:
   - [ ] 비디오 효과 적용 (밝기, 대비, 채도 등)
   - [ ] 오디오 효과 적용 (이퀄라이저, 페이드 등)
   - [ ] 전환 효과 적용 (페이드, 디졸브, 와이프 등)
   - [ ] 텍스트 및 자막 추가

5. **재생 및 미리보기 테스트**:
   - [ ] 기본 재생 제어 (재생, 일시 정지, 정지)
   - [ ] 시크 및 프레임 이동
   - [ ] 루프 재생
   - [ ] 전체 화면 재생
   - [ ] 재생 속도 조절

6. **내보내기 테스트**:
   - [ ] 다양한 해상도로 내보내기 (720p, 1080p, 4K)
   - [ ] 다양한 형식으로 내보내기 (MP4, WebM, GIF 등)
   - [ ] 다양한 품질 설정으로 내보내기
   - [ ] 오디오만 내보내기

7. **성능 테스트**:
   - [ ] 대용량 프로젝트 로딩 시간
   - [ ] 실시간 미리보기 성능
   - [ ] 메모리 사용량
   - [ ] CPU 사용량

### 수동 테스트 보고서 템플릿

```markdown
# vCut 수동 테스트 보고서

## 테스트 정보
- 테스트 날짜: YYYY-MM-DD
- 테스터: 이름
- 테스트 환경: OS, 브라우저, 버전 등

## 테스트 결과 요약
- 통과: X/Y 테스트 케이스
- 실패: Z 테스트 케이스
- 주요 이슈: 간략한 설명

## 상세 테스트 결과

### 1. 기본 기능 테스트
- [ ] 애플리케이션 시작: 통과/실패
  - 설명: ...
- [ ] UI 컴포넌트 렌더링: 통과/실패
  - 설명: ...
- [ ] 기본 레이아웃: 통과/실패
  - 설명: ...

### 2. 미디어 가져오기 테스트
...

## 발견된 이슈
1. 이슈 제목
   - 심각도: 높음/중간/낮음
   - 설명: 상세 설명
   - 재현 단계: 단계별 설명
   - 예상 결과: ...
   - 실제 결과: ...

2. 이슈 제목
   ...

## 개선 제안
1. 제안 제목
   - 설명: 상세 설명
   - 이점: 예상되는 이점

2. 제안 제목
   ...
```

## 테스트 시나리오

다음은 vCut 애플리케이션의 주요 사용자 시나리오에 대한 통합 테스트 시나리오입니다:

### 시나리오 1: 기본 비디오 편집 워크플로우

1. 애플리케이션 시작
2. 새 프로젝트 생성
3. 비디오 파일 가져오기
4. 타임라인에 비디오 추가
5. 비디오 클립 트리밍
6. 기본 효과 적용 (밝기 조정)
7. 결과물 미리보기
8. MP4 형식으로 내보내기
9. 내보낸 파일 확인

### 시나리오 2: 멀티트랙 편집 워크플로우

1. 애플리케이션 시작
2. 새 프로젝트 생성
3. 여러 비디오 파일 가져오기
4. 타임라인에 비디오 추가 (여러 트랙)
5. 클립 간 전환 효과 추가
6. 배경 음악 추가
7. 오디오 레벨 조정
8. 결과물 미리보기
9. 고품질 설정으로 내보내기
10. 내보낸 파일 확인

### 시나리오 3: 오디오 편집 워크플로우

1. 애플리케이션 시작
2. 새 프로젝트 생성
3. 오디오 파일 가져오기
4. 타임라인에 오디오 추가
5. 오디오 클립 트리밍 및 페이드 추가
6. 볼륨 레벨 조정
7. 오디오 효과 적용 (이퀄라이저)
8. 결과물 미리보기
9. MP3 형식으로 내보내기
10. 내보낸 파일 확인

## 문제 해결

통합 테스트 중 발생할 수 있는 일반적인 문제와 해결 방법:

### 패키지 간 의존성 문제

**문제**: 패키지 A가 패키지 B의 최신 버전에 의존하지만, 로컬 환경에서는 이전 버전이 설치됨

**해결 방법**:
1. 모든 패키지를 최신 버전으로 빌드:
   ```bash
   yarn build
   ```
2. 의존성 캐시 정리:
   ```bash
   yarn clean
   yarn install
   ```

### FFmpeg 관련 문제

**문제**: ffmpeg-service 패키지가 FFmpeg 바이너리를 찾지 못함

**해결 방법**:
1. FFmpeg가 설치되어 있는지 확인:
   ```bash
   ffmpeg -version
   ```
2. 환경 변수에 FFmpeg 경로 추가
3. ffmpeg-service 패키지의 설정 파일에서 FFmpeg 경로 직접 지정

### 렌더링 성능 문제

**문제**: 복잡한 프로젝트에서 미리보기 렌더링이 느림

**해결 방법**:
1. 미리보기 해상도 낮추기
2. 캐싱 메커니즘 확인
3. 불필요한 렌더링 최소화 (React 최적화 기법 적용)

## CI/CD 통합

지속적 통합 및 배포 파이프라인에 통합 테스트를 포함하는 방법:

### GitHub Actions 설정 예제

`.github/workflows/integration-test.yml` 파일을 생성합니다:

```yaml
name: Integration Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  integration-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'yarn'
    
    - name: Install FFmpeg
      run: |
        sudo apt-get update
        sudo apt-get install -y ffmpeg
    
    - name: Install dependencies
      run: yarn install
    
    - name: Build packages
      run: yarn build
    
    - name: Run integration tests
      run: yarn test:integration
    
    - name: Start app for E2E tests
      run: yarn start & npx wait-on http://localhost:3000
    
    - name: Run E2E tests
      run: yarn test:e2e
    
    - name: Upload test artifacts
      uses: actions/upload-artifact@v2
      if: always()
      with:
        name: test-results
        path: |
          cypress/videos
          cypress/screenshots
```

### Jenkins 파이프라인 설정 예제

`Jenkinsfile`을 생성합니다:

```groovy
pipeline {
    agent {
        docker {
            image 'node:16'
            args '-p 3000:3000'
        }
    }
    
    stages {
        stage('Setup') {
            steps {
                sh 'apt-get update && apt-get install -y ffmpeg'
                sh 'yarn install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'yarn test:integration'
            }
        }
        
        stage('E2E Tests') {
            steps {
                sh 'yarn start & npx wait-on http://localhost:3000'
                sh 'yarn test:e2e'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
        }
    }
}
```

## 결론

vCut 프로젝트의 통합 테스트는 다양한 패키지가 함께 원활하게 작동하는지 확인하는 중요한 단계입니다. 이 문서에서 설명한 자동화된 테스트와 수동 테스트 방법을 조합하여 사용하면 애플리케이션의 품질과 안정성을 크게 향상시킬 수 있습니다.

통합 테스트는 개발 초기 단계부터 지속적으로 수행하여 문제를 조기에 발견하고 해결하는 것이 중요합니다. 또한, CI/CD 파이프라인에 통합 테스트를 포함하여 코드 변경이 전체 애플리케이션에 미치는 영향을 자동으로 확인할 수 있습니다.
