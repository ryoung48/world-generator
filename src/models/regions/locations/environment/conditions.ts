import dayjs from 'dayjs'

import { hourMS } from '../../../utilities/math/time'
import { decorateText } from '../../../utilities/text/decoration'
import { world__dayLength, world__gps, world__timezoneOffset } from '../../../world'
import { climateLookup } from '../../../world/climate/types'
import { computeHeat, computeRain, proceduralWeather } from '../../../world/climate/weather'
import { Loc } from '../types'

const defaultWeather = (): Loc['_weather']['day'] => ({
  conditions: '',
  heat: { degrees: 0, desc: '' },
  clouds: '',
  icon: 'sunny',
  wind: {
    speed: 0,
    desc: ''
  }
})

const sunlight = (exterior: Loc) => {
  const { latitude } = world__gps(exterior)
  const dayLen = world__dayLength(latitude)
  const hours = dayLen / 2
  const eod = window.world.rotation
  const mid = eod / 2
  exterior._weather.sun.hours = dayLen
  exterior._weather.sun.rise = dayLen >= eod ? 0 : dayLen <= 0 ? mid - 0.01 : mid - hours
  exterior._weather.sun.set = dayLen >= eod ? eod - 0.01 : dayLen <= 0 ? mid : mid + hours
}
const moonlight = (exterior: Loc) => {
  const dayHours = window.world.rotation
  const dayUnit = dayHours * 60 * 60 * 1000
  const days = (window.world.date - window.world.firstNewMoon) / dayUnit
  const fullCycle = window.world.lunarCycle
  const halfCycle = fullCycle / 2
  const quarterCycle = fullCycle / 4
  const phase = Math.round(days) % fullCycle
  const waxingP = ((phase / halfCycle) * 100).toFixed(1)
  const { latitude } = world__gps(window.world.cells[exterior.cell])
  const northHemisphere = latitude > 0
  const waxingSide = northHemisphere ? 'Right' : 'Left'
  const waningP = (200 - (phase / halfCycle) * 100).toFixed(1)
  const waningSide = northHemisphere ? 'Left' : 'Right'
  const { hours: sunlight, rise: sunrise, set: sunset } = exterior._weather.sun
  const moonlight = dayHours - sunlight
  const earlyMorning = (sunrise + sunlight / 4) % dayHours
  const noon = (sunrise + sunlight / 2) % dayHours
  const lateAfternoon = (sunrise + (3 * sunlight) / 4) % dayHours
  const earlyEvening = (sunset + moonlight / 4) % dayHours
  const midnight = (sunset + moonlight / 2) % dayHours
  const lateEvening = (sunset + (3 * moonlight) / 4) % dayHours
  if (phase === 0) {
    exterior._weather.moon.rise = sunrise
    exterior._weather.moon.set = sunset
    exterior._weather.moon.phase = 'New Moon (0%)'
    exterior._weather.moon.icon = 'new'
  } else if (phase < quarterCycle) {
    exterior._weather.moon.rise = earlyMorning
    exterior._weather.moon.set = earlyEvening
    exterior._weather.moon.phase = decorateText({
      label: `Waxing crescent`,
      tooltip: `${waxingSide} ${waxingP}%`
    })
    exterior._weather.moon.icon = 'waxing-crescent'
  } else if (phase === quarterCycle) {
    exterior._weather.moon.rise = noon
    exterior._weather.moon.set = midnight
    exterior._weather.moon.phase = decorateText({
      label: `First Quarter`,
      tooltip: `${waxingSide} 50%`
    })
    exterior._weather.moon.icon = 'first-quarter'
  } else if (phase < halfCycle) {
    exterior._weather.moon.rise = lateAfternoon
    exterior._weather.moon.set = lateEvening
    exterior._weather.moon.phase = decorateText({
      label: `Waxing gibbous`,
      tooltip: `${waxingSide} ${waxingP}%`
    })
    exterior._weather.moon.icon = 'waxing-gibbous'
  } else if (phase === halfCycle) {
    exterior._weather.moon.rise = sunset
    exterior._weather.moon.set = sunrise
    exterior._weather.moon.phase = decorateText({
      label: `Full Moon`,
      tooltip: `100%`
    })
    exterior._weather.moon.icon = 'full'
  } else if (phase < quarterCycle * 3) {
    exterior._weather.moon.rise = earlyEvening
    exterior._weather.moon.set = earlyMorning
    exterior._weather.moon.phase = decorateText({
      label: `Waning gibbous`,
      tooltip: `${waningSide} ${waningP}%`
    })
    exterior._weather.moon.icon = 'waning-gibbous'
  } else if (phase === quarterCycle * 3) {
    exterior._weather.moon.rise = midnight
    exterior._weather.moon.set = noon
    exterior._weather.moon.phase = decorateText({
      label: `Last Quarter`,
      tooltip: `${waningSide} 50%`
    })
    exterior._weather.moon.icon = 'last-quarter'
  } else if (phase < fullCycle) {
    exterior._weather.moon.rise = lateEvening
    exterior._weather.moon.set = lateAfternoon
    exterior._weather.moon.phase = decorateText({
      label: `Waning crescent`,
      tooltip: `${waningSide} ${waningP}%`
    })
    exterior._weather.moon.icon = 'waning-crescent'
  }
  const moonset =
    exterior._weather.moon.rise > exterior._weather.moon.set
      ? exterior._weather.moon.set + 24
      : exterior._weather.moon.set
  exterior._weather.moon.hours = moonset - exterior._weather.moon.rise
  exterior._weather.moon.nextDay = exterior._weather.moon.rise > exterior._weather.moon.set
}
const season = (exterior: Loc) => {
  const month = new Date(window.world.date).getMonth()
  const { winter, spring, summer, fall } = window.world.seasons
  if (winter.includes(month)) exterior._weather.season = 'Winter'
  if (summer.includes(month)) exterior._weather.season = 'Summer'
  if (spring.includes(month)) exterior._weather.season = 'Spring'
  if (fall.includes(month)) exterior._weather.season = 'Fall'
}

const location__weather = (loc: Loc) => {
  const month = new Date(window.world.date).getMonth()
  // day temperature
  const cell = window.world.cells[loc.cell]
  const climate = climateLookup[window.world.regions[cell.region].climate]
  const rain = computeRain({ climate, month, cell })
  const meanTemp = computeHeat({ cell, month, climate })
  const localTemp = window.dice.norm(meanTemp, 4)
  // night temperature
  const { diurnalHeat } = climate
  const diurnalVar = Math.max(1, window.dice.norm(...diurnalHeat))
  const nightTemp = localTemp - diurnalVar
  loc._weather.rainChance = rain
  loc._weather.day = proceduralWeather({
    rainChance: rain,
    temp: localTemp,
    climate: climate.type
  })
  loc._weather.night = proceduralWeather({
    rainChance: rain,
    temp: nightTemp,
    climate: climate.type
  })
}

export const location__localTime = (loc: Loc) => {
  const localTime = window.world.date + world__timezoneOffset(loc)
  const transformedTime = dayjs(localTime)
  const hour = transformedTime.hour() + transformedTime.minute() / 60
  return { localTime, hour }
}

export const location__conditions = (location: Loc) => {
  const { localTime, hour } = location__localTime(location)
  if (localTime > location.memory.weather) {
    location._weather = {
      season: '',
      rainChance: 0,
      day: defaultWeather(),
      night: defaultWeather(),
      sun: {
        hours: 0,
        rise: 0,
        set: 0
      },
      moon: {
        phase: '',
        rise: 0,
        set: 0,
        hours: 0,
        nextDay: false,
        icon: 'new'
      }
    }
    sunlight(location)
    moonlight(location)
    season(location)
    location__weather(location)
    location.memory.weather = localTime + window.dice.randint(2, 8) * hourMS
  }
  const conditions = location._weather
  const { sun, moon, day, night } = conditions
  const sunVisible = hour >= sun.rise && hour <= sun.set
  let moonVisible = hour >= moon.rise && hour <= moon.set
  if (moon.nextDay) {
    moonVisible = hour >= moon.rise || hour <= moon.set
  }
  const dusk = hour >= sun.set && hour < sun.set + 1
  const dawn = hour >= sun.rise && hour < sun.rise + 1
  const weatherIcon = sunVisible ? day.icon : night.icon
  return {
    conditions,
    visible: {
      sun: sunVisible,
      moon: moonVisible
    },
    icon:
      weatherIcon === 'sunny'
        ? dusk || dawn
          ? 'sunset'
          : sunVisible
          ? 'sunny'
          : 'night'
        : weatherIcon,
    localTime,
    summary: dawn ? 'dawn' : dusk ? 'dusk' : sunVisible ? 'day' : 'night'
  } as const
}
