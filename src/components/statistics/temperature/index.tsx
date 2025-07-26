import { Box } from '@mui/material'
import * as d3 from 'd3'
import React from 'react'

import { EBM } from '../../../models/cells/weather/ebm'
import { SimpleToggle } from '../../common/navigation/ToggleButtons'
import AnnualTempByLat from './AnnualTemp'
import { ClimateChart } from './Climate'
import DaylightByLat from './Daylight'
import InsolationChart from './Insolation'
import PrecipitationByLat from './Precipitation'
import SeasonalTempByLat from './SeasonalTempByLat'

const TemperatureChart: React.FC = () => {
  const model = EBM.model
  const heat = model.heat
  const numLatitudes = heat.length
  const numDays = heat[0].length

  const latScale = d3.scaleLinear().domain([0, numLatitudes]).range([-90, 90])

  const latRange = Array.from({ length: numLatitudes + 1 }, (_, i) => latScale(i))
  const dayStep = 8
  const sampledDays = Array.from({ length: Math.ceil(numDays / dayStep) }, (_, i) => i * dayStep)

  const dayLabels = sampledDays.map(i => `Day ${i + 1}`)

  // Calculate cosine weights for latitude area
  const cosineWeights = latRange.map(lat => Math.cos((lat * Math.PI) / 180))

  // Calculate global area-weighted average temperature
  const weightedTemps = heat.map((row, i) => {
    const avg = d3.mean(row) || 0
    return avg * cosineWeights[i]
  })
  const totalWeight = d3.sum(cosineWeights)
  const globalAvgTemp = d3.sum(weightedTemps) / totalWeight

  console.log('Global weighted avg temp:', globalAvgTemp.toFixed(2) + '°C')

  return (
    <Box width='100%'>
      <SimpleToggle
        tabs={{
          Climate: <ClimateChart />,
          Temperature: (
            <SeasonalTempByLat
              heat={heat}
              latRange={latRange}
              sampledDays={sampledDays}
              dayLabels={dayLabels}
            />
          ),
          Annual: <AnnualTempByLat heat={heat} latRange={latRange} />,
          Insolation: (
            <InsolationChart
              insolation={model.insolation}
              latRange={latRange}
              sampledDays={sampledDays}
              dayLabels={dayLabels}
            />
          ),
          Daylight: (
            <DaylightByLat
              daylight={model.daylightHours}
              latRange={latRange}
              sampledDays={sampledDays}
              dayLabels={dayLabels}
            />
          ),
          Precipitation: <PrecipitationByLat />
        }}
      ></SimpleToggle>
    </Box>
  )
}

export default TemperatureChart
