import { item__key } from '../../../items'
import { item__is_armor } from '../../../items/armor'
import { armor__types } from '../../../items/armor/types'
import { Item } from '../../../items/types'
import { item__is_two_handed_weapon, item__is_weapon, weapons } from '../../../items/weapons'
import { Weapon, weapon__types } from '../../../items/weapons/types'
import { inventory__filter, npc__add_item, npc__remove_item } from '../../inventory'
import { Actor } from '../types'
import { Equipable, equipable_slot, Equipment } from './types'

const equipables: string[] = [...armor__types, ...weapon__types]
export const item__is_equipable = (item: Item): item is Equipable => {
  return equipables.includes(item.tag)
}

export const equipment__spawn = (): Equipment => ({
  armor: null,
  offhand: null,
  mainhand: null
})

export const equipable__slot = (item: Item): equipable_slot => {
  if (item__is_armor(item)) return 'armor'
  if (item__is_weapon(item) && weapons[item.tag].handing === 'offhand') return 'offhand'
  return 'mainhand'
}

export const actor__unequip_item = (params: { actor: Actor; slot: equipable_slot }) => {
  const { actor, slot } = params
  const { equipment } = actor
  if (equipment[slot]) {
    npc__add_item({ npc: actor, item: equipment[slot] })
    equipment[slot] = null
    actor.equipment = { ...equipment }
  }
}

interface EquipItemParams<T extends Equipable> {
  actor: Actor
  item: T
  force?: boolean
  slot?: equipable_slot
}

export const equip_item = ({
  actor,
  item,
  force,
  slot = equipable__slot(item)
}: EquipItemParams<Equipable>) => {
  const { equipment } = actor
  if (!equipment[slot] || item.tier > equipment[slot].tier || force) {
    npc__remove_item({ npc: actor, key: item__key(item), quantity: 1 })
    actor__unequip_item({ actor, slot })
    equipment[slot] = item
    actor.equipment = { ...equipment }
  }
}

const equip_weapon = ({ actor, item, force }: EquipItemParams<Weapon>) => {
  const { handing } = weapons[item.tag]
  const mainhand = actor.equipment.mainhand
  const twohanded = item__is_two_handed_weapon(mainhand)
  let slot = equipable__slot(item)
  // attempt to dual wield one handed weapons if possible
  if (handing === 'one-handed') {
    slot = !twohanded && mainhand.tier >= item.tier ? 'offhand' : 'mainhand'
  }
  equip_item({ actor, item, force, slot })
  // unequip offhand if equipping a two-handed weapon
  if (handing === 'two-handed') actor__unequip_item({ actor, slot: 'offhand' })
  // unequip mainhand if equipping an offhand and holding a two-handed weapon
  else if (slot === 'offhand' && twohanded) actor__unequip_item({ actor, slot: 'mainhand' })
}

export const actor__equip_item = ({ item, actor, force }: EquipItemParams<Equipable>) => {
  if (item__is_weapon(item)) equip_weapon({ item, actor, force })
  else equip_item({ item, actor, force })
}

const tier_compare = (a: Equipable, b: Equipable) => b.tier - a.tier

export const actor__equip_best = (actor: Actor) => {
  const armor = inventory__filter(actor.inventory, 'armor') as Equipable[]
  armor.sort(tier_compare).forEach(item => actor__equip_item({ actor, item }))
  const weapons = inventory__filter(actor.inventory, 'weapons') as Equipable[]
  weapons.sort(tier_compare).forEach(item => actor__equip_item({ actor, item }))
}

export const actor__unequip_all = (actor: Actor) => {
  Object.values(actor.equipment)
    .filter(item => item)
    .forEach(item => actor__unequip_item({ actor, slot: equipable__slot(item) }))
}
