import { world__waterFeatures } from '../../..'
import { cell__neighbors, ocean } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { seaLevelCutoff } from '../../../types'
import { Shaper } from '..'

const findWater = () => {
  const { h, w } = window.world.dim
  const corners = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1]
  ].map(([x, y]) => {
    const corner = window.world.diagram.delaunay.find(x, y)
    const queue = [{ cell: corner, dist: 0 }]
    const visited = { [corner]: true }
    let height = 0
    while (queue.length > 0) {
      const { cell, dist } = queue.shift()
      const worldCell = window.world.cells[cell]
      height += worldCell.n.length === 0 ? Infinity : worldCell.h
      if (dist < 10) {
        cell__neighbors(worldCell)
          .filter(n => !visited[n.idx])
          .forEach(n => {
            visited[n.idx] = true
            queue.push({ cell: n.idx, dist: dist + 1 })
          })
      }
    }
    return { corner: [x, y], height }
  })
  return corners.slice(1).reduce((min, corner) => {
    return min.height > corner.height ? corner : min
  }, corners[0]).corner
}

export const landmarks__water = (idx: number) => {
  // mark water cells
  // make sure to that index #1 points to the ocean
  const [x, y] = findWater()
  const start = window.world.diagram.delaunay.find(x, y)
  // get all water cells
  let water = [window.world.cells[start]]
  water = water.concat(Shaper.water.filter(p => p.idx !== start))
  const waterBodies: Record<number, ExteriorCell[]> = {}
  // iterate through all bodies of water
  while (water.length > 0) {
    let queue = [water[0].idx]
    window.world.landmarks[idx] = {
      size: 1,
      name: 'none',
      type: idx === 1 ? 'ocean' : 'lake',
      water: true
    }
    // floodfill all connecting water cells to mark a body of water
    while (queue.length > 0) {
      // grab the next item in the queue
      const current = window.world.cells[queue.shift()]
      // mark it with the current water feature index
      current.landmark = idx
      current.isWater = true
      current.ocean = idx === 1
      current.h = seaLevelCutoff - 0.001
      // add neighboring water cells to the queue
      queue = queue.concat(
        current.n.filter(
          p =>
            window.world.cells[p].h < seaLevelCutoff &&
            !window.world.cells[p].landmark &&
            !queue.includes(p)
        )
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
  // remove excess lakes
  const total = window.world.cells.length
  world__waterFeatures()
    .filter(i => {
      const lake = window.world.landmarks[i]
      const large = lake.size / total > 0.0001
      return lake.type !== 'ocean' && (large || window.dice.random > 0.4)
    })
    .forEach(i => {
      delete window.world.landmarks[i]
      waterBodies[i].forEach(cell => {
        cell.h = seaLevelCutoff
        cell.landmark = 0
      })
    })
  window.world.landmarks[1].name = ocean
  return idx
}

export const landmarks__islands = (idx: number) => {
  let land = Shaper.land
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
      const water = current.n.filter(p => window.world.cells[p].h < seaLevelCutoff)
      current.isCoast = water.length > 0
      const ocean = water.filter(cell => window.world.cells[cell].ocean)
      current.beach = ocean.length > 0
      // mark neighboring water cells as shallow
      water.forEach(i => (window.world.cells[i].shallow = true))
      // identify lake isles
      if (current.beach) lake.isle = false
      if (lake.isle && !lake.idx && water.length > 0) {
        const lakeCell = water.find(cell => !window.world.cells[cell].ocean)
        lake.idx = window.world.cells[lakeCell]?.landmark
      }
      // add neighboring land cells to the queue
      queue = queue.concat(
        current.n.filter(
          p =>
            window.world.cells[p].h >= seaLevelCutoff &&
            !window.world.cells[p].landmark &&
            !queue.includes(p)
        )
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
        p.h = seaLevelCutoff - 0.01
        cell__neighbors(p)
          .filter(n => n.isWater)
          .forEach(n => {
            const coast = n.n.filter(p => !window.world.cells[p].isWater)
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
  Shaper.reset('land')
  Shaper.reset('water')
}
