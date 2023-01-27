import { curveCatmullRom, line, scaleLinear } from 'd3'

import { cell__province } from '../../../cells'
import { RouteTypes } from '../../../travel/types'

// line function used for rivers and roads
const d3Line = () => {
  const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
  const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
  return line()
    .x((d: number[]) => x(d[0]))
    .y((d: number[]) => y(d[1]))
    .curve(curveCatmullRom.alpha(0.1))
}

const display__roadSegment = (params: { route: RouteTypes; path: number[]; imperial: boolean }) => {
  const { route, path, imperial } = params
  if (path.length > 1) {
    const start = window.world.cells[path[0]]
    const end = window.world.cells[path[path.length - 1]]
    const points = path.map(i => {
      const cell = window.world.cells[i]
      const settlement = cell__province(cell)
      const { hub } = settlement
      return cell.idx === hub.cell ? [hub.x, hub.y] : [cell.x, cell.y]
    }) as [number, number][]
    window.world.display.routes[route].push({
      d: d3Line()(points),
      provinces: Array.from(new Set([start.province, end.province])),
      imperial
    })
  }
}

const display__road = (params: {
  used: Record<string, boolean>
  path: number[]
  imperial?: boolean
  route: RouteTypes
}) => {
  const { used, path, route, imperial } = params
  let [i, k] = [0, 1]
  for (let j = 0; k < path.length; j++, k++) {
    const [src, dst] = [path[j], path[k]]
    // make sure each segment is only drawn once
    if (used[[src, dst].toString()]) {
      display__roadSegment({ route, path: path.slice(i, k), imperial })
      i = k
    } else {
      used[[src, dst].toString()] = true
      used[[dst, src].toString()] = true
    }
  }
  display__roadSegment({ route, path: path.slice(i, k), imperial })
}

export const display__roads = () => {
  // used road paths
  const used: Record<string, boolean> = {}
  // iterate through each road type
  Object.entries(window.world.routes).forEach(([route, roads]) => {
    // draw each road segment
    const sorted = [...roads].sort((a, b) => (b.imperial ? 1 : 0) - (a.imperial ? 1 : 0))
    sorted.forEach(({ path, imperial }) => {
      display__road({ used, path, route: route as RouteTypes, imperial })
    })
  })
}
