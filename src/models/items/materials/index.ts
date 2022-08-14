import { item__basic_details, ItemDetails } from '../types'
import { Material, material__tag } from './types'

abstract class MaterialDetails extends ItemDetails {
  abstract value(_item: Material): number
}

const _material: Omit<MaterialDetails, 'tag' | 'weight' | 'markets'> = {
  category: 'materials',
  ...item__basic_details
}
export const materials: Record<material__tag, MaterialDetails> = {
  herbs: {
    tag: 'herbs',
    base_price: 50,
    weight: 0.1,
    markets: ['reagents (alchemical)'],
    ..._material
  },
  reagent: {
    tag: 'reagent',
    base_price: 80,
    weight: 0.1,
    markets: ['reagents (alchemical)'],
    ..._material
  },
  gemstone: {
    tag: 'gemstone',
    base_price: 1000,
    weight: 0.1,
    markets: ['metals (gemstones)'],
    ..._material
  }
}
