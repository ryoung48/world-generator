import { item__key } from '../../../items'
import { item__isArmor } from '../../../items/armor'
import { armor__types } from '../../../items/armor/types'
import { Item } from '../../../items/types'
import { item__isTwoHandedWeapon, item__isWeapon, weapons } from '../../../items/weapons'
import { Weapon, weapon__types } from '../../../items/weapons/types'
import { inventory__filter, npc__addItem, npc__removeItem } from '../../inventory'
import { Actor } from '../types'
import { Equipable, EquipableSlot, Equipment } from './types'

const equipables: string[] = [...armor__types, ...weapon__types]
export const item__isEquipable = (item: Item): item is Equipable => {
  return equipables.includes(item.tag)
}

export const equipment__spawn = (): Equipment => ({
  armor: null,
  offhand: null,
  mainhand: null
})

export const equipable__slot = (item: Item): EquipableSlot => {
  if (item__isArmor(item)) return 'armor'
  if (item__isWeapon(item) && weapons[item.tag].handing === 'offhand') return 'offhand'
  return 'mainhand'
}

export const actor__unequipItem = (params: { actor: Actor; slot: EquipableSlot }) => {
  const { actor, slot } = params
  const { equipment } = actor
  if (equipment[slot]) {
    npc__addItem({ npc: actor, item: equipment[slot] })
    equipment[slot] = null
    actor.equipment = { ...equipment }
  }
}

interface EquipItemParams<T extends Equipable> {
  actor: Actor
  item: T
  force?: boolean
  slot?: EquipableSlot
}

export const item__equip = ({
  actor,
  item,
  force,
  slot = equipable__slot(item)
}: EquipItemParams<Equipable>) => {
  const { equipment } = actor
  if (!equipment[slot] || item.tier > equipment[slot].tier || force) {
    npc__removeItem({ npc: actor, key: item__key(item), quantity: 1 })
    actor__unequipItem({ actor, slot })
    equipment[slot] = item
    actor.equipment = { ...equipment }
  }
}

const equipWeapon = ({ actor, item, force }: EquipItemParams<Weapon>) => {
  const { handing } = weapons[item.tag]
  const mainhand = actor.equipment.mainhand
  const twohanded = item__isTwoHandedWeapon(mainhand)
  let slot = equipable__slot(item)
  // attempt to dual wield one handed weapons if possible
  if (handing === 'one-handed') {
    slot = !twohanded && mainhand.tier >= item.tier ? 'offhand' : 'mainhand'
  }
  item__equip({ actor, item, force, slot })
  // unequip offhand if equipping a two-handed weapon
  if (handing === 'two-handed') actor__unequipItem({ actor, slot: 'offhand' })
  // unequip mainhand if equipping an offhand and holding a two-handed weapon
  else if (slot === 'offhand' && twohanded) actor__unequipItem({ actor, slot: 'mainhand' })
}

export const actor__equipItem = ({ item, actor, force }: EquipItemParams<Equipable>) => {
  if (item__isWeapon(item)) equipWeapon({ item, actor, force })
  else item__equip({ item, actor, force })
}

const tierCompare = (a: Equipable, b: Equipable) => b.tier - a.tier

export const actor__equipBest = (actor: Actor) => {
  const armor = inventory__filter(actor.inventory, 'armor') as Equipable[]
  armor.sort(tierCompare).forEach(item => actor__equipItem({ actor, item }))
  const weapons = inventory__filter(actor.inventory, 'weapons') as Equipable[]
  weapons.sort(tierCompare).forEach(item => actor__equipItem({ actor, item }))
}

export const actor__unequipAll = (actor: Actor) => {
  Object.values(actor.equipment)
    .filter(item => item)
    .forEach(item => actor__unequipItem({ actor, slot: equipable__slot(item) }))
}
