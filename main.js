const {app, BrowserWindow} = require('electron')
const path = require('path')
const log4js = require("log4js");
log4js.configure({
    appenders: { main: { type: "file", filename: "main.log" } },
    categories: { default: { appenders: ["main"], level: "debug" } }
});
const logger = log4js.getLogger("main");
logger.level = "debug";

let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: false,
      contextIsolation: false,
      webSecurity: false,
      nodeIntegration: true,
      devTools: true,
      webviewTag: true,
      spellcheck: false
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

setInterval(()=>{
  if (mainWindow) {
    mainWindow.webContents.send('setInterval1s', 'setInterval1s')
  } else {
    logger.debug("setInterval1s 找不到主窗口");
  }
}, 1000)
function oneSecond() {
  setTimeout(() => {
      if (mainWindow) {
        mainWindow.webContents.send('setTimeout1s', 'setInterval1s')
      } else {
        logger.debug("setTimeout1s 找不到主窗口");
      }
      oneSecond();
  }, 1000);
}
oneSecond(); 

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

