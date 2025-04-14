import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditorPageProvider } from './context/EditorPageContext';
import EditorPage from './components/EditorPage';
import './styles/EditorPage.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EditorPageProvider>
      <EditorPage />
    </EditorPageProvider>
  </React.StrictMode>,
);
