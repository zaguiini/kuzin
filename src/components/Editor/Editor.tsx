import React, { forwardRef } from 'react'
import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor'
import { useResizeKey } from './useResizeKey'

export const Editor = forwardRef<
  MonacoEditor,
  Pick<MonacoEditorProps, 'value' | 'onChange'>
>(({ value, onChange }, ref) => {
  const resizeKey = useResizeKey()

  return (
    <MonacoEditor
      ref={ref}
      options={{ copyWithSyntaxHighlighting: false }}
      value={value}
      onChange={onChange}
      language="plaintext"
      key={resizeKey}
      theme="vs-dark"
    />
  )
})
