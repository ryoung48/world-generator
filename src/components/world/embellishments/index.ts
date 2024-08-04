import { geoGraticule10, GeoProjection, range, scaleLinear } from 'd3'

import { CULTURE } from '../../../models/heritage'
import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { MATH } from '../../../models/utilities/math'
import { POINT } from '../../../models/utilities/math/points'
import { fonts } from '../../theme/fonts'
import { MAP_SHAPES } from '../shapes'
import { MAP_METRICS } from '../shapes/metrics'
import { DrawMapParams } from '../shapes/types'
import {
  CultureLegendParams,
  DrawCloudParams,
  DrawCompassParams,
  DrawLegendParams,
  DrawLegendsParams
} from './types'

const embellishFont = 20

const drawLegend = ({ ctx, items, alignment, position, width }: DrawLegendParams) => {
  if (items.length == 0) return
  const boxSize = 10
  const spacingBetweenBoxes = 12
  const spacingFromBoxToText = embellishFont * 0.6
  const textHeight = embellishFont
  ctx.textAlign = 'left'

  let startX = position.x
  if (alignment === 'right') {
    startX = position.x + boxSize
  }

  let startY = position.y

  ctx.font = `${embellishFont}px ${fonts.maps}`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.fillRect(startX - 10, startY - 10, boxSize * width, items.length * 23 + 10)
  startY += 5
  for (let item of items) {
    // Draw the color box
    if (item.color) {
      ctx.fillStyle = item.color
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 0.5
      ctx.fillRect(startX, startY, boxSize, boxSize)
      ctx.strokeRect(startX, startY, boxSize, boxSize)
    } else if (item.shape) {
      item.shape({
        ctx,
        point: { x: startX + boxSize * 0.5, y: startY + boxSize * 0.5 },
        scale: 20
      })
    }

    // Draw the text
    ctx.fillStyle = 'black'
    let textX =
      alignment === 'left'
        ? startX + (item.color || item.shape ? boxSize + spacingFromBoxToText : 0)
        : startX - spacingFromBoxToText - ctx.measureText(item.text).width

    ctx.fillText(item.text, textX, startY + textHeight * 0.4)

    // Move to the next position
    startY += boxSize + spacingBetweenBoxes
  }
}

const cultureLegend = ({ nationSet, province }: CultureLegendParams) => {
  const region = PROVINCE.region(province)
  const used = new Set()
  const cultures: number[] = []
  REGION.sort({
    ref: region,
    group: Array.from(nationSet)
      .map(r => REGION.domains(window.world.regions[r]))
      .flat(),
    type: 'closest'
  }).forEach(r => {
    if (!used.has(r.culture)) {
      cultures.push(r.culture)
      used.add(r.culture)
    }
  })
  return cultures.slice(0, 10).map(c => {
    const culture = window.world.cultures[c]
    return {
      text: `${culture.name.toLowerCase()}`,
      color: CULTURE.color({ culture, opacity: 0.4 })
    }
  })
}

// Function to draw compass
function drawCompass(ctx: CanvasRenderingContext2D, projection: GeoProjection) {
  const centerX = ctx.canvas.width * 0.07
  const centerY = ctx.canvas.height * 0.75
  const radius = 60
  const width = 6

  const northPole = projection([0, 90])
  const angle =
    POINT.bearing.planar(
      {
        x: northPole[0],
        y: northPole[1]
      },
      {
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2
      }
    ) - 90
  const rotation = MATH.conversion.angles.radians(angle)

  ctx.save()
  // draw the background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  const boxRadius = radius + 35
  ctx.fillRect(
    centerX - boxRadius - width / 2,
    centerY - boxRadius - width / 2,
    boxRadius * 2 + width,
    boxRadius * 2 + width
  )

  // draw the outer ring
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.lineCap = 'butt'
  ctx.lineWidth = width
  ctx.setLineDash([2, 6])
  ctx.stroke()

  // reset the line styles
  ctx.lineWidth = 1
  ctx.setLineDash([])

  // draw the lower outer border
  const adjustedWidth = width - 3
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius - adjustedWidth, 0, 2 * Math.PI)
  ctx.stroke()
  // draw the upper outer border
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius + adjustedWidth, 0, 2 * Math.PI)
  ctx.stroke()
  // draw the first inner ring
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius - 35, 0, 2 * Math.PI)
  ctx.stroke()
  // draw the second inner ring
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius - 25, 0, 2 * Math.PI)
  ctx.stroke()

  // draw the third inner ring arcs
  ctx.translate(centerX, centerY)
  ctx.rotate(rotation)
  for (let i = 55, j = 125; i < 360; i += 90, j += 90) {
    ctx.beginPath()
    ctx.arc(
      0,
      0,
      radius - 15,
      MATH.conversion.angles.radians(i),
      MATH.conversion.angles.radians(j % 360)
    )
    ctx.stroke()
  }

  // draw the four-pointed stars
  const drawStarPoint = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    leftColor: string,
    rightColor: string,
    orientation: 'H' | 'V'
  ) => {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.closePath()
    ctx.fillStyle = rightColor
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(startX, startY)
    orientation === 'V' ? ctx.lineTo(-endX, endY) : ctx.lineTo(endX, -endY)
    ctx.closePath()
    ctx.fillStyle = leftColor
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.stroke()
  }
  function drawStar(starWidth: number, starLength: number, starRotation = 0) {
    ctx.save()
    ctx.rotate(starRotation)
    const rightColor = 'white'
    const leftColor = 'black'
    drawStarPoint(0, -starLength, starWidth, -10, rightColor, leftColor, 'V') // North
    drawStarPoint(starLength, 0, 10, starWidth, rightColor, leftColor, 'H') // East
    drawStarPoint(0, starLength, starWidth, 10, rightColor, leftColor, 'V') // South
    drawStarPoint(-starLength, 0, -10, starWidth, rightColor, leftColor, 'H') // West
    ctx.restore()
  }
  drawStar(8, radius - 5)
  drawStar(5, radius - 20, MATH.conversion.angles.radians(45))
  ctx.restore()

  const drawLetter = (letter: string, offsetX: number, offsetY: number, offsetR = 0) => {
    ctx.save()
    const finalRotation = rotation + offsetR
    ctx.font = `${embellishFont}px ${fonts.maps}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.translate(centerX, centerY)
    ctx.rotate(finalRotation)
    ctx.translate(offsetX, offsetY)
    ctx.rotate(-finalRotation) // rotate back to keep letters upright
    ctx.fillText(letter, 0, 0)
    ctx.restore()
  }
  // draw the compass labels
  const offset = 20
  const nOffset = angle > 90 ? 14 : 10
  const sOffset = angle > 90 ? 10 : 14
  drawLetter('N', 0, -radius - offset)
  drawLetter('ne', 0, -radius + nOffset, MATH.conversion.angles.radians(45))
  drawLetter('S', 0, radius + offset)
  drawLetter('sw', 0, radius - sOffset, MATH.conversion.angles.radians(45))
  drawLetter('E', radius + offset, 0)
  drawLetter('se', 0, radius - sOffset, MATH.conversion.angles.radians(-45))
  drawLetter('W', -radius - offset, 0)
  drawLetter('nw', 0, -radius + nOffset, MATH.conversion.angles.radians(-45))
}

export const DRAW_EMBELLISHMENTS = {
  clouds: ({ ctx, projection, cachedImages }: DrawCloudParams) => {
    ctx.save()
    ctx.beginPath()
    const [lon] = projection.rotate()
    const h = ctx.canvas.height
    const w = ctx.canvas.width
    const cloudImage = cachedImages['clouds']
    const cloudX = lon * (w / 360)
    ctx.globalCompositeOperation = 'screen'
    const scale = MAP_SHAPES.scale.derived(projection)
    ctx.globalAlpha = scaleLinear().domain([2, 6]).range([1, 0]).clamp(true)(scale)
    ctx.drawImage(cloudImage, cloudX, 0, w, h)
    ctx.drawImage(cloudImage, cloudX - w, 0, w, h) // Wrap around left
    ctx.drawImage(cloudImage, cloudX + w, 0, w, h) // Wrap around right
    ctx.restore()
  },
  compass: ({ ctx, projection }: DrawCompassParams) => {
    drawCompass(ctx, projection)
  },
  graticule: ({ ctx, projection }: DrawMapParams) => {
    ctx.save()
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.linear(projection)
    const path = new Path2D(pathGen(geoGraticule10()))
    const opacity = 1 / (scale / 2)
    ctx.lineWidth = 0.1
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`
    ctx.stroke(path)
    ctx.restore()
  },
  legend: ({ ctx, style, province, nationSet }: DrawLegendsParams) => {
    const height = ctx.canvas.height * 0.2
    const width = ctx.canvas.width * 0.025
    const climate = PROVINCE.climate(province)
    const items =
      style === 'Temperature'
        ? MAP_METRICS.temperature.legend()
        : style === 'Rain'
        ? MAP_METRICS.rain.legend()
        : style === 'Elevation'
        ? MAP_METRICS.elevation.legend()
        : style === 'Religion'
        ? MAP_METRICS.religion.legend()
        : style === 'Government'
        ? MAP_METRICS.government.legend()
        : style === 'Development'
        ? MAP_METRICS.development.legend()
        : style === 'Population'
        ? MAP_METRICS.population.legend()
        : style === 'Cultures'
        ? cultureLegend({ nationSet, province })
        : style === 'Climate'
        ? MAP_METRICS.climate.legend(climate.latitude)
        : style === 'Nations'
        ? MAP_METRICS.settlement.legend()
        : []
    drawLegend({
      ctx,
      items,
      alignment: 'left',
      position: { x: width, y: height },
      width:
        style === 'Nations'
          ? 15
          : style === 'Climate' || style === 'Religion' || style === 'Population'
          ? 12
          : 10
    })
  },
  scale: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const len = 65
    const [sx, sy] = [35, MAP_SHAPES.height * 0.945]
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.fillRect(sx, sy, len * 4 + 20, 45)
    ctx.font = `${embellishFont}px ${fonts.maps}`
    ctx.textAlign = 'center'
    const width = MATH.conversion.distance.miles.km(((0.0075 * len) / scale) * window.world.radius)
    const height = sy + 30
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.5
    range(4).forEach(i => {
      ctx.fillStyle = i % 2 === 0 ? 'black' : 'white'
      const rectStart = sx + 10 + len * i
      ctx.fillRect(rectStart, height, len, 6)
      ctx.fillStyle = 'black'
      ctx.strokeRect(rectStart, height, len, 6)
      const x = rectStart + len / 2
      ctx.fillText(MAP_METRICS.elevation.format(width * (i + 1), 0), x, height - 8)
    })
  }
}
