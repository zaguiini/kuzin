import React, { useRef, forwardRef } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { useResizeKey } from 'src/hooks/useResizeKey'

export const Editor = forwardRef<MonacoEditor>((_, ref) => {
  const currentText = useRef('')
  const resizeKey = useResizeKey()

  return (
    <MonacoEditor
      ref={ref}
      options={{ copyWithSyntaxHighlighting: false }}
      onChange={(text) => {
        currentText.current = text
      }}
      key={resizeKey}
      defaultValue={currentText.current}
      theme="vs-dark"
    />
  )
})

Editor.displayName = 'Editor'
