import { markets } from '../items/economy'
import { dayMS, yearMS } from '../utilities/math/time'
import { BasicCache, memoize } from '../utilities/performance/memoization'
import { world__gps } from '../world'
import { ExteriorCell } from '../world/cells/types'
import { province__foreignNeighbors, province__foreignStates } from './provinces'
import { Region } from './types'

export const region__nation = (region: Region) => {
  const capital = window.world.provinces[region.capital]
  const nation = window.world.regions[capital.currNation]
  return nation
}

export const region__isRuler = (region: Region) => region__nation(region) === region

export const region__rebellionInProgress = (nation: Region) => {
  const { regions } = nation
  return regions
    .map(p => {
      const n = window.world.provinces[p].currNation
      return window.world.regions[n]
    })
    .some(region => region.rebellions.current !== -1)
}

const _region__population = (nation: Region) => {
  return nation.provinces
    .map(t => window.world.provinces[t])
    .reduce((sum, province) => sum + province.population, 0)
}

export const region__population = memoize(_region__population, {
  store: (): BasicCache<ReturnType<typeof _region__population>> => ({}),
  get: (cache, region) => {
    // recompute every day
    if (region.memory.populationCheck < window.world.date) {
      region.memory.populationCheck = window.world.date + dayMS
    } else {
      return cache[region.idx]
    }
  },
  set: (cache, res, region) => {
    cache[region.idx] = res
  }
})

export const region__foreignProvinces = (params: { host: Region; guest: Region }) => {
  const { host, guest } = params
  return Array.from(
    new Set(
      host.provinces
        .map(t => window.world.provinces[t])
        .map(province =>
          province__foreignNeighbors(province).filter(n => n.currNation === guest.idx)
        )
        .flat()
    )
  )
}
export const region__neighbors = (nation: Region): number[] => {
  return province__foreignStates(nation.provinces.map(t => window.world.provinces[t]))
}
export const region__nonAlliedNeighbors = (nation: Region) => {
  return region__neighbors(nation).filter(n => {
    const relation = nation.relations[n]
    return relation !== 'ally'
  })
}
export const region__isActive = (nation: Region) => {
  return nation.provinces.length > 0
}

export const region__demand = (nationIdx: number) => {
  const nation = window.world.regions[nationIdx]
  const diff = (window.world.date - nation.memory.tradeDemand) / yearMS
  if (diff > 1) {
    markets.forEach(market => {
      nation.tradeDemand[market] = window.dice.norm(0.1, 0.15)
    })
    nation.memory.tradeDemand = window.world.date
  }
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
  const { longitude, latitude } = world__gps(cell)
  const side = longitude > 40 ? 'E' : 'W'
  const edge = latitude > 40 ? 'N' : 'S'
  const nation: Region = {
    idx,
    tag: 'nation',
    name: '',
    colors: window.dice.color(),
    regional: {},
    bordersChanged: true,
    coastal: false,
    borders: [],
    landBorders: [],
    colonialPresence: {
      colonies: [],
      embassy: -1
    },
    relations: {},
    allies: {},
    subjects: [],
    overlord: {
      idx: -1,
      joinDate: 0
    },
    past: [],
    wealth: 0,
    maxWealth: 0,
    wars: { current: [], past: [] },
    rebellions: { current: -1, past: [] },
    memory: {
      rebelFatigue: -Infinity,
      plagueFatigue: -Infinity,
      lastUpdate: window.world.date,
      tradeDemand: window.world.date,
      populationCheck: -Infinity
    },
    provinces: [],
    regions: [],
    side,
    edge,
    tradeDemand: {},
    culture: { ruling: -1, native: -1 }
  }
  window.world.regions.push(nation)
  return nation
}

export const region__borders = (region: Region) => region.borders.map(b => window.world.regions[b])

export const world__nations = () => {
  return Object.values(window.world.regions).filter(r => region__isActive(r))
}
