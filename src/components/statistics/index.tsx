import { Grid } from '@mui/material'

import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { DevelopmentChart } from './development'
import { PerformanceView } from './performance'
import { ResourceChart } from './resources'
import TemperatureChart from './temperature'
import { TopographyChart } from './topography'
import { Stat } from './types'
import { VegetationChart } from './vegetation'
import WorldStatistics from './world'

export function StatisticsView() {
  const modes = ['world', 'history', 'development', 'climate', 'vegetation', 'topography'] as Stat[]
  return (
    <Grid container pt={12}>
      <ToggleButtons
        selection={modes}
        content={mode => {
          if (mode === 'world') return <WorldStatistics />
          if (mode === 'resources') return <ResourceChart />
          if (mode === 'vegetation') return <VegetationChart />
          if (mode === 'climate') return <TemperatureChart />
          if (mode === 'development') return <DevelopmentChart />
          if (mode === 'topography') return <TopographyChart />
          return <PerformanceView mode={mode} />
        }}
      ></ToggleButtons>
    </Grid>
  )
}
