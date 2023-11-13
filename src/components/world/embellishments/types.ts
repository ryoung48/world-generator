import { Province } from '../../../models/regions/provinces/types'
import { Region } from '../../../models/regions/types'
import { Point } from '../../../models/utilities/math/points/types'
import { DrawMapParams } from '../common/types'
import { MapClimate, MapStyle } from '../types'

export type DrawLegendParams = {
  ctx: CanvasRenderingContext2D
  items: { color: string; text: string }[]
  alignment: 'right' | 'left'
  position: Point
  width?: number
}

export type DrawLegendsParams = {
  ctx: CanvasRenderingContext2D
  climate: MapClimate
  style: MapStyle
  close: Region[]
  far: Region[]
}

export type HighlightLocationParams = {
  point: Point
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}

export type DrawAvatarParams = DrawMapParams & { province: Province }
