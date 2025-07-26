import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { PLACEMENT } from '../../cells/placement'
import { Cell } from '../../cells/types'
import { ARRAY } from '../../utilities/array'
import { PERFORMANCE } from '../../utilities/performance'

export const OCEANS = PERFORMANCE.profile.wrapper({
  label: 'OCEANS',
  o: {
    _landDist: (oceans: Cell[]) => {
      const queue = oceans.filter(o => o.shallow)
      queue.forEach(o => {
        o.landDist = 1
      })
      while (queue.length > 0) {
        const current = queue.shift()
        const neighbors = CELL.neighbors({ cell: current }).filter(n => n.ocean && n.landDist === 0)
        neighbors.forEach(n => {
          n.landDist = current.landDist + 1
          queue.push(n)
        })
      }
    },
    _markOceans: () => {
      const regions = Object.values(window.world.oceanRegions)
      const deep = regions
        .filter(r => r.distanceFrom.continent > 6)
        .map(r => window.world.cells[r.cell])
      const deepWaters = PLACEMENT.run({
        count: 5,
        spacing: PLACEMENT.spacing.oceans,
        whitelist: deep,
        tag: 'ocean regions (deep)'
      }).map((cell, i) => {
        const region = window.world.oceanRegions[cell.oceanRegion]
        region.ocean = i
        region.type = 'ocean'
        return region
      })
      const shallow = regions
        .filter(r => r.distanceFrom.continent < 1)
        .map(r => window.world.cells[r.cell])
      const shallowWaters = PLACEMENT.run({
        count: shallow.length / 8,
        spacing: PLACEMENT.spacing.oceanRegions * 8,
        whitelist: shallow,
        tag: 'ocean regions (shallow)'
      }).map((cell, i) => {
        const region = window.world.oceanRegions[cell.oceanRegion]
        region.ocean = deepWaters.length + i
        region.type = 'sea'
        return region
      })
      while (shallowWaters.length > 0) {
        const current = shallowWaters.shift()
        current.neighbors
          .map(n => window.world.oceanRegions[n])
          .forEach(n => {
            if (n.ocean === -1 && n.distanceFrom.continent < 2) {
              n.ocean = current.ocean
              n.type = current.type
              shallowWaters.push(n)
            }
          })
      }
      while (deepWaters.length > 0) {
        const current = deepWaters.shift()
        current.neighbors
          .map(n => window.world.oceanRegions[n])
          .forEach(n => {
            if (n.ocean === -1) {
              n.ocean = current.ocean
              n.type = current.type
              deepWaters.push(n)
            }
          })
      }
    },
    _oceanRegions: (oceans: Cell[]) => {
      PLACEMENT.run({
        count: 2000,
        spacing: PLACEMENT.spacing.oceanRegions,
        whitelist: oceans,
        tag: 'ocean regions'
      }).forEach(cell => {
        window.world.oceanRegions.push({
          cell: cell.idx,
          idx: window.world.oceanRegions.length,
          borders: [],
          neighbors: [],
          cells: [cell.idx],
          ocean: -1,
          distanceFrom: { continent: -1, land: -1 },
          coasts: 0
        })
      })
      const queue = window.world.oceanRegions.map(o => {
        const cell = window.world.cells[o.cell]
        cell.oceanRegion = o.idx
        return cell
      })
      while (queue.length > 0) {
        const current = queue.shift()
        CELL.neighbors({ cell: current }).forEach(n => {
          if (n.ocean && n.oceanRegion === undefined) {
            n.oceanRegion = current.oceanRegion
            queue.push(n)
            window.world.oceanRegions[current.oceanRegion].cells.push(n.idx)
          } else {
            if (n.oceanRegion !== current.oceanRegion) {
              window.world.oceanRegions[current.oceanRegion].borders.push(current.idx)
              if (n.oceanRegion !== undefined) {
                window.world.oceanRegions[current.oceanRegion].neighbors.push(n.oceanRegion)
              } else if (!n.isWater) {
                window.world.oceanRegions[current.oceanRegion].coasts += 1
                window.world.oceanRegions[current.oceanRegion].distanceFrom.land = 0
                if (window.world.landmarks[n.landmark].type === 'continent')
                  window.world.oceanRegions[current.oceanRegion].distanceFrom.continent = 0
              }
            }
          }
        })
      }
      window.world.oceanRegions.forEach(region => {
        region.borders = ARRAY.unique(region.borders)
        region.neighbors = ARRAY.unique(region.neighbors)
      })
      const coastal = window.world.oceanRegions.filter(r => r.distanceFrom.continent === 0)
      while (coastal.length > 0) {
        const current = coastal.shift()
        current.neighbors
          .map(n => window.world.oceanRegions[n])
          .forEach(n => {
            if (n.distanceFrom.continent === -1) {
              n.distanceFrom.continent = current.distanceFrom.continent + 1
              coastal.push(n)
            }
          })
      }
      const coastalLand = window.world.oceanRegions.filter(r => r.distanceFrom.land === 0)
      while (coastalLand.length > 0) {
        const current = coastalLand.shift()
        current.neighbors
          .map(n => window.world.oceanRegions[n])
          .forEach(n => {
            if (n.distanceFrom.land === -1) {
              n.distanceFrom.land = current.distanceFrom.land + 1
              coastalLand.push(n)
            }
          })
      }
    },
    build: () => {
      const oceans = GEOGRAPHY.water().filter(
        cell => cell.ocean && window.world.landmarks[cell.landmark] !== undefined
      )
      OCEANS._oceanRegions(oceans)
      OCEANS._markOceans()
      OCEANS._landDist(oceans)
    }
  }
})
