/**
 * 미디어 파일 유형
 */
export enum MediaType {
  VIDEO = 'video',
  AUDIO = 'audio',
  IMAGE = 'image',
}

/**
 * 미디어 파일 메타데이터
 */
export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  frameRate?: number;
  bitRate?: number;
  codec?: string;
  channels?: number; // 오디오 채널 수
  sampleRate?: number; // 오디오 샘플 레이트
}

/**
 * 미디어 파일 정보
 */
export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  path: string;
  url: string;
  thumbnail?: string;
  size: number;
  createdAt: Date;
  importedAt: Date;
  metadata: MediaMetadata;
  tags: string[];
  favorite: boolean;
}

/**
 * 미디어 파일 생성 옵션
 */
export interface CreateMediaItemOptions {
  name: string;
  type: MediaType;
  path: string;
  size: number;
  metadata?: Partial<MediaMetadata>;
  tags?: string[];
  favorite?: boolean;
}

/**
 * 미디어 라이브러리 필터 옵션
 */
export interface MediaFilterOptions {
  type?: MediaType[];
  tags?: string[];
  favorite?: boolean;
  search?: string;
  sortBy?: 'name' | 'size' | 'createdAt' | 'importedAt' | 'duration';
  sortDirection?: 'asc' | 'desc';
}

/**
 * 썸네일 생성 옵션
 */
export interface ThumbnailOptions {
  width?: number;
  height?: number;
  quality?: number;
  time?: number; // 비디오에서 썸네일을 추출할 시간 (초)
}

/**
 * 미디어 서비스 인터페이스
 */
export interface MediaService {
  importMedia(files: File[]): Promise<MediaItem[]>;
  getMediaItems(filter?: MediaFilterOptions): Promise<MediaItem[]>;
  getMediaById(id: string): Promise<MediaItem | null>;
  updateMedia(id: string, updates: Partial<MediaItem>): Promise<MediaItem>;
  deleteMedia(id: string): Promise<boolean>;
  generateThumbnail(mediaItem: MediaItem, options?: ThumbnailOptions): Promise<string>;
  extractMetadata(file: File): Promise<MediaMetadata>;
}

/**
 * 미디어 컨텍스트 상태
 */
export interface MediaContextState {
  items: MediaItem[];
  selectedItems: string[];
  isLoading: boolean;
  error: Error | null;
  filter: MediaFilterOptions;
}

/**
 * 미디어 컨텍스트 액션
 */
export type MediaContextAction =
  | { type: 'SET_ITEMS'; payload: MediaItem[] }
  | { type: 'ADD_ITEMS'; payload: MediaItem[] }
  | { type: 'UPDATE_ITEM'; payload: MediaItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SELECT_ITEM'; payload: string }
  | { type: 'DESELECT_ITEM'; payload: string }
  | { type: 'SELECT_ALL' }
  | { type: 'DESELECT_ALL' }
  | { type: 'SET_FILTER'; payload: MediaFilterOptions }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null };

/**
 * 드래그 앤 드롭 미디어 데이터
 */
export interface MediaDragData {
  id: string;
  type: MediaType;
  name: string;
  duration?: number;
}
