import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  dialog,
  globalShortcut,
} from 'electron'
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
  app.quit()
}

class WindowInstance {
  private instance!: BrowserWindow

  set(instance: BrowserWindow) {
    this.instance = instance
  }

  get() {
    return this.instance
  }
}

const windowInstance = new WindowInstance()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  windowInstance.set(mainWindow)

  if (process.env.NODE_ENV !== 'development') {
    mainWindow.setMenu(null)
  }

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  ipcMain.on(
    'show-warning',
    async (event, { message, action }: ShowWarningInput) => {
      const { response } = await dialog.showMessageBox({
        buttons: ['Sim', 'Não'],
        message,
      })

      if (response === 0) {
        event.sender.send('user-action', action)
      }
    }
  )

  ipcMain.on('open-file-request', async (event) => {
    const {
      canceled,
      filePaths: [filePath],
    } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Kuzin Files', extensions: ['txt'] }],
    })

    if (canceled) return

    const openFileAction: FileManagementAction = {
      action: 'open-file',
      filePath,
      context: 'file-management',
    }

    event.sender.send('user-action', openFileAction)
  })

  ipcMain.on('save-file-request', async (event) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'Kuzin Files', extensions: ['txt'] }],
    })

    if (canceled) return

    const saveFileAction: FileManagementAction = {
      action: 'save-file',
      filePath: filePath!,
      context: 'file-management',
    }

    event.sender.send('user-action', saveFileAction)
  })

  ipcMain.on('message-tray-context-menu', (event, args) => {
    const menu = new Menu()

    menu.append(
      new MenuItem({
        label: 'Limpar',
        accelerator: 'F11',
        click: () => {
          const contextMenuAction: ContextMenuAction = {
            action: 'clear-tray',
            context: 'message-tray',
          }

          event.sender.send('user-action', contextMenuAction)
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

app.on('browser-window-blur', () => {
  globalShortcut.unregisterAll()
})

app.on('browser-window-focus', () => {
  const shortcuts: ShortcutAction['action'][] = [
    'F1',
    'CommandOrControl+N',
    'CommandOrControl+O',
    'CommandOrControl+S',
    'F9',
    'F11',
  ]

  shortcuts.forEach((shortcut) => {
    globalShortcut.register(shortcut, () => {
      const shortcutAction: ShortcutAction = {
        action: shortcut,
        context: 'shortcut-triggered',
      }

      if (!windowInstance.get().isFocused()) {
        return
      }

      windowInstance.get().webContents.send('user-action', shortcutAction)
    })
  })
})
