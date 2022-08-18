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
export type Commodity = typeof commodities[number]

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
export type Product = typeof products[number]

export type TradeGood = Commodity | Product
export const markets: TradeGood[] = [...commodities, ...products]

type MarketGroup = 'metal' | 'alchemical' | 'leather' | 'textiles' | 'jewelry' | 'texts'
export const marketGroups: Record<MarketGroup, TradeGood[]> = {
  metal: ['metalwork', 'metals (common)'],
  jewelry: ['metals (gemstones)', 'metals (precious)'],
  alchemical: ['products (alchemical)', 'reagents (alchemical)'],
  leather: ['leatherwork', 'livestock'],
  textiles: ['cloth goods', 'silk', 'fabric'],
  texts: ['texts', 'paper']
}
