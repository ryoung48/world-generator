const _scarcity = ['abundant', 'common', 'uncommon', 'rare', 'exceptional'] as const

export const scarcity: Record<typeof _scarcity[number], number> = {
  abundant: _scarcity.findIndex(size => size === 'abundant'),
  common: _scarcity.findIndex(size => size === 'common'),
  uncommon: _scarcity.findIndex(size => size === 'uncommon'),
  rare: _scarcity.findIndex(size => size === 'rare'),
  exceptional: _scarcity.findIndex(size => size === 'exceptional')
}
