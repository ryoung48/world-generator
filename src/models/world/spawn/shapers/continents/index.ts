import { range } from 'd3'

import { canvas_dims } from '../../../../utilities/dimensions'
import { scale } from '../../../../utilities/math'
import NoiseGenerator from '../../../../utilities/math/dice/noise'
import { voronoi__relaxed } from '../../../../utilities/math/points'
import { profile } from '../../../../utilities/performance'
import { cell__map_edge, cell__neighbors, cell__spawn_exterior } from '../../../cells'
import { mountains_cutoff, sea_level_cutoff } from '../../../types'
import { Shaper } from '..'
import { landmarks__islands, landmarks__water } from './landmarks'

export class ContinentShaper extends Shaper {
  private landmark_idx = 1
  get pipeline() {
    return [
      { name: 'Voronoi Setup', action: this.setup },
      { name: 'Coast Generation', action: this.coast_gen },
      {
        name: 'Water Markers',
        action: () => (this.landmark_idx = landmarks__water(this.landmark_idx))
      },
      { name: 'Land Markers', action: () => landmarks__islands(this.landmark_idx) },
      { name: 'Mountain Generation', action: this.mountains },
      { name: 'Coastal Distances', action: this.coastal_distances }
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
          cell__spawn_exterior({ idx, point, diagram: window.world.diagram })
        )
      }
    })
  }
  // base height map generation
  private coast_gen() {
    // start from fractal noise
    const seed = window.world.id
    const res = 300
    const params = {
      octaves: 12,
      frequency: 0.005,
      persistence: 0.85
    }
    const elev = profile({
      label: 'noise',
      f: () => NoiseGenerator.old(res, params, seed)
    })
    // convert from noise resolution to final resolution
    const convert = res / Math.max(window.world.dim.h, window.world.dim.w)
    const bound = res - 1
    // get the chosen map mold to use as a template
    const centers = window.world.template.map(circle => ({
      ...circle,
      x: circle.x * canvas_dims.w,
      y: circle.y * canvas_dims.h,
      r: circle.r * canvas_dims.hypot
    }))
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
          poly.h = d * e
        })
      }
    })
    window.world.cells
      .filter(c => c.h >= sea_level_cutoff && cell__map_edge(c))
      .forEach(c => {
        c.h = sea_level_cutoff - 0.001
      })
  }
  private mountains() {
    // redistribute heights to create 25% mountains / total land
    const sorted = Shaper.land.sort((a, b) => b.h - a.h)
    const mounts = sorted.slice(0, Math.floor(sorted.length * 0.3))
    const m_heights = mounts.map(m => m.h)
    const m_min = Math.min(...m_heights)
    const m_max = Math.max(...m_heights)
    mounts.forEach(m => {
      m.is_mountains = true
      m.h = scale([m_min, m_max], [mountains_cutoff, 1.4], m.h)
    })
    const land = Shaper.land.filter(p => !p.is_mountains)
    const l_heights = land.map(p => p.h)
    const l_min = Math.min(...l_heights)
    const l_max = Math.max(...l_heights)
    land.forEach(l => {
      l.h = scale([l_min, l_max], [sea_level_cutoff, mountains_cutoff], l.h)
    })
  }
  // marks coastline distances
  private coastal_distances() {
    // get distance to oceans (for rivers)
    let queue = Shaper.land.filter(p => p.beach)
    queue.forEach(n => {
      n.ocean_dist = 1
      n.coastal = true
    })
    // determine the distance from the ocean cutoff for 'coastal cells'
    const coastal_cutoff = Math.max(1, Math.round(160 / window.world.dim.cell_length))
    while (queue.length > 0) {
      const current = queue.shift()
      const neighbors = cell__neighbors(current).filter(n => !n.ocean && n.ocean_dist === 0)
      neighbors.forEach(n => {
        n.ocean_dist = current.ocean_dist + 1
        n.coastal = n.ocean_dist <= coastal_cutoff
      })
      queue = queue.concat(neighbors)
    }
  }
}
