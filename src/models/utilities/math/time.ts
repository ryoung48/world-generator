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

export const describeCoarseDuration = (time: number) => {
  const years = Math.floor(time / yearMS)
  if (years >= 1) return `${years} year${years === 1 ? '' : 's'}`
  const months = Math.floor(time / monthMS)
  if (months >= 1) return `${months} month${months === 1 ? '' : 's'}`
  const weeks = Math.floor(time / weekMS)
  if (weeks >= 1) return `${weeks} week${weeks === 1 ? '' : 's'}`
  const days = Math.floor(time / dayMS)
  if (days >= 1) return `${days} day${days === 1 ? '' : 's'}`
  const hours = Math.floor(time / hourMS)
  if (hours >= 1) return `${hours} hour${hours === 1 ? '' : 's'}`
  const minutes = Math.round(time / minuteMS)
  return `${minutes} minute${minutes === 1 ? '' : 's'}`
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
