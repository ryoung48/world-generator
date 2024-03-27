import { ProfileNode } from '../../../models/utilities/performance/types'
import { CHARTS } from '../../codex/common/charts'
import { NestedPieChart } from '../../codex/common/charts/NestedPirChart'
import { NestedPieData } from '../../codex/common/charts/types'
import { PerformanceViewProps } from './types'

/**
 * returns the final tree structure of profile node used for display
 * @param param - profile node
 * @returns - tree structure
 */
const getNodes = ({ value, label, color, children }: ProfileNode): NestedPieData => {
  const node: NestedPieData = {
    label,
    value: value,
    color,
    children: Object.values(children).map(child => getNodes(child))
  }
  const total = node.children.reduce((sum, child) => sum + child.value, 0)
  const diff = node.value - total
  if (diff < 0) node.value = total
  if (node.children.length === 0) delete node.children
  if (node.children && diff > 0) {
    node.children.push({
      label: 'Other',
      value: diff,
      color: 'black',
      children: []
    })
  }
  return node
}

export function PerformanceView({ mode }: PerformanceViewProps) {
  const data = window.profiles[mode]
  const parsed = getNodes(data)
  return (
    <NestedPieChart
      data={parsed}
      tooltips={CHARTS.pie.tooltips}
      title={node => `${node.label}: ${node.value.toFixed(2)} ms`}
    ></NestedPieChart>
  )
}
