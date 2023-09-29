import { GeoProjection } from 'd3'

import { Point } from '../../../models/utilities/math/points/types'

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

export type MapProjectionParams = {
  scale: number
  ctx: CanvasRenderingContext2D
  rotation: [number, number]
}

export type CurveParams = {
  points: [number, number][]
  projection: GeoProjection
}
