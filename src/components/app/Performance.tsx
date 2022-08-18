import { Grid } from '@mui/material'

import { ProfileNode, Profiles } from '../../models/utilities/performance'
import { NestedPieChart } from '../codex/common/charts/NestedPirChart'
import { NestedPieData, PieTooltip } from '../codex/common/charts/types'
import { ToggleButtons } from '../codex/common/navigation/ToggleButtons'

/**
 * returns the final tree structure of profile node used for display
 * @param param - profile node
 * @returns - tree structure
 */
const profile__getNodes = ({ value, label, color, children }: ProfileNode): NestedPieData => {
  const node: NestedPieData = {
    label,
    value: value,
    color,
    children: Object.values(children).map(child => profile__getNodes(child))
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

const pieChart__tooltips: PieTooltip = item => {
  const label = item.label
  const value = item.dataset.data[item.dataIndex]
  return `${label}: ${value.toFixed(2)} ms`
}

export function PerformanceView() {
  const modes = Object.keys(window.profiles) as (keyof Profiles)[]
  return (
    <Grid container pt={12}>
      <ToggleButtons
        selection={modes}
        content={mode => {
          const data = window.profiles[mode]
          const parsed = profile__getNodes(data)
          return (
            <NestedPieChart
              data={parsed}
              tooltips={pieChart__tooltips}
              title={node => `${node.label}: ${node.value.toFixed(2)} ms`}
            ></NestedPieChart>
          )
        }}
      ></ToggleButtons>
    </Grid>
  )
}
