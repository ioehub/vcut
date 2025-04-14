import React, { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { useToolbar } from '../context/ToolbarContext';
import { ToolbarItem } from '../types';

const ToolbarDemo: React.FC = () => {
  const { registerItem, unregisterItem, state } = useToolbar();
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [lastAction, setLastAction] = useState<string>('');

  // Define toolbar items
  const toolbarItems: ToolbarItem[] = [
    // 편집 그룹
    {
      id: 'cut',
      label: '자르기',
      icon: '✂️',
      action: () => setLastAction('자르기 실행'),
      tooltip: '비디오 클립 자르기',
      shortcut: 'Ctrl+X',
      group: '편집'
    },
    {
      id: 'copy',
      label: '복사',
      icon: '📋',
      action: () => setLastAction('복사 실행'),
      tooltip: '비디오 클립 복사',
      shortcut: 'Ctrl+C',
      group: '편집'
    },
    {
      id: 'paste',
      label: '붙여넣기',
      icon: '📌',
      action: () => setLastAction('붙여넣기 실행'),
      tooltip: '비디오 클립 붙여넣기',
      shortcut: 'Ctrl+V',
      group: '편집'
    },
    
    // 효과 그룹
    {
      id: 'brightness',
      label: '밝기',
      icon: '☀️',
      action: () => setLastAction('밝기 조정 실행'),
      tooltip: '비디오 밝기 조정',
      group: '효과'
    },
    {
      id: 'contrast',
      label: '대비',
      icon: '🌓',
      action: () => setLastAction('대비 조정 실행'),
      tooltip: '비디오 대비 조정',
      group: '효과'
    },
    {
      id: 'saturation',
      label: '채도',
      icon: '🎨',
      action: () => setLastAction('채도 조정 실행'),
      tooltip: '비디오 채도 조정',
      group: '효과'
    },
    
    // 오디오 그룹
    {
      id: 'volume',
      label: '볼륨',
      icon: '🔊',
      action: () => setLastAction('볼륨 조정 실행'),
      tooltip: '오디오 볼륨 조정',
      group: '오디오'
    },
    {
      id: 'mute',
      label: '음소거',
      icon: '🔇',
      action: () => setLastAction('음소거 실행'),
      tooltip: '오디오 음소거',
      group: '오디오'
    },
    
    // 내보내기 그룹
    {
      id: 'export',
      label: '내보내기',
      icon: '📤',
      action: () => setLastAction('내보내기 실행'),
      tooltip: '비디오 내보내기',
      shortcut: 'Ctrl+E',
      group: '내보내기'
    },
    {
      id: 'save',
      label: '저장',
      icon: '💾',
      action: () => setLastAction('저장 실행'),
      tooltip: '프로젝트 저장',
      shortcut: 'Ctrl+S',
      group: '내보내기'
    }
  ];

  // Register toolbar items
  useEffect(() => {
    toolbarItems.forEach(item => {
      registerItem(item);
    });

    return () => {
      toolbarItems.forEach(item => {
        unregisterItem(item.id);
      });
    };
  }, []);

  // Toggle toolbar orientation
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  // Toggle toolbar position
  const togglePosition = () => {
    const positions: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'right', 'bottom', 'left'];
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    setPosition(positions[nextIndex]);
  };

  return (
    <div className="demo-container">
      <h1>vCut 툴바 데모</h1>
      
      <div className="demo-actions">
        <button onClick={toggleOrientation}>
          방향 전환: {orientation === 'horizontal' ? '가로' : '세로'}
        </button>
        <button onClick={togglePosition}>
          위치 변경: {
            position === 'top' ? '상단' : 
            position === 'right' ? '우측' : 
            position === 'bottom' ? '하단' : '좌측'
          }
        </button>
      </div>
      
      {position === 'top' && <Toolbar />}
      {position === 'left' && (
        <div style={{ display: 'flex', flex: 1 }}>
          <Toolbar style={{ height: '100%' }} />
          <div className="demo-content">
            <h2>vCut 툴바 테스트</h2>
          </div>
        </div>
      )}
      {position === 'right' && (
        <div style={{ display: 'flex', flex: 1 }}>
          <div className="demo-content">
            <h2>vCut 툴바 테스트</h2>
          </div>
          <Toolbar style={{ height: '100%' }} />
        </div>
      )}
      {position === 'bottom' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="demo-content">
            <h2>vCut 툴바 테스트</h2>
          </div>
          <Toolbar />
        </div>
      )}
      
      <div className="demo-info">
        <h3>마지막 실행된 액션:</h3>
        <p>{lastAction || '아직 액션이 실행되지 않았습니다.'}</p>
        
        <h3>현재 툴바 상태:</h3>
        <pre>{JSON.stringify({
          orientation,
          position,
          activeItem: state.activeItem,
          groupCount: state.config.groups.length,
          itemCount: state.config.groups.reduce((acc, group) => acc + group.items.length, 0)
        }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ToolbarDemo;
