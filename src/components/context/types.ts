import { Dispatch } from 'react'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  gps: { x: number; y: number; zoom: number }
  time: number
  loading: boolean
  codex: { tag: 'nation' | 'province' | 'culture' | 'actor'; idx: number }
  units: 'metric' | 'imperial'
  history: { tag: 'nation' | 'province' | 'culture' | 'actor'; idx: number }[]
  stats: boolean
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | {
      type: 'transition'
      payload: ViewState['codex'] & { zoom?: boolean }
    }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'loading'; payload: boolean }
  | { type: 'toggle units' }
  | { type: 'toggle stats' }
  | { type: 'back' }

export type LoadingParams = {
  dispatch: Dispatch<ViewActions>
  action: () => Promise<void>
}
