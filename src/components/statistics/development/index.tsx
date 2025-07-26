import 'chartjs-plugin-datalabels'

import { ChartData, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { PROVINCE } from '../../../models/provinces'
import { ARRAY } from '../../../models/utilities/array'
import { TEXT } from '../../../models/utilities/text'
import { fonts } from '../../theme/fonts'
import { MAP_METRICS } from '../../world/shapes/metrics'

export const DevelopmentChart = () => {
  const raw = window.world.provinces.map(province =>
    PROVINCE.development.describe(province.development)
  )
  const development = Object.entries(ARRAY.counter(raw)).sort((a, b) => b[1] - a[1])
  const labels = development.map(rec => rec[0])
  const values = development.map(rec => rec[1])
  const total = raw.length

  const data: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        label: 'Development',
        data: values.map(v => v / total),
        backgroundColor: labels.map(k =>
          MAP_METRICS.development.color(
            PROVINCE.development.scale[k as keyof typeof PROVINCE.development.scale]
          )
        )
      }
    ]
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: fonts.content
          },
          color: '#999',
          boxWidth: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = context.parsed
            const percentage = TEXT.formatters.percent(value, 2)
            return `${label}: ${percentage}`
          }
        },
        bodyFont: {
          family: fonts.content
        }
      },
      datalabels: {
        formatter: value => {
          return TEXT.formatters.percent(value, 2)
        },
        color: '#000',
        textAlign: 'center',
        font: {
          size: 14
        }
      }
    },
    cutout: '50%'
  }

  return (
    <div style={{ height: 700, width: '100%', position: 'relative' }}>
      <Pie data={data} options={options} />
    </div>
  )
}
