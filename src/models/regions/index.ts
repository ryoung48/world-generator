import { markets } from '../items/economy'
import { day_ms, year_ms } from '../utilities/math/time'
import { BasicCache, memoize } from '../utilities/performance/memoization'
import { world__gps } from '../world'
import { ExteriorCell } from '../world/cells/types'
import { province__foreign_neighbors, province__foreign_states } from './provinces'
import { Region } from './types'

export const region__nation = (region: Region) => {
  const capital = window.world.provinces[region.capital]
  const nation = window.world.regions[capital.curr_nation]
  return nation
}

export const region__is_ruler = (region: Region) => region__nation(region) === region

export const region__rebellion_in_progress = (nation: Region) => {
  const { regions } = nation
  return regions
    .map(p => {
      const n = window.world.provinces[p].curr_nation
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
    if (region.memory.population_check < window.world.date) {
      region.memory.population_check = window.world.date + day_ms
    } else {
      return cache[region.idx]
    }
  },
  set: (cache, res, region) => {
    cache[region.idx] = res
  }
})

export const region__foreign_provinces = (params: { host: Region; guest: Region }) => {
  const { host, guest } = params
  return Array.from(
    new Set(
      host.provinces
        .map(t => window.world.provinces[t])
        .map(province =>
          province__foreign_neighbors(province).filter(n => n.curr_nation === guest.idx)
        )
        .flat()
    )
  )
}
export const region__neighbors = (nation: Region) => {
  return province__foreign_states(nation.provinces.map(t => window.world.provinces[t]))
}
export const region__non_allied_neighbors = (nation: Region) => {
  return region__neighbors(nation).filter(n => {
    const relation = nation.relations[n]
    return relation !== 'ally'
  })
}
export const region__is_active = (nation: Region) => {
  return nation.provinces.length > 0
}

export const region__demand = (nation_idx: number) => {
  const nation = window.world.regions[nation_idx]
  const diff = (window.world.date - nation.memory.trade_demand) / year_ms
  if (diff > 1) {
    markets.forEach(market => {
      nation.trade_demand[market] = window.dice.norm(0.1, 0.15)
    })
    nation.memory.trade_demand = window.world.date
  }
}

/**
 * searches for provinces within a nation that belong to a specified region
 * @param params.nation - the nation to search
 * @param params.region - the region to search for
 * @returns a list of provinces that belong to the specified region
 */
export const nation__regional_territories = (params: { nation: Region; region: Region }) => {
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
    borders_changed: true,
    coastal: false,
    borders: [],
    land_borders: [],
    colonial_presence: {
      colonies: [],
      embassy: -1
    },
    relations: {},
    allies: {},
    subjects: [],
    overlord: {
      idx: -1,
      join_date: 0
    },
    past: [],
    wealth: 0,
    max_wealth: 0,
    wars: { current: [], past: [] },
    rebellions: { current: -1, past: [] },
    memory: {
      rebel_fatigue: -Infinity,
      plague_fatigue: -Infinity,
      last_update: window.world.date,
      trade_demand: window.world.date,
      faction_spawns: -Infinity,
      finalize_check: -Infinity,
      population_check: -Infinity
    },
    provinces: [],
    regions: [],
    side,
    edge,
    trade_demand: {},
    beasts: {},
    primordials: {},
    immigration: {},
    emigration: {},
    culture: { ruling: -1, native: -1 }
  }
  window.world.regions.push(nation)
  return nation
}

export const region__borders = (region: Region) => region.borders.map(b => window.world.regions[b])

export const world__nations = () => {
  return Object.values(window.world.regions).filter(r => region__is_active(r))
}
