import React from 'react'
import { Box } from '@chakra-ui/core'
import { Text } from 'src/components/Text'

interface StatusBarProps {
  path: string
}

export const StatusBar = ({ path }: StatusBarProps) => {
  return (
    <Box display="flex" flex={1} alignItems="center">
      <Text fontSize="xs">
        Arquivo atual{' '}
        <Text fontWeight="bold" as="span">
          {path}
        </Text>
      </Text>
    </Box>
  )
}
