import * as d3 from 'd3'

import { MATH } from '../../../models/utilities/math'
import { Point } from '../../../models/utilities/math/points/types'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { CircleParams, DrawPolygonParams } from './types'

const rain = [0, 10, 25, 50, 100, 200, 400, 800].reverse()
const elevation = [0, 300, 600, 1200, 2000, 3000, 4000, 6000, 9000, 12000, 16000, 20000, 26000].map(
  MATH.ftToKm
)

/**
 * Creates a strongly typed curve context object.
 * @param curve The curve object.
 * @returns The curve context object.
 */
function curveContext(curve: d3.CurveGenerator) {
  return {
    moveTo(x: number, y: number): void {
      curve.lineStart()
      curve.point(x, y)
    },
    lineTo(x: number, y: number): void {
      curve.point(x, y)
    },
    closePath(): void {
      curve.lineEnd()
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
  projection: d3.GeoProjection
) {
  return (object: d3.GeoPermissibleObjects) => {
    const pathContext = d3.path()
    const geoContext = curveContext(curve(pathContext)) as d3.GeoContext
    d3.geoPath(projection, geoContext)(object)
    return pathContext.toString()
  }
}

export const MAP = {
  height: 800,
  width: 800,
  breakpoints: {
    regional: 30,
    global: 7
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
      ])
  },
  metrics: {
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
      format: (r: number) => `${r.toFixed(2)} km`,
      legend: () =>
        [...elevation].reverse().map(r => ({
          color: MAP.metrics.elevation.color(r),
          text: MAP.metrics.elevation.format(r)
        }))
    },
    rain: {
      scale: d3.scaleLinear(rain, MATH.scaleDiscrete(rain.length)),
      color: (r: number) => d3.interpolateViridis(MAP.metrics.rain.scale(r)),
      format: (r: number) => `${r.toFixed(0)} mm`,
      legend: () =>
        rain.map(r => ({
          color: MAP.metrics.rain.color(r),
          text: MAP.metrics.rain.format(r)
        }))
    },
    temperature: {
      scale: d3.scaleLinear([-35, 30], [1, 0]),
      color: (heat: number) => d3.interpolateSpectral(MAP.metrics.temperature.scale(heat)),
      format: (heat: number) => `${heat.toFixed(0)}° c`,
      legend: () =>
        [-30, -24, -12, -5, 0, 5, 12, 18, 24, 30].map(heat => ({
          color: MAP.metrics.temperature.color(heat),
          text: MAP.metrics.temperature.format(heat)
        }))
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
    return new Path2D(path(MAP.geojson.polygon(direction === 'inner' ? inside : outside)))
  },
  path: {
    curveClosed: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRomClosed.alpha(0.1), projection),
    curve: (projection: d3.GeoProjection) =>
      geoCurvePath(d3.curveCatmullRom.alpha(0.1), projection),
    linear: (projection: d3.GeoProjection) => d3.geoPath(projection)
  },
  scale: {
    init: 200,
    derived: (projection: d3.GeoProjection) => projection.scale() / MAP.scale.init
  },
  seasons: ['Summer', 'Winter'] as const,
  styles: [
    'Nations',
    'Cultures',
    'Religions',
    'Elevation',
    'Temperature',
    'Rain',
    'Climate'
  ] as const
}
