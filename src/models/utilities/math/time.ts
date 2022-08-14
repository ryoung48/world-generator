import { proper_list } from '../text'

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

export const days_per_year = 365
export const days_per_month = 30 // on average
export const days_per_week = 7
export const hours_per_day = 24
export const minutes_per_hour = 60
export const second_ms = 1000
export const minute_ms = second_ms * 60
export const hour_ms = minute_ms * 60
export const day_ms = hour_ms * hours_per_day
export const week_ms = day_ms * days_per_week
export const month_ms = day_ms * days_per_month
export const year_ms = day_ms * days_per_year

export const deconstruct_hours = (raw_hours: number) => {
  const hours = raw_hours % hours_per_day
  const raw_minutes = (hours % 1) * minutes_per_hour
  return {
    seconds: Math.floor((raw_minutes % 1) * minutes_per_hour),
    minutes: Math.floor(raw_minutes),
    hours: Math.floor(hours),
    days: Math.floor(raw_hours / hours_per_day)
  }
}

export const format_hours = (raw_hours: number) => {
  const { hours, minutes } = deconstruct_hours(raw_hours)
  const extra_zero = minutes < 10 ? '0' : ''
  const modded = hours % 12
  const adjusted = modded < 1 ? 12 : modded
  return `${adjusted}:${extra_zero}${minutes} ${raw_hours < 12 ? 'AM' : 'PM'}`
}

export const describe_coarse_duration = (time: number) => {
  const years = Math.floor(time / year_ms)
  if (years >= 1) return `${years} year${years === 1 ? '' : 's'}`
  const months = Math.floor(time / month_ms)
  if (months >= 1) return `${months} month${months === 1 ? '' : 's'}`
  const weeks = Math.floor(time / week_ms)
  if (weeks >= 1) return `${weeks} week${weeks === 1 ? '' : 's'}`
  const days = Math.floor(time / day_ms)
  if (days >= 1) return `${days} day${days === 1 ? '' : 's'}`
  const hours = Math.floor(time / hour_ms)
  if (hours >= 1) return `${hours} hour${hours === 1 ? '' : 's'}`
  const minutes = Math.round(time / minute_ms)
  return `${minutes} minute${minutes === 1 ? '' : 's'}`
}

export const describe_duration = (time: number) => {
  const raw_days = time / day_ms
  const days = Math.floor(raw_days)
  const raw_hours = (raw_days - days) * hours_per_day
  const hours = Math.floor(raw_hours)
  const minutes = Math.floor((raw_hours - hours) * minutes_per_hour)
  const duration: string[] = []
  if (days > 0) duration.push(`${days} day${days === 1 ? '' : 's'}`)
  if (hours > 0) duration.push(`${hours} hour${hours === 1 ? '' : 's'}`)
  if (minutes > 0) duration.push(`${minutes} minute${minutes === 1 ? '' : 's'}`)
  return proper_list(duration, 'and')
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
