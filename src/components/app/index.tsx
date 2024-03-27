import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

import { Backdrop, CircularProgress, Grid, ThemeProvider } from '@mui/material'
import { Container } from '@mui/system'
import { useReducer, useState } from 'react'

import { VIEW, ViewContext } from '../context'
import { StatisticsView } from '../statistics'
import { theme } from '../theme'
import { WorldMap } from '../world'
import { Footer } from './Footer'
import { Header } from './Header'
import { Landing } from './Landing'

function App() {
  const [state, dispatch] = useReducer(VIEW.reducer, VIEW.init)
  const [stats, toggleStats] = useState(false)
  return (
    <ThemeProvider theme={theme}>
      <ViewContext.Provider value={{ state, dispatch }}>
        <Header stats={stats} toggleStats={toggleStats}></Header>
        <Container className='paper' maxWidth={false} sx={{ height: '100vh', padding: 0 }}>
          {!state?.id && <Landing></Landing>}
          {state?.id && !stats && (
            <Grid container justifyContent='center' pt={12} spacing={3}>
              <Grid item xs={12}>
                <WorldMap></WorldMap>
              </Grid>
            </Grid>
          )}
          {state?.id && stats && <StatisticsView></StatisticsView>}
          <Backdrop
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open={state.loading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Container>
        <Footer></Footer>
      </ViewContext.Provider>
    </ThemeProvider>
  )
}

export default App
