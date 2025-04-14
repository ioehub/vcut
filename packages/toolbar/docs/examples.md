# vCut Toolbar 예제 및 사용 사례

이 문서는 vCut Toolbar 패키지의 다양한 사용 예제와 사례를 제공합니다.

## 목차

- [기본 사용법](#기본-사용법)
- [동적 툴바 아이템](#동적-툴바-아이템)
- [상태에 따른 아이템 비활성화](#상태에-따른-아이템-비활성화)
- [툴바 방향 및 위치 변경](#툴바-방향-및-위치-변경)
- [키보드 단축키 연동](#키보드-단축키-연동)
- [툴바와 다른 컴포넌트 연동](#툴바와-다른-컴포넌트-연동)

## 기본 사용법

가장 기본적인 툴바 사용 예제입니다.

```tsx
import React, { useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const VideoEditor = () => {
  const { registerItem, unregisterItem } = useToolbar();
  
  useEffect(() => {
    // 툴바 아이템 등록
    const items = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => console.log('자르기 실행'),
        tooltip: '비디오 클립 자르기',
        shortcut: 'Ctrl+X',
        group: '편집'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => console.log('복사 실행'),
        tooltip: '비디오 클립 복사',
        shortcut: 'Ctrl+C',
        group: '편집'
      },
      {
        id: 'paste',
        label: '붙여넣기',
        icon: '📌',
        action: () => console.log('붙여넣기 실행'),
        tooltip: '비디오 클립 붙여넣기',
        shortcut: 'Ctrl+V',
        group: '편집'
      }
    ];
    
    items.forEach(item => registerItem(item));
    
    // 컴포넌트 언마운트 시 아이템 해제
    return () => {
      items.forEach(item => unregisterItem(item.id));
    };
  }, []);
  
  return (
    <div>
      <Toolbar />
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

## 동적 툴바 아이템

상태에 따라 동적으로 툴바 아이템을 추가하거나 제거하는 예제입니다.

```tsx
import React, { useState, useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const DynamicToolbar = () => {
  const { registerItem, unregisterItem } = useToolbar();
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  
  // 기본 툴바 아이템
  useEffect(() => {
    const basicItems = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => console.log('자르기 실행'),
        group: '기본'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => console.log('복사 실행'),
        group: '기본'
      }
    ];
    
    basicItems.forEach(item => registerItem(item));
    
    return () => {
      basicItems.forEach(item => unregisterItem(item.id));
    };
  }, []);
  
  // 고급 툴바 아이템
  useEffect(() => {
    if (showAdvancedTools) {
      const advancedItems = [
        {
          id: 'effects',
          label: '효과',
          icon: '✨',
          action: () => console.log('효과 실행'),
          group: '고급'
        },
        {
          id: 'transitions',
          label: '전환',
          icon: '🔄',
          action: () => console.log('전환 실행'),
          group: '고급'
        }
      ];
      
      advancedItems.forEach(item => registerItem(item));
      
      return () => {
        advancedItems.forEach(item => unregisterItem(item.id));
      };
    }
  }, [showAdvancedTools]);
  
  return (
    <div>
      <Toolbar />
      <button onClick={() => setShowAdvancedTools(!showAdvancedTools)}>
        {showAdvancedTools ? '고급 도구 숨기기' : '고급 도구 표시'}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <DynamicToolbar />
    </ToolbarProvider>
  );
};

export default App;
```

## 상태에 따른 아이템 비활성화

특정 상태에 따라 툴바 아이템을 비활성화하는 예제입니다.

```tsx
import React, { useState, useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const ToolbarWithState = () => {
  const { registerItem, updateItemState } = useToolbar();
  const [hasSelection, setHasSelection] = useState(false);
  
  // 툴바 아이템 등록
  useEffect(() => {
    const items = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => console.log('자르기 실행'),
        disabled: !hasSelection,
        group: '편집'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => console.log('복사 실행'),
        disabled: !hasSelection,
        group: '편집'
      }
    ];
    
    items.forEach(item => registerItem(item));
  }, []);
  
  // 선택 상태가 변경될 때 아이템 상태 업데이트
  useEffect(() => {
    updateItemState('cut', { disabled: !hasSelection });
    updateItemState('copy', { disabled: !hasSelection });
  }, [hasSelection]);
  
  return (
    <div>
      <Toolbar />
      <button onClick={() => setHasSelection(!hasSelection)}>
        {hasSelection ? '선택 해제' : '선택하기'}
      </button>
      <div>현재 상태: {hasSelection ? '선택됨' : '선택되지 않음'}</div>
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <ToolbarWithState />
    </ToolbarProvider>
  );
};

export default App;
```

## 툴바 방향 및 위치 변경

툴바의 방향과 위치를 동적으로 변경하는 예제입니다.

```tsx
import React, { useState, useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const ConfigurableToolbar = () => {
  const { registerItem } = useToolbar();
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  
  // 툴바 아이템 등록
  useEffect(() => {
    const items = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => console.log('자르기 실행'),
        group: '편집'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => console.log('복사 실행'),
        group: '편집'
      }
    ];
    
    items.forEach(item => registerItem(item));
  }, []);
  
  // 방향 변경 함수
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };
  
  // 위치 변경 함수
  const changePosition = (newPosition: 'top' | 'bottom' | 'left' | 'right') => {
    setPosition(newPosition);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {position === 'top' && <Toolbar />}
      
      <div style={{ display: 'flex', flex: 1 }}>
        {position === 'left' && <Toolbar style={{ height: '100%' }} />}
        
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>툴바 구성 변경</h2>
          <div>
            <button onClick={toggleOrientation}>
              방향 전환: {orientation === 'horizontal' ? '가로' : '세로'}
            </button>
          </div>
          <div>
            <button onClick={() => changePosition('top')}>상단</button>
            <button onClick={() => changePosition('bottom')}>하단</button>
            <button onClick={() => changePosition('left')}>좌측</button>
            <button onClick={() => changePosition('right')}>우측</button>
          </div>
        </div>
        
        {position === 'right' && <Toolbar style={{ height: '100%' }} />}
      </div>
      
      {position === 'bottom' && <Toolbar />}
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <ConfigurableToolbar />
    </ToolbarProvider>
  );
};

export default App;
```

## 키보드 단축키 연동

툴바 아이템에 키보드 단축키를 연동하는 예제입니다.

```tsx
import React, { useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

const ToolbarWithShortcuts = () => {
  const { registerItem, executeAction } = useToolbar();
  
  // 툴바 아이템 등록
  useEffect(() => {
    const items = [
      {
        id: 'cut',
        label: '자르기',
        icon: '✂️',
        action: () => console.log('자르기 실행'),
        shortcut: 'Ctrl+X',
        group: '편집'
      },
      {
        id: 'copy',
        label: '복사',
        icon: '📋',
        action: () => console.log('복사 실행'),
        shortcut: 'Ctrl+C',
        group: '편집'
      },
      {
        id: 'paste',
        label: '붙여넣기',
        icon: '📌',
        action: () => console.log('붙여넣기 실행'),
        shortcut: 'Ctrl+V',
        group: '편집'
      }
    ];
    
    items.forEach(item => registerItem(item));
  }, []);
  
  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+X
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        executeAction('cut');
      }
      // Ctrl+C
      else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        executeAction('copy');
      }
      // Ctrl+V
      else if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        executeAction('paste');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div>
      <Toolbar />
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>단축키 안내</h3>
        <ul>
          <li><strong>Ctrl+X</strong>: 자르기</li>
          <li><strong>Ctrl+C</strong>: 복사</li>
          <li><strong>Ctrl+V</strong>: 붙여넣기</li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <ToolbarWithShortcuts />
    </ToolbarProvider>
  );
};

export default App;
```

## 툴바와 다른 컴포넌트 연동

툴바와 다른 컴포넌트를 연동하여 상호작용하는 예제입니다.

```tsx
import React, { useState, useEffect } from 'react';
import { ToolbarProvider, useToolbar, Toolbar } from '@vcut/toolbar';

// 비디오 편집기 컴포넌트
const VideoEditorComponent = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  const { registerItem, unregisterItem, state } = useToolbar();
  
  // 툴바 아이템 등록
  useEffect(() => {
    const items = [
      {
        id: 'brightness',
        label: '밝기',
        icon: '☀️',
        action: () => setSelectedTool('brightness'),
        group: '효과'
      },
      {
        id: 'contrast',
        label: '대비',
        icon: '🌓',
        action: () => setSelectedTool('contrast'),
        group: '효과'
      },
      {
        id: 'saturation',
        label: '채도',
        icon: '🎨',
        action: () => setSelectedTool('saturation'),
        group: '효과'
      },
      {
        id: 'reset',
        label: '초기화',
        icon: '🔄',
        action: () => {
          setBrightness(100);
          setContrast(100);
          setSaturation(100);
          setSelectedTool(null);
        },
        group: '효과'
      }
    ];
    
    items.forEach(item => registerItem(item));
    
    return () => {
      items.forEach(item => unregisterItem(item.id));
    };
  }, []);
  
  // 활성화된 도구에 따라 UI 렌더링
  const renderToolControls = () => {
    switch (selectedTool) {
      case 'brightness':
        return (
          <div>
            <h3>밝기 조정</h3>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
            />
            <span>{brightness}%</span>
          </div>
        );
      case 'contrast':
        return (
          <div>
            <h3>대비 조정</h3>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
            />
            <span>{contrast}%</span>
          </div>
        );
      case 'saturation':
        return (
          <div>
            <h3>채도 조정</h3>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
            />
            <span>{saturation}%</span>
          </div>
        );
      default:
        return <div>도구를 선택하세요</div>;
    }
  };
  
  // 비디오 미리보기 스타일
  const videoStyle = {
    width: '100%',
    height: '300px',
    backgroundColor: '#000',
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
  };
  
  return (
    <div>
      <Toolbar />
      
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: '2', padding: '10px' }}>
          <h2>비디오 미리보기</h2>
          <div style={videoStyle}>
            <div style={{ color: 'white', textAlign: 'center', paddingTop: '140px' }}>
              비디오 미리보기 영역
            </div>
          </div>
        </div>
        
        <div style={{ flex: '1', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <h2>도구 설정</h2>
          {renderToolControls()}
          
          <div style={{ marginTop: '20px' }}>
            <h3>현재 설정</h3>
            <ul>
              <li>밝기: {brightness}%</li>
              <li>대비: {contrast}%</li>
              <li>채도: {saturation}%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ToolbarProvider>
      <VideoEditorComponent />
    </ToolbarProvider>
  );
};

export default App;
```
