import React, { useState, MouseEvent, useEffect, useMemo } from 'react'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import { promisify } from 'util'
import { Box } from '@chakra-ui/core'
import { Editor } from './components/Editor/Editor'
import { StatusBar } from './components/StatusBar/StatusBar'
import { MessageTray } from './components/MessageTray/MessageTray'
import { ToolBar, ToolBarAction } from './components/ToolBar/ToolBar'
import { TeamModal } from './components/TeamModal'
import { useMessageTray } from './components/MessageTray/useMessageTray'
import { IpcRendererEvent } from 'electron'
import { useEditor } from './components/Editor/useEditor'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const isFileManagementAction = (x: UserAction): x is FileManagementAction => {
  return x.context === 'file-management'
}

const UNSAVED_CHANGES_WARNING =
  'Você tem certeza? Perderá todas as alterações não salvas.'

export const App = () => {
  const [currentOpenFilePath, setCurrentOpenFilePath] = useState<
    string | undefined
  >()
  const [currentOpenFileContent, setCurrentOpenFileContent] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [isTeamModalOpen, setTeamModalOpen] = useState(false)

  const hasChanges = useMemo(() => {
    return currentOpenFileContent !== editorContent
  }, [currentOpenFileContent, editorContent])

  const {
    editorRef,
    copyFromEditor,
    pasteToEditor,
    cutFromEditor,
  } = useEditor()
  const { messages, reportMessageToTray, clearMessageTray } = useMessageTray()

  const handleNewFileRequest = () => {
    setCurrentOpenFilePath(undefined)
    setCurrentOpenFileContent('')
    setEditorContent('')
    clearMessageTray()
  }

  const handleOpenFileRequest = (filePath: string) => {
    readFile(filePath)
      .then((file) => {
        setCurrentOpenFilePath(filePath)
        setCurrentOpenFileContent(file.toString())
        setEditorContent(file.toString())
        clearMessageTray()
      })
      .catch(() => {
        reportMessageToTray({
          level: 'error',
          text: 'Falha em ler arquivo',
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
        writeFile(action.filePath, editorContent)
          .then(() => {
            setCurrentOpenFilePath(action.filePath)
            setCurrentOpenFileContent(editorContent)
          })
          .catch(() => {
            reportMessageToTray({
              level: 'error',
              text: 'Falha em salvar arquivo',
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
      new: () => {
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
      },
      open: () => {
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
      },
      save: () => {
        if (!hasChanges) return

        if (!currentOpenFilePath) {
          return ipcRenderer.send('save-file-request')
        }

        writeFile(currentOpenFilePath, editorContent)
          .then(() => {
            setCurrentOpenFileContent(editorContent)
          })
          .catch(() => {
            reportMessageToTray({
              level: 'error',
              text: 'Falha em salvar arquivo',
            })
          })
      },
      copy: copyFromEditor,
      paste: pasteToEditor,
      cut: cutFromEditor,
      build: () => {
        reportMessageToTray({
          level: 'warning',
          text: 'Compilação de programas ainda não foi implementada',
        })
      },
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
            onChange={setEditorContent}
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
