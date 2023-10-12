import { Point } from '../../../models/utilities/math/points/types'
import { MapStyle } from '../types'

export type DrawLegendParams = {
  ctx: CanvasRenderingContext2D
  items: { color: string; text: string }[]
  alignment: 'right' | 'left'
  position: Point
}

export type DrawLegendsParams = {
  ctx: CanvasRenderingContext2D
  style: MapStyle
}
