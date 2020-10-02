import React, {
  MouseEvent,
  useEffect,
  useReducer,
  Reducer,
  useState,
} from 'react'
import { ipcRenderer } from 'electron'
import { readFile, writeFile } from 'fs'
import { Box } from '@chakra-ui/core'
import { Editor } from './components/Editor/Editor'
import { StatusBar } from './components/StatusBar/StatusBar'
import { MessageTray } from './components/MessageTray/MessageTray'
import { ToolBar, ToolBarAction } from './components/ToolBar/ToolBar'
import { TeamModal } from './components/TeamModal'
import { useMessageTray } from './components/MessageTray/useMessageTray'
import { IpcRendererEvent } from 'electron'
import { useEditor } from './components/Editor/useEditor'
import { Compiler } from './compiler/Compiler'

const isFileManagementAction = (x: UserAction): x is FileManagementAction => {
  return x.context === 'file-management'
}

const isShortcutAction = (x: UserAction): x is ShortcutAction => {
  return x.context === 'shortcut-triggered'
}

const UNSAVED_CHANGES_WARNING =
  'Você tem certeza? Perderá todas as alterações não salvas.'

type AppReducerState = {
  currentOpenFilePath?: string
  currentOpenFileContent: string
  editorContent: string
  hasChanges: boolean
}

const initialState: AppReducerState = {
  currentOpenFilePath: undefined,
  currentOpenFileContent: '',
  editorContent: '',
  hasChanges: false,
}

type Action =
  | {
    type: 'setOpenFile'
    payload: { path?: string; content: string }
  }
  | { type: 'setEditorContent'; payload: string }
  | { type: 'saveFile' }

const appReducer = (state = initialState, action: Action): AppReducerState => {
  switch (action.type) {
    case 'setOpenFile':
      return {
        ...state,
        currentOpenFilePath: action.payload.path,
        currentOpenFileContent: action.payload.content,
        editorContent: action.payload.content,
        hasChanges: false,
      }

    case 'saveFile':
      return {
        ...state,
        currentOpenFileContent: state.editorContent,
        hasChanges: false
      }

    case 'setEditorContent':
      return {
        ...state,
        editorContent: action.payload,
        hasChanges: state.currentOpenFileContent !== action.payload,
      }
  }
}

export const App = () => {
  const [
    { currentOpenFilePath, editorContent, hasChanges },
    dispatch,
  ] = useReducer<Reducer<AppReducerState, Action>>(appReducer, initialState)
  const [isTeamModalOpen, setTeamModalOpen] = useState(false)

  const {
    editorRef,
    copyFromEditor,
    pasteToEditor,
    cutFromEditor,
  } = useEditor()
  const { messages, reportMessageToTray, clearMessageTray } = useMessageTray()

  const handleNewFileRequest = () => {
    dispatch({
      type: 'setOpenFile',
      payload: {
        path: undefined,
        content: '',
      },
    })

    clearMessageTray()
  }

  const handleOpenFileRequest = (filePath: string) => {
    readFile(filePath, (err, file) => {
      if (err) {
        return reportMessageToTray({
          level: 'error',
          text: 'Falha em ler arquivo: ' + err.message,
        })
      }

      dispatch({
        type: 'setOpenFile',
        payload: {
          path: filePath,
          content: file.toString(),
        },
      })

      clearMessageTray()
    })
  }

  const handleNewClick = () => {
    if (hasChanges) {
      ipcRenderer.send('show-warning', {
        message: UNSAVED_CHANGES_WARNING,
        action: {
          action: 'new-file',
          context: 'file-management',
        },
      })
    } else {
      handleNewFileRequest()
    }
  }

  const handleBuildTrigger = async () => {
    if (editorContent.length === 0) {
      return reportMessageToTray({
        level: "warning",
        text: 'Nenhum programa para compilar',
      })
    }

    try {
      const tokens = await new Compiler(editorContent).compile()

      console.log(tokens)

      reportMessageToTray({
        level: "success",
        text: 'Compilado com sucesso',
      })
    } catch (error) {
      console.log(JSON.stringify(error))

      reportMessageToTray({
        level: 'error',
        text: error.message
      })
    }
  }

  const handleOpenClick = () => {
    if (hasChanges) {
      ipcRenderer.send('show-warning', {
        message: UNSAVED_CHANGES_WARNING,
        action: {
          action: 'open-file',
          context: 'file-management',
        },
      })
    } else {
      ipcRenderer.send('open-file-request')
    }
  }

  const handleSaveClick = () => {
    if (!hasChanges) return

    if (!currentOpenFilePath) {
      return ipcRenderer.send('save-file-request')
    }

    writeFile(currentOpenFilePath, editorContent, (err) => {
      if (err) {
        return reportMessageToTray({
          level: 'error',
          text: 'Falha em salvar arquivo: ' + err.message,
        })
      }

      dispatch({
        type: 'saveFile',
      })
    })
  }

  useEffect(() => {
    const handleContextMenuAction = (
      _: IpcRendererEvent,
      action: UserAction
    ) => {
      if (action.context === 'message-tray' && action.action === 'clear-tray') {
        clearMessageTray()
      }

      if (isShortcutAction(action)) {
        switch (action.action) {
          case 'F1':
            return setTeamModalOpen(true)

          case 'F9':
            return handleBuildTrigger()

          case 'F11':
            return clearMessageTray()

          case 'CommandOrControl+N':
            return handleNewClick()

          case 'CommandOrControl+O':
            return handleOpenClick()

          case 'CommandOrControl+S':
            return handleSaveClick()
        }
      }

      if (isFileManagementAction(action) && action.action === 'new-file') {
        handleNewFileRequest()
      }

      if (isFileManagementAction(action) && action.action === 'open-file') {
        if (action.filePath) {
          handleOpenFileRequest(action.filePath)
        } else {
          ipcRenderer.send('open-file-request')
        }
      }

      if (
        isFileManagementAction(action) &&
        action.action === 'save-file' &&
        action.filePath
      ) {
        writeFile(action.filePath, editorContent, (err) => {
          if (err) {
            return reportMessageToTray({
              level: 'error',
              text: 'Falha em salvar arquivo: ' + err.message,
            })
          }

          dispatch({
            type: 'setOpenFile',
            payload: {
              path: action.filePath,
              content: editorContent,
            },
          })
        })
      }
    }

    ipcRenderer.on('user-action', handleContextMenuAction)

    return () => {
      ipcRenderer.off('user-action', handleContextMenuAction)
    }
  })

  const handleToolBarClick = (action: ToolBarAction) => {
    return {
      new: handleNewClick,
      open: handleOpenClick,
      save: handleSaveClick,
      copy: copyFromEditor,
      paste: pasteToEditor,
      cut: cutFromEditor,
      build: handleBuildTrigger,
      team: () => setTeamModalOpen(true),
    }[action]()
  }

  const handleClearMessagesRequest = (e: MouseEvent) => {
    ipcRenderer.send('message-tray-context-menu', {
      x: e.clientX,
      y: e.clientY,
    })
  }

  return (
    <>
      <Box display="flex" width="100%" height="100%" flexDirection="column">
        <Box
          bg="gray.700"
          borderBottomWidth="5px"
          borderBottomColor="gray.600"
          minHeight={70}
        >
          <ToolBar onClick={handleToolBarClick} />
        </Box>
        <Box flex={1} display="flex">
          <Editor
            ref={editorRef}
            value={editorContent}
            onChange={(payload) =>
              dispatch({ type: 'setEditorContent', payload })
            }
          />
        </Box>
        <Box
          height={100}
          overflowX="auto"
          overflowY="scroll"
          bg="gray.900"
          paddingX={2}
          borderTopWidth={5}
          borderBottomWidth={5}
          borderColor="gray.900"
          borderStyle="solid"
          onContextMenu={handleClearMessagesRequest}
        >
          <MessageTray messages={messages} />
        </Box>
        <Box height={30} display="flex" bg="gray.800" padding={2}>
          <StatusBar
            currentOpenFilePath={currentOpenFilePath}
            hasChanges={hasChanges}
          />
        </Box>
      </Box>
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />
    </>
  )
}
