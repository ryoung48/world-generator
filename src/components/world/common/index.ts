import * as d3 from 'd3'

import { MATH } from '../../../models/utilities/math'
import { Point } from '../../../models/utilities/math/points/types'
import { Vertex } from '../../../models/utilities/math/voronoi/types'
import { CircleParams, DrawPolygonParams } from './types'

const rain = [0, 10, 25, 50, 100, 150, 200, 250].reverse()
const elevation = [0, 300, 600, 1200, 2000, 3000, 4000, 6000, 9000, 12000, 16000, 20000, 26000].map(
  MATH.conversion.distance.feet.km
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

const metric = false

export const MAP = {
  height: 800,
  width: 800,
  breakpoints: {
    regional: 25,
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
            coordinates: points.map(p => [...p])
          }
        } as unknown as d3.ExtendedFeature
      ])
  },
  metrics: {
    metric,
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
     * agrarian - settled, agriculture-based communities without extensive urbanization
     * feudal - societies organized around land-based hierarchies and serfdom
     * mercantile - societies with significant trade networks, both domestic and international
     * colonial - nations that establish and maintain colonies in foreign territories
     * enlightened - philosophical advancements, particularly in governance and human rights
     * industrial - mechanized production, growth of factories, and rapid urbanization
     */
    development: {
      scale: d3.scaleLinear([0, 6], [0, 1]),
      color: (d: number) => d3.interpolateReds(d),
      format: (d: number) =>
        d === 0
          ? 'nomadic'
          : d === 1
          ? 'agrarian'
          : d === 2
          ? 'feudal'
          : d === 3
          ? 'mercantile'
          : d === 4
          ? 'colonial'
          : d === 5
          ? 'enlightened'
          : 'industrial',
      legend: () =>
        [0, 1, 2, 3, 4, 5, 6].reverse().map(d => ({
          color: MAP.metrics.development.color(MAP.metrics.development.scale(d)),
          text: MAP.metrics.development.format(d)
        }))
    },
    population: {
      scale: d3.scaleLinear([0, 25], [0, 1]),
      color: (popMi: number) => d3.interpolateBuPu(MAP.metrics.population.scale(popMi)),
      value: (popMi: number) => (metric ? MATH.conversion.population.mi.km(popMi) : popMi),
      format: (popMi: number) =>
        `${MAP.metrics.population.value(popMi).toFixed(0)} ${MAP.metrics.population.units()}`,
      legend: () =>
        [0, 5, 10, 15, 20, 25].map(r => ({
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
        [-30, -24, -18, -12, -5, 0, 5, 12, 18, 24, 30].map(heat => ({
          color: MAP.metrics.temperature.color(heat),
          text: MAP.metrics.temperature.format(heat)
        })),
      units: () => (metric ? '°C' : '°F')
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
  climates: ['Holdridge', 'Koppen'] as const,
  styles: [
    'Nations',
    'Cultures',
    'Population',
    'Elevation',
    'Temperature',
    'Rain',
    'Climate'
  ] as const
}
