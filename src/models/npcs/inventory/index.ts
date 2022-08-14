import { item__key, item__lookup } from '../../items'
import { Item, item__categories, ItemDetails } from '../../items/types'
import { NPC } from '../types'
import { Inventory } from './types'

const item__cat_filter = (cat: ItemDetails['category']) => (item: Item) =>
  item__lookup[item.tag].category === cat

export const inventory__categories = ({ items }: Inventory): ItemDetails['category'][] => {
  const all_items = Object.values(items)
  return item__categories.filter(cat => all_items.some(item__cat_filter(cat)))
}

export const inventory__filter = ({ items }: Inventory, cat: ItemDetails['category']) => {
  const all_items = Object.values(items)
  return all_items.filter(item__cat_filter(cat))
}

export const inventory__spawn = (params?: { currency?: number; items?: Item[] }): Inventory => {
  const inventory: Inventory = { items: {}, currency: params?.currency ?? 0 }
  params?.items?.forEach(item => inventory__add_item({ inventory, item }))
  return inventory
}

const inventory__add_item = (params: { inventory: Inventory; item: Item }): void => {
  const { inventory, item } = params
  const { items } = inventory
  const key = item__key(item)
  const quantity = items[key]?.quantity ?? 0
  item.quantity += quantity
  items[key] = item
  inventory.items = { ...items }
}
export const npc__add_item = (params: { npc: NPC; item: Item }): void => {
  const { npc, item } = params
  inventory__add_item({ inventory: npc.inventory, item })
}

export const inventory__merge = (npcs: NPC[]): Inventory => {
  const items = npcs.map(({ inventory }) => Object.values(inventory.items)).flat()
  const currency = npcs.reduce((sum, { inventory }) => sum + inventory.currency, 0)
  return inventory__spawn({ currency, items })
}

const inventory__remove_item = (params: {
  inventory: Inventory
  key: string
  quantity: number
}) => {
  const { inventory, key, quantity } = params
  const { items } = inventory
  const curr = items[key]
  curr.quantity -= quantity
  if (curr.quantity <= 0) delete items[key]
  inventory.items = { ...items }
  return { ...curr, quantity }
}
export const npc__remove_item = (params: { npc: NPC; key: string; quantity: number }) => {
  const { npc, key, quantity } = params
  return inventory__remove_item({ inventory: npc.inventory, key, quantity })
}
