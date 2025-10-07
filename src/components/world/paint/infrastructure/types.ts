import { Hub } from '../../../../models/provinces/hubs/type'
import { CachedImages, MapStyle } from '../../types'
import { DrawMapParams } from '../shapes/types'

export type DrawInfraParams = DrawMapParams & {
  nationSet: Set<number>
  style: MapStyle
  cachedImages: CachedImages
  place: Hub
}
