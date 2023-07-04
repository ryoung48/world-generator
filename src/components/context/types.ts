import { Item } from '../../models/npcs/equipment/types'
import { NPC } from '../../models/npcs/types'
import { Province } from '../../models/regions/provinces/types'
import { Region } from '../../models/regions/types'
import { Thread } from '../../models/threads/types'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  region: number
  province: number
  journal: number[]
  gps: { x: number; y: number; zoom: number }
  time: number
  borderChange: boolean
  avatar: Avatar
  loading: boolean
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | { type: 'select region'; payload: { target: Region } }
  | { type: 'select province'; payload: { target: Province } }
  | { type: 'start adventure' }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'refresh journal' }
  | { type: 'loading'; payload: boolean }
  | { type: 'progress'; payload: { thread: Thread } }
  | { type: 'purchase'; payload: { npc: NPC; item: Item } }
