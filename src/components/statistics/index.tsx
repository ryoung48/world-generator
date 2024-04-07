import { Grid } from '@mui/material'

import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { ClimateChart } from './climate'
import { PerformanceView } from './performance'
import { Stat } from './types'

export function StatisticsView() {
  const modes = [...Object.keys(window.profiles), 'climates'] as Stat[]
  return (
    <Grid container pt={12}>
      <ToggleButtons
        selection={modes}
        content={mode => {
          if (mode === 'climates') return <ClimateChart></ClimateChart>
          return <PerformanceView mode={mode} />
        }}
      ></ToggleButtons>
    </Grid>
  )
}
