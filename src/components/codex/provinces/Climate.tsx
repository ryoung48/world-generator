import { Grid } from '@mui/material'
import { Bar } from 'react-chartjs-2'

import { PROVINCE } from '../../../models/regions/provinces'
import { WEATHER } from '../../../models/regions/provinces/weather'
import { months } from '../../../models/utilities/math/time'
import { VIEW } from '../../context'
import { MAP } from '../../world/common'

export function ProvinceClimate() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.province]
  const cell = PROVINCE.cell(province)
  const heat = months.map((_, i) => {
    const celsius = WEATHER.heat({ cell, month: i + 1 })
    return {
      data: MAP.metrics.temperature.value(celsius),
      color: MAP.metrics.temperature.color(celsius)
    }
  })
  const rain = months.map((_, i) => {
    const mm = WEATHER.rain({ cell, month: i + 1 })
    return {
      data: MAP.metrics.rain.value(mm),
      color: MAP.metrics.rain.color(mm)
    }
  })
  return (
    <Grid container>
      <Grid item xs={12}>
        <Bar
          height={75}
          data={{
            labels: months,
            datasets: [
              {
                data: heat.map(({ data }) => data),
                backgroundColor: heat.map(({ color }) => color)
              }
            ]
          }}
          options={{
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: `Monthly Temperature (${MAP.metrics.temperature.units()})`
              }
            }
          }}
        ></Bar>
      </Grid>
      <Grid item xs={12}>
        <Bar
          height={75}
          data={{
            labels: months,
            datasets: [
              {
                data: rain.map(({ data }) => data),
                backgroundColor: rain.map(({ color }) => color)
              }
            ]
          }}
          options={{
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: `Monthly Precipitation (${MAP.metrics.rain.units()})`
              }
            }
          }}
        ></Bar>
      </Grid>
    </Grid>
  )
}
