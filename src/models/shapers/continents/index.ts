import { range } from 'd3'

import { WORLD } from '../..'
import { CELL } from '../../cells'
import { SIMPLEX } from '../../utilities/math/dice/noise'
import { VORONOI } from '../../utilities/math/voronoi'
import { PERFORMANCE } from '../../utilities/performance'
import { LANDMARKS as SHAPER_LANDMARKS } from './landmarks'
import { OCEANS as SHAPER_OCEANS } from './oceans'

export const SHAPER_CONTINENTS = PERFORMANCE.profile.wrapper({
  label: 'CONTINENTS',
  o: {
    build: () => {
      SHAPER_CONTINENTS._setup()
      SHAPER_CONTINENTS._coastGen()
      const idx = SHAPER_LANDMARKS.water(1)
      SHAPER_LANDMARKS.land(idx)
      SHAPER_CONTINENTS._coastalDistances()
      SHAPER_OCEANS.build()
    },
    _coastalDistances: () => {
      // get distance to oceans (for rivers)
      let queue = WORLD.land().filter(p => p.beach)
      queue.forEach(n => {
        n.oceanDist = 1
        n.coastal = true
      })
      // determine the distance from the ocean cutoff for 'coastal cells'
      const coastalCutoff = WORLD.distance.coastal()
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
        f: () => SIMPLEX.sphere(window.world.cells, params, seed)
      })
      let cutoff = 0.4
      let land = 0
      const target = [0.25, 0.35]
      while (land < target[0] || land > target[1]) {
        land = elev.filter(e => e > cutoff).length / window.world.cells.length
        if (land > target[1]) cutoff += 0.02
        if (land < target[0]) cutoff -= 0.02
      }
      elev.forEach((e, i) => (window.world.cells[i].h = e > cutoff ? WORLD.elevation.seaLevel : 0))
      console.log('land ratio: ' + land + ' | cutoff: ' + cutoff)
    },
    _setup: () => {
      // create initial points
      let points: [number, number][] = range(WORLD.cell.count()).map(() => {
        return [360 * window.dice.random, 90 * (window.dice.random - window.dice.random)]
      })
      PERFORMANCE.profile.apply({
        label: 'voronoi diagram',
        f: () => {
          const { vor, sites } = VORONOI.relaxed.spherical({ points, relaxation: 1 })
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
