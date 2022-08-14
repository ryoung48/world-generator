import { range } from 'd3'

import { culture__culturize } from '../../../../npcs/species/humanoids/cultures'
import { region__population } from '../../../../regions'
import { development_rank } from '../../../../regions/development'
import { region__optimal_wealth } from '../../../../regions/diplomacy/status'
import { location__move_to_coast } from '../../../../regions/locations/spawn'
import { location__set_population } from '../../../../regions/locations/spawn/taxonomy/settlements'
import { province__cell, province__hub } from '../../../../regions/provinces'
import { province__spawn } from '../../../../regions/provinces/spawn'
import { Province } from '../../../../regions/provinces/types'
import { point__distance } from '../../../../utilities/math/points'
import { world__land_features } from '../../..'
import { cell__is_hub, cell__neighbors, cell__province } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { climate_lookup, climates } from '../../../climate/types'
import { Shaper } from '..'

const development_population = (dev: development_rank) => {
  if (dev === 'civilized') return 1
  if (dev === 'frontier') return 0.75
  if (dev === 'tribal') return 0.5
  return 0.25
}

const province__move_hub = (hub: number, cell: ExteriorCell) => {
  const location = window.world.locations[hub]
  location.cell = cell.idx
  const old_cell = window.world.cells[location.cell]
  const old_province_idx = old_cell.province
  old_cell.province = cell.province
  cell.province = old_province_idx
  location.coastal = true
  location__move_to_coast(location)
}

const place_settlements = () => {
  const count = 3600
  const spacing = (window.world.dim.w + window.world.dim.h) * 0.0028
  const region_settlements: Record<string, ExteriorCell[]> = {}
  // compute geography scores & count land
  window.world.regions.forEach(region => {
    region_settlements[region.idx] = [window.world.cells[region.capital]]
  })
  Shaper.land.forEach(poly => {
    const region = window.world.regions[poly.region]
    const climate = climate_lookup[region.climate]
    // biome penalty
    poly.score -= climate.score_penalty
    poly.score += window.dice.uniform(-0.5, 0.5)
    if (poly.is_mountains) poly.score -= 1
    if (poly.is_coast) poly.score += 0.5
    if (poly.roads.land.length > 0) poly.score += 3
    if (poly.coastal && climate.score_penalty < 1.25) poly.score += 0.5
  })
  // place towns based on cell scores
  const { provinces } = window.world
  Shaper.place_locs({
    count,
    spacing,
    whitelist: Shaper.core_cells(Shaper.land, spacing)
      .filter(poly => !cell__is_hub(poly))
      .sort((a, b) => b.score - a.score),
    blacklist: provinces.map(province => province__cell(province))
  }).forEach(town => {
    province__spawn({ cell: town })
    region_settlements[town.region].push(town)
  })
  // make sure there are no large empty spaces
  const curr_provinces = window.world.provinces.map(t => province__cell(t))
  window.world.regions
    .filter(region => region.climate !== climates.POLAR)
    .forEach(region => {
      const land = Shaper.region_land[region.idx].length
      const settlements = region_settlements[region.idx].length
      const quota = Math.round(land / 50 - settlements)
      if (quota > 0) {
        Shaper.place_locs({
          count: quota,
          spacing,
          whitelist: Shaper.region_land[region.idx]
            .filter(poly => !cell__is_hub(poly))
            .sort((a, b) => b.score - a.score),
          blacklist: curr_provinces
        }).forEach(town => {
          province__spawn({ cell: town })
          curr_provinces.push(town)
        })
      }
    })
}

// make sure there are no isolated island cities
const check_islands = () => {
  // iterate through all islands
  world__land_features().forEach(i => {
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
          (min, c) => (c.ocean_dist < min.ocean_dist ? c : min),
          cities[0]
        )
        // find closest ocean cell to that city
        const coast = Shaper.land
          .filter(p => p.beach && p.landmark === i)
          .sort((a, b) => {
            const dist_a = point__distance({ points: [a, closest] })
            const dist_b = point__distance({ points: [b, closest] })
            return dist_a - dist_b
          })[0]
        // move the city
        const { hub } = cell__province(closest)
        province__move_hub(hub, coast)
      }
    }
  })
}

const claim_cell = (cell: ExteriorCell, city: Province) => {
  cell.province = city.idx
  city.land += cell.is_water ? 0 : 1
  city.mountains += cell.is_mountains ? 1 : 0
  if (!cell.is_water) {
    if (!city.lands[cell.landmark]) city.lands[cell.landmark] = 0
    city.lands[cell.landmark] += 1
  } else if (window.world.landmarks[cell.landmark].type === 'ocean') {
    city.ocean += cell.is_water ? 1 : 0
  } else {
    if (!city.lakes[cell.landmark]) city.lakes[cell.landmark] = 0
    city.lakes[cell.landmark] += 1
  }
}

const assign_provinces = (province_neighbors: Record<number, Set<number>>) => {
  // city provinces
  // each city will be responsible for a "province" (collections of cells)
  // fill queue with all settlements to start
  const queue = window.world.provinces.map(province => {
    const { cell } = province__hub(province)
    claim_cell(window.world.cells[cell], province)
    province_neighbors[province.idx] = new Set()
    return window.world.cells[cell]
  })
  while (queue.length > 0) {
    // grab the next item in the queue
    const poly = queue.shift()
    cell__neighbors(poly).forEach(n => {
      // expand the location's province if unclaimed
      if (n.province === -1 && n.region === poly.region) {
        claim_cell(n, window.world.provinces[poly.province])
        queue.push(n)
      } else if (n.province !== -1 && !n.is_mountains && n.province !== poly.province) {
        const type = n.ocean || poly.ocean ? 'sea' : 'land'
        const [n1, n2] = [cell__province(n), cell__province(poly)]
        n1.trade[type][n2.idx] = -1
        n2.trade[type][n1.idx] = -1
        province_neighbors[n1.idx].add(n2.idx)
        province_neighbors[n2.idx].add(n1.idx)
      }
    })
  }
  // final populations
  const { cell_area } = window.world.dim
  window.world.regions.forEach(region => {
    const culture = window.world.cultures[region.culture.ruling]
    const dev = development_population(region.development)
    const climate = climate_lookup[region.climate]
    region.provinces
      .map(t => window.world.provinces[t])
      .forEach(province => {
        province.population = Math.floor(climate.population * province.land * cell_area * dev) * 20
      })
    culture__culturize(culture, region)
  })
}

const major_cities = (params: {
  province_neighbors: Record<number, Set<number>>
  provinces: Record<number, Province[]>
}) => {
  const { province_neighbors, provinces } = params
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
    const towns = window.world.provinces.filter(
      city => city.curr_nation === region.idx && !city.regional_capital
    )
    // sort towns by score
    const cells = towns.map(town => province__cell(town)).sort((a, b) => b.score - a.score)
    // spread cities apart
    const major_count = ~~(towns.length / 3)
    range(major_count).forEach(() => {
      // find towns that are not too close to other cities
      const prospect = cells.findIndex(cell => {
        const province = window.world.provinces[cell.province]
        return (
          !cell.is_mountains && Array.from(province_neighbors[province.idx]).every(n => !majors[n])
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
    const towns = cities.filter(town => !major.includes(town) && !town.regional_capital)
    // set the capital's population
    const capital_mod = window.dice.uniform(0.02, 0.03) - (region.civilized ? 0 : 0.005)
    let pop = region__population(region) * capital_mod
    if (region.civilized && pop < 10000) pop = window.dice.uniform(10000, 15000)
    location__set_population(province__hub(capital), pop)
    // set the next largest city
    pop = Math.round(pop * window.dice.norm(0.5, 0.1))
    major.concat(towns).forEach(province => {
      const urban = pop > 300 ? pop : window.dice.randint(50, 300)
      location__set_population(province__hub(province), urban)
      // make each city's population some fraction of the previous city's population
      pop = Math.round(pop * window.dice.norm(0.8, 0.05))
    })
    // settlement wealth
    window.dice.shuffle(region.provinces.map(t => window.world.provinces[t])).forEach(c => {
      c.wealth = (30 * province__hub(c).population + c.population * 0.1) / 3000
    })
    region.max_wealth = region__optimal_wealth(region)
    region.wealth = region.max_wealth
  })
}

export const urbanization = () => {
  const provinces: Record<number, Province[]> = {}
  const province_neighbors: Record<number, Set<number>> = {}
  place_settlements()
  check_islands()
  assign_provinces(province_neighbors)
  major_cities({ province_neighbors, provinces })
  demographics(provinces)
}
