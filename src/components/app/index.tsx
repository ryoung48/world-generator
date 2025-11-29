import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

import { Backdrop, Box, CircularProgress, ThemeProvider } from '@mui/material'
import { useReducer } from 'react'

import { VIEW, ViewContext } from '../context'
import { StatisticsView } from '../statistics'
import { theme } from '../theme'
import { WorldMap } from '../world'
import { Landing } from './Landing'

function App() {
  const [state, dispatch] = useReducer(VIEW.reducer, VIEW.init)
  return (
    <ThemeProvider theme={theme}>
      <ViewContext.Provider value={{ state, dispatch }}>
        <Box
          className='paper'
          sx={{ height: '100vh', width: '100vw', padding: 0, margin: 0, overflow: 'hidden' }}
        >
          {!state?.id && <Landing></Landing>}
          {state?.id && !state.stats && <WorldMap></WorldMap>}
          {state?.id && state.stats && <StatisticsView></StatisticsView>}
          <Backdrop
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open={state.loading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Box>
      </ViewContext.Provider>
    </ThemeProvider>
  )
}

export default App
