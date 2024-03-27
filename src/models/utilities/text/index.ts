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
    compact: (value: number) =>
      new Intl.NumberFormat(local, { notation: 'compact' } as any).format(value),
    long: (value: number) => new Intl.NumberFormat(local).format(value),
    list: (list: string[], ending: string) =>
      list.join(', ').replace(/, ([^,]*)$/, `${list.length > 2 ? ',' : ''} ${ending} $1`),
    sentences: (str: string) => {
      const matches = str.match(/.+?[.!?]( |$)/g)
      return (matches?.map(TEXT.capitalize)?.join('') ?? str).replace(/\.+/g, '.')
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
