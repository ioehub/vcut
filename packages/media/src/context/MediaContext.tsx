import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { MediaContextState, MediaContextAction, MediaItem, MediaFilterOptions } from '../types';
import MediaService from '../services/MediaService';

// 초기 상태
const initialState: MediaContextState = {
  items: [],
  selectedItems: [],
  isLoading: false,
  error: null,
  filter: {}
};

// 리듀서 함수
function mediaReducer(state: MediaContextState, action: MediaContextAction): MediaContextState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEMS':
      return { ...state, items: [...state.items, ...action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        selectedItems: state.selectedItems.filter(id => id !== action.payload)
      };
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload]
      };
    case 'DESELECT_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(id => id !== action.payload)
      };
    case 'SELECT_ALL':
      return {
        ...state,
        selectedItems: state.items.map(item => item.id)
      };
    case 'DESELECT_ALL':
      return {
        ...state,
        selectedItems: []
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// 컨텍스트 타입 정의
interface MediaContextValue {
  state: MediaContextState;
  importMedia: (files: File[]) => Promise<MediaItem[]>;
  refreshMedia: (filter?: MediaFilterOptions) => Promise<void>;
  updateMedia: (id: string, updates: Partial<MediaItem>) => Promise<MediaItem>;
  deleteMedia: (id: string) => Promise<boolean>;
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setFilter: (filter: MediaFilterOptions) => void;
}

// 컨텍스트 생성
const MediaContext = createContext<MediaContextValue | undefined>(undefined);

// 컨텍스트 제공자 컴포넌트
export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);

  // 미디어 파일 임포트
  const importMedia = useCallback(async (files: File[]): Promise<MediaItem[]> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const importedItems = await MediaService.importMedia(files);
      dispatch({ type: 'ADD_ITEMS', payload: importedItems });
      
      return importedItems;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
      return [];
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // 미디어 목록 새로고침
  const refreshMedia = useCallback(async (filter?: MediaFilterOptions): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const filterToUse = filter || state.filter;
      if (filter) {
        dispatch({ type: 'SET_FILTER', payload: filter });
      }
      
      const items = await MediaService.getMediaItems(filterToUse);
      dispatch({ type: 'SET_ITEMS', payload: items });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.filter]);

  // 미디어 항목 업데이트
  const updateMedia = useCallback(async (id: string, updates: Partial<MediaItem>): Promise<MediaItem> => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const updatedItem = await MediaService.updateMedia(id, updates);
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
      
      return updatedItem;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
      throw error;
    }
  }, []);

  // 미디어 항목 삭제
  const deleteMedia = useCallback(async (id: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const success = await MediaService.deleteMedia(id);
      if (success) {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
      }
      
      return success;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
      return false;
    }
  }, []);

  // 항목 선택
  const selectItem = useCallback((id: string): void => {
    if (!state.selectedItems.includes(id)) {
      dispatch({ type: 'SELECT_ITEM', payload: id });
    }
  }, [state.selectedItems]);

  // 항목 선택 해제
  const deselectItem = useCallback((id: string): void => {
    dispatch({ type: 'DESELECT_ITEM', payload: id });
  }, []);

  // 모든 항목 선택
  const selectAll = useCallback((): void => {
    dispatch({ type: 'SELECT_ALL' });
  }, []);

  // 모든 항목 선택 해제
  const deselectAll = useCallback((): void => {
    dispatch({ type: 'DESELECT_ALL' });
  }, []);

  // 필터 설정
  const setFilter = useCallback((filter: MediaFilterOptions): void => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  // 컨텍스트 값
  const value = {
    state,
    importMedia,
    refreshMedia,
    updateMedia,
    deleteMedia,
    selectItem,
    deselectItem,
    selectAll,
    deselectAll,
    setFilter
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
};

// 커스텀 훅
export const useMedia = (): MediaContextValue => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
