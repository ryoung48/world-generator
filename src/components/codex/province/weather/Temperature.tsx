import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { range } from 'd3'
import { Chart } from 'react-chartjs-2'

import { TEMPERATURE } from '../../../../models/cells/weather/temperature'
import { TIME } from '../../../../models/utilities/math/time'
import { VIEW } from '../../../context'
import { MAP_METRICS } from '../../../world/paint/shapes/metrics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export function TemperatureView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  const cell = window.world.cells[province.hub.cell]
  const tempCelsius = range(TIME.constants.monthsPerYear).map(month =>
    TEMPERATURE.monthly.mean({ cell, month })
  )
  const tempConverted = tempCelsius.map(celsius =>
    MAP_METRICS.temperature.value(celsius, state.units)
  )
  const colors = range(TIME.constants.monthsPerYear).map(month =>
    TEMPERATURE.color(tempCelsius[month])
  )
  const units = MAP_METRICS.temperature.units(state.units)

  const limits = range(TIME.constants.monthsPerYear).map(month =>
    TEMPERATURE.monthly.range({ cell, month })
  )
  const maxConverted = limits.map(limit => MAP_METRICS.temperature.value(limit.max, state.units))
  const minConverted = limits.map(limit => MAP_METRICS.temperature.value(limit.min, state.units))

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Average',
        data: tempConverted,
        backgroundColor: colors,
        borderColor: colors,
        labelColor: 'red',
        borderWidth: 1,
        order: 2
      },
      {
        type: 'line' as const,
        label: 'Max',
        data: maxConverted,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        order: 1
      },
      {
        type: 'line' as const,
        label: 'Min',
        data: minConverted,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        order: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: false,
        text: 'Monthly Average Temperature'
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Temperature (${units})`
        }
      }
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Chart type='bar' data={data} options={options} height={100} />
    </div>
  )
}
