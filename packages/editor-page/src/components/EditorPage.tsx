import React, { useEffect, useState } from 'react';
import { useEditorPage } from '../context/EditorPageContext';

// 외부 패키지 컴포넌트 대신 목업 컴포넌트 사용
import { Playhead, Timeline, Toolbar, MediaBrowser, EffectsPanel } from './MockComponents';

// Import styles
import '../styles/EditorPage.css';

interface EditorPageProps {
  projectId?: string;
  initialData?: any;
  onSave?: (projectData: any) => void;
  onExport?: (exportOptions: any) => void;
}

const EditorPage: React.FC<EditorPageProps> = ({
  projectId,
  initialData,
  onSave,
  onExport
}) => {
  const {
    state,
    setMode,
    toggleSidebar,
    setActivePanel,
    toggleFullscreen
  } = useEditorPage();

  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    if (initialData) {
      // 초기 데이터로 상태 초기화 로직 구현
      setIsLoading(false);
    } else if (projectId) {
      // 프로젝트 ID로 데이터 로드 로직 구현
      // 예: loadProject(projectId).then(data => { ... })
      setIsLoading(false);
    } else {
      // 새 프로젝트 시작
      setIsLoading(false);
    }
  }, [initialData, projectId]);

  // 키보드 단축키 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S: 저장
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      
      // Ctrl+Z: 실행 취소
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        // undo 함수 호출
      }
      
      // Ctrl+Y: 다시 실행
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        // redo 함수 호출
      }
      
      // F11: 전체 화면 전환
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen]);

  // 저장 핸들러
  const handleSave = () => {
    if (onSave) {
      const projectData = {
        ...state.project,
        mediaFiles: state.mediaFiles,
        // 기타 저장할 데이터
      };
      onSave(projectData);
    }
  };

  // 내보내기 핸들러
  const handleExport = (options: any) => {
    if (onExport) {
      onExport(options);
    }
  };

  // 모드 변경 핸들러
  const handleModeChange = (mode: 'video' | 'audio' | 'text' | 'effects') => {
    setMode(mode);
  };

  // 사이드바 패널 변경 핸들러
  const handlePanelChange = (panelId: string) => {
    setActivePanel(panelId);
  };

  if (isLoading) {
    return <div className="editor-page-loading">로딩 중...</div>;
  }

  return (
    <div className={`editor-page ${state.uiState.fullscreen ? 'fullscreen' : ''}`}>
      {/* 상단 툴바 */}
      <div className="editor-page-toolbar">
        <Toolbar 
          currentMode={state.currentMode}
          onModeChange={handleModeChange}
          onSave={handleSave}
          onExport={handleExport}
        />
      </div>

      <div className="editor-page-content">
        {/* 사이드바 */}
        {state.uiState.sidebarOpen && (
          <div className="editor-page-sidebar">
            <div className="sidebar-tabs">
              <button 
                className={state.uiState.activePanelId === 'media' ? 'active' : ''}
                onClick={() => handlePanelChange('media')}
              >
                미디어
              </button>
              <button 
                className={state.uiState.activePanelId === 'effects' ? 'active' : ''}
                onClick={() => handlePanelChange('effects')}
              >
                효과
              </button>
            </div>

            <div className="sidebar-content">
              {state.uiState.activePanelId === 'media' && (
                <MediaBrowser 
                  mediaFiles={state.mediaFiles}
                  selectedMediaId={state.selectedMediaId}
                />
              )}
              {state.uiState.activePanelId === 'effects' && (
                <EffectsPanel />
              )}
            </div>
          </div>
        )}

        {/* 메인 편집 영역 */}
        <div className="editor-page-main">
          {/* 미리보기 영역 */}
          <div className="editor-page-preview">
            <Playhead />
            <button 
              className="toggle-sidebar-btn"
              onClick={() => toggleSidebar()}
            >
              {state.uiState.sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          {/* 타임라인 영역 */}
          <div className="editor-page-timeline">
            <Timeline 
              zoom={state.timelineState.zoom}
              scrollPosition={state.timelineState.scrollPosition}
            />
          </div>
        </div>
      </div>

      {/* 상태 바 */}
      <div className="editor-page-statusbar">
        <div className="project-info">
          {state.project.name} | {state.project.resolution.width}x{state.project.resolution.height} | {state.project.frameRate}fps
        </div>
        <div className="zoom-controls">
          <label>확대/축소: </label>
          <input 
            type="range" 
            min="0.1" 
            max="2" 
            step="0.1" 
            value={state.timelineState.zoom}
            onChange={() => {
              /* setTimelineZoom 함수 호출 */
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
