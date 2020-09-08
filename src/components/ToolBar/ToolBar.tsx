import React from 'react'
import { Box } from '@chakra-ui/core'
import { ToolBarButton } from './ToolBarButton'
import {
  FaFileMedical,
  FaFolderOpen,
  FaSave,
  FaRegCopy,
  FaPaste,
  FaCut,
  FaWrench,
  FaUserFriends,
} from 'react-icons/fa'

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
      <ToolBarButton
        shortcut="Ctrl + N"
        icon={FaFileMedical}
        onClick={() => onClick('new')}
      >
        Novo
      </ToolBarButton>
      <ToolBarButton
        shortcut="Ctrl + O"
        icon={FaFolderOpen}
        onClick={() => onClick('open')}
      >
        Abrir
      </ToolBarButton>
      <ToolBarButton
        shortcut="Ctrl + S"
        icon={FaSave}
        onClick={() => onClick('save')}
      >
        Salvar
      </ToolBarButton>
      <ToolBarButton
        shortcut="Ctrl + C"
        icon={FaRegCopy}
        onClick={() => onClick('copy')}
      >
        Copiar
      </ToolBarButton>
      <ToolBarButton
        shortcut="Ctrl + V"
        icon={FaPaste}
        onClick={() => onClick('paste')}
      >
        Colar
      </ToolBarButton>
      <ToolBarButton
        shortcut="Ctrl + X"
        icon={FaCut}
        onClick={() => onClick('cut')}
      >
        Recortar
      </ToolBarButton>
      <ToolBarButton
        shortcut="F9"
        icon={FaWrench}
        onClick={() => onClick('build')}
      >
        Compilar
      </ToolBarButton>
      <ToolBarButton
        shortcut="F1"
        icon={FaUserFriends}
        onClick={() => onClick('team')}
      >
        Equipe
      </ToolBarButton>
    </Box>
  )
}
