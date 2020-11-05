import { Message } from './MessageTray'
import { useState } from 'react'

export const useMessageTray = () => {
  const [messages, setMessages] = useState<Message[]>([])

  return {
    messages,
    reportMessageToTray: (...newMessages: Omit<Message, 'id'>[]) =>
      setMessages((currentMessages) => [
        ...newMessages.map((message) => ({
          ...message,
          id: new Date().toISOString(),
        })),
        ...currentMessages,
      ]),
    clearMessageTray: () => setMessages([]),
  }
}
