import { Point } from '../../../models/utilities/math/points/types'

export interface IconDef {
  height: number
  path: string
  opacity: number
  input?: { x: number; y: number; w: number; h: number }
}

export type DrawIconParams = {
  ctx: CanvasRenderingContext2D
  img: HTMLImageElement
  icon: IconDef
  sw: number
  sh: number
  point: Point
  bigger?: boolean
}
