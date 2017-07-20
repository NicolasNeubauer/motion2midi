import { app, BrowserWindow } from 'electron' // eslint-disable-line

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
        // debugger;
        res.send('Hello, World!');
        mainWindow.send('accessed', 'hello, world');
    });
    expressApp.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });

    expressApp.get('/orientation/:channel/:value/:client_id', (req, res) => {
        res.send('');
        mainWindow.send('midi', req.params);
    });

    /*
    @app.route("/orientation/<string:channel>/<int:value>/<int:client_id>")
    @crossdomain(origin='*')
    def get_orientation(channel, value, client_id):
        if not (channel, client_id) in last_faders:
            last_faders[(channel, client_id)] = None
        if last_faders[(channel, client_id)] != value:
            if value > 127 or value < 0:
                raise Exception("value must be between 0 and 127, is %d" % value)
            if value == 127:
                value = 126 # weird mido error message when value = 127

            send_fader(value, get_control(channel, client_id))
            last_faders[(channel, client_id)] = value
        return ""
        */
}


function createWindow() {
  /**
   * Initial window options
   */
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
