import { region__spawn } from '../../../../regions'
import { province__cell, province__spawn } from '../../../../regions/provinces'
import { Region } from '../../../../regions/types'
import { cell__neighbors } from '../../../cells'
import { mountainsCutoff } from '../../../types'
import { Shaper } from '..'
import { regional__climates } from './climate'
import { regional__coastalEdges } from './coasts'
import { regional__mountainousBorders } from './mountains'

type RegionBorders = Record<number, Record<number, Set<number>>>
const addBorder = (params: {
  borders: RegionBorders
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
  private capitalSpacing = 0.012
  private mountainProspects: Record<number, Record<number, Set<number>>> = {}
  private regionBorders: Record<number, Record<number, Set<number>>> = {}
  get pipeline() {
    return [
      { name: 'Capital City Placement', action: this.placeCapitals },
      { name: 'Regional Spheres', action: this.regionalSpheres },
      {
        name: 'Mountainous Borders',
        action: () => regional__mountainousBorders(this.mountainProspects)
      },
      { name: 'Regional Climates', action: () => regional__climates() },
      { name: 'Regional Coastlines', action: () => regional__coastalEdges() },
      { name: 'Regional Borders', action: this.finalizeBorders }
    ]
  }
  private placeCapitals() {
    // base land scores for city placement
    Shaper.land.forEach(poly => {
      // prefer lower elevations
      poly.score = (1 - poly.h) * 5 + (poly.beach ? 1 : 0)
    })
    const spacing = (window.world.dim.w + window.world.dim.h) * this.capitalSpacing
    // place the regional capitals
    const capitals = Shaper.placeLocs({
      count: 250 * 2,
      spacing,
      whitelist: Shaper.coreCells(Shaper.land, spacing)
        .filter(poly => poly.h < mountainsCutoff)
        .sort((a, b) => b.score - a.score)
    })
    capitals
      .filter(poly => window.world.landmarks[poly.landmark])
      .forEach(poly => {
        region__spawn(poly)
        Shaper.regionLand[poly.region] = []
        province__spawn({ cell: poly, capital: true })
      })
  }
  private regionalSpheres() {
    window.world.regions.forEach(region => {
      this.mountainProspects[region.idx] = {}
      this.regionBorders[region.idx] = {}
    })
    const queue = window.world.provinces
      .filter(province => province.capital)
      .map(province => province__cell(province))
    // use capital cities to start the regional floodfill
    while (queue.length > 0) {
      // grab the next item in the queue
      const poly = queue.shift()
      const region = window.world.regions[poly.region]
      if (!region) continue
      // get the regional power
      let power = 0.75
      if (poly.isMountains) {
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
              if (!n.isWater) Shaper.regionLand[region.idx].push(n)
              queue.push(n)
            } else if (n.region !== poly.region) {
              n.regionBorder = true
              poly.regionBorder = true
              const guest = window.world.regions[n.region]
              addBorder({
                borders: this.regionBorders,
                r1: region,
                r2: guest,
                c1: poly.idx,
                c2: n.idx
              })
              if (!n.ocean && !n.beach) {
                addBorder({
                  borders: this.mountainProspects,
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
  private finalizeBorders() {
    window.world.regions.forEach(region => {
      const landBorders = new Set<number>()
      const borders = new Set<number>()
      Object.entries(this.regionBorders[region.idx]).forEach(([n, cells]) => {
        const guest = window.world.regions[parseInt(n)]
        Array.from(cells).forEach(i => {
          const cell = window.world.cells[i]
          borders.add(guest.idx)
          if (
            !cell.isWater &&
            !cell.isMountains &&
            cell__neighbors(cell).some(n => n.region === region.idx && !n.isMountains && !n.isWater)
          ) {
            landBorders.add(guest.idx)
          }
        })
      })
      region.borders = Array.from(borders)
      region.landBorders = Array.from(landBorders)
    })
  }
}
