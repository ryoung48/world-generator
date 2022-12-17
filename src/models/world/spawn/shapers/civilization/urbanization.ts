import { range } from 'd3'

import { culture__culturize } from '../../../../npcs/cultures'
import { region__population } from '../../../../regions'
import { location__moveToCoast } from '../../../../regions/locations/spawn'
import { location__setPopulation } from '../../../../regions/locations/spawn/taxonomy/settlements'
import { province__cell, province__hub } from '../../../../regions/provinces'
import { province__spawn } from '../../../../regions/provinces/spawn'
import { Province } from '../../../../regions/provinces/types'
import { Region } from '../../../../regions/types'
import { point__distance } from '../../../../utilities/math/points'
import { world__landFeatures } from '../../..'
import { cell__isHub, cell__neighbors, cell__province } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { climates } from '../../../climate/types'
import { Shaper } from '..'

const developmentPopulation = (dev: Region['development']) => {
  if (dev === 'civilized') return 1
  if (dev === 'frontier') return 0.75
  if (dev === 'tribal') return 0.5
  return 0.25
}

const province__moveHub = (hub: number, cell: ExteriorCell) => {
  const location = window.world.locations[hub]
  location.cell = cell.idx
  const oldCell = window.world.cells[location.cell]
  const oldProvinceIdx = oldCell.province
  oldCell.province = cell.province
  cell.province = oldProvinceIdx
  location.coastal = true
  location__moveToCoast(location)
}

const placeSettlements = () => {
  const count = 3600
  const spacing = (window.world.dim.w + window.world.dim.h) * 0.0028
  const regionSettlements: Record<string, ExteriorCell[]> = {}
  // compute geography scores & count land
  window.world.regions.forEach(region => {
    regionSettlements[region.idx] = [window.world.cells[region.capital]]
  })
  Shaper.land.forEach(poly => {
    const region = window.world.regions[poly.region]
    const climate = climates[region.climate]
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
  Shaper.placeLocs({
    count,
    spacing,
    whitelist: Shaper.coreCells(Shaper.land, spacing)
      .filter(poly => !cell__isHub(poly))
      .sort((a, b) => b.score - a.score),
    blacklist: provinces.map(province => province__cell(province))
  }).forEach(town => {
    province__spawn({ cell: town })
    regionSettlements[town.region].push(town)
  })
  // make sure there are no large empty spaces
  const currProvinces = window.world.provinces.map(t => province__cell(t))
  window.world.regions
    .filter(region => region.climate !== 'polar')
    .forEach(region => {
      const land = Shaper.regionLand[region.idx].length
      const settlements = regionSettlements[region.idx].length
      const quota = Math.round(land / 50 - settlements)
      if (quota > 0) {
        Shaper.placeLocs({
          count: quota,
          spacing,
          whitelist: Shaper.regionLand[region.idx]
            .filter(poly => !cell__isHub(poly))
            .sort((a, b) => b.score - a.score),
          blacklist: currProvinces
        }).forEach(town => {
          province__spawn({ cell: town })
          currProvinces.push(town)
        })
      }
    })
}

// make sure there are no isolated island cities
const checkIslands = () => {
  // iterate through all islands
  world__landFeatures().forEach(i => {
    // get all cities located on the island
    const cities = window.world.provinces
      .map(city => province__cell(city))
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
        const coast = Shaper.land
          .filter(p => p.beach && p.landmark === i)
          .sort((a, b) => {
            const distA = point__distance({ points: [a, closest] })
            const distB = point__distance({ points: [b, closest] })
            return distA - distB
          })[0]
        // move the city
        const { hub } = cell__province(closest)
        province__moveHub(hub, coast)
      }
    }
  })
}

const claimCell = (cell: ExteriorCell, city: Province) => {
  cell.province = city.idx
  city.land += cell.isWater ? 0 : 1
  city.mountains += cell.isMountains ? 1 : 0
  if (!cell.isWater) {
    if (!city.islands[cell.landmark]) city.islands[cell.landmark] = 0
    city.islands[cell.landmark] += 1
  } else if (window.world.landmarks[cell.landmark].type === 'ocean') {
    city.ocean += cell.isWater ? 1 : 0
  }
}

const assignProvinces = (provinceNeighbors: Record<number, Set<number>>) => {
  // city provinces
  // each city will be responsible for a "province" (collections of cells)
  // fill queue with all settlements to start
  const queue = window.world.provinces.map(province => {
    const { cell } = province__hub(province)
    claimCell(window.world.cells[cell], province)
    provinceNeighbors[province.idx] = new Set()
    return window.world.cells[cell]
  })
  while (queue.length > 0) {
    // grab the next item in the queue
    const poly = queue.shift()
    cell__neighbors(poly).forEach(n => {
      // expand the location's province if unclaimed
      if (n.province === -1 && n.region === poly.region) {
        claimCell(n, window.world.provinces[poly.province])
        queue.push(n)
      } else if (n.province !== -1 && !n.isMountains && n.province !== poly.province) {
        const type = n.ocean || poly.ocean ? 'sea' : 'land'
        const [n1, n2] = [cell__province(n), cell__province(poly)]
        n1.trade[type][n2.idx] = -1
        n2.trade[type][n1.idx] = -1
        provinceNeighbors[n1.idx].add(n2.idx)
        provinceNeighbors[n2.idx].add(n1.idx)
      }
    })
  }
  // final populations
  const { cellArea } = window.world.dim
  window.world.regions.forEach(region => {
    const culture = window.world.cultures[region.culture.ruling]
    const dev = developmentPopulation(region.development)
    const climate = climates[region.climate]
    region.provinces
      .map(t => window.world.provinces[t])
      .forEach(province => {
        province.population = Math.floor(climate.population * province.land * cellArea * dev) * 20
      })
    culture__culturize(culture, region)
  })
}

const majorCities = (params: {
  provinceNeighbors: Record<number, Set<number>>
  provinces: Record<number, Province[]>
}) => {
  const { provinceNeighbors, provinces } = params
  // TODO: medium roads connecting cities
  // selects towns to become cities
  const majors = Object.values(window.world.regions).reduce((dict: Record<string, boolean>, r) => {
    dict[window.world.provinces[r.capital].idx] = true
    return dict
  }, {})
  // iterate through all regions
  Object.values(window.world.regions).forEach(region => {
    provinces[region.idx] = []
    // get all the towns in the region
    const towns = window.world.provinces.filter(city => city.nation === region.idx && !city.capital)
    // sort towns by score
    const cells = towns.map(town => province__cell(town)).sort((a, b) => b.score - a.score)
    // spread cities apart
    const majorCount = ~~(towns.length / 3)
    range(majorCount).forEach(() => {
      // find towns that are not too close to other cities
      const prospect = cells.findIndex(cell => {
        const province = window.world.provinces[cell.province]
        return (
          !cell.isMountains && Array.from(provinceNeighbors[province.idx]).every(n => !majors[n])
        )
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
}

const demographics = (provinces: Record<number, Province[]>) => {
  // go through each region and finalize the cities
  Object.values(window.world.regions).forEach(region => {
    const capital = window.world.provinces[region.capital]
    // find all settlements in the region
    const cities = region.provinces.map(t => window.world.provinces[t])
    // find all cities in the region
    const major = provinces[region.idx]
    // find all towns in the region
    const towns = cities.filter(town => !major.includes(town) && !town.capital)
    // set the capital's population
    const capitalMod = window.dice.uniform(0.02, 0.03) - (region.civilized ? 0 : 0.005)
    let pop = region__population(region) * capitalMod
    if (region.civilized && pop < 10000) pop = window.dice.uniform(10000, 15000)
    location__setPopulation(province__hub(capital), pop)
    // set the next largest city
    pop = Math.round(pop * window.dice.norm(0.5, 0.1))
    major.concat(towns).forEach(province => {
      const urban = pop > 300 ? pop : window.dice.randint(50, 300)
      location__setPopulation(province__hub(province), urban)
      // make each city's population some fraction of the previous city's population
      pop = Math.round(pop * window.dice.norm(0.8, 0.05))
    })
  })
}

export const urbanization = () => {
  const provinces: Record<number, Province[]> = {}
  const provinceNeighbors: Record<number, Set<number>> = {}
  placeSettlements()
  checkIslands()
  assignProvinces(provinceNeighbors)
  majorCities({ provinceNeighbors: provinceNeighbors, provinces })
  demographics(provinces)
}
