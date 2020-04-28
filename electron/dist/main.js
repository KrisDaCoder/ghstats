"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/ghstats/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // optional for loading the page at localhost (during development)
    // win.loadURL(`http://localhost:4200/index.html`);
    // optional for opening the devTools
    // win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
}
electron_1.app.on('ready', createWindow);
// on macOS, closing the window doesn't quit the app
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map