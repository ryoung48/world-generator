import { MATH } from '../../utilities/math'
import { TIME } from '../../utilities/math/time'
import { TEXT } from '../../utilities/text'
import { Cell } from '../types'
import { RAIN } from './rain'
import { TEMPERATURE } from './temperature'
import {
  CloudTypes,
  TemperatureVariance,
  TimeOfDay,
  WeatherConditions,
  WeatherConditionsParams,
  WeatherParams,
  WeatherPhenomena
} from './types'

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
  const arid = rainChance >= 0 && rainChance < RAIN.thresholds.clouds.low
  const semiArid =
    rainChance >= RAIN.thresholds.clouds.low && rainChance < RAIN.thresholds.clouds.moderate
  const moderate =
    rainChance >= RAIN.thresholds.clouds.moderate && rainChance < RAIN.thresholds.clouds.wet
  const wet = rainChance >= RAIN.thresholds.clouds.wet
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
        if (temp <= TEMPERATURE.freezingPoint) {
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
        if (temp <= TEMPERATURE.freezingPoint) {
          weather = 'ice crystals'
        }
      }
    } else if (clouds === 'stratus clouds') {
      wind = window.dice.roll(2, 4)
      weather = 'spattering rain'
      if (temp <= TEMPERATURE.freezingPoint) {
        weather = 'tiny flakes'
      }
      if (rain > window.dice.random) {
        weather = 'pelting rain'
        if (temp <= TEMPERATURE.freezingPoint) {
          weather = 'snow flurry'
        }
      }
    } else if (clouds === 'cumulus clouds') {
      wind = window.dice.roll(1, 6)
      weather = 'drizzle'
      if (temp <= TEMPERATURE.freezingPoint) {
        weather = 'dusting'
      }
      if (rain > window.dice.random) {
        wind = window.dice.roll(2, 6)
        weather = 'rain shower'
        if (temp <= TEMPERATURE.freezingPoint) {
          weather = 'snowfall'
        }
      }
    }
    return { wind, weather }
  },
  windy: ({ climate, vegetation }) => {
    let { weather, wind } = fairWeather()
    const desert = vegetation === 'desert'
    wind = window.dice.roll(2, desert ? 9 : 7)
    if (wind >= 12 && desert) {
      if (climate === 'tropical' || climate === 'subtropical') {
        weather = 'sand storm'
      } else if (climate === 'boreal' || climate === 'temperate') {
        weather = 'dust storm'
      }
    }
    return { wind, weather }
  },
  fog: ({ rain, temp }) => {
    const fair = fairWeather()
    let { weather } = fair
    weather = temp >= TEMPERATURE.freezingPoint ? 'dew' : 'cold surface'
    const intensity = window.dice.random
    if (rain > intensity)
      weather = temp >= TEMPERATURE.freezingPoint ? 'fog' : temp >= -30 ? 'rime' : 'ice fog'
    else if (rain * 2 > intensity) weather = temp >= TEMPERATURE.freezingPoint ? 'mist' : 'frost'
    else if (rain * 3 > intensity)
      weather = temp >= TEMPERATURE.freezingPoint ? 'thin mist' : 'thin frost'
    return { wind: fair.wind, weather }
  },
  clear: () => ({ ...fairWeather() }),
  cloudy: () => ({ ...fairWeather() }),
  overcast: () => ({ ...fairWeather() })
}

const proceduralWeather = (params: {
  rainChance: number
  temp: number
  climate: Cell['climate']
  vegetation: Cell['vegetation']
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
    climate: params.climate,
    vegetation: params.vegetation
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
      desc: TEMPERATURE.describe(params.temp)
    },
    conditions: cloudy ? 'cloudy' : weather,
    clouds: cloudType
  }
}

export const WEATHER = {
  conditions: ({
    cell,
    month = new Date(window.world.date).getMonth(),
    color
  }: WeatherConditionsParams) => {
    const { climate, vegetation } = cell
    // day temperature
    const rain = RAIN.monthly.chance({ cell, month })
    const meanTemp = MATH.conversion.temperature.celsius.fahrenheit(
      TEMPERATURE.monthly.mean({ cell, month })
    )
    let localTemp = window.dice.norm(meanTemp, 4)
    const diff = localTemp - meanTemp
    const variance: TemperatureVariance = diff >= 8 ? 'warmer' : diff <= -8 ? 'colder' : 'normal'
    // night temperature
    const time = window.dice.weightedChoice<TimeOfDay>([
      { w: 0.05, v: 'dawn' },
      { w: 0.35, v: 'morning' },
      { w: 0.35, v: 'afternoon' },
      { w: 0.05, v: 'dusk' },
      { w: 0.2, v: 'night' }
    ])
    const weather = proceduralWeather({
      rainChance: rain,
      temp: localTemp,
      climate,
      vegetation,
      time
    })
    return `${TIME.season(month)}, ${time}, ${TEXT.decorate({
      label: weather.heat.desc,
      tooltip: `${MATH.conversion.temperature.fahrenheit.celsius(localTemp)}`, // FIX ME
      color: color
    })}${
      variance === 'normal'
        ? ''
        : TEXT.decorate({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${TEXT.decorate({
      label: weather.wind.desc,
      tooltip: `${weather.wind.speed} mph`,
      color: color
    })}, ${weather.conditions}`
  }
}
