import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToolbarProvider } from './context/ToolbarContext';
import ToolbarDemo from './components/ToolbarDemo';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToolbarProvider>
      <ToolbarDemo />
    </ToolbarProvider>
  </React.StrictMode>,
);
