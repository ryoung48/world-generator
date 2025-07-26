import { mean, range, scaleLinear, scalePow, scaleThreshold } from 'd3'

import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { LAKES } from '../../cells/geography/lakes'
import { Cell } from '../../cells/types'
import { EBM } from '../../cells/weather/ebm'
import { RAIN } from '../../cells/weather/rain'
import { TEMPERATURE } from '../../cells/weather/temperature'
import { MATH } from '../../utilities/math'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'

const HEAT_CLASSIFICATION = {
  arctic: -30,
  subarctic: -18,
  boreal: -10,
  cool: 3,
  warm: 12,
  subtropical: 18,
  tropical: 24,
  infernal: 35
}

const humidity = RAIN.thresholds.annual

const vegetation = {
  tropical: scaleThreshold<number, Cell['vegetation']>()
    .domain([
      humidity.parched,
      humidity.arid,
      humidity.dry,
      humidity.low,
      humidity.moderate,
      humidity.moist,
      humidity.wet,
      humidity.humid
    ])
    .range(['desert', 'desert', 'sparse', 'grasslands', 'woods', 'woods', 'forest', 'jungle']),
  subtropical: scaleThreshold<number, Cell['vegetation']>()
    .domain([
      humidity.parched,
      humidity.arid,
      humidity.dry,
      humidity.low,
      humidity.moderate,
      humidity.moist,
      humidity.wet
    ])
    .range(['desert', 'desert', 'sparse', 'grasslands', 'woods', 'woods', 'forest']),
  warm: scaleThreshold<number, Cell['vegetation']>()
    .domain([
      humidity.parched,
      humidity.arid,
      humidity.dry,
      humidity.low,
      humidity.moderate,
      humidity.moist,
      humidity.wet
    ])
    .range(['desert', 'sparse', 'grasslands', 'grasslands', 'woods', 'woods', 'forest']),
  cool: scaleThreshold<number, Cell['vegetation']>()
    .domain([
      humidity.parched,
      humidity.arid,
      humidity.dry,
      humidity.low,
      humidity.moderate,
      humidity.moist
    ])
    .range(['desert', 'sparse', 'grasslands', 'grasslands', 'woods', 'forest']),
  boreal: scaleThreshold<number, Cell['vegetation']>()
    .domain([humidity.parched, humidity.arid, humidity.dry, humidity.low, humidity.moderate])
    .range(['desert', 'sparse', 'grasslands', 'woods', 'forest']),
  subarctic: scaleThreshold<number, Cell['vegetation']>()
    .domain([humidity.parched, humidity.arid, humidity.dry, humidity.low])
    .range(['desert', 'sparse', 'sparse', 'sparse'])
}

function cosineInterpolate(y1: number, y2: number, mu: number): number {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2
  return y1 * (1 - mu2) + y2 * mu2
}

function createCosineInterpolator(domain: number[], range: number[]): (_x: number) => number {
  if (domain.length !== range.length) {
    throw new Error('Domain and range arrays must be of the same length.')
  }

  return (x: number): number => {
    if (x <= domain[0]) return range[0]
    if (x >= domain[domain.length - 1]) return range[range.length - 1]

    for (let i = 0; i < domain.length - 1; i++) {
      const x0 = domain[i]
      const x1 = domain[i + 1]
      if (x >= x0 && x <= x1) {
        const mu = (x - x0) / (x1 - x0)
        return cosineInterpolate(range[i], range[i + 1], mu)
      }
    }

    // This line should theoretically never be reached if domain is valid
    throw new Error('Interpolation failed: input out of bounds or domain improperly defined.')
  }
}

const seasonality = {
  equatorial: range(12).map(i =>
    createCosineInterpolator([0, 2, 6, 9, 11], [0.8, 1, 0.8, 1, 0.8])(i)
  ),
  savanna: range(12).map(i =>
    createCosineInterpolator([0, 2, 6, 9, 11], [0.02, 0.1, 0.5, 0.1, 0.02])(i)
  ),
  monsoon: range(12).map(i =>
    createCosineInterpolator([0, 2, 6, 9, 11], [0.05, 0.2, 1, 0.2, 0.05])(i)
  ),
  temperate: range(12).map(i => createCosineInterpolator([0, 6, 11], [0.4, 1, 0.4])(i)),
  arid: range(12).map(i => createCosineInterpolator([0, 6, 11], [0.05, 0.02, 0.05])(i)),
  mediterranean: range(12).map(i => createCosineInterpolator([0, 6, 11], [0.6, 0.02, 0.6])(i)),
  oceanic: range(12).map(i => createCosineInterpolator([0, 6, 11], [1, 0.6, 1])(i)),
  polar: range(12).map(i => createCosineInterpolator([0, 6, 11], [0.4, 1, 0.4])(i))
}

export const SHAPER_CLIMATES = PERFORMANCE.profile.wrapper({
  label: 'CLIMATES',
  o: {
    _lakes: () => {
      const lakes = LAKES.get()
      const shallow = lakes.filter(cell => cell.shallow)
      GEOGRAPHY.landmarks('water')
        .filter(idx => window.world.landmarks[idx].type !== 'ocean')
        .forEach(landmark => {
          const border = shallow.filter(cell => cell.landmark === landmark)
          const arid =
            border.filter(cell =>
              CELL.neighbors({ cell }).some(
                n => n.vegetation == 'sparse' || n.vegetation === 'desert'
              )
            ).length /
              border.length >
            0.8
          const mountainous = border.some(cell => CELL.neighbors({ cell }).some(n => n.isMountains))
          const arctic = border.some(cell =>
            CELL.neighbors({ cell }).some(n => n.climate === 'arctic' || n.climate === 'subarctic')
          )
          if (mountainous || arctic || arid) {
            LAKES.remove({ lakes, lake: landmark }).forEach(cell => {
              cell.h = GEOGRAPHY.elevation.compute(cell)
              cell.elevation = GEOGRAPHY.elevation.heightToKM(cell.h)
            })
          }
        })
      GEOGRAPHY.reshape()
    },
    _rain: () => {
      const wet = 25
      const ocean = GEOGRAPHY.water().filter(cell => cell.ocean && cell.landDist > 10)
      const affected = window.world.cells.filter(cell => cell.shallow || !cell.ocean)
      const _rain: Record<number, { east: number; west: number }> = {}
      const assignRain = (attr: 'east' | 'west') => {
        const wind = attr === 'east' ? 'W' : 'E'
        const visited = new Set<number>()
        ocean.forEach(cell => {
          cell.rain[attr] = wet
          _rain[cell.idx] = { east: wet, west: wet }
          visited.add(cell.idx)
        })
        const queue = [...ocean]
        while (queue.length > 0) {
          const cell = queue.shift()
          const impact = cell.ocean ? 0.2 : cell.isWater ? 0.1 : -0.5
          const rain = Math.max(Math.min(Math.max(_rain[cell.idx][attr], 0) + impact, wet), 0)
          const neighbors = CELL.neighbors({ cell }).filter(
            n =>
              (!visited.has(n.idx) || (!n.isWater && rain > n.rain[attr])) &&
              POINT.direction.geo(cell, n) === wind
          )
          neighbors.forEach(n => {
            queue.push(n)
            const diff = n.elevation - cell.elevation
            const lift = isNaN(diff) ? 0 : Math.max(0, diff * 1.5)
            n.rain[attr] = rain + lift
            if (_rain[n.idx] === undefined) _rain[n.idx] = { east: 0, west: 0 }
            _rain[n.idx][attr] = Math.max(0, rain - lift)
            visited.add(n.idx)
          })
        }
        range(1).forEach(() => {
          affected.forEach(cell => {
            cell.rain[attr] = mean(
              CELL.neighbors({ cell })
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
      const lakes = LAKES.get()
      const patterns = range(12).map(i => ({
        east: scaleLinear()
          .domain([5, 10, 10, 15, 25, 60, 70])
          .range([
            seasonality.equatorial[i],
            seasonality.equatorial[i],
            seasonality.monsoon[i],
            seasonality.savanna[i],
            seasonality.temperate[i],
            seasonality.temperate[i],
            seasonality.polar[i]
          ])
          .clamp(true),
        west: scaleLinear()
          .domain([5, 10, 10, 15, 20, 30, 35, 40, 45, 60, 60, 70])
          .range([
            seasonality.equatorial[i],
            seasonality.equatorial[i],
            seasonality.monsoon[i],
            seasonality.savanna[i],
            seasonality.arid[i],
            seasonality.arid[i],
            seasonality.mediterranean[i],
            seasonality.mediterranean[i],
            seasonality.oceanic[i],
            seasonality.oceanic[i],
            seasonality.polar[i],
            seasonality.polar[i]
          ])
          .clamp(true)
      }))
      PERFORMANCE.profile.apply({
        label: 'rain',
        f: () => {
          GEOGRAPHY.land()
            .concat(lakes)
            .forEach(cell => {
              const latitude = cell.y
              const lat = Math.abs(latitude)
              const exp = 5
              const total = cell.rain.east ** exp + cell.rain.west ** exp
              const e = total > 0 ? cell.rain.east ** exp / total : 0
              const w = total > 0 ? cell.rain.west ** exp / total : 1
              cell.rain.pattern = range(12).map(
                i => patterns[i].east(lat) * e + patterns[i].west(lat) * w
              )
              if (cell.y < 0) {
                const monthShift = 6
                cell.rain.pattern = cell.rain.pattern
                  .slice(-monthShift)
                  .concat(cell.rain.pattern.slice(0, cell.rain.pattern.length - monthShift))
              }
              // normalize rain
              cell.rain.east /= wet
              cell.rain.west /= wet
            })
        }
      })
    },
    _heat: () => {
      window.world.cells.forEach(cell => {
        cell.heat = { min: 0, max: 0, mean: 0 }
        cell.heat.min = TEMPERATURE.annual.min(cell)
        cell.heat.max = TEMPERATURE.annual.max(cell)
        cell.heat.mean = TEMPERATURE.annual.mean(cell)
      })
    },
    _climate: () => {
      const domain = 2
      const humidity = RAIN.thresholds.monthly
      const rainRanges = {
        arctic: [humidity.parched, humidity.arid, humidity.dry, humidity.low],
        subarctic: [humidity.parched, humidity.arid, humidity.dry, humidity.low, humidity.moderate],
        boreal: [
          humidity.parched,
          humidity.arid,
          humidity.dry,
          humidity.low,
          humidity.moderate,
          humidity.moist
        ],
        cool: [
          humidity.parched,
          humidity.arid,
          humidity.dry,
          humidity.low,
          humidity.moderate,
          humidity.moist,
          humidity.wet
        ],
        warm: [
          humidity.parched,
          humidity.arid,
          humidity.dry,
          humidity.low,
          humidity.moderate,
          humidity.moist,
          humidity.wet,
          humidity.humid
        ],
        subtropical: [
          humidity.parched,
          humidity.arid,
          humidity.dry,
          humidity.low,
          humidity.moderate,
          humidity.moist,
          humidity.wet,
          humidity.humid
        ],
        tropical: [
          humidity.parched,
          humidity.arid,
          humidity.dry,
          humidity.low,
          humidity.moderate,
          humidity.moist,
          humidity.wet,
          humidity.humid,
          humidity.saturated
        ]
      }
      const scale = (key: keyof typeof rainRanges) =>
        scaleLinear()
          .domain(MATH.scaleDiscrete(rainRanges[key].length).map(i => i * domain))
          .range(rainRanges[key])
      const distanceScale = scalePow().domain([0, 1800]).range([2.0, 0.1]).exponent(1).clamp(true)
      const arctic = scale('arctic')
      const subarctic = scale('subarctic')
      const boreal = scale('boreal')
      const cool = scale('cool')
      const warm = scale('warm')
      const subtropical = scale('subtropical')
      const tropical = scale('tropical')
      const lakes = LAKES.get()
      GEOGRAPHY.land()
        .concat(lakes)
        .forEach(cell => {
          const total = distanceScale(
            MATH.conversion.distance.miles.km(cell.oceanDist * window.world.cell.length)
          )
          const scale = scaleLinear()
            .domain([
              HEAT_CLASSIFICATION.arctic,
              HEAT_CLASSIFICATION.subarctic,
              HEAT_CLASSIFICATION.boreal,
              HEAT_CLASSIFICATION.cool,
              HEAT_CLASSIFICATION.warm,
              HEAT_CLASSIFICATION.subtropical,
              HEAT_CLASSIFICATION.tropical
            ])
            .range([
              arctic(total),
              subarctic(total),
              boreal(total),
              cool(total),
              warm(total),
              subtropical(total),
              tropical(total)
            ])
          const rain = scale(cell.heat.mean)
          cell.rain.pattern = cell.rain.pattern.map(i => i * rain)
          cell.rain.annual = cell.rain.pattern.reduce((a, b) => a + b, 0)
          const landmark = window.world.landmarks[cell.landmark]
          cell.monsoon =
            Math.abs(cell.y) < 30 &&
            Math.abs(cell.y) > 10 &&
            cell.rain.east > cell.rain.west &&
            landmark.type === 'continent' &&
            cell.beach
          SHAPER_CLIMATES.classify(cell)
        })
    },
    build: () => {
      SHAPER_CLIMATES._heat()
      SHAPER_CLIMATES._rain()
      SHAPER_CLIMATES._climate()
      SHAPER_CLIMATES._lakes()
    },
    classify: (cell: Cell) => {
      const rain = cell.rain.annual
      const chaotic =
        cell.heat.max >= EBM.constants.chaotic.max && cell.heat.min <= EBM.constants.chaotic.min
      const averageHeat = cell.heat.mean
      if (chaotic) {
        cell.vegetation = vegetation.boreal(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.tropical) {
        cell.climate = averageHeat > 35 ? 'infernal' : 'tropical'
        cell.vegetation = vegetation.tropical(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.subtropical) {
        cell.climate = 'subtropical'
        cell.vegetation = vegetation.subtropical(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.warm) {
        cell.climate = 'temperate'
        cell.vegetation = vegetation.warm(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.cool) {
        cell.climate = 'temperate'
        cell.vegetation = vegetation.cool(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.boreal) {
        cell.climate = 'boreal'
        cell.vegetation = vegetation.boreal(rain)
      } else if (averageHeat > HEAT_CLASSIFICATION.subarctic) {
        cell.climate = 'subarctic'
        cell.vegetation = vegetation.subarctic(rain)
      } else {
        cell.climate = 'arctic'
        cell.vegetation = 'desert'
      }
    }
  }
})
