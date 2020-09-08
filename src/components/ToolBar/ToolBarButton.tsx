import React, { ComponentType } from 'react'
import { Button, ButtonProps, Box } from '@chakra-ui/core'
import { Text } from 'src/components/Text'

interface ToolBarButtonProps extends ButtonProps {
  icon: ComponentType
  shortcut: string
}

export const ToolBarButton = ({
  icon,
  shortcut,
  children,
  outline = 'none',
  size = 'md',
  flex = 1,
  height = '70px',
  bg = 'gray.700',
  color = 'gray.300',
  ...props
}: ToolBarButtonProps) => {
  return (
    <Button
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      size={size}
      color={color}
      bg={bg}
      flex={flex}
      height={height}
      _hover={{
        bg: 'gray.800',
      }}
      _focus={{
        bg: 'gray.800',
        outline,
      }}
      {...props}
    >
      <Box as={icon} marginBottom={1} />
      {children}
      <Text as={Box} marginTop={1} fontSize="xs" color="gray.500">
        {shortcut}
      </Text>
    </Button>
  )
}
