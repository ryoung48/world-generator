import { NATION } from '../../nations'
import { PROVINCE } from '../../provinces'
import { NATION_ATTRIBUTES } from '../civilization/quirks'
import { distribute } from './distribute'

export const shapeNations = () => {
  const provinces = window.world.provinces.filter(p => !p.desolate)

  const { groups, unassigned } = distribute({
    items: provinces,
    percentages: [0.5, 0.3, 0.1, 0.05, 0.02],
    buckets: [
      [1, 1],
      [2, 4],
      [5, 14],
      [15, 29],
      [30, 60]
    ],
    neighbors: province =>
      PROVINCE.neighbors({ province }).filter(p => !PROVINCE.far(p, province, 2)),
    sorted: items =>
      items.sort((a, b) => {
        const aCoastal = PROVINCE.hub(a).coastal ? 1 : 0
        const bCoastal = PROVINCE.hub(b).coastal ? 1 : 0
        return bCoastal - aCoastal
      }),
    score: province => (PROVINCE.hub(province).coastal ? 10 : 0) + window.dice.random
  })
  groups.forEach(group => {
    // Assign nations and territories
    const overlordProvince = group[0]
    overlordProvince.nation = undefined
    overlordProvince.territories = []
    for (let i = 1; i < group.length; i++) {
      const vassalProvince = group[i]
      vassalProvince.nation = overlordProvince.idx
      vassalProvince.territories = []
      overlordProvince.territories.push(vassalProvince.idx)
    }
  })
  Array.from(unassigned).forEach(province => {
    if (province.nation === undefined && province.territories.length === 0) {
      const neighbors = PROVINCE.neighbors({ province }).map(n => PROVINCE.nation(n))
      if (neighbors.length > 0) {
        const neighbor = window.dice.choice(neighbors)
        province.nation = neighbor.idx
        neighbor.territories.push(province.idx)
      }
    }
  })
  const nations = NATION.nations()
  // realm titles
  nations.forEach(nation => {
    if (NATION.provinces(nation).length === 1) {
      nation.size = 'city-state'
    } else if (NATION.provinces(nation).length <= 10) {
      nation.size = 'principality'
    } else if (NATION.provinces(nation).length <= 30) {
      nation.size = 'kingdom'
    } else nation.size = 'empire'
  })
  // attributes:
  nations.forEach(nation => {
    const economic = window.dice.choice(NATION_ATTRIBUTES.economic)
    const cultural = window.dice.choice(NATION_ATTRIBUTES.cultural)
    const military = window.dice.choice(NATION_ATTRIBUTES.military)
    nation.quirks = window.dice
      .shuffle([economic, cultural, military])
      .map(q => `${q.title}: ${q.text}`)
      .slice(0, nation.size === 'city-state' ? 1 : nation.size === 'principality' ? 2 : 3)
  })
}
