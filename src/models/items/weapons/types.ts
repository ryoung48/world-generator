import type { EnchantableItem } from '../enchantments/types'

export const weapon__types = [
  // bows & crossbows
  'arbalest',
  'crossbow',
  'hunting bow',
  'war bow',
  // firearms
  'blunderbuss',
  'pistol',
  'arquebus',
  // implements
  'wand',
  'scepter',
  'rod',
  // light weapons
  'dagger',
  'stiletto',
  'battle axe',
  'club',
  'flail',
  'hatchet',
  'mace',
  'rapier',
  'sabre',
  'spear',
  'sword',
  'war hammer',
  // heavy weapons
  'estoc',
  'greatsword',
  'morning star',
  'pike',
  'poleaxe',
  'quarterstaff',
  // shields
  'small shield',
  'medium shield',
  'large shield'
] as const
export type weapon__tag = typeof weapon__types[number]
export type weapon__handing = 'one-handed' | 'two-handed' | 'offhand'

export interface Weapon extends EnchantableItem {
  tag: weapon__tag
}
