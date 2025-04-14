import { contextBridge, ipcRenderer } from 'electron';

// Renderer 프로세스에 노출할 API 정의
contextBridge.exposeInMainWorld('electronAPI', {
  // 오디오 파일 읽기
  readAudioFile: (filePath: string) => ipcRenderer.invoke('read-audio-file', filePath)
});
