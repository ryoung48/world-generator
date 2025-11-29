import * as turf from '@turf/turf'
import { GeoProjection } from 'd3'

import { CELL } from '../../../../models/cells'
import { NATION } from '../../../../models/nations'
import { PROVINCE } from '../../../../models/provinces'
import { Province } from '../../../../models/provinces/types'
import { PERFORMANCE } from '../../../../models/utilities/performance'
import { MapStyle } from '../../types'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'

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
    nations: Province[]
  }) => {
    const { projection, ctx, style, nations } = params
    const nationStyle = style === 'Nations'
    const selected = PROVINCE.nation(params.selected)
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    nations.forEach(nation => {
      DRAW_CACHE.paths.nation({ nation, path }).forEach(p => {
        const nationalBorders = nationStyle
        const baseWidth = (nationalBorders ? 2 : 1) * scale
        ctx.save()
        ctx.lineWidth = baseWidth
        ctx.clip(p)
        ctx.filter = `blur(${scale * (nationalBorders ? 1 : 0.5)}px)`
        ctx.strokeStyle = nationalBorders ? nation.heraldry.color : 'hsla(0, 0%, 0%, 0.4)'
        ctx.stroke(p)
        if (selected.idx === nation.idx) ctx.stroke(p)
        ctx.fillStyle = nation.heraldry.color.replace('%)', `%, 0.25)`)
        if (nationalBorders) ctx.fill(p)
        ctx.restore()
      })
    })
  },
  decentralized: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    const { projection, ctx } = params
    const nations = NATION.nations()
    const path = MAP_SHAPES.path.linear(projection)
    nations.forEach(nation => {
      const decentralized =
        nation.decentralization === 'tribes' &&
        nation.government === 'fragmented' &&
        nation.overlord === undefined
      if (!decentralized) return
      ctx.save()
      DRAW_CACHE.paths.nation({ nation, path }).forEach(p => {
        ctx.fillStyle = MAP_METRICS.government.colors.fragmented
        ctx.fill(p)
      })
      ctx.restore()
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
  },
  borders: (params: { projection: GeoProjection; ctx: CanvasRenderingContext2D }) => {
    // Simplified borders without war logic for now
    const { projection, ctx } = params
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)

    const nationBorders = PERFORMANCE.memoize.decorate({
      f: (nation: Province) => {
        const borders = NATION.provinces(nation)
          .filter(province => PROVINCE.neighbors({ province, type: 'foreign' }).length > 0)
          .map(province => {
            return PROVINCE.cells
              .land(province)
              .filter(cell =>
                CELL.neighbors({ cell }).some(
                  n =>
                    CELL.nation(n) !== nation.idx &&
                    !n.isWater
                )
              )
          })
          .flat()
        return CELL.wallBoundary({
          cells: borders,
          boundary: cell =>
            CELL.nation(cell) !== nation.idx
        })
      },
      keyBuilder: nation => nation.idx.toString()
    })

    NATION.nations().forEach(nation => {
      nationBorders(nation).forEach(border => {
        ctx.save()
        const p = path(turf.multiLineString([border]))
        ctx.strokeStyle = '#7D5A73'
        ctx.lineWidth = scale * 0.4
        ctx.stroke(new Path2D(p))
      })
    })
    NATION.nations().forEach(nation => {
      nationBorders(nation).forEach(border => {
        ctx.save()
        const p = path(turf.multiLineString([border]))
        ctx.strokeStyle = 'black'
        ctx.lineWidth = scale * 0.05
        ctx.stroke(new Path2D(p))
      })
    })
    ctx.setLineDash([])
  }
}
