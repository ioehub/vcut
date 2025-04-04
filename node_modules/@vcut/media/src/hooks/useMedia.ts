import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MediaService from '../services/MediaService';
import FFmpegService from '../services/FFmpegService';
import {
  MediaItem,
  MediaFilterOptions,
  MediaType,
  ThumbnailOptions,
  MediaMetadata
} from '../types';

/**
 * 미디어 관리 훅
 * 
 * 미디어 파일을 임포트하고 관리하는 기능을 제공합니다.
 */
export const useMedia = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<MediaFilterOptions>({});

  /**
   * 미디어 파일을 임포트합니다
   */
  const importMedia = useCallback(async (files: File[]): Promise<MediaItem[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // FFmpeg 서비스 로딩 (필요한 경우)
      await FFmpegService.load();
      
      // 미디어 서비스를 통해 파일 임포트
      const importedItems = await MediaService.importMedia(files);
      
      // 상태 업데이트
      setItems(prev => [...prev, ...importedItems]);
      
      return importedItems;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('미디어 임포트 중 오류 발생');
      setError(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 미디어 항목을 새로고침합니다
   */
  const refreshMedia = useCallback(async (newFilter?: MediaFilterOptions): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filterToUse = newFilter || filter;
      if (newFilter) {
        setFilter(newFilter);
      }
      
      const items = await MediaService.getMediaItems(filterToUse);
      setItems(items);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('미디어 새로고침 중 오류 발생');
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  /**
   * 미디어 항목을 업데이트합니다
   */
  const updateMedia = useCallback(async (id: string, updates: Partial<MediaItem>): Promise<MediaItem> => {
    try {
      setError(null);
      
      const updatedItem = await MediaService.updateMedia(id, updates);
      
      // 상태 업데이트
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      
      return updatedItem;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('미디어 업데이트 중 오류 발생');
      setError(err);
      throw err;
    }
  }, []);

  /**
   * 미디어 항목을 삭제합니다
   */
  const deleteMedia = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      
      const success = await MediaService.deleteMedia(id);
      
      if (success) {
        // 상태 업데이트
        setItems(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
      }
      
      return success;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('미디어 삭제 중 오류 발생');
      setError(err);
      return false;
    }
  }, []);

  /**
   * 미디어 항목의 메타데이터를 추출합니다
   */
  const extractMetadata = useCallback(async (file: File): Promise<MediaMetadata> => {
    try {
      setError(null);
      
      // FFmpeg 서비스 로딩 (필요한 경우)
      await FFmpegService.load();
      
      return await MediaService.extractMetadata(file);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('메타데이터 추출 중 오류 발생');
      setError(err);
      throw err;
    }
  }, []);

  /**
   * 미디어 항목의 썸네일을 생성합니다
   */
  const generateThumbnail = useCallback(async (
    mediaItem: MediaItem, 
    options?: ThumbnailOptions
  ): Promise<string> => {
    try {
      setError(null);
      
      const thumbnail = await MediaService.generateThumbnail(mediaItem, options);
      
      // 상태 업데이트
      setItems(prev => prev.map(item => 
        item.id === mediaItem.id ? { ...item, thumbnail } : item
      ));
      
      return thumbnail;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('썸네일 생성 중 오류 발생');
      setError(err);
      throw err;
    }
  }, []);

  /**
   * 새 미디어 항목을 생성합니다 (외부 URL용)
   */
  const createMediaItem = useCallback(async (
    name: string,
    type: MediaType,
    url: string,
    metadata: Partial<MediaMetadata> = {}
  ): Promise<MediaItem> => {
    try {
      const now = new Date();
      const id = uuidv4();
      
      const newItem: MediaItem = {
        id,
        name,
        type,
        path: url,
        url,
        size: 0, // 외부 URL은 파일 크기를 알 수 없음
        createdAt: now,
        importedAt: now,
        metadata: metadata as MediaMetadata,
        tags: [],
        favorite: false,
        thumbnail: '',
      };
      
      // 상태 업데이트
      setItems(prev => [...prev, newItem]);
      
      return newItem;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('미디어 항목 생성 중 오류 발생');
      setError(err);
      throw err;
    }
  }, []);

  /**
   * 항목 선택 상태를 관리합니다
   */
  const selectItem = useCallback((id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const deselectItem = useCallback((id: string) => {
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  }, []);

  const selectAll = useCallback(() => {
    setSelectedItems(items.map(item => item.id));
  }, [items]);

  const deselectAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  /**
   * 필터를 설정하고 미디어를 새로고침합니다
   */
  const applyFilter = useCallback((newFilter: MediaFilterOptions) => {
    setFilter(newFilter);
    refreshMedia(newFilter);
  }, [refreshMedia]);

  /**
   * 훅 초기화 - 컴포넌트 마운트 시 미디어 로드
   */
  useEffect(() => {
    refreshMedia();
    
    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      FFmpegService.terminate().catch(console.error);
    };
  }, [refreshMedia]);

  return {
    items,
    selectedItems,
    isLoading,
    error,
    filter,
    importMedia,
    refreshMedia,
    updateMedia,
    deleteMedia,
    extractMetadata,
    generateThumbnail,
    createMediaItem,
    selectItem,
    deselectItem,
    selectAll,
    deselectAll,
    applyFilter,
  };
};

export default useMedia;
