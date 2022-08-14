import { view__context } from '../../../../context'
import {
  profession__colors,
  profession__map,
  profession__social_class
} from '../../../../models/npcs/actors/stats/professions'
import {
  location__professions,
  social_class_distributions
} from '../../../../models/regions/locations/actors/professions'
import { Loc } from '../../../../models/regions/locations/types'
import { title_case } from '../../../../models/utilities/text'
import { pie_chart__percent_tooltips } from '../../common/charts'
import { NestedPieChart } from '../../common/charts/NestedPirChart'
import { NestedPieData } from '../../common/charts/types'

const prepare_nested_data = (node: NestedPieData) => {
  node.children.forEach(child => {
    if (child.children.length > 0) prepare_nested_data(child)
  })
  node.children.sort((a, b) => b.value - a.value)
}

const occupations = (loc: Loc) => {
  const jobs = {
    lower: location__professions({ loc, time: window.world.date, social: 'lower' }),
    middle: location__professions({ loc, time: window.world.date, social: 'middle' }),
    upper: location__professions({ loc, time: window.world.date, social: 'upper' })
  }
  const social_classes = social_class_distributions(loc)
  const nested_jobs: NestedPieData = {
    label: '',
    value: 0,
    color: '',
    children: []
  }
  Object.entries(jobs).forEach(([, v]) => {
    v.forEach(({ v: job, w }) => {
      const { category, subcategory } = profession__map[job]
      let nested = nested_jobs.children.find(child => child.label === category)
      if (!nested) {
        nested = {
          label: category,
          value: 0,
          color: profession__colors.category[category],
          children: []
        }
        nested_jobs.children.push(nested)
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
      const social = social_classes.find(({ v: s }) => s === profession__social_class(job))
      const weight = w * social.w
      nested_jobs.value += weight
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
  prepare_nested_data(nested_jobs)
  return nested_jobs
}

export function OccupationsView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  return (
    <NestedPieChart
      data={occupations(location)}
      tooltips={pie_chart__percent_tooltips}
      title={node =>
        node.label ? `${title_case(node.label)} (${(node.value * 100).toFixed(2)}%)` : ''
      }
    ></NestedPieChart>
  )
}
