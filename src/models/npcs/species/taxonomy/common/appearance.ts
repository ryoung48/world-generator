import { ColorHue } from '../../../../utilities/colors';
import { SocialStratum } from '../../../actors/stats/professions/types';

// eyes
const eyeColors: Record<
  'common' | 'uncommon' | 'rare',
  (ColorHue | 'hazel' | 'silver' | 'golden')[]
> = {
  common: ['brown', 'hazel'],
  uncommon: ['blue', 'green', 'copper', 'golden', 'olive', 'burgundy'],
  rare: ['yellow', 'amber', 'ochre', 'silver', 'purple', 'indigo', 'magenta']
}
export const eyeColor = (params: { longitude: number; exotic?: boolean }) => {
  const { longitude, exotic } = params
  const common = window.dice.shuffle(eyeColors.common)
  const colors = common.splice(0, 1)
  const uncommon = window.dice.shuffle([...common, ...eyeColors.uncommon])
  colors.push(...uncommon.splice(0, 3))
  const rare = window.dice.shuffle([...uncommon, ...window.dice.sample(eyeColors.rare, 2)])
  colors.push(rare.pop())
  return {
    colors,
    epicanthicFolds: !exotic || longitude < 30 ? 0 : longitude > 50 ? 1 : 0.5
  }
}

// hair
export const femaleHairStyles = ['long', 'short', 'ponytail', 'topknot', 'braided', 'bun']
export const hairStyles = () => {
  const dist = window.dice.uniformDist(4)
  return {
    male: [
      { v: 'short', w: 65 },
      { v: 'long', w: 20 },
      { v: window.dice.choice(['ponytail', 'braided']), w: 10 },
      { v: 'bald', w: 5 }
    ],
    female: window.dice.sample(femaleHairStyles, 4).map((style, i) => ({ v: style, w: dist[i] }))
  }
}

export const facialHair = () => {
  const base = {
    chance: window.dice.choice([0.6, 0.9]),
    styles: ['trimmed beard']
  }
  if (base.chance > 0.3) base.styles.push('full beard')
  if (base.chance > 0.5) base.styles.push(window.dice.choice(['thick beard', 'braided beard']))
  return base
}

// accessories
export const nosePiercings = {
  styles: ['gold', 'iron', 'copper'],
  chance: 0.05
}
const earingChance: Record<SocialStratum, number> = {
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
  chance: earingChance
}
export const facialWounds = {
  type: ['scars', 'burns'],
  intensity: ['light', 'heavy'],
  side: ['right', 'left'],
  chance: 0.05
}
export const tattooStyles = ['artistic', 'abstract', 'runic']
export const hornDressing = {
  styles: ['is broken', 'is cracked'],
  side: ['right', 'left'],
  chance: 0.05
}
