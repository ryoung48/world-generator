import {
  profession__colors,
  profession__map,
  profession__socialClass
} from '../../../../models/npcs/actors/stats/professions'
import {
  location__professions,
  socialClassDistributions
} from '../../../../models/regions/locations/actors'
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
  const jobs = {
    lower: location__professions({ loc, time: window.world.date, social: 'lower' }),
    middle: location__professions({ loc, time: window.world.date, social: 'middle' }),
    upper: location__professions({ loc, time: window.world.date, social: 'upper' })
  }
  const socialClasses = socialClassDistributions(loc)
  const nestedJobs: NestedPieData = {
    label: '',
    value: 0,
    color: '',
    children: []
  }
  Object.entries(jobs).forEach(([, v]) => {
    v.forEach(({ v: job, w }) => {
      const { category, subcategory } = profession__map[job]
      let nested = nestedJobs.children.find(child => child.label === category)
      if (!nested) {
        nested = {
          label: category,
          value: 0,
          color: profession__colors.category[category],
          children: []
        }
        nestedJobs.children.push(nested)
      }
      let curr = nested
      if (subcategory) {
        let sub = nested.children.find(child => child.label === subcategory)
        if (!sub) {
          sub = {
            label: subcategory,
            value: 0,
            color: profession__colors.subcategory[subcategory],
            children: []
          }
          nested.children.push(sub)
        }
        curr = sub
      }
      const social = socialClasses.find(({ v: s }) => s === profession__socialClass(job))
      const weight = w * social.w
      nestedJobs.value += weight
      nested.value += weight
      if (curr !== nested) curr.value += weight
      curr.children.push({
        label: job,
        value: weight,
        color: profession__colors.job[job],
        children: []
      })
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
