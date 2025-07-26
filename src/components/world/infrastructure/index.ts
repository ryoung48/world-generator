import * as turf from '@turf/turf'
import { geoDistance, geoInterpolate } from 'd3'
import * as jdenticon from 'jdenticon'

import { PLACEMENT } from '../../../models/cells/placement'
import { PROVINCE } from '../../../models/provinces'
import { Province } from '../../../models/provinces/types'
import { TIMEZONE_SHAPER } from '../../../models/shapers/civilization/timezones'
import { fonts } from '../../theme/fonts'
import { MAP_SHAPES } from '../shapes'
import { HERALDRY } from '../shapes/heraldry'
import { DrawInfraParams } from './types'

const fontFamily = fonts.maps

const _heraldry: Record<number, HTMLCanvasElement> = {}

const drawHeraldry = (nation: Province) => {
  if (!_heraldry[nation.idx]) {
    const tempCanvas = document.createElement('canvas')
    const initialSize = 100
    tempCanvas.width = initialSize
    tempCanvas.height = initialSize
    const tempCtx = tempCanvas.getContext('2d')
    const config = HERALDRY.config(nation)
    jdenticon.drawIcon(tempCtx, nation.name, initialSize, config)
    _heraldry[nation.idx] = tempCanvas
  }
  return _heraldry[nation.idx]
}

export const DRAW_INFRASTRUCTURE = {
  provinces: ({ ctx, projection, nationSet, place, style }: DrawInfraParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    ctx.textAlign = 'center'
    ctx.shadowColor = 'white'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    const base = 0.75
    ctx.lineWidth = 0.05 * scale
    const provinces = window.world.provinces.map(province => {
      const hub = PROVINCE.hub(province)
      const geojson = turf.point([hub.x, hub.y])
      geojson.properties = { idx: province.idx }
      return geojson
    })
    const radius = 0.2 * scale
    const pathGen = MAP_SHAPES.path.linear(projection).pointRadius(radius * 2)
    const offset = 0.25 * scale
    if (scale > MAP_SHAPES.breakpoints.global) {
      provinces.forEach(province => {
        const loc = window.world.provinces[province.properties.idx]
        const nation = PROVINCE.nation(loc).idx
        if (nationSet.has(nation)) {
          const capital = nation === loc.idx
          const center = pathGen.centroid(province)
          const hub = PROVINCE.hub(loc)
          if (place === hub) {
            MAP_SHAPES.highlight({
              ctx,
              point: { x: center[0], y: center[1] },
              scale: scale * 0.3,
              color: '255,255,255',
              opacity: 1
            })
          }
          let radius = 0.15 * scale * 1.5
          if (hub.site === 'ruins') {
            MAP_SHAPES.ruins({ point: { x: center[0], y: center[1] }, scale: scale * 2, ctx })
          } else if (hub.site === 'wilderness') {
            MAP_SHAPES.wilderness({
              point: { x: center[0], y: center[1] },
              scale: scale * 2,
              ctx
            })
          } else if (hub.site === 'military outpost') {
            MAP_SHAPES.fort({
              point: { x: center[0], y: center[1] },
              scale: scale * 2,
              ctx
            })
          } else if (hub.site === 'camp') {
            MAP_SHAPES.camp({
              point: { x: center[0], y: center[1] },
              scale: scale * 2,
              ctx
            })
          } else {
            radius = MAP_SHAPES.settlement({
              ctx,
              point: { x: center[0], y: center[1] },
              scale,
              capital,
              population: hub.population
            })
          }
          const city = hub.population > 10e3
          const rural = hub.population < 1e3
          ctx.fillStyle = 'black'
          ctx.font = (city ? 1.5 : rural ? 0.8 : 1.0) * scale * base + 'px ' + fontFamily
          ctx.fillText(
            hub.name,
            center[0],
            center[1] - radius - offset * (city ? 2.5 : rural ? 1.2 : 1.5)
          )
        }
      })
    }
    // region titles
    if (scale > MAP_SHAPES.breakpoints.regional) return
    provinces.forEach(capital => {
      const loc = window.world.provinces[capital.properties.idx]
      const nation = PROVINCE.nation(loc)
      const center = pathGen.centroid(capital)
      if (nation.idx === loc.idx && !nation.desolate) {
        const small = nation.size === 'city-state' || nation.size === 'principality'
        const [fontS, fontH, iconS, iconX, iconY, iconH, iconW, tempW, tempH] = small
          ? [1.5, 8, 2, 1.25, 2.8, 1.5, 0.5, 1, 3.2]
          : [2.5, 10, 4, 2.2, 3.5, 3, 0.8, 1.8, 4.5]
        ctx.font = `${fontS * scale * base}px ${fontFamily}`
        ctx.fillStyle = 'black'
        ctx.fillText(nation.name, center[0], center[1] + offset * fontH * base)
        if (style === 'Timezones') {
          if (
            nation.timezone?.offset === TIMEZONE_SHAPER.zones.archaic ||
            nation.timezone.offset === TIMEZONE_SHAPER.zones.wasteland
          )
            return
          const timezoneText = `${nation.timezone?.offset >= 0 ? '+' : '-'}${Math.abs(
            nation.timezone?.offset
          )}`
          ctx.save()
          // Set font for measurement and drawing
          const tzFontSize = fontS * scale * base * 1.5
          ctx.font = `${tzFontSize}px ${fontFamily}`

          // Calculate rectangle dimensions around the text
          const metrics = ctx.measureText(timezoneText)
          const textWidth = metrics.width
          const textHeight = tzFontSize * 0.4
          const padding = tzFontSize * 0.25

          const yPos = center[1] + offset * fontH * base * (small ? 2 : 2.5)
          const rectX = center[0] - textWidth / 2 - padding
          const rectY = yPos - textHeight + metrics.actualBoundingBoxDescent - padding
          const rectW = textWidth + padding * 2
          const rectH = textHeight + padding * 2

          // Draw white background square/rectangle
          ctx.fillStyle = 'white'
          ctx.fillRect(rectX, rectY, rectW, rectH)

          // Draw black border around the rectangle
          ctx.strokeStyle = '#aaaaaa'
          ctx.lineWidth = tzFontSize * 0.05
          ctx.strokeRect(rectX, rectY, rectW, rectH)

          // Draw text over the background
          ctx.fillStyle = 'black'
          ctx.fillText(timezoneText, center[0], yPos)
          ctx.restore()
          return
        }
        ctx.save()
        const tempCanvas = drawHeraldry(nation)
        const config = HERALDRY.config(nation)
        const backColor = config?.backColor ?? '#ffffff'
        const iconSize = iconS * scale * base
        HERALDRY.draw({
          ctx,
          x: center[0] - iconX * scale * base,
          y: center[1] + iconY * scale * base,
          h: iconSize + iconH * scale * base,
          w: iconSize + iconW * scale * base,
          borderWidth: (small ? 0.1 : 0.2) * scale * base,
          backColor,
          style: nation.heraldry.style
        })
        // Copy the identicon from the temporary canvas to the main canvas at the new size
        ctx.drawImage(
          tempCanvas,
          center[0] - tempW * scale * base,
          center[1] + tempH * scale * base,
          iconSize,
          iconSize
        )
        ctx.restore()
      }
    })
  },
  roads: ({ ctx, projection }: Omit<DrawInfraParams, 'place' | 'cachedImages'>) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.curve(projection)
    const { routes } = window.world.display
    ctx.save()
    const mod = scale > MAP_SHAPES.breakpoints.regional ? 0.5 : 1
    ctx.lineCap = 'butt'
    // land roads
    ctx.lineWidth = 0.2 * scale * mod
    ctx.strokeStyle = MAP_SHAPES.color.routes.land(0.5)
    const land = path(turf.multiLineString(routes.land.filter(r => !r.imperial).map(r => r.path)))
    ctx.stroke(new Path2D(land))
    // imperial roads
    let width = 0.5 * scale * mod
    let dashes = [1 * scale * mod, 0.5 * scale * mod]
    ctx.lineWidth = width
    ctx.strokeStyle = MAP_SHAPES.color.routes.land(0.8)
    const imperial = path(
      turf.multiLineString(routes.land.filter(r => r.imperial).map(r => r.path))
    )
    ctx.stroke(new Path2D(imperial))
    ctx.lineWidth = 0.1 * scale * mod
    ctx.strokeStyle = 'white'
    ctx.stroke(new Path2D(imperial))
    // sea routes
    width = 0.15 * scale * mod
    dashes = [1 * scale * mod, 0.5 * scale * mod]
    ctx.lineWidth = width
    ctx.setLineDash(dashes)
    ctx.strokeStyle = MAP_SHAPES.color.routes.sea(0.5)
    const sea = path(turf.multiLineString(routes.sea.map(r => r.path)))
    ctx.stroke(new Path2D(sea))
    ctx.restore()
    // airship routes
    ctx.save()
    ctx.lineCap = 'butt'
    width = 0.3 * scale * mod
    ctx.lineWidth = width
    ctx.strokeStyle = MAP_SHAPES.color.routes.skyship
    const air = MAP_SHAPES.path.basis(projection)
    dashes = [1 * scale * mod, 0.25 * scale * mod, 0.25 * scale * mod]
    ctx.setLineDash(dashes)
    const airships = air(
      turf.multiLineString(
        window.world.skyships.map(([x, y]) => {
          const src = window.world.provinces[x]
          const dst = window.world.provinces[y]
          const start: [number, number] = [src.hub.x, src.hub.y]
          const end: [number, number] = [dst.hub.x, dst.hub.y]
          const distance = geoDistance(start, end) * window.world.radius
          const offset = distance < PLACEMENT.spacing.provinces * 4 ? 0 : 0.03
          const offsetPoint = calculateCurvedPathPoint(start, end, offset)
          const pre = geoInterpolate(start, end)(0.99)
          return [start, offsetPoint, pre, end]
        })
      )
    )
    ctx.stroke(new Path2D(airships))
    ctx.restore()
  }
}
/**
 * Calculate a third point to create a curved path between two geographical points
 * @param point1 - [longitude, latitude] of the first point
 * @param point2 - [longitude, latitude] of the second point
 * @param curvature - Factor to control the curvature of the path (positive for outward, negative for inward)
 * @returns [longitude, latitude] of the third point
 */
export function calculateCurvedPathPoint(
  point1: [number, number],
  point2: [number, number],
  curvature: number = 0.5
): [number, number] {
  // Helper to convert degrees to radians
  const toRadians = (deg: number) => (deg * Math.PI) / 180
  // Helper to convert radians to degrees
  const toDegrees = (rad: number) => (rad * 180) / Math.PI

  // Compute the initial bearing between the two points
  const [lon1, lat1] = point1.map(toRadians)
  const [lon2, lat2] = point2.map(toRadians)

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
  const initialBearing = (toDegrees(Math.atan2(y, x)) + 360) % 360

  // Find the perpendicular bearing (90 degrees offset)
  const perpendicularBearing = (initialBearing + 90) % 360

  // Compute the midpoint between the two points
  const midpoint = geoInterpolate(point1, point2)(0.5)

  // Move the midpoint along the perpendicular bearing by a small distance
  const distance = curvature // Set distance proportional to curvature
  const midpointLat = toRadians(midpoint[1])
  const midpointLon = toRadians(midpoint[0])

  const newLat = Math.asin(
    Math.sin(midpointLat) * Math.cos(distance) +
      Math.cos(midpointLat) * Math.sin(distance) * Math.cos(toRadians(perpendicularBearing))
  )
  const newLon =
    midpointLon +
    Math.atan2(
      Math.sin(toRadians(perpendicularBearing)) * Math.sin(distance) * Math.cos(midpointLat),
      Math.cos(distance) - Math.sin(midpointLat) * Math.sin(newLat)
    )

  // Convert the result back to degrees
  return [toDegrees(newLon), toDegrees(newLat)]
}
