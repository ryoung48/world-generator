import type { EnchantableItem } from '../enchantments/types'

export const accessory__types = [
  // headgear
  'hat',
  'helmet',
  'hood',
  // hand gear
  'gloves',
  'gauntlets',
  'bracers',
  // jewelry
  'amulet',
  'ring',
  //  other
  'belt',
  'boots'
] as const

export type accessory__tag = typeof accessory__types[number]

export interface Accessory extends EnchantableItem {
  tag: accessory__tag
}
