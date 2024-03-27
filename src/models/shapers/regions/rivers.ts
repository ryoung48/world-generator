import { geoInterpolate } from 'd3'

import { CELL } from '../../cells'
import { ClimateKey } from '../../cells/climate/types'
import { Cell } from '../../cells/types'
import { MATH } from '../../utilities/math'
import { POINT } from '../../utilities/math/points'
import { Point } from '../../utilities/math/points/types'
import { Vertex } from '../../utilities/math/voronoi/types'

const riverBlackList = new Set<ClimateKey>([
  'desert (polar)',
  'dry tundra (subpolar)',
  'desert (boreal)',
  'desert (cool temperate)',
  'desert (warm temperate)',
  'desert (subtropical)',
  'desert (tropical)'
])

function doesCrossAntimeridian(start: Vertex, end: Vertex): boolean {
  // Normalize longitudes to be within the range [-180, 180]
  const normalizedStartLon = ((((start[0] + 180) % 360) + 360) % 360) - 180
  const normalizedEndLon = ((((end[0] + 180) % 360) + 360) % 360) - 180

  // Calculate the absolute difference in longitude
  const lonDifference = Math.abs(normalizedEndLon - normalizedStartLon)

  // The segment crosses the antimeridian if the difference is greater than 180
  return lonDifference > 180
}

function isDeviationAcceptable(
  lastPoint: Point,
  newPoint: Point,
  penultimatePoint: Point,
  threshold: number = 45
): boolean {
  const bearingLastToNew = POINT.bearing.geo(lastPoint, newPoint)
  const bearingPenultimateToLast = POINT.bearing.geo(penultimatePoint, lastPoint)

  const deviation = Math.abs(bearingLastToNew - bearingPenultimateToLast)
  // Adjust deviation for angles that cross over the 360=>0 boundary
  const adjustedDeviation = Math.min(deviation, 360 - deviation)

  return adjustedDeviation <= threshold
}

function calculateOrthogonalDeviation(
  start: Vertex,
  end: Vertex,
  fraction: number,
  deviationKm: number
): Vertex {
  // Spherical interpolation for the midpoint
  const interpolator = geoInterpolate(start, end)
  const midpointRad = interpolator(fraction).map(MATH.conversion.angles.radians)

  // Radius of the Earth in kilometers
  const R = MATH.conversion.distance.miles.km(window.world.radius)

  // Calculate the bearing from start to end
  const bearing = POINT.bearing.geo({ x: start[0], y: start[1] }, { x: end[0], y: end[1] })

  // Calculate orthogonal bearing
  const orthogonalBearing = MATH.conversion.angles.radians((bearing + 90) % 360)

  // Calculate new point with deviation back to degrees
  const lat1 = midpointRad[1]
  const lon1 = midpointRad[0]
  const lat2 = MATH.conversion.angles.degrees(
    Math.asin(
      Math.sin(lat1) * Math.cos(deviationKm / R) +
        Math.cos(lat1) * Math.sin(deviationKm / R) * Math.cos(orthogonalBearing)
    )
  )
  const lon2 = MATH.conversion.angles.degrees(
    lon1 +
      Math.atan2(
        Math.sin(orthogonalBearing) * Math.sin(deviationKm / R) * Math.cos(lat1),
        Math.cos(deviationKm / R) - Math.sin(lat1) * Math.sin(lat2)
      )
  )

  // Convert back to degrees
  return [lon2, lat2]
}

function addMeanderingPoints(start: Vertex, end: Vertex): Vertex[] {
  const deviationKm = 5
  // Calculate deviations for the "left" and "right" points
  const leftDeviation = calculateOrthogonalDeviation(start, end, 0.33, deviationKm)
  const rightDeviation = calculateOrthogonalDeviation(start, end, 0.66, -deviationKm)

  // Return the new segment with meandering points
  return [start, leftDeviation, rightDeviation, end]
}

export const RIVER = {
  riverBlackList,
  spawn: {
    upstream: (src: Cell) => {
      const idx = window.world.rivers.length
      src.river = idx
      const river = [src.idx]
      const visited = new Set(river)
      let flowing = true
      let earlyExit = false
      while (flowing && !earlyExit) {
        const curr = window.world.cells[river[river.length - 1]]
        const prev = window.world.cells[river?.[river.length - 2]]
        const loose = CELL.neighbors(curr).filter(
          n =>
            n.oceanDist >= curr.oceanDist &&
            !visited.has(n.idx) &&
            !n.isCoast &&
            !n.isMountains &&
            (!prev || isDeviationAcceptable(curr, n, prev))
        )
        const strict = loose.filter(n => n.oceanDist > curr.oceanDist)
        const prospects = strict.length > 0 ? strict : loose
        if (prospects.length === 0) {
          flowing = false
          break
        }
        const selected = window.dice.choice(prospects)
        if (
          selected.river !== undefined ||
          selected.climate === 'desert (polar)' ||
          CELL.neighbors(selected).some(n => n.river !== undefined && n.river !== idx) ||
          (selected.isWater && !selected.ocean)
        ) {
          earlyExit = true
        } else if (selected.isMountains || selected.isWater) {
          flowing = false
        } else {
          river.push(selected.idx)
          visited.add(selected.idx)
          selected.river = idx
          if (prev) prev.nRiver = selected.idx
        }
      }
      const end = window.world.cells[river[river.length - 1]]
      if (river.length > 2 && !earlyExit && !riverBlackList.has(end.climate)) {
        const segments = river.reverse().map(i => {
          const cell = window.world.cells[i]
          const hub = CELL.place(cell)
          return (hub && cell.beach ? [hub.x, hub.y] : [cell.x, cell.y]) as [number, number]
        })
        window.world.rivers.push({
          idx,
          segments: segments.slice(0, -1).map((_, i) => {
            const start = segments[i]
            const end = segments[i + 1]
            const antimeridian = doesCrossAntimeridian(start, end)
            return antimeridian ? [start, end] : addMeanderingPoints(start, end)
          })
        })
      } else {
        river.forEach(i => {
          window.world.cells[i].river = undefined
          window.world.cells[i].nRiver = undefined
        })
      }
    },
    downstream: (src: Cell) => {
      if (src.river !== undefined) return
      const idx = window.world.rivers.length
      src.river = idx
      const river = [src.idx]
      const visited = new Set(river)
      let flowing = true
      let branch = false
      let earlyExit = false
      while (flowing && !branch && !earlyExit) {
        const curr = window.world.cells[river[river.length - 1]]
        const prev = window.world.cells[river[river.length - 2]]
        const potential = CELL.neighbors(curr).filter(
          n =>
            !n.isMountains && !visited.has(n.idx) && (!prev || isDeviationAcceptable(curr, n, prev))
        )
        const strict = potential.filter(n => n.h < curr.h)
        const loose = potential.filter(n => n.h <= curr.h)
        const fallback = potential.filter(n => n.oceanDist <= curr.oceanDist)
        const prospects = strict.length > 0 ? strict : loose.length > 0 ? loose : fallback
        if (prospects.length === 0) {
          earlyExit = true
          break
        }
        const selected = prospects.reduce((min, p) => {
          return p.ocean || (p.beach && !min.ocean) || (p.river !== undefined && !min.ocean)
            ? p
            : min.h < p.h
            ? min
            : p
        }, prospects[0])
        if (selected.climate === 'desert (polar)' || (selected.isWater && !selected.ocean)) {
          earlyExit = true
          break
        } else if (selected.river !== undefined && selected.river !== idx) {
          const nRiver = window.world.cells[selected.nRiver]
          const validBranch = nRiver === undefined || isDeviationAcceptable(selected, curr, nRiver)
          if (validBranch) {
            branch = true
            river.push(selected.idx)
            if (nRiver) river.push(nRiver.idx)
            curr.nRiver = selected.idx
          } else {
            earlyExit = true
            break
          }
        } else if (selected.ocean) {
          flowing = false
        } else {
          river.push(selected.idx)
          visited.add(selected.idx)
          selected.river = idx
          curr.nRiver = selected.idx
        }
      }
      if (!earlyExit && river.length > 2) {
        const segments = river.map(i => {
          const cell = window.world.cells[i]
          const hub = CELL.place(cell)
          const coast = CELL.coastalEdge({ cell, distance: 0.5 })
          return (
            hub && cell.beach
              ? [hub.x, hub.y]
              : cell.beach && coast.length > 0
              ? [coast[0].x, coast[0].y]
              : [cell.x, cell.y]
          ) as [number, number]
        })
        const parsed = segments.slice(0, -1).map((_, i) => {
          const start = segments[i]
          const end = segments[i + 1]
          const antimeridian = doesCrossAntimeridian(start, end)
          return antimeridian ? [start, end] : addMeanderingPoints(start, end)
        })
        window.world.rivers.push({
          idx,
          segments: parsed
        })
      } else {
        river
          .filter(i => window.world.cells[i].river === idx)
          .forEach(i => {
            window.world.cells[i].river = undefined
            window.world.cells[i].nRiver = undefined
          })
      }
    }
  }
}
