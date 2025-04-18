# vCut Effects 패키지

## 개요
Effects 패키지는 vCut 비디오 편집기의 비디오 및 오디오 효과 관리 기능을 담당합니다. 이 패키지는 다양한 효과를 적용하고 관리하는 인터페이스를 제공합니다.

## 주요 기능
- 비디오 효과 적용 (색상 보정, 필터, 전환 효과 등)
- 오디오 효과 적용 (이퀄라이저, 페이드 인/아웃, 노이즈 감소 등)
- 효과 파라미터 조정 인터페이스
- 효과 프리셋 관리
- 실시간 효과 미리보기

## 구조
```
src/
├── components/           # React 컴포넌트
│   ├── EffectsPanel.tsx  # 효과 패널 컴포넌트
│   ├── EffectItem.tsx    # 개별 효과 항목 컴포넌트
│   ├── EffectControls.tsx # 효과 컨트롤 컴포넌트
│   └── EffectPresets.tsx # 효과 프리셋 컴포넌트
├── contexts/
│   └── EffectsContext.tsx # 효과 상태 관리 컨텍스트
├── services/
│   └── EffectsService.ts  # 효과 적용 서비스
├── types/
│   └── index.ts          # 타입 정의
└── index.ts             # 패키지 진입점
```

## 효과 타입
Effects 패키지는 다음과 같은 효과 타입을 지원합니다:

### 비디오 효과
- 색상 보정 (밝기, 대비, 채도, 색조)
- 필터 (흑백, 세피아, 빈티지, 드라마틱 등)
- 크로마키 (그린/블루 스크린)
- 블러 및 샤프닝
- 화면 분할 및 PIP (Picture-in-Picture)

### 오디오 효과
- 이퀄라이저
- 압축 및 노멀라이저
- 페이드 인/아웃
- 노이즈 감소
- 에코 및 리버브

## 기술 스택
- TypeScript
- React
- WebGL (비디오 효과 처리)
- Web Audio API (오디오 효과 처리)

## 빌드 설정 (2025-04-19 업데이트)
이 패키지는 Vite를 사용하여 빌드됩니다. 빌드 설정은 다음과 같습니다:
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VCutEffects',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
```

### 주요 빌드 특성
- **출력 형식**: ES 모듈 및 UMD
- **출력 파일명**: `index.es.js` 및 `index.umd.js`
- **TypeScript 선언 파일**: `index.d.ts`

## 패키지 통합
Effects 패키지는 vCut 프로젝트의 모노레포 구조에 통합되어 있으며, 다음과 같이 메인 앱에서 import됩니다:
```tsx
import { EffectsProvider } from '@vcut/effects';
```

## 최근 업데이트 (2025-04-19)
- 빌드 시스템 개선: 파일명 형식을 `vcut-effects`에서 `index.{format}.js`로 변경하여 모노레포 표준화
- 모듈 import 경로 최적화
- TypeScript 타입 선언 개선

## 사용 예시
```tsx
import { EffectsProvider, EffectsPanel } from '@vcut/effects';

function App() {
  return (
    <EffectsProvider>
      <div className="app-container">
        <div className="main-content">
          {/* 다른 앱 컴포넌트들 */}
        </div>
        <EffectsPanel />
      </div>
    </EffectsProvider>
  );
}
```

## 효과 적용 예시
```tsx
import { useEffects } from '@vcut/effects';

function VideoEditor() {
  const { applyEffect, removeEffect } = useEffects();
  
  const handleApplyBlur = () => {
    applyEffect('blur', { intensity: 5, radius: 10 });
  };
  
  return (
    <div>
      <button onClick={handleApplyBlur}>블러 효과 적용</button>
    </div>
  );
}
```
