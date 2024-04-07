import { mean, range, scaleLinear } from 'd3'

import { WORLD } from '../..'
import { CELL } from '../../cells'
import { CLIMATE } from '../../cells/climate'
import { MATH } from '../../utilities/math'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { SHAPER_REGIONS } from '.'

export const SHAPER_CLIMATES = PERFORMANCE.profile.wrapper({
  label: 'CLIMATES',
  o: {
    _lakes: () => {
      const lakes = WORLD.lakes()
      const shallow = lakes.filter(cell => cell.shallow)
      WORLD.features('water')
        .filter(idx => window.world.landmarks[idx].type !== 'ocean')
        .forEach(landmark => {
          const border = shallow.filter(cell => cell.landmark === landmark)
          const arid = border.some(cell => {
            return CELL.neighbors(cell).some(n => {
              const biome = CLIMATE.holdridge[n.climate]
              return (
                biome.terrain === 'desert' ||
                biome.terrain === 'glacier' ||
                n.climate === 'dry tundra (subpolar)'
              )
            })
          })
          const mountainous = border.some(cell => CELL.neighbors(cell).some(n => n.isMountains))
          if (arid || mountainous)
            WORLD.removeLake({ lakes, lake: landmark, regional: SHAPER_REGIONS.land })
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
                (cell.ocean ? 1 : cell.isWater ? 0 : cell.isMountains ? -1.5 : -0.75),
              wet
            ),
            0
          )
          const neighbors = CELL.neighbors(cell).filter(
            n =>
              (!visited.has(n.idx) || (!n.isWater && rain > n.rain[attr])) &&
              POINT.direction.geo(cell, n) === wind
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
      const lakes = WORLD.lakes()
      const tropicsMod = scaleLinear().domain([5, 15]).range([1, 0]).clamp(true)
      const subtropicsMod = scaleLinear().domain([20, 25]).range([0, 1]).clamp(true)
      WORLD.land()
        .concat(lakes)
        .forEach(cell => {
          const latitude = cell.y
          const lat = Math.abs(latitude)
          const north = latitude >= 0
          const east = Math.max(cell.rain.east, 0)
          const west = Math.max(cell.rain.west, 0)
          // trade winds (summer)
          if (latitude > -5 && latitude < 25) {
            cell.rain.summer = east
          }
          if (latitude < -5 && latitude > -25) {
            cell.rain.summer = east * tropicsMod(lat)
          }
          // trade winds (winter)
          if (latitude < 5 && latitude > -25) {
            cell.rain.winter = east
          }
          if (latitude > 5 && latitude < 25) {
            cell.rain.winter = east * tropicsMod(lat)
          }
          const summer = north ? 1 : 0.5
          const winter = north ? 0.5 : 1
          // westerlies (summer)
          if (lat > 40) {
            if (north) cell.rain.summer = west * summer
            else cell.rain.winter = west * winter
          }
          // westerlies (winter)
          if (lat > 30) {
            if (north) cell.rain.winter = west * summer
            else cell.rain.summer = west * winter
          }
          // polar storm fronts
          if (lat >= 20) {
            const mod = subtropicsMod(lat)
            cell.rain.summer = Math.max(mod * east * summer, cell.rain.summer, 0)
            cell.rain.winter = Math.max(mod * east * winter, cell.rain.winter, 0)
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
      const temperatureCalc = (temperature: { summer: number[]; winter: number[] }) => {
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
        return {
          base,
          delta,
          curve: (A: number, baseTemp: number, lat: number) => {
            return A * Math.cos(B * lat) + baseTemp
          }
        }
      }

      const landTemp = temperatureCalc(WORLD.temperature.land)
      const seaTemp = temperatureCalc(WORLD.temperature.sea)

      const currentMod = scaleLinear()
        .domain([0, 20, 30, 40, 50, 60, 70, 80, 90])
        .range([0, 0, 0.5, 1, 1, 1, 0.5, 0, 0])
      window.world.cells.forEach(cell => {
        const lat = Math.abs(cell.y)
        const current = currentMod(lat)
        const summerMod = cell.ocean
          ? 0
          : scaleLinear()
              .domain([0, 0.25, 0.5, 0.75, 1])
              .range([4, 2, 0, -2 * current, -4 * current])(cell.rain.summer)
        const winterMod = cell.ocean
          ? 0
          : scaleLinear()
              .domain([0, 0.25, 0.5, 0.75, 1])
              .range([-4, -2, 0, 2 * current, 4 * current])(cell.rain.winter)
        const elevation = cell.isWater ? 0 : WORLD.heightToKM(cell.h) * 6.5
        cell.heat = { winter: 0, summer: 0 }
        const { curve, delta, base } = cell.ocean ? seaTemp : landTemp
        cell.heat.winter = curve(delta.winter, base.winter, lat) - elevation + winterMod
        cell.heat.summer = curve(delta.summer, base.summer, lat) - elevation + summerMod
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
      // sea ice extent adjustments
      window.world.oceanRegions.forEach(region => {
        const borders = region.borders.map(b => window.world.cells[b])
        const landFacing = borders.filter(b => b.shallow)
        const cell = window.world.cells[region.cell]
        const landMod = ((0 * landFacing.length) / borders.length) * (cell.y >= 0 ? 1 : -1)
        cell.heat.winter -= landMod
        cell.heat.summer += landMod
      })
    },
    _climate: () => {
      const domain = 2
      const humidity = {
        parched: 62.5,
        arid: 125,
        dry: 250,
        low: 500,
        moderate: 750,
        moist: 1000,
        wet: 1500,
        humid: 2000,
        saturated: 3000
      }
      const rainRanges = {
        arctic: [humidity.parched, humidity.arid, humidity.dry, humidity.low],
        subpolar: [humidity.parched, humidity.arid, humidity.dry, humidity.low, humidity.moderate],
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
      const arctic = scale('arctic')
      const subpolar = scale('subpolar')
      const boreal = scale('boreal')
      const cool = scale('cool')
      const warm = scale('warm')
      const subtropical = scale('subtropical')
      const tropical = scale('tropical')
      const lakes = WORLD.lakes()
      WORLD.land()
        .concat(lakes)
        .forEach(cell => {
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
              ? subpolar
              : arctic
          if (averageHeat <= -5) {
            cell.rain.winter *= 0.8
            cell.rain.summer *= 0.8
          }
          cell.rain.winter += 0.01
          cell.rain.summer += 0.01
          const rain = region(cell.rain.winter + cell.rain.summer)
          const ratio = cell.rain.summer / cell.rain.winter
          cell.rain.winter = rain / ((1 + ratio) * 6)
          cell.rain.summer = ratio * cell.rain.winter
          if (region === tropical) {
            if (rain > humidity.humid) cell.climate = 'rain forest (tropical)'
            else if (rain > humidity.wet) cell.climate = 'wet forest (tropical)'
            else if (rain > humidity.moist) cell.climate = 'moist forest (tropical)'
            else if (rain > humidity.moderate) cell.climate = 'dry forest (tropical)'
            else if (rain > humidity.low) cell.climate = 'very dry forest (tropical)'
            else if (rain > humidity.dry) cell.climate = 'thorn woodland (tropical)'
            else if (rain > humidity.arid) cell.climate = 'desert scrub (tropical)'
            else cell.climate = 'desert (tropical)'
          } else if (region === subtropical) {
            if (rain > humidity.wet) cell.climate = 'rain forest (subtropical)'
            else if (rain > humidity.moist) cell.climate = 'wet forest (subtropical)'
            else if (rain > humidity.moderate) cell.climate = 'moist forest (subtropical)'
            else if (rain > humidity.low) cell.climate = 'dry forest (subtropical)'
            else if (rain > humidity.dry) cell.climate = 'thorn steppe (subtropical)'
            else if (rain > humidity.arid) cell.climate = 'desert scrub (subtropical)'
            else cell.climate = 'desert (subtropical)'
          } else if (region === warm) {
            if (rain > humidity.wet) cell.climate = 'rain forest (warm temperate)'
            else if (rain > humidity.moist) cell.climate = 'wet forest (warm temperate)'
            else if (rain > humidity.moderate) cell.climate = 'moist forest (warm temperate)'
            else if (rain > humidity.low) cell.climate = 'dry forest (warm temperate)'
            else if (rain > humidity.dry) cell.climate = 'thorn steppe (warm temperate)'
            else if (rain > humidity.arid) cell.climate = 'desert scrub (warm temperate)'
            else cell.climate = 'desert (warm temperate)'
          } else if (region === cool) {
            if (rain > humidity.moist) cell.climate = 'rain forest (cool temperate)'
            else if (rain > humidity.moderate) cell.climate = 'wet forest (cool temperate)'
            else if (rain > humidity.low) cell.climate = 'moist forest (cool temperate)'
            else if (rain > humidity.dry) cell.climate = 'steppe (cool temperate)'
            else if (rain > humidity.arid) cell.climate = 'desert scrub (cool temperate)'
            else cell.climate = 'desert (cool temperate)'
          } else if (region === boreal) {
            if (rain > humidity.moderate) cell.climate = 'rain forest (boreal)'
            else if (rain > humidity.low) cell.climate = 'wet forest (boreal)'
            else if (rain > humidity.dry) cell.climate = 'moist forest (boreal)'
            else if (rain > humidity.arid) cell.climate = 'dry scrub (boreal)'
            else cell.climate = 'desert (boreal)'
          } else if (region === subpolar) {
            if (rain > humidity.low) cell.climate = 'rain tundra (subpolar)'
            else if (rain > humidity.dry) cell.climate = 'wet tundra (subpolar)'
            else if (rain > humidity.arid) cell.climate = 'moist tundra (subpolar)'
            else cell.climate = 'dry tundra (subpolar)'
          } else {
            cell.climate = 'desert (polar)'
          }
        })
    },
    build: () => {
      SHAPER_CLIMATES._rain()
      SHAPER_CLIMATES._heat()
      SHAPER_CLIMATES._climate()
      SHAPER_CLIMATES._lakes()
    }
  }
})
