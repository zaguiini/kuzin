import React, { ComponentProps } from 'react'
import { Text as BaseText } from '@chakra-ui/core'

export const defaultTextColor = 'gray.100'

export const Text = ({
  color = defaultTextColor,
  ...props
}: ComponentProps<typeof BaseText>) => {
  return <BaseText color={color} {...props} />
}
