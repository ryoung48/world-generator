import { Dispatch } from 'react'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  loc: { province: number }
  gps: { x: number; y: number; zoom: number }
  time: number
  loading: boolean
  view: 'nation' | 'place'
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | {
      type: 'transition'
      payload: { tag: ViewState['view']; province: number; zoom?: boolean }
    }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'loading'; payload: boolean }

export type LoadingParams = {
  dispatch: Dispatch<ViewActions>
  action: () => Promise<void>
}
