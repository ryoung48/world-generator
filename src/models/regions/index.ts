import { HISTORY } from '../history'
import { ARRAY } from '../utilities/array'
import { COLOR } from '../utilities/color'
import { MATH } from '../utilities/math'
import { titleCase } from '../utilities/text'
import { decorateText } from '../utilities/text/decoration'
import { formatters } from '../utilities/text/formatters'
import { Cell } from '../world/cells/types'
import { BIOME } from '../world/climate'
import { PROVINCE } from './provinces'
import * as Region from './types'

export const REGION = {
  active: (region: Region.Region) => {
    return REGION.provinces(region).length > 0
  },
  atWar: (region: Region.Region) => REGION.relations({ target: 'at war', region }).length > 0,
  biome: (region: Region.Region) => {
    const capital = REGION.capital(region)
    const cell = PROVINCE.cell(capital)
    return BIOME.holdridge[cell.biome]
  },
  biomes: (region: Region.Region) => {
    const biomes = Object.entries(
      REGION.provinces(region)
        .map(province =>
          province.cells.land
            .map(c => window.world.cells[c])
            .map(cell => {
              cell
              const biome = BIOME.holdridge[cell.biome]
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
        return `${decorateText({
          label: `${titleCase(k)}`,
          tooltip: counts.map(([k, v]) => `${k} (${formatters.percent(v / biomeSum)})`).join(', ')
        })} (${formatters.percent(v.length / climateSum)})`
      })
      .join(', ')
  },
  claim: ({ nation, region }: Region.RegionClaim) => {
    const current = HISTORY.current()
    const provinces = REGION.provinces(region)
    const domains = REGION.domains(region).filter(r => r.idx !== region.idx)
    current.subjects[region.idx] = []
    provinces
      .filter(p => p.region === region.idx)
      .forEach(p => PROVINCE.claim({ nation, province: p }))
    domains.forEach(domain => {
      provinces
        .filter(p => p.region === domain.idx)
        .forEach(p => PROVINCE.claim({ nation: domain, province: p }))
    })
    // leftovers
    const candidates = domains.concat([nation])
    provinces
      .filter(p => PROVINCE.nation(p).idx === region.idx)
      .forEach(province => {
        const neighbors = PROVINCE.neighbors({ province, type: 'foreign' })
        const best = candidates.reduce(
          (selected, candidate) => {
            const matches = neighbors.filter(n => PROVINCE.nation(n).idx === candidate.idx).length
            return matches > selected.d ? { d: matches, region: candidate } : selected
          },
          { d: -Infinity, region: nation }
        )
        PROVINCE.claim({ province, nation: best.region })
      })
  },
  environment: (region: Region.Region) => {
    const biomes = REGION.provinces(region)
      .map(province =>
        province.cells.land
          .map(c => window.world.cells[c])
          .map(cell => {
            cell
            const biome = BIOME.holdridge[cell.biome]
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
          return `${titleCase(k)} (${formatters.percent(v / climateSum)})`
        })
        .slice(0, 2)
        .join(', '),
      terrain: terrain
        .map(([k, v]) => {
          return `${titleCase(k)} (${formatters.percent(v / terrainSum)})`
        })
        .slice(0, 3)
        .join(', ')
    }
  },
  borders: (region: Region.Region) => region.borders.map(b => window.world.regions[b]),
  capital: (region: Region.Region) => window.world.provinces[region.capital],
  climate: (region: Region.Region) => {
    const biome = REGION.biome(region)
    return BIOME.zone[biome.latitude]
  },
  domains: (region: Region.Region) => {
    return REGION.provinces(region)
      .filter(t => t.capital)
      .map(p => window.world.regions[p.region])
  },
  find: ({ ref, regions, type }: Region.RegionFindParams) => {
    const found = PROVINCE.find({
      provinces: regions.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    })
    return window.world.regions[found.region]
  },
  landBorders: ({ region, depth = 1 }: Region.RegionNeighborsParams): Region.Region[] =>
    ARRAY.bfs({
      src: region,
      n: src => src.landBorders.map(r => window.world.regions[r]),
      depth
    }),
  nation: (region: Region.Region) => {
    const capital = window.world.provinces[region.capital]
    const nation = PROVINCE.nation(capital)
    return nation
  },
  get nations() {
    return Object.values(window.world.regions).filter(REGION.active)
  },
  neighbors: ({ region, depth = 1 }: Region.RegionNeighborsParams): Region.Region[] =>
    ARRAY.bfs({
      src: region,
      n: src =>
        PROVINCE.neighboringRegions(REGION.provinces(src)).map(r => window.world.regions[r]),
      depth
    }),
  population: (region: Region.Region) => {
    return REGION.provinces(region).reduce((sum, province) => sum + province.population, 0)
  },
  provinces: (region: Region.Region) => {
    if (HISTORY.active()) {
      const current = HISTORY.current()
      return current.subjects[region.idx].map(p => window.world.provinces[p])
    }
    return region.provinces.map(p => window.world.provinces[p])
  },
  relations: (params: Region.RegionRelationsParams) =>
    Object.entries(params.region.relations)
      .filter(([_, relation]) => relation === params.target)
      .map(([r]) => window.world.regions[parseInt(r)]),
  sort: ({ ref, regions, type }: Region.RegionSortParams) =>
    PROVINCE.sort({
      provinces: regions.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    }).map(province => window.world.regions[province.region]),
  spawn: (cell: Cell) => {
    const idx = window.world.regions.length
    cell.region = idx
    const color = window.dice.color()
    const hue = COLOR.extractHue(color)
    const region: Region.Region = {
      idx,
      tag: 'nation',
      name: '',
      heraldry: {
        color,
        hue,
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
      coastal: false,
      borders: [],
      provinces: [],
      landBorders: [],
      relations: {},
      culture: -1,
      shattered: false,
      exhaustion: 0
    }
    window.world.regions.push(region)
    return region
  },
  strength: (region: Region.Region) => {
    return (
      REGION.provinces(region).reduce((sum, province) => sum + province.wealth, 0) *
      (1 - region.exhaustion)
    )
  }
}
