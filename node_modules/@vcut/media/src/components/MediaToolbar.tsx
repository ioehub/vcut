import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MediaFilterOptions, MediaType } from '../types';
import { useMedia } from '../context/MediaContext';

interface MediaToolbarProps {
  selectedCount: number;
  totalCount: number;
  filter: MediaFilterOptions;
  onImport: () => void;
  onFilterChange: (filter: MediaFilterOptions) => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
}

/**
 * 미디어 라이브러리 툴바 컴포넌트
 */
export const MediaToolbar: React.FC<MediaToolbarProps> = ({
  selectedCount,
  totalCount,
  filter,
  onImport,
  onFilterChange,
  onDeleteSelected,
  onRefresh
}) => {
  const { state } = useMedia();
  const [searchValue, setSearchValue] = useState(filter.search || '');
  const [showFilters, setShowFilters] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 모든 미디어 항목에서 사용 가능한 태그 추출
  useEffect(() => {
    const tags = new Set<string>();
    state.items.forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    setAvailableTags(Array.from(tags).sort());
  }, [state.items]);
  
  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // 디바운스 적용 (타이핑 중에 너무 많은 검색 요청이 발생하지 않도록)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onFilterChange({ ...filter, search: value });
    }, 300);
  }, [filter, onFilterChange]);
  
  // 미디어 타입 필터 변경 핸들러
  const handleTypeFilterChange = useCallback((type: MediaType, checked: boolean) => {
    const currentTypes = filter.type || [];
    let newTypes: MediaType[];
    
    if (checked) {
      newTypes = [...currentTypes, type];
    } else {
      newTypes = currentTypes.filter(t => t !== type);
    }
    
    onFilterChange({ ...filter, type: newTypes.length > 0 ? newTypes : undefined });
  }, [filter, onFilterChange]);
  
  // 즐겨찾기 필터 변경 핸들러
  const handleFavoriteFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onFilterChange({ ...filter, favorite: checked ? true : undefined });
  }, [filter, onFilterChange]);
  
  // 태그 필터 변경 핸들러
  const handleTagFilterChange = useCallback((tag: string, checked: boolean) => {
    const currentTags = filter.tags || [];
    let newTags: string[];
    
    if (checked) {
      newTags = [...currentTags, tag];
    } else {
      newTags = currentTags.filter(t => t !== tag);
    }
    
    onFilterChange({ ...filter, tags: newTags.length > 0 ? newTags : undefined });
  }, [filter, onFilterChange]);
  
  // 정렬 옵션 변경 핸들러
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortBy, sortDirection] = value.split('-');
    
    onFilterChange({
      ...filter,
      sortBy: sortBy as any,
      sortDirection: sortDirection as any
    });
  }, [filter, onFilterChange]);
  
  // 현재 정렬 옵션 값
  const sortValue = `${filter.sortBy || 'name'}-${filter.sortDirection || 'asc'}`;
  
  // 필터 초기화 핸들러
  const handleResetFilters = useCallback(() => {
    setSearchValue('');
    onFilterChange({});
  }, [onFilterChange]);

  return (
    <div
      className="media-toolbar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#212121',
        borderBottom: '1px solid #333',
      }}
    >
      {/* 상단 툴바 영역 */}
      <div 
        className="media-toolbar-main"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* 왼쪽 영역: 검색 및 필터 */}
        <div
          className="media-toolbar-left"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1',
          }}
        >
          {/* 검색 입력 */}
          <div
            className="search-container"
            style={{
              flex: '1',
              position: 'relative',
              maxWidth: '300px',
            }}
          >
            <input
              type="text"
              placeholder="미디어 검색..."
              value={searchValue}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                paddingLeft: '32px',
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
              }}
            >
              🔍
            </span>
            {searchValue && (
              <button
                onClick={() => {
                  setSearchValue('');
                  onFilterChange({ ...filter, search: undefined });
                }}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#aaa',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            )}
          </div>
          
          {/* 정렬 옵션 */}
          <select
            value={sortValue}
            onChange={handleSortChange}
            style={{
              padding: '7px 8px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            <option value="name-asc">이름 (A-Z)</option>
            <option value="name-desc">이름 (Z-A)</option>
            <option value="importedAt-desc">최근 추가</option>
            <option value="createdAt-desc">생성일 (최신)</option>
            <option value="createdAt-asc">생성일 (오래된)</option>
            <option value="size-desc">크기 (큰 순)</option>
            <option value="size-asc">크기 (작은 순)</option>
            <option value="duration-desc">길이 (긴 순)</option>
            <option value="duration-asc">길이 (짧은 순)</option>
          </select>
          
          {/* 필터 토글 버튼 */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            title={showFilters ? "필터 숨기기" : "필터 표시"}
            style={{
              padding: '7px 10px',
              backgroundColor: (filter.type?.length || filter.tags?.length || filter.favorite) ? '#2196f3' : '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {showFilters ? "▲" : "▼"} 필터
            {(filter.type?.length || filter.tags?.length || filter.favorite) && 
              <span style={{ marginLeft: '5px', fontSize: '12px', backgroundColor: '#fff', color: '#333', borderRadius: '50%', padding: '0 5px' }}>
                {(filter.type?.length || 0) + (filter.tags?.length || 0) + (filter.favorite ? 1 : 0)}
              </span>
            }
          </button>
          
          {/* 필터 초기화 버튼 */}
          <button
            onClick={handleResetFilters}
            title="필터 초기화"
            style={{
              padding: '7px 10px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#aaa',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            ↺
          </button>
        </div>
        
        {/* 오른쪽 영역: 액션 버튼 */}
        <div
          className="media-toolbar-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* 선택된 항목 카운터 */}
          <div
            className="selection-counter"
            style={{
              color: '#aaa',
              fontSize: '14px',
            }}
          >
            {selectedCount > 0 ? `${selectedCount}개 선택됨` : `${totalCount}개 항목`}
          </div>
          
          {/* 새로고침 버튼 */}
          <button
            onClick={onRefresh}
            title="새로고침"
            style={{
              padding: '8px 12px',
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            ↻
          </button>
          
          {/* 선택 항목 삭제 버튼 */}
          <button
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            style={{
              padding: '8px 12px',
              backgroundColor: selectedCount === 0 ? '#333' : '#e53935',
              border: 'none',
              borderRadius: '4px',
              color: selectedCount === 0 ? '#777' : '#fff',
              fontSize: '14px',
              cursor: selectedCount === 0 ? 'default' : 'pointer',
              opacity: selectedCount === 0 ? 0.7 : 1,
            }}
          >
            삭제
          </button>
          
          {/* 미디어 추가 버튼 */}
          <button
            onClick={onImport}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            미디어 추가
          </button>
        </div>
      </div>
      
      {/* 필터 옵션 영역 */}
      {showFilters && (
        <div
          className="media-toolbar-filters"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '14px',
            color: '#ccc',
            backgroundColor: '#2a2a2a',
            padding: '12px',
            borderRadius: '4px',
          }}
        >
          {/* 미디어 타입 필터 */}
          <div className="filter-group">
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>미디어 타입</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="checkbox"
                  checked={filter.type?.includes(MediaType.VIDEO) || false}
                  onChange={(e) => handleTypeFilterChange(MediaType.VIDEO, e.target.checked)}
                />
                비디오
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="checkbox"
                  checked={filter.type?.includes(MediaType.AUDIO) || false}
                  onChange={(e) => handleTypeFilterChange(MediaType.AUDIO, e.target.checked)}
                />
                오디오
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="checkbox"
                  checked={filter.type?.includes(MediaType.IMAGE) || false}
                  onChange={(e) => handleTypeFilterChange(MediaType.IMAGE, e.target.checked)}
                />
                이미지
              </label>
            </div>
          </div>
          
          {/* 즐겨찾기 필터 */}
          <div className="filter-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={filter.favorite || false}
                onChange={handleFavoriteFilterChange}
              />
              즐겨찾기만 표시
            </label>
          </div>
          
          {/* 태그 필터 */}
          {availableTags.length > 0 && (
            <div className="filter-group">
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>태그</div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                maxHeight: '100px', 
                overflowY: 'auto',
                padding: '4px'
              }}>
                {availableTags.map(tag => (
                  <label
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: filter.tags?.includes(tag) ? '#2196f3' : '#454545',
                      color: filter.tags?.includes(tag) ? '#fff' : '#ddd',
                      padding: '4px 8px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={filter.tags?.includes(tag) || false}
                      onChange={(e) => handleTagFilterChange(tag, e.target.checked)}
                      style={{ display: 'none' }}
                    />
                    {tag}
                    {filter.tags?.includes(tag) && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          handleTagFilterChange(tag, false);
                        }}
                        style={{ marginLeft: '2px', fontSize: '10px' }}
                      >
                        ✕
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaToolbar;
