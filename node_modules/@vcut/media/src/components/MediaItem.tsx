import React from 'react';
import { MediaItem as MediaItemType, MediaType } from '../types';
import { formatDuration, formatFileSize } from '../utils/formatters';

interface MediaItemProps {
  item: MediaItemType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDoubleClick?: (item: MediaItemType) => void;
  onContextMenu?: (e: React.MouseEvent, item: MediaItemType) => void;
  onDragStart?: (e: React.DragEvent, item: MediaItemType) => void;
}

/**
 * 미디어 라이브러리의 개별 미디어 항목 컴포넌트
 */
export const MediaItem: React.FC<MediaItemProps> = ({
  item,
  isSelected,
  onSelect,
  onDoubleClick,
  onContextMenu,
  onDragStart
}) => {
  // 미디어 타입에 따른 아이콘
  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case MediaType.VIDEO:
        return '🎬';
      case MediaType.AUDIO:
        return '🎵';
      case MediaType.IMAGE:
        return '🖼️';
      default:
        return '📁';
    }
  };

  // 미디어 아이템 드래그 시작 핸들러
  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, item);
    } else {
      // 기본 드래그 데이터 설정
      e.dataTransfer.setData('application/json', JSON.stringify({
        id: item.id,
        type: item.type,
        name: item.name,
        duration: item.metadata.duration
      }));
    }
    
    // 드래그 이미지 설정 (썸네일이 있는 경우)
    if (item.thumbnail) {
      const img = new Image();
      img.src = item.thumbnail;
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  return (
    <div
      className={`media-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(item.id)}
      onDoubleClick={() => onDoubleClick && onDoubleClick(item)}
      onContextMenu={(e) => onContextMenu && onContextMenu(e, item)}
      draggable
      onDragStart={handleDragStart}
      data-media-id={item.id}
      data-media-type={item.type}
      style={{
        position: 'relative',
        width: '180px',
        margin: '8px',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#232323',
        border: isSelected ? '2px solid #2196f3' : '2px solid transparent',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {/* 썸네일 */}
      <div
        className="media-thumbnail"
        style={{
          position: 'relative',
          width: '100%',
          height: '120px',
          backgroundColor: '#333',
          backgroundImage: item.thumbnail ? `url(${item.thumbnail})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!item.thumbnail && (
          <span style={{ fontSize: '2rem' }}>{getTypeIcon(item.type)}</span>
        )}
        
        {/* 미디어 유형 뱃지 */}
        <div
          className="media-type-badge"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {item.type}
        </div>
        
        {/* 즐겨찾기 아이콘 */}
        {item.favorite && (
          <div
            className="favorite-badge"
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              color: '#ffcf00',
              fontSize: '16px',
            }}
          >
            ★
          </div>
        )}
        
        {/* 길이 표시 (비디오/오디오) */}
        {item.metadata.duration && (item.type === MediaType.VIDEO || item.type === MediaType.AUDIO) && (
          <div
            className="duration-badge"
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {formatDuration(item.metadata.duration)}
          </div>
        )}
      </div>
      
      {/* 정보 영역 */}
      <div
        className="media-info"
        style={{
          padding: '8px',
          color: 'white',
        }}
      >
        {/* 파일명 */}
        <div
          className="media-name"
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={item.name}
        >
          {item.name}
        </div>
        
        {/* 파일 정보 */}
        <div
          className="media-details"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          <span>{formatFileSize(item.size)}</span>
          
          {/* 해상도 표시 (비디오/이미지) */}
          {item.metadata.width && item.metadata.height && (
            <span>{item.metadata.width} × {item.metadata.height}</span>
          )}
        </div>
        
        {/* 태그 */}
        {item.tags.length > 0 && (
          <div
            className="media-tags"
            style={{
              marginTop: '4px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            {item.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#454545',
                  color: '#ddd',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: '10px',
                }}
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span
                style={{
                  color: '#aaa',
                  fontSize: '10px',
                }}
              >
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaItem;
