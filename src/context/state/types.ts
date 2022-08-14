import { Actor } from '../../models/npcs/actors/types'
import { Codex, UpdateCodex } from '../../models/utilities/codex'

export type view__state = {
  id: string
  codex: Codex
  gps: { x: number; y: number; zoom: number }
  time: number
  border_change: boolean
  avatar: number
}

export type view__actions =
  | { type: 'init'; payload: { id: string } }
  | { type: 'update gps'; payload: { gps: view__state['gps'] } }
  | { type: 'update codex'; payload: { target: UpdateCodex['target']; disable_zoom?: boolean } }
  | { type: 'tick'; payload: { duration: number } }
  | { type: 'back' }
  | { type: 'set avatar'; payload: { avatar: Actor } }
