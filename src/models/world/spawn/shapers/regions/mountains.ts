import { scaleExp } from '../../../../utilities/math'
import { cell__neighbors } from '../../../cells'
import { mountainsCutoff, seaLevelCutoff } from '../../../types'
import { Shaper } from '..'
import { removeLake } from './coasts'

const mountainDistances = () => {
  const queue = Shaper.land.filter(p => p.isMountains)
  queue.forEach(c => {
    c.mountainDist = 0
  })
  while (queue.length > 0) {
    const curr = queue.shift()
    cell__neighbors(curr)
      .filter(n => n.mountainDist === -1 && !n.isWater)
      .forEach(n => {
        n.mountainDist = curr.mountainDist + 1
        queue.push(n)
      })
  }
}

export const regional__mountainousBorders = (
  mountainProspects: Record<number, Record<number, Set<number>>>
) => {
  Shaper.land.filter(p => p.isMountains).forEach(p => (p.isMountains = false))
  const lakes = Shaper.water.filter(cell => !cell.ocean)
  const total = Math.floor(Shaper.land.length * 0.35)
  let mounts = 0
  const prospects = window.dice.shuffle(
    window.world.regions.filter(r => Object.keys(mountainProspects[r.idx]).length > 0)
  )
  const used: Record<string, boolean> = {}
  while (mounts < total && prospects.length > 0) {
    const region = prospects.pop()
    if (used[region.idx]) continue
    const [n, borders] = Object.entries(mountainProspects[region.idx])
      .filter(([n]) => !used[n])
      .reduce(
        (max: [string, Set<number>], [n, cells]) => {
          return max[1].size > cells.size ? max : [n, cells]
        },
        ['-1', new Set()]
      )
    if (borders.size < 1) continue
    used[region.idx] = true
    used[n] = true
    Array.from(borders).forEach(i => {
      const cell = window.world.cells[i]
      if (cell.isWater) removeLake({ lakes, lake: cell.landmark })
      const high =
        window.world.landmarks[cell.landmark].type === 'continent' && window.dice.flip
          ? borders.size > 20
            ? 1.05
            : 0.95
          : borders.size > 20
          ? 0.95
          : 0.75
      const queue = [{ cell, h: high }]
      while (queue.length > 0 && mounts < total) {
        const { cell: curr, h } = queue.pop()
        curr.h = h
        curr.isMountains = curr.h > mountainsCutoff
        mounts += 1
        queue.push(
          ...cell__neighbors(curr)
            .filter(c => !c.isWater && !c.beach && !c.isMountains)
            .map(c => ({ cell: c, h: borders.has(c.idx) ? high : h - 0.1 }))
            .filter(c => c.h > mountainsCutoff)
        )
      }
    })
  }
  mountainDistances()
  const land = Shaper.land.filter(p => !p.isMountains)
  const islandScale = window.world.cells.length / 4266 // ~30 at 8k resolution
  land.forEach(l => {
    const { oceanDist, mountainDist } = l
    if (mountainDist > 0) {
      const total = oceanDist + mountainDist
      l.h = scaleExp([0, total], [seaLevelCutoff, mountainsCutoff], total - mountainDist, 2)
    } else {
      l.h = scaleExp([0, islandScale], [seaLevelCutoff, mountainsCutoff], oceanDist, 2)
    }
  })
  // mark mountains
  let idx = window.world.mountains.length
  // find all cells above the mountain cutoff
  let mountains = Shaper.land.filter(p => p.isMountains)
  // iterate through all mountain ranges
  while (mountains.length > 0) {
    let queue = [mountains[0].idx]
    window.world.mountains.push('none')
    // floodfill all connecting mountain cells to mark a mountain range
    while (queue.length > 0) {
      // grab the next item in the queue
      const current = window.world.cells[queue.shift()]
      // mark it with the current mountain feature index
      current.mountain = idx
      // add neighboring mountain cells to the queue
      queue = queue.concat(
        current.n.filter(
          p =>
            window.world.cells[p].isMountains &&
            window.world.cells[p].mountain === undefined &&
            !queue.includes(p)
        )
      )
    }
    // only consider cells that haven't been marked
    mountains = mountains.filter(poly => poly.mountain === undefined)
    // increment the mountain feature index after a completed floodfill
    idx += 1
  }
}
