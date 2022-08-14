import { accessory__tag } from './accessories/types'
import { armor__tag } from './armor/types'
import { consumable__tag } from './consumables/types'
import { trade_good } from './economy'
import { material__tag } from './materials/types'
import { misc_item__tag } from './misc/types'
import { weapon__tag } from './weapons/types'

export interface Item {
  tag: armor__tag | weapon__tag | consumable__tag | material__tag | accessory__tag | misc_item__tag
  quantity: number
  tier: number
}

export const item__tier_scale = 3.5

export const item__basic_details = {
  _description: '',
  base_price: 1,
  key: (item: Item) => `${item.tag}:${item.tier}`,
  spawn: (item: Item) => item,
  value: function (item: Item) {
    return this.base_price * item__tier_scale ** item.tier
  },
  description: function (_item: Item) {
    return this._description
  }
}

export const item__categories = [
  'weapons',
  'armor',
  'accessories',
  'consumables',
  'materials',
  'misc'
] as const

export type item__category = typeof item__categories[number]

export abstract class ItemDetails {
  abstract _description: string
  public abstract tag: Item['tag']
  public abstract value(_item: Item): number
  public abstract key(_item: Item): string
  public abstract spawn(_item: Item): Item
  public abstract description(_item: Item): string
  public weight: number
  public base_price: number
  public category: item__category
  public markets: trade_good[]
}

const _quality = ['poor', 'fair', 'fine', 'exquisite', 'masterwork'] as const

export const quality: Record<typeof _quality[number], number> = {
  poor: _quality.findIndex(size => size === 'poor'),
  fair: _quality.findIndex(size => size === 'fair'),
  fine: _quality.findIndex(size => size === 'fine'),
  exquisite: _quality.findIndex(size => size === 'exquisite'),
  masterwork: _quality.findIndex(size => size === 'masterwork')
}
