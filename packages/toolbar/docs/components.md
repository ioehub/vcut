# vCut Toolbar 컴포넌트 API

이 문서는 vCut Toolbar 패키지에서 제공하는 컴포넌트들의 API를 설명합니다.

## 목차

- [Toolbar](#toolbar)
- [ToolbarGroup](#toolbargroup)
- [ToolbarItem](#toolbaritem)

## Toolbar

`Toolbar` 컴포넌트는 툴바의 메인 컨테이너입니다. 이 컴포넌트는 등록된 모든 툴바 아이템을 그룹별로 표시합니다.

### Props

| 속성 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `className` | `string` | `''` | 추가적인 CSS 클래스명 |
| `style` | `React.CSSProperties` | `undefined` | 인라인 스타일 객체 |

### 사용 예시

```tsx
import { Toolbar } from '@vcut/toolbar';

// 기본 사용법
<Toolbar />

// 커스텀 클래스 및 스타일 적용
<Toolbar 
  className="my-custom-toolbar" 
  style={{ backgroundColor: '#333' }} 
/>
```

### 렌더링 결과

`Toolbar` 컴포넌트는 다음과 같은 HTML 구조로 렌더링됩니다:

```html
<div class="vcut-toolbar horizontal top medium" role="toolbar" aria-orientation="horizontal">
  <!-- ToolbarGroup 컴포넌트들 -->
</div>
```

### 스타일링

`Toolbar` 컴포넌트는 다음과 같은 CSS 클래스를 사용합니다:

- `vcut-toolbar`: 기본 클래스
- `horizontal` / `vertical`: 방향에 따른 클래스
- `top` / `bottom` / `left` / `right`: 위치에 따른 클래스
- `small` / `medium` / `large`: 크기에 따른 클래스

## ToolbarGroup

`ToolbarGroup` 컴포넌트는 관련된 툴바 아이템들을 그룹화하여 표시합니다.

### Props

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `group` | `ToolbarGroup` | 예 | 툴바 그룹 객체 |

### 사용 예시

일반적으로 `ToolbarGroup` 컴포넌트는 직접 사용하지 않고, `Toolbar` 컴포넌트 내부에서 자동으로 렌더링됩니다. 그룹은 툴바 아이템을 등록할 때 지정한 `group` 속성에 따라 자동으로 생성됩니다.

```tsx
// 아이템 등록 시 그룹 지정
registerItem({
  id: 'cut',
  label: '자르기',
  icon: '✂️',
  action: () => console.log('자르기'),
  group: '편집' // 이 아이템은 '편집' 그룹에 표시됩니다
});
```

### 렌더링 결과

`ToolbarGroup` 컴포넌트는 다음과 같은 HTML 구조로 렌더링됩니다:

```html
<div class="vcut-toolbar-group" role="group" aria-label="편집">
  <div class="vcut-toolbar-group-label">편집</div>
  <div class="vcut-toolbar-group-items">
    <!-- ToolbarItem 컴포넌트들 -->
  </div>
</div>
```

## ToolbarItem

`ToolbarItem` 컴포넌트는 개별 툴바 아이템을 표시합니다.

### Props

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `item` | `ToolbarItem` | 예 | 툴바 아이템 객체 |

### 사용 예시

일반적으로 `ToolbarItem` 컴포넌트는 직접 사용하지 않고, `ToolbarGroup` 컴포넌트 내부에서 자동으로 렌더링됩니다.

### 렌더링 결과

`ToolbarItem` 컴포넌트는 다음과 같은 HTML 구조로 렌더링됩니다:

```html
<button class="vcut-toolbar-item" title="자르기" aria-label="자르기" data-shortcut="Ctrl+X">
  <span class="vcut-toolbar-item-icon">✂️</span>
  <span class="vcut-toolbar-item-label">자르기</span>
  <span class="vcut-toolbar-item-shortcut">Ctrl+X</span>
</button>
```

### 상태 클래스

`ToolbarItem` 컴포넌트는 다음과 같은 상태에 따른 CSS 클래스를 가질 수 있습니다:

- `active`: 활성화된 아이템
- `disabled`: 비활성화된 아이템
