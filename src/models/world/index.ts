import { degrees, radians, scale } from '../utilities/math'
import { Point } from '../utilities/math/points'
import { daysPerYear } from '../utilities/math/time'

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
