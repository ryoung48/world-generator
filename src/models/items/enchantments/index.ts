import { scale } from '../../utilities/math'
import { item__basic_details, item__tier_scale } from '../types'
import { enchantment__armor } from './armor'
import { EnchantableItem, Enchantment, EnchantmentInstance } from './types'
import { enchantments__weapons } from './weapons'

const enchantments: Record<EnchantmentInstance['tag'], Enchantment> = {
  ...enchantment__armor,
  ...enchantments__weapons
}

export const item__enchanted_details = {
  ...item__basic_details,
  key: (item: EnchantableItem) => {
    const { enchantment } = item
    return `${item.tag}:${item.tier}${
      enchantment ? `:${enchantments[enchantment.tag].key(enchantment)}` : ''
    }`
  },
  description: function (item: EnchantableItem) {
    const { enchantment } = item
    return `${this._description}${
      enchantment
        ? ` ${enchantments[enchantment.tag].description({ item, instance: enchantment })}`
        : ''
    }`
  },
  value: function (item: EnchantableItem) {
    const enchant_price = item.enchantment ? scale([0, 6500], [5000, 15000], this.base_price) : 0
    const base_price = this.base_price + enchant_price
    return base_price * item__tier_scale ** item.tier
  }
}
