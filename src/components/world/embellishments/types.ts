import { GeoProjection } from 'd3'

import { Province } from '../../../models/provinces/types'
import { Point } from '../../../models/utilities/math/points/types'
import { DrawMapParams } from '../shapes/types'
import { CachedImages, MapStyle } from '../types'

export type LegendParams = {
  items: {
    color?: string
    text: string
    shape?: (_params: { ctx: CanvasRenderingContext2D; point: Point; scale: number }) => void
  }[]
  width: number
}

export type DrawLegendParams = {
  ctx: CanvasRenderingContext2D
  alignment: 'right' | 'left'
  position: Point
  width?: number
  border?: boolean
} & LegendParams

export type DrawLegendsParams = {
  ctx: CanvasRenderingContext2D
  province: Province
  style: MapStyle
  nationSet: Set<number>
}

export type CultureLegendParams = {
  nationSet: Set<number>
  province: Province
}

export interface DrawCloudParams extends DrawMapParams {
  cachedImages: CachedImages
}

export type DrawCompassParams = {
  ctx: CanvasRenderingContext2D
  rotation: number[]
  projection: GeoProjection
}

export type MapControlsProps = {
  move: (_params: { dx: number; dy: number; scale: number }) => void
}
