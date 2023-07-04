import { point__distance } from '../../utilities/math/points'
import { decorateText } from '../../utilities/text/decoration'
import { world__gps } from '../../world'
import { ExteriorCell } from '../../world/cells/types'
import { climates, glacierLatitudeCutoff } from '../../world/climate/types'
import { hub__spawn } from './hubs'
import { Province } from './types'

export const province__neighbors = (province: Province) =>
  province.neighbors.map(n => window.world.provinces[n])

export const province__localNeighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.nation === provinces.nation)

export const province__foreignNeighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.nation !== provinces.nation)

export const province__foreignStates = (provinces: Province[]) =>
  Array.from(
    new Set(
      provinces
        .map(t => {
          return province__foreignNeighbors(t).map(n => n.nation)
        })
        .flat()
    )
  )

const distanceTo = (c1: Province, c2: Province) => {
  const c1Cell = province__cell(c1)
  const c2Cell = province__cell(c2)
  return point__distance({ points: [c1Cell, c2Cell] })
}

export const province__sortClosest = (provinces: Province[], dst: Province) => {
  return provinces.sort((a, b) => {
    const aDist = distanceTo(dst, a)
    const bDist = distanceTo(dst, b)
    return aDist - bDist
  })
}
export const province__findClosest = (provinces: Province[], dst: Province): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = distanceTo(dst, province)
      return d < selected.d ? { d, province: province } : selected
    },
    { d: Infinity, province: undefined }
  ).province
}
export const province__findFurthest = (provinces: Province[], dists: Province[]): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = dists.map(dst => distanceTo(dst, province)).reduce((sum, dist) => sum + dist, 0)
      return d > selected.d ? { d, province: province } : selected
    },
    { d: -Infinity, province: undefined }
  ).province
}
export const province__isCapital = (province: Province) => {
  return window.world.regions[province.nation].capital === province.idx
}

export const province__cell = (province: Province) => window.world.cells[province.hub.cell]

export const province__decoration = (provinces: Province[]) =>
  provinces
    .sort((a, b) => b.hub.population - a.hub.population)
    .map(province => decorateText({ link: province, tooltip: province.hub.type }))
    .join(', ')

export const province__culture = (province: Province) => {
  const region = window.world.regions[province.region]
  const nation = window.world.regions[province.nation]
  return { local: region, ruling: nation }
}

export const province__spawn = (params: { cell: ExteriorCell; capital?: boolean }) => {
  const { cell, capital } = params
  const idx = window.world.provinces.length
  const region = window.world.regions[cell.region]
  cell.province = idx
  const province: Province = {
    idx,
    tag: 'province',
    name: '',
    capital: capital,
    region: cell.region,
    cell: cell.idx,
    trade: { land: {}, sea: {} },
    hub: hub__spawn({ cell }),
    islands: {},
    lakes: {},
    land: 0,
    ocean: 0,
    mountains: 0,
    population: 0,
    neighbors: [],
    artery: [],
    nation: cell.region,
    actors: [],
    hooks: []
  }
  if (capital) {
    region.capital = province.idx
  }
  region.provinces.push(province.idx)
  window.world.provinces.push(province)
  return province
}

/*
Calculates the terrain in a given province, taking information such as region climate and province mounts into account.
@param {Province} province - The province to calculate the terrain of
@returns {Province['terrain']} The terrain type for the given province
*/
export const province__terrain = (province: Province): Province['environment']['terrain'] => {
  // Get the cell for the given province, along with other information needed
  const cell = window.world.cells[province.hub.cell]
  const mountainous = province.mountains > 0
  const region = window.world.regions[province.region]
  const climate = climates[region.climate]
  const { latitude } = world__gps(province.hub)
  const glacial = Math.abs(latitude) > glacierLatitudeCutoff
  // Generate a chance of a marsh given certain criteria
  const coastal = province.hub.coastal && window.dice.random > 0.8
  const lakeside = Object.keys(province.lakes).length > 0
  if (cell.isMountains) return 'mountainous'
  if (mountainous && window.dice.random > 0.8) return 'mountainous'
  if (!province.hub.coastal && window.dice.random > 0.8) return 'hills'
  if (!glacial && (coastal || lakeside)) return 'marsh'
  if (climate.terrain === 'arctic') return glacial ? 'glacier' : 'tundra'
  if (climate.terrain === 'forest')
    return climate.zone === 'temperate'
      ? 'forest'
      : climate.zone === 'tropical'
      ? 'jungle'
      : 'taiga'
  return climate.terrain
}

export const province__climate = (province: Province): Province['environment']['climate'] => {
  const { latitude } = world__gps(province.hub)
  const lat = Math.abs(latitude)
  return lat < 23
    ? 'tropical'
    : lat < 35
    ? 'subtropical'
    : lat < 60
    ? 'temperate'
    : lat < 75
    ? 'subarctic'
    : 'arctic'
}
