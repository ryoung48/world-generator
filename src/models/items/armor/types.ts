import type { EnchantableItem } from '../enchantments/types'

export const armor__types = [
  // light
  'outfit',
  'hide armor',
  'leather armor',
  'padded armor',
  // medium
  'breastplate',
  'mail armor',
  'scale armor',
  // heavy
  'brigandine',
  'plate armor'
] as const
export type armor__tag = typeof armor__types[number]

export interface Armor extends EnchantableItem {
  tag: armor__tag
}
