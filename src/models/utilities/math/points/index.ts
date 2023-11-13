import { geoInterpolate } from 'd3'

import { MATH } from '..'
import { dayMS } from '../time'
import { Directions, Point } from './types'

export const POINT = {
  bearing: {
    geo: (ref: Point, origin: Point) => {
      const lat1 = MATH.conversion.angles.radians(ref.y)
      const lon1 = MATH.conversion.angles.radians(ref.x)
      const lat2 = MATH.conversion.angles.radians(origin.y)
      const lon2 = MATH.conversion.angles.radians(origin.x)
      const deltaLon = lon2 - lon1
      const bearing = Math.atan2(
        Math.sin(deltaLon) * Math.cos(lat2),
        Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon)
      )
      return (MATH.conversion.angles.degrees(bearing) + 360) % 360
    },
    planar: (ref: Point, origin: Point) => {
      const rads = Math.atan2(origin.y - ref.y, origin.x - ref.x)
      return MATH.conversion.angles.degrees(rads < 0 ? Math.abs(rads) : 2 * Math.PI - rads)
    }
  },
  direction: {
    geo: (p1: Point, p2: Point): Directions => {
      const deg = POINT.bearing.geo(p1, p2)
      if (deg > 45 && deg <= 135) return 'E'
      else if (deg > 135 && deg <= 225) return 'S'
      else if (deg > 225 && deg <= 315) return 'W'
      return 'N'
    },
    planar: (p1: Point, p2: Point) => {
      const deg = POINT.bearing.planar(p1, p2)
      if (deg > 45 && deg <= 135) return 'N'
      else if (deg > 135 && deg <= 225) return 'W'
      else if (deg > 225 && deg <= 315) return 'S'
      return 'E'
    }
  },
  distance: {
    euclidean: (params: { points: [Point, Point] }) => {
      const { points } = params
      const [p1, p2] = points
      return MATH.distance.euclidean([p1.x, p1.y], [p2.x, p2.y])
    },
    geo: (params: { points: [Point, Point] }) => {
      const { points } = params
      const [p1, p2] = points
      return MATH.distance.geo([p1.x, p1.y], [p2.x, p2.y])
    }
  },
  isOnEdge: {
    geo: (params: { points: [Point, Point]; distance: number }) => {
      const { points, distance } = params
      const [p1, p2] = points

      // The geoInterpolate function expects points as [longitude, latitude]
      const interpolate = geoInterpolate([p1.x, p1.y], [p2.x, p2.y])
      const [interpolatedLongitude, interpolatedLatitude] = interpolate(distance)

      return { x: interpolatedLongitude, y: interpolatedLatitude }
    },
    planar: (params: { points: [Point, Point]; distance: number }) => {
      const { points, distance } = params
      const [p1, p2] = points
      const remainder = 1 - distance
      return { x: p1.x * distance + p2.x * remainder, y: p1.y * distance + p2.y * remainder }
    }
  },
  sameEdge: (e1: number[], e2: number[]) => {
    return e1[0] === e2[0] && e1[1] === e2[1]
  },
  travel: (params: { src: Point; dst: Point; mpd?: number }) => {
    const { src, dst, mpd = 24 } = params
    const miles = POINT.distance.geo({ points: [src, dst] })
    return { miles, duration: (miles / mpd) * dayMS }
  }
}
