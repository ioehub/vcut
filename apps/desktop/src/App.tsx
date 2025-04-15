import React, { useState } from 'react';
import { EditorPage, EditorPageProvider } from '@vcut/editor-page';
import { MCPServiceFactory } from '@vcut/mcp-service';
import { FFmpegService } from '@vcut/ffmpeg-service';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import './styles/App.css';

// 서비스 인스턴스 생성
const mcpFactory = new MCPServiceFactory();
const ffmpegService = new FFmpegService();

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="vcut-app">
      <AppHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="app-container">
        {sidebarOpen && (
          <div className="app-sidebar">
            <Sidebar />
          </div>
        )}
        
        <div className="app-content">
          <EditorPageProvider 
            mcpFactory={mcpFactory}
            ffmpegService={ffmpegService}
          >
            <EditorPage />
          </EditorPageProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
