import { market_groups } from '../economy'
import { item__basic_details, ItemDetails } from '../types'
import { misc_item__tag, MiscItem } from './types'

abstract class MiscItemDetails extends ItemDetails {
  abstract value(_item: MiscItem): number
}

const _misc: Omit<MiscItemDetails, 'tag' | 'weight' | 'markets'> = {
  category: 'misc',
  ...item__basic_details
}
export const misc_items: Record<misc_item__tag, MiscItemDetails> = {
  saddle: {
    tag: 'saddle',
    base_price: 500,
    weight: 15,
    markets: market_groups.leather,
    ..._misc
  },
  waterskin: {
    tag: 'waterskin',
    base_price: 20,
    weight: 5,
    markets: market_groups.leather,
    ..._misc
  },
  book: {
    tag: 'book',
    base_price: 700,
    weight: 5,
    markets: market_groups.texts,
    ..._misc
  },
  rope: {
    tag: 'book',
    base_price: 100,
    weight: 5,
    markets: market_groups.textiles,
    ..._misc
  }
}
