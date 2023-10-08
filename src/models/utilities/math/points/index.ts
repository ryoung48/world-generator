import { geoInterpolate } from 'd3'

import { MATH } from '..'
import { dayMS } from '../time'
import { Directions, Point } from './types'

export const POINT = {
  degrees: (ref: Point, origin: Point) => {
    const rads = Math.atan2(origin.y - ref.y, origin.x - ref.x)
    return MATH.degrees(rads < 0 ? Math.abs(rads) : 2 * Math.PI - rads)
  },
  direction: (p1: Point, p2: Point): Directions => {
    const deg = POINT.degrees(p1, p2)
    if (deg > 45 && deg <= 135) return 'N'
    else if (deg > 135 && deg <= 225) return 'W'
    else if (deg > 225 && deg <= 315) return 'S'
    return 'E'
  },
  directionH: (p1: Point, p2: Point): Directions => {
    const deg = POINT.degrees(p1, p2)
    if (deg > 120 && deg <= 240) return 'W'
    else if (deg <= 60 || deg > 300) return 'E'
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

// @ts-ignore
window.dist = POINT.distance