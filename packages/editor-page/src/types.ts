// Types for the editor-page package

export interface EditorPageState {
  // 현재 편집 모드 (비디오, 오디오, 텍스트 등)
  currentMode: 'video' | 'audio' | 'text' | 'effects';
  
  // 현재 프로젝트 정보
  project: {
    id: string;
    name: string;
    created: Date;
    lastModified: Date;
    duration: number;
    resolution: {
      width: number;
      height: number;
    };
    frameRate: number;
  };
  
  // 미디어 파일 목록
  mediaFiles: MediaFile[];
  
  // 현재 선택된 미디어 파일 ID
  selectedMediaId: string | null;
  
  // 편집 히스토리 (실행 취소/다시 실행 기능을 위한)
  history: {
    past: any[];
    future: any[];
  };
  
  // 현재 편집 중인 타임라인 상태
  timelineState: {
    zoom: number;
    scrollPosition: number;
  };
  
  // UI 상태
  uiState: {
    sidebarOpen: boolean;
    activePanelId: string | null;
    fullscreen: boolean;
  };
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  path: string;
  duration?: number;
  thumbnail?: string;
  metadata?: {
    [key: string]: any;
  };
}

export type EditorPageAction =
  | { type: 'SET_MODE'; payload: EditorPageState['currentMode'] }
  | { type: 'SET_PROJECT'; payload: Partial<EditorPageState['project']> }
  | { type: 'ADD_MEDIA_FILE'; payload: MediaFile }
  | { type: 'REMOVE_MEDIA_FILE'; payload: string } // ID
  | { type: 'SELECT_MEDIA_FILE'; payload: string | null } // ID
  | { type: 'SET_TIMELINE_ZOOM'; payload: number }
  | { type: 'SET_TIMELINE_SCROLL'; payload: number }
  | { type: 'TOGGLE_SIDEBAR'; payload?: boolean }
  | { type: 'SET_ACTIVE_PANEL'; payload: string | null }
  | { type: 'TOGGLE_FULLSCREEN'; payload?: boolean }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET_STATE'; payload?: Partial<EditorPageState> };
