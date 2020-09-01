import { ToolBarAction } from 'src/components/ToolBar/ToolBar'
import { useState } from 'react'

type UseToolBarActionsOptions = {
  onTeamClick(): void
}

export const useToolBarActions = ({
  onTeamClick,
}: UseToolBarActionsOptions) => {
  const handleToolBarClick = (action: ToolBarAction) => {
    return {
      new: () => {},
      open: () => {},
      save: () => {},
      copy: () => {},
      paste: () => {},
      cut: () => {},
      build: () => {},
      team: onTeamClick,
    }[action]()
  }

  return handleToolBarClick
}
