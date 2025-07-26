import { GeoProjection } from 'd3'

import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'

export const DRAW_RELIGIONS = {
  minorities: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
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
      .filter(province => province.minority !== undefined)
      .forEach(province => {
        const minority = window.world.cultures[province.minority]
        const culture = window.world.cultures[province.culture]
        if (minority.religion === culture.religion) return
        if (!patterns[minority.religion]) {
          const pattern = MAP_SHAPES.patterns.masked({
            ctx,
            mask,
            color: MAP_METRICS.religion.colors[minority.religion]
          })
          patterns[minority.religion] = ctx.createPattern(pattern, 'repeat')
        }
        ctx.fillStyle = patterns[minority.religion]
        DRAW_CACHE.borders.minorities(province).forEach(path => {
          const p = MAP_SHAPES.polygon({
            points: path,
            path: MAP_SHAPES.path.curveClosed(projection),
            direction: 'inner'
          })
          ctx.fill(p)
        })
      })
  }
}
