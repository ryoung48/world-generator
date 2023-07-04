import { titleCase } from '../utilities/text'
import { decorateText } from '../utilities/text/decoration'
import { formatters } from '../utilities/text/formatters'
import { world__gps } from '../world'
import { ExteriorCell } from '../world/cells/types'
import { Climate, climates } from '../world/climate/types'
import { province__foreignStates } from './provinces'
import { Region } from './types'

export const region__nation = (region: Region) => {
  const capital = window.world.provinces[region.capital]
  const nation = window.world.regions[capital.nation]
  return nation
}

export const region__domains = (nation: Region) => {
  return nation.provinces
    .filter(t => window.world.provinces[t].capital)
    .map(p => window.world.regions[p])
}

export const region__population = (nation: Region) => {
  return nation.provinces
    .map(t => window.world.provinces[t])
    .reduce((sum, province) => sum + province.population, 0)
}

export const region__neighbors = (nation: Region, depth = 1): Region[] => {
  const neighbors = province__foreignStates(
    nation.provinces.map(t => window.world.provinces[t])
  ).map(r => window.world.regions[r])
  if (depth > 1) {
    return Array.from(
      new Set(neighbors.concat(neighbors.map(n => region__neighbors(n, depth - 1)).flat()))
    )
  }
  return neighbors
}
export const region__isActive = (nation: Region) => {
  return nation.provinces.length > 0
}

export const region__biomes = (nation: Region) => {
  const biomes = Object.entries(
    nation.provinces
      .map(t => window.world.provinces[t])
      .reduce((dict: Record<string, number>, province) => {
        const { climate } = window.world.regions[province.region]
        if (!dict[climate]) dict[climate] = 0
        dict[climate] += province.land
        return dict
      }, {})
  ).sort((a, b) => b[1] - a[1])
  const total = biomes.reduce((sum, [_, v]) => sum + v, 0)
  return biomes
    .map(
      ([k, v]) =>
        `${decorateText({
          label: titleCase(k),
          tooltip: climates[k as Climate['name']].code
        })} (${formatters.percent(v / total)})`
    )
    .join(', ')
}

export const region__spawn = (cell: ExteriorCell) => {
  const idx = window.world.regions.length
  cell.region = idx
  const { longitude } = world__gps(cell)
  const side = longitude > 40 ? 'E' : 'W'
  const nation: Region = {
    idx,
    tag: 'nation',
    name: '',
    colors: window.dice.color(),
    regional: {},
    coastal: false,
    borders: [],
    landBorders: [],
    relations: {},
    provinces: [],
    side,
    culture: { ruling: -1, native: -1 }
  }
  window.world.regions.push(nation)
  return nation
}

export const region__borders = (region: Region) => region.borders.map(b => window.world.regions[b])

export const world__nations = () => {
  return Object.values(window.world.regions).filter(r => region__isActive(r))
}
