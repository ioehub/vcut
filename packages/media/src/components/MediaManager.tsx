import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MediaItem } from '../types';
import { useMedia } from '../context/MediaContext';
import MediaToolbar from './MediaToolbar';
import MediaGrid from './MediaGrid';
import MediaPreview from './MediaPreview';

interface MediaManagerProps {
  onSelect?: (items: MediaItem[]) => void;
  onDragStart?: (e: React.DragEvent, item: MediaItem) => void;
}

/**
 * 미디어 관리 컴포넌트
 * 
 * 미디어 파일의 임포트, 관리, 필터링, 미리보기 기능을 제공합니다.
 */
const MediaManager: React.FC<MediaManagerProps> = ({
  onSelect,
  onDragStart
}) => {
  const { 
    state: { items, selectedItems, filter, isLoading },
    importMedia,
    refreshMedia,
    updateMedia,
    deleteMedia,
    selectItem,
    deselectItem,
    deselectAll,
    setFilter
  } = useMedia();
  
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 미디어 가져오기 대화상자 열기
  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  // 파일 선택 처리
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    await importMedia(Array.from(files));
    
    // 파일 입력 초기화 (동일한 파일을 다시 선택할 수 있도록)
    e.target.value = '';
  }, [importMedia]);
  
  // 드롭 영역 처리
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    await importMedia(Array.from(files));
  }, [importMedia]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  // 항목 선택 처리
  const handleSelectItem = useCallback((id: string, multiSelect = false) => {
    if (id === '') {
      // 빈 공간 클릭 시 모든 선택 해제
      deselectAll();
      setPreviewItem(null);
      return;
    }
    
    if (multiSelect) {
      // 이미 선택된 경우 선택 해제, 아니면 선택 추가
      if (selectedItems.includes(id)) {
        deselectItem(id);
      } else {
        selectItem(id);
      }
    } else {
      // 단일 선택 (다른 항목 선택 해제)
      deselectAll();
      selectItem(id);
    }
    
    // 미리보기 항목 설정
    const item = items.find(item => item.id === id);
    if (item) {
      setPreviewItem(item);
    }
  }, [selectedItems, items, selectItem, deselectItem, deselectAll]);
  
  // 항목 더블 클릭 처리
  const handleItemDoubleClick = useCallback((item: MediaItem) => {
    // 선택된 항목 콜백
    if (onSelect) {
      onSelect([item]);
    }
  }, [onSelect]);
  
  // 선택된 항목 삭제
  const handleDeleteSelected = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    // 삭제 확인 (실제 구현에서는 대화상자 사용)
    const isConfirmed = window.confirm(`선택한 ${selectedItems.length}개 항목을 삭제하시겠습니까?`);
    if (!isConfirmed) return;
    
    // 선택된 모든 항목 삭제
    for (const id of selectedItems) {
      await deleteMedia(id);
    }
    
    // 미리보기 항목 초기화
    setPreviewItem(null);
  }, [selectedItems, deleteMedia]);
  
  // 컴포넌트 마운트 시 미디어 항목 로드
  useEffect(() => {
    const loadMedia = async () => {
      try {
        await refreshMedia();
      } catch (error) {
        console.error('미디어 로드 실패:', error);
      }
    };
    
    loadMedia();
  }, []); 
  
  return (
    <div
      className="media-manager"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#1a1a1a',
        color: '#fff',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* 미디어 툴바 */}
      <MediaToolbar
        selectedCount={selectedItems.length}
        totalCount={items.length}
        filter={filter}
        onImport={handleImport}
        onFilterChange={setFilter}
        onDeleteSelected={handleDeleteSelected}
        onRefresh={() => refreshMedia()}
      />
      
      {/* 메인 콘텐츠 영역 */}
      <div
        className="media-content"
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* 미디어 그리드 */}
        <div
          className="media-grid-container"
          style={{
            flex: 3,
            overflow: 'hidden',
            position: 'relative',
            borderRight: '1px solid #333',
          }}
        >
          {/* 로딩 오버레이 */}
          {isLoading && (
            <div
              className="loading-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 10,
              }}
            >
              <div className="spinner" style={{ color: '#fff', fontSize: '16px' }}>
                로딩 중...
              </div>
            </div>
          )}
          
          <MediaGrid
            items={items}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onItemDoubleClick={handleItemDoubleClick}
            onItemDragStart={onDragStart}
          />
        </div>
        
        {/* 미디어 미리보기 및 상세 정보 */}
        <div
          className="media-preview-container"
          style={{
            flex: 1,
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {previewItem ? (
            <MediaPreview
              item={previewItem}
              onClose={() => setPreviewItem(null)}
              onFavoriteToggle={async (id, favorite) => {
                await updateMedia(id, { favorite });
              }}
              onTagAdd={async (id, tag) => {
                const item = items.find(item => item.id === id);
                if (item && !item.tags.includes(tag)) {
                  await updateMedia(id, { tags: [...item.tags, tag] });
                }
              }}
              onTagRemove={async (id, tag) => {
                const item = items.find(item => item.id === id);
                if (item) {
                  await updateMedia(id, { tags: item.tags.filter(t => t !== tag) });
                }
              }}
            />
          ) : (
            <div
              className="no-preview"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#777',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👆</div>
              <p>항목을 선택하여 미리보기</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                미디어 파일을 선택하면 미리보기와 상세 정보가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="audio/mp3,.mp3"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MediaManager;
