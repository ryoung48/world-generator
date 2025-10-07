import { GeoProjection } from 'd3'

import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'

export const DRAW_TOPOGRAPHY = {
  coloration: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const locations = window.world.locations
    const path = MAP_SHAPES.path.linear(projection)
    locations.forEach(loc => {
      ctx.fillStyle = DRAW_CACHE.borders.location(loc).elevation
      DRAW_CACHE.paths.location({ loc, path }).forEach(p => {
        ctx.fill(p)
      })
    })
  },
  special: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    const mask = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: 'black'
    })
    const marsh = MAP_SHAPES.patterns.masked({
      ctx,
      mask,
      color: MAP_SHAPES.color.marsh
    })
    ctx.fillStyle = ctx.createPattern(marsh, 'repeat')
    window.world.locations
      .filter(loc => loc.topography === 'marsh')
      .forEach(loc => {
        DRAW_CACHE.paths.location({ loc, path }).forEach(p => {
          ctx.fill(p)
        })
      })
    const volcanic = MAP_SHAPES.patterns.masked({
      ctx,
      mask,
      color: MAP_SHAPES.color.volcanic
    })
    ctx.fillStyle = ctx.createPattern(volcanic, 'repeat')
    window.world.locations
      .filter(loc => loc.volcanic)
      .forEach(loc => {
        DRAW_CACHE.paths.location({ loc, path }).forEach(p => {
          ctx.fill(p)
        })
      })
  }
}
