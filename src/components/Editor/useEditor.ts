import MonacoEditor from 'react-monaco-editor'
import { useRef } from 'react'

const hasSelection = (editor: Exclude<MonacoEditor['editor'], undefined>) => {
  const selection = editor.getSelection()

  if (selection) {
    const isSameLine = selection.startLineNumber === selection.endLineNumber
    const isSameColumn = selection.startColumn === selection.endColumn

    return !isSameColumn || !isSameLine
  }
}

export const useEditor = () => {
  const editor = useRef<MonacoEditor>(null)

  const copyFromEditor = () => {
    if (editor.current?.editor && hasSelection(editor.current.editor)) {
      editor.current.editor.trigger(
        'source',
        'editor.action.clipboardCopyAction',
        null
      )
    }
  }

  const pasteToEditor = () => {
    if (editor.current?.editor) {
      editor.current.editor.focus()
      // https://github.com/microsoft/monaco-editor/issues/999
      document.execCommand('paste')
    }
  }

  const cutFromEditor = () => {
    if (editor.current?.editor && hasSelection(editor.current.editor)) {
      editor.current.editor.trigger(
        'source',
        'editor.action.clipboardCutAction',
        null
      )
    }
  }

  return {
    editorRef: editor,
    copyFromEditor,
    pasteToEditor,
    cutFromEditor,
  }
}
