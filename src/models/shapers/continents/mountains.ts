import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { LAKES } from '../../cells/geography/lakes'
import { LOCATION } from '../../cells/locations'
import { PLACEMENT } from '../../cells/placement'
import { Cell } from '../../cells/types'
import { PERFORMANCE } from '../../utilities/performance'
import { RegionAddBordersParams, RegionBorders } from './types'

const regions: Cell[] = []
const boundaries: Record<number, number> = {}

const coasts: Record<number, number> = {}

const addBorder = ({ borders, r1, r2, c1, c2 }: RegionAddBordersParams) => {
  if (!borders[r1][r2]) borders[r1][r2] = new Set()
  borders[r1][r2].add(c2)
  if (!borders[r2][r1]) borders[r2][r1] = new Set()
  borders[r2][r1].add(c1)
}
const addMountains = (borders: Set<number>, lakes: Cell[]) => {
  let mounts = 0
  Array.from(borders).forEach(i => {
    const cell = window.world.cells[i]
    if (cell.isWater) LAKES.remove({ lakes, lake: cell.landmark })
    const high = window.dice.uniform(0.65, 0.8)
    const queue = [{ cell, h: high }]
    while (queue.length > 0) {
      const { cell: curr, h } = queue.pop()
      curr.h = h
      curr.isMountains = curr.h > GEOGRAPHY.elevation.mountains
      mounts += 1
      queue.push(
        ...CELL.neighbors({ cell: curr })
          .filter(c => !c.isWater && !c.isCoast && !c.isMountains)
          .map(c => ({ cell: c, h: borders.has(c.idx) ? high : h - 0.1 }))
          .filter(c => c.h > GEOGRAPHY.elevation.mountains)
      )
    }
  })
  return mounts
}

export const SHAPER_MOUNTAINS = PERFORMANCE.profile.wrapper({
  label: 'MOUNTAINS',
  o: {
    boundaries,
    _centers: (base = 300, spacing = 400) => {
      // base land scores for city placement
      GEOGRAPHY.land().forEach(poly => {
        // prefer lower elevations
        poly.score = (1 - poly.h) * 5 + (poly.beach ? 1 : 0)
      })
      // place the regional capitals
      const count = Math.floor(base * PLACEMENT.ratio())
      const capitals = PLACEMENT.run({
        count,
        spacing,
        whitelist: GEOGRAPHY.land().sort((a, b) => b.score - a.score),
        tag: 'mountain borders'
      }).filter(poly => window.world.landmarks[poly.landmark])
      capitals.forEach(poly => {
        regions.push(poly)
        LOCATION.spawn(poly)
      })
    },
    _mountains: (mountainProspects: RegionBorders, regionBorders: RegionBorders) => {
      const lakes = LAKES.get()
      const total = Math.floor(GEOGRAPHY.land().length * 0.3)
      let mounts = 0
      const prospects = window.dice.shuffle(
        regions.map((_, idx) => idx).filter(idx => Object.keys(mountainProspects[idx]).length > 0)
      )
      const used: Record<string, boolean> = {}
      while (mounts < total && prospects.length > 0) {
        const region = prospects.pop()
        // ignore regions that already have mountains
        if (used[region] || Object.keys(regionBorders[region]).some(n => used[n])) continue
        // ignore regions that have less than 2 borders
        const usedBorders = Object.entries(mountainProspects[region]).filter(([n]) => !used[n])
        if (usedBorders.length < 2) continue
        // find the longest border
        const [n, borders] = usedBorders.reduce(
          (max: [string, Set<number>], [n, cells]) => {
            return max[1].size > cells.size ? max : [n, cells]
          },
          ['-1', new Set()]
        )
        // ignore extremely small borders
        if (borders.size < 1) continue
        // add mountains
        used[region] = true
        used[n] = true
        mounts += addMountains(borders, lakes)
        // build chains
        const chains = Object.keys(regionBorders[region]).filter(
          p => !used[p] && regionBorders[parseInt(p)][parseInt(n)]
        )
        const locked: Record<string, boolean> = {}
        chains.forEach(p => {
          const paths = [
            { np: n, m: mountainProspects[parseInt(n)][parseInt(p)], locked: locked[n] },
            {
              np: region,
              m: mountainProspects[region][parseInt(p)],
              locked: locked[region]
            }
          ].filter(({ m, locked }) => m && !locked)
          if (paths.length > 0) {
            const { m, np } = window.dice.choice(paths)
            locked[np] = true
            used[p] = true
            mounts += addMountains(m, lakes)
          }
        })
      }
      const plateauProspects = window.dice.shuffle(
        regions.filter(
          (r, idx) => !coasts[idx] && window.world.landmarks[r.landmark].type === 'continent'
        )
      )
      const plateaus: Record<number, { landmark: number; h: number; idx: number; count: number }> =
        {}
      for (let region of plateauProspects) {
        if (Object.keys(regionBorders[boundaries[region.idx]]).some(n => plateaus[parseInt(n)])) {
          continue
        }
        region.plateau = true
        plateaus[boundaries[region.idx]] = {
          landmark: region.landmark,
          h: window.dice.uniform(0.015, 0.03),
          idx: region.idx,
          count: 0
        }
        if (Object.keys(plateaus).length > 20) {
          break
        }
      }
      GEOGRAPHY.land().forEach(p => {
        const region = boundaries[p.idx]
        if (plateaus[region] !== undefined && plateaus[region].landmark === p.landmark)
          p.plateau = true
      })

      const queue = GEOGRAPHY.land().filter(p => p.isMountains || p.plateau)
      queue.forEach(c => {
        c.mountainDist = 0
      })
      while (queue.length > 0) {
        const curr = queue.shift()
        CELL.neighbors({ cell: curr })
          .filter(n => n.mountainDist === -1 && !n.ocean)
          .forEach(n => {
            n.mountainDist = curr.mountainDist + 1
            queue.push(n)
          })
      }
      const land = GEOGRAPHY.land().filter(p => !p.isMountains)
      land.forEach(l => {
        const landmark = window.world.landmarks[l.landmark]
        l.h =
          landmark.type === 'isle' && window.dice.random > 0.4
            ? window.dice.weightedChoice([
                { w: 0.2, v: GEOGRAPHY.elevation.mountains + window.dice.uniform(0, 0.1) },
                { w: 0.8, v: window.dice.uniform(0.31, GEOGRAPHY.elevation.mountains) }
              ])
            : GEOGRAPHY.elevation.compute(l)
        if (l.plateau) l.h = GEOGRAPHY.elevation.mountains + plateaus[boundaries[l.idx]].h
        else if (l.h > GEOGRAPHY.elevation.mountains) l.isMountains = true
      })
      GEOGRAPHY.land().forEach(l => {
        l.elevation = GEOGRAPHY.elevation.heightToKM(l.h)
      })
      // mark mountains
      let idx = window.world.mountains.length
      // find all cells above the mountain cutoff
      let mountains = GEOGRAPHY.land().filter(p => p.isMountains)
      // iterate through all mountain ranges
      while (mountains.length > 0) {
        let queue = [mountains[0].idx]
        window.world.mountains.push({
          size: 0,
          cell: mountains[0].idx
        })
        // floodfill all connecting mountain cells to mark a mountain range
        while (queue.length > 0) {
          // grab the next item in the queue
          const current = window.world.cells[queue.shift()]
          // mark it with the current mountain feature index
          current.mountain = idx
          window.world.mountains[idx].size += 1
          // add neighboring mountain cells to the queue
          queue = queue.concat(
            CELL.neighbors({ cell: current })
              .filter(p => p.isMountains && p.mountain === undefined && !queue.includes(p.idx))
              .map(p => p.idx)
          )
        }
        // only consider cells that haven't been marked
        mountains = mountains.filter(poly => poly.mountain === undefined)
        // increment the mountain feature index after a completed floodfill
        idx += 1
      }
    },
    _spheres: (mountainProspects: RegionBorders, regionBorders: RegionBorders) => {
      regions.forEach((_, i) => {
        mountainProspects[i] = {}
        regionBorders[i] = {}
      })
      const queue = regions.map((cell, i) => ({ cell, idx: i }))
      queue.forEach(({ cell, idx }) => {
        boundaries[cell.idx] = idx
      })
      // use capital cities to start the regional floodfill
      while (queue.length > 0) {
        // grab the next item in the queue
        const { cell, idx } = queue.shift()
        // get the regional power
        let power = 0.75
        if (cell.shallow || cell.isMountains) {
          power /= 30 // penalty for crossing water
        }
        if (window.dice.random > power) {
          queue.push({ cell, idx })
          continue
        }
        // otherwise process neighbors
        CELL.neighbors({ cell }).forEach(n => {
          // claim neighbor if not claimed
          if (boundaries[n.idx] === undefined) {
            boundaries[n.idx] = idx
            queue.push({ cell: n, idx })
            if (n.isCoast) coasts[idx] = (coasts[idx] || 0) + 1
          } else if (boundaries[n.idx] !== boundaries[cell.idx]) {
            addBorder({
              borders: regionBorders,
              r1: boundaries[cell.idx],
              r2: boundaries[n.idx],
              c1: cell.idx,
              c2: n.idx
            })
            if (!n.isWater && !n.isCoast) {
              addBorder({
                borders: mountainProspects,
                r1: boundaries[cell.idx],
                r2: boundaries[n.idx],
                c1: cell.idx,
                c2: n.idx
              })
            }
          }
        })
      }
    },
    build: () => {
      const mountainProspects: RegionBorders = {}
      const regionBorders: RegionBorders = {}
      SHAPER_MOUNTAINS._centers()
      SHAPER_MOUNTAINS._spheres(mountainProspects, regionBorders)
      SHAPER_MOUNTAINS._mountains(mountainProspects, regionBorders)
    }
  }
})
