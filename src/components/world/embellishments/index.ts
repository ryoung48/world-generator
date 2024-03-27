import { geoGraticule10, range, scaleLinear } from 'd3'

import { CULTURE } from '../../../models/npcs/cultures'
import { PROVINCE } from '../../../models/regions/provinces'
import { ARRAY } from '../../../models/utilities/array'
import { MATH } from '../../../models/utilities/math'
import { fonts } from '../../theme/fonts'
import { MAP } from '../common'
import { DrawMapParams } from '../common/types'
import {
  CultureLegendParams,
  DrawAvatarParams,
  DrawCloudParams,
  DrawLegendParams,
  DrawLegendsParams,
  HighlightLocationParams
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

const locHighlight = (params: HighlightLocationParams) => {
  const { point, ctx, scale, color } = params
  if (isNaN(point.x) || isNaN(point.y)) return
  const radius = 0.1 * scale
  ctx.save()
  const gradient = ctx.createRadialGradient(point.x, point.y, radius, point.x, point.y, radius * 10)
  gradient.addColorStop(0, `rgba(${color}, 0.4)`)
  gradient.addColorStop(0.9, `rgba(${color}, 0)`)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()
}

const cultureLegend = ({ nationSet, province }: CultureLegendParams) => {
  const region = PROVINCE.region(province)
  return CULTURE.sort({
    ref: window.world.cultures[region.culture],
    group: ARRAY.unique(
      window.world.provinces
        .filter(province => nationSet.has(PROVINCE.nation(province).idx))
        .map(province => {
          const region = PROVINCE.region(province)
          return region.culture
        })
    ).map(i => window.world.cultures[i]),
    type: 'closest'
  }).map(culture => {
    return {
      text: culture.name.toLowerCase(),
      color: culture.display.replace('%)', `%,  0.5)`)
    }
  })
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
    const scale = MAP.scale.derived(projection)
    ctx.globalAlpha = scaleLinear().domain([2, 6]).range([1, 0]).clamp(true)(scale)
    ctx.drawImage(cloudImage, cloudX, 0, w, h)
    ctx.drawImage(cloudImage, cloudX - w, 0, w, h) // Wrap around left
    ctx.drawImage(cloudImage, cloudX + w, 0, w, h) // Wrap around right
    ctx.restore()
  },
  graticule: ({ ctx, projection }: DrawMapParams) => {
    ctx.save()
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.linear(projection)
    const path = new Path2D(pathGen(geoGraticule10()))
    const opacity = 1 / (scale / 2)
    ctx.lineWidth = 0.1
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`
    ctx.stroke(path)
    ctx.restore()
  },
  legend: ({ ctx, style, province, nationSet }: DrawLegendsParams) => {
    const height = ctx.canvas.height * 0.25
    const width = ctx.canvas.width * 0.025
    const climate = PROVINCE.climate(province)
    const items =
      style === 'Temperature'
        ? MAP.metrics.temperature.legend()
        : style === 'Rain'
        ? MAP.metrics.rain.legend()
        : style === 'Elevation'
        ? MAP.metrics.elevation.legend()
        : style === 'Religions'
        ? MAP.metrics.religion.legend()
        : style === 'Population'
        ? MAP.metrics.population.legend()
        : style === 'Development'
        ? MAP.metrics.development.legend()
        : style === 'Climate'
        ? MAP.metrics.climate.legend(climate.latitude)
        : style === 'Cultures'
        ? cultureLegend({ nationSet, province })
        : style === 'Nations'
        ? MAP.metrics.settlement.legend()
        : []
    drawLegend({
      ctx,
      items,
      alignment: 'left',
      position: { x: width, y: height },
      width: style === 'Nations' || style === 'Climate' || style === 'Religions' ? 12 : 10
    })
  },
  scale: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const len = 65
    const [sx, sy] = [35, MAP.height * 0.945]
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
      ctx.fillText(MAP.metrics.elevation.format(width * (i + 1), 0), x, height - 8)
    })
  },
  avatar: ({ ctx, projection, place }: DrawAvatarParams) => {
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.linear(projection)
    const geojson = MAP.geojson.point(place)
    const center = pathGen.centroid(MAP.geojson.features([geojson]))
    locHighlight({ ctx, point: { x: center[0], y: center[1] }, scale, color: '0, 0, 255' })
  }
}
