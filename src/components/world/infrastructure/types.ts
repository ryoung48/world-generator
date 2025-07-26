import { Hub } from '../../../models/provinces/hubs/type'
import { DrawMapParams } from '../shapes/types'
import { CachedImages, MapStyle } from '../types'

export type DrawInfraParams = DrawMapParams & {
  nationSet: Set<number>
  style: MapStyle
  cachedImages: CachedImages
  place: Hub
}
