import { GeoProjection } from 'd3'

import { ViewState } from '../context/types'
import { MAP_SHAPES } from './shapes'

export type MapStyle = typeof MAP_SHAPES.styles[number]
export type CachedImages = Record<string, HTMLImageElement>

export type WorldPaintParams = {
  cachedImages: CachedImages
  loc: ViewState['loc']
  ctx: CanvasRenderingContext2D
  style: MapStyle
  projection: GeoProjection
  rotation: number[]
}
