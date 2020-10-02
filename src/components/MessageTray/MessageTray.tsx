import React from 'react'
import { List, ListItem, ListIcon } from '@chakra-ui/core'
import { defaultTextColor } from '../Text'

type Level = 'warning' | 'error' | 'success' | 'code'

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
    code: 'check',
  }[level])

const getIconColor = (level: Level) =>
  ({
    warning: 'yellow.300',
    success: 'green.300',
    error: 'red.300',
    code: 'green.300',
  }[level])

export const MessageTray = ({ messages }: MessageTrayProps) => {
  return (
    <List spacing={2}>
      {messages.map(({ id, level, text }) => (
        <ListItem key={id} color={defaultTextColor} fontSize="sm" display="flex" alignItems="flex-start">
          <ListIcon icon={getIcon(level)} color={getIconColor(level)} />
          <div>{level === 'code' ? <pre>{text}</pre> : text}</div>
        </ListItem>
      ))}
    </List>
  )
}
