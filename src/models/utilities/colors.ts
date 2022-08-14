import { permutations, range } from './math'
import { Dice } from './math/dice'

export const hues__warm = ['magenta', 'red', 'vermilion', 'orange', 'amber', 'yellow'] as const
export const hues__cool = ['olive', 'green', 'teal', 'blue', 'indigo', 'purple'] as const
export const neutrals__warm = ['burgundy', 'mahogany', 'copper', 'ochre', 'tan', 'beige'] as const
export const neutrals__cool = [
  'greyish-olive',
  'greyish-green',
  'greyish-teal',
  'greyish-blue',
  'greyish-indigo',
  'greyish-purple'
] as const
export const neutrals = ['brown', 'grey', 'white', 'black'] as const

export type color =
  | typeof hues__warm[number]
  | typeof hues__cool[number]
  | typeof neutrals[number]
  | typeof neutrals__warm[number]
  | typeof neutrals__cool[number]

export const color__modifiers = ['pale', 'light', 'dark', 'deep'] as const
type color_modifier = typeof color__modifiers[number]

export type all_colors = `${color_modifier} ${color}` | color

export const color__permutations = (modifiers: color_modifier[], colors: color[]): all_colors[] =>
  permutations(modifiers, colors)
    .map(group => group.join(' ') as all_colors)
    .concat(colors)

export const hues = [...hues__warm, ...hues__cool] as const
export type hue = typeof hues[number]
export const color__adjacent = (params: { color: hue; dist?: number }): hue[] => {
  const { color, dist = 2 } = params
  const idx = hues.findIndex(hue => hue === color)
  const max = hues.length
  return range(dist * 2 + 1, idx - dist).map(i => hues[i >= max ? i - max : i < 0 ? max + i : i])
}

const neutral_hue__lookup: Record<hue, color> = {
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

export const color__neutral_hues = (colors: hue[]) =>
  Array.from(new Set(colors.map(color => neutral_hue__lookup[color])))

const color_wheel: Record<hue, [number, number]> = {
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

export const color__random_hue = (color: hue) => {
  const space = color_wheel[color]
  const target = color === 'red' ? window.dice.choice<[number, number]>([space, [340, 360]]) : space
  return window.dice.color(target)
}

const is_light = (color: all_colors) => ['light', 'pale'].some(shade => color.includes(shade))
const is_dark = (color: all_colors) => ['dark', 'deep'].some(shade => color.includes(shade))

export const color__random_accent = (params: { color: all_colors; pool: all_colors[] }) => {
  const { color, pool } = params
  const light_colors = pool.filter(is_light).concat(['white'])
  const dark_colors = pool.filter(is_dark).concat(['black'])
  const combined = light_colors.concat(dark_colors)
  const final_pool = is_dark(color) ? light_colors : is_light(color) ? dark_colors : combined
  return window.dice.choice(final_pool)
}

export const color__random_preset = <T extends string>(params: {
  tags: T[]
  seed: string
  dark?: boolean
}) => {
  const { tags, seed, dark } = params
  const colors: Partial<Record<T, string>> = {}
  const dice = new Dice(seed)
  tags.forEach(tag => (colors[tag] = dark ? dice.dark_color() : dice.color()))
  return colors as Record<T, string>
}
