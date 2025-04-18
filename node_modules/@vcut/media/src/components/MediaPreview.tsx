import React, { useState, useRef, useEffect } from 'react';
import { MediaItem, MediaType } from '../types';
import { formatFileSize, formatDuration, formatDate } from '../utils/formatters';

interface MediaPreviewProps {
  item: MediaItem;
  onClose: () => void;
  onFavoriteToggle: (id: string, favorite: boolean) => Promise<void>;
  onTagAdd: (id: string, tag: string) => Promise<void>;
  onTagRemove: (id: string, tag: string) => Promise<void>;
}

/**
 * 미디어 항목 미리보기 및 세부 정보 컴포넌트
 */
export const MediaPreview: React.FC<MediaPreviewProps> = ({
  item,
  onClose,
  onFavoriteToggle,
  onTagAdd,
  onTagRemove
}) => {
  const [newTag, setNewTag] = useState('');
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  
  // 미디어 로드 시 이벤트 핸들러
  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    
    return () => {
      // 컴포넌트 언마운트 시 정리
      if (videoElement) {
        videoElement.pause();
      }
      
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [item.id]);
  
  // 즐겨찾기 토글
  const handleFavoriteToggle = async () => {
    await onFavoriteToggle(item.id, !item.favorite);
  };
  
  // 태그 추가
  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() === '') return;
    
    await onTagAdd(item.id, newTag.trim());
    setNewTag('');
    
    // 태그 추가 후 포커스 유지
    tagInputRef.current?.focus();
  };
  
  // 태그 삭제
  const handleRemoveTag = async (tag: string) => {
    await onTagRemove(item.id, tag);
  };
  
  // 타임라인에 드래그 시작
  const handleDragStart = (e: React.DragEvent) => {
    // 드래그 데이터 설정
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: item.id,
      type: item.type,
      name: item.name,
      duration: item.metadata.duration
    }));
    
    // 드래그 이미지 설정 (썸네일이 있는 경우)
    if (item.thumbnail) {
      const img = new Image();
      img.src = item.thumbnail;
      e.dataTransfer.setDragImage(img, 0, 0);
    }
    
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  // 미디어 미리보기 렌더링
  const renderMediaPreview = () => {
    switch (item.type) {
      case MediaType.VIDEO:
        return (
          <div className="video-container" style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              src={item.url}
              controls
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '250px',
                backgroundColor: '#000',
                objectFit: 'contain',
              }}
            />
            <div 
              className="drag-overlay"
              draggable
              onDragStart={handleDragStart}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                color: 'transparent',
                cursor: 'grab',
                zIndex: 1,
                opacity: 0,
                transition: 'all 0.2s ease',
              }}
            >
              타임라인에 드래그
            </div>
          </div>
        );
      case MediaType.AUDIO:
        return (
          <div style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
            <audio
              ref={audioRef}
              src={item.url}
              controls
              style={{ width: '100%' }}
            />
            <div 
              style={{ 
                marginTop: '16px',
                fontSize: '48px',
                color: '#aaa',
              }}
              draggable
              onDragStart={handleDragStart}
            >
              🎵
            </div>
            <div 
              className="drag-hint"
              style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#888',
              }}
            >
              타임라인에 드래그하여 추가
            </div>
          </div>
        );
      case MediaType.IMAGE:
        return (
          <div style={{ position: 'relative' }}>
            <img
              src={item.url}
              alt={item.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '250px',
                objectFit: 'contain',
              }}
              draggable
              onDragStart={handleDragStart}
            />
            <div 
              className="drag-hint"
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                opacity: 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              드래그하여 타임라인에 추가
            </div>
          </div>
        );
      default:
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#aaa' }}>
            미리보기를 사용할 수 없음
          </div>
        );
    }
  };

  return (
    <div
      className="media-preview"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#232323',
      }}
    >
      {/* 헤더 */}
      <div
        className="preview-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid #333',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={item.name}
        >
          {item.name}
        </h3>
        <div className="preview-actions">
          {/* 즐겨찾기 토글 버튼 */}
          <button
            onClick={handleFavoriteToggle}
            title={item.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: item.favorite ? '#ffcf00' : '#777',
              cursor: 'pointer',
              marginRight: '8px',
            }}
          >
            {item.favorite ? '★' : '☆'}
          </button>
          
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            title="미리보기 닫기"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: '#777',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* 미리보기 영역 */}
      <div
        className="preview-content"
        style={{
          borderBottom: '1px solid #333',
        }}
      >
        {renderMediaPreview()}
      </div>
      
      {/* 세부 정보 영역 */}
      <div
        className="preview-details"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
        }}
      >
        {/* 기본 정보 테이블 */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <tbody>
            {/* 파일 타입 */}
            <tr>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  color: '#aaa',
                  width: '40%',
                }}
              >
                타입
              </td>
              <td style={{ padding: '4px 0' }}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </td>
            </tr>
            
            {/* 파일 크기 */}
            <tr>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  color: '#aaa',
                }}
              >
                크기
              </td>
              <td style={{ padding: '4px 0' }}>
                {formatFileSize(item.size)}
              </td>
            </tr>
            
            {/* 영상 길이 */}
            {item.metadata.duration !== undefined && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  길이
                </td>
                <td style={{ padding: '4px 0' }}>
                  {formatDuration(item.metadata.duration)}
                </td>
              </tr>
            )}
            
            {/* 해상도 */}
            {item.metadata.width && item.metadata.height && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  해상도
                </td>
                <td style={{ padding: '4px 0' }}>
                  {item.metadata.width} × {item.metadata.height}
                </td>
              </tr>
            )}
            
            {/* 프레임 레이트 */}
            {item.metadata.frameRate !== undefined && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  프레임 레이트
                </td>
                <td style={{ padding: '4px 0' }}>
                  {item.metadata.frameRate} fps
                </td>
              </tr>
            )}
            
            {/* 코덱 */}
            {item.metadata.codec && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  코덱
                </td>
                <td style={{ padding: '4px 0' }}>
                  {item.metadata.codec}
                </td>
              </tr>
            )}
            
            {/* 오디오 채널 */}
            {item.metadata.channels !== undefined && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  오디오 채널
                </td>
                <td style={{ padding: '4px 0' }}>
                  {item.metadata.channels}채널
                </td>
              </tr>
            )}
            
            {/* 샘플 레이트 */}
            {item.metadata.sampleRate !== undefined && (
              <tr>
                <td
                  style={{
                    padding: '4px 8px 4px 0',
                    color: '#aaa',
                  }}
                >
                  샘플 레이트
                </td>
                <td style={{ padding: '4px 0' }}>
                  {item.metadata.sampleRate} Hz
                </td>
              </tr>
            )}
            
            {/* 생성일 */}
            <tr>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  color: '#aaa',
                }}
              >
                생성일
              </td>
              <td style={{ padding: '4px 0' }}>
                {formatDate(item.createdAt)}
              </td>
            </tr>
            
            {/* 가져온 날짜 */}
            <tr>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  color: '#aaa',
                }}
              >
                가져온 날짜
              </td>
              <td style={{ padding: '4px 0' }}>
                {formatDate(item.importedAt)}
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* 태그 섹션 */}
        <div
          className="tags-section"
          style={{
            marginTop: '16px',
          }}
        >
          <h4
            style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: '#ccc',
            }}
          >
            태그
          </h4>
          
          {/* 태그 목록 */}
          <div
            className="tags-list"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            {item.tags.length === 0 ? (
              <div
                style={{
                  color: '#777',
                  fontSize: '13px',
                  fontStyle: 'italic',
                }}
              >
                태그 없음
              </div>
            ) : (
              item.tags.map((tag, index) => (
                <div
                  key={index}
                  className="tag"
                  style={{
                    backgroundColor: '#454545',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    title={`태그 삭제: ${tag}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#aaa',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginLeft: '4px',
                      padding: '0 2px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          
          {/* 태그 추가 폼 */}
          <form onSubmit={handleAddTag}>
            <div
              className={`tag-input-container ${isTagInputFocused ? 'focused' : ''}`}
              style={{
                display: 'flex',
                position: 'relative',
              }}
            >
              <input
                ref={tagInputRef}
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onFocus={() => setIsTagInputFocused(true)}
                onBlur={() => setIsTagInputFocused(false)}
                placeholder="새 태그 추가..."
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  backgroundColor: '#333',
                  border: isTagInputFocused ? '1px solid #2196f3' : '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
              />
              <button
                type="submit"
                disabled={!newTag.trim()}
                style={{
                  padding: '6px 12px',
                  backgroundColor: newTag.trim() ? '#2196f3' : '#444',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  color: '#fff',
                  fontSize: '13px',
                  cursor: newTag.trim() ? 'pointer' : 'default',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                추가
              </button>
            </div>
          </form>
          
          {/* 타임라인 드래그 힌트 */}
          <div
            className="timeline-hint"
            style={{
              marginTop: '16px',
              padding: '8px 12px',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#2196f3',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'grab',
            }}
            draggable
            onDragStart={handleDragStart}
          >
            <span style={{ fontSize: '16px' }}>↗️</span>
            <span>이 미디어를 타임라인으로 드래그하여 추가하세요</span>
          </div>
        </div>
      </div>
      
      {/* CSS 스타일 */}
      <style>
        {`
        .video-container:hover .drag-overlay {
          opacity: 1;
        }
        
        .preview-content:hover .drag-hint {
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
};

export default MediaPreview;
