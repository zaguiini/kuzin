type ContextMenuAction = {
  action: 'clear-tray'
  context: 'message-tray'
}

type FileManagementAction = {
  action: 'new-file' | 'open-file' | 'save-file'
  filePath?: string
  context: 'file-management'
}

type UserAction = ContextMenuAction | FileManagementAction

type ShowWarningInput = {
  message: string
  action: UserAction
}
