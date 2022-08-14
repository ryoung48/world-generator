import { lang__unique_name } from '../npcs/species/humanoids/languages/words'
import {
  lang__continent,
  lang__island,
  lang__mountain
} from '../npcs/species/humanoids/languages/words/places'
import { degrees, radians, scale } from '../utilities/math'
import { Point } from '../utilities/math/points'
import { days_per_year, hour_ms } from '../utilities/math/time'
import { ExteriorCell } from './cells/types'
import { Shaper } from './spawn/shapers'
import { sea_level_cutoff } from './types'

export const world__land_features = () => {
  return Object.entries(window.world.landmarks)
    .filter(([, v]) => !v.water)
    .map(([k]) => parseInt(k))
}
export const world__water_features = () => {
  return Object.entries(window.world.landmarks)
    .filter(([, v]) => v.water)
    .map(([k]) => parseInt(k))
}

export const world__gps = ({ x, y }: Point) => {
  return {
    latitude: scale([window.world.dim.h, 0], window.world.geo_bounds.lat, y),
    longitude: scale([0, window.world.dim.w], window.world.geo_bounds.long, x)
  }
}
// day of the year 1-365 (not 100% accurate)
const day_of_year = (date: number) => {
  const today = new Date(date)
  const start = new Date(today.getFullYear(), 0).getTime()
  return (date - start) / (1000 * 60 * 60 * window.world.rotation)
}
// sun declination (degrees)
const sun_declination = (days = day_of_year(window.world.date)) => {
  const position = (days / days_per_year) * 360
  return Math.asin(Math.sin(radians(-window.world.tilt)) * Math.cos(radians(position)))
}
// https://en.wikipedia.org/wiki/Hour_angle
const hour_angle = (latitude: number, day?: number) => {
  const pre = -Math.tan(radians(latitude)) * Math.tan(sun_declination(day))
  return degrees(Math.acos(pre > 1 ? 1 : pre < -1 ? -1 : pre))
}
// length of day (hours) at a given latitude
export const world__day_length = (latitude: number, day?: number) => {
  const angular_velocity = 360 / window.world.rotation
  return (hour_angle(latitude, day) * 2) / angular_velocity
}

export const world__timezone_offset = ({ x, y }: Point) => {
  const { longitude } = world__gps({ x, y })
  // approx 1 hour diff per 15 degrees
  return Math.round(longitude / 15) * hour_ms
}

export const world__h_to_km = (h: number) => scale([sea_level_cutoff, 1.5], [0, 6], h)
export const world__h_to_mi = (h: number) => world__h_to_km(h) / 1.609

const world__find_influence = (land: ExteriorCell[]) => {
  // determine the greatest cultural influence on a group of cells
  const cultures = window.world.regions.map(() => 0)
  // count the number of cells under the influence of each nation
  land.forEach(poly => {
    cultures[poly.region] += 1
  })
  // find the nation with the highest cell count
  const influence = cultures.reduce(
    (top, c, i) => {
      return c > top.value
        ? {
            idx: i,
            value: c
          }
        : top
    },
    {
      idx: 0,
      value: -1
    }
  )
  const region = window.world.regions[influence.idx]
  return window.world.cultures[region.culture.native]
}

export const world__get_feature = (cell: ExteriorCell) => {
  const idx = cell.landmark
  const { type, name } = window.world.landmarks[idx]
  const is_land = type === 'continent' || type === 'island'
  if (is_land && name === 'none') {
    const cells = Shaper.land
    const island = cells.filter(poly => poly.landmark === idx)
    const lang = world__find_influence(island).language
    window.world.landmarks[idx].name =
      type === 'island' ? lang__island(lang) : lang__continent(lang)
  } else if (type === 'lake' && name === 'none') {
    const cells = Shaper.water
    const lake = cells.filter(poly => poly.landmark === idx)
    const lang = world__find_influence(lake).language
    window.world.landmarks[idx].name = `${lang__unique_name({ lang, key: 'lake' })} Lake`
  }
  const landmark = window.world.landmarks[idx]
  return {
    ...landmark,
    size: landmark.size / window.world.cells.length
  }
}

export const world__get_mountains = (idx: number) => {
  if (idx >= 0 && window.world.mountains[idx] === 'none') {
    const mountains = Shaper.mountains
    const mountain = mountains.filter(poly => poly.mountain === idx)
    const lang = world__find_influence(mountain).language
    window.world.mountains[idx] = lang__mountain(lang, mountain.length)
  }
  return window.world.mountains[idx]
}

export const world__get_lands = () => {
  return {
    land: Shaper.land.length,
    water: Shaper.water.length
  }
}
