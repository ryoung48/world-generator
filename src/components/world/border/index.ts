import { mean } from 'd3'

import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { ARRAY } from '../../../models/utilities/array'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { WORLD } from '../../../models/world'
import { BIOME } from '../../../models/world/climate'
import { Biome } from '../../../models/world/climate/types'
import { DISPLAY } from '../../../models/world/shapers/display'
import { RegionSegment } from '../../../models/world/shapers/display/types'
import { MAP } from '../common'
import { DrawBorderParams } from './types'

const contested = 'rgba(225, 0, 0, 0.4)'

const stripesPattern = (ctx: CanvasRenderingContext2D, scale: number) => {
  const color1 = 'transparent'
  const color2 = contested
  const thickness = 1 * scale
  const numberOfStripes = ctx.canvas.height / thickness
  ctx.lineWidth = thickness * 0.75
  for (let i = 0; i < numberOfStripes * 2; i++) {
    ctx.beginPath()
    ctx.strokeStyle = i % 2 ? color1 : color2
    const x = i * thickness + thickness / 2
    const path = new Path2D(`M${x - ctx.canvas.height} 0 L${x} ${ctx.canvas.height} Z`)
    ctx.stroke(path)
  }
}

let regionBorders: Record<number, RegionSegment[]> = {}
let provinceBorders: Record<
  number,
  {
    path: Vertex[][]
    elevation: string
    heat: { summer: string; winter: string }
    rain: { summer: string; winter: string }
    biome: Biome
    pop: string
  }
> = {}

export const DRAW_BORDERS = {
  contested: ({
    nations,
    projection,
    ctx
  }: Omit<DrawBorderParams, 'season' | 'style' | 'province' | 'climate' | 'cachedImages'>) => {
    // wars
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.curveClosed(projection)
    ctx.lineCap = 'round'
    const conflictZones = new Set(nations.map(region => region.idx))
    window.world.conflicts
      .filter(conflict => conflict.regions.some(r => conflictZones.has(r)))
      .forEach(conflict => {
        DISPLAY.borders
          .provinces(
            conflict.provinces
              .map(p => window.world.provinces[p])
              .filter(province => nations.includes(PROVINCE.nation(province)))
          )
          .forEach(path => {
            ctx.save()
            const p = MAP.polygon({ points: path, path: pathGen, direction: 'inner' })
            ctx.clip(p)
            ctx.setLineDash([])
            stripesPattern(ctx, scale)
            ctx.restore()
          })
      })
  },
  regions: ({ ctx, style, season, climate, nations, projection, province }: DrawBorderParams) => {
    const { regions } = window.world.display
    const selected = PROVINCE.nation(province)
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.curveClosed(projection)
    const regionStyle = style === 'Nations'
    if (nations.some(nation => !regionBorders[nation.idx])) {
      regionBorders = {
        ...DISPLAY.borders.regions(nations),
        ...regionBorders
      }
    }
    if (Object.keys(provinceBorders).length === 0) {
      window.world.provinces.forEach(province => {
        const cells = province.cells.land.map(c => window.world.cells[c])
        const h = WORLD.heightToKM(mean(cells.map(c => c.h)))
        const holdridge = ARRAY.mode(cells.map(cell => cell.biome))[0]
        provinceBorders[province.idx] = {
          path: DISPLAY.borders.provinces([province]),
          elevation: MAP.metrics.elevation.color(h),
          heat: {
            summer: MAP.metrics.temperature.color(mean(cells.map(c => c.heat.summer))),
            winter: MAP.metrics.temperature.color(mean(cells.map(c => c.heat.winter)))
          },
          rain: {
            summer: MAP.metrics.rain.color(mean(cells.map(c => c.rain.summer ?? 0))),
            winter: MAP.metrics.rain.color(mean(cells.map(c => c.rain.winter ?? 0)))
          },
          biome: holdridge,
          pop: MAP.metrics.population.color(PROVINCE.populationDensity(province))
        }
      })
    }
    // base coloration
    ctx.lineWidth = scale * 2
    nations.forEach(nation => {
      ctx.fillStyle = '#f7eedc'
      regionBorders[nation.idx].forEach(border => {
        ctx.save()
        const p = MAP.polygon({ points: border.path, path, direction: 'inner' })
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
      style !== 'Population'
    ) {
      // regional areas
      ctx.lineWidth = scale * 0.5
      window.world.regions.forEach(region => {
        const base = regionStyle
          ? region.heraldry.color
          : style === 'Cultures'
          ? window.world.cultures[region.culture].display
          : style === 'Religions'
          ? window.world.religions[region.religion].display
          : MAP.metrics.development.color(MAP.metrics.development.scale(region.development))
        const color = base
        ctx.fillStyle = color.replace('%)', `%, ${regionStyle ? 0.25 : 0.5})`)
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
        styles.path.forEach(border => {
          ctx.save()
          const p = MAP.polygon({ points: border, path, direction: 'inner' })
          ctx.clip(p)
          const biome = BIOME.holdridge[styles.biome]
          ctx.fillStyle =
            style === 'Climate'
              ? climate === 'Holdridge'
                ? biome.color
                : biome.koppen.color
              : style === 'Population'
              ? styles.pop
              : style === 'Elevation'
              ? styles.elevation
              : style === 'Rain'
              ? season === 'Winter'
                ? styles.rain.winter
                : styles.rain.summer
              : season === 'Winter'
              ? styles.heat.winter
              : styles.heat.summer
          ctx.fill(p)
          ctx.restore()
        })
      })
    }
    if (style !== 'Nations') return
    // nation borders
    ctx.lineWidth = (regionStyle ? 2 : 1) * scale
    nations.forEach(nation => {
      regionBorders[nation.idx].forEach(border => {
        ctx.save()
        const p = MAP.polygon({ points: border.path, path, direction: 'inner' })
        ctx.clip(p)
        ctx.filter = `blur(${scale}px)`
        ctx.strokeStyle = nation.shattered
          ? 'black'
          : window.world.regions[border.r].heraldry.color.replace('%)', '%, 0.75)')
        ctx.stroke(p)
        if (selected.idx === nation.idx) ctx.stroke(p)
        ctx.restore()
      })
    })
    REGION.nations
      .filter(nation => nation.shattered)
      .forEach(nation => {
        REGION.provinces(nation).forEach(province => {
          const styles = provinceBorders[province.idx]
          styles.path.forEach(border => {
            ctx.save()
            ctx.filter = `blur(${scale}px)`
            const p = MAP.polygon({ points: border, path, direction: 'inner' })
            ctx.fillStyle = `hsl(46, 58%, 93%)`
            ctx.fill(p)
            ctx.fill(p)
            ctx.restore()
          })
        })
      })
  }
}
