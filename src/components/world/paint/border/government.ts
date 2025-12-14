import { GeoProjection } from 'd3'
import * as turf from '@turf/turf'

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
    ctx.lineWidth = 0.4 * scale
    ctx.setLineDash([1 * scale, 0.5 * scale])
    nations
      .filter(nation => nation.overlord !== undefined)
      .map(nation => {
        ctx.strokeStyle = NATION.colonized(nation)
          ? MAP_METRICS.government.colors.colonial
          : MAP_METRICS.government.colors.vassal
        DRAW_CACHE.borders.nation(nation).forEach(points => {
          // Close ring if needed
          const ring = points.slice()
          if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
            ring.push(ring[0])
          }
          if (ring.length < 4) return // Invalid polygon

          const poly = turf.polygon([ring])
          // Buffer by -15km (approx)
          const buffered = turf.buffer(poly, -15, { units: 'kilometers' })

          if (buffered) {
            const pathData = pathGen(buffered as any)
            if (pathData) {
              const p = new Path2D(pathData)
              ctx.stroke(p)
            }
          }
        })
      })
    ctx.restore()
  }
}
