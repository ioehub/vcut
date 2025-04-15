import React from 'react';
import '../styles/AppHeader.css';

interface AppHeaderProps {
  onMenuToggle: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuToggle }) => {
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
          <span className="project-name">Untitled Project</span>
          <span className="project-status">저장됨</span>
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-button">
          <span className="button-icon">💾</span>
          <span className="button-text">저장</span>
        </button>
        <button className="header-button">
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
