import { geoGraticule10, range } from 'd3'

import { MATH } from '../../../models/utilities/math'
import { fonts } from '../../theme/fonts'
import { MAP } from '../common'
import { DrawMapParams } from '../common/types'
import {
  DrawAvatarParams,
  DrawLegendParams,
  DrawLegendsParams,
  HighlightLocationParams
} from './types'

const embellishFont = 20

const drawLegend = ({ ctx, items, alignment, position, width }: DrawLegendParams) => {
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
  ctx.fillRect(startX - 10, startY - 10, boxSize * width, items.length * 21)

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

export const DRAW_EMBELLISHMENTS = {
  graticule: ({ ctx, projection }: DrawMapParams) => {
    ctx.save()
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.linear(projection)
    const path = new Path2D(pathGen(geoGraticule10()))
    const opacity = 1 / (scale / 2) ** 2
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`
    ctx.stroke(path)
    ctx.restore()
  },
  legend: ({ ctx, style }: DrawLegendsParams) => {
    const height = ctx.canvas.height * 0.15
    const width = ctx.canvas.width * 0.04
    // const holdridge = climate === 'Holdridge'
    // const usedKoppen = new Set<string>()
    const items =
      style === 'Temperature'
        ? MAP.metrics.temperature.legend()
        : style === 'Rain'
        ? MAP.metrics.rain.legend()
        : style === 'Elevation'
        ? MAP.metrics.elevation.legend()
        : style === 'Population'
        ? MAP.metrics.population.legend()
        : // : style === 'Climate'
          // ? ARRAY.unique(
          //     close
          //       .map(region =>
          //         REGION.provinces(region)
          //           .map(province =>
          //             province.cells.land
          //               .filter(c => !window.world.cells[c].isMountains)
          //               .map(c => window.world.cells[c].biome)
          //           )
          //           .flat()
          //       )
          //       .flat()
          //   )
          //     .sort((a, b) => BIOME.holdridge[a].idx - BIOME.holdridge[b].idx)
          //     .map(biome => {
          //       const { name, latitude, color, koppen } = BIOME.holdridge[biome]
          //       const used = usedKoppen.has(koppen.code)
          //       usedKoppen.add(koppen.code)
          //       return holdridge
          //         ? { color, text: `${name} (${latitude})` }
          //         : { color: koppen.color, text: koppen.code, used: used }
          //     })
          //     .filter(i => !i.used)
          []
    drawLegend({
      ctx,
      items,
      alignment: 'left',
      position: { x: width, y: height },
      width: style === 'Climate' || style === 'Cultures' ? 18 : 10
    })
  },
  scale: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const len = 65
    const start = 45
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fillRect(start - 10, start - 30, len * 4 + 20, 45)
    ctx.font = `${embellishFont}px ${fonts.maps}`
    ctx.textAlign = 'center'
    const width = MATH.conversion.distance.miles.km(((0.0075 * len) / scale) * window.world.radius)
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
      ctx.fillText(MAP.metrics.elevation.format(width * (i + 1), 0), x, height - 8)
    })
  },
  avatar: ({ ctx, projection, province }: DrawAvatarParams) => {
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.linear(projection)
    const geojson = MAP.geojson.point(province.hub)
    const center = pathGen.centroid(MAP.geojson.features([geojson]))
    locHighlight({ ctx, point: { x: center[0], y: center[1] }, scale, color: '0, 0, 255' })
  }
}
