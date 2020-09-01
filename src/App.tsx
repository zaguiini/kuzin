import React, { useState } from 'react'
import { Box } from '@chakra-ui/core'

import { Editor } from './components/Editor/Editor'
import { StatusBar } from './components/StatusBar/StatusBar'
import { MessageTray } from './components/MessageTray/MessageTray'
import { ToolBar, ToolBarAction } from './components/ToolBar/ToolBar'
import { TeamModal } from './components/TeamModal'

const defaultMessages = [
  {
    level: 'warning' as const,
    text: 'Use camisinha',
  },
  {
    level: 'error' as const,
    text: 'Bucetaram minha mente',
  },
  {
    level: 'success' as const,
    text: 'deu boa carai',
  },
  {
    level: 'warning' as const,
    text: 'Use camisinha',
  },
  {
    level: 'error' as const,
    text: 'Bucetaram minha mente',
  },
  {
    level: 'success' as const,
    text: 'deu boa carai',
  },
]

export const App = () => {
  const [path] = useState('/Users/zaguini/tuamae/gosta.txt')
  const [isTeamModalOpen, setTeamModalOpen] = useState(false)
  const [messages] = useState(defaultMessages)

  const handleToolBarClick = (action: ToolBarAction) => {
    return {
      new: () => {},
      open: () => {},
      save: () => {},
      copy: () => {},
      paste: () => {},
      cut: () => {},
      build: () => {},
      team: () => {
        setTeamModalOpen(true)
      },
    }[action]()
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
          <Editor />
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
