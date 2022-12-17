import { world__gps } from '../world'
import { ExteriorCell } from '../world/cells/types'
import { province__foreignNeighbors, province__foreignStates } from './provinces'
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

export const region__foreignProvinces = (params: { host: Region; guest: Region }) => {
  const { host, guest } = params
  return Array.from(
    new Set(
      host.provinces
        .map(t => window.world.provinces[t])
        .map(province => province__foreignNeighbors(province).filter(n => n.nation === guest.idx))
        .flat()
    )
  )
}
export const region__neighbors = (nation: Region) => {
  return province__foreignStates(nation.provinces.map(t => window.world.provinces[t])).map(
    r => window.world.regions[r]
  )
}
export const region__nonAlliedNeighbors = (nation: Region) => {
  return region__neighbors(nation).filter(n => {
    const relation = nation.relations[n.idx]
    return relation !== 'ally'
  })
}
export const region__isActive = (nation: Region) => {
  return nation.provinces.length > 0
}

/**
 * searches for provinces within a nation that belong to a specified region
 * @param params.nation - the nation to search
 * @param params.region - the region to search for
 * @returns a list of provinces that belong to the specified region
 */
export const nation__regionalTerritories = (params: { nation: Region; region: Region }) => {
  const { nation, region } = params
  return nation.provinces
    .map(t => window.world.provinces[t])
    .filter(province => province.region === region.idx)
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
