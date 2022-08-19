import { range } from 'd3'

import { permutations as _perm } from './math'
import { Dice } from './math/dice'

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
export const colors__neutrals = ['brown', 'grey', 'white', 'black'] as const
export type ColorHue =
  | typeof huesWarm[number]
  | typeof huesCool[number]
  | typeof colors__neutrals[number]
  | typeof neutralsWarm[number]
  | typeof neutralsCool[number]
export const colors__modifiers = ['pale', 'light', 'dark', 'deep'] as const
type ColorModifier = typeof colors__modifiers[number]
export type AllColors = `${ColorModifier} ${ColorHue}` | ColorHue
export const colors__hues = [...huesWarm, ...huesCool] as const
export type Hue = typeof colors__hues[number]

export const colors__permutations = (modifiers: ColorModifier[], colors: ColorHue[]): AllColors[] =>
  _perm(modifiers, colors)
    .map(group => group.join(' ') as AllColors)
    .concat(colors)

export const colors__adjacent = (params: { color: Hue; dist?: number }): Hue[] => {
  const { color, dist = 2 } = params
  const idx = colors__hues.findIndex(hue => hue === color)
  const max = colors__hues.length
  const start = idx - dist
  const stop = start + dist * 2 + 1
  return range(start, stop).map(i => colors__hues[i >= max ? i - max : i < 0 ? max + i : i])
}

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

export const colors__neutralHues = (colors: Hue[]) =>
  Array.from(new Set(colors.map(color => neutralHueLookup[color])))

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

export const colors__randomHue = (color: Hue) => {
  const space = colorWheel[color]
  const target = color === 'red' ? window.dice.choice<[number, number]>([space, [340, 360]]) : space
  return window.dice.color(target)
}

export const colors__randomPreset = <T extends string>(params: {
  tags: T[]
  seed: string
  dark?: boolean
}) => {
  const { tags, seed, dark } = params
  const colors: Partial<Record<T, string>> = {}
  const dice = new Dice(seed)
  tags.forEach(tag => (colors[tag] = dark ? dice.darkColor() : dice.color()))
  return colors as Record<T, string>
}
