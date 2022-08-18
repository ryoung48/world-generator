import { scale } from '../../utilities/math'
import { item__basicDetails, item__tierScale } from '../types'
import { enchantment__armor } from './armor'
import { EnchantableItem, Enchantment, EnchantmentInstance } from './types'
import { enchantments__weapons } from './weapons'

const enchantments: Record<EnchantmentInstance['tag'], Enchantment> = {
  ...enchantment__armor,
  ...enchantments__weapons
}

export const item__enchantedDetails = {
  ...item__basicDetails,
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
    const enchantPrice = item.enchantment ? scale([0, 6500], [5000, 15000], this.basePrice) : 0
    const basePrice = this.basePrice + enchantPrice
    return basePrice * item__tierScale ** item.tier
  }
}
