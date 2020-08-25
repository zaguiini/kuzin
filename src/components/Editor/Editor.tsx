import React, { useRef } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { useResizeKey } from 'src/hooks/useResizeKey'

export const Editor = () => {
  const currentText = useRef('')
  const resizeKey = useResizeKey()

  return (
    <MonacoEditor
      onChange={(text) => {
        currentText.current = text
      }}
      key={resizeKey}
      defaultValue={currentText.current}
      theme="vs-dark"
    />
  )
}
