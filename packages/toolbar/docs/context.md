# vCut Toolbar 컨텍스트 API

이 문서는 vCut Toolbar 패키지에서 제공하는 컨텍스트 API를 설명합니다.

## 목차

- [ToolbarProvider](#toolbarprovider)
- [useToolbar](#usetoolbar)
- [컨텍스트 상태](#컨텍스트-상태)
- [컨텍스트 액션](#컨텍스트-액션)
- [사용 예시](#사용-예시)

## ToolbarProvider

`ToolbarProvider`는 툴바의 상태를 관리하고 하위 컴포넌트에 컨텍스트를 제공하는 컴포넌트입니다.

### Props

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `children` | `ReactNode` | 예 | 하위 컴포넌트 |

### 사용 예시

```tsx
import { ToolbarProvider } from '@vcut/toolbar';

const App = () => {
  return (
    <ToolbarProvider>
      {/* 툴바를 사용하는 컴포넌트들 */}
    </ToolbarProvider>
  );
};
```

## useToolbar

`useToolbar`는 툴바 컨텍스트에 접근하기 위한 React 훅입니다.

### 반환값

`useToolbar` 훅은 `ToolbarContextType` 객체를 반환합니다:

```typescript
interface ToolbarContextType {
  state: ToolbarState;
  registerItem: (item: ToolbarItem) => void;
  unregisterItem: (id: string) => void;
  setActiveItem: (id: string | null) => void;
  executeAction: (id: string) => void;
  updateItemState: (id: string, updates: Partial<ToolbarItem>) => void;
}
```

### 사용 예시

```tsx
import { useToolbar } from '@vcut/toolbar';

const MyComponent = () => {
  const { state, registerItem, executeAction } = useToolbar();
  
  // 컨텍스트 사용
  // ...
  
  return (
    // ...
  );
};
```

## 컨텍스트 상태

툴바 컨텍스트는 다음과 같은 상태를 관리합니다:

```typescript
interface ToolbarState {
  config: ToolbarConfig;
  activeItem: string | null;
}

interface ToolbarConfig {
  groups: ToolbarGroup[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'left' | 'right';
}
```

### 상태 접근 예시

```tsx
const { state } = useToolbar();

// 현재 활성화된 아이템 ID
console.log(state.activeItem);

// 툴바 방향
console.log(state.config.orientation);

// 툴바 그룹 목록
console.log(state.config.groups);
```

## 컨텍스트 액션

툴바 컨텍스트는 다음과 같은 액션을 제공합니다:

### registerItem

툴바에 새 아이템을 등록합니다.

```typescript
function registerItem(item: ToolbarItem): void
```

#### 매개변수

- `item`: 등록할 툴바 아이템 객체

#### 사용 예시

```tsx
const { registerItem } = useToolbar();

registerItem({
  id: 'cut',
  label: '자르기',
  icon: '✂️',
  action: () => console.log('자르기 실행'),
  tooltip: '비디오 클립 자르기',
  shortcut: 'Ctrl+X',
  group: '편집'
});
```

### unregisterItem

ID로 툴바 아이템을 해제합니다.

```typescript
function unregisterItem(id: string): void
```

#### 매개변수

- `id`: 해제할 툴바 아이템의 ID

#### 사용 예시

```tsx
const { unregisterItem } = useToolbar();

unregisterItem('cut');
```

### setActiveItem

활성화된 툴바 아이템을 설정합니다.

```typescript
function setActiveItem(id: string | null): void
```

#### 매개변수

- `id`: 활성화할 툴바 아이템의 ID, 또는 활성화된 아이템이 없음을 나타내는 `null`

#### 사용 예시

```tsx
const { setActiveItem } = useToolbar();

// 아이템 활성화
setActiveItem('cut');

// 활성화된 아이템 해제
setActiveItem(null);
```

### executeAction

ID로 툴바 아이템의 액션을 실행합니다.

```typescript
function executeAction(id: string): void
```

#### 매개변수

- `id`: 액션을 실행할 툴바 아이템의 ID

#### 사용 예시

```tsx
const { executeAction } = useToolbar();

executeAction('cut');
```

### updateItemState

ID로 툴바 아이템의 상태를 업데이트합니다.

```typescript
function updateItemState(id: string, updates: Partial<ToolbarItem>): void
```

#### 매개변수

- `id`: 업데이트할 툴바 아이템의 ID
- `updates`: 업데이트할 속성들의 부분 객체

#### 사용 예시

```tsx
const { updateItemState } = useToolbar();

// 아이템 비활성화
updateItemState('cut', { disabled: true });

// 아이템 레이블 변경
updateItemState('cut', { label: '잘라내기' });
```

## 사용 예시

다음은 툴바 컨텍스트를 사용하는 전체 예시입니다:

```tsx
import React, { useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const VideoEditor = () => {
  const { registerItem, unregisterItem, executeAction, updateItemState } = useToolbar();
  
  useEffect(() => {
    // 툴바 아이템 등록
    const items = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => handleCut(),
        tooltip: '비디오 클립 자르기',
        shortcut: 'Ctrl+X',
        group: '편집'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => handleCopy(),
        tooltip: '비디오 클립 복사',
        shortcut: 'Ctrl+C',
        group: '편집'
      }
    ];
    
    items.forEach(item => registerItem(item));
    
    // 컴포넌트 언마운트 시 아이템 해제
    return () => {
      items.forEach(item => unregisterItem(item.id));
    };
  }, []);
  
  const handleCut = () => {
    console.log('자르기 실행');
    // 자르기 로직 구현
  };
  
  const handleCopy = () => {
    console.log('복사 실행');
    // 복사 로직 구현
  };
  
  const handleDisableCut = () => {
    updateItemState('cut', { disabled: true });
  };
  
  return (
    <div>
      <Toolbar />
      <button onClick={() => executeAction('cut')}>자르기 실행</button>
      <button onClick={handleDisableCut}>자르기 비활성화</button>
      <div>비디오 편집 영역</div>
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <VideoEditor />
    </ToolbarProvider>
  );
};

export default App;
```
