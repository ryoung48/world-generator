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

export interface CrossParams {
  point: Point
  radius: number
  ctx: CanvasRenderingContext2D
  color: string
  width: number
}

export interface DrawFeaturesParams {
  point: Point
  scale: number
  ctx: CanvasRenderingContext2D
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

export type SettlementParams = {
  ctx: CanvasRenderingContext2D
  point: Point
  scale: number
  population: number
  capital?: boolean
}
