import * as d3 from 'd3'

import { CLIMATE } from '../../../models/cells/climate'
import { Climate, ClimateKey } from '../../../models/cells/climate/types'
import { MATH } from '../../../models/utilities/math'
import { Point } from '../../../models/utilities/math/points/types'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { TEXT } from '../../../models/utilities/text'
import type { DrawLegendParams } from '../embellishments/types'
import {
  CircleParams,
  CrossParams,
  DrawFeaturesParams,
  DrawPolygonParams,
  SettlementParams
} from './types'

const rain = [0, 10, 25, 50, 100, 150, 200, 250].reverse()
const elevation = [0, 300, 600, 1200, 2000, 3000, 4000, 6000, 9000, 12000, 16000, 20000, 26000].map(
  MATH.conversion.distance.feet.km
)

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

const metric = false

export const MAP = {
  height: 800,
  width: 1600,
  breakpoints: {
    regional: 25,
    global: 7
  },
  clouds: {
    realtime: 'https://clouds.matteason.co.uk/images/8192x4096/clouds.jpg',
    heavy: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg',
    fair: 'https://shadedrelief.com/natural3/ne3_data/8192/clouds/fair_clouds_8k.jpg'
  },
  circle: (params: CircleParams) => {
    const { ctx, point, radius, fill, border } = params
    const width = border?.width ?? 0
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = border?.color ?? 'black'
    ctx.fillStyle = fill
    ctx.fill()
    if (width > 0) ctx.stroke()
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
    const len = scale * 0.15
    // Define the main structure dimensions
    const mainWidth = len
    const mainHeight = len * 0.75 // Main structure height as a fraction of length for visual balance

    // Calculate the starting point of the main structure to center the fortress around the point
    const mainStart: Point = {
      x: point.x - mainWidth / 2,
      y: point.y - mainHeight / 2
    }

    // Draw the main structure
    ctx.beginPath()
    ctx.rect(mainStart.x, mainStart.y, mainWidth, mainHeight)
    ctx.stroke()

    // Define tower dimensions relative to the main structure
    const towerWidth = len * 0.2 // Tower width as a fraction of the total length for visual balance
    const towerHeight = len * 0.3 // Tower height as a fraction of the total length for visual balance

    // Tower positions based on the main structure's position
    const towers: Point[] = [
      { x: mainStart.x - towerWidth / 2, y: mainStart.y - towerHeight / 2 }, // Top-left tower
      { x: mainStart.x + mainWidth - towerWidth / 2, y: mainStart.y - towerHeight / 2 }, // Top-right tower
      { x: mainStart.x - towerWidth / 2, y: mainStart.y + mainHeight - towerHeight / 2 }, // Bottom-left tower
      { x: mainStart.x + mainWidth - towerWidth / 2, y: mainStart.y + mainHeight - towerHeight / 2 } // Bottom-right tower
    ]

    // Draw the towers
    towers.forEach(tower => {
      ctx.beginPath()
      ctx.rect(tower.x, tower.y, towerWidth, towerHeight)
      ctx.stroke()
    })
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
    const params = { radius: (urban ? 0.25 : 0.18) * scale, fill, border }
    if (metropolis) {
      MAP.circle({
        ctx,
        point,
        ...params,
        radius: params.radius + 0.08 * scale
      })
    }
    MAP.circle({
      ctx,
      point,
      ...params,
      fill: metropolis ? 'black' : fill
    })
    if (population > 10e3) {
      MAP.cross({
        ctx,
        point,
        radius: params.radius,
        color: params.border.color,
        width: params.border.width
      })
    }
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
  geojson: {
    features: (features: d3.ExtendedFeature[]) => {
      return {
        type: 'FeatureCollection',
        features
      } as unknown as d3.GeoPermissibleObjects
    },
    point: (point: Point) =>
      ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.x, point.y]
        }
      } as unknown as d3.ExtendedFeature),
    polygon: (points: Vertex[]) =>
      MAP.geojson.features([
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [points]
          }
        } as unknown as d3.ExtendedFeature
      ]),
    multiline: (points: Vertex[][]) =>
      MAP.geojson.features([
        {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: points
          }
        } as unknown as d3.ExtendedFeature
      ]),
    line: (points: Vertex[]) =>
      MAP.geojson.features([
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: points
          }
        } as unknown as d3.ExtendedFeature
      ])
  },
  metrics: {
    metric,
    climate: {
      legend: (latitude: Climate['latitude']) => {
        const climates: ClimateKey[] =
          latitude === 'polar'
            ? ['desert (polar)']
            : latitude === 'subpolar'
            ? [
                'rain tundra (subpolar)',
                'wet tundra (subpolar)',
                'moist tundra (subpolar)',
                'dry tundra (subpolar)'
              ]
            : latitude === 'boreal'
            ? [
                'rain forest (boreal)',
                'wet forest (boreal)',
                'moist forest (boreal)',
                'dry scrub (boreal)',
                'desert (boreal)'
              ]
            : latitude === 'cool temperate'
            ? [
                'rain forest (cool temperate)',
                'wet forest (cool temperate)',
                'moist forest (cool temperate)',
                'steppe (cool temperate)',
                'desert scrub (cool temperate)',
                'desert (cool temperate)'
              ]
            : latitude === 'warm temperate'
            ? [
                'rain forest (warm temperate)',
                'wet forest (warm temperate)',
                'moist forest (warm temperate)',
                'dry forest (warm temperate)',
                'thorn steppe (warm temperate)',
                'desert scrub (warm temperate)',
                'desert (warm temperate)'
              ]
            : latitude === 'subtropical'
            ? [
                'rain forest (subtropical)',
                'wet forest (subtropical)',
                'moist forest (subtropical)',
                'dry forest (subtropical)',
                'thorn steppe (subtropical)',
                'desert scrub (subtropical)',
                'desert (subtropical)'
              ]
            : [
                'rain forest (tropical)',
                'wet forest (tropical)',
                'moist forest (tropical)',
                'dry forest (tropical)',
                'very dry forest (tropical)',
                'thorn woodland (tropical)',
                'desert scrub (tropical)',
                'desert (tropical)'
              ]
        return [
          { text: TEXT.titleCase(latitude) },
          ...climates.map(climate => {
            const details = CLIMATE.holdridge[climate]
            return {
              color: details.color,
              text: details.name
            }
          })
        ]
      }
    },
    elevation: {
      color: d3.scaleLinear(elevation, [
        '#A6BF97',
        '#8AAB78',
        '#B0B784',
        '#D6D2AD',
        '#D1C99B',
        '#C0AA79',
        '#937B57',
        '#736248',
        '#867764',
        '#B3AA99',
        '#CCC4B7',
        '#ECE9E2',
        '#F4F3EF'
      ]),
      format: (km: number, p = 2) =>
        metric ? `${km.toFixed(p)} km` : `${MATH.conversion.distance.km.miles(km).toFixed(p)} mi`,
      legend: () =>
        [...elevation].reverse().map(r => ({
          color: MAP.metrics.elevation.color(r),
          text: MAP.metrics.elevation.format(r)
        }))
    },
    /**
     * nomadic - small, often nomadic groups with limited permanent infrastructure
     * tribal - settled, agriculture-based communities without extensive urbanization
     * feudal - societies organized around land-based hierarchies and serfdom
     * mercantile - societies with significant trade networks, both domestic and international
     * colonial - nations that establish and maintain colonies in foreign territories
     * enlightened - philosophical advancements, particularly in governance and human rights
     * industrial - mechanized production, growth of factories, and rapid urbanization
     */
    development: {
      scale: d3.scaleLinear([0, 6], [0, 1]),
      color: (d: number) => d3.interpolateGreens(d),
      format: (d: number) =>
        d === 0
          ? 'primitive'
          : d === 1
          ? 'traditional'
          : d === 2
          ? 'emerging'
          : d === 3
          ? 'developing'
          : d === 4
          ? 'established'
          : d === 5
          ? 'progressive'
          : 'enlightened',
      legend: () =>
        [0, 1, 2, 3, 4, 5, 6].reverse().map(d => ({
          color: MAP.metrics.development.color(MAP.metrics.development.scale(d)),
          text: MAP.metrics.development.format(d)
        }))
    },
    population: {
      scale: d3.scaleLinear([0, 45], [0, 1]),
      color: (popMi: number) => d3.interpolateBuPu(MAP.metrics.population.scale(popMi)),
      value: (popMi: number) => (metric ? MATH.conversion.population.mi.km(popMi) : popMi),
      format: (popMi: number) =>
        `${MAP.metrics.population.value(popMi).toFixed(0)} ${MAP.metrics.population.units()}`,
      legend: () =>
        [0, 5, 10, 15, 20, 25, 30, 35, 40, 45].reverse().map(r => ({
          color: MAP.metrics.population.color(r),
          text: MAP.metrics.population.format(r)
        })),
      units: () => `persons/${metric ? 'km²' : 'mi²'}`
    },
    rain: {
      rain,
      scale: d3.scaleLinear(rain, MATH.scaleDiscrete(rain.length)),
      color: (r: number) => d3.interpolateViridis(MAP.metrics.rain.scale(r)),
      value: (mm: number) => (metric ? mm : MATH.conversion.height.mm.in(mm)),
      format: (mm: number) =>
        `${MAP.metrics.rain.value(mm).toFixed(1)} ${MAP.metrics.rain.units()}`,
      legend: () =>
        rain.map(r => ({
          color: MAP.metrics.rain.color(r),
          text: MAP.metrics.rain.format(r)
        })),
      units: () => (metric ? 'mm' : 'in')
    },
    religion: {
      colors: {
        atheistic: '#D3D3D3',
        nontheistic: '#FFFACD',
        monotheistic: '#B0C4DE',
        dualistic: '#ADD8E6',
        polytheistic: '#FFDAB9',
        'ancestor worship': '#E6E6FA',
        animistic: '#98FB98'
      },
      legend: () =>
        Object.entries(MAP.metrics.religion.colors).map(([k, v]) => ({
          color: v,
          text: k
        }))
    },
    settlement: {
      legend: (): DrawLegendParams['items'] => [
        { text: 'Points of Interest' },
        {
          text: 'metropolis',
          shape: ({ ctx, point, scale }) => MAP.settlement({ ctx, point, scale, population: 250e3 })
        },
        {
          text: 'city',
          shape: ({ ctx, point, scale }) => MAP.settlement({ ctx, point, scale, population: 25e3 })
        },
        {
          text: 'town',
          shape: ({ ctx, point, scale }) => MAP.settlement({ ctx, point, scale, population: 5e3 })
        },
        {
          text: 'rural area',
          shape: ({ ctx, point, scale }) => MAP.rural({ ctx, point, scale: scale * 2 })
        },
        {
          text: 'temporary camp',
          shape: ({ ctx, point, scale }) => MAP.camp({ ctx, point, scale: scale * 2 })
        },
        {
          text: 'military outpost',
          shape: ({ ctx, point, scale }) => MAP.fort({ ctx, point, scale: scale * 2 })
        },
        {
          text: 'ruin',
          shape: ({ ctx, point, scale }) => MAP.ruins({ ctx, point, scale: scale * 2 })
        },
        {
          text: 'wilderness',
          shape: ({ ctx, point, scale }) => MAP.wilderness({ ctx, point, scale: scale * 2 })
        }
      ]
    },
    temperature: {
      scale: d3.scaleLinear([-35, 30], [1, 0]),
      color: (heat: number) => d3.interpolateSpectral(MAP.metrics.temperature.scale(heat)),
      value: (celsius: number) =>
        metric ? celsius : MATH.conversion.temperature.celsius.fahrenheit(celsius),
      format: (celsius: number) =>
        `${MAP.metrics.temperature.value(celsius).toFixed(0)}° ${MAP.metrics.temperature
          .units()
          .replace('°', '')}`,
      legend: () =>
        [-30, -24, -18, -12, -5, 0, 5, 12, 18, 24, 30].reverse().map(heat => ({
          color: MAP.metrics.temperature.color(heat),
          text: MAP.metrics.temperature.format(heat)
        })),
      units: () => (metric ? '°C' : '°F')
    },
    difficulty: {
      scale: d3.scaleLinear([0, 9], [0, 1]),
      color: (difficulty: number) =>
        d3.interpolateRgbBasis([
          '#FFFFFF',
          '#7AD7F0',
          '#A2E8A4',
          '#FFFDA1',
          '#FFC266',
          '#FF6B6B',
          '#C774E8',
          '#5E548E',
          '#34314C'
        ])(MAP.metrics.difficulty.scale(difficulty)),
      legend: () => [
        ...[
          'safe',
          'mild',
          'low',
          'moderate',
          'medium',
          'hazardous',
          'high',
          'severe',
          'extreme',
          'lethal'
        ].map((d, i) => ({
          color: MAP.metrics.difficulty.color(i),
          text: d
        }))
      ]
    }
  },
  polygon: (params: DrawPolygonParams) => {
    const { direction, path, points } = params
    const reverse = points.slice().reverse()
    const areaO = d3.geoArea(MAP.geojson.polygon(points))
    const areaR = d3.geoArea(MAP.geojson.polygon(reverse))
    const outer = areaO > areaR
    const inside = outer ? reverse : points
    const outside = outer ? points : reverse
    const poly = MAP.geojson.polygon(direction === 'inner' ? inside : outside)
    return new Path2D(path(poly))
  },
  path: {
    curveClosed: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRomClosed.alpha(0.1), projection),
    curve: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRom.alpha(0.1), projection, false),
    linear: (projection: d3.GeoProjection) => d3.geoPath(projection)
  },
  scale: {
    init: 200,
    derived: (projection: d3.GeoProjection) => projection.scale() / MAP.scale.init
  },
  styles: [
    'Nations',
    'Cultures',
    'Religions',
    'Development',
    'Population',
    'Elevation',
    'Temperature',
    'Rain',
    'Climate'
  ] as const
}
