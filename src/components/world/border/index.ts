import { mean } from 'd3'

import { WORLD } from '../../../models'
import { CLIMATE } from '../../../models/cells/climate'
import { ClimateKey } from '../../../models/cells/climate/types'
import { WEATHER } from '../../../models/cells/weather'
import { CULTURE } from '../../../models/heritage'
import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { RegionSegment } from '../../../models/shapers/display/types'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { MAP_SHAPES } from '../shapes'
import { MAP_METRICS } from '../shapes/metrics'
import { DrawBorderParams } from './types'

const wasteland = 'white'

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

const contestedBorders: Record<number, [number, number][][]> = {}

const contested = ({
  nations,
  projection,
  ctx
}: Omit<DrawBorderParams, 'month' | 'style' | 'province' | 'climate' | 'cachedImages'>) => {
  // wars
  const scale = MAP_SHAPES.scale.derived(projection)
  const pathGen = MAP_SHAPES.path.curveClosed(projection)
  const pattern = MAP_SHAPES.patterns.stripes({
    ctx,
    scale,
    color: MAP_SHAPES.color.contested(0.4)
  })
  ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
  ctx.lineCap = 'round'
  nations.forEach(nation => {
    const battlegrounds = REGION.provinces(nation).filter(province => province.conflict >= 0)
    if (!contestedBorders[nation.idx])
      contestedBorders[nation.idx] = SHAPER_DISPLAY.borders.provinces(battlegrounds)
    contestedBorders[nation.idx].forEach(path => {
      ctx.save()
      const p = MAP_SHAPES.polygon({ points: path, path: pathGen, direction: 'inner' })
      ctx.clip(p)
      ctx.setLineDash([])
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.restore()
    })
  })
}

export const DRAW_BORDERS = {
  regions: ({ ctx, style, month, projection, province }: DrawBorderParams) => {
    const nationCache: Record<number, Record<number, Path2D>> = {}
    const provinceCache: Record<number, Record<number, Path2D>> = {}
    const { regions } = window.world.display
    const selected = PROVINCE.nation(province)
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.curveClosed(projection)
    const regionStyle = style === 'Nations'
    const cultureStyle = style === 'Cultures'
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
        const cell = window.world.cells[province.cell]
        const cells = province.cells.land.map(c => window.world.cells[c])
        const h = WORLD.heightToKM(mean(cells.map(c => c.h)))
        const holdridge = cell.climate
        provinceBorders[province.idx] = {
          path: SHAPER_DISPLAY.borders.provinces([province]),
          elevation: MAP_METRICS.elevation.color(h),
          biome: holdridge,
          pop: MAP_METRICS.population.color(
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
        nationCache[nation.idx][i] = MAP_SHAPES.polygon({
          points: border.path,
          path,
          direction: 'inner'
        })
        const p = nationCache[nation.idx][i]
        ctx.clip(p)
        ctx.strokeStyle = window.world.regions[border.r].heraldry.color.replace('%)', '%, 0.75)')
        ctx.fill(p)
        ctx.restore()
      })
    })
    if (regionStyle || cultureStyle) {
      // regional areas
      ctx.lineWidth = scale * 0.5
      window.world.regions.forEach(region => {
        const base = region.desolate
          ? wasteland
          : regionStyle
          ? region.heraldry.color.replace('%)', `%, 0.25)`)
          : CULTURE.color({ culture: window.world.cultures[region.culture], opacity: 0.4 })
        const color = base
        ctx.fillStyle = color
        ctx.strokeStyle = color.replace('%)', '%, 0.15)')
        regions[region.idx].forEach(border => {
          const p = MAP_SHAPES.polygon({ points: border.path, path, direction: 'inner' })
          ctx.fill(p)
          regionStyle && ctx.stroke(p)
        })
      })
    } else {
      window.world.provinces.forEach(province => {
        const styles = provinceBorders[province.idx]
        const nation = PROVINCE.nation(province)
        const region = PROVINCE.region(province)
        const religion = nation.religion
        provinceCache[province.idx] = {}
        styles.path.forEach((border, i) => {
          ctx.save()
          provinceCache[province.idx][i] = MAP_SHAPES.polygon({
            points: border,
            path,
            direction: 'inner'
          })
          const p = provinceCache[province.idx][i]
          ctx.clip(p)
          const biome = CLIMATE.holdridge[styles.biome]
          ctx.fillStyle =
            style === 'Climate'
              ? biome.color
              : style === 'Topography'
              ? MAP_METRICS.topography.colors[province.topography]
              : style === 'Development'
              ? MAP_METRICS.development.color(region.development)
              : style === 'Wealth'
              ? MAP_METRICS.wealth.color(region.wealth)
              : style === 'Population'
              ? styles.pop
              : style === 'Government'
              ? MAP_METRICS.government.colors[nation.government] ?? wasteland
              : style === 'Religion'
              ? MAP_METRICS.religion.colors[religion] ?? wasteland
              : style === 'Elevation'
              ? styles.elevation
              : style === 'Rain'
              ? MAP_METRICS.rain.color(
                  WEATHER.rain({ cell: window.world.cells[province.cell], month })
                )
              : MAP_METRICS.temperature.color(
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
      const religion = nation.religion
      if (nation.desolate) return
      nationBorders[nation.idx].forEach((border, i) => {
        ctx.save()
        const p = nationCache[nation.idx][i]
        ctx.clip(p)
        ctx.filter = `blur(${scale * (regionStyle || cultureStyle ? 1 : 0.5)}px)`
        ctx.strokeStyle =
          nation.desolate || (!regionStyle && !cultureStyle)
            ? 'hsla(0, 0%, 0%, 0.3)'
            : regionStyle
            ? window.world.regions[border.r].heraldry.color.replace('%)', '%, 0.75)')
            : cultureStyle
            ? CULTURE.color({ culture: window.world.cultures[nation.culture], opacity: 0.75 })
            : MAP_METRICS.religion.colors[religion]
        ctx.stroke(p)
        if (selected.idx === nation.idx) ctx.stroke(p)
        ctx.restore()
      })
    })
    if (style === 'Nations') contested({ nations, projection, ctx })
  }
}
