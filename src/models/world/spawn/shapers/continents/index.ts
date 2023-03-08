import { range } from 'd3'

import { canvasDims } from '../../../../utilities/dimensions'
import { scale } from '../../../../utilities/math'
import NoiseGenerator from '../../../../utilities/math/dice/noise'
import { voronoi__relaxed } from '../../../../utilities/math/points'
import { profile } from '../../../../utilities/performance'
import { cell__mapEdge, cell__neighbors, cell__spawnExterior } from '../../../cells'
import { Shaper } from '..'
import { landmarks__islands, landmarks__water } from './landmarks'

export class ContinentShaper extends Shaper {
  private landmarkIdx = 1
  get pipeline() {
    return [
      { name: 'Voronoi Setup', action: this.setup },
      { name: 'Coast Generation', action: this.coastGen },
      {
        name: 'Water Markers',
        action: () => (this.landmarkIdx = landmarks__water(this.landmarkIdx))
      },
      { name: 'Land Markers', action: () => landmarks__islands(this.landmarkIdx) },
      { name: 'Coastal Distances', action: this.coastalDistances }
    ]
  }
  // voronoi setup
  private setup() {
    // create initial points
    const points: [number, number][] = range(window.world.dim.cells).map(() => {
      return [window.dice.random * window.world.dim.w, window.dice.random * window.world.dim.h]
    })
    profile({
      label: 'voronoi diagram',
      f: () => {
        window.world.diagram = voronoi__relaxed({
          points,
          w: window.world.dim.w,
          h: window.world.dim.h
        })
      }
    })
    profile({
      label: 'build cells',
      f: () => {
        // get voronoi polygon data
        window.world.cells = points.map((point, idx) =>
          cell__spawnExterior({ idx, point, diagram: window.world.diagram })
        )
      }
    })
  }
  // base height map generation
  private coastGen() {
    // start from fractal noise
    const seed = window.world.id
    const res = 300
    const params = {
      octaves: 12,
      frequency: 0.001,
      persistence: 0.7
    }
    const elev = profile({
      label: 'noise',
      f: () => NoiseGenerator.simplex(res, params, seed)
    })
    // convert from noise resolution to final resolution
    const convert = res / Math.max(window.world.dim.h, window.world.dim.w)
    const bound = res - 1
    // get the chosen map mold to use as a template
    const centers = [
      { x: 0.5 * canvasDims.w, y: 0.5 * canvasDims.h, r: 1.2 * canvasDims.hypot, w: 1 }
    ]
    profile({
      label: 'distance assignment',
      f: () => {
        window.world.cells.forEach(poly => {
          // euclidean distance from center
          let d = centers.reduce((sum, { x, y, r, w }) => {
            const dc = Math.hypot(poly.x - x, poly.y - y)
            const center =
              w > 0
                ? Math.max(0, scale([0, r], [w, 0], dc))
                : Math.min(0, scale([0, r], [w, 0], dc))
            return sum + center
          }, 0)
          d = d <= 0 ? 0 : d ** 2
          // average polygon height using vertices as data points
          const e =
            poly.data.reduce((total, pt) => {
              const [y, x] = pt.map(p => Math.min(Math.round(p * convert), bound))
              return total + elev[x][y]
            }, 0) / poly.data.length
          // final height (edges should be below sea-level producing islands)
          poly.h = e * d
        })
      }
    })
    const sorted = window.world.cells.concat().sort((a, b) => b.h - a.h)
    window.world.seaLevelCutoff = sorted[Math.floor(sorted.length * 0.2)].h
    window.world.cells
      .filter(c => c.h >= window.world.seaLevelCutoff && cell__mapEdge(c))
      .forEach(c => {
        c.h = window.world.seaLevelCutoff - 0.001
      })
  }
  // marks coastline distances
  private coastalDistances() {
    // get distance to oceans (for rivers)
    let queue = Shaper.land.filter(p => p.beach)
    queue.forEach(n => {
      n.oceanDist = 1
      n.coastal = true
    })
    // determine the distance from the ocean cutoff for 'coastal cells'
    const coastalCutoff = Math.max(1, Math.round(160 / window.world.dim.cellLength))
    while (queue.length > 0) {
      const current = queue.shift()
      const neighbors = cell__neighbors(current).filter(n => !n.ocean && n.oceanDist === 0)
      neighbors.forEach(n => {
        n.oceanDist = current.oceanDist + 1
        n.coastal = n.oceanDist <= coastalCutoff
      })
      queue = queue.concat(neighbors)
    }
  }
}
