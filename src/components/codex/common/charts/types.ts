import { TooltipItem } from 'chart.js'

export interface PieData {
  label: string
  value: number
  color: string
}

export interface NestedPieData extends PieData {
  children: NestedPieData[] // child nodes
}

export type pie__tooltip = (_item: TooltipItem<'pie'>) => string
