import { GeoProjection } from 'd3'

import { Province } from '../../models/provinces/types'
import { MAP_SHAPES } from './paint/shapes'

export type MapStyle = typeof MAP_SHAPES.styles[number]
export type CachedImages = Record<string, HTMLImageElement>

export type WorldPaintParams = {
  cachedImages: CachedImages
  province: Province
  ctx: CanvasRenderingContext2D
  style: MapStyle
  projection: GeoProjection
  rotation: number[]
  units: 'metric' | 'imperial'
}

export type ProjectionType = 'mercator' | 'orthographic' | 'equirectangular'
