import { Point } from '../../../models/utilities/math/points'

export const canvas__circle = (params: {
  point: Point
  radius: number
  ctx: CanvasRenderingContext2D
  fill: string
  border?: { color: string; width: number }
}) => {
  const { ctx, point, radius, fill, border } = params
  const width = border?.width ?? 0
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = border?.color ?? 'black'
  ctx.fillStyle = fill
  ctx.fill()
  if (width > 0) ctx.stroke()
}
