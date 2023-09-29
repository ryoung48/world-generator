import { properList } from '../text'

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const daysPerYear = 365
export const daysPerMonth = 30 // on average
export const daysPerWeek = 7
export const hoursPerDay = 24
export const minutesPerHour = 60
export const secondMS = 1000
export const minuteMS = secondMS * 60
export const hourMS = minuteMS * 60
export const dayMS = hourMS * hoursPerDay
export const weekMS = dayMS * daysPerWeek
export const monthMS = dayMS * daysPerMonth
export const yearMS = dayMS * daysPerYear

export const deconstructHours = (rawHours: number) => {
  const hours = rawHours % hoursPerDay
  const rawMinutes = (hours % 1) * minutesPerHour
  return {
    seconds: Math.floor((rawMinutes % 1) * minutesPerHour),
    minutes: Math.floor(rawMinutes),
    hours: Math.floor(hours),
    days: Math.floor(rawHours / hoursPerDay)
  }
}

export const formatHours = (rawHours: number) => {
  const { hours, minutes } = deconstructHours(rawHours)
  const extraZero = minutes < 10 ? '0' : ''
  const modded = hours % 12
  const adjusted = modded < 1 ? 12 : modded
  return `${adjusted}:${extraZero}${minutes} ${rawHours < 12 ? 'AM' : 'PM'}`
}

export const describeDuration = (time: number) => {
  const rawDays = time / dayMS
  const days = Math.floor(rawDays)
  const rawHours = (rawDays - days) * hoursPerDay
  const hours = Math.floor(rawHours)
  const minutes = Math.floor((rawHours - hours) * minutesPerHour)
  const duration: string[] = []
  if (days > 0) duration.push(`${days} day${days === 1 ? '' : 's'}`)
  if (hours > 0) duration.push(`${hours} hour${hours === 1 ? '' : 's'}`)
  if (minutes > 0) duration.push(`${minutes} minute${minutes === 1 ? '' : 's'}`)
  return properList(duration, 'and')
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const season = (month: number) => {
  const { winter, spring, summer, fall } = {
    winter: [10, 11, 0],
    spring: [1, 2, 3],
    summer: [4, 5, 6],
    fall: [7, 8, 9]
  }
  if (winter.includes(month)) return 'winter'
  if (summer.includes(month)) return 'summer'
  if (spring.includes(month)) return 'spring'
  if (fall.includes(month)) return 'autumn'
}
