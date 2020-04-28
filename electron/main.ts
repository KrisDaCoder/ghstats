import { app, BrowserWindow, remote } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/ghstats/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // optional for loading the page at localhost (during development)
  // win.loadURL(`http://localhost:4200/index.html`);

  // optional for opening the devTools
  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('new-window', (e: Event, url: string) => {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
