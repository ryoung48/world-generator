const _scarcity = ['abundant', 'common', 'uncommon', 'rare', 'exceptional'] as const

export const scarcity: Record<typeof _scarcity[number], number> = {
  abundant: _scarcity.findIndex(size => size === 'abundant'),
  common: _scarcity.findIndex(size => size === 'common'),
  uncommon: _scarcity.findIndex(size => size === 'uncommon'),
  rare: _scarcity.findIndex(size => size === 'rare'),
  exceptional: _scarcity.findIndex(size => size === 'exceptional')
}

export const rarity__rank = (rare: number) => _scarcity[rare]

export type reagent_potency = 'minor' | 'major' | 'wondrous'
export type material_quality = 'common' | 'luxury' | 'wondrous'
export type poison_potency = 'mild' | 'moderate' | 'deadly'

export const alchemical_strength: Record<number, string> = {
  [scarcity.abundant]: 'Weak',
  [scarcity.common]: 'Minor',
  [scarcity.uncommon]: 'Potent',
  [scarcity.rare]: 'Major',
  [scarcity.exceptional]: 'Mythic'
}
export const craftsman_quality: Record<number, string> = {
  [scarcity.abundant]: 'Poor',
  [scarcity.common]: 'Fair',
  [scarcity.uncommon]: 'Fine',
  [scarcity.rare]: 'Exquisite',
  [scarcity.exceptional]: 'Magnificent'
}

export const coarse__quality = {
  material: (rare: number) => {
    if (rare > scarcity.rare) return 'wondrous'
    if (rare > scarcity.uncommon) return 'luxury'
    if (rare > scarcity.abundant) return 'common'
    return 'poor'
  },
  alchemical: (rare: number) => {
    if (rare > scarcity.rare) return 'illustrious'
    if (rare > scarcity.uncommon) return 'major'
    if (rare > scarcity.abundant) return 'minor'
    return 'weak'
  },
  poisons: (rare: number) => {
    if (rare > scarcity.rare) return 'deadly'
    if (rare > scarcity.uncommon) return 'moderate'
    if (rare > scarcity.abundant) return 'mild'
    return 'weak'
  }
}
