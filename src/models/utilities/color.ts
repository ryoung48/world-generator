import { range } from 'd3'

import { MATH } from './math'

const huesWarm = ['magenta', 'red', 'vermilion', 'orange', 'amber', 'yellow'] as const
const huesCool = ['olive', 'green', 'teal', 'blue', 'indigo', 'purple'] as const
const neutralsWarm = ['burgundy', 'mahogany', 'copper', 'ochre', 'tan', 'beige'] as const
const neutralsCool = [
  'greyish-olive',
  'greyish-green',
  'greyish-teal',
  'greyish-blue',
  'greyish-indigo',
  'greyish-purple'
] as const
const neutrals = ['brown', 'grey', 'white', 'black'] as const
export type ColorHue =
  | typeof huesWarm[number]
  | typeof huesCool[number]
  | typeof neutrals[number]
  | typeof neutralsWarm[number]
  | typeof neutralsCool[number]
const modifiers = ['pale', 'light', 'dark', 'deep'] as const
type ColorModifier = typeof modifiers[number]
export type AllColors = `${ColorModifier} ${ColorHue}` | ColorHue
const hues = [...huesWarm, ...huesCool] as const
export type Hue = typeof hues[number]

const neutralHueLookup: Record<Hue, ColorHue> = {
  magenta: 'burgundy',
  red: 'mahogany',
  vermilion: 'copper',
  orange: 'ochre',
  amber: 'tan',
  yellow: 'beige',
  olive: 'greyish-olive',
  green: 'greyish-green',
  teal: 'greyish-teal',
  blue: 'greyish-blue',
  indigo: 'greyish-indigo',
  purple: 'greyish-purple'
}

const colorWheel: Record<Hue, [number, number]> = {
  red: [0, 10], // also [340, 360]
  vermilion: [10, 20],
  orange: [20, 40],
  amber: [40, 50],
  yellow: [50, 70],
  olive: [70, 90],
  green: [90, 130],
  teal: [130, 170],
  blue: [170, 250],
  indigo: [250, 260],
  purple: [260, 300],
  magenta: [300, 340]
}

export const COLOR = {
  adjacent: (params: { color: Hue; dist?: number }): Hue[] => {
    const { color, dist = 2 } = params
    const idx = hues.findIndex(hue => hue === color)
    const max = hues.length
    const start = idx - dist
    const stop = start + dist * 2 + 1
    return range(start, stop).map(i => hues[i >= max ? i - max : i < 0 ? max + i : i])
  },
  adjustHslLightness: (hslString: string, amount: number): string => {
    // Regular expression to extract HSL values
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/
    const match = hslString.match(hslRegex)

    if (!match) {
      throw new Error('Invalid HSL string format. Expected format: hsl(H, S%, L%)')
    }

    const hue = parseInt(match[1], 10)
    const saturation = parseFloat(match[2])
    let lightness = parseFloat(match[3])

    // Adjust lightness, clamping to 0-100 range
    lightness = Math.max(0, Math.min(100, lightness + amount))

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  },
  extractHue: (hslString: string): number | null => {
    // Use a regular expression to match the hue, saturation, and lightness values
    const regex = /hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/
    const match = hslString.match(regex)
    // Check if the string matches the HSL format
    if (match && match[1]) {
      // Return the hue as a number
      return parseInt(match[1], 10)
    }
    // Return null if the string doesn't match the HSL format
    return null
  },
  findMostDistantHue: (hues: number[]): number => {
    // Sort the hues in ascending order
    const sortedHues = hues.sort((a, b) => a - b)

    // Add the first hue to the end of the list plus 360 to account for wrapping around the hue circle
    sortedHues.push(sortedHues[0] + 360)

    // Find the largest gap between consecutive hues
    let maxGap = 0
    let maxGapIndex = 0
    for (let i = 0; i < sortedHues.length - 1; i++) {
      const gap = sortedHues[i + 1] - sortedHues[i]
      if (gap > maxGap) {
        maxGap = gap
        maxGapIndex = i
      }
    }

    // Calculate the hue that is halfway through the largest gap
    // Ensure the result is modulo 360 to wrap around the hue circle
    const mostDistantHue = (sortedHues[maxGapIndex] + maxGap / 2) % 360

    return mostDistantHue
  },
  hslToHex(h: number, s: number, l: number) {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0') // convert to Hex and prefix "0" if needed
    }
    return `#${f(0)}${f(8)}${f(4)}`
  },
  hues,
  neutralHues: (colors: Hue[]) => Array.from(new Set(colors.map(color => neutralHueLookup[color]))),
  permutations: (modifiers: ColorModifier[], colors: ColorHue[]): AllColors[] =>
    MATH.permutations(modifiers, colors)
      .map(group => group.join(' ') as AllColors)
      .concat(colors),
  randomHue: (color: Hue) => {
    const space = colorWheel[color]
    const target =
      color === 'red' ? window.dice.choice<[number, number]>([space, [340, 360]]) : space
    return window.dice.color(target)
  }
}
