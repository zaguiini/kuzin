import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './theme'
import { App } from './App'
import { RecoilRoot } from 'recoil'

render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById('root')
)
