import { CLIMATE } from '../cells/climate'
import { Cell } from '../cells/types'
import { ARRAY } from '../utilities/array'
import { MATH } from '../utilities/math'
import { TEXT } from '../utilities/text'
import { PROVINCE } from './provinces'
import * as Region from './types'

export const REGION = {
  active: (region: Region.Region) => {
    return REGION.provinces(region).length > 0
  },
  atWar: (region: Region.Region) => REGION.relations.get({ target: 'at war', region }).length > 0,
  climate: (region: Region.Region) => {
    const capital = REGION.capital(region)
    const cell = PROVINCE.cell(capital)
    return CLIMATE.holdridge[cell.climate]
  },
  climates: (region: Region.Region) => {
    const biomes = Object.entries(
      REGION.provinces(region)
        .map(province =>
          province.cells.land
            .map(c => window.world.cells[c])
            .map(cell => {
              cell
              const biome = CLIMATE.holdridge[cell.climate]
              return { name: biome.name, zone: cell.isMountains ? 'Mountains' : biome.latitude }
            })
        )
        .flat()
        .reduce((dict: Record<string, string[]>, { name, zone }) => {
          if (!dict[zone]) dict[zone] = []
          dict[zone].push(name)
          return dict
        }, {})
    ).sort((a, b) => b[1].length - a[1].length)
    const climateSum = biomes.reduce((a, b) => a + b[1].length, 0)
    return biomes
      .map(([k, v]) => {
        const counts = Object.entries(MATH.counter(v)).sort((a, b) => b[1] - a[1])
        const biomeSum = counts.reduce((a, b) => a + b[1], 0)
        return `${TEXT.decorate({
          label: `${TEXT.titleCase(k)}`,
          tooltip: counts
            .map(([k, v]) => `${k} (${TEXT.formatters.percent(v / biomeSum)})`)
            .join(', ')
        })} (${TEXT.formatters.percent(v.length / climateSum)})`
      })
      .join(', ')
  },
  coastal: (region: Region.Region) => PROVINCE.coastal(REGION.capital(region)),
  culture: (region: Region.Region) => window.world.cultures[region.culture],
  environment: (region: Region.Region) => {
    const biomes = REGION.provinces(region)
      .map(province =>
        province.cells.land
          .map(c => window.world.cells[c])
          .map(cell => {
            cell
            const biome = CLIMATE.holdridge[cell.climate]
            return {
              climate: cell.isMountains ? undefined : biome.latitude,
              terrain: cell.isMountains ? 'Mountains' : biome.terrain
            }
          })
      )
      .flat()
    const climates = Object.entries(
      biomes
        .filter(climate => climate.climate)
        .reduce((dict: Record<string, number>, { climate }) => {
          if (!dict[climate]) dict[climate] = 0
          dict[climate] += 1
          return dict
        }, {})
    ).sort((a, b) => b[1] - a[1])
    const climateSum = climates.reduce((a, b) => a + b[1], 0)
    const terrain = Object.entries(
      biomes.reduce((dict: Record<string, number>, { terrain }) => {
        if (!dict[terrain]) dict[terrain] = 0
        dict[terrain] += 1
        return dict
      }, {})
    ).sort((a, b) => b[1] - a[1])
    const terrainSum = terrain.reduce((a, b) => a + b[1], 0)
    return {
      climates: climates
        .map(([k, v]) => {
          return `${TEXT.titleCase(k)} (${TEXT.formatters.percent(v / climateSum)})`
        })
        .slice(0, 2)
        .join(', '),
      terrain: terrain
        .map(([k, v]) => {
          return `${TEXT.titleCase(k)} (${TEXT.formatters.percent(v / terrainSum)})`
        })
        .slice(0, 3)
        .join(', ')
    }
  },
  borders: (region: Region.Region) => region.borders.map(b => window.world.regions[b]),
  capital: (region: Region.Region) => window.world.provinces[region.capital],
  domains: (region: Region.Region) => {
    return REGION.provinces(region)
      .filter(t => t.capital)
      .map(p => window.world.regions[p.region])
  },
  find: ({ ref, group, type }: Region.RegionFindParams) => {
    const found = PROVINCE.find({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    })
    return window.world.regions[found.region]
  },
  mountainous: (region: Region.Region) => {
    const provinces = REGION.provinces(region)
    const mountains = provinces
      .map(province => {
        return province.cells.land.map(i => window.world.cells[i]).filter(cell => cell.isMountains)
      })
      .flat()
    const total = provinces.reduce((sum, provinces) => sum + provinces.cells.land.length, 0)
    return mountains.length / total > 0.4
  },
  nation: (region: Region.Region) => {
    const capital = window.world.provinces[region.capital]
    const nation = PROVINCE.nation(capital)
    return nation
  },
  get nations() {
    return Object.values(window.world.regions).filter(n => !n.desolate && REGION.active(n))
  },
  neighbors: ({ region, depth = 1 }: Region.RegionNeighborsParams): Region.Region[] =>
    ARRAY.traversal.bfs({
      src: region,
      n: src =>
        PROVINCE.neighboringRegions(REGION.provinces(src)).map(r => window.world.regions[r]),
      depth
    }),
  population: (region: Region.Region) => {
    return REGION.provinces(region).reduce((sum, province) => sum + province.population, 0)
  },
  provinces: (region: Region.Region) => {
    return region.provinces.map(p => window.world.provinces[p])
  },
  relations: {
    get: (params: Region.GetRelationsParams) =>
      Object.entries(params.region.relations)
        .filter(([_, relation]) => relation === params.target)
        .map(([r]) => window.world.regions[parseInt(r)]),
    set: ({ target, r1, r2 }: Region.SetRelationsParams) => {
      r1.relations[r2.idx] = target
      r2.relations[r1.idx] = target
    }
  },
  sort: ({ ref, group, type }: Region.RegionSortParams) =>
    PROVINCE.sort({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    }).map(province => window.world.regions[province.region]),
  spawn: (cell: Cell) => {
    const idx = window.world.regions.length
    cell.region = idx
    const region: Region.Region = {
      idx,
      tag: 'nation',
      name: '',
      heraldry: {
        color: '',
        hue: -1,
        style: window.dice.weightedChoice([
          {
            v: 'standard',
            w: 0.5
          },
          {
            v: 'monochrome',
            w: 0.1
          },
          {
            v: 'contrast',
            w: 0.4
          }
        ])
      },
      regional: {},
      borders: [],
      provinces: [],
      landBorders: [],
      vassals: [],
      relations: {},
      culture: -1,
      desolate: false,
      exhaustion: 0
    }
    window.world.regions.push(region)
    return region
  },
  terrain: (region: Region.Region) => {
    const environment = MATH.counter(
      REGION.provinces(region)
        .map(province => {
          return province.cells.land
            .map(i => window.world.cells[i])
            .filter(cell => !cell.isMountains)
            .map(cell => {
              const { terrain } = CLIMATE.holdridge[cell.climate]
              return terrain === 'tundra' ? 'plains' : terrain === 'glacier' ? 'desert' : terrain
            })
        })
        .flat()
    )
    if (Object.keys(environment).length === 0) return 'none'
    return Object.entries(environment).sort((a, b) => b[1] - a[1])[0][0] as
      | 'forest'
      | 'plains'
      | 'desert'
  },
  vassals: {
    add: ({ overlord, vassal }: Region.AddVassalParams) => {
      overlord.vassals.push(vassal.idx)
      vassal.overlord = overlord.idx
      REGION.relations.set({ target: 'vassal', r1: overlord, r2: vassal })
    }
  },
  zone: (region: Region.Region) => {
    const biome = REGION.climate(region)
    return CLIMATE.zone[biome.latitude]
  }
}
