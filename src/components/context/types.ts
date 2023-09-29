import { Item } from '../../models/npcs/equipment/types'
import { Actor } from '../../models/npcs/types'
import { TaggedEntity } from '../../models/utilities/entities/types'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  region: number
  province: number
  journal: number[]
  gps: { x: number; y: number; zoom: number }
  time: number
  avatar: Avatar
  loading: boolean
  view: TaggedEntity['tag']
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | { type: 'transition'; payload: { tag: TaggedEntity['tag']; idx: number; zoom?: boolean } }
  | { type: 'start adventure' }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'refresh journal' }
  | { type: 'loading'; payload: boolean }
  | { type: 'purchase'; payload: { npc: Actor; item: Item } }
