import * as turf from '@turf/turf'
import { GeoProjection } from 'd3'

import { CELL } from '../../../models/cells'
import { NATION } from '../../../models/nations'
import { PROVINCE } from '../../../models/provinces'
import { Province } from '../../../models/provinces/types'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { PERFORMANCE } from '../../../models/utilities/performance'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MapStyle } from '../types'

const contestedBorder = PERFORMANCE.memoize.decorate({
  f: (nation: Province) => {
    const battlegrounds = NATION.provinces(nation).filter(province => province.battleground >= 0)
    return SHAPER_DISPLAY.borders.provinces(battlegrounds)
  },
  keyBuilder: nation => nation.idx.toString()
})

const wallBorders = PERFORMANCE.memoize.decorate({
  f: (nation: Province) => {
    const borders = NATION.provinces(nation)
      .map(province => {
        return PROVINCE.cells
          .land(province)
          .filter(cell =>
            CELL.neighbors({ cell }).some(
              n => CELL.nation(n) == nation.walls && !n.isWater && !n.isMountains
            )
          )
      })
      .flat()
    return CELL.wallBoundary({
      cells: borders,
      boundary: cell => CELL.nation(cell) == nation.walls && !cell.isWater
    })
  },
  keyBuilder: nation => nation.idx.toString()
})

export const DRAW_NATION = {
  coloration: (params: {
    projection: GeoProjection
    ctx: CanvasRenderingContext2D
    style: MapStyle
    selected: Province
  }) => {
    const { projection, ctx, style } = params
    const nationStyle = style === 'Nations'
    const selected = PROVINCE.nation(params.selected)
    const nations = NATION.nations()
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    const baseWidth = (nationStyle ? 2 : 1) * scale
    nations.forEach(nation => {
      DRAW_CACHE.paths.nation({ nation, path }).forEach(p => {
        ctx.save()
        ctx.lineWidth = baseWidth
        ctx.clip(p)
        ctx.filter = `blur(${scale * (nationStyle ? 1 : 0.5)}px)`
        ctx.strokeStyle = nationStyle ? nation.heraldry.color : 'hsla(0, 0%, 0%, 0.4)'
        ctx.stroke(p)
        if (selected.idx === nation.idx) ctx.stroke(p)
        ctx.fillStyle = nation.heraldry.color.replace('%)', `%, 0.25)`)
        if (nationStyle) ctx.fill(p)
        ctx.restore()
      })
    })
  },
  contested: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    // wars
    const { projection, ctx } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const pattern = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: MAP_SHAPES.color.contested(0.4)
    })
    const pathGen = MAP_SHAPES.path.linear(projection)
    ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
    ctx.lineCap = 'round'
    NATION.nations().forEach(nation => {
      contestedBorder(nation).forEach(path => {
        ctx.save()
        const p = MAP_SHAPES.polygon({ points: path, path: pathGen, direction: 'inner' })
        ctx.clip(p)
        ctx.setLineDash([])
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.restore()
      })
    })
  },
  walls: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    ctx.lineCap = 'butt'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = scale * 0.25
    const mod = 0.5
    const dashes = [1 * scale * mod, 0.5 * scale * mod]
    ctx.setLineDash(dashes)
    NATION.nations()
      .filter(n => n.walls !== undefined)
      .forEach(nation => {
        wallBorders(nation).forEach(border => {
          ctx.save()
          const p = path(turf.multiLineString([border]))
          ctx.stroke(new Path2D(p))
        })
      })
    ctx.setLineDash([])
  }
}
