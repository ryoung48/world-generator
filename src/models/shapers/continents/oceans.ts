import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { ARRAY } from '../../utilities/array'
import { PERFORMANCE } from '../../utilities/performance'

export const OCEANS = PERFORMANCE.profile.wrapper({
  label: 'OCEANS',
  o: {
    _markOceans: (oceans: Cell[]) => {
      const queue = WORLD.placement
        .far({ count: 5, spacing: WORLD.placement.spacing.oceans, whitelist: oceans })
        .map((cell, i) => {
          const region = window.world.oceanRegions[cell.oceanRegion]
          region.ocean = i
          return region
        })
      while (queue.length > 0) {
        const current = queue.shift()
        current.neighbors
          .map(n => window.world.oceanRegions[n])
          .forEach(n => {
            if (n.ocean === -1) {
              n.ocean = current.ocean
              queue.push(n)
            }
          })
      }
      const landmarks: Record<number, { landmark: number; size: number }> = {
        0: { landmark: oceans[0].landmark, size: 0 }
      }
      let idx = Math.max(...Object.keys(window.world.landmarks).map(n => parseInt(n))) + 1
      oceans.forEach(cell => {
        const ocean = window.world.oceanRegions[cell.oceanRegion]
        if (!landmarks[ocean.ocean]) {
          window.world.landmarks[idx] = {
            size: 0,
            type: 'ocean',
            water: true,
            cell: cell.idx
          }
          landmarks[ocean.ocean] = { landmark: idx, size: 0 }
          idx += 1
        }
        cell.landmark = landmarks[ocean.ocean].landmark
        landmarks[ocean.ocean].size += 1
      })
      Object.values(landmarks).forEach(({ landmark, size }) => {
        window.world.landmarks[landmark].size = size
      })
    },
    _oceanRegions: (oceans: Cell[]) => {
      WORLD.placement
        .far({ count: 500, spacing: WORLD.placement.spacing.regions, whitelist: oceans })
        .forEach(cell => {
          window.world.oceanRegions.push({
            cell: cell.idx,
            idx: window.world.oceanRegions.length,
            borders: [],
            neighbors: [],
            ocean: -1
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
            window.world.oceanRegions[current.oceanRegion].borders.push(n.idx)
            window.world.oceanRegions[current.oceanRegion].borders.push(current.idx)
            if (n.oceanRegion !== undefined)
              window.world.oceanRegions[current.oceanRegion].neighbors.push(n.oceanRegion)
          }
        })
      }
      window.world.oceanRegions.forEach(region => {
        region.borders = ARRAY.unique(region.borders)
        region.neighbors = ARRAY.unique(region.neighbors)
      })
    },
    build: () => {
      const oceans = WORLD.water().filter(
        cell => cell.ocean && window.world.landmarks[cell.landmark] !== undefined
      )
      OCEANS._oceanRegions(oceans)
      OCEANS._markOceans(oceans)
    }
  }
})
