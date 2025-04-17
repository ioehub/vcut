import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditorPageState, EditorPageAction, MediaFile } from '../types';

// MCPServiceFactory와 FFmpegService 타입 정의 (임포트 대신 인터페이스로 정의)
interface MCPServiceFactory {
  // 필요한 메서드와 속성 정의
  createAdapter: (element: HTMLMediaElement) => any;
}

interface FFmpegService {
  // 필요한 메서드와 속성 정의
  applyFilter?: (input: string, output: string, options: any) => Promise<string>;
}

// 초기 상태 정의
const initialState: EditorPageState = {
  currentMode: 'video',
  project: {
    id: uuidv4(),
    name: '새 프로젝트',
    created: new Date(),
    lastModified: new Date(),
    duration: 0,
    resolution: {
      width: 1920,
      height: 1080
    },
    frameRate: 30
  },
  mediaFiles: [],
  selectedMediaId: null,
  history: {
    past: [],
    future: []
  },
  timelineState: {
    zoom: 1,
    scrollPosition: 0
  },
  uiState: {
    sidebarOpen: true,
    activePanelId: 'media',
    fullscreen: false
  }
};

// 리듀서 함수
const reducer = (state: EditorPageState, action: EditorPageAction): EditorPageState => {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        currentMode: action.payload
      };
    
    case 'SET_PROJECT':
      return {
        ...state,
        project: {
          ...state.project,
          ...action.payload,
          lastModified: new Date()
        }
      };
    
    case 'ADD_MEDIA_FILE':
      return {
        ...state,
        mediaFiles: [...state.mediaFiles, action.payload],
        selectedMediaId: action.payload.id
      };
    
    case 'REMOVE_MEDIA_FILE':
      return {
        ...state,
        mediaFiles: state.mediaFiles.filter(file => file.id !== action.payload),
        selectedMediaId: state.selectedMediaId === action.payload ? null : state.selectedMediaId
      };
    
    case 'SELECT_MEDIA_FILE':
      return {
        ...state,
        selectedMediaId: action.payload
      };
    
    case 'SET_TIMELINE_ZOOM':
      return {
        ...state,
        timelineState: {
          ...state.timelineState,
          zoom: action.payload
        }
      };
    
    case 'SET_TIMELINE_SCROLL':
      return {
        ...state,
        timelineState: {
          ...state.timelineState,
          scrollPosition: action.payload
        }
      };
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          sidebarOpen: action.payload !== undefined ? action.payload : !state.uiState.sidebarOpen
        }
      };
    
    case 'SET_ACTIVE_PANEL':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          activePanelId: action.payload
        }
      };
    
    case 'TOGGLE_FULLSCREEN':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          fullscreen: action.payload !== undefined ? action.payload : !state.uiState.fullscreen
        }
      };
    
    case 'UNDO':
      if (state.history.past.length === 0) return state;
      
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, state.history.past.length - 1);
      
      return {
        ...previous,
        history: {
          past: newPast,
          future: [state, ...state.history.future]
        }
      };
    
    case 'REDO':
      if (state.history.future.length === 0) return state;
      
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      
      return {
        ...next,
        history: {
          past: [...state.history.past, state],
          future: newFuture
        }
      };
    
    case 'RESET_STATE':
      return {
        ...initialState,
        ...action.payload,
        project: {
          ...initialState.project,
          ...(action.payload?.project || {}),
          id: uuidv4(),
          created: new Date(),
          lastModified: new Date()
        }
      };
    
    default:
      return state;
  }
};

// 컨텍스트 생성
const EditorPageContext = createContext<{
  state: EditorPageState;
  dispatch: React.Dispatch<EditorPageAction>;
  setMode: (mode: EditorPageState['currentMode']) => void;
  updateProject: (updates: Partial<EditorPageState['project']>) => void;
  addMediaFile: (file: Omit<MediaFile, 'id'>) => void;
  removeMediaFile: (id: string) => void;
  selectMediaFile: (id: string | null) => void;
  setTimelineZoom: (zoom: number) => void;
  setTimelineScroll: (position: number) => void;
  toggleSidebar: (open?: boolean) => void;
  setActivePanel: (panelId: string | null) => void;
  toggleFullscreen: (fullscreen?: boolean) => void;
  undo: () => void;
  redo: () => void;
  resetState: (initialData?: Partial<EditorPageState>) => void;
  mcpFactory?: MCPServiceFactory;
  ffmpegService?: FFmpegService;
}>({
  state: initialState,
  dispatch: () => {},
  setMode: () => {},
  updateProject: () => {},
  addMediaFile: () => {},
  removeMediaFile: () => {},
  selectMediaFile: () => {},
  setTimelineZoom: () => {},
  setTimelineScroll: () => {},
  toggleSidebar: () => {},
  setActivePanel: () => {},
  toggleFullscreen: () => {},
  undo: () => {},
  redo: () => {},
  resetState: () => {}
});

// Provider 컴포넌트의 props 타입 정의
interface EditorPageProviderProps {
  children: ReactNode;
  mcpFactory: MCPServiceFactory;
  ffmpegService: FFmpegService;
}

// Provider 컴포넌트
export const EditorPageProvider: React.FC<EditorPageProviderProps> = ({ 
  children, 
  mcpFactory, 
  ffmpegService 
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 액션 생성 함수들
  const setMode = useCallback((mode: EditorPageState['currentMode']) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const updateProject = useCallback((updates: Partial<EditorPageState['project']>) => {
    dispatch({ type: 'SET_PROJECT', payload: updates });
  }, []);

  const addMediaFile = useCallback((file: Omit<MediaFile, 'id'>) => {
    const newFile: MediaFile = {
      ...file,
      id: uuidv4()
    };
    dispatch({ type: 'ADD_MEDIA_FILE', payload: newFile });
  }, []);

  const removeMediaFile = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_MEDIA_FILE', payload: id });
  }, []);

  const selectMediaFile = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_MEDIA_FILE', payload: id });
  }, []);

  const setTimelineZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_TIMELINE_ZOOM', payload: zoom });
  }, []);

  const setTimelineScroll = useCallback((position: number) => {
    dispatch({ type: 'SET_TIMELINE_SCROLL', payload: position });
  }, []);

  const toggleSidebar = useCallback((open?: boolean) => {
    dispatch({ type: 'TOGGLE_SIDEBAR', payload: open });
  }, []);

  const setActivePanel = useCallback((panelId: string | null) => {
    dispatch({ type: 'SET_ACTIVE_PANEL', payload: panelId });
  }, []);

  const toggleFullscreen = useCallback((fullscreen?: boolean) => {
    dispatch({ type: 'TOGGLE_FULLSCREEN', payload: fullscreen });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const resetState = useCallback((initialData?: Partial<EditorPageState>) => {
    dispatch({ type: 'RESET_STATE', payload: initialData });
  }, []);

  return (
    <EditorPageContext.Provider
      value={{
        state,
        dispatch,
        setMode,
        updateProject,
        addMediaFile,
        removeMediaFile,
        selectMediaFile,
        setTimelineZoom,
        setTimelineScroll,
        toggleSidebar,
        setActivePanel,
        toggleFullscreen,
        undo,
        redo,
        resetState,
        mcpFactory,
        ffmpegService
      }}
    >
      {children}
    </EditorPageContext.Provider>
  );
};

// 훅 사용
export const useEditorPage = () => {
  const context = useContext(EditorPageContext);
  if (context === undefined) {
    throw new Error('useEditorPage must be used within a EditorPageProvider');
  }
  return context;
};
