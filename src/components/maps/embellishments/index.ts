import { range } from 'd3'

import { MATH } from '../../../models/utilities/math'
import { fonts } from '../../theme/fonts'
import { MAP } from '../common'
import { DrawMapParams } from '../common/types'
import { DrawLegendParams, DrawLegendsParams } from './types'

const embellishFont = 20

const drawLegend = ({ ctx, items, alignment, position }: DrawLegendParams) => {
  const boxSize = 10
  const spacingBetweenBoxes = 10
  const spacingFromBoxToText = embellishFont * 0.6
  const textHeight = embellishFont
  ctx.textAlign = 'left'

  let startX = position.x
  if (alignment === 'right') {
    startX = position.x + boxSize
  }

  let startY = position.y

  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillRect(startX - 10, startY - 10, boxSize * 10, items.length * 21)

  for (let item of items) {
    // Draw the color box
    ctx.fillStyle = item.color
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.5
    ctx.fillRect(startX, startY, boxSize, boxSize)
    ctx.strokeRect(startX, startY, boxSize, boxSize)

    // Draw the text
    ctx.fillStyle = 'black'
    let textX =
      alignment === 'left'
        ? startX + boxSize + spacingFromBoxToText
        : startX - spacingFromBoxToText - ctx.measureText(item.text).width

    ctx.fillText(item.text, textX, startY + textHeight * 0.4)

    // Move to the next position
    startY += boxSize + spacingBetweenBoxes
  }
}

export const DRAW_EMBELLISHMENTS = {
  legend: ({ ctx, style }: DrawLegendsParams) => {
    const height = ctx.canvas.height * 0.2
    const width = ctx.canvas.width * 0.04
    const items =
      style === 'Temperature'
        ? MAP.metrics.temperature.legend()
        : style === 'Rain'
        ? MAP.metrics.rain.legend()
        : style === 'Elevation'
        ? MAP.metrics.elevation.legend()
        : []
    drawLegend({ ctx, items, alignment: 'left', position: { x: width, y: height } })
  },
  scale: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const len = 65
    const start = 45
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fillRect(start - 10, start - 30, len * 4 + 20, 45)
    ctx.font = `${embellishFont}px ${fonts.maps}`
    ctx.textAlign = 'center'
    const width = MATH.miToKM(((0.0075 * len) / scale) * window.world.radius)
    const height = start
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.5
    range(4).forEach(i => {
      ctx.fillStyle = i % 2 === 0 ? 'black' : 'white'
      const rectStart = start + len * i
      ctx.fillRect(rectStart, height, len, 6)
      ctx.fillStyle = 'black'
      ctx.strokeRect(rectStart, height, len, 6)
      const x = rectStart + len / 2
      ctx.fillText(`${(width * (i + 1)).toFixed(0)} km`, x, height - 8)
    })
  }
}
