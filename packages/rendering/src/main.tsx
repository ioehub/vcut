import React from 'react';
import ReactDOM from 'react-dom/client';
import { TestRendering } from './index';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestRendering />
  </React.StrictMode>,
);
