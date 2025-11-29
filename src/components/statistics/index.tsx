import { Button, Grid } from '@mui/material'
import { ArrowLeft } from 'mdi-material-ui'

import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { VIEW } from '../context'
import { fonts } from '../theme/fonts'
import { DevelopmentChart } from './development'
import { PerformanceView } from './performance'
import TemperatureChart from './temperature'
import { TopographyChart } from './topography'
import { Stat } from './types'
import { VegetationChart } from './vegetation'
import WorldStatistics from './world'

export function StatisticsView() {
  const { dispatch } = VIEW.context()
  const modes = ['world', 'history', 'development', 'climate', 'vegetation', 'topography'] as Stat[]
  return (
    <Grid container sx={{ height: '100%', overflow: 'auto' }}>
      <Button
        variant='contained'
        size='small'
        onClick={() => dispatch({ type: 'toggle stats' })}
        startIcon={<ArrowLeft />}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 2,
          background: 'rgba(241, 241, 241, 0.95)',
          color: 'black',
          fontFamily: fonts.maps,
          textTransform: 'none',
          fontSize: 14,
          '&:hover': {
            background: 'rgba(220, 220, 220, 0.95)'
          }
        }}
      >
        Back to Map
      </Button>
      <Grid item xs={12} pt={8}>
        <ToggleButtons
          selection={modes}
          content={mode => {
            if (mode === 'world') return <WorldStatistics />
            if (mode === 'vegetation') return <VegetationChart />
            if (mode === 'climate') return <TemperatureChart />
            if (mode === 'development') return <DevelopmentChart />
            if (mode === 'topography') return <TopographyChart />
            return <PerformanceView mode={mode} />
          }}
        ></ToggleButtons>
      </Grid>
    </Grid>
  )
}
