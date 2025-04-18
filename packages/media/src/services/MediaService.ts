import { v4 as uuidv4 } from 'uuid';
import FFmpegService from './FFmpegService';
import {
  MediaItem,
  MediaType,
  MediaFilterOptions,
  CreateMediaItemOptions,
  MediaService as IMediaService,
  ThumbnailOptions,
  MediaMetadata
} from '../types';

// 로컬 스토리지 키
const STORAGE_KEY = 'vcut_media_items';

/**
 * 미디어 서비스 구현
 * 
 * 미디어 파일의 임포트, 관리, 메타데이터 추출 등의 기능을 제공합니다.
 */
export class MediaService implements IMediaService {
  private items: Map<string, MediaItem> = new Map();
  
  constructor() {
    this.loadFromStorage();
  }
  
  /**
   * 로컬 스토리지에서 미디어 항목을 로드합니다
   */
  private loadFromStorage(): void {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        
        // 날짜 문자열을 Date 객체로 변환
        parsedItems.forEach((item: any) => {
          item.createdAt = new Date(item.createdAt);
          item.importedAt = new Date(item.importedAt);
          this.items.set(item.id, item);
        });
        
        console.log(`${this.items.size}개의 미디어 항목을 로컬 스토리지에서 로드했습니다.`);
      }
    } catch (error) {
      console.error('로컬 스토리지에서 미디어 항목을 로드하는 중 오류 발생:', error);
    }
  }
  
  /**
   * 미디어 항목을 로컬 스토리지에 저장합니다
   */
  private saveToStorage(): void {
    try {
      const itemsArray = Array.from(this.items.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsArray));
    } catch (error) {
      console.error('미디어 항목을 로컬 스토리지에 저장하는 중 오류 발생:', error);
    }
  }
  
  /**
   * 미디어 파일을 임포트합니다
   * @param files 파일 목록
   * @returns 임포트된 미디어 항목 배열
   */
  async importMedia(files: File[]): Promise<MediaItem[]> {
    const importedItems: MediaItem[] = [];
    console.log(`파일 임포트 시작: ${files.length}개`);
    for (const file of files) {
      try {
        console.log(`파일 임포트: ${file.name}`);
        // 미디어 타입 감지
        const type = this.detectMediaType(file);
        console.log(`감지된 미디어 타입: ${type}`);
        // 메타데이터 추출
        const metadata = await FFmpegService.extractMetadata(file);
        //console.log()
        // 미디어 항목 생성
        console.log('미디어 항목 생성 시작');
        const item = await this.createMediaItem({
          name: file.name,
          type,
          path: URL.createObjectURL(file),
          size: file.size,
          metadata
        });
        console.log('미디어 항목 생성 완료');
        // 썸네일 생성
        const thumbnail = await FFmpegService.generateThumbnail(file, type);
        item.thumbnail = thumbnail;
        
        console.log('썸네일 생성 완료')
        // 목록에 추가
        this.items.set(item.id, item);
        importedItems.push(item);
      } catch (error) {
        console.error(`파일 임포트 실패: ${file.name}`, error);
      }
    }

    console.log('파일 임포트 완료');
    
    // 로컬 스토리지에 저장
    this.saveToStorage();
    
    return importedItems;
  }
  
  /**
   * 필터 옵션을 기준으로 미디어 항목을 검색합니다
   * @param filter 필터 옵션
   * @returns 필터링된 미디어 항목 배열
   */
  async getMediaItems(filter: MediaFilterOptions = {}): Promise<MediaItem[]> {
    let items = Array.from(this.items.values());
    
    // 타입 필터
    if (filter.type && filter.type.length > 0) {
      items = items.filter(item => filter.type!.includes(item.type));
    }
    
    // 태그 필터
    if (filter.tags && filter.tags.length > 0) {
      items = items.filter(item => 
        filter.tags!.some(tag => item.tags.includes(tag))
      );
    }
    
    // 즐겨찾기 필터
    if (filter.favorite !== undefined) {
      items = items.filter(item => item.favorite === filter.favorite);
    }
    
    // 검색어 필터
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // 정렬
    if (filter.sortBy) {
      const sortDirection = filter.sortDirection === 'desc' ? -1 : 1;
      
      items.sort((a, b) => {
        switch (filter.sortBy) {
          case 'name':
            return sortDirection * a.name.localeCompare(b.name);
          case 'size':
            return sortDirection * (a.size - b.size);
          case 'createdAt':
            return sortDirection * (a.createdAt.getTime() - b.createdAt.getTime());
          case 'importedAt':
            return sortDirection * (a.importedAt.getTime() - b.importedAt.getTime());
          case 'duration':
            const aDuration = a.metadata.duration || 0;
            const bDuration = b.metadata.duration || 0;
            return sortDirection * (aDuration - bDuration);
          default:
            return 0;
        }
      });
    }
    
    return items;
  }
  
  /**
   * ID로 미디어 항목을 조회합니다
   * @param id 미디어 항목 ID
   * @returns 미디어 항목 또는 null
   */
  async getMediaById(id: string): Promise<MediaItem | null> {
    return this.items.get(id) || null;
  }
  
  /**
   * 미디어 항목을 업데이트합니다
   * @param id 미디어 항목 ID
   * @param updates 업데이트할 필드
   * @returns 업데이트된 미디어 항목
   */
  async updateMedia(id: string, updates: Partial<MediaItem>): Promise<MediaItem> {
    const item = this.items.get(id);
    if (!item) {
      throw new Error(`미디어 항목을 찾을 수 없음: ${id}`);
    }
    
    // 업데이트 적용
    const updatedItem = { ...item, ...updates };
    this.items.set(id, updatedItem);
    
    // 로컬 스토리지에 저장
    this.saveToStorage();
    
    return updatedItem;
  }
  
  /**
   * 미디어 항목을 삭제합니다
   * @param id 미디어 항목 ID
   * @returns 삭제 성공 여부
   */
  async deleteMedia(id: string): Promise<boolean> {
    // 오브젝트 URL 해제
    const item = this.items.get(id);
    if (item) {
      URL.revokeObjectURL(item.url);
      if (item.thumbnail && item.thumbnail.startsWith('blob:')) {
        URL.revokeObjectURL(item.thumbnail);
      }
    }
    
    const result = this.items.delete(id);
    
    // 로컬 스토리지에 저장
    this.saveToStorage();
    
    return result;
  }
  
  /**
   * 기존 미디어 항목의 썸네일을 생성합니다
   * @param mediaItem 미디어 항목
   * @param options 썸네일 옵션
   * @returns 썸네일 URL
   */
  async generateThumbnail(mediaItem: MediaItem, options?: ThumbnailOptions): Promise<string> {
    try {
      // 미디어 파일 가져오기
      const response = await fetch(mediaItem.url);
      const blob = await response.blob();
      const file = new File([blob], mediaItem.name, { type: this.getMimeType(mediaItem.type) });
      
      // 썸네일 생성
      const thumbnail = await FFmpegService.generateThumbnail(file, mediaItem.type, options);
      
      // 기존 썸네일 해제
      if (mediaItem.thumbnail && mediaItem.thumbnail.startsWith('blob:')) {
        URL.revokeObjectURL(mediaItem.thumbnail);
      }
      
      // 미디어 항목 업데이트
      mediaItem.thumbnail = thumbnail;
      this.items.set(mediaItem.id, mediaItem);
      
      // 로컬 스토리지에 저장
      this.saveToStorage();
      
      return thumbnail;
    } catch (error) {
      console.error('썸네일 생성 실패:', error);
      throw new Error('썸네일을 생성할 수 없습니다');
    }
  }
  
  /**
   * 파일에서 메타데이터를 추출합니다
   * @param file 파일
   * @returns 메타데이터
   */
  async extractMetadata(file: File): Promise<MediaMetadata> {
    return await FFmpegService.extractMetadata(file);
  }
  
  /**
   * 새 미디어 항목을 생성합니다
   * @param options 미디어 항목 생성 옵션
   * @returns 생성된 미디어 항목
   */
  private async createMediaItem(options: CreateMediaItemOptions): Promise<MediaItem> {
    const now = new Date();
    
    return {
      id: uuidv4(),
      name: options.name,
      type: options.type,
      path: options.path,
      url: options.path,
      size: options.size,
      createdAt: now,
      importedAt: now,
      metadata: options.metadata || {},
      tags: options.tags || [],
      favorite: options.favorite || false,
      thumbnail: '',
    };
  }
  
  /**
   * 파일 MIME 타입에 따라 미디어 타입을 감지합니다
   * @param file 파일
   * @returns 미디어 타입
   */
  private detectMediaType(file: File): MediaType {
    const mimeType = file.type.toLowerCase();
    
    if (mimeType.startsWith('video/')) {
      return MediaType.VIDEO;
    } else if (mimeType.startsWith('audio/')) {
      return MediaType.AUDIO;
    } else if (mimeType.startsWith('image/')) {
      return MediaType.IMAGE;
    }
    
    // 확장자로도 확인
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    
    if (extension && videoExtensions.includes(extension)) {
      return MediaType.VIDEO;
    } else if (extension && audioExtensions.includes(extension)) {
      return MediaType.AUDIO;
    } else if (extension && imageExtensions.includes(extension)) {
      return MediaType.IMAGE;
    }
    
    // 기본값은 비디오로 설정
    return MediaType.VIDEO;
  }
  
  /**
   * 미디어 타입에 해당하는 MIME 타입을 반환합니다
   * @param type 미디어 타입
   * @returns MIME 타입
   */
  private getMimeType(type: MediaType): string {
    switch (type) {
      case MediaType.VIDEO:
        return 'video/mp4';
      case MediaType.AUDIO:
        return 'audio/mp3';
      case MediaType.IMAGE:
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }
}

export default new MediaService();
