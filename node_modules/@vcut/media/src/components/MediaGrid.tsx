import React, { useCallback } from 'react';
import { MediaItem as MediaItemType } from '../types';
import MediaItem from './MediaItem';

interface MediaGridProps {
  items: MediaItemType[];
  selectedItems: string[];
  onSelectItem: (id: string, multiSelect?: boolean) => void;
  onItemDoubleClick?: (item: MediaItemType) => void;
  onItemContextMenu?: (e: React.MouseEvent, item: MediaItemType) => void;
  onItemDragStart?: (e: React.DragEvent, item: MediaItemType) => void;
}

/**
 * 미디어 아이템을 그리드 형태로 표시하는 컴포넌트
 */
export const MediaGrid: React.FC<MediaGridProps> = ({
  items,
  selectedItems,
  onSelectItem,
  onItemDoubleClick,
  onItemContextMenu,
  onItemDragStart
}) => {
  // 항목 선택 핸들러
  const handleItemSelect = useCallback((id: string, e?: React.MouseEvent) => {
    const multiSelect = e?.ctrlKey || e?.metaKey || e?.shiftKey;
    onSelectItem(id, multiSelect);
  }, [onSelectItem]);

  // 컨테이너 클릭 핸들러 (빈 공간 클릭 시 선택 해제)
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    // 이벤트 타겟이 그리드 컨테이너인 경우에만 선택 해제
    if (e.target === e.currentTarget) {
      onSelectItem('', false);
    }
  }, [onSelectItem]);

  return (
    <div
      className="media-grid"
      onClick={handleContainerClick}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '16px',
        overflow: 'auto',
        height: '100%',
        backgroundColor: '#1a1a1a',
      }}
    >
      {items.length === 0 ? (
        <div 
          className="media-grid-empty"
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#777',
            padding: '32px',
            fontSize: '16px'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
          <p>미디어 파일이 없습니다</p>
          <p style={{ fontSize: '14px' }}>파일을 드래그하거나 추가 버튼을 클릭하여 미디어를 가져오세요</p>
        </div>
      ) : (
        items.map(item => (
          <MediaItem
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onSelect={(id) => handleItemSelect(id)}
            onDoubleClick={onItemDoubleClick}
            onContextMenu={onItemContextMenu}
            onDragStart={onItemDragStart}
          />
        ))
      )}
    </div>
  );
};

export default MediaGrid;
