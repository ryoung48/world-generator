import { marketGroups } from '../economy'
import { item__enchantedDetails } from '../enchantments'
import { ItemDetails } from '../types'
import { Accessory, accessory__tag } from './types'

abstract class AccessoryDetails extends ItemDetails {
  abstract value(_item: Accessory): number
}

const _accessory: Omit<AccessoryDetails, 'tag' | 'weight' | 'markets'> = {
  ...item__enchantedDetails,
  category: 'accessories'
}
export const accessories: Record<accessory__tag, AccessoryDetails> = {
  hat: {
    ..._accessory,
    tag: 'hat',
    weight: 1,
    basePrice: 600,
    markets: marketGroups.leather,
    _description: 'Hats come in many different shapes, sizes, and a wide array of colors.'
  },
  helmet: {
    ..._accessory,
    tag: 'helmet',
    weight: 3,
    basePrice: 2400,
    markets: marketGroups.metal,
    _description:
      'Helmets are the heaviest form of head wear, but tend to offer the best protection in combat.'
  },
  hood: {
    ..._accessory,
    tag: 'hood',
    weight: 1,
    basePrice: 600,
    markets: marketGroups.textiles,
    _description: 'Hoods are popular for the warmth and anonymity that they provide.'
  },
  gloves: {
    ..._accessory,
    tag: 'gloves',
    basePrice: 300,
    weight: 1,
    markets: marketGroups.textiles,
    _description: 'Gloves offer a variety of benefits, including being warm and light-weight.'
  },
  bracers: {
    ..._accessory,
    tag: 'gloves',
    weight: 2,
    basePrice: 300,
    markets: marketGroups.leather,
    _description: 'Bracers slightly heavier than gloves, but offer better protection.'
  },
  gauntlets: {
    ..._accessory,
    tag: 'gloves',
    weight: 3,
    basePrice: 1200,
    markets: marketGroups.metal,
    _description:
      'Gauntlets are much heavier than gloves or bracers, but offer the best protection.'
  },
  boots: {
    ..._accessory,
    tag: 'boots',
    basePrice: 300,
    weight: 2,
    markets: marketGroups.leather,
    _description:
      'Boots are worn for both comfort and style. Most often made of leather, they can be custom-made to suit a variety of terrains and purposes.'
  },
  amulet: {
    ..._accessory,
    tag: 'amulet',
    basePrice: 1000,
    weight: 0.5,
    markets: marketGroups.jewelry,
    _description:
      'Amulets are most often gems, medallions, or other items worn around the neck. They often serve a purely ornamental purpose, but many are imbued with charms and spells to aid the wearer.'
  },
  ring: {
    ..._accessory,
    tag: 'ring',
    basePrice: 500,
    weight: 0.2,
    markets: marketGroups.jewelry,
    _description:
      'Rings can feature plain bands or jewels in settings. Magical rings may bestow a variety of special properties or defenses on the wearer. Their small size allows their enchantments to complement similar enchantments from other items and spells, and this versatility has made them popular among adventurers.'
  },
  belt: {
    ..._accessory,
    tag: 'belt',
    basePrice: 100,
    weight: 1,
    markets: marketGroups.leather,
    _description:
      "Apart from holding up one's trousers, belts are much-favored by enchanters, for the material portion is easily crafted, typically light in weight, and requires few adjustments to those pieces of armor which contribute in more direct ways to protection. As such they are second only to rings in volume, and commonly peddled in urban markets."
  }
}
