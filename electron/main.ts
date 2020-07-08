import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      // Setting of web page's feature.
      devTools: true,
      nodeIntegration: true,
    },
  });

  // 윈도우를 만들고 index.html를 불러온다.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
