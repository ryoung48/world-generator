import { species__map } from '../../../models/npcs/species'
import { species__ages } from '../../../models/npcs/species/types'
import { lifeCycle, LifePhase } from '../../../models/npcs/types'
import { scale } from '../../../models/utilities/math'
import { titleCase } from '../../../models/utilities/text'
import { view__context } from '../../context'
import { DataTable } from '../common/DataTable'

const boundaries: Record<LifePhase, number> = {
  child: 5,
  adolescent: 17,
  'young adult': 32,
  adult: 48,
  'middle age': 64,
  old: 80,
  venerable: 98
}

const scaledAges = (culture: number): Record<LifePhase, number> => {
  const { species } = window.world.cultures[culture]
  const { age } = species__map[species].traits
  const mod = species__ages[age]
  const adolescence = scale([0.7, 1, 1.2, 1.8, 3], [0.75, 1, 1.17, 1.41, 1.64], mod)
  return {
    child: Math.round(mod * boundaries.child),
    adolescent: Math.round(adolescence * boundaries.adolescent),
    'young adult': Math.round(mod * boundaries['young adult']),
    adult: Math.round(mod * boundaries.adult),
    'middle age': Math.round(mod * boundaries['middle age']),
    old: Math.round(mod * boundaries.old),
    venerable: Math.round(mod * boundaries.venerable)
  }
}

export function AgesView() {
  const { state } = view__context()
  const ages = scaledAges(state.codex.culture)
  const ranges: Record<LifePhase, string> = {
    child: `0-${ages.child}`,
    adolescent: `${ages.child + 1}-${ages.adolescent}`,
    'young adult': `${ages.adolescent + 1}-${ages['young adult']}`,
    adult: `${ages['young adult'] + 1}-${ages.adult}`,
    'middle age': `${ages.adult + 1}-${ages['middle age']}`,
    old: `${ages['middle age'] + 1}-${ages.old}`,
    venerable: `${ages.old}+`
  }
  return (
    <DataTable
      data={[ranges]}
      headers={lifeCycle.map(phase => ({
        text: titleCase(phase),
        align: 'center',
        value: phase
      }))}
    ></DataTable>
  )
}
