import { range } from 'd3'

import { WORLD } from '../..'
import { CELL } from '../../cells'
import { ARRAY } from '../../utilities/array'
import { SIMPLEX } from '../../utilities/math/dice/noise'
import { VORONOI } from '../../utilities/math/voronoi'
import { PERFORMANCE } from '../../utilities/performance'
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
      CONTINENTS._oceanRegions()
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
      while (land < 0.25 || land > 0.35) {
        land = elev.filter(e => e > cutoff).length / window.world.cells.length
        if (land > 0.35) cutoff += 0.02
        if (land < 0.25) cutoff -= 0.02
      }
      elev.forEach((e, i) => (window.world.cells[i].h = e > cutoff ? WORLD.elevation.seaLevel : 0))
      console.log('land ratio: ' + land + ' | cutoff: ' + cutoff)
    },
    _oceanRegions: () => {
      WORLD.placement
        .far({
          count: 500,
          spacing: WORLD.placement.spacing.regions,
          whitelist: window.world.cells.filter(cell => cell.ocean)
        })
        .filter(poly => window.world.landmarks[poly.landmark])
        .forEach(cell => {
          window.world.oceanRegions.push({
            cell: cell.idx,
            idx: window.world.oceanRegions.length,
            borders: []
          })
        })
      const queue = window.world.oceanRegions.map(o => {
        const cell = window.world.cells[o.cell]
        cell.oceanRegion = o.idx
        return cell
      })
      while (queue.length > 0) {
        const current = queue.shift()
        CELL.neighbors(current).forEach(n => {
          if (n.ocean && n.oceanRegion === undefined) {
            n.oceanRegion = current.oceanRegion
            queue.push(n)
          } else {
            n.oceanBorder = true
            window.world.oceanRegions[current.oceanRegion].borders.push(n.idx)
            current.oceanBorder = true
            window.world.oceanRegions[current.oceanRegion]?.borders.push(current.idx)
          }
        })
      }
      window.world.oceanRegions.forEach(region => {
        region.borders = ARRAY.unique(region.borders)
      })
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
