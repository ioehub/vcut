const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  // 브라우저 창 생성
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // HTML 파일을 로드합니다
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // 개발 도구 열기
  mainWindow.webContents.openDevTools();
}

// Electron이 준비되면 윈도우 생성
app.whenReady().then(() => {
  createWindow();

  // macOS에서는 모든 창이 닫히면 앱을 완전히 종료하는 대신 Dock에 남습니다.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // macOS에서는 Dock 아이콘을 클릭하고 다른 창이 열려 있지 않으면 앱에서 새 창을 생성합니다.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 파일 시스템 액세스를 위한 IPC 핸들러 설정
ipcMain.handle('read-audio-file', async (event, filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    return buffer;
  } catch (error) {
    console.error('Error reading audio file:', error);
    throw error;
  }
});
