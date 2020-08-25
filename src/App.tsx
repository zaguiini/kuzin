import React from 'react'
import { Text, Box } from '@chakra-ui/core'

export const App = () => (
  <Box display="flex" width="100%" height="100%" flexDirection="column">
    <Box bg="red.500" minHeight={70}>
      <Text>Barra de ferramentas</Text>
    </Box>
    <Box bg="blue.500" flex={1}>
      <Text>Editor</Text>
    </Box>
    <Box bg="green.500" minHeight={100}>
      <Text>Mensagens</Text>
    </Box>
    <Box bg="yellow.500" minHeight={30}>
      <Text>Status</Text>
    </Box>
  </Box>
)
