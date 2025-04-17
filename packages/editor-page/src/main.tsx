import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditorPageProvider } from './context/EditorPageContext';
import EditorPage from './components/EditorPage';
import './styles/EditorPage.css';

// 테스트용 더미 서비스 객체 생성
const dummyMcpFactory = {
  createAdapter: (_: HTMLMediaElement) => ({})
};

const dummyFfmpegService = {
  applyFilter: async (_input: string, _output: string, _options: any) => ''
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EditorPageProvider
      mcpFactory={dummyMcpFactory}
      ffmpegService={dummyFfmpegService}
    >
      <EditorPage />
    </EditorPageProvider>
  </React.StrictMode>,
);
