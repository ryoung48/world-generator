import { curveCatmullRom, line, scaleLinear } from 'd3'

import { same_edge } from '../../../../utilities/math/points'
import { profile } from '../../../../utilities/performance'
import { world__land_features, world__water_features } from '../../..'
import { cell__is_nation_border, ocean } from '../../../cells'
import { CoastalEdge } from '../../../types'
import { Shaper } from '..'
import { Display } from './types'

// line function used for coastlines and region borders
export const display__coast_curve = () => {
  const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
  const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
  const curve = line()
    .x((d: number[]) => x(d[0]))
    .y((d: number[]) => y(d[1]))
    .curve(curveCatmullRom.alpha(0.1))
  return curve
}

const draw_coasts = (params: {
  landmarks: number[]
  coast_filter: (_landmark: number) => (_edge: CoastalEdge) => boolean
}) => {
  const { landmarks, coast_filter } = params
  const coast = Object.values(window.world.coasts)
  const boundaries: { path: [number, number][]; idx: number }[] = []
  landmarks.forEach(i => {
    // get ocean coastline edges
    const group = coast.filter(coast_filter(i)).map(e => e.edge)
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
            if (same_edge(edge[0], current) || same_edge(edge[1], current)) {
              current = same_edge(edge[0], current) ? edge[1] : edge[0]
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
  const islands = draw_coasts({
    landmarks: world__land_features(),
    coast_filter: i => e => e.land === i && window.world.landmarks[e.water].name === ocean
  })
  profile({
    label: 'curve',
    f: () => {
      // create ocean curve
      window.world.display.islands = islands.reduce((dict: Display['islands'], { path, idx }) => {
        dict[idx] = {
          d: display__coast_curve()(path),
          idx
        }
        return dict
      }, {})
    }
  })
}

export const display__lakes = () => {
  // land (ocean)
  const lakes = draw_coasts({
    landmarks: world__water_features().filter(i => window.world.landmarks[i].type !== 'ocean'),
    coast_filter: i => e => e.water === i
  })
  profile({
    label: 'curve',
    f: () => {
      // create ocean curve
      const lake_edges = Shaper.water.filter(cell => cell.is_water && cell.shallow && !cell.ocean)
      window.world.display.lakes = lakes.reduce((dict: Display['lakes'], { path, idx }) => {
        dict[idx] = {
          d: display__coast_curve()(path),
          idx,
          border: lake_edges.some(cell => cell.landmark === idx && cell__is_nation_border(cell))
        }
        return dict
      }, {})
    }
  })
}
