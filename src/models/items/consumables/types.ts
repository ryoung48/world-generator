import { ActorAttribute } from '../../npcs/actors/stats/attributes/types'
import { resistance } from '../../npcs/stats/types'
import type { Item } from '../types'

const baseConsumables = [
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

const resistanceConsumables = ['poison (resistance)', 'potion (resistance)'] as const
const attributeConsumables = ['poison (attribute)', 'potion (attribute)'] as const

export const consumable__types = [
  ...baseConsumables,
  ...resistanceConsumables,
  ...attributeConsumables
]

export type consumable__tag = typeof consumable__types[number]

export interface Consumable extends Item {
  tag: typeof baseConsumables[number]
}

export interface ResistanceConsumable extends Item {
  tag: typeof resistanceConsumables[number]
  resistance?: resistance
}
export interface AttributeConsumable extends Item {
  tag: typeof attributeConsumables[number]
  attribute?: ActorAttribute
}

export type Consumables = Consumable | ResistanceConsumable | AttributeConsumable
