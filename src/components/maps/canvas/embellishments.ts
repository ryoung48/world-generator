import { range } from 'd3'

import { Point } from '../../../models/utilities/math/points'
import { fonts } from '../../theme/fonts'
import { canvas__drawIcon, icon__scaling } from '../icons'
import { terrain__icons } from '../icons/terrain'

const embellishFont = 20

const drawCompass = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
}) => {
  const { sh, sw } = icon__scaling()
  const { ctx, cachedImages } = params
  ctx.save()
  ctx.resetTransform()
  const compassImg = cachedImages['compass']
  const compassIcon = terrain__icons.compass
  const compassOffset = compassIcon.height
  const point = {
    x: ctx.canvas.clientWidth - compassOffset * 0.8,
    y: ctx.canvas.clientHeight - compassOffset * 0.65
  }
  canvas__drawIcon({ ctx, img: compassImg, icon: compassIcon, sw, sh, point })
  ctx.globalAlpha = 1
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.fillText('W', point.x - 72, point.y + 5)
  ctx.fillText('E', point.x + 72, point.y + 7)
  ctx.fillText('N', point.x, point.y - 68)
  ctx.fillText('S', point.x, point.y + 78)
  ctx.restore()
}

const drawHorizontalBorder = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  x: number
  y: number
  height: number
}) => {
  const { ctx, cachedImages, x, y, height } = params
  ctx.save()
  ctx.resetTransform()
  const borderImg = cachedImages['borderH']
  const pattern = ctx.createPattern(borderImg, 'repeat-x') // repeat the image as a pattern
  pattern.setTransform({ f: y })
  ctx.fillStyle = pattern // set the fill style
  ctx.fillRect(x, y, ctx.canvas.clientWidth - x * 2, height) // create a rectangle
  ctx.restore()
}

const drawVerticalBorder = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  x: number
  y: number
  width: number
}) => {
  const { ctx, cachedImages, x, y, width } = params
  ctx.save()
  ctx.resetTransform()
  const borderImg = cachedImages['borderV']
  const pattern = ctx.createPattern(borderImg, 'repeat-y') // repeat the image as a pattern
  pattern.setTransform({ e: x })
  ctx.fillStyle = pattern // set the fill style
  ctx.fillRect(x, y, width, ctx.canvas.clientHeight - y * 1.5) // create a rectangle
  ctx.restore()
}

const drawBox = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  point: Point
  rune: string
}) => {
  const { sh, sw } = icon__scaling()
  const { ctx, cachedImages, point, rune } = params
  ctx.save()
  ctx.resetTransform()
  const boxImg = cachedImages['box']
  const boxIcon = terrain__icons.box
  canvas__drawIcon({ ctx, img: boxImg, icon: boxIcon, sw, sh, point })
  ctx.globalAlpha = 1
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.font = `${50}px ${fonts.arcane}`
  ctx.fillText(rune, point.x + 3, point.y + 18)
  ctx.restore()
}

const drawBorder = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
}) => {
  const { ctx, cachedImages } = params
  const offset = 65
  drawHorizontalBorder({ ctx, cachedImages, x: offset, y: 20, height: 40 })
  drawHorizontalBorder({
    ctx,
    cachedImages,
    x: offset,
    y: ctx.canvas.clientHeight - 20,
    height: 40
  })
  drawVerticalBorder({ ctx, cachedImages, x: 19, y: 67, width: 40 })
  drawVerticalBorder({ ctx, cachedImages, x: ctx.canvas.clientWidth - 49, y: 67, width: 40 })
  drawBox({
    ctx,
    cachedImages,
    point: { x: 35, y: ctx.canvas.clientHeight - 5 },
    rune: window.world.display.runes[0]
  })
  drawBox({ ctx, cachedImages, point: { x: 35, y: 35 }, rune: window.world.display.runes[1] })
  drawBox({
    ctx,
    cachedImages,
    point: { x: ctx.canvas.clientWidth - 35, y: 35 },
    rune: window.world.display.runes[2]
  })
  drawBox({
    ctx,
    cachedImages,
    point: { x: ctx.canvas.clientWidth - 35, y: ctx.canvas.clientHeight - 5 },
    rune: window.world.display.runes[3]
  })
}

const drawScale = (params: { ctx: CanvasRenderingContext2D; scale: number }) => {
  const { ctx, scale } = params
  const len = 65
  const start = 90
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
  const { ctx, cachedImages, scale } = params
  drawScale({ ctx, scale })
  drawCompass({ ctx, cachedImages })
  drawBorder({ ctx, cachedImages })
}
