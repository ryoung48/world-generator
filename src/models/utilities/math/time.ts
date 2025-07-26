import { range } from 'd3-array'

const daysPerYear = 365
const daysPerMonth = 30 // on average
const daysPerWeek = 7
const hoursPerDay = 24
const minutesPerHour = 60
const secondMS = 1000
const minuteMS = secondMS * 60
const hourMS = minuteMS * 60
const dayMS = hourMS * hoursPerDay
const weekMS = dayMS * daysPerWeek
const monthMS = dayMS * daysPerMonth
const yearMS = dayMS * daysPerYear
const monthsPerYear = Math.round(daysPerYear / daysPerMonth)

export const TIME = {
  constants: {
    daysPerMonth,
    daysPerWeek,
    daysPerYear,
    hoursPerDay,
    minutesPerHour,
    secondMS,
    minuteMS,
    hourMS,
    dayMS,
    weekMS,
    monthMS,
    yearMS,
    monthsPerYear
  },
  hours: {
    deconstruct: (rawHours: number) => {
      const hours = rawHours % TIME.constants.hoursPerDay
      const rawMinutes = (hours % 1) * TIME.constants.minutesPerHour
      return {
        seconds: Math.floor((rawMinutes % 1) * TIME.constants.minutesPerHour),
        minutes: Math.floor(rawMinutes),
        hours: Math.floor(hours),
        days: Math.floor(rawHours / TIME.constants.hoursPerDay)
      }
    }
  },
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  month: {
    names: [
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
    ],
    /**
     * @param month - 0-11
     * @returns 0-364
     */
    days: (month: number) => {
      const daysPerMonth = TIME.constants.daysPerYear / 12
      const startDay = Math.floor(month * daysPerMonth)
      const endDay = Math.floor((month + 1) * daysPerMonth)
      return range(startDay, endDay)
    }
  },
  season: (month: number) => {
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
}
