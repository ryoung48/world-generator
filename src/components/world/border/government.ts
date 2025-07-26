import { GeoProjection } from 'd3'

import { NATION } from '../../../models/nations'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'

export const DRAW_GOVERNMENT = {
  vassals: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const nations = NATION.nations()
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.curveClosed(projection)
    const vassals = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: MAP_METRICS.government.colors.vassal
    })
    ctx.lineCap = 'round'
    nations
      .filter(province => province.suzerain !== undefined)
      .map(province => {
        ctx.fillStyle = ctx.createPattern(vassals, 'repeat')
        DRAW_CACHE.paths.nation({ nation: province, path: pathGen }).forEach(p => {
          ctx.fill(p)
        })
      })
  },
  colonies: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.curveClosed(projection)
    const colonial = MAP_SHAPES.patterns.stripes({
      ctx,
      color: MAP_METRICS.government.colors.colonial,
      scale
    })
    window.world.provinces
      .filter(province => province.colonists !== undefined)
      .forEach(province => {
        ctx.fillStyle = ctx.createPattern(colonial, 'repeat')
        DRAW_CACHE.paths.province({ province, path: pathGen }).forEach(p => {
          ctx.fill(p)
        })
      })
  }
}
