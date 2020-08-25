import { app, BrowserWindow } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
