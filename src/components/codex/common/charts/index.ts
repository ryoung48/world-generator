import { ChartData, TooltipItem } from 'chart.js'

import { formatters } from '../../../../models/utilities/text/formatters'
import { PieData } from './types'

export const pieChart__construct = (chart: PieData[]): ChartData<'pie', number[], string> => {
  const labels: string[] = []
  const data: number[] = []
  const colors: string[] = []
  // sort culture entries by percent and format pie chart data & labels
  chart.forEach(({ label, value, color }) => {
    labels.push(label)
    data.push(value)
    colors.push(color)
  })
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors
      }
    ]
  }
}

export const pieChart__percentTooltips = (item: TooltipItem<'pie'>) => {
  const label = item.label
  const value = item.dataset.data[item.dataIndex]
  return `${label}: ${formatters.percent({ value, precision: 2 })}`
}
