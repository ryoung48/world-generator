import { Pie } from 'react-chartjs-2'

import { view__context } from '../../../../context'
import { species__by_culture } from '../../../../models/npcs/species/humanoids/taxonomy'
import { location__demographics } from '../../../../models/regions/locations/actors/demographics'
import { Loc } from '../../../../models/regions/locations/types'
import { pie_chart__construct, pie_chart__percent_tooltips } from '../../common/charts'

const cultural_demographic = (loc: Loc) => {
  const { common_cultures } = location__demographics(loc)
  const cultures = Object.entries(common_cultures).sort((a, b) => b[1] - a[1])
  const other = cultures
    .map(([, percent]) => percent)
    .filter(percent => percent < 0.01)
    .reduce((total, percent) => total + percent, 0)
  const other_demo: [string, number] = ['-1', other]
  return pie_chart__construct(
    cultures
      .filter(([, percent]) => percent >= 0.01)
      .concat([other_demo])
      .map(([culture, percent]) => {
        const details = window.world.cultures[parseInt(culture)]
        return {
          label: details ? `${details.name} (${species__by_culture(details).name})` : 'Other',
          value: percent,
          color: details?.display || 'black'
        }
      })
  )
}

export function CultureView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const chart_data = cultural_demographic(location)
  return (
    <div style={{ height: '350px' }}>
      <Pie
        data={chart_data}
        options={{
          maintainAspectRatio: false,
          onClick: (_, data) => {
            const [d] = data
            const index = d?.index
            const name = chart_data.labels[index]?.replace(/ \(.*/, '')
            console.log(name)
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: pie_chart__percent_tooltips
              }
            }
          }
        }}
      ></Pie>
    </div>
  )
}
