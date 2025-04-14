# vCut Toolbar 패키지

vCut 비디오 편집기의 툴바 모듈입니다. 이 패키지는 비디오 편집 인터페이스에 필요한 다양한 도구들을 쉽게 구성하고 사용할 수 있는 컴포넌트와 기능을 제공합니다.

## 목차

- [개요](#개요)
- [설치](#설치)
- [기본 사용법](#기본-사용법)
- [컴포넌트](#컴포넌트)
- [컨텍스트 API](#컨텍스트-api)
- [타입](#타입)
- [스타일링](#스타일링)
- [예제](#예제)
- [개발 가이드](#개발-가이드)

## 개요

vCut Toolbar 패키지는 비디오 편집 인터페이스에서 사용자가 다양한 편집 도구에 쉽게 접근할 수 있도록 설계된 UI 컴포넌트 라이브러리입니다. 이 패키지는 다음과 같은 주요 기능을 제공합니다:

- 다양한 편집 도구를 그룹화하여 표시하는 툴바 컴포넌트
- 툴바 아이템의 상태 관리를 위한 컨텍스트 API
- 다양한 방향(가로/세로) 및 위치(상/하/좌/우) 지원
- 사용자 정의 가능한 스타일링
- 단축키 표시 기능

## 설치

프로젝트 내에서 다음 명령어를 실행하여 패키지를 설치할 수 있습니다:

```bash
npm install @vcut/toolbar
```

## 기본 사용법

기본적인 툴바 사용 예시:

```tsx
import React from 'react';
import { Toolbar, ToolbarProvider, useToolbar } from '@vcut/toolbar';

const MyComponent = () => {
  const { registerItem } = useToolbar();
  
  // 컴포넌트 마운트 시 툴바 아이템 등록
  React.useEffect(() => {
    const item = {
      id: 'cut-tool',
      label: '자르기',
      icon: '✂️',
      action: () => console.log('자르기 도구 실행'),
      tooltip: '비디오 클립 자르기',
      shortcut: 'Ctrl+X',
      group: '편집'
    };
    
    registerItem(item);
    
    // 컴포넌트 언마운트 시 아이템 해제
    return () => {
      unregisterItem(item.id);
    };
  }, []);
  
  return (
    <div>
      <h1>내 비디오 편집기</h1>
      <Toolbar />
      {/* 나머지 컴포넌트들 */}
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <MyComponent />
    </ToolbarProvider>
  );
};

export default App;
```

자세한 사용법은 [컴포넌트](#컴포넌트) 및 [예제](#예제) 섹션을 참조하세요.

## 관련 문서

- [컴포넌트 API](./components.md)
- [컨텍스트 API](./context.md)
- [타입 정의](./types.md)
- [스타일링 가이드](./styling.md)
- [예제 및 사용 사례](./examples.md)
- [개발 가이드](./development.md)
