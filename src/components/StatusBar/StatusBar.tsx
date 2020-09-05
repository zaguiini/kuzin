import React from 'react'
import { Box } from '@chakra-ui/core'
import { Text } from 'src/components/Text'

interface StatusBarProps {
  currentOpenFilePath?: string
  hasChanges: boolean
}

export const StatusBar = ({
  currentOpenFilePath,
  hasChanges,
}: StatusBarProps) => {
  return (
    <Box display="flex" flex={1} alignItems="center">
      <Text fontSize="xs">
        {currentOpenFilePath ? (
          <>
            Arquivo atual{' '}
            <Text fontWeight="bold" as="span">
              {currentOpenFilePath}
            </Text>
          </>
        ) : (
          <>Editando arquivo novo</>
        )}
        {hasChanges && ' (alterações não salvas)'}
      </Text>
    </Box>
  )
}
