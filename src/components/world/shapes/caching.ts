import { GeoPermissibleObjects, mean, scaleLinear } from 'd3'

import { CELL } from '../../../models/cells'
import { Loc } from '../../../models/cells/locations/types'
import { EBM } from '../../../models/cells/weather/ebm'
import { PROVINCE } from '../../../models/provinces'
import { Province } from '../../../models/provinces/types'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { PERFORMANCE } from '../../../models/utilities/performance'
import { MAP_SHAPES } from '.'
import { MAP_METRICS } from './metrics'

let nationCache: Record<number, Path2D[]> = {}
let provinceCache: Record<number, Path2D[]> = {}
let locationCache: Record<number, Path2D[]> = {}
let landCache: Record<number, Path2D> = {}

export const DRAW_CACHE = {
  borders: {
    nation: PERFORMANCE.memoize.decorate({
      f: (nation: Province) => {
        return SHAPER_DISPLAY.borders.provinces([
          nation,
          ...nation.subjects.map(v => window.world.provinces[v])
        ])
      },
      keyBuilder: nation => nation.idx.toString()
    }),
    province: PERFORMANCE.memoize.decorate({
      f: (province: Province) => {
        const cell = PROVINCE.cell(province)
        const climate = MAP_METRICS.climate.color(cell.heat.mean)
        const threshold = 10
        const minT = Math.max(0, Math.min(cell.heat.min - EBM.constants.chaotic.min, threshold))
        const maxT = Math.max(0, Math.min(EBM.constants.chaotic.max - cell.heat.max, threshold))
        const dist = minT + maxT
        const climateScale = scaleLinear()
          .domain([threshold, 0])
          .range([climate, MAP_METRICS.climate.chaotic] as unknown[] as number[])
          .clamp(true)
        const culture = window.world.cultures[province.culture]
        const nation = PROVINCE.nation(province)
        const corruptionScale = scaleLinear()
          .domain([0.5, 1])
          .range([
            MAP_METRICS.vegetation.color[cell.vegetation],
            MAP_METRICS.vegetation.color.corruption
          ] as unknown[] as number[])
          .clamp(true)
        return {
          path: SHAPER_DISPLAY.borders.provinces([province]),
          pop: MAP_METRICS.population.color(
            province.desolate ? 0 : Math.log2(PROVINCE.population.density(province))
          ),
          culture: province.desolate ? MAP_SHAPES.color.wasteland : culture.display.color,
          climate: climateScale(dist).toString(),
          vegetation: corruptionScale(province.corruption ?? 0).toString(),
          development: MAP_METRICS.development.color(province.development),
          government:
            MAP_METRICS.government.colors[nation?.government] ?? MAP_SHAPES.color.wasteland,
          religion: MAP_METRICS.religion.colors[culture?.religion] ?? MAP_SHAPES.color.wasteland,
          rain: MAP_METRICS.rain.color(cell.rain.annual)
        }
      },
      keyBuilder: province => province.idx.toString()
    }),
    location: PERFORMANCE.memoize.decorate({
      f: (loc: Loc) => {
        const cells = loc.cells.map(c => window.world.cells[c])
        const oceanDist = mean(cells.map(c => c.oceanDist))
        const h = mean(cells.map(c => (c.isMountains ? c.elevation : Math.min(0.4, c.elevation))))
        return {
          path: SHAPER_DISPLAY.borders.locations([loc]),
          elevation:
            loc.topography === 'mountains'
              ? MAP_METRICS.topography.color(Math.max(1.2, h))
              : loc.topography === 'plateau'
              ? MAP_METRICS.topography.color(0.9)
              : loc.topography === 'hills'
              ? MAP_METRICS.topography.color(h)
              : scaleLinear(
                  [1, 5],
                  [MAP_SHAPES.color.coastal, MAP_METRICS.topography.color(h)]
                ).clamp(true)(oceanDist)
        }
      },
      keyBuilder: loc => loc.idx.toString()
    }),
    minorities: PERFORMANCE.memoize.decorate({
      f: (province: Province) => {
        const cells = PROVINCE.cells.land(province)
        const minority = window.world.cultures[province.minority]
        const minorities = cells.filter(
          c =>
            CELL.neighbors({ cell: c }).some(
              n => window.world.provinces[n.province].culture === minority.idx
            ) ||
            (c.beach && province.colonists !== undefined)
        )
        return SHAPER_DISPLAY.borders.cells(minorities)
      },
      keyBuilder: province => province.idx.toString()
    })
  },
  paths: {
    clear: () => {
      nationCache = {}
      provinceCache = {}
      locationCache = {}
      landCache = {}
    },
    nation: (params: { nation: Province; path: (_object: GeoPermissibleObjects) => string }) => {
      const { nation, path } = params
      if (!nationCache[nation.idx]) {
        nationCache[nation.idx] = DRAW_CACHE.borders
          .nation(nation)
          .map(points => MAP_SHAPES.polygon({ points, path, direction: 'inner' }))
      }
      return nationCache[nation.idx]
    },
    province: (params: {
      province: Province
      path: (_object: GeoPermissibleObjects) => string
    }) => {
      const { province, path } = params
      if (!provinceCache[province.idx]) {
        provinceCache[province.idx] = DRAW_CACHE.borders
          .province(province)
          .path.map(points => MAP_SHAPES.polygon({ points, path, direction: 'inner' }))
      }
      return provinceCache[province.idx]
    },
    location: (params: { loc: Loc; path: (_object: GeoPermissibleObjects) => string }) => {
      const { loc, path } = params
      if (!locationCache[loc.idx]) {
        locationCache[loc.idx] = DRAW_CACHE.borders
          .location(loc)
          .path.map(points => MAP_SHAPES.polygon({ points, path, direction: 'inner' }))
      }
      return locationCache[loc.idx]
    },
    island: (params: { idx: number; path: (_object: GeoPermissibleObjects) => string }) => {
      const { idx, path } = params
      if (!landCache[idx]) {
        const island = window.world.display.islands[idx]
        landCache[idx] = MAP_SHAPES.polygon({ points: island.path, path, direction: 'inner' })
      }
      return landCache[idx]
    }
  }
}
