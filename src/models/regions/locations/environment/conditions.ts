import dayjs from 'dayjs'

import { hour_ms } from '../../../utilities/math/time'
import { decorate_text } from '../../../utilities/text/decoration'
import { world__day_length, world__gps, world__timezone_offset } from '../../../world'
import { climate_lookup } from '../../../world/climate/types'
import { compute_heat, compute_rain, procedural_weather } from '../../../world/climate/weather'
import { Loc } from '../types'

const default_weather = (): Loc['_weather']['day'] => ({
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
  const day_len = world__day_length(latitude)
  const hours = day_len / 2
  const eod = window.world.rotation
  const mid = eod / 2
  exterior._weather.sun.hours = day_len
  exterior._weather.sun.rise = day_len >= eod ? 0 : day_len <= 0 ? mid - 0.01 : mid - hours
  exterior._weather.sun.set = day_len >= eod ? eod - 0.01 : day_len <= 0 ? mid : mid + hours
}
const moonlight = (exterior: Loc) => {
  const day_hours = window.world.rotation
  const day_unit = day_hours * 60 * 60 * 1000
  const days = (window.world.date - window.world.first_new_moon) / day_unit
  const full_cycle = window.world.lunar_cycle
  const half_cycle = full_cycle / 2
  const quarter_cycle = full_cycle / 4
  const phase = Math.round(days) % full_cycle
  const waxing_p = ((phase / half_cycle) * 100).toFixed(1)
  const { latitude } = world__gps(window.world.cells[exterior.cell])
  const north_hemisphere = latitude > 0
  const waxing_side = north_hemisphere ? 'Right' : 'Left'
  const waning_p = (200 - (phase / half_cycle) * 100).toFixed(1)
  const waning_side = north_hemisphere ? 'Left' : 'Right'
  const { hours: sunlight, rise: sunrise, set: sunset } = exterior._weather.sun
  const moonlight = day_hours - sunlight
  const early_morning = (sunrise + sunlight / 4) % day_hours
  const noon = (sunrise + sunlight / 2) % day_hours
  const late_afternoon = (sunrise + (3 * sunlight) / 4) % day_hours
  const early_evening = (sunset + moonlight / 4) % day_hours
  const midnight = (sunset + moonlight / 2) % day_hours
  const late_evening = (sunset + (3 * moonlight) / 4) % day_hours
  if (phase === 0) {
    exterior._weather.moon.rise = sunrise
    exterior._weather.moon.set = sunset
    exterior._weather.moon.phase = 'New Moon (0%)'
    exterior._weather.moon.icon = 'new'
  } else if (phase < quarter_cycle) {
    exterior._weather.moon.rise = early_morning
    exterior._weather.moon.set = early_evening
    exterior._weather.moon.phase = decorate_text({
      label: `Waxing crescent`,
      tooltip: `${waxing_side} ${waxing_p}%`
    })
    exterior._weather.moon.icon = 'waxing-crescent'
  } else if (phase === quarter_cycle) {
    exterior._weather.moon.rise = noon
    exterior._weather.moon.set = midnight
    exterior._weather.moon.phase = decorate_text({
      label: `First Quarter`,
      tooltip: `${waxing_side} 50%`
    })
    exterior._weather.moon.icon = 'first-quarter'
  } else if (phase < half_cycle) {
    exterior._weather.moon.rise = late_afternoon
    exterior._weather.moon.set = late_evening
    exterior._weather.moon.phase = decorate_text({
      label: `Waxing gibbous`,
      tooltip: `${waxing_side} ${waxing_p}%`
    })
    exterior._weather.moon.icon = 'waxing-gibbous'
  } else if (phase === half_cycle) {
    exterior._weather.moon.rise = sunset
    exterior._weather.moon.set = sunrise
    exterior._weather.moon.phase = decorate_text({
      label: `Full Moon`,
      tooltip: `100%`
    })
    exterior._weather.moon.icon = 'full'
  } else if (phase < quarter_cycle * 3) {
    exterior._weather.moon.rise = early_evening
    exterior._weather.moon.set = early_morning
    exterior._weather.moon.phase = decorate_text({
      label: `Waning gibbous`,
      tooltip: `${waning_side} ${waning_p}%`
    })
    exterior._weather.moon.icon = 'waning-gibbous'
  } else if (phase === quarter_cycle * 3) {
    exterior._weather.moon.rise = midnight
    exterior._weather.moon.set = noon
    exterior._weather.moon.phase = decorate_text({
      label: `Last Quarter`,
      tooltip: `${waning_side} 50%`
    })
    exterior._weather.moon.icon = 'last-quarter'
  } else if (phase < full_cycle) {
    exterior._weather.moon.rise = late_evening
    exterior._weather.moon.set = late_afternoon
    exterior._weather.moon.phase = decorate_text({
      label: `Waning crescent`,
      tooltip: `${waning_side} ${waning_p}%`
    })
    exterior._weather.moon.icon = 'waning-crescent'
  }
  const moonset =
    exterior._weather.moon.rise > exterior._weather.moon.set
      ? exterior._weather.moon.set + 24
      : exterior._weather.moon.set
  exterior._weather.moon.hours = moonset - exterior._weather.moon.rise
  exterior._weather.moon.next_day = exterior._weather.moon.rise > exterior._weather.moon.set
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
  const climate = climate_lookup[window.world.regions[cell.region].climate]
  const rain = compute_rain({ climate, month, cell })
  const mean_temp = compute_heat({ cell, month, climate })
  const local_temp = window.dice.norm(mean_temp, 4)
  // night temperature
  const { diurnal_heat } = climate
  const diurnal_var = Math.max(1, window.dice.norm(...diurnal_heat))
  const night_temp = local_temp - diurnal_var
  loc._weather.rain_chance = rain
  loc._weather.day = procedural_weather({
    rain_chance: rain,
    temp: local_temp,
    climate: climate.type
  })
  loc._weather.night = procedural_weather({
    rain_chance: rain,
    temp: night_temp,
    climate: climate.type
  })
}

export const location__local_time = (loc: Loc) => {
  const local_time = window.world.date + world__timezone_offset(loc)
  const transformed_time = dayjs(local_time)
  const hour = transformed_time.hour() + transformed_time.minute() / 60
  return { local_time, hour }
}

export const location__conditions = (location: Loc) => {
  const { local_time, hour } = location__local_time(location)
  if (local_time > location.memory.weather) {
    location._weather = {
      season: '',
      rain_chance: 0,
      day: default_weather(),
      night: default_weather(),
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
        next_day: false,
        icon: 'new'
      }
    }
    sunlight(location)
    moonlight(location)
    season(location)
    location__weather(location)
    location.memory.weather = local_time + window.dice.randint(2, 8) * hour_ms
  }
  const conditions = location._weather
  const { sun, moon, day, night } = conditions
  const sun_visible = hour >= sun.rise && hour <= sun.set
  let moon_visible = hour >= moon.rise && hour <= moon.set
  if (moon.next_day) {
    moon_visible = hour >= moon.rise || hour <= moon.set
  }
  const dusk = hour >= sun.set && hour < sun.set + 1
  const dawn = hour >= sun.rise && hour < sun.rise + 1
  const weather_icon = sun_visible ? day.icon : night.icon
  return {
    conditions,
    visible: {
      sun: sun_visible,
      moon: moon_visible
    },
    icon:
      weather_icon === 'sunny'
        ? dusk || dawn
          ? 'sunset'
          : sun_visible
          ? 'sunny'
          : 'night'
        : weather_icon,
    local_time,
    summary: dawn ? 'dawn' : dusk ? 'dusk' : sun_visible ? 'day' : 'night'
  } as const
}
