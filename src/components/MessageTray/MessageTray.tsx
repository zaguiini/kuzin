import React from 'react'
import { List, ListItem, ListIcon } from '@chakra-ui/core'
import { defaultTextColor } from '../Text'

type Level = 'warning' | 'error' | 'success'

export interface Message {
  id: string
  level: Level
  text: string
}

interface MessageTrayProps {
  messages: Message[]
}

const getIcon = (level: Level) =>
  ({
    warning: 'warning-2',
    success: 'check',
    error: 'close',
  }[level])

const getIconColor = (level: Level) =>
  ({
    warning: 'yellow.300',
    success: 'green.300',
    error: 'red.300',
  }[level])

export const MessageTray = ({ messages }: MessageTrayProps) => {
  return (
    <List spacing={2}>
      {messages.map(({ id, level, text }) => (
        <ListItem key={id} color={defaultTextColor} fontSize="sm">
          <ListIcon icon={getIcon(level)} color={getIconColor(level)} />
          {text}
        </ListItem>
      ))}
    </List>
  )
}
