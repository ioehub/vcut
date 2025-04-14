# vCut Toolbar 개발 가이드

이 문서는 vCut Toolbar 패키지의 개발 및 확장에 관한 가이드라인을 제공합니다.

## 목차

- [개발 환경 설정](#개발-환경-설정)
- [아키텍처 개요](#아키텍처-개요)
- [새 기능 추가](#새-기능-추가)
- [테스트](#테스트)
- [빌드 및 배포](#빌드-및-배포)
- [기여 가이드라인](#기여-가이드라인)

## 개발 환경 설정

### 필수 요구사항

- Node.js 14.0.0 이상
- npm 6.0.0 이상

### 로컬 개발 환경 설정

1. 저장소 클론:

```bash
git clone <repository-url>
cd vcut
```

2. 의존성 설치:

```bash
# 루트 디렉토리에서
npm install

# 또는 toolbar 패키지만 설치
cd packages/toolbar
npm install
```

3. 개발 서버 실행:

```bash
# toolbar 패키지 디렉토리에서
npm run dev
```

이제 `http://localhost:5173`(또는 다른 사용 가능한 포트)에서 개발 서버가 실행됩니다.

## 아키텍처 개요

vCut Toolbar 패키지는 다음과 같은 구조로 구성되어 있습니다:

```
toolbar/
├── docs/               # 문서
├── src/                # 소스 코드
│   ├── components/     # React 컴포넌트
│   ├── context/        # React 컨텍스트
│   ├── styles/         # CSS 스타일
│   ├── index.ts        # 메인 엔트리 포인트
│   ├── main.tsx        # 개발 서버용 엔트리 포인트
│   └── types.ts        # TypeScript 타입 정의
├── index.html          # 개발 서버용 HTML
├── package.json        # 패키지 정보 및 의존성
├── tsconfig.json       # TypeScript 설정
├── tsconfig.node.json  # Node.js용 TypeScript 설정
└── vite.config.ts      # Vite 설정
```

### 주요 컴포넌트

- **Toolbar**: 메인 툴바 컨테이너 컴포넌트
- **ToolbarGroup**: 툴바 아이템 그룹 컴포넌트
- **ToolbarItem**: 개별 툴바 아이템 컴포넌트

### 상태 관리

상태 관리는 React Context API를 사용하여 구현되어 있습니다:

- **ToolbarContext**: 툴바 상태 및 액션을 관리하는 컨텍스트
- **ToolbarProvider**: 컨텍스트 프로바이더 컴포넌트
- **useToolbar**: 컨텍스트 훅

## 새 기능 추가

### 새 툴바 아이템 유형 추가

1. `types.ts`에 새 타입 정의 추가:

```typescript
// 예: 토글 가능한 툴바 아이템
interface ToggleableToolbarItem extends ToolbarItem {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
}
```

2. `ToolbarItem.tsx` 컴포넌트 확장:

```typescript
const ToolbarItem: React.FC<ToolbarItemProps> = ({ item }) => {
  // 기존 코드...
  
  // 토글 가능한 아이템인지 확인
  const isToggleable = 'toggled' in item;
  
  if (isToggleable) {
    const toggleableItem = item as ToggleableToolbarItem;
    
    // 토글 가능한 아이템 렌더링
    return (
      <button
        className={`vcut-toolbar-item ${isActive ? 'active' : ''} ${toggleableItem.toggled ? 'toggled' : ''}`}
        onClick={() => {
          toggleableItem.onToggle(!toggleableItem.toggled);
          executeAction(item.id);
        }}
        // 기타 속성...
      >
        {/* 아이템 내용 */}
      </button>
    );
  }
  
  // 기존 아이템 렌더링
  return (
    // 기존 코드...
  );
};
```

3. 필요한 CSS 스타일 추가:

```css
.vcut-toolbar-item.toggled {
  background-color: rgba(66, 133, 244, 0.3);
}
```

### 새 툴바 레이아웃 추가

1. `types.ts`에 새 레이아웃 옵션 추가:

```typescript
interface ToolbarConfig {
  // 기존 속성...
  layout?: 'default' | 'compact' | 'expanded';
}
```

2. `Toolbar.tsx` 컴포넌트 업데이트:

```typescript
const Toolbar: React.FC<ToolbarProps> = ({ className = '', style }) => {
  const { state } = useToolbar();
  const { config } = state;
  
  const toolbarClassName = `vcut-toolbar ${config.orientation || 'horizontal'} ${config.position || 'top'} ${config.size || 'medium'} ${config.layout || 'default'} ${className}`.trim();
  
  // 레이아웃에 따른 추가 로직...
  
  return (
    <div className={toolbarClassName} style={style} role="toolbar" aria-orientation={config.orientation}>
      {/* 컴포넌트 내용 */}
    </div>
  );
};
```

3. 필요한 CSS 스타일 추가:

```css
.vcut-toolbar.compact .vcut-toolbar-item-label {
  display: none;
}

.vcut-toolbar.expanded .vcut-toolbar-item {
  padding: 10px 16px;
}
```

## 테스트

### 단위 테스트

Jest와 React Testing Library를 사용하여 단위 테스트를 작성할 수 있습니다:

```typescript
// src/components/__tests__/Toolbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toolbar, ToolbarProvider } from '../../index';

describe('Toolbar', () => {
  it('renders without crashing', () => {
    render(
      <ToolbarProvider>
        <Toolbar />
      </ToolbarProvider>
    );
    
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });
  
  // 추가 테스트...
});
```

### 테스트 실행

```bash
npm test
```

## 빌드 및 배포

### 패키지 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 패키지 배포

패키지를 배포하기 전에 버전을 업데이트하세요:

```bash
npm version patch # 또는 minor, major
```

그런 다음 패키지를 배포할 수 있습니다:

```bash
npm publish
```

## 기여 가이드라인

### 코드 스타일

- TypeScript 타입을 엄격하게 사용하세요.
- 함수형 컴포넌트와 React 훅을 사용하세요.
- 컴포넌트는 가능한 작고 단일 책임을 가지도록 설계하세요.

### 커밋 메시지

커밋 메시지는 다음 형식을 따르는 것이 좋습니다:

```
<type>(<scope>): <subject>

<body>

<footer>
```

예시:

```
feat(toolbar): 토글 가능한 아이템 기능 추가

- 토글 상태를 관리하는 새로운 아이템 타입 추가
- 토글 상태에 따른 스타일링 추가
- 예제 및 문서 업데이트

Closes #123
```

### 풀 리퀘스트

1. 새 기능이나 버그 수정을 위한 브랜치를 생성하세요.
2. 변경 사항을 커밋하세요.
3. 테스트가 통과하는지 확인하세요.
4. 풀 리퀘스트를 생성하세요.

### 문서화

새로운 기능이나 변경 사항을 추가할 때는 항상 관련 문서를 업데이트하세요:

- 컴포넌트 API 문서
- 타입 정의 문서
- 예제 코드
- 개발 가이드
