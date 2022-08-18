import { Item } from '../types'
import type { armor__enchant } from './armor/types'
import type { weapon__enchant } from './weapons/types'

export interface EnchantmentInstance {
  tag: armor__enchant | weapon__enchant
}

export interface EnchantableItem extends Item {
  enchantment?: EnchantmentInstance
  culture: number
}

export interface EnchantmentDescriptionParams<Instance extends EnchantmentInstance> {
  item: EnchantableItem
  instance: Instance
}

export type BasicEnchantmentDescription = EnchantmentDescriptionParams<EnchantmentInstance>

export abstract class Enchantment {
  tag: EnchantmentInstance['tag']
  public abstract description(_params: BasicEnchantmentDescription): string
  public abstract spawn(_instance: EnchantmentInstance): EnchantmentInstance
  public abstract key(_instance: EnchantmentInstance): string
}

export const enchantment__basicDetails = {
  key: (instance: EnchantmentInstance) => instance.tag,
  spawn: (instance: EnchantmentInstance) => instance
}

export const enchantment__itemTag = (item: BasicEnchantmentDescription['item']) =>
  `this ${item.tag}`
