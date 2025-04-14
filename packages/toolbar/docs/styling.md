# vCut Toolbar 스타일링 가이드

이 문서는 vCut Toolbar 패키지의 스타일링 방법과 CSS 클래스 구조를 설명합니다.

## 목차

- [기본 스타일링](#기본-스타일링)
- [CSS 클래스 구조](#css-클래스-구조)
- [커스터마이징](#커스터마이징)
- [테마 적용](#테마-적용)
- [반응형 디자인](#반응형-디자인)

## 기본 스타일링

vCut Toolbar 패키지는 기본적으로 다크 테마 스타일을 제공합니다. 이 스타일은 다음 파일들에 정의되어 있습니다:

- `Toolbar.css`: 툴바 컨테이너의 스타일
- `ToolbarGroup.css`: 툴바 그룹의 스타일
- `ToolbarItem.css`: 툴바 아이템의 스타일

## CSS 클래스 구조

### Toolbar 컴포넌트

```css
.vcut-toolbar                /* 기본 클래스 */
.vcut-toolbar.horizontal     /* 가로 방향 */
.vcut-toolbar.vertical       /* 세로 방향 */
.vcut-toolbar.top            /* 상단 위치 */
.vcut-toolbar.bottom         /* 하단 위치 */
.vcut-toolbar.left           /* 좌측 위치 */
.vcut-toolbar.right          /* 우측 위치 */
.vcut-toolbar.small          /* 작은 크기 */
.vcut-toolbar.medium         /* 중간 크기 */
.vcut-toolbar.large          /* 큰 크기 */
```

### ToolbarGroup 컴포넌트

```css
.vcut-toolbar-group                      /* 기본 클래스 */
.vcut-toolbar-group-label                /* 그룹 레이블 */
.vcut-toolbar-group-items                /* 그룹 아이템 컨테이너 */
.vcut-toolbar.horizontal .vcut-toolbar-group        /* 가로 방향 그룹 */
.vcut-toolbar.vertical .vcut-toolbar-group          /* 세로 방향 그룹 */
.vcut-toolbar.horizontal .vcut-toolbar-group-items  /* 가로 방향 그룹 아이템 */
.vcut-toolbar.vertical .vcut-toolbar-group-items    /* 세로 방향 그룹 아이템 */
```

### ToolbarItem 컴포넌트

```css
.vcut-toolbar-item                 /* 기본 클래스 */
.vcut-toolbar-item.active          /* 활성화된 아이템 */
.vcut-toolbar-item.disabled        /* 비활성화된 아이템 */
.vcut-toolbar-item-icon            /* 아이템 아이콘 */
.vcut-toolbar-item-label           /* 아이템 레이블 */
.vcut-toolbar-item-shortcut        /* 아이템 단축키 */
```

## 커스터마이징

### CSS 변수 오버라이드

vCut Toolbar는 CSS 변수를 사용하여 스타일을 정의하지는 않지만, 다음과 같이 CSS 클래스를 오버라이드하여 스타일을 변경할 수 있습니다:

```css
/* 툴바 배경색 변경 */
.vcut-toolbar {
  background-color: #333;
}

/* 활성화된 아이템 배경색 변경 */
.vcut-toolbar-item.active {
  background-color: rgba(0, 120, 215, 0.3);
}

/* 아이템 호버 효과 변경 */
.vcut-toolbar-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
```

### 클래스 확장

Toolbar 컴포넌트의 `className` prop을 사용하여 커스텀 클래스를 추가할 수 있습니다:

```tsx
<Toolbar className="my-custom-toolbar" />
```

그런 다음 CSS에서 해당 클래스를 사용하여 스타일을 변경할 수 있습니다:

```css
.my-custom-toolbar {
  background-color: #222;
  border-radius: 8px;
}

.my-custom-toolbar .vcut-toolbar-item {
  border-radius: 4px;
}
```

## 테마 적용

### 라이트 테마 예시

다음은 라이트 테마를 적용하는 CSS 예시입니다:

```css
.vcut-toolbar.light-theme {
  background-color: #f5f5f5;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.vcut-toolbar.light-theme .vcut-toolbar-group-label {
  color: #666;
}

.vcut-toolbar.light-theme .vcut-toolbar-item {
  color: #333;
}

.vcut-toolbar.light-theme .vcut-toolbar-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.vcut-toolbar.light-theme .vcut-toolbar-item.active {
  background-color: rgba(0, 120, 215, 0.1);
}

.vcut-toolbar.light-theme .vcut-toolbar-item-shortcut {
  background-color: rgba(0, 0, 0, 0.05);
}
```

적용 방법:

```tsx
<Toolbar className="light-theme" />
```

## 반응형 디자인

### 모바일 최적화 예시

작은 화면에서 툴바를 최적화하는 CSS 예시:

```css
@media (max-width: 768px) {
  .vcut-toolbar {
    flex-wrap: wrap;
  }
  
  .vcut-toolbar-group {
    margin: 4px;
  }
  
  .vcut-toolbar-item-label {
    display: none;
  }
  
  .vcut-toolbar-item-shortcut {
    display: none;
  }
  
  .vcut-toolbar-item {
    padding: 8px;
  }
  
  .vcut-toolbar-item-icon {
    margin-right: 0;
  }
}
```

### 툴바 접기/펼치기

툴바를 접고 펼칠 수 있는 기능을 구현하려면 다음과 같은 CSS와 JavaScript 로직을 사용할 수 있습니다:

```css
.vcut-toolbar.collapsed .vcut-toolbar-item-label,
.vcut-toolbar.collapsed .vcut-toolbar-item-shortcut,
.vcut-toolbar.collapsed .vcut-toolbar-group-label {
  display: none;
}

.vcut-toolbar.collapsed .vcut-toolbar-item {
  padding: 8px;
}

.vcut-toolbar.collapsed .vcut-toolbar-item-icon {
  margin-right: 0;
}
```

적용 방법:

```tsx
const [collapsed, setCollapsed] = useState(false);

<Toolbar className={collapsed ? 'collapsed' : ''} />
<button onClick={() => setCollapsed(!collapsed)}>
  {collapsed ? '펼치기' : '접기'}
</button>
```
