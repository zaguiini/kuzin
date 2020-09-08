type ContextMenuAction = {
  action: 'clear-tray'
  context: 'message-tray'
}

type FileManagementAction = {
  action: 'new-file' | 'open-file' | 'save-file'
  filePath?: string
  context: 'file-management'
}

type ShortcutAction = {
  action:
    | 'F1'
    | 'CommandOrControl+N'
    | 'CommandOrControl+O'
    | 'CommandOrControl+S'
    | 'F9'
    | 'F11'
  context: 'shortcut-triggered'
}

type UserAction = ContextMenuAction | FileManagementAction | ShortcutAction

type ShowWarningInput = {
  message: string
  action: UserAction
}
