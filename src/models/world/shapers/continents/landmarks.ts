import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'

export const LANDMARKS = PERFORMANCE.profile.wrapper({
  label: 'LANDMARKS',
  o: {
    land: (idx: number) => {
      let land = WORLD.land()
      // mark land cells
      const total = window.world.cells.length
      // iterate through all islands
      while (land.length > 0) {
        let queue = [land[0].idx]
        window.world.landmarks[idx] = {
          name: 'none',
          type: 'continent',
          size: 0,
          water: false
        }
        // floodfill all connecting land cells to mark an island
        const lake: { isle: boolean; idx?: number } = { isle: true }
        while (queue.length > 0) {
          // grab the next item in the queue
          const current = window.world.cells[queue.shift()]
          // mark it with the current land feature index
          current.landmark = idx
          current.isWater = false
          const water = CELL.neighbors(current).filter(p => p.h < window.world.seaLevelCutoff)
          current.isCoast = water.length > 0
          const ocean = water.filter(cell => cell.ocean)
          current.beach = ocean.length > 0
          // mark neighboring water cells as shallow
          water.forEach(i => (i.shallow = true))
          // identify lake isles
          if (current.beach) lake.isle = false
          if (lake.isle && !lake.idx && water.length > 0) {
            const lakeCell = water.find(cell => !cell.ocean)
            lake.idx = lakeCell?.landmark
          }
          // add neighboring land cells to the queue
          queue = queue.concat(
            CELL.neighbors(current)
              .filter(
                p => p.h >= window.world.seaLevelCutoff && !p.landmark && !queue.includes(p.idx)
              )
              .map(p => p.idx)
          )
        }
        const island = land.filter(poly => poly.landmark === idx)
        // remove lake isles
        if (lake.isle) {
          delete window.world.landmarks[idx]
          island.forEach(p => {
            p.landmark = lake.idx
            p.isWater = true
            p.isCoast = false
            p.ocean = false
            p.h = 0
            CELL.neighbors(p)
              .filter(n => n.isWater)
              .forEach(n => {
                const coast = CELL.neighbors(n).filter(p => !p.isWater)
                n.shallow = coast.length > 0
              })
          })
          window.world.landmarks[lake.idx].size += island.length
        } else {
          // mark islands
          const landmark = window.world.landmarks[idx]
          landmark.size = island.length
          if (landmark.size / total < 0.015) landmark.type = 'island'
        }
        // only consider cells that haven't been marked
        land = land.filter(poly => !poly.landmark)
        // increment the land feature index after a completed floodfill
        idx += 1
      }
      // determine monsoon influenced climates
      const lands = Object.values(window.world.landmarks).filter(l =>
        ['island', 'continent'].includes(l.type)
      )
      const largest = lands.slice(1).reduce((max, curr) => {
        return max.size > curr.size ? max : curr
      }, lands[0])
      largest.monsoon = true
      WORLD.reshape()
    },
    water: (idx: number) => {
      // mark water cells
      let water = WORLD.water()
      const waterBodies: Record<number, Cell[]> = {}
      // iterate through all bodies of water
      while (water.length > 0) {
        let queue = [water[0].idx]
        window.world.landmarks[idx] = {
          size: 1,
          name: 'none',
          type: 'ocean',
          water: true
        }
        // floodfill all connecting water cells to mark a body of water
        while (queue.length > 0) {
          // grab the next item in the queue
          const current = window.world.cells[queue.shift()]
          // mark it with the current water feature index
          current.landmark = idx
          current.isWater = true
          current.ocean = true
          // add neighboring water cells to the queue
          queue = queue.concat(
            CELL.neighbors(current)
              .filter(
                p => p.h < window.world.seaLevelCutoff && !p.landmark && !queue.includes(p.idx)
              )
              .map(n => n.idx)
          )
        }
        // mark bodies of water
        const curr = water.filter(poly => poly.landmark === idx)
        waterBodies[idx] = curr
        const landmark = window.world.landmarks[idx]
        landmark.size = curr.length
        // only consider cells that haven't been marked
        water = water.filter(poly => !poly.landmark)
        // increment the water feature index after a completed floodfill
        idx += 1
      }
      // mark ocean
      const ocean = Object.entries(waterBodies).reduce((max, curr) => {
        return max?.[1].length > curr[1].length ? max : curr
      }, null)
      Object.keys(waterBodies)
        .filter(k => k !== ocean?.[0])
        .forEach(k => {
          window.world.landmarks[parseInt(k)].type = 'lake'
          waterBodies[parseInt(k)].forEach(p => {
            p.ocean = false
          })
        })
      return idx
    }
  }
})
