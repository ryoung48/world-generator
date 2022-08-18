import { Pie } from 'react-chartjs-2'

import { species__byCulture } from '../../../../models/npcs/species/taxonomy'
import { location__demographics } from '../../../../models/regions/locations/actors/demographics'
import { Loc } from '../../../../models/regions/locations/types'
import { view__context } from '../../../context'
import { pieChart__construct, pieChart__percentTooltips } from '../../common/charts'

const culturalDemographic = (loc: Loc) => {
  const { commonCultures } = location__demographics(loc)
  const cultures = Object.entries(commonCultures).sort((a, b) => b[1] - a[1])
  const other = cultures
    .map(([, percent]) => percent)
    .filter(percent => percent < 0.01)
    .reduce((total, percent) => total + percent, 0)
  const otherDemo: [string, number] = ['-1', other]
  return pieChart__construct(
    cultures
      .filter(([, percent]) => percent >= 0.01)
      .concat([otherDemo])
      .map(([culture, percent]) => {
        const details = window.world.cultures[parseInt(culture)]
        return {
          label: details ? `${details.name} (${species__byCulture(details).name})` : 'Other',
          value: percent,
          color: details?.display || 'black'
        }
      })
  )
}

export function CultureView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const chartData = culturalDemographic(location)
  return (
    <div style={{ height: '350px' }}>
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          onClick: (_, data) => {
            const [d] = data
            const index = d?.index
            const name = chartData.labels[index]?.replace(/ \(.*/, '')
            console.log(name)
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: pieChart__percentTooltips
              }
            }
          }
        }}
      ></Pie>
    </div>
  )
}
