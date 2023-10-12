import { mean, range, scaleLinear } from 'd3'

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
    cell.h = WORLD.elevation.seaLevel
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
            borders.size > 10
              ? window.dice.uniform(0.8, WORLD.elevation.max)
              : window.dice.uniform(0.65, 0.8)
          const queue = [{ cell, h: high }]
          while (queue.length > 0 && mounts < total) {
            const { cell: curr, h } = queue.pop()
            curr.h = h
            curr.isMountains = curr.h > WORLD.elevation.mountains
            mounts += 1
            queue.push(
              ...CELL.neighbors(curr)
                .filter(c => !c.isWater && !c.isCoast && !c.isMountains)
                .map(c => ({ cell: c, h: borders.has(c.idx) ? high : h - 0.1 }))
                .filter(c => c.h > WORLD.elevation.mountains)
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
            [WORLD.elevation.seaLevel, WORLD.elevation.mountains],
            total - mountainDist,
            2
          )
        } else {
          l.h = MATH.scaleExp(
            [0, islandScale],
            [WORLD.elevation.seaLevel, WORLD.elevation.mountains],
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
      const wet = 30
      const ocean = WORLD.water().filter(cell => cell.ocean && !cell.shallow)
      const affected = window.world.cells.filter(cell => cell.shallow || !cell.ocean)
      const assignRain = (attr: 'east' | 'west') => {
        const wind = attr === 'east' ? 'W' : 'E'
        const visited = new Set<number>()
        ocean.forEach(cell => {
          cell.rain[attr] = wet
          visited.add(cell.idx)
        })
        const queue = [...ocean]
        while (queue.length > 0) {
          const cell = queue.shift()
          const rain = Math.max(
            Math.min(
              Math.max(cell.rain[attr], 0) +
                (cell.ocean ? 1 : cell.isWater ? 0 : cell.isMountains ? -2 : -1),
              wet
            ),
            0
          )
          const neighbors = CELL.neighbors(cell).filter(
            n =>
              (!visited.has(n.idx) || (!n.isWater && rain > n.rain[attr])) &&
              POINT.direction(cell, n) === wind
          )
          neighbors.forEach(n => {
            queue.push(n)
            n.rain[attr] = rain
            visited.add(n.idx)
          })
        }
        range(1).forEach(() => {
          affected.forEach(cell => {
            cell.rain[attr] = mean(
              CELL.neighbors(cell)
                .concat([cell])
                .filter(n => n.rain[attr] >= 0 && (n.shallow || !n.ocean))
                .map(n => n.rain[attr])
            )
            if (isNaN(cell.rain[attr])) cell.rain[attr] = 0
          })
        })
      }
      assignRain('east')
      assignRain('west')
      WORLD.land().forEach(cell => {
        const latitude = cell.y
        const east = Math.max(cell.rain.east, 0)
        const west = Math.max(cell.rain.west, 0)
        // trade winds (summer)
        if (latitude > -5 && latitude < 25) {
          cell.rain.summer = east
        }
        // trade winds (winter)
        if (latitude < 5 && latitude > -25) {
          cell.rain.winter = east
        }
        const north = latitude >= 0
        const summer = north ? 1 : 0.6
        const winter = north ? 0.6 : 1
        const lat = Math.abs(latitude)
        // westerlies (summer)
        if (lat > 40) {
          if (north) cell.rain.summer = west * summer
          else cell.rain.winter = west * winter
        }
        // westerlies (winter)
        const oceanic = lat >= 40 && lat <= 60
        if (lat > 30) {
          if (north) cell.rain.winter = west * (oceanic ? summer : winter)
          else cell.rain.summer = west * (oceanic ? winter : summer)
        }
        // polar storm fronts
        if (lat >= 25) {
          cell.rain.summer = Math.max(east * summer, cell.rain.summer, 0)
          cell.rain.winter = Math.max(east * winter, cell.rain.winter, 0)
        }
        cell.rain.east /= wet
        cell.rain.west /= wet
        cell.rain.summer /= wet
        cell.rain.winter /= wet
        if (cell.rain.summer < 0) cell.rain.summer = 0
        if (cell.rain.winter < 0) cell.rain.winter = 0
      })
      range(3).forEach(() => {
        WORLD.land().forEach(cell => {
          cell.rain.summer = mean(
            CELL.neighbors(cell)
              .concat([cell])
              .filter(n => n.rain.summer >= 0 && !n.isWater)
              .map(n => n.rain.summer)
          )
          cell.rain.winter = mean(
            CELL.neighbors(cell)
              .concat([cell])
              .filter(n => n.rain.winter >= 0 && !n.isWater)
              .map(n => n.rain.winter)
          )
        })
      })
    },
    _heat: () => {
      // Constants for the sinusoidal function
      const { temperature } = WORLD
      const delta = {
        summer: (temperature.summer[0] - temperature.summer[1]) / 2,
        winter: (temperature.winter[0] - temperature.winter[1]) / 2
      }
      const base = {
        summer: (temperature.summer[0] + temperature.summer[1]) / 2,
        winter: (temperature.winter[0] + temperature.winter[1]) / 2
      }
      const B = Math.PI / 90
      // Sinusoidal function to estimate temperature
      const temperatureCurve = (A: number, baseTemp: number, lat: number) => {
        return A * Math.cos(B * lat) + baseTemp
      }

      const currentMod = scaleLinear()
        .domain([0, 5, 20, 35, 50, 60, 70, 80, 90])
        .range([0, 0, 0.5, 0, 0.5, 1, 0.5, 0, 0])
      const coastal = WORLD.distance.coastal()
      const continental = WORLD.cell.scale() * 25
      const continentMod = scaleLinear().domain([0, 90]).range([0, 1])
      WORLD.land().forEach(cell => {
        const lat = Math.abs(cell.y)
        const east = cell.rain.east > cell.rain.west
        const key = lat > 30 ? (east ? 'cold' : 'hot') : east ? 'hot' : 'cold'
        const current = (key === 'hot' ? 1 : -1) * currentMod(lat) * 0
        const extreme = continentMod(lat) * 0
        const summerMod = scaleLinear()
          .domain([0, coastal, continental])
          .range([key === 'hot' ? 0 : current, 0, extreme])(cell.oceanDist)
        const winterMod = scaleLinear()
          .domain([0, coastal, continental])
          .range([current, 0, -extreme])(cell.oceanDist)
        const elevation = WORLD.heightToKM(cell.h) * 6.5
        cell.heat = { winter: 0, summer: 0 }
        cell.heat.winter = temperatureCurve(delta.winter, base.winter, lat) - elevation + winterMod
        cell.heat.summer = temperatureCurve(delta.summer, base.summer, lat) - elevation + summerMod
        if (cell.y < 0) cell.heat = { winter: cell.heat.summer, summer: cell.heat.winter }
      })
      // smoothing
      range(1).forEach(() => {
        WORLD.land().forEach(cell => {
          const n = CELL.neighbors(cell).filter(cell => !cell.isWater && !cell.isMountains)
          const summer = [cell.heat.summer, ...n.map(n => n.heat.summer)]
          cell.heat.summer = mean(summer)
          const winter = [cell.heat.winter, ...n.map(n => n.heat.winter)]
          cell.heat.winter = mean(winter)
        })
      })
    },
    _climate: () => {
      const domain = 2
      const rainRanges = {
        arctic: [62.5, 125, 250, 500],
        subarctic: [62.5, 125, 250, 500, 1000],
        boreal: [62.5, 125, 250, 500, 1000, 2000],
        cool: [62.5, 125, 250, 500, 1000, 2000, 4000],
        warm: [62.5, 125, 250, 500, 1000, 2000, 4000, 6000],
        subtropical: [62.5, 125, 250, 500, 1000, 2000, 4000, 6000, 8000],
        tropical: [62.5, 125, 250, 500, 1000, 2000, 4000, 6000, 8000, 10000]
      }
      const scale = (key: keyof typeof rainRanges) =>
        scaleLinear()
          .domain(MATH.scaleDiscrete(rainRanges[key].length).map(i => i * domain))
          .range(rainRanges[key])
      const arctic = scale('arctic')
      const subarctic = scale('subarctic')
      const boreal = scale('boreal')
      const cool = scale('cool')
      const warm = scale('warm')
      const subtropical = scale('subtropical')
      const tropical = scale('tropical')
      WORLD.land().forEach(cell => {
        const averageHeat = mean([cell.heat.winter, cell.heat.summer])
        const region =
          averageHeat > 24
            ? tropical
            : averageHeat > 18
            ? subtropical
            : averageHeat > 12
            ? warm
            : averageHeat > 2
            ? cool
            : averageHeat > -5
            ? boreal
            : averageHeat > -12
            ? subarctic
            : arctic
        cell.rain.winter += 0.01
        cell.rain.summer += 0.01
        const rain = region(cell.rain.winter + cell.rain.summer)
        const ratio = cell.rain.summer / cell.rain.winter
        cell.rain.winter = rain / ((1 + ratio) * 6)
        cell.rain.summer = ratio * cell.rain.winter
        if (region === tropical) {
          if (rain > 8000) cell.climate = 'rain forest (tropical)'
          else if (rain > 4000) cell.climate = 'wet forest (tropical)'
          else if (rain > 2000) cell.climate = 'moist forest (tropical)'
          else if (rain > 1000) cell.climate = 'dry forest (tropical)'
          else if (rain > 500) cell.climate = 'very dry forest (tropical)'
          else if (rain > 250) cell.climate = 'thorn woodland (tropical)'
          else if (rain > 125) cell.climate = 'desert scrub (tropical)'
          else cell.climate = 'desert (tropical)'
        } else if (region === subtropical) {
          if (rain > 4000) cell.climate = 'rain forest (subtropical)'
          else if (rain > 2000) cell.climate = 'wet forest (subtropical)'
          else if (rain > 1000) cell.climate = 'moist forest (subtropical)'
          else if (rain > 500) cell.climate = 'dry forest (subtropical)'
          else if (rain > 250) cell.climate = 'thorn steppe (subtropical)'
          else if (rain > 125) cell.climate = 'desert scrub (subtropical)'
          else cell.climate = 'desert (subtropical)'
        } else if (region === warm) {
          if (rain > 4000) cell.climate = 'rain forest (warm temperate)'
          else if (rain > 2000) cell.climate = 'wet forest (warm temperate)'
          else if (rain > 1000) cell.climate = 'moist forest (warm temperate)'
          else if (rain > 500) cell.climate = 'dry forest (warm temperate)'
          else if (rain > 250) cell.climate = 'thorn steppe (warm temperate)'
          else if (rain > 125) cell.climate = 'desert scrub (warm temperate)'
          else cell.climate = 'desert (warm temperate)'
        } else if (region === cool) {
          if (rain > 2000) cell.climate = 'rain forest (cool temperate)'
          else if (rain > 1000) cell.climate = 'wet forest (cool temperate)'
          else if (rain > 500) cell.climate = 'moist forest (cool temperate)'
          else if (rain > 250) cell.climate = 'steppe (cool temperate)'
          else if (rain > 125) cell.climate = 'desert scrub (cool temperate)'
          else cell.climate = 'desert (cool temperate)'
        } else if (region === boreal) {
          if (rain > 1000) cell.climate = 'rain forest (boreal)'
          else if (rain > 500) cell.climate = 'wet forest (boreal)'
          else if (rain > 250) cell.climate = 'moist forest (boreal)'
          else if (rain > 125) cell.climate = 'dry scrub (boreal)'
          else cell.climate = 'desert (boreal)'
        } else if (region === subarctic) {
          if (rain > 500) cell.climate = 'rain tundra (subarctic)'
          else if (rain > 250) cell.climate = 'wet tundra (subarctic)'
          else if (rain > 125) cell.climate = 'moist tundra (subarctic)'
          else cell.climate = 'dry tundra (subarctic)'
        } else {
          cell.climate = 'desert (arctic)'
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
      REGIONAL._rain()
      REGIONAL._heat()
      REGIONAL._climate()
    },
    land
  }
})
