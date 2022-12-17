import { Delaunay } from 'd3-delaunay'
import { polygonCentroid } from 'd3-polygon'

import { degrees, distance } from '.'
import { dayMS } from './time'

export type Directions = 'N' | 'S' | 'E' | 'W'

export const direction__opposite: Record<Directions, Directions> = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
}

export const direction__random = () => window.dice.choice<Directions>(['N', 'S', 'E', 'W'])

export interface Point {
  x: number
  y: number
}

type Vertex = [number, number]

export const point__isOnEdge = (params: { points: [Point, Point]; distance: number }) => {
  const { points, distance } = params
  const [p1, p2] = points
  const remainder = 1 - distance
  return { x: p1.x * distance + p2.x * remainder, y: p1.y * distance + p2.y * remainder }
}

export const point__degrees = (p1: Point, p2: Point) => {
  const rads = Math.atan2(p2.y - p1.y, p2.x - p1.x)
  return degrees(rads < 0 ? Math.abs(rads) : 2 * Math.PI - rads)
}

export const point__direction = (p1: Point, p2: Point): Directions => {
  const deg = point__degrees(p1, p2)
  if (deg > 45 && deg <= 135) return 'N'
  else if (deg > 135 && deg <= 225) return 'W'
  else if (deg > 225 && deg <= 315) return 'S'
  return 'E'
}

export const point__distance = (params: { points: [Point, Point]; scale?: [number, number] }) => {
  const { points, scale } = params
  const [p1, p2] = points
  const { x: x1, y: y1 } = p1
  const { x: x2, y: y2 } = p2
  return distance([x1, y1], [x2, y2], scale)
}

export const point__travel = (params: {
  src: Point
  dst: Point
  scale?: [number, number]
  mpd?: number
}) => {
  const { sw, sh } = window.world.dim
  const { src, dst, scale = [sw, sh], mpd = 24 } = params
  const miles = point__distance({ points: [src, dst], scale })
  return { miles, duration: (miles / mpd) * dayMS }
}

interface VoronoiParams {
  points: [number, number][]
  w: number
  h: number
}

const voronoi = ({ points, w, h }: VoronoiParams) => {
  const delaunay = Delaunay.from(points)
  return delaunay.voronoi([0, 0, w, h])
}

interface RelaxedVoronoiParams extends VoronoiParams {
  relaxation?: number
}

export const voronoi__relaxed = ({ points, relaxation = 1, w, h }: RelaxedVoronoiParams) => {
  // create voronoi object clipped by the image width & height
  let vor = voronoi({ points, w, h })
  let count = 0
  // perform loyd relaxation to smooth voronoi cells
  while (count++ < relaxation) {
    const relaxedSites = Array.from(vor.cellPolygons()).map(poly =>
      polygonCentroid(poly.map(([x, y]) => [x, y]))
    )
    vor = voronoi({ points: relaxedSites, w, h })
  }
  return vor
}

export const voronoi__commonEdge = (i: Vertex[], j: Vertex[]): Vertex[] => {
  const cellI = new Set(i.map(String))
  const edge = Array.from(new Set(j.map(String)))
    .filter(p => cellI.has(p))
    .map(p => JSON.parse(`[${p}]`) as [number, number])
  return edge
}

export const edge__sameEdge = (e1: number[], e2: number[]) => {
  return e1[0] === e2[0] && e1[1] === e2[1]
}

export const voronoi__vertexLine = () => (edges: Vertex[][]) => {
  const line = edges.shift()
  while (edges.length > 0) {
    const s1 = line[0]
    const e2 = line[line.length - 1]
    let placed = false
    edges.forEach((edge, i) => {
      const start = edge__sameEdge(s1, edge[1])
        ? edge[0]
        : edge__sameEdge(s1, edge[0])
        ? edge[1]
        : undefined
      const end = edge__sameEdge(e2, edge[1])
        ? edge[0]
        : edge__sameEdge(e2, edge[0])
        ? edge[1]
        : undefined
      if (start) {
        edges.splice(i, 1)
        line.unshift(start)
        placed = true
      } else if (end) {
        edges.splice(i, 1)
        line.push(end)
        placed = true
      }
    })
    if (!placed) break
  }
  return line
}
