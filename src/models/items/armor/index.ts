import { marketGroups } from '../economy'
import { item__enchantedDetails } from '../enchantments'
import { Item, ItemDetails } from '../types'
import { Armor, armor__tag, armor__types } from './types'

abstract class ArmorDetails extends ItemDetails {
  abstract value(_item: Armor): number
}

const _armor: Omit<ArmorDetails, 'tag' | 'weight' | 'markets'> = {
  ...item__enchantedDetails,
  category: 'armor'
}
export const armor: Record<armor__tag, ArmorDetails> = {
  outfit: {
    ..._armor,
    tag: 'outfit',
    basePrice: 300,
    weight: 4,
    markets: marketGroups.textiles,
    _description:
      'Offering minimal protection, cloth armor consists of layers of wool or linen cloth. Though it does not provide much protection, it is the least restrictive type of body armor.'
  },
  'padded armor': {
    ..._armor,
    tag: 'padded armor',
    basePrice: 600,
    weight: 8,
    markets: marketGroups.textiles,
    _description:
      'Padded armor consists of heavily quilted wool or linen and offers modest protection against crushing attacks. Though it cannot protect against heavy attacks, it does not slow its wearers down much.'
  },
  'hide armor': {
    ..._armor,
    tag: 'hide armor',
    basePrice: 1000,
    weight: 12,
    markets: marketGroups.leather,
    _description:
      'Hide armor is commonly worn by woodsmen, tribal explorers, and those who favor speed over protection. Hide armor is made of layers of soft leather. Though its construction often requires multiple layers to provide dependable protection, it does little to slow its wearer in combat.'
  },
  'leather armor': {
    ..._armor,
    tag: 'leather armor',
    basePrice: 1500,
    weight: 20,
    markets: marketGroups.leather,
    _description:
      'Stiffer and more durable than ordinary hide armor, leather armor is shaped and boiled in oil to achieve its distinctive finish and toughness. Leather armor is often chosen by adventurers who want a balance of protection and speed.'
  },
  'scale armor': {
    ..._armor,
    tag: 'scale armor',
    basePrice: 2500,
    weight: 25,
    markets: marketGroups.metal,
    _description:
      'Scale armor is made of overlapping small plates of metal or horn sewn to a leather backing. It offers a balance of protection and speed.'
  },
  breastplate: {
    ..._armor,
    tag: 'breastplate',
    basePrice: 3000,
    weight: 30,
    markets: marketGroups.metal,
    _description:
      'Breastplates are popular for offering a modest amount of protection without the restrictive movement of heavier mail and full suits of plate armor.'
  },
  'mail armor': {
    ..._armor,
    tag: 'mail armor',
    basePrice: 3500,
    weight: 55,
    markets: marketGroups.metal,
    _description:
      'Mail armor is quite popular for its protective qualities, especially against slashing attacks. Mail is comprised of thousands of small rings of steel that form a flexible mesh. Normally worn over a padded jacket, mail protects well but restricts its wearer in combat.'
  },
  brigandine: {
    ..._armor,
    tag: 'brigandine',
    basePrice: 5000,
    weight: 60,
    markets: marketGroups.metal,
    _description:
      'Despite its unassuming appearance, brigandine provides impressive protection to its wearer at a cost of speed in combat. It is made of dozens of steel plates sandwiched between canvas or leather. The plates are held in place by distinctive rivets across the surface of the brigandine.'
  },
  'plate armor': {
    ..._armor,
    tag: 'plate armor',
    basePrice: 6500,
    weight: 65,
    markets: marketGroups.metal,
    _description:
      'The heaviest armor in regular use by adventurers and soldiers, plate armor protects its wearers from all but the most severe blows. It is comprised of three layers: the base padding, a suit of mail, and the top layer of steel plates.'
  }
}

const armorTypes: string[] = [...armor__types]
export const item__isArmor = (item: Item): item is Armor => {
  return armorTypes.includes(item.tag)
}
