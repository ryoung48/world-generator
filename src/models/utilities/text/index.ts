import { TIME } from '../math/time'
import { CodexLinkParams } from './types'

const local = 'en-US'

export const TEXT = {
  base64: {
    encode: (str: string) => {
      const uint8Array = new TextEncoder().encode(str)
      const chars = String.fromCharCode(...uint8Array)
      return btoa(chars)
    },
    decode: (str: string) => {
      const binary = atob(str)
      const uint8Array = new Uint8Array(binary.split('').map(char => char.charCodeAt(0)))
      return new TextDecoder().decode(uint8Array)
    }
  },
  capitalize: ([firstLetter, ...restOfWord]: string) =>
    firstLetter.toUpperCase() + restOfWord.join(''),
  decorate: ({
    label,
    link,
    tooltip = '',
    color = '',
    italics = false,
    bold = false,
    underlineColor = '',
    details
  }: CodexLinkParams) =>
    `@${label}##${link?.idx ?? ''}##${link?.tag ?? ''}##${
      tooltip ? TEXT.base64.encode(tooltip) : ''
    }##${color}##${italics}##${bold}##${underlineColor}##${
      details ? TEXT.base64.encode(JSON.stringify(details)) : ''
    }@`,
  decorateEnd: (sentence: string, args: Partial<CodexLinkParams>) => {
    const words = sentence.split(' ')
    return words
      .map((word, i) => (i === words.length - 1 ? TEXT.decorate({ label: word, ...args }) : word))
      .join(' ')
  },
  formatters: {
    percent: (value: number, precision = 0) =>
      new Intl.NumberFormat(local, { style: 'percent', minimumFractionDigits: precision }).format(
        value
      ),
    compact: (value: number) => new Intl.NumberFormat(local, { notation: 'compact' }).format(value),
    long: (value: number, rounding = 1) =>
      new Intl.NumberFormat(local).format(Math.round(value / rounding) * rounding),
    list: (list: string[], ending: string) =>
      list.join(', ').replace(/, ([^,]*)$/, `${list.length > 2 ? ',' : ''} ${ending} $1`),
    sentences: (str: string) => {
      const matches = str.match(/.+?[.!?]( |$)/g)
      return (matches?.map(TEXT.capitalize)?.join('') ?? str).replace(/\.+/g, '.')
    },
    time: {
      hours: (hours: number) => {
        const { hours: h, minutes } = TIME.hours.deconstruct(hours)
        const extraZero = minutes < 10 ? '0' : ''
        const modded = h % 12
        const adjusted = modded < 1 ? 12 : modded
        return `${adjusted}:${extraZero}${minutes} ${hours < 12 ? 'AM' : 'PM'}`
      },
      duration: (ms: number) => {
        const rawDays = ms / TIME.constants.dayMS
        const days = Math.floor(rawDays)
        const rawHours = (rawDays - days) * TIME.constants.hoursPerDay
        const hours = Math.floor(rawHours)
        const minutes = Math.floor((rawHours - hours) * TIME.constants.minutesPerHour)
        const duration: string[] = []
        if (days > 0) duration.push(`${days} day${days === 1 ? '' : 's'}`)
        if (hours > 0) duration.push(`${hours} hour${hours === 1 ? '' : 's'}`)
        if (minutes > 0) duration.push(`${minutes} minute${minutes === 1 ? '' : 's'}`)
        return TEXT.formatters.list(duration, 'and')
      }
    }
  },
  parseOutermostBrackets: (text: string) => {
    const groups: string[] = []
    let depth = 0
    let curr = ''
    for (const c of text) {
      const former = depth
      if (c === '{') depth++
      if (depth > 0) curr += c
      if (c === '}') depth--
      if (former > 0 && depth === 0) {
        groups.push(curr)
        curr = ''
      }
    }
    return groups
  },
  romanize: (num: number) => {
    const lookup: Record<string, number> = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    }
    let roman = ''
    let i
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i
        num -= lookup[i]
      }
    }
    return roman
  },
  titleCase: (str: string) => str.replace(/[^\s-()]+/g, TEXT.capitalize)
}
