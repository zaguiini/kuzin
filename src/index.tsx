import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './theme'
import { App } from './App'

render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
