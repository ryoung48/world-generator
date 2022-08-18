import { attribute } from '../../../npcs/actors/stats/attributes/types'
import { persona } from '../../../npcs/actors/stats/persona'
import { ActorSkills } from '../../../npcs/actors/stats/skills/categories'
import { resistance } from '../../../npcs/stats/types'
import { EnchantmentInstance } from '../types'

export const armor__enchantments = [
  'aquatic',
  'inspiration',
  'bastion',
  'blindsight',
  'dread',
  'emissary',
  'empowered',
  'glamored',
  'guardian',
  'memories',
  'pact',
  'persona',
  'rebirth',
  'regeneration',
  'shadow',
  'shroud',
  'swift',
  'thorns',
  'vessel',
  'warding',
  'wild magic',
  'wraith'
] as const

export type armor__enchant = typeof armor__enchantments[number]

export interface InspirationEnchantmentInstance extends EnchantmentInstance {
  attribute: attribute
}
export interface EmpoweredEnchantmentInstance extends EnchantmentInstance {
  element: resistance
}
export interface MemoriesEnchantmentInstance extends EnchantmentInstance {
  skills: ActorSkills[]
}
export interface PersonaEnchantmentInstance extends EnchantmentInstance {
  persona: persona
}
export interface WardingEnchantmentInstance extends EnchantmentInstance {
  element: resistance
}
