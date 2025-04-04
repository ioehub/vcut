import React, { useState, useRef } from 'react';
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
  };
  
  // 태그 삭제
  const handleRemoveTag = async (tag: string) => {
    await onTagRemove(item.id, tag);
  };
  
  // 미디어 미리보기 렌더링
  const renderMediaPreview = () => {
    switch (item.type) {
      case MediaType.VIDEO:
        return (
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
        );
      case MediaType.AUDIO:
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <audio
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
            >
              🎵
            </div>
          </div>
        );
      case MediaType.IMAGE:
        return (
          <img
            src={item.url}
            alt={item.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '250px',
              objectFit: 'contain',
            }}
          />
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
                  {item.metadata.channels} (
                  {item.metadata.channels === 1 ? '모노' :
                   item.metadata.channels === 2 ? '스테레오' :
                   item.metadata.channels === 6 ? '5.1' :
                   item.metadata.channels === 8 ? '7.1' : `${item.metadata.channels}채널`}
                  )
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
                  {(item.metadata.sampleRate / 1000).toFixed(1)} kHz
                </td>
              </tr>
            )}
            
            {/* 임포트 날짜 */}
            <tr>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  color: '#aaa',
                }}
              >
                임포트 날짜
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
            borderTop: '1px solid #333',
            paddingTop: '16px',
          }}
        >
          <h4
            style={{
              margin: '0 0 12px 0',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#aaa',
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
              gap: '6px',
              marginBottom: '12px',
            }}
          >
            {item.tags.length === 0 ? (
              <span style={{ color: '#777', fontSize: '14px' }}>태그 없음</span>
            ) : (
              item.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#454545',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#aaa',
                      marginLeft: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      padding: '0',
                    }}
                    title="태그 삭제"
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>
          
          {/* 태그 추가 폼 */}
          <form onSubmit={handleAddTag}>
            <div
              className="tag-input-container"
              style={{
                position: 'relative',
                display: 'flex',
              }}
            >
              <input
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
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={newTag.trim() === ''}
                style={{
                  padding: '6px 12px',
                  marginLeft: '8px',
                  backgroundColor: newTag.trim() === '' ? '#444' : '#2196f3',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: newTag.trim() === '' ? 'default' : 'pointer',
                  opacity: newTag.trim() === '' ? 0.7 : 1,
                }}
              >
                추가
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;
