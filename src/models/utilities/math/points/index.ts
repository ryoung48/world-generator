import { geoInterpolate } from 'd3'

import { MATH } from '..'
import { dayMS } from '../time'
import { Directions, Point } from './types'

export const POINT = {
  bearing: (ref: Point, origin: Point) => {
    const lat1 = MATH.radians(ref.y)
    const lon1 = MATH.radians(ref.x)
    const lat2 = MATH.radians(origin.y)
    const lon2 = MATH.radians(origin.x)
    const deltaLon = lon2 - lon1
    const bearing = Math.atan2(
      Math.sin(deltaLon) * Math.cos(lat2),
      Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon)
    )
    return (MATH.degrees(bearing) + 360) % 360
  },
  direction: (p1: Point, p2: Point): Directions => {
    const deg = POINT.bearing(p1, p2)
    if (deg > 45 && deg <= 135) return 'E'
    else if (deg > 135 && deg <= 225) return 'S'
    else if (deg > 225 && deg <= 315) return 'W'
    return 'N'
  },
  directionH: (p1: Point, p2: Point): Directions => {
    const deg = POINT.bearing(p1, p2)
    if (deg > 210 && deg <= 330) return 'W'
    else if (deg <= 150 && deg > 30) return 'E'
    return null
  },
  distance: (params: { points: [Point, Point] }) => {
    const { points } = params
    const [p1, p2] = points
    return MATH.distance([p1.x, p1.y], [p2.x, p2.y])
  },
  isOnEdge: (params: { points: [Point, Point]; distance: number }) => {
    const { points, distance } = params
    const [p1, p2] = points

    // The geoInterpolate function expects points as [longitude, latitude]
    const interpolate = geoInterpolate([p1.x, p1.y], [p2.x, p2.y])
    const [interpolatedLongitude, interpolatedLatitude] = interpolate(distance)

    return { x: interpolatedLongitude, y: interpolatedLatitude }
  },
  sameEdge: (e1: number[], e2: number[]) => {
    return e1[0] === e2[0] && e1[1] === e2[1]
  },
  travel: (params: { src: Point; dst: Point; mpd?: number }) => {
    const { src, dst, mpd = 24 } = params
    const miles = POINT.distance({ points: [src, dst] })
    return { miles, duration: (miles / mpd) * dayMS }
  }
}
