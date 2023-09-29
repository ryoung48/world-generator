import { curveCatmullRom, geoMercator, geoPath, line } from 'd3'

import { CircleParams, CurveParams, MapProjectionParams } from './types'

const linear = line().curve(curveCatmullRom.alpha(0.1))

export const CANVAS = {
  _projections: {
    orthographic: (params: MapProjectionParams) => {
      const { scale, ctx, rotation } = params
      const projection = geoMercator()
        .scale(scale * 200)
        .translate([ctx.canvas.width / 2, ctx.canvas.height / 2])
        .rotate(rotation)
      return { projection, path: geoPath().projection(projection) }
    }
  },
  circle: (params: CircleParams) => {
    const { ctx, point, radius, fill, border } = params
    const width = border?.width ?? 0
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = border?.color ?? 'black'
    ctx.fillStyle = fill
    ctx.fill()
    if (width > 0) ctx.stroke()
  },
  curves: {
    linear: ({ points, projection }: CurveParams) => {
      const projected = points.map(p => projection(p))
      return linear(projected)
    }
  },
  projection: (params: MapProjectionParams) => {
    return CANVAS._projections.orthographic(params)
  }
}
