import { color } from '../../../../../utilities/colors'
import { social_class } from '../../../../actors/stats/professions/types'

// eyes
const eye_colors: Record<
  'common' | 'uncommon' | 'rare',
  (color | 'hazel' | 'silver' | 'golden')[]
> = {
  common: ['brown', 'hazel'],
  uncommon: ['blue', 'green', 'copper', 'golden', 'olive', 'burgundy'],
  rare: ['yellow', 'amber', 'ochre', 'silver', 'purple', 'indigo', 'magenta']
}
export const eye_color = (params: { longitude: number; exotic?: boolean }) => {
  const { longitude, exotic } = params
  const common = window.dice.shuffle(eye_colors.common)
  const colors = common.splice(0, 1)
  const uncommon = window.dice.shuffle([...common, ...eye_colors.uncommon])
  colors.push(...uncommon.splice(0, 3))
  const rare = window.dice.shuffle([...uncommon, ...window.dice.sample(eye_colors.rare, 2)])
  colors.push(rare.pop())
  return {
    colors,
    epicanthic_folds: !exotic || longitude < 30 ? 0 : longitude > 50 ? 1 : 0.5
  }
}

// hair
export const female_hair_styles = ['long', 'short', 'ponytail', 'topknot', 'braided', 'bun']
export const hair_styles = () => {
  const dist = window.dice.uniform_dist(4)
  return {
    male: [
      { v: 'short', w: 65 },
      { v: 'long', w: 20 },
      { v: window.dice.choice(['ponytail', 'braided']), w: 10 },
      { v: 'bald', w: 5 }
    ],
    female: window.dice.sample(female_hair_styles, 4).map((style, i) => ({ v: style, w: dist[i] }))
  }
}

export const facial_hair = () => {
  const base = {
    chance: window.dice.choice([0.3, 0.6, 0.9]),
    styles: ['trimmed beard']
  }
  if (base.chance > 0.3) base.styles.push('full beard')
  if (base.chance > 0.5) base.styles.push(window.dice.choice(['thick beard', 'braided beard']))
  return base
}

// accessories
export const nose_piercings = {
  styles: ['gold', 'iron', 'copper'],
  chance: 0.05
}
const earing_chance: Record<social_class, number> = {
  lower: 0.3,
  middle: 0.6,
  upper: 0.9
}
export const earings = {
  tribal: ['bone', 'feather'],
  common: ['iron'],
  uncommon: ['gold', 'silver', 'pearl'],
  rare: ['diamond', 'ruby', 'sapphire', 'emerald', 'topaz'],
  type: ['upper', 'lower', 'double'],
  chance: earing_chance
}
export const facial_wounds = {
  type: ['scars', 'burns'],
  intensity: ['light', 'heavy'],
  side: ['right', 'left'],
  chance: 0.05
}
export const tattoo_styles = ['artistic', 'abstract', 'runic']
export const horn_dressing = {
  styles: ['is broken', 'is cracked'],
  side: ['right', 'left'],
  chance: 0.05
}
