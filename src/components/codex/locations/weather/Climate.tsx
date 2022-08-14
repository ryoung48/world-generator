import { ChartData } from 'chart.js'
import { interpolateBuPu, interpolateSpectral, interpolateViridis, range } from 'd3'
import { Bar } from 'react-chartjs-2'

import { view__context } from '../../../../context'
import { scale } from '../../../../models/utilities/math'
import { months } from '../../../../models/utilities/math/time'
import { world__day_length, world__gps } from '../../../../models/world'
import { climate_lookup } from '../../../../models/world/climate/types'
import { compute_heat, compute_rain } from '../../../../models/world/climate/weather'
import { ToggleButtons } from '../../common/navigation/ToggleButtons'

function ClimateChart(props: { data: ChartData<'bar', string[], string>['datasets'][number] }) {
  return (
    <div style={{ height: '200px' }}>
      <Bar
        data={{
          labels: months,
          datasets: [props.data]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }}
      ></Bar>
    </div>
  )
}

export function ClimateView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const cell = window.world.cells[location.cell]
  const province = window.world.provinces[location.province]
  const climate = climate_lookup[window.world.regions[province.region].climate]
  const temp = range(months.length).map(month => {
    return compute_heat({ cell, month, climate })
  })
  const rain = range(months.length).map(month => {
    const rain = compute_rain({ climate, month, cell })
    return rain * 100
  })
  const { latitude } = world__gps(cell)
  const hours = range(months.length).map(m => world__day_length(latitude, (m / 12) * 365))
  return (
    <ToggleButtons
      selection={['temperature', 'rain', 'sunlight']}
      content={selected => {
        let chart_data = temp
        let color_map = (t: number) => interpolateSpectral(scale([-30, 90], [1, 0], t))
        let label = 'Monthly Average Temperatures (°F)'
        if (selected === 'rain') {
          chart_data = rain
          label = 'Monthly Rain Chance (%)'
          color_map = t => interpolateViridis(scale([0, 100], [1, 0], t))
        } else if (selected === 'sunlight') {
          chart_data = hours
          label = 'Monthly Day Length (hours)'
          color_map = t => interpolateBuPu(scale([0, 30], [1, 0], t))
        }
        return (
          <ClimateChart
            data={{
              label: label,
              data: chart_data.map(t => t.toFixed(2)),
              backgroundColor: chart_data.map(color_map)
            }}
          ></ClimateChart>
        )
      }}
    ></ToggleButtons>
  )
}
