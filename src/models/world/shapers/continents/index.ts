import { range } from 'd3'

import { canvasDims } from '../../../utilities/dimensions'
import { MATH } from '../../../utilities/math'
import NoiseGenerator from '../../../utilities/math/dice/noise'
import { VORONOI } from '../../../utilities/math/voronoi'
import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
import { CELL } from '../../cells'
import { LANDMARKS } from './landmarks'

export const CONTINENTS = PERFORMANCE.profile.wrapper({
  label: 'CONTINENTS',
  o: {
    build: () => {
      CONTINENTS._setup()
      CONTINENTS._coastGen()
      const idx = LANDMARKS.water(1)
      LANDMARKS.land(idx)
      CONTINENTS._coastalDistances()
    },
    _coastalDistances: () => {
      // get distance to oceans (for rivers)
      let queue = WORLD.land().filter(p => p.beach)
      queue.forEach(n => {
        n.oceanDist = 1
        n.coastal = true
      })
      // determine the distance from the ocean cutoff for 'coastal cells'
      const coastalCutoff = Math.max(1, Math.round(160 / window.world.dim.cellLength))
      while (queue.length > 0) {
        const current = queue.shift()
        const neighbors = CELL.neighbors(current).filter(n => !n.ocean && n.oceanDist === 0)
        neighbors.forEach(n => {
          n.oceanDist = current.oceanDist + 1
          n.coastal = n.oceanDist <= coastalCutoff
        })
        queue = queue.concat(neighbors)
      }
    },
    _coastGen: () => {
      // start from fractal noise
      const seed = window.world.id
      const res = 300
      const params = {
        octaves: 12,
        frequency: 0.001,
        persistence: 0.7
      }
      const elev = PERFORMANCE.profile.apply({
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
      PERFORMANCE.profile.apply({
        label: 'distance assignment',
        f: () => {
          window.world.cells.forEach(poly => {
            // euclidean distance from center
            let d = centers.reduce((sum, { x, y, r, w }) => {
              const dc = Math.hypot(poly.x - x, poly.y - y)
              const center =
                w > 0
                  ? Math.max(0, MATH.scale([0, r], [w, 0], dc))
                  : Math.min(0, MATH.scale([0, r], [w, 0], dc))
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
        .filter(c => c.h >= window.world.seaLevelCutoff && c.mapEdge)
        .forEach(c => {
          c.h = window.world.seaLevelCutoff - 0.001
        })
    },
    _setup: () => {
      // create initial points
      let points: [number, number][] = range(window.world.dim.cells).map(() => {
        return [window.dice.random * window.world.dim.w, window.dice.random * window.world.dim.h]
      })
      PERFORMANCE.profile.apply({
        label: 'voronoi diagram',
        f: () => {
          window.world.diagram = VORONOI.relaxed({
            points,
            w: window.world.dim.w,
            h: window.world.dim.h,
            relaxation: 1
          })
        }
      })
      PERFORMANCE.profile.apply({
        label: 'build cells',
        f: () => {
          // get voronoi polygon data
          window.world.cells = points.map((point, idx) =>
            CELL.spawn({ idx, point, diagram: window.world.diagram })
          )
        }
      })
    }
  }
})
