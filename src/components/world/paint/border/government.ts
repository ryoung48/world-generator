import { GeoProjection } from 'd3'

import { NATION } from '../../../../models/nations'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'
import { Province } from '../../../../models/provinces/types'

export const DRAW_GOVERNMENT = {
  vassals: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D, nations: Province[] }) => {
    const { projection, ctx, nations } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.curveClosed(projection)
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.lineWidth = 0.6 * scale
    ctx.setLineDash([1 * scale, 0.5 * scale])
    nations
      .filter(nation => nation.overlord !== undefined)
      .map(nation => {
        ctx.strokeStyle = NATION.colonized(nation)
          ? MAP_METRICS.government.colors.colonial
          : MAP_METRICS.government.colors.vassal
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
