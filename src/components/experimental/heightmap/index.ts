import { interpolateGreys, mean, scaleLinear } from 'd3'

import { Loc } from '../../../models/cells/locations/types'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { PERFORMANCE } from '../../../models/utilities/performance'
import { MAP_SHAPES } from '../../world/shapes'
import { DrawMapParams } from '../../world/shapes/types'

const locationBorder = PERFORMANCE.memoize.decorate({
  f: (loc: Loc) => {
    const cells = loc.cells.map(c => window.world.cells[c]).filter(c => c.elevation !== undefined)
    const h = mean(cells.map(c => c.elevation))
    return {
      path: SHAPER_DISPLAY.borders.locations([loc]),
      elevation: h
    }
  },
  keyBuilder: loc => loc.idx.toString()
})

export const HEIGHT_MAP = {
  draw: ({ ctx, projection }: DrawMapParams) => {
    const linear = MAP_SHAPES.path.linear(projection)
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.fill(new Path2D(linear({ type: 'Sphere' })))
    const max = Math.max(
      ...window.world.locations.map(l => locationBorder(l).elevation).filter(h => h !== undefined)
    )
    console.log(max)
    const scale = scaleLinear().domain([0, max]).range([0.95, 0])
    window.world.locations.forEach(loc => {
      const { elevation, path } = locationBorder(loc)
      ctx.fillStyle = interpolateGreys(scale(elevation))
      path.forEach(border => {
        const p = MAP_SHAPES.polygon({ points: border, path: linear, direction: 'inner' })
        ctx.fill(p)
      })
    })
  }
}
