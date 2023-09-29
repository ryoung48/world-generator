import { range } from 'd3'

import { canvasDims } from '../../../models/utilities/dimensions'
import { MATH } from '../../../models/utilities/math'
import { fonts } from '../../theme/fonts'

const embellishFont = 20

const drawScale = (params: { ctx: CanvasRenderingContext2D; scale: number }) => {
  const { ctx, scale } = params
  const len = 65
  const start = 75
  ctx.save()
  ctx.resetTransform()
  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.textAlign = 'center'
  const width = (window.world.dim.rw / scale / window.world.dim.w) * len
  const height = start
  range(4).forEach(i => {
    ctx.fillStyle = i % 2 === 0 ? 'black' : 'white'
    const rectStart = start + len * i
    ctx.fillRect(rectStart, height, len, 6)
    ctx.fillStyle = 'black'
    const x = rectStart + len / 2
    ctx.fillText(`${(width * (i + 1)).toFixed(0)} mi`, x, height - 5)
  })
  ctx.restore()
}

const drawGrid = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  dx: number
  dy: number
}) => {
  const { ctx, dx, dy, scale } = params
  ctx.save()
  ctx.resetTransform()
  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.lineWidth = 0.5
  ctx.strokeStyle = 'hsl(0, 0%, 0%, 0.5)'
  ctx.fillStyle = ctx.strokeStyle
  ctx.textAlign = 'center'
  const ticks = 11
  const lat = [...window.world.latitude].reverse()
  const latSpace = (lat[0] - lat[1]) / (ticks + 1)
  const height = Math.max(canvasDims.h, ctx.canvas.height)
  const width = Math.max(canvasDims.w, ctx.canvas.width)
  const uLat = MATH.scale([0, height], lat, (height - dy) / scale)
  const lLat = MATH.scale([0, height], lat, (0 - dy) / scale)
  const long = [...window.world.longitude].reverse()
  const longSpace = (long[0] - long[1]) / (ticks + 1)
  const uLong = MATH.scale([0, width], long, (width - Math.min(0, dx)) / scale)
  const lLong = MATH.scale([0, width], long, (0 - Math.min(0, dx)) / scale)
  range(ticks).forEach(i => {
    const y = MATH.scale([0, ticks - 1], [60, ctx.canvas.height - 60], i)
    let path = new Path2D(`M${ctx.canvas.width * 0.04} ${y} L${ctx.canvas.width * 0.05} ${y} Z`)
    ctx.stroke(path)
    path = new Path2D(`M${ctx.canvas.width * 0.94} ${y} L${ctx.canvas.width * 0.95} ${y} Z`)
    ctx.stroke(path)
    const latitude = MATH.scale(lat, [lLat, uLat], lat[0] - (i + 1) * latSpace)
    ctx.fillText(`${latitude.toFixed(1)}°`, ctx.canvas.width * 0.02, y + 5)
    ctx.fillText(`${latitude.toFixed(1)}°`, ctx.canvas.width * 0.97, y + 5)

    const x = MATH.scale([0, ticks - 1], [60, ctx.canvas.width - 60], i)
    path = new Path2D(`M${x} ${ctx.canvas.height * 0.03} L${x} ${ctx.canvas.height * 0.04} Z`)
    ctx.stroke(path)
    path = new Path2D(`M${x} ${ctx.canvas.height * 0.96} L${x} ${ctx.canvas.height * 0.97} Z`)
    ctx.stroke(path)
    const longitude = MATH.scale(long, [lLong, uLong], long[0] - (i + 1) * longSpace)
    ctx.fillText(`${longitude.toFixed(1)}°`, x + 5, ctx.canvas.height * 0.02)
    ctx.fillText(`${longitude.toFixed(1)}°`, x + 5, ctx.canvas.height * 0.99)
  })
  ctx.restore()
}

export const map__drawEmbellishments = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  scale: number
  dx: number
  dy: number
}) => {
  const { ctx, scale } = params
  drawScale({ ctx, scale })
  drawGrid(params)
}
