import { CULTURE } from '../../heritage'
import { PROVINCE } from '../../provinces'
import { ARRAY } from '../../utilities/array'
import { distribute } from './distribute'

export const shapeCultures = () => {
  const provinces = window.world.provinces.filter(p => !p.desolate)
  const { groups, unassigned } = distribute({
    items: window.dice.shuffle(provinces),
    percentages: [0.4, 0.3, 0.2, 0.1],
    buckets: [
      [1, 1],
      [2, 4],
      [5, 14],
      [15, 30]
    ],
    neighbors: province =>
      PROVINCE.neighbors({ province }).filter(p => !PROVINCE.far(p, province))
  })
  groups.concat(unassigned.map(p => [p])).forEach(group => {
    CULTURE.spawn({ provinces: group })
  })
  window.world.cultures.forEach(culture => {
    culture.neighbors = ARRAY.unique(
      culture.provinces
        .map(p => PROVINCE.neighbors({ province: window.world.provinces[p] }))
        .flat()
        .map(province => province.culture)
        .filter(c => c !== culture.idx)
    )
  })
}

export const shapeMinorities = () => {
  window.world.provinces
    .filter(province => !province.desolate && window.dice.random > 0.6)
    .forEach(province => {
      const candidates = PROVINCE.neighbors({ province }).filter(
        neighbor => neighbor.culture !== province.culture && !PROVINCE.far(province, neighbor)
      )
      if (candidates.length > 0) {
        const neighbor = window.dice.choice(candidates)
        province.minority = neighbor.culture
      }
    })
}
