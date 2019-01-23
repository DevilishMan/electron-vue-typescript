'use strict';

import { app, protocol, ipcMain, BrowserWindow } from 'electron';
import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

import { AppWin, protocolProfix } from './window';

const isDevelopment = process.env.NODE_ENV !== 'production';

const loginWin: AppWin | null = new AppWin('login.html');
const mainWin: AppWin | null = new AppWin('index.html');

protocol.registerStandardSchemes([protocolProfix], { secure: true });

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('before-quit', () => {
  loginWin.close();
  mainWin.close();
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (loginWin.getWin() === null && mainWin.getWin() === null) {
    loginWin.create();
  } else if (mainWin.getWin() != null) {
    mainWin.show();
  } else {
    loginWin.show();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  loginWin.create();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on('openMainWindow', (event: Event, args: []) => {
  mainWin
    .create({
      height: 620,
      useContentSize: true,
      width: 980,
      webPreferences: { webSecurity: false },
      maximizable: true,
      fullscreenable: true,
      resizable: true,
      backgroundColor: '#F2F4F8',
      show: false,
    })
    .then(() => {
      loginWin.close();
    });
});
