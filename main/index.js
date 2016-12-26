const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = electron;

let appDir = path.join(__dirname, '../app');

let mainWindow;
app.on('ready', _ => {
    console.log('ready');
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${appDir}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.on('close', _ => mainWindow = null);
});
