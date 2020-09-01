import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'

export const ToolBarButton = ({
  size = 'md',
  flex = 1,
  height = '70px',
  bg = 'gray.700',
  color = 'gray.300',
  ...props
}: ButtonProps) => {
  return (
    <Button
      size={size}
      color={color}
      bg={bg}
      flex={flex}
      height={height}
      _hover={{
        bg: 'gray.800',
      }}
      {...props}
    />
  )
}
