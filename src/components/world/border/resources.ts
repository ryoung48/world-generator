import { GeoProjection } from 'd3'

import { TRADE_GOODS } from '../../../models/provinces/trade'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'

export const DRAW_RESOURCES = {
  coloration: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const locations = window.world.locations
    const path = MAP_SHAPES.path.linear(projection)
    locations.forEach(loc => {
      ctx.fillStyle =
        TRADE_GOODS.reference[loc.resource]?.tinto ??
        TRADE_GOODS.reference[loc.resource]?.color ??
        MAP_SHAPES.color.wasteland
      DRAW_CACHE.paths.location({ loc, path }).forEach(p => {
        ctx.fill(p)
      })
    })
  }
}
