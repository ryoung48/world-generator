import { GeoProjection } from 'd3'

import { Province } from '../../models/regions/provinces/types'
import { MAP } from './common'

export type MapStyle = typeof MAP.styles[number]
export type MapSeason = typeof MAP.seasons[number]
export type MapClimate = typeof MAP.climates[number]
export type CachedImages = Record<string, HTMLImageElement>

export type WorldPaintParams = {
  cachedImages: CachedImages
  province: Province
  ctx: CanvasRenderingContext2D
  style: MapStyle
  season: MapSeason
  climate: MapClimate
  projection: GeoProjection
}
