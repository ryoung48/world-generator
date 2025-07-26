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

import { TEMPERATURE } from '../../../models/cells/weather/temperature'
import { TIME } from '../../../models/utilities/math/time'
import { VIEW } from '../../context'

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
  const province = window.world.provinces[state.loc.province]
  const cell = window.world.cells[province.hub.cell]
  const temp = range(TIME.constants.monthsPerYear).map(month =>
    TEMPERATURE.monthly.mean({ cell, month })
  )
  const colors = range(TIME.constants.monthsPerYear).map(month => TEMPERATURE.color(temp[month]))

  const limits = range(TIME.constants.monthsPerYear).map(month =>
    TEMPERATURE.monthly.range({ cell, month })
  )
  const max = limits.map(limit => limit.max)
  const min = limits.map(limit => limit.min)

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
        data: temp,
        backgroundColor: colors,
        borderColor: colors,
        labelColor: 'red',
        borderWidth: 1,
        order: 2
      },
      {
        type: 'line' as const,
        label: 'Max',
        data: max,
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
        data: min,
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
          text: 'Temperature (°C)'
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
