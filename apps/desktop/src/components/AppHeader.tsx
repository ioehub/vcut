import React, { useState } from 'react';
import '../styles/AppHeader.css';

interface AppHeaderProps {
  onMenuToggle: () => void;
  onSave?: (data?: any) => void;
  onExport?: (options?: any) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuToggle, onSave, onExport }) => {
  const [projectName, setProjectName] = useState('새 프로젝트');
  const [projectStatus, setProjectStatus] = useState('저장됨');
  
  const handleSave = () => {
    if (onSave) {
      setProjectStatus('저장 중...');
      onSave({ name: projectName });
      setTimeout(() => setProjectStatus('저장됨'), 1000);
    }
  };
  
  const handleExport = () => {
    if (onExport) {
      onExport({ format: 'mp4', quality: 'high' });
    }
  };
  
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    setProjectStatus('저장되지 않음');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <span className="menu-icon">☰</span>
        </button>
        <h1 className="app-title">vCut 비디오 편집기</h1>
      </div>
      
      <div className="header-center">
        <div className="project-info">
          <input 
            type="text" 
            className="project-name-input" 
            value={projectName} 
            onChange={handleProjectNameChange}
          />
          <span className="project-status">{projectStatus}</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-button" onClick={handleSave}>
          <span className="button-icon">💾</span>
          <span className="button-text">저장</span>
        </button>
        <button className="header-button" onClick={handleExport}>
          <span className="button-icon">📤</span>
          <span className="button-text">내보내기</span>
        </button>
        <button className="header-button">
          <span className="button-icon">⚙️</span>
          <span className="button-text">설정</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
