import { GeoProjection } from 'd3'

import { ViewState } from '../context/types'
import { MAP } from './common'

export type MapStyle = typeof MAP.styles[number]
export type CachedImages = Record<string, HTMLImageElement>

export type WorldPaintParams = {
  cachedImages: CachedImages
  loc: ViewState['loc']
  ctx: CanvasRenderingContext2D
  style: MapStyle
  month: number
  projection: GeoProjection
}
