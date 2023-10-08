import { mean, range, scaleLinear, scalePow } from 'd3'

import { REGION } from '../../../regions'
import { PROVINCE } from '../../../regions/provinces'
import { HUB } from '../../../regions/provinces/hubs'
import { MATH } from '../../../utilities/math'
import { POINT } from '../../../utilities/math/points'
import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { CLIMATE } from '../../climate'
import { RegionAddBordersParams, RegionBorders, RemoveLakeParams } from './types'

const mountainsCutoff = 0.5

const addBorder = ({ borders, r1, r2, c1, c2 }: RegionAddBordersParams) => {
  if (!borders[r1.idx][r2.idx]) borders[r1.idx][r2.idx] = new Set()
  borders[r1.idx][r2.idx].add(c2)
  if (!borders[r2.idx][r1.idx]) borders[r2.idx][r1.idx] = new Set()
  borders[r2.idx][r1.idx].add(c1)
}

const removeLake = ({ lakes, lake }: RemoveLakeParams) => {
  const lakeCells = lakes.filter(cell => cell.landmark === lake)
  const shallow = lakeCells.find(cell => cell.shallow)
  const { landmark } = CELL.neighbors(shallow).find(cell => cell.landmark !== lake)
  lakeCells.forEach(cell => {
    cell.landmark = landmark
    cell.isWater = false
    cell.shallow = false
    cell.h = window.world.seaLevelCutoff
    REGIONAL.land[cell.region].push(cell)
    CELL.neighbors(cell)
      .filter(n => !n.isWater)
      .forEach(n => {
        const coast = CELL.neighbors(n).filter(p => p.isWater)
        n.isCoast = coast.length > 0
      })
  })
  delete window.world.landmarks[lake]
  window.world.landmarks[landmark].size += lakeCells.length
}

const land: Record<number, Cell[]> = {}

export const REGIONAL = PERFORMANCE.profile.wrapper({
  label: 'REGIONAL',
  o: {
    _capitals: () => {
      // base land scores for city placement
      WORLD.land().forEach(poly => {
        // prefer lower elevations
        poly.score = (1 - poly.h) * 5 + (poly.beach ? 1 : 0)
      })
      // place the regional capitals
      const base = 300
      const count = Math.floor(base * WORLD.placementRatio())
      const capitals = WORLD.placement({
        count,
        spacing: 0.1,
        whitelist: WORLD.land().sort((a, b) => b.score - a.score)
      }).filter(poly => window.world.landmarks[poly.landmark])
      capitals.forEach(poly => {
        REGION.spawn(poly)
        REGIONAL.land[poly.region] = []
      })
      capitals.forEach(poly => {
        REGIONAL.land[poly.region] = []
        PROVINCE.spawn({ cell: poly, capital: true })
      })
    },
    _climates: () => {
      window.world.regions.forEach(region => {
        // const capital = window.world.provinces[region.capital]
        // const cell = PROVINCE.cell(capital)
        // region.coastal = cell.coastal
        // const land = REGIONAL.land[region.idx]
        // const coasts = land.filter(cell => cell.coastal)
        // const east = coasts.filter(cell => cell.oceanCurrent === 'E').length
        // const west = coasts.filter(cell => cell.oceanCurrent === 'W').length
        // const inland = !region.coastal
        // region.regional.land = land.length
        // region.regional.mountains = land.filter(c => c.isMountains).length
        // const latitude = Math.abs(WORLD.gps(cell).latitude)
        // const { type, monsoon } = window.world.landmarks[cell.landmark]
        // const continent = type === 'continent'
        // CLIMATE.classify({
        //   region,
        //   location: inland ? 'inland' : east > west ? 'east_coast' : 'west_coast',
        //   continent,
        //   monsoon,
        //   latitude
        // })
        region.climate = 'oceanic'
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
      window.world.provinces.forEach(loc => {
        HUB.moveToCoast(loc.hub)
      })
    },
    _currents: () => () => {
      const east = [window.world.diagram.find(window.world.dim.w, window.world.dim.h / 2)].map(
        i => {
          const cell = window.world.cells[i]
          cell.oceanCurrent = 'E'
          return cell
        }
      )
      const west = [window.world.diagram.find(0, window.world.dim.h / 2)].map(i => {
        const cell = window.world.cells[i]
        cell.oceanCurrent = 'W'
        return cell
      })
      const queue = [...east, ...west]
      while (queue.length > 0) {
        // grab the next item in the queue
        const poly = queue.shift()
        CELL.neighbors(poly)
          .filter(n => !n.oceanCurrent)
          .forEach(n => {
            n.oceanCurrent = poly.oceanCurrent
            if (n.isWater || n.coastal) queue.push(n)
          })
      }
    },
    _mountains: (mountainProspects: RegionBorders) => {
      WORLD.land()
        .filter(p => p.isMountains)
        .forEach(p => (p.isMountains = false))
      const lakes = WORLD.water().filter(cell => !cell.ocean)
      const total = Math.floor(WORLD.land().length * 0.4)
      let mounts = 0
      const prospects = window.dice.shuffle(
        window.world.regions.filter(r => Object.keys(mountainProspects[r.idx]).length > 0)
      )
      const used: Record<string, boolean> = {}
      while (mounts < total && prospects.length > 0) {
        const region = prospects.pop()
        if (used[region.idx]) continue
        const [n, borders] = Object.entries(mountainProspects[region.idx])
          .filter(([n]) => !used[n])
          .reduce(
            (max: [string, Set<number>], [n, cells]) => {
              return max[1].size > cells.size ? max : [n, cells]
            },
            ['-1', new Set()]
          )
        if (borders.size < 1) continue
        used[region.idx] = true
        used[n] = true
        Array.from(borders).forEach(i => {
          const cell = window.world.cells[i]
          if (cell.isWater) removeLake({ lakes, lake: cell.landmark })
          const high =
            window.world.landmarks[cell.landmark].type === 'continent' && window.dice.flip
              ? borders.size > 20
                ? 1.05
                : 0.95
              : borders.size > 20
              ? 0.95
              : 0.75
          const queue = [{ cell, h: high }]
          while (queue.length > 0 && mounts < total) {
            const { cell: curr, h } = queue.pop()
            curr.h = h
            curr.isMountains = curr.h > mountainsCutoff
            mounts += 1
            queue.push(
              ...CELL.neighbors(curr)
                .filter(c => !c.isWater && !c.isCoast && !c.isMountains)
                .map(c => ({ cell: c, h: borders.has(c.idx) ? high : h - 0.1 }))
                .filter(c => c.h > mountainsCutoff)
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
      land.forEach(l => {
        const { oceanDist, mountainDist } = l
        if (mountainDist > 0) {
          const total = oceanDist + mountainDist
          l.h = MATH.scaleExp(
            [0, total],
            [window.world.seaLevelCutoff, mountainsCutoff],
            total - mountainDist,
            2
          )
        } else {
          l.h = MATH.scaleExp(
            [0, islandScale],
            [window.world.seaLevelCutoff, mountainsCutoff],
            oceanDist,
            2
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
        window.world.mountains.push(0)
        // floodfill all connecting mountain cells to mark a mountain range
        while (queue.length > 0) {
          // grab the next item in the queue
          const current = window.world.cells[queue.shift()]
          // mark it with the current mountain feature index
          current.mountain = idx
          window.world.mountains[idx] += 1
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
    _lakes: () => {
      const lakes = WORLD.water().filter(cell => !cell.ocean)
      const shallow = lakes.filter(cell => cell.shallow)
      WORLD.features('water')
        .filter(idx => window.world.landmarks[idx].type !== 'ocean')
        .forEach(landmark => {
          const border = shallow.filter(cell => cell.landmark === landmark)
          const arid = border.some(
            cell => CLIMATE.lookup[window.world.regions[cell.region].climate].arid
          )
          const mountainous = border.some(cell => CELL.neighbors(cell).some(n => n.isMountains))
          if (arid || mountainous) removeLake({ lakes, lake: landmark })
        })
      WORLD.reshape()
    },
    _rain: () => {
      const wet = 40
      const east = [window.world.diagram.find(window.world.dim.w, window.world.dim.h / 2)].map(
        i => {
          const cell = window.world.cells[i]
          cell.e = wet
          return cell
        }
      )
      let queue = [...east]
      const eVisits = new Set<number>()
      const rain = (n: Cell, _rain: number, wind: Cell) => {
        let rain = _rain
        if (n.beach && wind.ocean) {
          const latitude = Math.abs(WORLD.gps(n).latitude)
          rain = latitude < 15 ? rain + 10 : latitude < 20 ? rain + 5 : rain
        }
        return Math.max(
          !n.isWater
            ? Math.max(
                window.world.mountains[n.mountain] > 100 ? Math.floor(rain * 0.8) : rain - 1,
                0
              )
            : Math.min(rain + 0.5, wet),
          n.e ?? 0
        )
      }
      while (queue.length > 0) {
        // grab the next item in the queue
        const poly = queue.shift()
        CELL.neighbors(poly).forEach(n => {
          const val = rain(n, poly.e, poly)
          const edge = false // n.isWater && n.edge
          if ((!eVisits.has(n.idx) || val > n.e) && (edge || POINT.directionH(poly, n) === 'W')) {
            n.e = val
            eVisits.add(n.idx)
            queue.push(n)
          }
        })
      }
      const west = [window.world.diagram.find(0, window.world.dim.h / 2)].map(i => {
        const cell = window.world.cells[i]
        cell.w = wet
        return cell
      })
      queue = [...west]
      const wVisits = new Set<number>()
      while (queue.length > 0) {
        // grab the next item in the queue
        const poly = queue.shift()
        CELL.neighbors(poly).forEach(n => {
          const val = rain(n, poly.w, poly)
          const edge = false // n.isWater && n.edge
          if ((!wVisits.has(n.idx) || val > n.w) && (edge || POINT.directionH(poly, n) === 'E')) {
            n.w = val
            wVisits.add(n.idx)
            queue.push(n)
          }
        })
      }
      const dry = {
        east: scaleLinear([0, 35, 90], [1, 1, 0]),
        west: scaleLinear([0, 45, 90], [1, 1, 0])
      }
      WORLD.land().forEach(cell => {
        const { latitude } = WORLD.gps(cell)
        // trade winds (summer)
        if (latitude > -5 && latitude < 25) {
          cell.summerRain = cell.e ?? 0
        }
        // trade winds (winter)
        if (latitude < 5 && latitude > -25) {
          cell.winterRain = cell.e ?? 0
        }
        const north = latitude >= 0
        const summer = north ? 1 : 0.8
        const winter = north ? 0.8 : 1
        const lat = Math.abs(latitude)
        // westerlies (summer)
        const westL = dry.west(lat)
        if (lat > 40) {
          if (north) cell.summerRain = (cell.w ?? 0) * summer * westL
          else cell.winterRain = (cell.w ?? 0) * winter * westL
        }
        // westerlies (winter)
        if (lat > 30) {
          if (north) cell.winterRain = (cell.w ?? 0) * winter * westL
          else cell.summerRain = (cell.w ?? 0) * summer * westL
        }
        // storm fronts
        if (lat >= 25) {
          const eastL = dry.east(lat)
          cell.summerRain = Math.max((cell.e ?? 0) * summer * eastL, cell.summerRain ?? 0)
          cell.winterRain = Math.max((cell.e ?? 0) * winter * eastL, cell.winterRain ?? 0)
        }
        cell.summerRain /= wet
        cell.winterRain /= wet
      })
      // smoothing
      range(3).forEach(() => {
        WORLD.land().forEach(cell => {
          const n = CELL.neighbors(cell).filter(cell => !cell.isWater)
          const summer = [cell.summerRain, ...n.map(n => n.summerRain ?? 0)]
          cell.summerRain = mean(summer)
          const winter = [cell.winterRain, ...n.map(n => n.winterRain ?? 0)]
          cell.winterRain = mean(winter)
        })
      })
    },
    _heat: () => {
      WORLD.land().forEach(cell => {
        const lat = Math.abs(cell.y)
        // let key: keyof typeof heat.summer | keyof typeof heat.winter = 'normal'
        // if (cell.coastal) {
        //   const hot = (cell.e > cell.w && lat < 40) || (cell.w > cell.e && lat > 30)
        //   const mild = (lat > 60 && hot) || (cell.e > cell.w && lat >= 40 && lat <= 50)
        //   key = mild ? 'mild' : hot ? 'hot' : 'cold'
        // }
        const elevation = WORLD.heightToKM(cell.h) * 6.5
        // cell.heat = { s: heat.summer[key](lat) - elevation, w: heat.winter[key](lat) - elevation }
        const exp = 1.5
        cell.heat = { w: 0, s: 0 }
        cell.heat.w = scalePow().exponent(exp).domain([0, 90]).range([30, -28])(lat) - elevation
        cell.heat.s = scalePow().exponent(exp).domain([0, 90]).range([30, 4])(lat) - elevation
        if (cell.y < 0) cell.heat = { w: cell.heat.s, s: cell.heat.w }
      })
      // smoothing
      range(1).forEach(() => {
        WORLD.land().forEach(cell => {
          const n = CELL.neighbors(cell).filter(cell => !cell.isWater && !cell.isMountains)
          const summer = [cell.heat.s, ...n.map(n => n.heat.s)]
          cell.heat.s = mean(summer)
          const winter = [cell.heat.w, ...n.map(n => n.heat.w)]
          cell.heat.w = mean(winter)
        })
      })
    },
    _climate: () => {
      WORLD.land().forEach(cell => {
        const { latitude } = WORLD.gps(cell)
        const tropical = mean([cell.heat.s, cell.heat.w]) >= 18
        const north = latitude >= 0
        const winterRain = north ? cell.winterRain : cell.summerRain
        const summerRain = north ? cell.summerRain : cell.winterRain
        const winterHeat = north ? cell.heat.w : cell.heat.s
        const summerHeat = north ? cell.heat.s : cell.heat.w
        if (winterHeat <= 0) {
          cell.climate = winterHeat > -10 ? 'polar' : 'ice cap'
        } else if (summerRain < 0.25 && winterRain < 0.25) {
          cell.climate = tropical ? 'hot desert' : 'cold desert'
        } else if (summerRain < 0.5 && winterRain < 0.5) {
          cell.climate = tropical ? 'hot steppe' : 'cold steppe'
        } else if (tropical) {
          cell.climate =
            summerRain > 0.5 && winterRain > 0.5
              ? 'tropical rainforest'
              : winterRain > 0.25
              ? 'tropical monsoon'
              : 'savanna'
        } else if (summerHeat >= 10 && winterHeat < 18 && summerRain < 0.5 && winterRain > 0.5) {
          cell.climate = 'mediterranean'
        } else if (summerHeat >= 18 && winterHeat < 18 && summerRain > 0.5) {
          cell.climate = winterRain > 0.5 ? 'subtropical' : 'temperate monsoon'
        } else if (summerHeat >= 10 && winterHeat < 10 && summerRain > 0.5 && winterRain > 0.5) {
          cell.climate = 'oceanic'
        } else if (summerHeat >= 10 && winterHeat < 10 && winterRain < 0.5) {
          cell.climate = 'laurentian'
        } else if (winterRain < 0.5) {
          cell.climate = 'subarctic'
        } else {
          cell.climate = 'none'
        }
      })
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
            if (!n.isWater) REGIONAL.land[region.idx].push(n)
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
      })
    },
    build: () => {
      const mountainProspects: RegionBorders = {}
      const regionBorders: RegionBorders = {}
      REGIONAL._capitals()
      REGIONAL._spheres(mountainProspects, regionBorders)
      REGIONAL._mountains(mountainProspects)
      REGIONAL._climates()
      REGIONAL._lakes()
      REGIONAL._coastlines()
      REGIONAL._finalize(regionBorders)
      // REGIONAL._rain()
      REGIONAL._heat()
      // REGIONAL._climate()
    },
    land
  }
})
