import { item__basicDetails, ItemDetails } from '../types'
import { Material, material__tag } from './types'

abstract class MaterialDetails extends ItemDetails {
  abstract value(_item: Material): number
}

const _material: Omit<MaterialDetails, 'tag' | 'weight' | 'markets'> = {
  category: 'materials',
  ...item__basicDetails
}
export const materials: Record<material__tag, MaterialDetails> = {
  herbs: {
    tag: 'herbs',
    basePrice: 50,
    weight: 0.1,
    markets: ['reagents (alchemical)'],
    ..._material
  },
  reagent: {
    tag: 'reagent',
    basePrice: 80,
    weight: 0.1,
    markets: ['reagents (alchemical)'],
    ..._material
  },
  gemstone: {
    tag: 'gemstone',
    basePrice: 1000,
    weight: 0.1,
    markets: ['metals (gemstones)'],
    ..._material
  }
}
