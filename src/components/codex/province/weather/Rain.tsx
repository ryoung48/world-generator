import { range } from 'd3'
import { Bar } from 'react-chartjs-2'

import { RAIN } from '../../../../models/cells/weather/rain'
import { TIME } from '../../../../models/utilities/math/time'
import { VIEW } from '../../../context'
import { MAP_METRICS } from '../../../world/paint/shapes/metrics'

export function RainView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  const cell = window.world.cells[province.hub.cell]
  const rainMm = range(TIME.constants.monthsPerYear).map(month =>
    RAIN.monthly.total({ cell, month })
  )
  const rainConverted = rainMm.map(mm => MAP_METRICS.rain.value(mm, state.units))
  const colors = range(TIME.constants.monthsPerYear).map(month => RAIN.monthly.color(rainMm[month]))
  const units = MAP_METRICS.rain.units(state.units)

  const data = {
    labels: TIME.month.names,
    datasets: [
      {
        label: `Rainfall (${units})`,
        data: rainConverted,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: 'Rainfall'
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Rainfall (${units})`
        }
      }
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Bar data={data} options={options} height={100} />
    </div>
  )
}
