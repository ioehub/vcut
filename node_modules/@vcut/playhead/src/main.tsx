import React from 'react';
import ReactDOM from 'react-dom/client';
import { TestPlayhead } from './pages/TestPlayhead';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestPlayhead />
  </React.StrictMode>,
);
