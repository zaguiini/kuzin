import React from 'react'
import { Box } from '@chakra-ui/core'
import { ToolBarButton } from './ToolBarButton'
import { FaFileMedical, FaFolderOpen, FaSave, FaRegCopy, FaPaste, FaCut, FaWrench, FaUserFriends } from 'react-icons/fa'

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
      <ToolBarButton icon={FaFileMedical} onClick={() => onClick('new')}>Novo</ToolBarButton>
      <ToolBarButton icon={FaFolderOpen} onClick={() => onClick('open')}>Abrir</ToolBarButton>
      <ToolBarButton icon={FaSave} onClick={() => onClick('save')}>Salvar</ToolBarButton>
      <ToolBarButton icon={FaRegCopy} onClick={() => onClick('copy')}>Copiar</ToolBarButton>
      <ToolBarButton icon={FaPaste} onClick={() => onClick('paste')}>Colar</ToolBarButton>
      <ToolBarButton icon={FaCut} onClick={() => onClick('cut')}>Recortar</ToolBarButton>
      <ToolBarButton icon={FaWrench} onClick={() => onClick('build')}>Compilar</ToolBarButton>
      <ToolBarButton icon={FaUserFriends} onClick={() => onClick('team')}>Equipe</ToolBarButton>
    </Box>
  )
}
