import { scaleLinear, scalePow } from 'd3'

import { title_case } from '../../../utilities/text'
import { world__gps, world__h_to_km } from '../..'
import { ExteriorCell } from '../../cells/types'
import { Climate, climates, rain } from '../types'
import { cloud_types, weather_conditions, WeatherParams, WeatherPhenomena } from './types'

export const compute_heat = (params: { cell: ExteriorCell; month: number; climate: Climate }) => {
  const { month, cell, climate } = params
  const latitude = world__gps(cell).latitude
  const south = latitude < 0
  const abs_lat = Math.abs(latitude)
  const time = month > 5 ? 11 - month : month
  const exp = 1.5
  const summer_mod = climate.heat_mod?.summer ?? 0
  const winter_mod = climate.heat_mod?.winter ?? 0
  const winter = scalePow().exponent(exp).domain([0, 90]).range([86, -20])(abs_lat) + winter_mod
  const summer = scalePow().exponent(exp).domain([0, 90]).range([86, 40])(abs_lat) + summer_mod
  return (
    scaleLinear()
      .domain([0, 5])
      .range(south ? [summer, winter] : [winter, summer])(time) -
    world__h_to_km(cell.h) * 5
  )
}

export const compute_rain = (params: { climate: Climate; month: number; cell: ExteriorCell }) => {
  const { month, cell, climate } = params
  const latitude = world__gps(cell).latitude
  const south = latitude < 0
  const [summer, winter] = climate.precipitation
  const time = month > 5 ? 11 - month : month
  return scaleLinear()
    .domain([0, 5])
    .range(south ? [summer, winter] : [winter, summer])(time)
}

export const temp_descriptor = (t: number) => {
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

export const beaufort = (w: number) => {
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

export const wind_map = (w: number) => {
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

const clouds = (rain_chance: number, condition: weather_conditions) => {
  const arid = rain_chance >= 0 && rain_chance < rain.low
  const semi_arid = rain_chance >= rain.low && rain_chance < rain.moderate
  const moderate = rain_chance >= rain.moderate && rain_chance < rain.wet
  const wet = rain_chance >= rain.wet
  const cloud_map: Record<weather_conditions, cloud_types> = {
    clear: 'clear skies',
    fog: 'clear skies',
    overcast: arid
      ? 'haze'
      : semi_arid
      ? 'cirrus clouds'
      : moderate
      ? 'altostratus clouds'
      : 'stratus clouds',
    rainy: arid ? 'altostratus clouds' : wet ? 'cumulus clouds' : 'stratus clouds',
    stormy: arid ? 'cumulus clouds' : 'nimbus clouds',
    cloudy: arid ? 'altocumulus clouds' : wet ? 'altostratus clouds' : 'cumulus clouds',
    windy: arid ? 'cirrus clouds' : semi_arid ? 'altostratus clouds' : 'altocumulus clouds'
  }
  return cloud_map[condition]
}

const fair_weather = (): WeatherPhenomena => ({
  weather: 'fair',
  wind: window.dice.roll(1, 4),
  icon: 'sunny'
})

const desert_climates = [climates.COLD_DESERT, climates.HOT_DESERT]

export const freezing_point = 33

const weather_phenomena: Record<weather_conditions, (_params: WeatherParams) => WeatherPhenomena> =
  {
    stormy: ({ clouds, rain, temp }) => {
      let { weather, wind, icon } = fair_weather()
      const rained = rain * 2 > window.dice.random
      if (clouds === 'nimbus clouds') {
        wind = window.dice.roll(2, 10)
        icon = 'cloudy'
        if (rained) {
          weather = 'thunderstorm'
          icon = 'lightning'
          if (temp < 31) {
            weather = 'blizzard'
            icon = 'snowy-heavy'
          } else if (temp >= 31 && temp <= 34) {
            weather = 'sleet'
            icon = 'snowy-rainy'
          } else if (temp > 34 && temp <= 69) {
            weather = 'quiet downpour'
            icon = 'pouring'
          }
        }
      } else if (clouds === 'cumulus clouds') {
        wind = window.dice.roll(2, 6)
        icon = 'cloudy'
        if (rained) {
          weather = 'spattering rain'
          icon = 'pouring'
          if (temp <= freezing_point) {
            weather = 'ice crystals'
            icon = 'snowy'
          }
        }
      }
      return { wind, weather, icon }
    },
    rainy: ({ clouds, rain, temp }) => {
      let { weather, wind, icon } = fair_weather()
      if (clouds === 'altostratus clouds') {
        wind = window.dice.roll(2, 4)
        icon = 'cloudy'
        if (rain > window.dice.random) {
          weather = 'spattering rain'
          icon = 'pouring'
          if (temp <= freezing_point) {
            weather = 'ice crystals'
            icon = 'snowy'
          }
        }
      } else if (clouds === 'stratus clouds') {
        wind = window.dice.roll(2, 4)
        weather = 'spattering rain'
        icon = 'pouring'
        if (temp <= freezing_point) {
          weather = 'tiny flakes'
          icon = 'snowy'
        }
        if (rain > window.dice.random) {
          weather = 'pelting rain'
          icon = 'pouring'
          if (temp <= freezing_point) {
            weather = 'snow flurry'
            icon = 'snowy'
          }
        }
      } else if (clouds === 'cumulus clouds') {
        wind = window.dice.roll(1, 6)
        weather = 'drizzle'
        icon = 'pouring'
        if (temp <= freezing_point) {
          weather = 'dusting'
          icon = 'snowy'
        }
        if (rain > window.dice.random) {
          wind = window.dice.roll(2, 6)
          weather = 'rain shower'
          icon = 'pouring'
          if (temp <= freezing_point) {
            weather = 'snowfall'
            icon = 'snowy'
          }
        }
      }
      return { wind, weather, icon }
    },
    windy: ({ climate }) => {
      let { weather, wind, icon } = fair_weather()
      const desert = desert_climates.includes(climate)
      wind = window.dice.roll(2, desert ? 9 : 7)
      icon = 'windy'
      if (wind >= 12 && desert) {
        if (climate === climates.HOT_DESERT) {
          weather = 'sand storm'
        } else if (climate === climates.COLD_DESERT) {
          weather = 'dust storm'
        }
      }
      return { wind, weather, icon }
    },
    fog: ({ rain, temp }) => {
      const fair = fair_weather()
      let { weather, icon } = fair
      icon = 'fog'
      weather = temp >= freezing_point ? 'dew' : 'cold surface'
      const intensity = window.dice.random
      if (rain > intensity)
        weather = temp >= freezing_point ? 'fog' : temp >= -30 ? 'rime' : 'ice fog'
      else if (rain * 2 > intensity) weather = temp >= freezing_point ? 'mist' : 'frost'
      else if (rain * 3 > intensity) weather = temp >= freezing_point ? 'thin mist' : 'thin frost'
      return { wind: fair.wind, weather, icon }
    },
    clear: () => ({ ...fair_weather() }),
    cloudy: () => ({ ...fair_weather(), icon: 'cloudy' }),
    overcast: () => ({ ...fair_weather(), icon: 'cloudy' })
  }

export const procedural_weather = (params: {
  rain_chance: number
  temp: number
  climate: climates
}) => {
  const condition = window.dice.weighted_choice<weather_conditions>(
    params.rain_chance > window.dice.random
      ? [
          { v: 'rainy', w: 0.55 },
          { v: 'stormy', w: 0.35 },
          { v: 'fog', w: 0.1 }
        ]
      : [
          { v: 'clear', w: 0.64 },
          { v: 'overcast', w: 0.12 },
          { v: 'cloudy', w: 0.12 },
          { v: 'windy', w: 0.12 }
        ]
  )
  const cloud_type = clouds(params.rain_chance, condition)
  const { wind, weather, icon } = weather_phenomena[condition]({
    clouds: cloud_type,
    rain: params.rain_chance,
    temp: params.temp,
    climate: params.climate
  })
  const wind_speed = wind_map(wind)
  return {
    wind: {
      speed: wind_speed,
      desc: title_case(beaufort(wind_speed))
    },
    heat: {
      degrees: params.temp,
      desc: title_case(temp_descriptor(params.temp))
    },
    conditions: title_case(weather),
    clouds: title_case(cloud_type),
    icon: icon
  }
}
