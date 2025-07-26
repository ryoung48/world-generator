import { GeoProjection } from 'd3'

import { PROVINCE } from '../../../models/provinces'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'

export const DRAW_CULTURES = {
  minorities: (params: {
    projection: GeoProjection
    ctx: CanvasRenderingContext2D
    nationSet: Set<number>
  }) => {
    const { projection, ctx, nationSet } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const mask = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: 'black',
      width: 0.5
    })
    const patterns: Record<string, CanvasPattern> = {}
    window.world.provinces
      .filter(
        province => province.minority !== undefined && nationSet.has(PROVINCE.nation(province).idx)
      )
      .map(province => {
        const culture = window.world.cultures[province.minority]
        if (!patterns[culture.idx]) {
          const pattern = MAP_SHAPES.patterns.masked({
            ctx,
            mask,
            color: culture.display.color
          })
          patterns[culture.idx] = ctx.createPattern(pattern, 'repeat')
        }
        ctx.fillStyle = patterns[culture.idx]
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
