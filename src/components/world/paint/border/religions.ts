import { GeoProjection } from 'd3'

import { CULTURE } from '../../../../models/heritage'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'

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
  }
}
