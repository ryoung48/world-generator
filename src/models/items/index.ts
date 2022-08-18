import { accessories } from './accessories'
import { Accessory } from './accessories/types'
import { armor } from './armor'
import { Armor } from './armor/types'
import { consumables } from './consumables'
import { Consumables } from './consumables/types'
import { materials } from './materials'
import { Material } from './materials/types'
import { miscItems } from './misc'
import { MiscItem } from './misc/types'
import { Item, ItemDetails } from './types'
import { weapons } from './weapons'
import { Weapon } from './weapons/types'

export const item__lookup: Record<Item['tag'], ItemDetails> = {
  ...armor,
  ...weapons,
  ...consumables,
  ...materials,
  ...accessories,
  ...miscItems
}

export const item__key = (item: Item) => item__lookup[item.tag].key(item)
export const item__spawn = (item: Accessory | Armor | Consumables | Material | MiscItem | Weapon) =>
  item__lookup[item.tag].spawn(item)
