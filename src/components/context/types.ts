import { Item } from '../../models/npcs/equipment/types'
import { NPC } from '../../models/npcs/types'
import { Codex, UpdateCodex } from '../../models/utilities/codex'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  codex: Codex
  journal: number[]
  gps: { x: number; y: number; zoom: number }
  time: number
  borderChange: boolean
  avatar: Avatar
  loading: boolean
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | { type: 'start adventure' }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'refresh journal' }
  | {
      type: 'update codex'
      payload: { target: UpdateCodex['target']; disableZoom?: boolean }
    }
  | { type: 'back' }
  | { type: 'loading'; payload: boolean }
  | { type: 'progress'; payload: { cp: number; duration: number } }
  | { type: 'purchase'; payload: { npc: NPC; item: Item } }
