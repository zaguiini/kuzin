import React, { useState, useRef } from 'react'
import { Box } from '@chakra-ui/core'

import { Editor } from './components/Editor/Editor'
import { StatusBar } from './components/StatusBar/StatusBar'
import { MessageTray, Message } from './components/MessageTray/MessageTray'
import { ToolBar, ToolBarAction } from './components/ToolBar/ToolBar'
import { TeamModal } from './components/TeamModal'
import MonacoEditor from 'react-monaco-editor'

export const App = () => {
  const [path] = useState('/Users/zaguini/tuamae/gosta.txt')
  const [isTeamModalOpen, setTeamModalOpen] = useState(false)
  const editor = useRef<MonacoEditor>(null)

  const handleToolBarClick = (action: ToolBarAction) => {
    const hasSelection = () => {
      const selection = editor.current?.editor?.getSelection()

      if (selection) {
        const isSameLine = selection.startLineNumber === selection.endLineNumber
        const isSameColumn = selection.startColumn === selection.endColumn

        return !isSameColumn || !isSameLine
      }
    }

    return {
      new: () => {},
      open: () => {},
      save: () => {},
      copy: () => {
        if (editor.current?.editor && hasSelection()) {
          editor.current.editor.trigger(
            'source',
            'editor.action.clipboardCopyAction',
            null
          )
        }
      },
      paste: () => {
        if (editor.current?.editor) {
          editor.current.editor.focus()
          // https://github.com/microsoft/monaco-editor/issues/999
          document.execCommand('paste')
        }
      },
      cut: () => {
        if (editor.current?.editor && hasSelection()) {
          editor.current.editor.trigger(
            'source',
            'editor.action.clipboardCutAction',
            null
          )
        }
      },
      build: () => {},
      team: () => setTeamModalOpen(true),
    }[action]()
  }

  const [messages] = useState<Message[]>([])

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
          <Editor ref={editor} />
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
        >
          <MessageTray messages={messages} />
        </Box>
        <Box height={30} display="flex" bg="gray.800" padding={2}>
          <StatusBar path={path} />
        </Box>
      </Box>
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />
    </>
  )
}
