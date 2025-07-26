import { range } from 'd3'
import { Bar } from 'react-chartjs-2'

import { RAIN } from '../../../models/cells/weather/rain'
import { TIME } from '../../../models/utilities/math/time'
import { VIEW } from '../../context'

export function RainView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const cell = window.world.cells[province.hub.cell]
  const rain = range(TIME.constants.monthsPerYear).map(month => RAIN.monthly.total({ cell, month }))
  const colors = range(TIME.constants.monthsPerYear).map(month => RAIN.monthly.color(rain[month]))

  const data = {
    labels: TIME.month.names,
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: rain,
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
          text: 'Rainfall (mm)'
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
