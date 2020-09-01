import React from 'react'
import { Box } from '@chakra-ui/core'
import { ToolBarButton } from './ToolBarButton'

export type ToolBarAction =
  | 'new'
  | 'open'
  | 'save'
  | 'copy'
  | 'paste'
  | 'cut'
  | 'build'
  | 'team'

interface ToolBarProps {
  onClick(action: ToolBarAction): void
}

export const ToolBar = ({ onClick }: ToolBarProps) => {
  return (
    <Box display="flex">
      <ToolBarButton onClick={() => onClick('new')}>Novo</ToolBarButton>
      <ToolBarButton onClick={() => onClick('open')}>Abrir</ToolBarButton>
      <ToolBarButton onClick={() => onClick('save')}>Salvar</ToolBarButton>
      <ToolBarButton onClick={() => onClick('copy')}>Copiar</ToolBarButton>
      <ToolBarButton onClick={() => onClick('paste')}>Colar</ToolBarButton>
      <ToolBarButton onClick={() => onClick('cut')}>Recortar</ToolBarButton>
      <ToolBarButton onClick={() => onClick('build')}>Compilar</ToolBarButton>
      <ToolBarButton onClick={() => onClick('team')}>Equipe</ToolBarButton>
    </Box>
  )
}
