import { Message } from './MessageTray'
import { useState } from 'react'

export const useMessageTray = () => {
  const [messages, setMessages] = useState<Message[]>([])

  return {
    messages,
    reportMessage: (message: Omit<Message, 'id'>) =>
      setMessages([{ ...message, id: new Date().toISOString() }, ...messages]),
    clearMessages: () => setMessages([]),
  }
}
