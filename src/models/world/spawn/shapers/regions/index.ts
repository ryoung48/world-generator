import { region__spawn } from '../../../../regions'
import { province__cell } from '../../../../regions/provinces'
import { province__spawn } from '../../../../regions/provinces/spawn'
import { Region } from '../../../../regions/types'
import { cell__neighbors } from '../../../cells'
import { mountains_cutoff } from '../../../types'
import { Shaper } from '..'
import { regional__climates } from './climate'
import { regional__coastal_edges } from './coasts'
import { regional__mountainous_borders } from './mountains'

type region_borders = Record<number, Record<number, Set<number>>>
const add_border = (params: {
  borders: region_borders
  r1: Region
  r2: Region
  c1: number
  c2: number
}) => {
  const { borders, r1, r2, c1, c2 } = params
  if (!borders[r1.idx][r2.idx]) borders[r1.idx][r2.idx] = new Set()
  borders[r1.idx][r2.idx].add(c2)
  if (!borders[r2.idx][r1.idx]) borders[r2.idx][r1.idx] = new Set()
  borders[r2.idx][r1.idx].add(c1)
}

export class RegionalShaper extends Shaper {
  // minimum space between capital cities
  private capital_spacing = 0.018
  private mountain_prospects: Record<number, Record<number, Set<number>>> = {}
  private region_borders: Record<number, Record<number, Set<number>>> = {}
  get pipeline() {
    return [
      { name: 'Capital City Placement', action: this.place_capitals },
      { name: 'Regional Spheres', action: this.regional_spheres },
      {
        name: 'Mountainous Borders',
        action: () => regional__mountainous_borders(this.mountain_prospects)
      },
      { name: 'Regional Climates', action: () => regional__climates() },
      { name: 'Regional Coastlines', action: () => regional__coastal_edges() },
      { name: 'Regional Borders', action: this.finalize_borders }
    ]
  }
  private place_capitals() {
    // base land scores for city placement
    Shaper.land.forEach(poly => {
      // prefer lower elevations
      poly.score = (1 - poly.h) * 5 + (poly.beach ? 1 : 0)
    })
    const spacing = (window.world.dim.w + window.world.dim.h) * this.capital_spacing
    // place the regional capitals
    const capitals = Shaper.place_locs({
      count: 250,
      spacing,
      whitelist: Shaper.core_cells(Shaper.land, spacing)
        .filter(poly => poly.h < mountains_cutoff)
        .sort((a, b) => b.score - a.score)
    })
    capitals
      .filter(poly => window.world.landmarks[poly.landmark])
      .forEach(poly => {
        region__spawn(poly)
        Shaper.region_land[poly.region] = []
        province__spawn({ cell: poly, capital: true })
      })
  }
  private regional_spheres() {
    window.world.regions.forEach(region => {
      this.mountain_prospects[region.idx] = {}
      this.region_borders[region.idx] = {}
    })
    const queue = window.world.provinces
      .filter(province => province.regional_capital)
      .map(province => province__cell(province))
    // use capital cities to start the regional floodfill
    while (queue.length > 0) {
      // grab the next item in the queue
      const poly = queue.shift()
      const region = window.world.regions[poly.region]
      if (!region) continue
      // get the regional power
      let power = 0.75
      if (poly.is_mountains) {
        power /= 15 // penalty for crossing mountains
      }
      if (poly.shallow) {
        power /= 30 // penalty for crossing water
      }
      // skip cell if power is insufficient
      if (window.dice.random < power) {
        // otherwise process neighbors
        poly.n
          .map(n => window.world.cells[n])
          .forEach(n => {
            // claim neighbor if not claimed
            if (n.region === -1) {
              n.region = region.idx
              if (!n.is_water) Shaper.region_land[region.idx].push(n)
              queue.push(n)
            } else if (n.region !== poly.region) {
              n.region_border = true
              poly.region_border = true
              const guest = window.world.regions[n.region]
              add_border({
                borders: this.region_borders,
                r1: region,
                r2: guest,
                c1: poly.idx,
                c2: n.idx
              })
              if (!n.ocean && !n.beach) {
                add_border({
                  borders: this.mountain_prospects,
                  r1: region,
                  r2: guest,
                  c1: poly.idx,
                  c2: n.idx
                })
              }
            }
          })
      } else {
        queue.push(poly)
      }
    }
  }
  private finalize_borders() {
    window.world.regions.forEach(region => {
      const land_borders = new Set<number>()
      const borders = new Set<number>()
      Object.entries(this.region_borders[region.idx]).forEach(([n, cells]) => {
        const guest = window.world.regions[parseInt(n)]
        Array.from(cells).forEach(i => {
          const cell = window.world.cells[i]
          borders.add(guest.idx)
          if (
            !cell.is_water &&
            !cell.is_mountains &&
            cell__neighbors(cell).some(
              n => n.region === region.idx && !n.is_mountains && !n.is_water
            )
          ) {
            land_borders.add(guest.idx)
          }
        })
      })
      region.borders = Array.from(borders)
      region.land_borders = Array.from(land_borders)
    })
  }
}
