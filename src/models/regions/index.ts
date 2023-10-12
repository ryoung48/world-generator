import { ARRAY } from '../utilities/array'
import { COLOR } from '../utilities/color'
import { titleCase } from '../utilities/text'
import { decorateText } from '../utilities/text/decoration'
import { formatters } from '../utilities/text/formatters'
import { Cell } from '../world/cells/types'
import { CLIMATE } from '../world/climate'
import { Climate } from '../world/climate/types'
import { PROVINCE } from './provinces'
import * as Region from './types'

export const REGION = {
  active: (region: Region.Region) => {
    return REGION.provinces(region).length > 0
  },
  atWar: (region: Region.Region) => REGION.relations({ target: 'at war', region }).length > 0,
  biomes: (region: Region.Region) => {
    const biomes = Object.entries(
      REGION.provinces(region).reduce((dict: Record<string, number>, province) => {
        const { climate } = window.world.regions[province.region]
        if (!dict[climate]) dict[climate] = 0
        dict[climate] += province.land
        return dict
      }, {})
    ).sort((a, b) => b[1] - a[1])
    const total = biomes.reduce((sum, [_, v]) => sum + v, 0)
    return biomes
      .slice(0, 2)
      .map(
        ([k, v]) =>
          `${decorateText({
            label: titleCase(k),
            tooltip: CLIMATE.lookup[k as keyof Climate].code
          })} (${formatters.percent(v / total)})`
      )
      .join(', ')
  },
  borders: (region: Region.Region) => region.borders.map(b => window.world.regions[b]),
  capital: (region: Region.Region) => window.world.provinces[region.capital],
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
    const side = cell.x > 0 ? 'E' : 'W'
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
      side,
      culture: -1
    }
    window.world.regions.push(region)
    return region
  }
}
