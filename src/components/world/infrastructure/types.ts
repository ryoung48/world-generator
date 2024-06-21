import { Place } from '../../../models/regions/places/types'
import { DrawMapParams } from '../shapes/types'
import { CachedImages, MapStyle } from '../types'

export type DrawInfraParams = DrawMapParams & {
  nationSet: Set<number>
  style: MapStyle
  cachedImages: CachedImages
  place: Place
}
