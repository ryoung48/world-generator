import { attribute } from '../../npcs/actors/stats/attributes/types'
import { resistance } from '../../npcs/stats/types'
import type { Item } from '../types'

const base_consumables = [
  'poison (latent)',
  'poison (corrosive)',
  'poison (paralytic)',
  'poison (fear)',
  'poison (sleep)',
  'potion (antitoxin)',
  'potion (cure disease)',
  'potion (healing)',
  'potion (stoneskin)',
  'ink'
] as const

const resistance_consumables = ['poison (resistance)', 'potion (resistance)'] as const
const attribute_consumables = ['poison (attribute)', 'potion (attribute)'] as const

export const consumable__types = [
  ...base_consumables,
  ...resistance_consumables,
  ...attribute_consumables
]

export type consumable__tag = typeof consumable__types[number]

export interface Consumable extends Item {
  tag: typeof base_consumables[number]
}

export interface ResistanceConsumable extends Item {
  tag: typeof resistance_consumables[number]
  resistance?: resistance
}
export interface AttributeConsumable extends Item {
  tag: typeof attribute_consumables[number]
  attribute?: attribute
}

export type Consumables = Consumable | ResistanceConsumable | AttributeConsumable
