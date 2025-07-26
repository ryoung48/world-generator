import { range } from 'd3'
import { Bar } from 'react-chartjs-2'

import { DAYLIGHT } from '../../../models/cells/weather/daylight'
import { TIME } from '../../../models/utilities/math/time'
import { VIEW } from '../../context'

const months = TIME.constants.monthsPerYear

export function DaylightView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const cell = window.world.cells[province.hub.cell]
  const daylight = range(months).map(month => DAYLIGHT.monthly.mean({ cell, month }))
  const colors = range(months).map(month => DAYLIGHT.color(daylight[month]))

  const data = {
    labels: TIME.month.names,
    datasets: [
      {
        label: 'Daylight (hours)',
        data: daylight,
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
        text: 'Daylight'
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Daylight (hours)'
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
