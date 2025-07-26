import * as turf from '@turf/turf'
import * as d3 from 'd3'

import { Point } from '../../../models/utilities/math/points/types'
import {
  ChainParams,
  CircleParams,
  CrossParams,
  DrawFeaturesParams,
  DrawPolygonParams,
  DrawRouteParams,
  HighlightLocationParams,
  SettlementParams,
  StripeMaskedPatternParams,
  StripePatternParams
} from './types'

let legendMask: HTMLCanvasElement = null

/**
 * Creates a strongly typed curve context object.
 * @param curve The curve object.
 * @returns The curve context object.
 */
function curveContext(curve: d3.CurveGenerator, closePath = true) {
  let firstMove = true // Flag to track the first moveTo call
  let lastPoint: [number, number] = null // Store the last point for potential use in finalizing open paths

  return {
    moveTo(x: number, y: number): void {
      if (!firstMove && !closePath) {
        // For open paths, ensure we finalize the path properly if moveTo is called again
        this.closePath()
      }
      curve.lineStart()
      curve.point(x, y)
      firstMove = false
      lastPoint = [x, y]
    },
    lineTo(x: number, y: number): void {
      curve.point(x, y)
      lastPoint = [x, y]
    },
    closePath(): void {
      if (closePath) {
        curve.lineEnd()
      } else if (lastPoint) {
        // For open paths, make a final call to ensure the last segment is drawn
        curve.point(lastPoint[0], lastPoint[1])
        curve.lineEnd()
      }
      // Reset state for next path
      firstMove = true
      lastPoint = null
    }
  }
}
/**
 * Returns a function that generates a geo curve path.
 *
 * @param curve The curve function.
 * @param projection The projection function.
 * @param context The context for the path.
 * @returns The generated geo curve path.
 */
function geoCurvePath(
  curve: (_context: d3.Path) => d3.CurveGenerator,
  projection: d3.GeoProjection,
  closePath = true
) {
  return (object: d3.GeoPermissibleObjects) => {
    const pathContext = d3.path()
    const geoContext = curveContext(curve(pathContext), closePath) as d3.GeoContext
    d3.geoPath(projection, geoContext)(object)
    return pathContext.toString()
  }
}

export const MAP_SHAPES = {
  height: 800,
  width: 1600,
  breakpoints: {
    regional: 25,
    global: 4
  },
  clouds: {
    realtime: 'https://clouds.matteason.co.uk/images/8192x4096/clouds.jpg',
    heavy: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg',
    fair: 'https://shadedrelief.com/natural3/ne3_data/8192/clouds/fair_clouds_8k.jpg'
  },
  circle: (params: CircleParams) => {
    const { ctx, point, radius, fill, border } = params
    const width = border?.width ?? 0
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    if (border?.secondary) {
      ctx.lineWidth = border.secondary.width
      ctx.strokeStyle = border.secondary.color
      ctx.stroke()
    }
    ctx.lineWidth = width
    ctx.strokeStyle = border?.color ?? 'black'
    ctx.fillStyle = fill
    ctx.fill()
    if (width > 0) ctx.stroke()
  },
  chain: (params: ChainParams) => {
    const { ctx, point, scale, backgroundColor, borderColor, borderWidth = 1 } = params
    const radius = scale * 0.08
    const spacing = radius * 1.5

    // Calculate positions for three interlocking circles in a straight line
    const leftCircle = { x: point.x - spacing, y: point.y }
    const centerCircle = { x: point.x, y: point.y + spacing * 0.6 }
    const rightCircle = { x: point.x + spacing, y: point.y }

    const circles = [leftCircle, centerCircle, rightCircle]

    // Set drawing properties
    ctx.lineWidth = borderWidth
    ctx.strokeStyle = borderColor
    ctx.fillStyle = backgroundColor

    // Draw each circle
    circles.forEach(circle => {
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI)
      ctx.lineWidth = borderWidth * 3
      ctx.strokeStyle = backgroundColor
      ctx.stroke()
      ctx.lineWidth = borderWidth * 2
      ctx.strokeStyle = borderColor
      ctx.stroke()
    })
  },
  color: {
    coastal: '#79a896',
    wasteland: '#dbdad9',
    marsh: '#99ccc2',
    volcanic: '#f77542',
    'salt marsh': '#a1d1cf',
    'coral reef': '#c6b6ed',
    'kelp forest': '#c5dbba',
    corruption: '#8d94dd',
    farmlands: '#66ffad',
    contested: (opacity: number) => `rgba(225, 0, 0, ${opacity})`,
    routes: {
      land: (opacity: number) => `rgba(107, 27, 27, ${opacity})`,
      sea: (opacity: number) => `rgba(0, 110, 255, ${opacity})`,
      skyship: 'orange'
    },
    water: {
      fresh: '#afe7ff',
      salt: '#cce0ea',
      seaIce: { permanent: '#FFF', seasonal: '#e3f1f2' }
    }
  },
  hatched: {
    square: ({
      ctx,
      point,
      scale,
      color,
      background
    }: DrawFeaturesParams & { color: string; background?: string }) => {
      const { x, y } = point
      const squareSize = scale * 0.6
      const halfSize = squareSize / 2
      // Draw the square
      ctx.beginPath()
      ctx.rect(x - halfSize, y - halfSize, squareSize, squareSize)

      if (background) {
        ctx.fillStyle = background
        ctx.fill()
      }

      if (!legendMask)
        legendMask = MAP_SHAPES.patterns.stripes({
          ctx,
          scale: scale * 0.15,
          color: 'black',
          spacing: 0,
          width: 0.8
        })
      // Draw the diagonal lines
      const pattern = MAP_SHAPES.patterns.masked({
        ctx,
        color,
        mask: legendMask
      })
      ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
      ctx.fill()
    },
    partial: ({ ctx, point, scale, color }: DrawFeaturesParams & { color: string }) => {
      const { x, y } = point
      const squareSize = scale * 0.6 // Size of the square
      const halfSize = squareSize / 2

      MAP_SHAPES.hatched.square({ ctx, point, scale, color })
      ctx.clearRect(x - halfSize, y - halfSize, halfSize, squareSize)

      // Create a gradient for the left half of the square
      const gradient = ctx.createLinearGradient(x - halfSize, y, x, y)
      gradient.addColorStop(1, color) // Left side red
      gradient.addColorStop(1, 'transparent') // Transition to transparent
      ctx.fillStyle = gradient
      ctx.fill()
    },
    circle: ({ ctx, point, scale, color }: DrawFeaturesParams & { color: string }) => {
      const { x, y } = point
      const radius = (scale * 0.6) / 2

      // Draw the circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)

      if (!legendMask)
        legendMask = MAP_SHAPES.patterns.stripes({
          ctx,
          scale: scale * 0.15,
          color: 'black',
          spacing: 0,
          width: 0.8
        })

      // Draw the diagonal lines with mask
      const pattern = MAP_SHAPES.patterns.masked({
        ctx,
        color,
        mask: legendMask
      })
      ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
      ctx.fill()
    }
  },
  gradient: ({
    ctx,
    point,
    scale,
    from,
    to
  }: DrawFeaturesParams & { from: string; to: string }) => {
    const { x, y } = point
    const squareSize = scale * 0.5 // Size of the square
    const halfSize = squareSize / 2
    ctx.beginPath()
    ctx.rect(x - halfSize, y - halfSize, squareSize, squareSize)

    // Create a gradient for the left half of the square
    const gradient = ctx.createLinearGradient(x - halfSize, y, x + halfSize, y)
    gradient.addColorStop(0, from)
    gradient.addColorStop(1, to)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.5
    ctx.strokeRect(x - halfSize, y - halfSize, squareSize, squareSize)
  },
  cross: ({ ctx, point, radius, color, width }: CrossParams) => {
    // Calculate the start and end points for the horizontal line of the cross
    const startXHorizontal = point.x - radius
    const endXHorizontal = point.x + radius
    const yHorizontal = point.y

    // Calculate the start and end points for the vertical line of the cross
    const startYVertical = point.y - radius
    const endYVertical = point.y + radius
    const xVertical = point.x

    // Set line properties (optional, adjust as needed)
    ctx.strokeStyle = color // Color of the cross lines
    ctx.lineWidth = width // Width of the cross lines

    // Draw the horizontal line
    ctx.beginPath()
    ctx.moveTo(startXHorizontal, yHorizontal)
    ctx.lineTo(endXHorizontal, yHorizontal)
    ctx.stroke()

    // Draw the vertical line
    ctx.beginPath()
    ctx.moveTo(xVertical, startYVertical)
    ctx.lineTo(xVertical, endYVertical)
    ctx.stroke()
  },
  fort: ({ ctx, scale, point }: DrawFeaturesParams) => {
    const len = scale * 0.2
    // Define the main structure dimensions
    const mainWidth = len
    const mainHeight = len

    // Calculate the starting point of the main structure to center the fortress around the point
    const mainStart: Point = {
      x: point.x - mainWidth / 2,
      y: point.y - mainHeight / 2
    }

    // Draw the main structure
    ctx.lineWidth = 0.025 * scale
    ctx.beginPath()
    ctx.rect(mainStart.x, mainStart.y, mainWidth, mainHeight)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.stroke()
    const innerSize = len * 0.65
    const innerX = mainStart.x + len * 0.175
    const innerY = mainStart.y + len * 0.175

    ctx.fillRect(innerX, innerY, innerSize, innerSize)

    // Define tower dimensions relative to the main structure
    const towerWidth = len * 0.2 // Tower width as a fraction of the total length for visual balance
    const towerHeight = len * 0.2 // Tower height as a fraction of the total length for visual balance

    // Tower positions based on the main structure's position
    const towers: Point[] = [
      { x: mainStart.x - towerWidth / 2, y: mainStart.y - towerHeight / 2 }, // Top-left tower
      { x: mainStart.x + mainWidth - towerWidth / 2, y: mainStart.y - towerHeight / 2 }, // Top-right tower
      { x: mainStart.x - towerWidth / 2, y: mainStart.y + mainHeight - towerHeight / 2 }, // Bottom-left tower
      { x: mainStart.x + mainWidth - towerWidth / 2, y: mainStart.y + mainHeight - towerHeight / 2 } // Bottom-right tower
    ]

    // Draw the towers
    ctx.lineWidth = 0.0125 * scale
    towers.forEach(tower => {
      ctx.beginPath()
      ctx.rect(tower.x, tower.y, towerWidth, towerHeight)
      ctx.stroke()
      ctx.fill()
    })
  },
  highlight: ({ point, ctx, scale, color, opacity }: HighlightLocationParams) => {
    if (isNaN(point.x) || isNaN(point.y)) return
    const radius = scale
    ctx.save()
    const gradient = ctx.createRadialGradient(
      point.x,
      point.y,
      radius,
      point.x,
      point.y,
      radius * 10
    )
    gradient.addColorStop(0, `rgba(${color}, ${opacity})`)
    gradient.addColorStop(0.9, `rgba(${color}, 0)`)
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.restore()
  },
  wilderness: ({ ctx, scale, point }: DrawFeaturesParams) => {
    const len = scale * 0.2
    // Define the spacing between lines
    const spacing = len / 4

    // Helper function to draw a line given start and end points
    const drawLine = (start: Point, end: Point) => {
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    }

    // Draw lines in one direction (45 degrees)
    for (let i = -1; i <= 1; i++) {
      const offset = i * spacing
      // Calculate start and end points for each line
      const start = { x: point.x + offset - len / 2, y: point.y + offset + len / 2 }
      const end = { x: start.x + len / Math.sqrt(2), y: start.y - len / Math.sqrt(2) }
      drawLine(start, end)
    }

    // Draw lines in the opposite direction (135 degrees)
    for (let i = -1; i <= 1; i++) {
      const offset = i * spacing
      // Calculate start and end points for each line
      const start = { x: point.x + offset - len / 2, y: point.y - offset - len / 2 }
      const end = { x: start.x + len / Math.sqrt(2), y: start.y + len / Math.sqrt(2) }
      drawLine(start, end)
    }
  },
  route: ({ ctx, point, color, dash, width, lineCap }: DrawRouteParams) => {
    // Calculate the start and end points for the horizontal line of the cross
    ctx.save()
    const radius = 6
    const startXHorizontal = point.x - radius
    const endXHorizontal = point.x + radius
    const yHorizontal = point.y

    // Set line properties (optional, adjust as needed)
    ctx.strokeStyle = color.primary
    ctx.lineWidth = width ?? 2 // Width of the cross lines
    ctx.lineCap = lineCap ?? 'square'

    // Draw the horizontal line
    ctx.beginPath()
    ctx.setLineDash(dash ?? [2, 3])
    ctx.moveTo(startXHorizontal, yHorizontal)
    ctx.lineTo(endXHorizontal, yHorizontal)
    ctx.stroke()
    if (color.secondary) {
      ctx.lineWidth /= 5
      ctx.strokeStyle = color.secondary
      ctx.setLineDash([])
      ctx.moveTo(startXHorizontal, yHorizontal)
      ctx.lineTo(endXHorizontal, yHorizontal)
      ctx.stroke()
    }
    ctx.restore()
  },
  river: {
    color: (opacity: number) => `hsla(196, 40%, 42%, ${opacity})`,
    path: ({ ctx, point, color }: DrawRouteParams) => {
      // Create a D3 line generator for curves
      const lineGenerator = d3
        .line()
        .x(d => d[0]) // Define how to access x-coordinates from points
        .y(d => d[1]) // Define how to access y-coordinates from points
        .curve(d3.curveBasis) // Use a smooth curve (Basis curve)

      // Generate the path data string for the curve
      const pathData = lineGenerator([
        [point.x - 6, point.y], // Start point
        [point.x - 2, point.y - 3], // Single control point
        [point.x + 2, point.y + 3], // Single control point
        [point.x + 6, point.y] // End point
      ])

      if (!pathData) return // Handle cases where points might be invalid

      // Use a Path2D object to draw the path on the canvas
      const path = new Path2D(pathData)

      // Set line properties
      ctx.strokeStyle = color.primary
      ctx.lineWidth = 1.5 // Width of the curve

      // Draw the curve
      ctx.stroke(path)
    }
  },
  ruins: ({ ctx, scale, point }: DrawFeaturesParams) => {
    const len = scale * 0.15
    // The distance from the center point to each circle's center
    const distanceFromCenter = len / Math.sqrt(3)

    // Calculate the center points of the three circles
    const circlePoints: Point[] = [
      { x: point.x - distanceFromCenter, y: point.y - distanceFromCenter / 2 }, // Left circle
      { x: point.x + distanceFromCenter, y: point.y - distanceFromCenter / 2 }, // Right circle
      { x: point.x, y: point.y + distanceFromCenter } // Top circle
    ]

    // Radius of each circle
    const radius = len / 3 // Arbitrary radius relative to the length for visual balance

    // Draw each circle
    circlePoints.forEach(circlePoint => {
      ctx.beginPath()
      ctx.arc(circlePoint.x, circlePoint.y, radius, 0, 2 * Math.PI)
      ctx.fill()
    })
  },
  rural: ({ ctx, scale, point }: DrawFeaturesParams) => {
    const len = scale * 0.15
    // Calculate the base's width and height
    const baseWidth = len
    const baseHeight = len * 0.6 // The height is somewhat arbitrary, chosen for visual balance

    // Calculate the starting point of the base to center the house around the point
    const baseStart: Point = {
      x: point.x - baseWidth / 2,
      y: point.y - baseHeight / 2
    }

    // Draw the base of the house
    ctx.beginPath()
    ctx.rect(baseStart.x, baseStart.y, baseWidth, baseHeight)
    ctx.stroke()

    // Calculate points for the roof (an equilateral triangle for simplicity)
    const roofHeight = len * 0.5 // The roof height is somewhat arbitrary, chosen for visual balance
    const roofPeak: Point = {
      x: point.x,
      y: baseStart.y - roofHeight
    }
    const roofBaseLeft: Point = baseStart
    const roofBaseRight: Point = {
      x: baseStart.x + baseWidth,
      y: baseStart.y
    }

    // Draw the roof
    ctx.beginPath()
    ctx.moveTo(roofPeak.x, roofPeak.y)
    ctx.lineTo(roofBaseLeft.x, roofBaseLeft.y)
    ctx.lineTo(roofBaseRight.x, roofBaseRight.y)
    ctx.closePath() // Closes the path to the starting point to complete the shape
    ctx.stroke()
  },
  settlement: ({ ctx, point, scale, population, capital }: SettlementParams) => {
    const fill = capital ? 'red' : 'white'
    const border = { color: 'black', width: 0.025 * scale }
    const urban = population > 10e3
    const metropolis = population > 200e3
    const mod = 1.5
    let radius = (metropolis ? 0.25 : urban ? 0.2 : 0.15) * scale * mod
    const params = { radius, fill, border }
    radius += 0.08 * scale
    if (population <= 1000) {
      radius = 0.12 * scale * mod
      MAP_SHAPES.circle({
        ctx,
        point,
        ...params,
        radius
      })
      return radius
    }
    MAP_SHAPES.circle({
      ctx,
      point,
      ...params,
      radius
    })
    MAP_SHAPES.circle({
      ctx,
      point,
      ...params,
      fill: metropolis ? 'black' : fill
    })
    if (population > 10e3) {
      MAP_SHAPES.cross({
        ctx,
        point,
        radius: params.radius,
        color: params.border.color,
        width: params.border.width
      })
    }
    return radius
  },
  camp: ({ ctx, scale, point }: DrawFeaturesParams) => {
    const len = scale * 0.2
    // Calculate the base width of the tent
    const baseWidth = len

    // Calculate the height of the tent (triangle height) for visual balance
    const tentHeight = len * 0.75

    // Calculate the starting point of the tent base to center the tent around the point
    const baseStart: Point = {
      x: point.x - baseWidth / 2,
      y: point.y + tentHeight / 2
    }

    // Calculate the peak of the tent
    const peak: Point = {
      x: point.x,
      y: point.y - tentHeight / 2
    }

    // Draw the tent base
    ctx.beginPath()
    ctx.moveTo(baseStart.x, baseStart.y)
    ctx.lineTo(baseStart.x + baseWidth, baseStart.y)
    ctx.stroke()

    // Draw the left side of the tent
    ctx.beginPath()
    ctx.moveTo(baseStart.x, baseStart.y)
    ctx.lineTo(peak.x, peak.y)
    ctx.stroke()

    // Draw the right side of the tent
    ctx.beginPath()
    ctx.moveTo(baseStart.x + baseWidth, baseStart.y)
    ctx.lineTo(peak.x, peak.y)
    ctx.stroke()

    // Optional: Draw a line down the middle to represent the tent opening
    ctx.beginPath()
    ctx.moveTo(peak.x, peak.y)
    ctx.lineTo(point.x, baseStart.y)
    ctx.stroke()
  },
  polygon: (params: DrawPolygonParams) => {
    const { direction, path, points } = params
    const reverse = points.slice().reverse()
    const areaO = d3.geoArea(turf.polygon([points]))
    const areaR = d3.geoArea(turf.polygon([reverse]))
    const outer = areaO > areaR
    const inside = outer ? reverse : points
    const outside = outer ? points : reverse
    const poly = turf.polygon([direction === 'inner' ? inside : outside])
    const p = new Path2D(path(poly))
    return p
  },
  path: {
    curveClosed: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRomClosed.alpha(0.1), projection),
    curve: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRom.alpha(0.1), projection, false),
    basis: (projection: d3.GeoProjection) => geoCurvePath(d3.curveBasis, projection, false),
    linear: (projection: d3.GeoProjection) => d3.geoPath(projection)
  },
  patterns: {
    stripes: ({ ctx, scale, color, width = 1, spacing = 0 }: StripePatternParams) => {
      const color1 = 'transparent'
      const color2 = color
      const thickness = width * scale
      const space = spacing * scale
      const canvas = document.createElement('canvas')
      canvas.width = ctx.canvas.height * 1.5
      canvas.height = ctx.canvas.height * 1.5
      const tempCtx = canvas.getContext('2d')
      const totalThickness = thickness + space // Total thickness includes stripe thickness and spacing
      const numberOfStripes = Math.ceil(tempCtx.canvas.height / totalThickness)
      tempCtx.lineWidth = thickness * 0.75
      tempCtx.lineCap = 'round'

      for (let i = 0; i < numberOfStripes * 2; i++) {
        tempCtx.beginPath()
        tempCtx.strokeStyle = i % 2 ? color1 : color2
        const x = i * totalThickness + thickness / 2
        const path = new Path2D(`M${x - tempCtx.canvas.height} 0 L${x} ${tempCtx.canvas.height} Z`)
        tempCtx.stroke(path)
      }
      return canvas
    },
    masked: ({ ctx, mask, color }: StripeMaskedPatternParams) => {
      const offscreen = document.createElement('canvas')
      offscreen.width = mask.width
      offscreen.height = mask.height
      const oCtx = offscreen.getContext('2d')
      oCtx.fillStyle = color
      oCtx.fillRect(0, 0, mask.width, mask.height)
      oCtx.globalCompositeOperation = 'destination-in'
      const pattern = oCtx.createPattern(mask, 'repeat')
      oCtx.fillStyle = pattern
      oCtx.fillRect(0, 0, mask.width, mask.height)
      ctx.globalCompositeOperation = 'source-over'
      return offscreen
    }
  },
  projection: {
    build: (ctx: CanvasRenderingContext2D) => MAP_SHAPES.projection.orthographic(ctx),
    mercator: (ctx: CanvasRenderingContext2D) =>
      d3
        .geoMercator()
        .scale(MAP_SHAPES.scale.init)
        .translate([ctx.canvas.width / 2, ctx.canvas.height / 2]),
    orthographic: (ctx: CanvasRenderingContext2D) =>
      d3
        .geoOrthographic()
        .scale(MAP_SHAPES.scale.init)
        .translate([ctx.canvas.width / 2, ctx.canvas.height / 2]),
    equirectangular: (ctx: CanvasRenderingContext2D) =>
      d3
        .geoEquirectangular()
        .scale(MAP_SHAPES.scale.init)
        .translate([ctx.canvas.width / 2, ctx.canvas.height / 2])
  },
  scale: {
    init: 200,
    derived: (projection: d3.GeoProjection) => projection.scale() / MAP_SHAPES.scale.init
  },
  styles: [
    'Nations',
    'Cultures',
    'Religion',
    'Government',
    'Population',
    'Development',
    'Resources',
    'Climate',
    'Vegetation',
    'Topography',
    'Temperature',
    'Rain',
    'Timezones'
  ] as const
}
