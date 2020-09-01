import React, { useRef } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { useResizeKey } from 'src/hooks/useResizeKey'

export const Editor = () => {
  const editor = useRef<MonacoEditor>(null)
  const currentText = useRef('')
  const resizeKey = useResizeKey()

  console.log(editor.current)

  return (
    <MonacoEditor
      ref={editor}
      onChange={(text) => {
        currentText.current = text
      }}
      key={resizeKey}
      defaultValue={currentText.current}
      theme="vs-dark"
    />
  )
}
