import { lang__uniqueName } from '../npcs/languages/words'
import { lang__continent, lang__island, lang__mountain } from '../npcs/languages/words/places'
import { degrees, radians, scale } from '../utilities/math'
import { Point } from '../utilities/math/points'
import { daysPerYear } from '../utilities/math/time'
import { ExteriorCell } from './cells/types'
import { Shaper } from './spawn/shapers'

export const world__landFeatures = () => {
  return Object.entries(window.world.landmarks)
    .filter(([, v]) => !v.water)
    .map(([k]) => parseInt(k))
}
export const world__waterFeatures = () => {
  return Object.entries(window.world.landmarks)
    .filter(([, v]) => v.water)
    .map(([k]) => parseInt(k))
}

export const world__gps = ({ x, y }: Point) => {
  return {
    latitude: scale([window.world.dim.h, 0], window.world.geoBounds.lat, y),
    longitude: scale([0, window.world.dim.w], window.world.geoBounds.long, x)
  }
}
// day of the year 1-365 (not 100% accurate)
const dayOfYear = (date: number) => {
  const today = new Date(date)
  const start = new Date(today.getFullYear(), 0).getTime()
  return (date - start) / (1000 * 60 * 60 * window.world.rotation)
}
// sun declination (degrees)
const sunDeclination = (days = dayOfYear(window.world.date)) => {
  const position = (days / daysPerYear) * 360
  return Math.asin(Math.sin(radians(-window.world.tilt)) * Math.cos(radians(position)))
}
// https://en.wikipedia.org/wiki/Hour_angle
const hourAngle = (latitude: number, day?: number) => {
  const pre = -Math.tan(radians(latitude)) * Math.tan(sunDeclination(day))
  return degrees(Math.acos(pre > 1 ? 1 : pre < -1 ? -1 : pre))
}
// length of day (hours) at a given latitude
export const world__dayLength = (latitude: number, day?: number) => {
  const angularVelocity = 360 / window.world.rotation
  return (hourAngle(latitude, day) * 2) / angularVelocity
}

export const world__heightToKM = (h: number) => scale([window.world.seaLevelCutoff, 1.5], [0, 6], h)
export const world__heightToMI = (h: number) => world__heightToKM(h) / 1.609

const world__findInfluence = (land: ExteriorCell[]) => {
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

export const world__getFeature = (cell: ExteriorCell) => {
  const idx = cell.landmark
  const { type, name } = window.world.landmarks[idx]
  const isLand = type === 'continent' || type === 'island'
  if (isLand && name === 'none') {
    const cells = Shaper.land
    const island = cells.filter(poly => poly.landmark === idx)
    const lang = world__findInfluence(island).language
    window.world.landmarks[idx].name =
      type === 'island' ? lang__island(lang) : lang__continent(lang)
  } else if (type === 'lake' && name === 'none') {
    const cells = Shaper.water
    const lake = cells.filter(poly => poly.landmark === idx)
    const lang = world__findInfluence(lake).language
    window.world.landmarks[idx].name = `${lang__uniqueName({ lang, key: 'lake' })} Lake`
  }
  const landmark = window.world.landmarks[idx]
  return {
    ...landmark,
    size: landmark.size / window.world.cells.length
  }
}

export const world__getMountains = (idx: number) => {
  if (idx >= 0 && window.world.mountains[idx] === 'none') {
    const mountains = Shaper.mountains
    const mountain = mountains.filter(poly => poly.mountain === idx)
    const lang = world__findInfluence(mountain).language
    window.world.mountains[idx] = lang__mountain(lang, mountain.length)
  }
  return window.world.mountains[idx]
}
