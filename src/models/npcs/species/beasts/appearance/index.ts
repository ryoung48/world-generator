import {
  all_colors,
  color,
  color__modifiers,
  color__permutations,
  color__random_accent,
  hues__cool,
  hues__warm,
  neutrals__warm
} from '../../../../utilities/colors'
import { npc__random_gender } from '../../../actors/stats/appearance/gender'
import { beast__families } from '../taxonomy/types'
import { Beast } from '../types'

const color_variations = [...color__modifiers]
const warm_colors = [...hues__warm]
const cool_colors = [...hues__cool]
const neutrals: color[] = ['brown', 'grey']
const neutral_hues: color[] = ['greyish-blue', ...neutrals__warm]
const neutral_colors = [...neutral_hues, ...neutrals]

const coloration = {
  neutral: [
    ...color__permutations(['light', 'dark', 'pale'], neutrals),
    ...color__permutations(['light', 'dark'], neutral_hues),
    'black'
  ] as all_colors[],
  warm: color__permutations(color_variations, warm_colors),
  cool: color__permutations(color_variations, cool_colors)
}

const skin_tones = {
  skin: {
    base: coloration.neutral,
    tropics: coloration.neutral.concat()
  },
  fur: {
    base: coloration.neutral,
    tropics: coloration.warm
  },
  feathers: {
    base: [...coloration.neutral, ...coloration.neutral, ...coloration.warm],
    tropics: coloration.cool
  },
  scales: {
    base: [...coloration.neutral, ...coloration.neutral, ...coloration.warm],
    tropics: coloration.cool
  },
  carapace: {
    base: [...coloration.neutral, ...coloration.neutral, ...coloration.warm],
    tropics: coloration.cool
  }
}

export const beast__skin_type = ({ appearance, family }: Beast) =>
  appearance.skin.type ?? beast__families[family].skin

const beast__skin_class = (beast: Beast) => {
  const skin = beast__skin_type(beast)
  if (beast.family !== 'mammal' && skin === 'skin') return 'carapace'
  return skin
}

interface BeastAppearanceParams {
  color_blacklist?: all_colors[]
  species: Beast
}

/**
 * selects a color pool appropriate for a given species
 * @param params.location - reference location
 * @param params.family - reference beast family (used to get skin type)
 * @param params.color_blacklist - any colors in this list will not be chosen
 * @returns {string[]} color pool
 */
const beast_color_pool = ({ color_blacklist, species }: BeastAppearanceParams) => {
  const { environment } = species
  // tropical locations have a broader color range
  const tropics = environment.climate === 'Warm'
  // color pools differ by skin type
  const skin = beast__skin_class(species)
  const tones = skin_tones[skin]
  return window.dice
    .weighted_choice([
      { v: tones.base, w: 0.75 },
      { v: tones.tropics, w: tropics ? 0.25 : 0 }
    ])
    .filter(color => !color_blacklist?.includes(color))
}

/**
 * selects an accent color appropriate for a given species
 * @param species - reference species
 * @returns {string} color
 */
export const beast__accent_color = (params: { species: Beast; blacklist?: all_colors[] }) => {
  const { species, blacklist = [] } = params
  const { appearance } = species
  const [color] = appearance.skin.color
  const color_pool = beast_color_pool({ species, color_blacklist: [color, ...blacklist] })
  return color__random_accent({ color, pool: color_pool })
}

/**
 * selects a skin color appropriate for a given species
 * @param params.location - reference location
 * @param params.family - reference beast family (used to get skin type)
 * @param params.color_blacklist - any colors in this list will not be chosen
 * @returns {string} color
 */
export const beast__skin_color = (params: BeastAppearanceParams) => {
  const color_pool = beast_color_pool(params)
  return window.dice.choice(color_pool)
}

/**
 * decides if there are any gender variations for a given species
 * @param params.location - reference location
 * @param params.family - reference beast family (used to get skin type)
 * @param params.color - species skin color
 * @returns gender_variations
 */
const beast__gender_variation = (params: BeastAppearanceParams & { color: string }) => {
  const { species, color } = params
  const primary = npc__random_gender()
  const size = window.dice.choice([1, 0.9, 0.8])
  const secondary_shades = window.dice.choice(['lighter', 'duller'])
  const primary_shades = window.dice.choice(['darker', 'more vibrant'])
  const secondary_color = window.dice.choice(neutral_colors.filter(c => !color.includes(c)))
  const skin_type = beast__skin_class(species)
  const primary_tones = [...skin_tones[skin_type].tropics, 'black']
  const primary_color = window.dice.choice(primary_tones.filter(c => !color.includes(c)))
  return window.dice.weighted_choice<Beast['gender_variation']>([
    { v: { size, primary }, w: 0.85 },
    { v: { size, primary, secondary_shades }, w: 0.05 },
    { v: { size, primary, primary_shades }, w: 0.05 },
    { v: { size, primary, secondary_color }, w: 0.025 },
    { v: { size, primary, primary_color }, w: 0.025 }
  ])
}

export const beast__appearance = (params: BeastAppearanceParams) => {
  const { skin } = params.species.appearance
  const existing = skin.color
  const color = existing.length > 0 ? existing : [beast__skin_color(params)]
  const appearance: Beast['appearance'] = {
    skin: { color, type: skin.type }
  }
  return {
    appearance,
    gender_variation: beast__gender_variation({ ...params, color: color[0] })
  }
}
