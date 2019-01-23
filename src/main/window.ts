import { app, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

// custom protocol
const protocolStr: string = 'app://';
export const protocolProfix: string = protocolStr.split(':')[0];

/**
 * app window class
 */
export class AppWin {
  // current open url for window eg：index.html
  protected url: string | null;
  // current window instance
  protected win: BrowserWindow | null;
  // is window allow to closed, 'false' is hide the window
  protected isCanClosed: boolean = false;

  public constructor(url: string) {
    this.url = url;
  }
  // generate the production page url
  public getProductUrl(): string {
    return protocolStr + './' + this.url;
  }
  // show current window
  public show(): void {
    this.win && this.win.show();
  }
  // close window
  public close(): void {
    if (this.win) {
      this.isCanClosed = true;
      this.win && this.win.close();
    }
  }
  // create window and register lisn.
  public create(options?: any): Promise<AppWin> {
    return new Promise(resolve => {
      this.win = new BrowserWindow(
        Object.assign(
          {},
          {
            frame: false,
            titleBarStyle: 'hidden',
            fullscreenWindowTitle: true,
            transparent: true,
            width: 300,
            height: 400,
            resizable: true,
            maximizable: true,
            fullscreenable: false,
            backgroundColor: '#FFF',
            webPreferences: { webSecurity: false },
            show: false,
          },
          options || {},
        ),
      );
      if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + this.url);
        if (!process.env.IS_TEST) {
          this.win.webContents.openDevTools();
        }
      } else {
        createProtocol(protocolProfix);
        this.win.loadURL(this.getProductUrl());
      }
      // excuted when window's content loaded
      this.win.webContents.on('did-finish-load', () => {
        this.win.show();
        resolve(this);
      });
      // excuted when window closed
      this.win.on('closed', () => {
        this.win = null;
        this.isCanClosed = false;
      });
      // excuted before window closed
      this.win.on('close', event => {
        if (!this.isCanClosed) {
          // exit fullscreen and then hide window on mac os
          if (process.platform === 'darwin' && this.win.isFullScreen()) {
            this.win.once('leave-full-screen', () => {
              this.win.hide();
            });
            this.win.setFullScreen(false);
          } else {
            this.win.hide();
          }
          event.preventDefault();
        }
      });
    });
  }
  // return current window instalce
  public getWin(): BrowserWindow {
    return this.win;
  }
}

export default {
  protocolProfix,
  AppWin,
};
