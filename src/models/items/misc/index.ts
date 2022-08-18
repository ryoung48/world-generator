import { marketGroups } from '../economy'
import { item__basicDetails, ItemDetails } from '../types'
import { MiscItem, miscItem__tag } from './types'

abstract class MiscItemDetails extends ItemDetails {
  abstract value(_item: MiscItem): number
}

const _misc: Omit<MiscItemDetails, 'tag' | 'weight' | 'markets'> = {
  category: 'misc',
  ...item__basicDetails
}
export const miscItems: Record<miscItem__tag, MiscItemDetails> = {
  saddle: {
    tag: 'saddle',
    basePrice: 500,
    weight: 15,
    markets: marketGroups.leather,
    ..._misc
  },
  waterskin: {
    tag: 'waterskin',
    basePrice: 20,
    weight: 5,
    markets: marketGroups.leather,
    ..._misc
  },
  book: {
    tag: 'book',
    basePrice: 700,
    weight: 5,
    markets: marketGroups.texts,
    ..._misc
  },
  rope: {
    tag: 'book',
    basePrice: 100,
    weight: 5,
    markets: marketGroups.textiles,
    ..._misc
  }
}
