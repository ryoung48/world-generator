import { mean } from 'd3'

import { WORLD } from '../../../models'
import { CLIMATE } from '../../../models/cells/climate'
import { ClimateKey } from '../../../models/cells/climate/types'
import { WEATHER } from '../../../models/cells/weather'
import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { RegionSegment } from '../../../models/shapers/display/types'
import { ARRAY } from '../../../models/utilities/array'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { MAP } from '../common'
import { DrawBorderParams } from './types'

const contested = 'rgba(225, 0, 0, 0.4)'
const wasteland = 'white'

const stripesPattern = (ctx: CanvasRenderingContext2D, scale: number) => {
  const color1 = 'transparent'
  const color2 = contested
  const thickness = 1 * scale
  const canvas = document.createElement('canvas')
  canvas.width = ctx.canvas.height
  canvas.height = ctx.canvas.height
  const tempCtx = canvas.getContext('2d')
  const numberOfStripes = tempCtx.canvas.height / thickness
  tempCtx.lineWidth = thickness * 0.75
  for (let i = 0; i < numberOfStripes * 2; i++) {
    tempCtx.beginPath()
    tempCtx.strokeStyle = i % 2 ? color1 : color2
    const x = i * thickness + thickness / 2
    const path = new Path2D(`M${x - tempCtx.canvas.height} 0 L${x} ${tempCtx.canvas.height} Z`)
    tempCtx.stroke(path)
  }
  return canvas
}

let nationBorders: Record<number, RegionSegment[]> = {}
let provinceBorders: Record<
  number,
  {
    path: Vertex[][]
    elevation: string
    biome: ClimateKey
    pop: string
  }
> = {}

export const DRAW_BORDERS = {
  contested: ({
    nations,
    projection,
    ctx
  }: Omit<DrawBorderParams, 'month' | 'style' | 'province' | 'climate' | 'cachedImages'>) => {
    // wars
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.curveClosed(projection)
    const pattern = stripesPattern(ctx, scale)
    ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
    ctx.lineCap = 'round'
    nations.forEach(nation => {
      const battlegrounds = REGION.provinces(nation).filter(province => province.conflict >= 0)
      SHAPER_DISPLAY.borders.provinces(battlegrounds).forEach(path => {
        ctx.save()
        const p = MAP.polygon({ points: path, path: pathGen, direction: 'inner' })
        ctx.clip(p)
        ctx.setLineDash([])
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.restore()
      })
    })
  },
  regions: ({ ctx, style, month, projection, province }: DrawBorderParams) => {
    const nationCache: Record<number, Record<number, Path2D>> = {}
    const provinceCache: Record<number, Record<number, Path2D>> = {}
    const { regions } = window.world.display
    const selected = PROVINCE.nation(province)
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.curveClosed(projection)
    const regionStyle = style === 'Nations'
    const nations = window.world.regions.filter(REGION.active)
    if (nations.some(nation => !nationBorders[nation.idx])) {
      nationBorders = {
        ...SHAPER_DISPLAY.borders.regions(nations),
        ...nationBorders
      }
    }
    if (Object.keys(provinceBorders).length === 0) {
      window.world.provinces.forEach(province => {
        const region = PROVINCE.region(province)
        const cells = province.cells.land.map(c => window.world.cells[c])
        const h = WORLD.heightToKM(mean(cells.map(c => c.h)))
        const holdridge = ARRAY.mode(cells.map(cell => cell.climate))[0]
        provinceBorders[province.idx] = {
          path: SHAPER_DISPLAY.borders.provinces([province]),
          elevation: MAP.metrics.elevation.color(h),
          biome: holdridge,
          pop: MAP.metrics.population.color(
            region.desolate ? 0 : PROVINCE.populationDensity(province)
          )
        }
      })
    }
    // base coloration
    ctx.lineWidth = scale * 2
    nations.forEach(nation => {
      ctx.fillStyle = '#f7eedc'
      nationCache[nation.idx] = {}
      nationBorders[nation.idx].forEach((border, i) => {
        ctx.save()
        nationCache[nation.idx][i] = MAP.polygon({ points: border.path, path, direction: 'inner' })
        const p = nationCache[nation.idx][i]
        ctx.clip(p)
        ctx.strokeStyle = window.world.regions[border.r].heraldry.color.replace('%)', '%, 0.75)')
        ctx.fill(p)
        ctx.restore()
      })
    })
    if (
      style !== 'Elevation' &&
      style !== 'Temperature' &&
      style !== 'Rain' &&
      style !== 'Climate' &&
      style !== 'Population' &&
      style !== 'Governments'
    ) {
      // regional areas
      ctx.lineWidth = scale * 0.5
      window.world.regions.forEach(region => {
        const religion = REGION.religion(region)
        const base = region.desolate
          ? wasteland
          : regionStyle
          ? region.heraldry.color
          : MAP.metrics.religion.colors[religion.type]
        const color = base
        ctx.fillStyle = color.replace('%)', `%, ${region.desolate ? 1 : regionStyle ? 0.25 : 0.5})`)
        ctx.strokeStyle = color.replace('%)', '%, 0.15)')
        regions[region.idx].forEach(border => {
          const p = MAP.polygon({ points: border.path, path, direction: 'inner' })
          ctx.fill(p)
          regionStyle && ctx.stroke(p)
        })
      })
    } else {
      window.world.provinces.forEach(province => {
        const styles = provinceBorders[province.idx]
        const nation = PROVINCE.nation(province)
        provinceCache[province.idx] = {}
        styles.path.forEach((border, i) => {
          ctx.save()
          provinceCache[province.idx][i] = MAP.polygon({ points: border, path, direction: 'inner' })
          const p = provinceCache[province.idx][i]
          ctx.clip(p)
          const biome = CLIMATE.holdridge[styles.biome]
          ctx.fillStyle =
            style === 'Climate'
              ? biome.color
              : style === 'Population'
              ? styles.pop
              : style === 'Governments'
              ? MAP.metrics.government.colors[nation.government] ?? wasteland
              : style === 'Elevation'
              ? styles.elevation
              : style === 'Rain'
              ? MAP.metrics.rain.color(
                  WEATHER.rain({ cell: window.world.cells[province.cell], month })
                )
              : MAP.metrics.temperature.color(
                  WEATHER.heat({ cell: window.world.cells[province.cell], month })
                )
          ctx.fill(p)
          ctx.restore()
        })
      })
    }
    // nation borders
    ctx.lineWidth = (regionStyle ? 2 : 1) * scale
    nations.forEach(nation => {
      nationBorders[nation.idx].forEach((border, i) => {
        ctx.save()
        const p = nationCache[nation.idx][i]
        ctx.clip(p)
        ctx.filter = `blur(${scale * (regionStyle ? 1 : 0.5)}px)`
        ctx.strokeStyle =
          nation.desolate || !regionStyle
            ? 'hsla(0, 0%, 0%, 0.3)'
            : window.world.regions[border.r].heraldry.color.replace('%)', '%, 0.75)')
        ctx.stroke(p)
        if (selected.idx === nation.idx) ctx.stroke(p)
        ctx.restore()
      })
    })
  }
}
