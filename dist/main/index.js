const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = electron;

let srcDir = path.join(__dirname, '..');
let isDev = false;
try {
  require('electron-reload')(path.join(srcDir, 'app'));
  isDev = true;
} catch (e) { }

let mainWindow;
app.on('ready', _ => {
  console.log('ready');
  // app.commandLine.appendSwitch("js-flags", "--harmony");

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768
  });

  mainWindow.loadURL(`file://${srcDir}/index.html`);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('close', _ => mainWindow = null);
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
