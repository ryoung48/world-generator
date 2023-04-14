import { range } from 'd3'

import { fonts } from '../../theme/fonts'

const embellishFont = 20

const drawScale = (params: { ctx: CanvasRenderingContext2D; scale: number }) => {
  const { ctx, scale } = params
  const len = 65
  const start = 50
  ctx.save()
  ctx.resetTransform()
  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.textAlign = 'center'
  const width = (window.world.dim.rw / scale / window.world.dim.w) * len
  range(4).forEach(i => {
    ctx.fillStyle = i % 2 === 0 ? 'black' : 'white'
    const rectStart = start + len * i
    ctx.fillRect(rectStart, start, len, 6)
    ctx.fillStyle = 'black'
    const x = rectStart + len / 2
    ctx.fillText(`${(width * (i + 1)).toFixed(0)} mi`, x, start - 5)
  })
  ctx.restore()
}

export const map__drawEmbellishments = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  scale: number
}) => {
  const { ctx, scale } = params
  drawScale({ ctx, scale })
}
