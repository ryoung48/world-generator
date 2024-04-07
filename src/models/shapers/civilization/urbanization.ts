import { WORLD } from '../..'
import { CELL } from '../../cells'
import { CLIMATE } from '../../cells/climate'
import { Cell } from '../../cells/types'
import { REGION } from '../../regions'
import { PLACE } from '../../regions/places'
import { PROVINCE } from '../../regions/provinces'
import { Province } from '../../regions/provinces/types'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { SHAPER_REGIONS } from '../regions'

const claimCell = (cell: Cell, province: Province) => {
  cell.province = province.idx
  province.land += cell.isWater ? 0 : 1
  province.mountains += cell.isMountains ? 1 : 0
  if (!cell.isWater) {
    if (!province.islands[cell.landmark]) province.islands[cell.landmark] = 0
    province.islands[cell.landmark] += 1
    province.cells.land.push(cell.idx)
  } else if (window.world.landmarks[cell.landmark].type === 'ocean') {
    province.ocean += cell.isWater ? 1 : 0
  } else {
    if (!province.lakes[cell.landmark]) province.lakes[cell.landmark] = 0
    province.lakes[cell.landmark] += 1
  }
}
export const URBANIZATION = PERFORMANCE.profile.wrapper({
  label: 'URBANIZATION',
  o: {
    _assignProvinces: () => {
      // city provinces
      // each city will be responsible for a "province" (collections of cells)
      // fill queue with all settlements to start
      const queue = window.world.provinces.map(province => {
        const { cell } = province
        claimCell(window.world.cells[cell], province)
        return window.world.cells[cell]
      })
      while (queue.length > 0) {
        // grab the next item in the queue
        const poly = queue.shift()
        CELL.neighbors(poly).forEach(n => {
          // expand the location's province if unclaimed
          if (n.province === -1 && n.region === poly.region) {
            claimCell(n, window.world.provinces[poly.province])
            queue.push(n)
          } else if (n.province !== -1 && !n.isMountains && n.province !== poly.province) {
            const type = n.isCoast || poly.isCoast ? 'sea' : 'land'
            const [p1, p2] = [CELL.province(n), CELL.province(poly)]
            const coastal = PROVINCE.coastal(p1) && PROVINCE.coastal(p2)
            const validTrade = type !== 'sea' || coastal
            const desolate = PROVINCE.region(p1).desolate || PROVINCE.region(p2).desolate
            if (validTrade && !desolate) {
              p1.trade[type][p2.idx] = -1
              p2.trade[type][p1.idx] = -1
            }
          }
        })
      }
      // final populations
      const cellArea = WORLD.cell.area()
      window.world.regions.forEach(region => {
        REGION.provinces(region).forEach(province => {
          province.population =
            province.cells.land.reduce((sum, i) => {
              const cell = window.world.cells[i]
              const mod = cell.isMountains ? 0.1 : 0.9
              return sum + CLIMATE.holdridge[cell.climate].habitability * mod
            }, 0) *
            cellArea *
            45
        })
      })
    },
    _checkIslands: () => {
      // make sure there are no isolated island cities
      // iterate through all islands
      WORLD.features('land').forEach(i => {
        // get all cities located on the island
        const cities = window.world.provinces
          .map(city => PROVINCE.cell(city))
          .filter(poly => poly.landmark === i)
        if (cities.length > 0) {
          const ports = cities.filter(c => c.beach)
          // make sure there is at least one port on each island where there are cities
          if (ports.length < 1) {
            // find closest city to the ocean
            const closest = cities.reduce(
              (min, c) => (c.oceanDist < min.oceanDist ? c : min),
              cities[0]
            )
            // find closest ocean cell to that city
            const coast = WORLD.land()
              .filter(p => p.beach && p.landmark === i)
              .sort((a, b) => {
                const distA = POINT.distance.geo({ points: [a, closest] })
                const distB = POINT.distance.geo({ points: [b, closest] })
                return distA - distB
              })[0]
            // move the city
            const place = CELL.place(closest)
            PLACE.coastal.move(place, coast)
          }
        }
      })
    },
    _settlements: () => {
      const base = 2400
      const count = Math.floor(base * WORLD.placement.ratio())
      const spacing = WORLD.placement.spacing.provinces
      const regionSettlements: Record<string, Cell[]> = {}
      // compute geography scores & count land
      window.world.regions.forEach(region => {
        regionSettlements[region.idx] = [window.world.cells[region.capital]]
      })
      WORLD.land().forEach(poly => {
        const climate = CLIMATE.holdridge[poly.climate]
        // biome penalty
        poly.score += climate.habitability
        poly.score += window.dice.uniform(-0.5, 0.5)
        if (poly.isMountains) poly.score -= 1
        if (poly.isCoast) poly.score += 0.5
        if (poly.roads.land.length > 0) poly.score += 3
        if (poly.coastal) poly.score += 0.5
      })
      // place towns based on cell scores
      const { provinces } = window.world
      WORLD.placement
        .close({
          count,
          spacing,
          whitelist: WORLD.land()
            .filter(poly => !poly.isMountains && !CELL.place(poly))
            .sort((a, b) => b.score - a.score),
          blacklist: provinces.map(province => PROVINCE.cell(province))
        })
        .forEach(town => {
          PROVINCE.spawn({ cell: town })
          regionSettlements[town.region].push(town)
        })
      // make sure there are no large empty spaces
      const currProvinces = window.world.provinces.map(t => PROVINCE.cell(t))
      window.world.regions
        .filter(region => REGION.climate(region).latitude !== 'polar')
        .forEach(region => {
          const land = SHAPER_REGIONS.land[region.idx].length
          const settlements = regionSettlements[region.idx].length
          const quota = Math.round(land / 50 - settlements)
          if (quota > 0) {
            WORLD.placement
              .close({
                count: quota,
                spacing,
                whitelist: SHAPER_REGIONS.land[region.idx]
                  .filter(poly => !CELL.place(poly))
                  .sort((a, b) => b.score - a.score),
                blacklist: currProvinces
              })
              .forEach(town => {
                PROVINCE.spawn({ cell: town })
                currProvinces.push(town)
              })
          }
        })
    },
    build: () => {
      URBANIZATION._settlements()
      URBANIZATION._checkIslands()
      URBANIZATION._assignProvinces()
    }
  }
})
