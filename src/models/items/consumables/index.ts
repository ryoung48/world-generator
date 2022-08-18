import { attributes } from '../../npcs/actors/stats/attributes/types'
import { resistances } from '../../npcs/stats/types'
import { marketGroups } from '../economy'
import { item__basicDetails, ItemDetails } from '../types'
import { AttributeConsumable, Consumable, consumable__tag, ResistanceConsumable } from './types'

abstract class ConsumableDetails extends ItemDetails {
  abstract value(_item: Consumable): number
}

const _consumable: Omit<ConsumableDetails, 'tag'> = {
  ...item__basicDetails,
  category: 'consumables',
  weight: 1,
  basePrice: 1200,
  markets: marketGroups.alchemical
}
const _poison: Omit<ConsumableDetails, 'tag'> = {
  ..._consumable,
  basePrice: 2400
}

abstract class ResistancePotionDetails extends ConsumableDetails {
  abstract key(_item: ResistanceConsumable): string
  abstract spawn(_item: ResistanceConsumable): ResistanceConsumable
}
const resistanceKey: ResistancePotionDetails['key'] = item =>
  `${item.tag}:${item.tier}:${item.resistance}`
const resistanceSpawn: ResistancePotionDetails['spawn'] = item => {
  item.resistance = item.resistance ?? window.dice.choice([...resistances])
  return item
}
const resistanceConsumables: Record<ResistanceConsumable['tag'], ResistancePotionDetails> = {
  'poison (resistance)': {
    ..._poison,
    tag: 'poison (resistance)',
    key: resistanceKey,
    spawn: resistanceSpawn
  },
  'potion (resistance)': {
    ..._consumable,
    tag: 'potion (resistance)',
    key: resistanceKey,
    spawn: resistanceSpawn
  }
}
abstract class AttributePotionDetails extends ConsumableDetails {
  abstract key(_item: AttributeConsumable): string
  abstract spawn(_item: AttributeConsumable): AttributeConsumable
}
const attributeKey: AttributePotionDetails['key'] = item =>
  `${item.tag}:${item.tier}:${item.attribute}`
const attributeSpawn: AttributePotionDetails['spawn'] = item => {
  item.attribute = item.attribute ?? window.dice.choice([...attributes])
  return item
}
const attributeConsumables: Record<AttributeConsumable['tag'], AttributePotionDetails> = {
  'poison (attribute)': {
    ..._poison,
    tag: 'poison (attribute)',
    key: attributeKey,
    spawn: attributeSpawn
  },
  'potion (attribute)': {
    ..._consumable,
    tag: 'potion (attribute)',
    key: attributeKey,
    spawn: attributeSpawn
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
  ...attributeConsumables,
  ...resistanceConsumables,
  ink: {
    tag: 'ink',
    ..._consumable,
    basePrice: 500,
    weight: 0.1
  }
}
