import { Armor } from '../../../items/armor/types'
import { Weapon } from '../../../items/weapons/types'

export type EquipableSlot = 'armor' | 'mainhand' | 'offhand'

export type Equipable = Armor | Weapon

export type Equipment = {
  mainhand: null | Equipable
  offhand: null | Equipable
  armor: null | Equipable
}
