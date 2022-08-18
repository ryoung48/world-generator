import { ChartData } from 'chart.js'
import { interpolateBuPu, interpolateSpectral, interpolateViridis, range } from 'd3'
import { Bar } from 'react-chartjs-2'

import { scale } from '../../../../models/utilities/math'
import { months } from '../../../../models/utilities/math/time'
import { world__dayLength, world__gps } from '../../../../models/world'
import { climateLookup } from '../../../../models/world/climate/types'
import { computeHeat, computeRain } from '../../../../models/world/climate/weather'
import { view__context } from '../../../context'
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
  const climate = climateLookup[window.world.regions[province.region].climate]
  const temp = range(months.length).map(month => {
    return computeHeat({ cell, month, climate })
  })
  const rain = range(months.length).map(month => {
    const rain = computeRain({ climate, month, cell })
    return rain * 100
  })
  const { latitude } = world__gps(cell)
  const hours = range(months.length).map(m => world__dayLength(latitude, (m / 12) * 365))
  return (
    <ToggleButtons
      selection={['temperature', 'rain', 'sunlight']}
      content={selected => {
        let chartData = temp
        let colorMap = (t: number) => interpolateSpectral(scale([-30, 90], [1, 0], t))
        let label = 'Monthly Average Temperatures (°F)'
        if (selected === 'rain') {
          chartData = rain
          label = 'Monthly Rain Chance (%)'
          colorMap = t => interpolateViridis(scale([0, 100], [1, 0], t))
        } else if (selected === 'sunlight') {
          chartData = hours
          label = 'Monthly Day Length (hours)'
          colorMap = t => interpolateBuPu(scale([0, 30], [1, 0], t))
        }
        return (
          <ClimateChart
            data={{
              label: label,
              data: chartData.map(t => t.toFixed(2)),
              backgroundColor: chartData.map(colorMap)
            }}
          ></ClimateChart>
        )
      }}
    ></ToggleButtons>
  )
}
