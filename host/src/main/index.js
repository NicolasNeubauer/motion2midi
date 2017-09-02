import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import IDGenerator from 'id-gen';


const generator = new IDGenerator();
generator.create('response');
const responses = {};


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function startExpress() {
    const express = require('express');
    const expressApp = express();
    expressApp.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    expressApp.get('/', (req, res) => {
        res.send('Hello, World!');
        mainWindow.send('accessed', 'hello, world');
    });
    expressApp.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });

    expressApp.get('/orientation/:channel/:value/:clientId', (req, res) => {
        res.send('');
        console.log('received ', req.params);
        mainWindow.send('midi_fader', req.params);
    });

    expressApp.get('/register', (req, res) => {
        const responseId = generator.next('response');
        // can't send callback function through IPC, so storing response for later retrieval
        responses[responseId] = res;
        mainWindow.send('register', { req, responseId });
    });
}

ipcMain.on('sendId', (event, { responseId, clientId }) => {
    console.log('get sendId', responseId, clientId);
    responses[responseId].send(`{"id":"${clientId}"}`);
    responses[responseId] = null;
});

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
    startExpress();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
