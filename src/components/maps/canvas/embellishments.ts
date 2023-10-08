import { range } from 'd3'

import { MATH } from '../../../models/utilities/math'
import { fonts } from '../../theme/fonts'

const embellishFont = 20

function decimalToDMS(lat: number, lon: number): string {
  const convert = (decimalDegree: number, isLatitude: boolean): string => {
    const degree: number = Math.floor(decimalDegree)
    const minutesDecimal: number = (decimalDegree - degree) * 60
    const minutes: number = Math.floor(minutesDecimal)
    const seconds: number = (minutesDecimal - minutes) * 60

    const direction = isLatitude ? (decimalDegree >= 0 ? 'N' : 'S') : decimalDegree >= 0 ? 'E' : 'W'

    return `${Math.abs(degree)}° ${Math.abs(minutes)}' ${seconds.toFixed(0)}" ${direction}`
  }

  return `${convert(lat, true)}    ${convert(lon, false)}`
}

export const DRAW_EMBELLISHMENTS = {
  scale: (params: {
    ctx: CanvasRenderingContext2D
    scale: number
    rotation: [number, number, number]
  }) => {
    const { ctx, scale, rotation } = params
    const len = 65
    const start = 45
    ctx.save()
    ctx.resetTransform()
    ctx.font = `${embellishFont}px ${fonts.maps}`
    ctx.textAlign = 'center'
    const width = MATH.kmToMi(((0.0075 * len) / scale) * window.world.radius)
    const height = start
    range(4).forEach(i => {
      ctx.fillStyle = i % 2 === 0 ? 'black' : 'white'
      const rectStart = start + len * i
      ctx.fillRect(rectStart, height, len, 6)
      ctx.fillStyle = 'black'
      const x = rectStart + len / 2
      ctx.fillText(`${(width * (i + 1)).toFixed(0)} mi`, x, height - 5)
    })
    const latX = start + (len * 4.5 - start) / 2
    const latY = start * 1.75
    ctx.fillText(decimalToDMS(-rotation[1], -rotation[0]), latX, latY)
    ctx.restore()
  }
}
