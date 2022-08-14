import { attributes } from '../../npcs/actors/stats/attributes/types'
import { resistances } from '../../npcs/stats/types'
import { market_groups } from '../economy'
import { item__basic_details, ItemDetails } from '../types'
import { AttributeConsumable, Consumable, consumable__tag, ResistanceConsumable } from './types'

abstract class ConsumableDetails extends ItemDetails {
  abstract value(_item: Consumable): number
}

const _consumable: Omit<ConsumableDetails, 'tag'> = {
  ...item__basic_details,
  category: 'consumables',
  weight: 1,
  base_price: 1200,
  markets: market_groups.alchemical
}
const _poison: Omit<ConsumableDetails, 'tag'> = {
  ..._consumable,
  base_price: 2400
}

abstract class ResistancePotionDetails extends ConsumableDetails {
  abstract key(_item: ResistanceConsumable): string
  abstract spawn(_item: ResistanceConsumable): ResistanceConsumable
}
const resistance_key: ResistancePotionDetails['key'] = item =>
  `${item.tag}:${item.tier}:${item.resistance}`
const resistance_spawn: ResistancePotionDetails['spawn'] = item => {
  item.resistance = item.resistance ?? window.dice.choice([...resistances])
  return item
}
const resistance_consumables: Record<ResistanceConsumable['tag'], ResistancePotionDetails> = {
  'poison (resistance)': {
    ..._poison,
    tag: 'poison (resistance)',
    key: resistance_key,
    spawn: resistance_spawn
  },
  'potion (resistance)': {
    ..._consumable,
    tag: 'potion (resistance)',
    key: resistance_key,
    spawn: resistance_spawn
  }
}
abstract class AttributePotionDetails extends ConsumableDetails {
  abstract key(_item: AttributeConsumable): string
  abstract spawn(_item: AttributeConsumable): AttributeConsumable
}
const attribute_key: AttributePotionDetails['key'] = item =>
  `${item.tag}:${item.tier}:${item.attribute}`
const attribute_spawn: AttributePotionDetails['spawn'] = item => {
  item.attribute = item.attribute ?? window.dice.choice([...attributes])
  return item
}
const attribute_consumables: Record<AttributeConsumable['tag'], AttributePotionDetails> = {
  'poison (attribute)': {
    ..._poison,
    tag: 'poison (attribute)',
    key: attribute_key,
    spawn: attribute_spawn
  },
  'potion (attribute)': {
    ..._consumable,
    tag: 'potion (attribute)',
    key: attribute_key,
    spawn: attribute_spawn
  }
}
export const consumables: Record<consumable__tag, ConsumableDetails> = {
  'poison (latent)': {
    tag: 'poison (latent)',
    ..._poison
  },
  'poison (corrosive)': {
    tag: 'poison (corrosive)',
    ..._poison
  },
  'poison (paralytic)': {
    tag: 'poison (paralytic)',
    ..._poison
  },
  'poison (fear)': {
    tag: 'poison (fear)',
    ..._poison
  },
  'poison (sleep)': {
    tag: 'poison (sleep)',
    ..._poison
  },
  'potion (antitoxin)': {
    tag: 'potion (antitoxin)',
    ..._consumable
  },
  'potion (cure disease)': {
    tag: 'potion (cure disease)',
    ..._consumable
  },
  'potion (healing)': {
    tag: 'potion (healing)',
    ..._consumable
  },
  'potion (stoneskin)': {
    tag: 'potion (stoneskin)',
    ..._consumable
  },
  ...attribute_consumables,
  ...resistance_consumables,
  ink: {
    tag: 'ink',
    ..._consumable,
    base_price: 500,
    weight: 0.1
  }
}
