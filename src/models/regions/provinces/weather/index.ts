import { scaleLinear } from 'd3'

import { MAP } from '../../../../components/world/common'
import { MATH } from '../../../utilities/math'
import { hourMS, season } from '../../../utilities/math/time'
import { titleCase } from '../../../utilities/text'
import { decorateText } from '../../../utilities/text/decoration'
import { Cell } from '../../../world/cells/types'
import { BIOME } from '../../../world/climate'
import { BiomeDetails } from '../../../world/climate/types'
import { Hub } from '../hubs/types'
import { Province } from '../types'
import {
  CloudTypes,
  TemperatureVariance,
  TimeOfDay,
  WeatherConditions,
  WeatherConditionsParams,
  WeatherParams,
  WeatherPhenomena
} from './types'

const rain = {
  dry: 0.05,
  low: 0.15,
  moderate: 0.25,
  wet: 0.4,
  humid: 0.8
}

const tempDescriptor = (t: number) => {
  if (t < -40) return 'polar'
  else if (t >= -40 && t < -30) return 'arctic'
  else if (t >= -30 && t < -20) return 'bitterly cold'
  else if (t >= -20 && t < -10) return 'very cold'
  else if (t >= -10 && t < 0) return 'cold'
  else if (t >= 0 && t < 10) return 'wintry'
  else if (t >= 10 && t < 20) return 'icy'
  else if (t >= 20 && t < 30) return 'frosty'
  else if (t >= 30 && t < 40) return 'chilly'
  else if (t >= 40 && t < 50) return 'brisk'
  else if (t >= 50 && t < 60) return 'cool'
  else if (t >= 60 && t < 70) return 'mild'
  else if (t >= 70 && t < 80) return 'warm'
  else if (t >= 80 && t < 90) return 'balmy'
  else if (t >= 90 && t < 100) return 'sweaty'
  else if (t >= 100 && t < 110) return 'sweltering'
  else if (t >= 110 && t < 120) return 'feverish'
  else if (t >= 120 && t < 130) return 'baking'
  return 'scorching'
}

const beaufort = (w: number) => {
  if (w < 1) return 'calm'
  else if (w >= 1 && w < 4) return 'light air'
  else if (w >= 4 && w < 8) return 'light breeze'
  else if (w >= 8 && w < 13) return 'gentle breeze'
  else if (w >= 13 && w < 19) return 'moderate breeze'
  else if (w >= 19 && w < 25) return 'fresh breeze'
  else if (w >= 25 && w < 32) return 'strong breeze'
  else if (w >= 32 && w < 39) return 'near gale'
  else if (w >= 39 && w < 47) return 'gale'
  else if (w >= 47 && w < 55) return 'strong gale'
  else if (w >= 55 && w < 65) return 'storm'
  else if (w >= 65 && w < 73) return 'violent storm'
  return 'hurricane'
}

const windMap = (w: number) => {
  if (w >= 2 && w <= 3) return window.dice.randint(1, 3)
  else if (w >= 4 && w <= 5) return window.dice.randint(4, 7)
  else if (w >= 6 && w <= 7) return window.dice.randint(8, 12)
  else if (w >= 8 && w <= 9) return window.dice.randint(13, 18)
  else if (w >= 10 && w <= 11) return window.dice.randint(19, 24)
  else if (w >= 12 && w <= 13) return window.dice.randint(25, 31)
  else if (w >= 14 && w <= 15) return window.dice.randint(32, 38)
  else if (w >= 16 && w <= 17) return window.dice.randint(39, 46)
  else if (w === 18) return window.dice.randint(47, 54)
  else if (w === 19) return window.dice.randint(55, 64)
  else if (w >= 20) return window.dice.randint(65, 73)
  return 0
}

const clouds = (rainChance: number, condition: WeatherConditions) => {
  const arid = rainChance >= 0 && rainChance < rain.low
  const semiArid = rainChance >= rain.low && rainChance < rain.moderate
  const moderate = rainChance >= rain.moderate && rainChance < rain.wet
  const wet = rainChance >= rain.wet
  const cloudMap: Record<WeatherConditions, CloudTypes> = {
    clear: 'clear skies',
    fog: 'clear skies',
    overcast: arid
      ? 'haze'
      : semiArid
      ? 'cirrus clouds'
      : moderate
      ? 'altostratus clouds'
      : 'stratus clouds',
    rainy: arid ? 'altostratus clouds' : wet ? 'cumulus clouds' : 'stratus clouds',
    stormy: arid ? 'cumulus clouds' : 'nimbus clouds',
    cloudy: arid ? 'altocumulus clouds' : wet ? 'altostratus clouds' : 'cumulus clouds',
    windy: arid ? 'cirrus clouds' : semiArid ? 'altostratus clouds' : 'altocumulus clouds'
  }
  return cloudMap[condition]
}

const fairWeather = (): WeatherPhenomena => ({
  weather: 'clear skies',
  wind: window.dice.roll(1, 4)
})

const freezingPoint = 33

const weatherPhenomena: Record<WeatherConditions, (_params: WeatherParams) => WeatherPhenomena> = {
  stormy: ({ clouds, rain, temp }) => {
    let { weather, wind } = fairWeather()
    const rained = rain * 2 > window.dice.random
    if (clouds === 'nimbus clouds') {
      wind = window.dice.roll(2, 9)
      if (rained) {
        weather = 'thunderstorm'
        if (temp < 31) {
          weather = 'blizzard'
        } else if (temp >= 31 && temp <= 34) {
          weather = 'sleet'
        } else if (temp > 34 && temp <= 69) {
          weather = 'quiet downpour'
        }
      }
    } else if (clouds === 'cumulus clouds') {
      wind = window.dice.roll(2, 6)
      if (rained) {
        weather = 'spattering rain'
        if (temp <= freezingPoint) {
          weather = 'ice crystals'
        }
      }
    }
    return { wind, weather }
  },
  rainy: ({ clouds, rain, temp }) => {
    let { weather, wind } = fairWeather()
    if (clouds === 'altostratus clouds') {
      wind = window.dice.roll(2, 4)
      if (rain > window.dice.random) {
        weather = 'spattering rain'
        if (temp <= freezingPoint) {
          weather = 'ice crystals'
        }
      }
    } else if (clouds === 'stratus clouds') {
      wind = window.dice.roll(2, 4)
      weather = 'spattering rain'
      if (temp <= freezingPoint) {
        weather = 'tiny flakes'
      }
      if (rain > window.dice.random) {
        weather = 'pelting rain'
        if (temp <= freezingPoint) {
          weather = 'snow flurry'
        }
      }
    } else if (clouds === 'cumulus clouds') {
      wind = window.dice.roll(1, 6)
      weather = 'drizzle'
      if (temp <= freezingPoint) {
        weather = 'dusting'
      }
      if (rain > window.dice.random) {
        wind = window.dice.roll(2, 6)
        weather = 'rain shower'
        if (temp <= freezingPoint) {
          weather = 'snowfall'
        }
      }
    }
    return { wind, weather }
  },
  windy: ({ biome }) => {
    let { weather, wind } = fairWeather()
    const desert = biome.terrain === 'desert'
    const zone = BIOME.zone[biome.latitude]
    wind = window.dice.roll(2, desert ? 9 : 7)
    if (wind >= 12 && desert) {
      if (zone === 'tropical') {
        weather = 'sand storm'
      } else if (zone === 'temperate' || biome.latitude === 'boreal') {
        weather = 'dust storm'
      }
    }
    return { wind, weather }
  },
  fog: ({ rain, temp }) => {
    const fair = fairWeather()
    let { weather } = fair
    weather = temp >= freezingPoint ? 'dew' : 'cold surface'
    const intensity = window.dice.random
    if (rain > intensity) weather = temp >= freezingPoint ? 'fog' : temp >= -30 ? 'rime' : 'ice fog'
    else if (rain * 2 > intensity) weather = temp >= freezingPoint ? 'mist' : 'frost'
    else if (rain * 3 > intensity) weather = temp >= freezingPoint ? 'thin mist' : 'thin frost'
    return { wind: fair.wind, weather }
  },
  clear: () => ({ ...fairWeather() }),
  cloudy: () => ({ ...fairWeather() }),
  overcast: () => ({ ...fairWeather() })
}

const proceduralWeather = (params: {
  rainChance: number
  temp: number
  biome: BiomeDetails
  time: TimeOfDay
}) => {
  const condition = window.dice.weightedChoice<WeatherConditions>(
    params.rainChance > window.dice.random
      ? [
          { v: 'rainy', w: 0.55 },
          { v: 'stormy', w: 0.35 },
          { v: 'fog', w: params.time !== 'afternoon' ? 0.1 : 0 }
        ]
      : [
          { v: 'clear', w: 0.64 },
          { v: 'overcast', w: 0.12 },
          { v: 'cloudy', w: 0.12 },
          { v: 'windy', w: 0.12 }
        ]
  )
  const cloudType = clouds(params.rainChance, condition)
  const { wind, weather } = weatherPhenomena[condition]({
    clouds: cloudType,
    rain: params.rainChance,
    temp: params.temp,
    biome: params.biome
  })
  const windSpeed = windMap(wind)
  const cloudy = weather === 'clear skies' && cloudType !== 'clear skies'
  return {
    wind: {
      speed: windSpeed,
      desc: beaufort(windSpeed)
    },
    heat: {
      degrees: params.temp,
      desc: tempDescriptor(params.temp)
    },
    conditions: cloudy ? 'cloudy' : weather,
    clouds: cloudType
  }
}

export const hub__weather = (loc: Hub, month = new Date(window.world.date).getMonth()) => {
  // day temperature
  const cell = window.world.cells[loc.cell]
  const biome = BIOME.holdridge[cell.biome]
  const rain = 0 // computeRain({ climate: biome, month, cell })
  const meanTemp = 0 // computeHeat({ cell, month, climate: biome })
  let localTemp = window.dice.norm(meanTemp, 4)
  const diff = localTemp - meanTemp
  const variance: TemperatureVariance = diff >= 8 ? 'warmer' : diff <= -8 ? 'colder' : 'normal'
  // night temperature
  const diurnalHeat = BIOME.diurnalVariation(biome)
  const diurnalVar = Math.max(1, window.dice.norm(...diurnalHeat))
  const time = window.dice.weightedChoice<TimeOfDay>([
    { w: 0.05, v: 'dawn' },
    { w: 0.35, v: 'morning' },
    { w: 0.35, v: 'afternoon' },
    { w: 0.05, v: 'dusk' },
    { w: 0.2, v: 'night' }
  ])
  const night = time === 'night' || time === 'dusk'
  if (night) localTemp -= diurnalVar
  const weather = proceduralWeather({ rainChance: rain, temp: localTemp, biome, time })
  return {
    ...weather,
    variance,
    season: season(month),
    time
  }
}

export const province__weather = (loc: Province) => {
  if (!loc.weather || loc.weather?.memory < window.world.date) {
    const { season, time, heat, conditions, variance } = hub__weather(loc.hub)
    loc.weather = {
      text: `${decorateText({
        label: titleCase(heat.desc),
        tooltip: `${heat.degrees.toFixed(0)}°F`
      })}${
        variance === 'normal'
          ? ''
          : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
      }, ${season}, ${time}, ${conditions}`,
      memory: window.world.date + hourMS * 8
    }
  }
  return loc.weather
}

export const WEATHER = {
  heat: (params: { cell: Cell; month: number }) => {
    const { month, cell } = params
    const { summer, winter } = cell.heat
    const amp = Math.abs(summer - winter) / 2
    const base = (summer + winter) / 2
    const shift = summer > winter ? 4 : 10
    return amp * Math.sin((month - shift) * (Math.PI / 6)) + base
  },
  rain: (params: { cell: Cell; month: number }) => {
    const { month, cell } = params
    const { summer, winter } = cell.rain
    const amp = Math.abs(summer - winter) / 2
    const base = (summer + winter) / 2
    const shift = summer > winter ? 4 : 10
    return amp * Math.sin((month - shift) * (Math.PI / 6)) + base
  },
  conditions: ({
    loc,
    month = new Date(window.world.date).getMonth(),
    color
  }: WeatherConditionsParams) => {
    // day temperature
    const cell = window.world.cells[loc.cell]
    const biome = BIOME.holdridge[cell.biome]
    const rain = scaleLinear(
      MAP.metrics.rain.rain,
      [0.92, 0.8, 0.68, 0.54, 0.42, 0.3, 0.18, 0.06]
    )(WEATHER.rain({ cell, month }))
    const meanTemp = MATH.conversion.temperature.celsius.fahrenheit(WEATHER.heat({ cell, month }))
    let localTemp = window.dice.norm(meanTemp, 4)
    const diff = localTemp - meanTemp
    const variance: TemperatureVariance = diff >= 8 ? 'warmer' : diff <= -8 ? 'colder' : 'normal'
    // night temperature
    const diurnalHeat = BIOME.diurnalVariation(biome)
    const diurnalVar = Math.max(1, window.dice.norm(...diurnalHeat))
    const time = window.dice.weightedChoice<TimeOfDay>([
      { w: 0.05, v: 'dawn' },
      { w: 0.35, v: 'morning' },
      { w: 0.35, v: 'afternoon' },
      { w: 0.05, v: 'dusk' },
      { w: 0.2, v: 'night' }
    ])
    const night = time === 'night' || time === 'dusk'
    if (night) localTemp -= diurnalVar
    const weather = proceduralWeather({ rainChance: rain, temp: localTemp, biome, time })
    return `${decorateText({
      label: weather.heat.desc,
      tooltip: `${MAP.metrics.temperature.format(
        MATH.conversion.temperature.fahrenheit.celsius(localTemp)
      )}`,
      color: color
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season(month)}, ${time}, ${weather.conditions}`
  }
}
