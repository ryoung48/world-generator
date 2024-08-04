import { Site } from '../../../models/regions/sites/type'
import { DrawMapParams } from '../shapes/types'
import { CachedImages, MapStyle } from '../types'

export type DrawInfraParams = DrawMapParams & {
  nationSet: Set<number>
  style: MapStyle
  cachedImages: CachedImages
  place: Site
}
