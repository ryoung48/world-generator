import { market_groups } from '../economy'
import { item__enchanted_details } from '../enchantments'
import { Item, ItemDetails, quality } from '../types'
import { Weapon, weapon__handing, weapon__tag, weapon__types } from './types'

const value_by_quality = {
  [quality.poor]: 500,
  [quality.fair]: 12500,
  [quality.fine]: 55500,
  [quality.exquisite]: 172500,
  [quality.masterwork]: 500700
}

abstract class WeaponDetails extends ItemDetails {
  abstract handing: weapon__handing
  abstract value(_item: Weapon): number
  abstract description(_item: Weapon): string
}

const _weapon: Omit<WeaponDetails, 'tag' | 'weight' | 'markets'> = {
  ...item__enchanted_details,
  handing: 'one-handed',
  category: 'weapons',
  value: function (item: Weapon) {
    const mod = this.handing === 'two-handed' ? 1 : 0.5
    return value_by_quality[item.tier] * mod
  }
}
export const weapons: Record<weapon__tag, WeaponDetails> = {
  // crossbows
  arbalest: {
    ..._weapon,
    tag: 'arbalest',
    base_price: 3000,
    weight: 12,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'Arbalests are heavy crossbows with exceptionally high power. They must be hand-cranked before loading, so they have a slow rate of fire.'
  },
  crossbow: {
    ..._weapon,
    tag: 'crossbow',
    base_price: 2500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'Crossbows are commonly used for hunting by nobles in the civilized regions, but they are also employed as weapons of war by many soldiers and adventurers. Less powerful than their close sibling, the arbalest, crossbows can be cocked by hand and have a moderately fast rate of fire.'
  },
  // bows
  'hunting bow': {
    ..._weapon,
    tag: 'hunting bow',
    base_price: 2000,
    weight: 3,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'Hunting bows are extremely popular in rural areas. Though used most frequently for hunting deer and small game, hunting bows can be deadly against two-legged prey. Hunting bows lack the high draw weight of war bows but can be fired more quickly.'
  },
  'war bow': {
    ..._weapon,
    tag: 'war bow',
    base_price: 2500,
    weight: 2,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      "Though war bows are outnumbered by hunting bows in the rural areas, war bows are more popular among professional soldiers and adventurers. With a high draw weight and respectable speed, they possess a power unmatched by magical implements and don't have the lengthy reloading times of crossbows and firearms."
  },
  //firearms
  arquebus: {
    ..._weapon,
    tag: 'arquebus',
    base_price: 3000,
    weight: 10,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      "Matchlock firearms of high power and fair accuracy, arquebuses are prized for their ability to harm enemies protected by the Veil, including spirits and wizards' Arcane Veils."
  },
  blunderbuss: {
    ..._weapon,
    tag: 'blunderbuss',
    base_price: 2000,
    weight: 10,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      "Blunderbusses are matchlock firearms used for hunting or in combat against groups of enemies. They can inflict an impressive amount of damage but fare poorly against armor. Despite this, like other firearms, blunderbusses are capable of harming enemies protected by the Veil, including spirits and wizards' Arcane Veils."
  },
  pistol: {
    ..._weapon,
    tag: 'pistol',
    base_price: 1500,
    weight: 2,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      "Pistols are small firearms. They are not as powerful as arquebuses, but they can be reloaded much more quickly. As with all firearms, pistols have the ability to harm enemies protected by the Veil, including spirits and wizards' Arcane Veils."
  },
  // implements
  wand: {
    ..._weapon,
    tag: 'wand',
    base_price: 1500,
    weight: 1,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Wands are the smallest of the magical implements and are usually made from wood or bone. While not as innately powerful as scepters or rods, they can hurl bolts of arcane energy more quickly.'
  },
  scepter: {
    ..._weapon,
    tag: 'scepter',
    base_price: 1500,
    weight: 3,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Scepters are the most imperious-looking magical implements and are often favored by professional wizards for this reason. Like rods, they have flexible damage types.'
  },
  rod: {
    ..._weapon,
    tag: 'rod',
    base_price: 3000,
    weight: 6,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'Rods are the largest of the magical implements and can be distinguished from wands and scepters by the "heads" on each end. Rods focus and release more soul energy than wands or scepters. This attribute makes their blows more powerful, but they recharge and fire more slowly.'
  },
  // light weapons
  dagger: {
    ..._weapon,
    tag: 'dagger',
    base_price: 300,
    weight: 1,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Daggers are among the most common personal weapons found in both rural and urban areas. Whether simple or ornate, all daggers are fast and dangerous in the hands of a skilled wielder.'
  },
  stiletto: {
    ..._weapon,
    tag: 'stiletto',
    base_price: 300,
    weight: 1,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      "Stilettos are similar to daggers but differ subtly in their shape and function. Made for penetrating armor, stilettos feature a stiff piercing blade that resembles a shrunken estoc's. Though they are not powerful weapons, they can strike deadly blows rapidly against a lightly-armored opponent."
  },
  'battle axe': {
    ..._weapon,
    tag: 'battle axe',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Capable of delivering powerful blows from their broad, curved blades, battle axes are commonly used by professional soldiers in various militaries.'
  },
  club: {
    ..._weapon,
    tag: 'club',
    base_price: 300,
    weight: 4,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Most commonly fashioned from a short length of wood, clubs are simple but fast and effective weapons.'
  },
  flail: {
    ..._weapon,
    tag: 'flail',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Flails are fashioned from a metal ball, often spiked, linked to a wooden or metal handle via a short chain. They are popular among soldiers for their ability to foil the defensive properties of shields.'
  },
  hatchet: {
    ..._weapon,
    tag: 'hatchet',
    base_price: 300,
    weight: 6,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      "Small and swift, the humble hatchet is extremely common in rural areas, both as a woodsman's tool and a hunter's weapon. Much smaller than a true battle axe, the hatchet's great speed allows its wielder to strike many blows in a short time."
  },
  mace: {
    ..._weapon,
    tag: 'mace',
    base_price: 1500,
    weight: 9,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      "The bane of mailed soldiers throughout the known world, maces are a common sight in the hands of professional soldiers and adventurers. Regardless of the shape of their flanges, maces always consist of a metal shaft topped with a number of symmetrical flanges that focus the weapon's power to a small point. Though estocs have even more penetrating power than maces, the latter can be used in concert with a shield."
  },
  rapier: {
    ..._weapon,
    tag: 'rapier',
    base_price: 1000,
    weight: 6,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Light and fast, rapiers are precise weapons favored by urban duelists. They are not known for being especially powerful, but a skilled wielder can rely on rapiers to accurately land blows.'
  },
  sabre: {
    ..._weapon,
    tag: 'sabre',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Sabres are curved, single-edged swords capable of inflicting severe wounds. Though they are less effective against armor than standard swords, they are deadly against unarmored enemies.'
  },
  sword: {
    ..._weapon,
    tag: 'sword',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Whether single-edged or double-edged, swords are always straight-bladed one-handed weapons that can be used to cut or thrust at an enemy. In some circumstances, swords lack the raw slashing power of sabres, but they are more flexible against a variety of armor types.'
  },
  spear: {
    ..._weapon,
    tag: 'spear',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'Spears are not as long as their two-handed kin, pikes, but they are easier to maneuver and can be used with a shield. Even with a one-handed grip, spears can strike fierce blows with high accuracy.'
  },
  'war hammer': {
    ..._weapon,
    tag: 'war hammer',
    base_price: 1500,
    weight: 9,
    markets: market_groups.metal,
    handing: 'one-handed',
    _description:
      'War hammers have the tactical flexibility of a morning star in a much smaller size. By switching from the flat side of the head to the pick, wielders can adapt their damage type to the opponents they are facing.'
  },
  // heavy weapons
  estoc: {
    ..._weapon,
    tag: 'estoc',
    base_price: 3000,
    weight: 12,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'These long, two-handed swords are easily distinguished from greatswords by their narrow, spike-shaped blades. Estocs are not very common, but their value against heavily-armored opponents is undisputed.'
  },
  greatsword: {
    ..._weapon,
    tag: 'greatsword',
    base_price: 3000,
    weight: 12,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'The great sword is renowned for its ability to cause deadly wounds even against terrible beasts. Though it is a relatively slow weapon and requires the use of both hands, it is truly devastating when used by a skilled warrior.'
  },
  'morning star': {
    ..._weapon,
    tag: 'morning star',
    base_price: 3000,
    weight: 16,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'The big brother of the mace, morning stars are two-handed weapons topped with a spiked head. They lack the armor penetrating power of maces but are effective against a wider range of armor types.'
  },
  pike: {
    ..._weapon,
    tag: 'pike',
    base_price: 3000,
    weight: 12,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'Pikes are easily the longest weapons in common use by soldiers and adventurers. Powerful two-handed piercing weapons, the main advantage pikes have is their long reach, which allows wielders to attack enemies from behind their allies.'
  },
  poleaxe: {
    ..._weapon,
    tag: 'poleaxe',
    base_price: 3000,
    weight: 14,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      'The versatile pollaxe is a powerful and flexible weapon that can deal devastating blows even against a fully-armored opponent. Its straight-bladed axe head is opposed by a hammer, allowing the wielder to switch between different damage types as circumstances require.'
  },
  quarterstaff: {
    ..._weapon,
    tag: 'quarterstaff',
    base_price: 500,
    weight: 10,
    markets: market_groups.metal,
    handing: 'two-handed',
    _description:
      "Deceptively simple, quarterstaves can be powerful weapons in the hands of a skilled combatant. Wielders can use a quarterstaff's long reach to deliver crushing blows from behind their allies."
  },
  // shields
  'small shield': {
    ..._weapon,
    tag: 'small shield',
    base_price: 1000,
    weight: 4,
    markets: market_groups.metal,
    handing: 'offhand',
    _description:
      "Though they don't offer much protection, small shields do not interfere with a warrior's accuracy at all. Unlike larger shields, which are worn on the forearm, small shields are held in the hand."
  },
  'medium shield': {
    ..._weapon,
    tag: 'medium shield',
    base_price: 1500,
    weight: 8,
    markets: market_groups.metal,
    handing: 'offhand',
    _description:
      'Medium shields offer a moderate improvement in protection with a small reduction to accuracy. They are the most commonly-used shields.'
  },
  'large shield': {
    ..._weapon,
    tag: 'large shield',
    base_price: 2000,
    weight: 12,
    markets: market_groups.metal,
    handing: 'offhand',
    _description:
      'Large shields are used when a warrior needs the best protection possible, even if that means sacrificing some accuracy in exchange. Though they typically taper like an inverted "teardrop", large shields come in a variety of shapes, often emblazoned with heraldry.'
  }
}

const weapon_types: string[] = [...weapon__types]
export const item__is_weapon = (item: Item): item is Weapon => {
  return weapon_types.includes(item?.tag)
}
export const item__is_two_handed_weapon = (item: Item) => {
  return item__is_weapon(item) && weapons[item.tag].handing === 'two-handed'
}
