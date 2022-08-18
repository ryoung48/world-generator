import { Actor } from '../../models/npcs/actors/types'
import { Codex, UpdateCodex } from '../../models/utilities/codex'

export type ViewState = {
  id: string
  codex: Codex
  gps: { x: number; y: number; zoom: number }
  time: number
  borderChange: boolean
  avatar: number
}

export type ViewActions =
  | { type: 'init'; payload: { id: string } }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | {
      type: 'update codex'
      payload: { target: UpdateCodex['target']; disableZoom?: boolean }
    }
  | { type: 'tick'; payload: { duration: number } }
  | { type: 'back' }
  | { type: 'set avatar'; payload: { avatar: Actor } }
