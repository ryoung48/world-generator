import { Place } from '../../../models/regions/places/types'
import { Province } from '../../../models/regions/provinces/types'
import { Point } from '../../../models/utilities/math/points/types'
import { DrawMapParams } from '../common/types'
import { CachedImages, MapStyle } from '../types'

export type DrawLegendParams = {
  ctx: CanvasRenderingContext2D
  items: {
    color?: string
    text: string
    shape?: (_params: { ctx: CanvasRenderingContext2D; point: Point; scale: number }) => void
  }[]
  alignment: 'right' | 'left'
  position: Point
  width?: number
}

export type DrawLegendsParams = {
  ctx: CanvasRenderingContext2D
  province: Province
  style: MapStyle
}

export type HighlightLocationParams = {
  point: Point
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}

export type DrawAvatarParams = Omit<DrawMapParams, 'nationSet'> & {
  place: Place
}

export type CultureLegendParams = {
  nationSet: Set<number>
  province: Province
}

export interface DrawCloudParams extends DrawMapParams {
  cachedImages: CachedImages
}
