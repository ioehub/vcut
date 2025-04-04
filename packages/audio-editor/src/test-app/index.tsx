import React from 'react';
import ReactDOM from 'react-dom/client';
import { AudioEditorProvider } from '../context/AudioEditorContext';
import { AudioEditorTestApp } from './AudioEditorTestApp';
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AudioEditorProvider>
      <AudioEditorTestApp />
    </AudioEditorProvider>
  </React.StrictMode>
);
