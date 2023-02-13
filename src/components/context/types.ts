import { Codex, UpdateCodex } from '../../models/utilities/codex'

export type Avatar = { cr: number; npcs: number[] }

export type ViewState = {
  id: string
  codex: Codex
  journal: number[]
  gps: { x: number; y: number; zoom: number }
  time: number
  borderChange: boolean
  avatar: Avatar
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
  | { type: 'progress'; payload: { xp: number; duration: number } }
