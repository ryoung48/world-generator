import { Codex, UpdateCodex } from '../../models/utilities/codex'

export type ViewState = {
  id: string
  codex: Codex
  journal: number[]
  gps: { x: number; y: number; zoom: number }
  time: number
  borderChange: boolean
}

export type ViewActions =
  | { type: 'init'; payload: { id: string } }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'refresh journal' }
  | {
      type: 'update codex'
      payload: { target: UpdateCodex['target']; disableZoom?: boolean }
    }
  | { type: 'back' }
