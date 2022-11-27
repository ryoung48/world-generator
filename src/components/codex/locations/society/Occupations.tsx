import {
  profession__colors,
  profession__map,
  profession__randomBalanced
} from '../../../../models/npcs/actors/stats/professions'
import { Loc } from '../../../../models/regions/locations/types'
import { titleCase } from '../../../../models/utilities/text'
import { view__context } from '../../../context'
import { pieChart__percentTooltips } from '../../common/charts'
import { NestedPieChart } from '../../common/charts/NestedPirChart'
import { NestedPieData } from '../../common/charts/types'

const prepareNestedData = (node: NestedPieData) => {
  node.children.forEach(child => {
    if (child.children.length > 0) prepareNestedData(child)
  })
  node.children.sort((a, b) => b.value - a.value)
}

const occupations = (loc: Loc) => {
  const jobs = profession__randomBalanced({
    loc,
    time: window.world.date
  })
  const nestedJobs: NestedPieData = {
    label: '',
    value: 0,
    color: '',
    children: []
  }
  jobs.forEach(({ w, v }) => {
    const { stratum } = profession__map[v]
    let nested = nestedJobs.children.find(child => child.label === stratum)
    if (!nested) {
      nested = {
        label: stratum,
        value: 0,
        color: profession__colors.strata[stratum],
        children: []
      }
      nestedJobs.children.push(nested)
    }
    const weight = w
    nestedJobs.value += weight
    nested.value += weight
    nested.children.push({
      label: v,
      value: weight,
      color: profession__colors.job[v],
      children: []
    })
  })
  prepareNestedData(nestedJobs)
  return nestedJobs
}

export function OccupationsView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  return (
    <NestedPieChart
      data={occupations(location)}
      tooltips={pieChart__percentTooltips}
      title={node =>
        node.label ? `${titleCase(node.label)} (${(node.value * 100).toFixed(2)}%)` : ''
      }
    ></NestedPieChart>
  )
}
