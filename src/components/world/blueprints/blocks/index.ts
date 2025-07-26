import { polygonArea, polygonCentroid } from 'd3'
import { Delaunay, Voronoi } from 'd3-delaunay'

import { Dice } from '../../../../models/utilities/math/dice'
import { POINT } from '../../../../models/utilities/math/points'
import { Block, Structure } from './types'

const curve = (points: [number, number][]) => 'M' + points.join('L') + 'Z'

const sideLength = (side: [number, number][]) => {
  // get the first vertex
  const [s1X, s1Y] = side[0]
  // get the second vertex
  const [s2X, s2Y] = side[1]
  return Math.hypot(s1X - s2X, s1Y - s2Y)
}

export const BLOCK = {
  curve,
  spawn: (params: {
    idx: number
    point: [number, number]
    diagram: Voronoi<Delaunay.Point>
    dice: Dice
  }): Block => {
    const { idx, point, diagram, dice } = params
    const [x, y] = point
    const data = diagram.cellPolygon(idx)
    return {
      idx: params.idx,
      data,
      path: curve(data),
      x,
      y,
      n: Array.from(diagram.neighbors(idx)),
      area: Math.abs(polygonArea(data) / 30),
      chaos: dice.uniform(0, 0.3),
      structures: [],
      center: polygonCentroid(data),
      type: 'outskirts'
    }
  },
  subdivide: (params: { sides: [number, number][][]; chaos: number; dice: Dice }) => {
    const { sides, chaos, dice } = params
    // list of new polygons
    const blocks: Structure[] = []
    const { side: longestSide } = sides.slice(1).reduce(
      (long, side) => {
        const len = sideLength(side)
        return len > long.length ? { side, length: len } : long
      },
      {
        side: sides[0],
        length: sideLength(sides[0])
      }
    )
    // first vertex of longest edge
    const [x1, y1] = longestSide[0]
    // second vertex of longest edge
    const [x2, y2] = longestSide[1]
    // random offset from midpoint (creates less organized streets)
    const r = dice.uniform(0.5 - chaos, 0.5 + chaos)
    // compute (semi-) midpoint delta with offset
    const [dx, dy] = [(x2 - x1) * r, (y2 - y1) * r]
    // find the 'midpoints'
    const [mx, my] = [x1 + dx, y1 + dy]
    // get the slope of the two vertices
    const slope = (y2 - y1) / (x2 - x1)
    // offset the slope randomly (creates less organized streets)
    // find the negative reciprocal to get the perpendicular slope
    const a = (-1 / slope) * dice.uniform(1 - chaos, 1 + chaos)
    // get the y-intercept using the new slope
    const c = my - a * mx
    // find the point that meets the perpendicular slope to split the polygon
    let [ox, oy] = [0, 0]
    let otherSide: Array<[number, number]> = [
      [0, 0],
      [0, 0]
    ]
    sides.forEach(side => {
      // get the points on the other side
      // get the first vertex
      const [s1X, s1Y] = side[0]
      // get the second vertex
      const [s2X, s2Y] = side[1]
      // determine the slope of the other side
      const b = (s2Y - s1Y) / (s2X - s1X)
      // get the y-intercept of the other side
      const d = s1Y - b * s1X
      // if the lines aren't parallel
      if (a !== b && side !== longestSide) {
        // if the intersect point is on the other side we are done
        const ix = (d - c) / (a - b)
        const iy = a * ix + c
        const case1 = (s1X <= ix && ix <= s2X) || (s1X >= ix && ix >= s2X)
        const case2 = (s1Y <= iy && iy <= s2Y) || (s1Y >= iy && iy >= s2Y)
        if (case1 || case2) {
          ox = ix
          oy = iy
          otherSide = side
        }
      }
    })

    // add the split points to the side list
    sides.push([[mx, my], longestSide[0]])
    sides.push([[mx, my], longestSide[1]])
    sides.push([[ox, oy], otherSide[0]])
    sides.push([[ox, oy], otherSide[1]])
    // loop through each point on the other side
    otherSide.forEach(point => {
      const end = [mx, my] as [number, number]
      let current = point
      const edges: Array<Array<[number, number]>> = [
        [end, [ox, oy]],
        [[ox, oy], current]
      ]
      const vertices: Array<[number, number]> = [end, [ox, oy], current]
      const group = sides.filter(s => s !== longestSide && s !== otherSide)
      // start from one end and find the new polygon edges
      while (!POINT.sameEdge(end, current)) {
        let idx = 0
        const past = current
        for (let i = 0; i < group.length; i++) {
          const edge = group[i]
          if (POINT.sameEdge(edge[0], current) || POINT.sameEdge(edge[1], current)) {
            // the next edge connects to the current edge
            current = POINT.sameEdge(edge[0], current) ? edge[1] : edge[0]
            idx = i
            break
          }
        }
        edges.push([past, current])
        vertices.push(current)
        group.splice(idx, 1)
      }
      const area = Math.abs(polygonArea(vertices))
      blocks.push({
        path: curve(vertices),
        edges,
        area,
        vertices,
        center: polygonCentroid(vertices)
      })
    })
    return blocks
  }
}
