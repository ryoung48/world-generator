import { curveCatmullRom, line, scaleLinear } from 'd3'

import { edge__sameEdge } from '../../../../utilities/math/points'
import { profile } from '../../../../utilities/performance'
import { world__landFeatures, world__waterFeatures } from '../../..'
import { cell__isNationBorder, ocean } from '../../../cells'
import { CoastalEdge } from '../../../types'
import { Shaper } from '..'
import { Display } from './types'

// line function used for coastlines and region borders
export const display__coastCurve = () => {
  const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
  const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
  const curve = line()
    .x((d: number[]) => x(d[0]))
    .y((d: number[]) => y(d[1]))
    .curve(curveCatmullRom.alpha(0.1))
  return curve
}

const drawCoasts = (params: {
  landmarks: number[]
  coastFilter: (_landmark: number) => (_edge: CoastalEdge) => boolean
}) => {
  const { landmarks, coastFilter } = params
  const coast = Object.values(window.world.coasts)
  const boundaries: { path: [number, number][]; idx: number }[] = []
  landmarks.forEach(i => {
    // get ocean coastline edges
    const group = coast.filter(coastFilter(i)).map(e => e.edge)
    const start = group.shift()
    let [current] = start
    const [, end] = start
    // pick a random edge to start
    const ordered = [end, current]
    profile({
      label: 'ordering',
      f: () => {
        // loop until we arrive at the end
        while (group.length > 0) {
          let idx = 0
          // find the next edge in the segment
          for (let j = 0; j < group.length; j++) {
            const edge = group[j]
            // the next segment shares a vertex with the current segment
            if (edge__sameEdge(edge[0], current) || edge__sameEdge(edge[1], current)) {
              current = edge__sameEdge(edge[0], current) ? edge[1] : edge[0]
              idx = j
              break
            }
          }
          // add current vertex
          ordered.push(current)
          // don't consider already visited points
          group.splice(idx, 1)
        }
      }
    })
    // add ordered path to the list of ocean paths
    boundaries.push({ path: ordered, idx: i })
  })
  return boundaries
}

export const display__coasts = () => {
  // land (ocean)
  const islands = drawCoasts({
    landmarks: world__landFeatures(),
    coastFilter: i => e => e.land === i && window.world.landmarks[e.water].name === ocean
  })
  profile({
    label: 'curve',
    f: () => {
      // create ocean curve
      window.world.display.islands = islands.reduce((dict: Display['islands'], { path, idx }) => {
        dict[idx] = {
          d: display__coastCurve()(path),
          idx
        }
        return dict
      }, {})
    }
  })
}

export const display__lakes = () => {
  // land (ocean)
  const lakes = drawCoasts({
    landmarks: world__waterFeatures().filter(i => window.world.landmarks[i].type !== 'ocean'),
    coastFilter: i => e => e.water === i
  })
  profile({
    label: 'curve',
    f: () => {
      // create ocean curve
      const lakeEdges = Shaper.water.filter(cell => cell.isWater && cell.shallow && !cell.ocean)
      window.world.display.lakes = lakes.reduce((dict: Display['lakes'], { path, idx }) => {
        dict[idx] = {
          d: display__coastCurve()(path),
          idx,
          border: lakeEdges.some(cell => cell.landmark === idx && cell__isNationBorder(cell))
        }
        return dict
      }, {})
    }
  })
}
