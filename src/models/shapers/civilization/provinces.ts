import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { PLACEMENT } from '../../cells/placement'
import { Cell } from '../../cells/types'
import { PROVINCE } from '../../provinces'
import { HUB } from '../../provinces/hubs'
import { Province } from '../../provinces/types'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { SHAPER_MOUNTAINS } from '../continents/mountains'
import { DEVELOPMENT_SPREAD } from './development'

const claimCell = (cell: Cell, province: Province) => {
  cell.province = province.idx
  province.land += cell.isWater ? 0 : 1
  province.mountains += cell.isMountains ? 1 : 0
  province.cells.push(cell.idx)
  if (!cell.isWater) {
    if (!province.islands[cell.landmark]) province.islands[cell.landmark] = 0
    province.islands[cell.landmark] += 1
  } else if (window.world.landmarks[cell.landmark].type === 'ocean') {
    province.ocean += cell.isWater ? 1 : 0
  } else {
    if (!province.lakes[cell.landmark]) province.lakes[cell.landmark] = 0
    province.lakes[cell.landmark] += 1
  }
  if (cell.location !== undefined) {
    window.world.locations[cell.location].province = province.idx
    if (!province.locations.includes(cell.location)) province.locations.push(cell.location)
  }
}

const desolation = (province: Province) => {
  const climate = PROVINCE.climate(province)
  if (climate === 'arctic' || climate === 'infernal' || climate === 'chaotic') {
    province.desolate = true
  } else if (climate === 'subarctic') {
    province.desolate = PROVINCE.neighbors({ province, unpopulated: true }).some(
      p => PROVINCE.climate(p) === 'arctic'
    )
  }
}
export const PROVINCE_SHAPER = PERFORMANCE.profile.wrapper({
  label: 'PROVINCE_SHAPER',
  o: {
    _assignProvinces: () => {
      // city provinces
      // each city will be responsible for a "province" (collections of cells)
      // fill queue with all settlements to start
      const queue = window.world.provinces.map(province => {
        const loc = window.world.cells[province.cell]
        claimCell(loc, province)
        return loc
      })
      const { boundaries } = SHAPER_MOUNTAINS
      while (queue.length > 0) {
        // grab the next item in the queue
        const curr = queue.shift()
        const province = window.world.provinces[curr.province]
        CELL.neighbors({ cell: curr }).forEach(n => {
          // expand the location's province if unclaimed
          if (boundaries[n.idx] !== boundaries[curr.idx] && n.isMountains) return
          if (n.province === -1) {
            claimCell(n, province)
            queue.push(n)
          } else if (n.province !== -1 && n.province !== curr.province) {
            const [p1, p2] = [window.world.provinces[n.province], province]
            if (!p1.neighbors.includes(p2.idx)) p1.neighbors.push(p2.idx)
            if (!p2.neighbors.includes(p1.idx)) p2.neighbors.push(p1.idx)
          }
        })
      }
      window.world.provinces.forEach(desolation)
    },
    _checkIslands: () => {
      // make sure there are no isolated island cities
      // iterate through all islands
      GEOGRAPHY.landmarks('land').forEach(i => {
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
            const coast = GEOGRAPHY.land()
              .filter(p => p.beach && p.landmark === i)
              .sort((a, b) => {
                const distA = POINT.distance.geo({ points: [a, closest] })
                const distB = POINT.distance.geo({ points: [b, closest] })
                return distA - distB
              })[0]
            // move the city
            const place = CELL.place(closest)
            HUB.coastal.move(place, coast)
          }
        }
      })
    },
    _provinces: () => {
      const base = 2500
      const count = Math.floor(base * PLACEMENT.ratio())
      const spacing = PLACEMENT.spacing.provinces
      // compute geography scores & count land
      const land = GEOGRAPHY.land()
      land.forEach(poly => {
        if (poly.isCoast) poly.score += 10
        if (poly.river !== undefined) poly.score += 10
      })
      PLACEMENT.run({
        count,
        spacing,
        whitelist: land.filter(cell => !cell.isMountains).sort((a, b) => b.score - a.score),
        tag: 'provinces'
      }).map(PROVINCE.spawn)
      // make sure everything is coastal where possible
      window.world.provinces.map(PROVINCE.hub).forEach(HUB.coastal.set)
    },
    build: () => {
      PROVINCE_SHAPER._provinces()
      PROVINCE_SHAPER._checkIslands()
      PROVINCE_SHAPER._assignProvinces()
      DEVELOPMENT_SPREAD.init()
      DEVELOPMENT_SPREAD.run()
      // PROVINCE_SHAPER._corruption()
    }
  }
})
