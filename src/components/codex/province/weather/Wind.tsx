import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { range } from 'd3'
import { Chart } from 'react-chartjs-2'

import { TIME } from '../../../../models/utilities/math/time'
import { VIEW } from '../../../context'
import { MAP_METRICS } from '../../../world/paint/shapes/metrics'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function windDirectionToColor(direction: number): string {
  // Convert wind direction to HSL color where hue represents direction
  // 0° (North) = 0° hue (red), 90° (East) = 90° hue (yellow-green), etc.
  const hue = direction
  return `hsl(${hue}, 70%, 50%)`
}

// Remove this function - will use MAP_METRICS instead

export function WindView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  const cell = window.world.cells[province.hub.cell]

  // Extract wind data for each month with unit conversion
  const windData = range(TIME.constants.monthsPerYear).map(month => {
    if (cell.wind && cell.wind[month]) {
      return {
        speedRaw: cell.wind[month].speed, // Keep raw m/s for calculations
        speed: MAP_METRICS.wind.value(cell.wind[month].speed, state.units),
        direction: cell.wind[month].direction
      }
    }
    // Fallback if no wind data
    return { speedRaw: 0, speed: 0, direction: 0 }
  })

  const speeds = windData.map(w => w.speed)
  const colors = windData.map(w => windDirectionToColor(w.direction))
  const units = MAP_METRICS.wind.units(state.units)

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
        label: 'Wind Speed',
        data: speeds,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('50%', '40%')), // Darker borders
        borderWidth: 1,
        order: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const
      },
      title: {
        display: false,
        text: 'Monthly Wind Speed and Direction'
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return context[0].label
          },
          label: (context: any) => {
            const monthIndex = context.dataIndex
            const wind = windData[monthIndex]
            const directionName = getDirectionName(wind.direction)
            return [
              `Speed: ${Math.round(wind.speed)} ${units}`,
              `Direction: ${Math.round(wind.direction)}° (${directionName})`
            ]
          }
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Wind Speed (${units})`
        },
        beginAtZero: true
      }
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Chart type='bar' data={data} options={options} height={100} />
      <div
        style={{
          marginTop: '10px',
          fontSize: '10px',
          textAlign: 'center',
          color: '#666'
        }}
      >
        Bar height = wind speed, Color = wind direction (blowing from)
      </div>
      <div
        style={{
          marginTop: '5px',
          fontSize: '9px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >
        <span style={{ color: windDirectionToColor(0) }}>■ N</span>
        <span style={{ color: windDirectionToColor(90) }}>■ E</span>
        <span style={{ color: windDirectionToColor(180) }}>■ S</span>
        <span style={{ color: windDirectionToColor(270) }}>■ W</span>
      </div>
    </div>
  )
}

function getDirectionName(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}
