import { range } from 'd3'

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
      const params = {
        octaves: 12,
        frequency: 0.2,
        persistence: 0.78
      }
      const elev = PERFORMANCE.profile.apply({
        label: 'noise',
        f: () => NoiseGenerator.sphere(window.world.cells, params, seed)
      })
      elev.forEach((e, i) => (window.world.cells[i].h = e > 0.4 ? 0.1 : 0))
      window.world.seaLevelCutoff = 0.1
    },
    _setup: () => {
      // create initial points
      let points: [number, number][] = range(window.world.dim.cells).map(() => {
        return [360 * window.dice.random, 90 * (window.dice.random - window.dice.random)]
      })
      PERFORMANCE.profile.apply({
        label: 'voronoi diagram',
        f: () => {
          const { vor, sites } = VORONOI.relaxed.spherical({
            points,
            w: window.world.dim.w,
            h: window.world.dim.h,
            relaxation: 1
          })
          window.world.diagram = vor
          points = sites
        }
      })
      PERFORMANCE.profile.apply({
        label: 'build cells',
        f: () => {
          // get voronoi polygon data
          window.world.cells = points.map((point, idx) => CELL.spawn({ idx, point }))
        }
      })
    }
  }
})
