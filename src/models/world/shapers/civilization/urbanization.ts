import { range } from 'd3'

import { CULTURE } from '../../../npcs/cultures'
import { REGION } from '../../../regions'
import { PROVINCE } from '../../../regions/provinces'
import { HUB } from '../../../regions/provinces/hubs'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { POINT } from '../../../utilities/math/points'
import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { CLIMATE } from '../../climate'
import { REGIONAL } from '../regions'

const developmentPopulation = (dev: Region['development']) => {
  if (dev === 'civilized') return 1
  if (dev === 'frontier') return 0.75
  if (dev === 'tribal') return 0.5
  return 0.25
}

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
    _assignProvinces: (provinceNeighbors: Record<number, Set<number>>) => {
      // city provinces
      // each city will be responsible for a "province" (collections of cells)
      // fill queue with all settlements to start
      const queue = window.world.provinces.map(province => {
        const { cell } = province.hub
        claimCell(window.world.cells[cell], province)
        provinceNeighbors[province.idx] = new Set()
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
            const coastal = p1.hub.coastal && p2.hub.coastal
            if (type !== 'sea' || coastal) {
              p1.trade[type][p2.idx] = -1
              p2.trade[type][p1.idx] = -1
            }
            if (type !== 'sea') {
              provinceNeighbors[p1.idx].add(p2.idx)
              provinceNeighbors[p2.idx].add(p1.idx)
            }
          }
        })
      }
      // final populations
      const { cellArea } = window.world.dim
      window.world.regions.forEach(region => {
        const culture = window.world.cultures[region.culture]
        const dev = developmentPopulation(region.development)
        const climate = CLIMATE.lookup[region.climate]
        REGION.provinces(region).forEach(province => {
          province.population = Math.floor(climate.population * province.land * cellArea * dev) * 35
        })
        CULTURE.culturize(culture, region)
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
                const distA = POINT.distance({ points: [a, closest] })
                const distB = POINT.distance({ points: [b, closest] })
                return distA - distB
              })[0]
            // move the city
            const { hub } = CELL.province(closest)
            HUB.move(hub, coast)
          }
        }
      })
    },
    _demographics: (provinces: Record<number, Province[]>) => {
      // go through each region and finalize the cities
      Object.values(window.world.regions).forEach(region => {
        const capital = window.world.provinces[region.capital]
        // find all settlements in the region
        const cities = REGION.provinces(region)
        // find all cities in the region
        const major = provinces[region.idx]
        // find all towns in the region
        const towns = cities.filter(town => !major.includes(town) && !town.capital)
        // set the capital's population
        const capitalMod = window.dice.uniform(0.02, 0.03)
        let pop = REGION.population(region) * capitalMod
        if ((region.civilized && pop < 10000) || (!region.civilized && pop > 15000))
          pop = window.dice.uniform(10000, 15000)
        HUB.setPopulation(capital.hub, pop)
        // set the next largest city
        pop = Math.round(pop * window.dice.uniform(0.2, 0.6))
        major.concat(towns).forEach(province => {
          const urban = pop > 300 ? pop : window.dice.randint(50, 300)
          HUB.setPopulation(province.hub, urban)
          // make each city's population some fraction of the previous city's population
          pop = Math.round(pop * (1 - window.dice.uniform(0.2, 0.5)))
        })
      })
    },
    _environment: () => {
      window.world.provinces.forEach(province => {
        province.environment = {
          terrain: PROVINCE.terrain(province),
          climate: PROVINCE.climate(province)
        }
      })
    },
    _majorHubs: (params: {
      provinceNeighbors: Record<number, Set<number>>
      provinces: Record<number, Province[]>
    }) => {
      const { provinceNeighbors, provinces } = params
      // TODO: medium roads connecting cities
      // selects towns to become cities
      const majors = Object.values(window.world.regions).reduce(
        (dict: Record<string, boolean>, r) => {
          dict[window.world.provinces[r.capital].idx] = true
          return dict
        },
        {}
      )
      // iterate through all regions
      Object.values(window.world.regions).forEach(region => {
        provinces[region.idx] = []
        // get all the towns in the region
        const towns = window.world.provinces.filter(
          city => city.region === region.idx && !city.capital
        )
        // sort towns by score
        const cells = towns.map(town => PROVINCE.cell(town)).sort((a, b) => b.score - a.score)
        // spread cities apart
        const majorCount = ~~(towns.length / 3)
        range(majorCount).forEach(() => {
          // find towns that are not too close to other cities
          const prospect = cells.findIndex(cell => {
            const province = window.world.provinces[cell.province]
            return Array.from(provinceNeighbors[province.idx]).every(n => !majors[n])
          })
          // add them as major cities
          if (prospect !== -1) {
            const province = window.world.provinces[cells[prospect].province]
            majors[province.idx] = true
            provinces[region.idx].push(province)
            cells.splice(prospect, 1)
          }
        })
      })
    },
    _settlements: () => {
      const base = 2500
      const count = Math.floor(base * WORLD.placementRatio())
      const spacing = 0.023
      const regionSettlements: Record<string, Cell[]> = {}
      // compute geography scores & count land
      window.world.regions.forEach(region => {
        regionSettlements[region.idx] = [window.world.cells[region.capital]]
      })
      WORLD.land().forEach(poly => {
        const region = window.world.regions[poly.region]
        const climate = CLIMATE.lookup[region.climate]
        // biome penalty
        poly.score -= climate.scorePenalty
        poly.score += window.dice.uniform(-0.5, 0.5)
        if (poly.isMountains) poly.score -= 1
        if (poly.isCoast) poly.score += 0.5
        if (poly.roads.land.length > 0) poly.score += 3
        if (poly.coastal && climate.scorePenalty < 1.25) poly.score += 0.5
      })
      // place towns based on cell scores
      const { provinces } = window.world
      WORLD.placement({
        count,
        spacing,
        whitelist: WORLD.land()
          .filter(poly => !CELL.isHub(poly))
          .sort((a, b) => b.score - a.score),
        blacklist: provinces.map(province => PROVINCE.cell(province))
      }).forEach(town => {
        PROVINCE.spawn({ cell: town })
        regionSettlements[town.region].push(town)
      })
      // make sure there are no large empty spaces
      const currProvinces = window.world.provinces.map(t => PROVINCE.cell(t))
      window.world.regions
        .filter(region => region.climate !== 'polar')
        .forEach(region => {
          const land = REGIONAL.land[region.idx].length
          const settlements = regionSettlements[region.idx].length
          const quota = Math.round(land / 50 - settlements)
          if (quota > 0) {
            WORLD.placement({
              count: quota,
              spacing,
              whitelist: REGIONAL.land[region.idx]
                .filter(poly => !CELL.isHub(poly))
                .sort((a, b) => b.score - a.score),
              blacklist: currProvinces
            }).forEach(town => {
              PROVINCE.spawn({ cell: town })
              currProvinces.push(town)
            })
          }
        })
    },
    build: () => {
      const provinces: Record<number, Province[]> = {}
      const provinceNeighbors: Record<number, Set<number>> = {}
      URBANIZATION._settlements()
      URBANIZATION._checkIslands()
      URBANIZATION._assignProvinces(provinceNeighbors)
      URBANIZATION._majorHubs({ provinceNeighbors, provinces })
      URBANIZATION._demographics(provinces)
      URBANIZATION._environment()
    }
  }
})
