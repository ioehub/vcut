# vCut Toolbar 타입 정의

이 문서는 vCut Toolbar 패키지에서 사용되는 TypeScript 타입 정의를 설명합니다.

## 목차

- [ToolbarItem](#toolbaritem)
- [ToolbarGroup](#toolbargroup)
- [ToolbarConfig](#toolbarconfig)
- [ToolbarState](#toolbarstate)
- [ToolbarContextType](#toolbarcontexttype)

## ToolbarItem

`ToolbarItem` 인터페이스는 툴바의 개별 아이템을 정의합니다.

```typescript
interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
  tooltip?: string;
  shortcut?: string;
  group?: string;
}
```

### 속성

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `string` | 예 | 아이템의 고유 식별자 |
| `label` | `string` | 예 | 아이템의 표시 레이블 |
| `icon` | `string` | 예 | 아이템의 아이콘 (이모지 또는 아이콘 클래스명) |
| `action` | `() => void` | 예 | 아이템 클릭 시 실행할 함수 |
| `disabled` | `boolean` | 아니오 | 아이템 비활성화 여부 |
| `tooltip` | `string` | 아니오 | 아이템에 마우스 오버 시 표시할 툴팁 |
| `shortcut` | `string` | 아니오 | 아이템의 키보드 단축키 |
| `group` | `string` | 아니오 | 아이템이 속한 그룹 ID |

### 사용 예시

```typescript
const cutItem: ToolbarItem = {
  id: 'cut',
  label: '자르기',
  icon: '✂️',
  action: () => console.log('자르기 실행'),
  tooltip: '비디오 클립 자르기',
  shortcut: 'Ctrl+X',
  group: '편집'
};
```

## ToolbarGroup

`ToolbarGroup` 인터페이스는 관련된 툴바 아이템들의 그룹을 정의합니다.

```typescript
interface ToolbarGroup {
  id: string;
  label: string;
  items: ToolbarItem[];
}
```

### 속성

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `string` | 예 | 그룹의 고유 식별자 |
| `label` | `string` | 예 | 그룹의 표시 레이블 |
| `items` | `ToolbarItem[]` | 예 | 그룹에 속한 툴바 아이템 배열 |

### 사용 예시

```typescript
const editGroup: ToolbarGroup = {
  id: 'edit',
  label: '편집',
  items: [
    {
      id: 'cut',
      label: '자르기',
      icon: '✂️',
      action: () => console.log('자르기 실행'),
      tooltip: '비디오 클립 자르기',
      shortcut: 'Ctrl+X'
    },
    {
      id: 'copy',
      label: '복사',
      icon: '📋',
      action: () => console.log('복사 실행'),
      tooltip: '비디오 클립 복사',
      shortcut: 'Ctrl+C'
    }
  ]
};
```

## ToolbarConfig

`ToolbarConfig` 인터페이스는 툴바의 전체 구성을 정의합니다.

```typescript
interface ToolbarConfig {
  groups: ToolbarGroup[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'left' | 'right';
}
```

### 속성

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `groups` | `ToolbarGroup[]` | 예 | 툴바에 표시할 그룹 배열 |
| `orientation` | `'horizontal' \| 'vertical'` | 아니오 | 툴바의 방향 (기본값: 'horizontal') |
| `size` | `'small' \| 'medium' \| 'large'` | 아니오 | 툴바의 크기 (기본값: 'medium') |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | 아니오 | 툴바의 위치 (기본값: 'top') |

### 사용 예시

```typescript
const toolbarConfig: ToolbarConfig = {
  groups: [editGroup, effectsGroup],
  orientation: 'horizontal',
  size: 'medium',
  position: 'top'
};
```

## ToolbarState

`ToolbarState` 인터페이스는 툴바의 현재 상태를 정의합니다.

```typescript
interface ToolbarState {
  config: ToolbarConfig;
  activeItem: string | null;
}
```

### 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `config` | `ToolbarConfig` | 툴바의 현재 구성 |
| `activeItem` | `string \| null` | 현재 활성화된 아이템의 ID 또는 null |

### 사용 예시

```typescript
const toolbarState: ToolbarState = {
  config: {
    groups: [editGroup, effectsGroup],
    orientation: 'horizontal',
    size: 'medium',
    position: 'top'
  },
  activeItem: 'cut'
};
```

## ToolbarContextType

`ToolbarContextType` 인터페이스는 툴바 컨텍스트에서 제공하는 상태와 액션을 정의합니다.

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

### 속성

| 속성 | 타입 | 설명 |
|------|------|------|
| `state` | `ToolbarState` | 툴바의 현재 상태 |
| `registerItem` | `(item: ToolbarItem) => void` | 툴바에 새 아이템을 등록하는 함수 |
| `unregisterItem` | `(id: string) => void` | ID로 툴바 아이템을 해제하는 함수 |
| `setActiveItem` | `(id: string \| null) => void` | 활성화된 툴바 아이템을 설정하는 함수 |
| `executeAction` | `(id: string) => void` | ID로 툴바 아이템의 액션을 실행하는 함수 |
| `updateItemState` | `(id: string, updates: Partial<ToolbarItem>) => void` | ID로 툴바 아이템의 상태를 업데이트하는 함수 |

### 사용 예시

```typescript
import { useToolbar } from '@vcut/toolbar';

const MyComponent = () => {
  const { 
    state, 
    registerItem, 
    unregisterItem, 
    setActiveItem, 
    executeAction, 
    updateItemState 
  } = useToolbar();
  
  // 컨텍스트 사용
  // ...
};
```
