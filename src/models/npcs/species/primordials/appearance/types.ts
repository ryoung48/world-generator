import {
  all_colors,
  color__modifiers,
  color__permutations,
  hues__cool,
  hues__warm,
  neutrals,
  neutrals__cool,
  neutrals__warm
} from '../../../../utilities/colors'

export type primordial_textures =
  | 'smooth'
  | 'waxy'
  | 'rough'
  | 'gnarled'
  | 'scaly'
  | 'flaky'
  | 'velvety'
  | 'dusty'
  | 'fluffy'
  | 'ragged'
  | 'withering'
  | 'decaying'
  | 'wilting'
  | 'twisted'

export type primordial_relative_sizes = 'small' | 'average' | 'large'
export type primordial_density = 'thick' | 'thin'

export const primordial__coloration = {
  greens: color__permutations([...color__modifiers], ['green', 'greyish-green']),
  yellows: color__permutations([...color__modifiers], ['yellow', 'amber']),
  reds: color__permutations([...color__modifiers], ['red', 'burgundy']),
  browns: color__permutations([...color__modifiers], ['brown', 'mahogany']),
  greys: color__permutations([...color__modifiers], ['grey']),
  woody: color__permutations([...color__modifiers], ['grey', 'brown', 'mahogany']),
  floral: [
    'teal',
    'blue',
    'indigo',
    'purple',
    'magenta',
    'red',
    'vermilion',
    'orange',
    'amber',
    'yellow',
    'white',
    'black'
  ] as all_colors[],
  fungal: color__permutations(
    [...color__modifiers],
    [...hues__warm, ...hues__cool, ...neutrals, ...neutrals__warm, ...neutrals__cool]
  )
}
