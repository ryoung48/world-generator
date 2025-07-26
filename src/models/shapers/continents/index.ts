import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { RIVER } from '../../cells/geography/rivers'
import { LOCATION } from '../../cells/locations'
import { PLACEMENT } from '../../cells/placement'
import { SIMPLEX } from '../../utilities/math/dice/noise'
import { POINT } from '../../utilities/math/points'
import { VORONOI } from '../../utilities/math/voronoi'
import { PERFORMANCE } from '../../utilities/performance'
import { SHAPER_CLIMATES } from './climate'
import { LANDMARKS as SHAPER_LANDMARKS } from './landmarks'
import { SHAPER_MOUNTAINS } from './mountains'
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
      SHAPER_MOUNTAINS.build()
      SHAPER_CLIMATES.build()
      SHAPER_CONTINENTS._topography()
      SHAPER_CONTINENTS._oceanic()
      SHAPER_CONTINENTS._coastlines()
      SHAPER_CONTINENTS._locations()
      SHAPER_CONTINENTS._rivers()
    },
    _coastalDistances: () => {
      // get distance to oceans (for rivers)
      let queue = GEOGRAPHY.land().filter(p => p.beach)
      queue.forEach(n => {
        n.oceanDist = 1
      })
      // determine the distance from the ocean cutoff for 'coastal cells'
      while (queue.length > 0) {
        const current = queue.shift()
        const neighbors = CELL.neighbors({ cell: current }).filter(
          n => !n.ocean && n.oceanDist === 0
        )
        neighbors.forEach(n => {
          n.oceanDist = current.oceanDist + 1
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
        persistence: 0.8
      }
      const elev = PERFORMANCE.profile.apply({
        label: 'noise',
        f: () => SIMPLEX.continents(window.world.cells, params, seed)
      })
      let cutoff = 0.4
      let land = 0
      const target = [0.25, 0.35]
      while (land < target[0] || land > target[1]) {
        land = elev.filter(e => e > cutoff).length / window.world.cells.length
        if (land > target[1]) cutoff += 0.02
        if (land < target[0]) cutoff -= 0.02
      }
      elev.forEach(
        (e, i) => (window.world.cells[i].h = e > cutoff ? GEOGRAPHY.elevation.seaLevel : 0)
      )
      console.log('land ratio: ' + land + ' | cutoff: ' + cutoff)
    },
    _coastlines: () => {
      // iterate through all coastal polygons 338
      window.world.cells
        .filter(p => p.isCoast)
        .forEach(p => {
          p.coastalEdges = []
          p.waterSources = new Set()
          CELL.neighbors({ cell: p })
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
              p.coastalEdges.push({
                neighbor: neighbor.idx,
                vertices: [
                  {
                    x: edge[0][0],
                    y: edge[0][1]
                  },
                  {
                    x: edge[1][0],
                    y: edge[1][1]
                  }
                ]
              })
            })
        })
    },
    _setup: () => {
      // create initial points
      let points = POINT.random(window.world.cell.count)
      PERFORMANCE.profile.apply({
        label: 'voronoi diagram',
        f: () => {
          const { vor, sites } = VORONOI.relaxed.spherical({ points, relaxation: 2 })
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
    },
    _topography: () => {
      GEOGRAPHY.land()
        .map(cell => cell)
        .sort((a, b) => b.h - a.h)
        .forEach(cell => {
          if (!cell.topography) {
            const landmark = window.world.landmarks[cell.landmark]
            const h = GEOGRAPHY.elevation.heightToKM(cell.h)
            const arid = cell.vegetation === 'sparse' || cell.vegetation === 'desert'
            if (cell.isMountains) cell.topography = 'mountains'
            else if (h > 0.5) cell.topography = 'plateau'
            else if (h > 0.3) cell.topography = 'hills'
            else if (cell.isCoast && cell.beach) {
              cell.topography =
                CELL.neighbors({ cell }).filter(c => c.isWater).length === 1 &&
                landmark.type !== 'isle' &&
                !arid &&
                window.dice.random > 0.8
                  ? 'marsh'
                  : 'coastal'
            } else if (cell.isCoast && !cell.beach && !arid && window.dice.random > 0.6)
              cell.topography = 'marsh'
            else cell.topography = 'flat'
            if (cell.isMountains)
              cell.volcanic = window.dice.weightedChoice([
                {
                  v: true,
                  w: landmark.type === 'continent' ? 0.01 : landmark.type === 'island' ? 0.05 : 0.3
                },
                { v: false, w: 0.99 }
              ])
          }
        })
    },
    _oceanic: () => {
      window.world.oceanRegions.forEach(region => {
        const cell = window.world.cells[region.cell]
        if (cell.climate === 'chaotic') return
        const { mean, max, min } = cell.heat
        const arid = region.cells
          .map(c => window.world.cells[c])
          .some(c => CELL.neighbors({ cell: c }).some(c => c.vegetation === 'desert'))
        if (max < 0 && min < 0) {
          region.feature = 'permanent sea ice'
        } else if (min < -10) {
          region.feature = 'seasonal sea ice'
        } else if (
          mean > 20 &&
          region.distanceFrom.land === 0 &&
          !arid &&
          region.coasts > 5 &&
          window.dice.random > 0.8
        ) {
          region.feature = 'coral reef'
        }
      })
    },
    _locations: () => {
      const base = 2500 * 3
      const count = Math.floor(base * PLACEMENT.ratio())
      const spacing = PLACEMENT.spacing.provinces / 2
      const land = GEOGRAPHY.land()
      const coast = land.filter(p => p.isCoast)
      const inland = land.filter(p => !p.isCoast)
      PLACEMENT.run({
        count,
        spacing,
        whitelist: coast.concat(inland),
        blacklist: window.world.locations.map(LOCATION.cell),
        tag: 'locations'
      }).forEach(LOCATION.spawn)
      //floodfill
      const queue = window.world.locations.map(loc => {
        const cell = LOCATION.cell(loc)
        cell.location = loc.idx
        return cell
      })
      while (queue.length > 0) {
        const current = queue.shift()
        const currLoc = window.world.locations[current.location]
        CELL.neighbors({ cell: current })
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
      GEOGRAPHY.land()
        .filter(p => p.location === undefined)
        .forEach(LOCATION.spawn)
      window.world.locations.forEach(loc => {
        const cells = loc.cells.map(c => window.world.cells[c])
        const plateau = cells.filter(cell => cell.plateau).length / cells.length > 0.75
        const mountains = cells.filter(cell => cell.isMountains).length / cells.length > 0.25
        const hills = cells.filter(cell => cell.topography === 'hills').length / cells.length > 0.25
        const marsh = LOCATION.cell(loc).topography === 'marsh'
        const coastal =
          cells.filter(cell => cell.topography === 'coastal').length / cells.length > 0.25
        if (mountains) loc.topography = 'mountains'
        else if (plateau) loc.topography = 'plateau'
        else if (hills) loc.topography = 'hills'
        else if (marsh) loc.topography = 'marsh'
        else if (coastal) loc.topography = 'coastal'
        else loc.topography = 'flat'
        loc.volcanic = cells.some(cell => cell.volcanic)
      })
    },
    _rivers: () => {
      window.world.rivers = {}
      GEOGRAPHY.land()
        .filter(
          cell =>
            cell.topography !== 'mountains' &&
            cell.topography !== 'plateau' &&
            cell.vegetation !== 'desert' &&
            !cell.isCoast &&
            CELL.neighbors({ cell }).some(n => n.isMountains)
        )
        .sort((a, b) => b.h - a.h)
        .forEach(cell => {
          const src = cell
          if (CELL.neighbors({ cell, depth: 1 }).some(n => n.river !== undefined)) return
          RIVER.spawn.downstream(src)
        })

      // cleanup
      Object.values(window.world.rivers)
        .filter(r => r.branch === -1 && RIVER.length(r.idx) < 15)
        .map(r => r.idx)
        .forEach(RIVER.remove)
    }
  }
})
