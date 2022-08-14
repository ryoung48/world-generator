export const commodities = [
  'clay',
  'creatures',
  'dyes',
  'fabric',
  'fish',
  'furs',
  'grains',
  'grapes',
  'honey',
  'incense',
  'livestock',
  'lumber',
  'marble',
  'metals (common)',
  'metals (gemstones)',
  'metals (precious)',
  'oils',
  'paper',
  'reagents (alchemical)',
  'reagents (arcane)',
  'salt',
  'silk',
  'spices',
  'stone',
  'vegetables',
  'wax'
] as const
export type commodity = typeof commodities[number]

export const products = [
  'artwork',
  'candles',
  'ceramics',
  'cloth goods',
  'cosmetics',
  'glasswork',
  'jewelry',
  'leatherwork',
  'machinery',
  'mercenaries',
  'metalwork',
  'products (alchemical)',
  'products (arcane)',
  'shipwrights',
  'spirits',
  'stonework',
  'texts',
  'woodwork'
] as const
export type product = typeof products[number]

export type trade_good = commodity | product
export const markets: trade_good[] = [...commodities, ...products]

type market_group = 'metal' | 'alchemical' | 'leather' | 'textiles' | 'jewelry' | 'texts'
export const market_groups: Record<market_group, trade_good[]> = {
  metal: ['metalwork', 'metals (common)'],
  jewelry: ['metals (gemstones)', 'metals (precious)'],
  alchemical: ['products (alchemical)', 'reagents (alchemical)'],
  leather: ['leatherwork', 'livestock'],
  textiles: ['cloth goods', 'silk', 'fabric'],
  texts: ['texts', 'paper']
}
