import { ChartData, TooltipItem } from 'chart.js'

import { PieData } from './types'

export const CHARTS = {
  pie: {
    data: (chart: PieData[]): ChartData<'pie', number[], string> => {
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
    },
    tooltips: (item: TooltipItem<'pie'>) => {
      const label = item.label
      const value = item.dataset.data[item.dataIndex]
      return `${label}: ${value.toFixed(2)} ms`
    }
  }
}
