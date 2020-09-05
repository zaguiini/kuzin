import { app, BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  ipcMain.on('message-tray-context-menu', function (event, args) {
    const menu = new Menu()

    menu.append(
      new MenuItem({
        label: 'Limpar',
        click: () => {
          const contextMenuAction: ContextMenuAction = {
            action: 'clear-tray',
            context: 'message-tray',
          }

          event.sender.send('context-menu-action', contextMenuAction)
        },
      })
    )

    menu.popup({
      window: mainWindow,
      x: args.x,
      y: args.y,
    })
  })
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
