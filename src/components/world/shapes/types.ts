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
    secondary?: {
      color: string
      width: number
    }
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

export interface DrawRouteParams {
  point: Point
  color: { primary: string; secondary?: string }
  ctx: CanvasRenderingContext2D
  dash?: number[]
  width?: number
  lineCap?: 'butt' | 'round' | 'square'
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

export type StripePatternParams = {
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
  width?: number
  spacing?: number
}

export type StripeMaskedPatternParams = {
  ctx: CanvasRenderingContext2D
  mask: HTMLCanvasElement
  color: string
}

export type HighlightLocationParams = {
  point: Point
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
  opacity: number
}

export type ChainParams = {
  point: Point
  ctx: CanvasRenderingContext2D
  scale: number
  backgroundColor: string
  borderColor: string
  borderWidth?: number
}
