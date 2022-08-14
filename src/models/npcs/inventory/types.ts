import { Item } from '../../items/types'

export interface Inventory {
  items: Record<string, Item>
  currency: number
}
