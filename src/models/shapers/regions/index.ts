import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { SITE } from '../../regions/sites'
import { COLOR } from '../../utilities/color'
import { MATH } from '../../utilities/math'
import { PERFORMANCE } from '../../utilities/performance'
import { SHAPER_CLIMATES } from './climate'
import { RegionAddBordersParams, RegionBorders } from './types'

const addBorder = ({ borders, r1, r2, c1, c2 }: RegionAddBordersParams) => {
  if (!borders[r1.idx][r2.idx]) borders[r1.idx][r2.idx] = new Set()
  borders[r1.idx][r2.idx].add(c2)
  if (!borders[r2.idx][r1.idx]) borders[r2.idx][r1.idx] = new Set()
  borders[r2.idx][r1.idx].add(c1)
}

const land: Record<number, Cell[]> = {}

export const SHAPER_REGIONS = PERFORMANCE.profile.wrapper({
  label: 'REGIONS',
  o: {
    _capitals: () => {
      // base land scores for city placement
      WORLD.land().forEach(poly => {
        // prefer lower elevations
        poly.score = (1 - poly.h) * 5 + (poly.beach ? 1 : 0)
      })
      // place the regional capitals
      const base = 300
      const count = Math.floor(base * WORLD.placement.ratio())
      const capitals = WORLD.placement
        .far({
          count,
          spacing: WORLD.placement.spacing.regions,
          whitelist: WORLD.land().sort((a, b) => b.score - a.score)
        })
        .filter(poly => window.world.landmarks[poly.landmark])
      capitals.forEach(poly => {
        REGION.spawn(poly)
        SHAPER_REGIONS.land[poly.region] = []
      })
      capitals.forEach(poly => {
        SHAPER_REGIONS.land[poly.region] = []
        PROVINCE.spawn({ cell: poly, capital: true })
      })
    },
    _coastlines: () => {
      // iterate through all coastal polygons
      window.world.cells
        .filter(p => p.isCoast)
        .forEach(p => {
          p.coastalEdges = []
          p.waterSources = new Set()
          CELL.neighbors(p)
            .filter(n => n.isWater)
            .forEach(neighbor => {
              // add water source
              p.waterSources.add(neighbor.landmark)
              // mark edge as coastal
              const edge = CELL.commonEdge(p.idx, neighbor.idx)
              window.world.coasts.push({
                land: p.landmark,
                water: neighbor.landmark,
                edge: edge
              })
              // get coastal edge coordinates
              // add them to the coastal polygon coordinates list (used for location placement)
              p.coastalEdges.push([
                {
                  x: edge[0][0],
                  y: edge[0][1]
                },
                {
                  x: edge[1][0],
                  y: edge[1][1]
                }
              ])
            })
        })
      // fix regional capitals
      window.world.provinces.forEach(loc => SITE.coastal.set(PROVINCE.hub(loc)))
    },
    _mountains: (mountainProspects: RegionBorders) => {
      WORLD.land()
        .filter(p => p.isMountains)
        .forEach(p => (p.isMountains = false))
      const lakes = WORLD.lakes()
      const total = Math.floor(WORLD.land().length * 0.4)
      let mounts = 0
      const prospects = window.dice.shuffle(
        window.world.regions.filter(r => Object.keys(mountainProspects[r.idx]).length > 0)
      )
      const used: Record<string, boolean> = {}
      while (mounts < total && prospects.length > 0) {
        const region = prospects.pop()
        if (
          used[region.idx] ||
          Object.keys(mountainProspects[region.idx]).some(
            n =>
              used[n] &&
              Object.keys(mountainProspects[parseInt(n)]).some(
                nn =>
                  used[nn] &&
                  Object.keys(mountainProspects[parseInt(nn)]).some(
                    nnn =>
                      used[nnn] &&
                      Object.keys(mountainProspects[parseInt(nnn)]).some(nnnn => used[nnnn])
                  )
              )
          )
        )
          continue
        const usedBorders = Object.entries(mountainProspects[region.idx]).filter(([n]) => !used[n])
        if (usedBorders.length < 2) continue
        const [n, borders] = usedBorders.reduce(
          (max: [string, Set<number>], [n, cells]) => {
            return max[1].size > cells.size ? max : [n, cells]
          },
          ['-1', new Set()]
        )
        if (borders.size < 1) continue
        used[region.idx] = true
        used[n] = true
        const highLimit = 10 * WORLD.cell.scale()
        Array.from(borders).forEach(i => {
          const cell = window.world.cells[i]
          if (cell.isWater)
            WORLD.removeLake({ lakes, lake: cell.landmark, regional: SHAPER_REGIONS.land })
          const high =
            borders.size > highLimit
              ? window.dice.uniform(0.8, WORLD.elevation.max)
              : window.dice.uniform(0.65, 0.8)
          const queue = [{ cell, h: high }]
          while (queue.length > 0 && mounts < total) {
            const { cell: curr, h } = queue.pop()
            curr.h = h
            curr.isMountains = curr.h > WORLD.elevation.mountains
            mounts += 1
            queue.push(
              ...CELL.neighbors(curr)
                .filter(c => !c.isWater && !c.isCoast && !c.isMountains)
                .map(c => ({ cell: c, h: borders.has(c.idx) ? high : h - 0.1 }))
                .filter(c => c.h > WORLD.elevation.mountains)
            )
          }
        })
      }

      const queue = WORLD.land().filter(p => p.isMountains)
      queue.forEach(c => {
        c.mountainDist = 0
      })
      while (queue.length > 0) {
        const curr = queue.shift()
        CELL.neighbors(curr)
          .filter(n => n.mountainDist === -1 && !n.isWater)
          .forEach(n => {
            n.mountainDist = curr.mountainDist + 1
            queue.push(n)
          })
      }
      const land = WORLD.land().filter(p => !p.isMountains)
      const islandScale = window.world.cells.length / 4266
      const decline = 3
      land.forEach(l => {
        const { oceanDist, mountainDist } = l
        l.h = MATH.scaleExp(
          [0, mountainDist > 0 ? oceanDist + mountainDist : islandScale],
          [WORLD.elevation.seaLevel, WORLD.elevation.mountains],
          oceanDist,
          decline
        )
        const landmark = window.world.landmarks[l.landmark]
        if (landmark.type !== 'continent' && !l.isMountains) {
          l.h = WORLD.kmToHeight(
            window.dice.weightedChoice([
              { w: 10, v: window.dice.uniform(0, 0.09) },
              { w: 3, v: window.dice.uniform(0.09, 0.21) },
              { w: 3, v: window.dice.uniform(0.21, 0.33) },
              { w: 1, v: window.dice.uniform(0.33, 0.5) },
              { w: 1, v: window.dice.uniform(0.5, 0.8) }
            ])
          )
        }
      })
      // mark mountains
      let idx = window.world.mountains.length
      // find all cells above the mountain cutoff
      let mountains = WORLD.land().filter(p => p.isMountains)
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
            CELL.neighbors(current)
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
      window.world.regions.forEach(region => {
        mountainProspects[region.idx] = {}
        regionBorders[region.idx] = {}
      })
      const queue = window.world.provinces
        .filter(province => province.capital)
        .map(province => PROVINCE.cell(province))
      // use capital cities to start the regional floodfill
      while (queue.length > 0) {
        // grab the next item in the queue
        const poly = queue.shift()
        const region = window.world.regions[poly.region]
        if (!region) continue
        // get the regional power
        let power = 0.75
        if (poly.shallow) {
          power /= 30 // penalty for crossing water
        }
        if (window.dice.random < power) {
          queue.push(poly)
          continue
        }
        // otherwise process neighbors
        CELL.neighbors(poly).forEach(n => {
          // claim neighbor if not claimed
          if (n.region === -1) {
            n.region = region.idx
            if (!n.isWater) SHAPER_REGIONS.land[region.idx].push(n)
            queue.push(n)
          } else if (n.region !== poly.region) {
            n.regionBorder = true
            poly.regionBorder = true
            const guest = window.world.regions[n.region]
            addBorder({
              borders: regionBorders,
              r1: region,
              r2: guest,
              c1: poly.idx,
              c2: n.idx
            })
            if (!n.isWater && !n.isCoast) {
              addBorder({
                borders: mountainProspects,
                r1: region,
                r2: guest,
                c1: poly.idx,
                c2: n.idx
              })
            }
          }
        })
      }
    },
    _finalize: (regionBorders: RegionBorders) => {
      window.world.regions.forEach(region => {
        const capital = REGION.capital(region)
        const cell = PROVINCE.cell(capital)
        const landBorders = new Set<number>()
        const borders = new Set<number>()
        Object.entries(regionBorders[region.idx]).forEach(([n, cells]) => {
          const guest = window.world.regions[parseInt(n)]
          Array.from(cells).forEach(i => {
            const cell = window.world.cells[i]
            borders.add(guest.idx)
            if (
              !cell.isWater &&
              !cell.isMountains &&
              CELL.neighbors(cell).some(
                n => n.region === region.idx && !n.isMountains && !n.isWater
              )
            ) {
              landBorders.add(guest.idx)
            }
          })
        })
        region.borders = Array.from(borders)
        region.landBorders = Array.from(landBorders)
        const { terrain } = REGION.climate(region)
        const glacial = terrain === 'glacier' && Math.abs(cell.y) > 75
        region.desolate = glacial
        const usedHues = new Set(
          region.borders.map(b => window.world.regions[b].heraldry.hue).filter(hue => hue !== -1)
        )
        region.heraldry.hue =
          usedHues.size > 0
            ? COLOR.findMostDistantHue(Array.from(usedHues))
            : window.dice.randint(0, 360)
        region.heraldry.color = window.dice.color([region.heraldry.hue, region.heraldry.hue])
      })
    },
    _locations: () => {
      const base = 2400 * 3
      const count = Math.floor(base * WORLD.placement.ratio())
      const spacing = WORLD.placement.spacing.provinces / 3
      WORLD.placement
        .close({
          count,
          spacing,
          whitelist: WORLD.land()
        })
        .forEach(cell => {
          window.world.locations.push({
            idx: window.world.locations.length,
            cell: cell.idx,
            cells: [cell.idx],
            neighbors: []
          })
        })
      //floodfill
      const queue = window.world.locations.map(loc => {
        const cell = window.world.cells[loc.cell]
        cell.location = loc.idx
        return cell
      })
      while (queue.length > 0) {
        const current = queue.shift()
        const currLoc = window.world.locations[current.location]
        CELL.neighbors(current)
          .filter(n => !n.isWater)
          .forEach(n => {
            if (n.location === undefined) {
              n.location = current.location
              currLoc.cells.push(n.idx)
              queue.push(n)
            } else {
              const loc = window.world.locations[n.location]
              if (loc.neighbors.includes(currLoc.idx)) return
              loc.neighbors.push(currLoc.idx)
              currLoc.neighbors.push(loc.idx)
            }
          })
      }
      WORLD.land()
        .filter(p => p.location === undefined)
        .forEach(cell =>
          window.world.locations.push({
            idx: window.world.locations.length,
            cell: cell.idx,
            cells: [cell.idx],
            neighbors: []
          })
        )
    },
    build: () => {
      const mountainProspects: RegionBorders = {}
      const regionBorders: RegionBorders = {}
      SHAPER_REGIONS._capitals()
      SHAPER_REGIONS._spheres(mountainProspects, regionBorders)
      SHAPER_REGIONS._mountains(mountainProspects)
      SHAPER_CLIMATES.build(SHAPER_REGIONS.land)
      SHAPER_REGIONS._coastlines()
      SHAPER_REGIONS._locations()
      SHAPER_REGIONS._finalize(regionBorders)
    },
    land
  }
})
