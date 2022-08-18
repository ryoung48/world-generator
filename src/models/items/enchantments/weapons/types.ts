import { resistance } from '../../../npcs/stats/types'
import { EnchantmentInstance } from '../types'

export const weapon__enchantments = [
  'bane',
  'bound',
  'celestial',
  'devour',
  'elemental',
  'fear',
  'harvest',
  'havoc',
  'insanity',
  'faith',
  'nobility',
  'reaper',
  'ruin',
  'sentient',
  'sentinel',
  'torpor',
  'vampiric',
  'vengeance',
  'windsong',
  'withering'
] as const

export type weapon__enchant = typeof weapon__enchantments[number]

export interface BaneEnchantmentInstance extends EnchantmentInstance {
  speciesType: 'beasts' | 'primordials' | 'vessels' | 'spirits'
}
export interface CelestialEnchantmentInstance extends EnchantmentInstance {
  time: 'dusk' | 'dawn'
}
export interface ElementalEnchantmentInstance extends EnchantmentInstance {
  element: resistance
}
export interface SentientEnchantmentInstance extends EnchantmentInstance {
  spirit: 'elemental' | 'fiend' | 'celestial' | 'shadow'
}
export interface SentinelEnchantmentInstance extends EnchantmentInstance {
  speciesType: BaneEnchantmentInstance['speciesType']
}
