import { GeoProjection } from 'd3'

import { CULTURE } from '../../../../models/heritage'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'
import { Province } from '../../../../models/provinces/types'
import { NATION } from '../../../../models/nations'

export const DRAW_RELIGIONS = {
  minorities: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D, visible: Set<number> }) => {
    const { projection, ctx, visible } = params
    // heretics
    const scale = MAP_SHAPES.scale.derived(projection)
    const mask = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: 'black',
      width: 0.5
    })
    // minorities
    const patterns: Record<string, CanvasPattern> = {}
    window.world.provinces
      .filter(province => province.minority !== undefined && visible.has(province.idx))
      .forEach(province => {
        const minority = window.world.cultures[province.minority]
        const culture = window.world.cultures[province.culture]
        const minorityReligion = CULTURE.religion(minority)
        const cultureReligion = CULTURE.religion(culture)
        if (!minorityReligion || !cultureReligion || minorityReligion.type === cultureReligion.type) return
        const religionType = minorityReligion.type
        if (!patterns[religionType]) {
          const pattern = MAP_SHAPES.patterns.masked({
            ctx,
            mask,
            color: MAP_METRICS.religion.colors[religionType]
          })
          patterns[religionType] = ctx.createPattern(pattern, 'repeat')
        }
        ctx.fillStyle = patterns[religionType]
        DRAW_CACHE.borders.minorities(province).forEach(path => {
          const p = MAP_SHAPES.polygon({
            points: path,
            path: MAP_SHAPES.path.curveClosed(projection),
            direction: 'inner'
          })
          ctx.fill(p)
        })
      })
  },
  holySites: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D, visible: Set<number> }) => {
    const { projection, ctx, visible } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const baseRadius = 2 * scale // Adjust size based on zoom level

    // Create gradient pattern once
    const size = baseRadius * 2
    const offscreen = document.createElement('canvas')
    offscreen.width = size
    offscreen.height = size
    const offscreenCtx = offscreen.getContext('2d')!

    const gradient = offscreenCtx.createRadialGradient(baseRadius, baseRadius, 0, baseRadius, baseRadius, baseRadius)
    gradient.addColorStop(0, MAP_METRICS.religion.holySite)
    gradient.addColorStop(1, MAP_METRICS.religion.holySite.replace(', 1)', ', 0)'))

    offscreenCtx.fillStyle = gradient
    offscreenCtx.beginPath()
    offscreenCtx.arc(baseRadius, baseRadius, baseRadius, 0, 2 * Math.PI)
    offscreenCtx.fill()

    window.world.provinces
      .filter(province => province.holySite && visible.has(province.idx))
      .forEach(province => {
        const cell = province.hub
        const projected = projection([cell.x, cell.y])
        if (!projected) return

        const [px, py] = projected

        // Draw the pre-rendered gradient circle
        ctx.drawImage(offscreen, px - baseRadius, py - baseRadius)
      })
  },
  secular: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D, nations: Province[] }) => {
    const { projection, ctx, nations } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.curveClosed(projection)
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.lineWidth = 0.6 * scale
    ctx.setLineDash([1 * scale, 0.5 * scale])
    nations
      .filter(nation => nation.policies.religion === 'secularized')
      .map(nation => {
        ctx.strokeStyle = MAP_METRICS.religion.secular
        DRAW_CACHE.paths.nation({ nation: nation, path: pathGen }).forEach(p => {
          ctx.save()
          ctx.clip(p)
          ctx.stroke(p)
          ctx.restore()
        })
      })
    ctx.restore()
  }
}
