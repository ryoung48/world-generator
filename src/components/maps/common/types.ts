import { GeoPermissibleObjects, GeoProjection } from 'd3'

import { Point } from '../../../models/utilities/math/points/types'
import { Vertex } from '../../../models/utilities/math/voronoi/types'

export interface CircleParams {
  point: Point
  radius: number
  ctx: CanvasRenderingContext2D
  fill: string
  border?: {
    color: string
    width: number
  }
}

export type DrawPolygonParams = {
  points: Vertex[]
  direction: 'inner' | 'outer'
  path: (_object: GeoPermissibleObjects) => string
}

export type DrawMapParams = {
  ctx: CanvasRenderingContext2D
  projection: GeoProjection
}
