import React, { useState } from 'react'
import { Box } from '@chakra-ui/core'

import { Editor } from './components/Editor/Editor'
import { StatusBar } from './components/StatusBar/StatusBar'
import { Text } from './components/Text'
import { MessageTray } from './components/MessageTray/MessageTray'

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
  const [messages] = useState(defaultMessages)

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      bg="gray.800"
      flexDirection="column"
    >
      <Box bg="red.500" minHeight={70}>
        <Text>Barra de ferramentas</Text>
      </Box>
      <Box flex={1} display="flex">
        <Editor />
      </Box>
      <Box
        height={100}
        overflow="scroll"
        bg="gray.900"
        paddingX={2}
        borderTopWidth={5}
        borderBottomWidth={5}
        borderColor="gray.900"
        borderStyle="solid"
      >
        <MessageTray messages={messages} />
      </Box>
      <Box height={30} display="flex" padding={2}>
        <StatusBar path={path} />
      </Box>
    </Box>
  )
}
