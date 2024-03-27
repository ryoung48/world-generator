import { Dispatch } from 'react'

import { Item } from '../../models/npcs/equipment/types'
import { Actor } from '../../models/npcs/types'

export type Avatar = { pcs: number[]; cp: number }

export type ViewState = {
  id: string
  loc: { province: number; place: number }
  gps: { x: number; y: number; zoom: number }
  time: number
  avatar: Avatar
  loading: boolean
  view: 'nation' | 'place'
}

export type ViewActions =
  | { type: 'init world'; payload: { id: string } }
  | {
      type: 'transition'
      payload: { tag: ViewState['view']; province: number; place: number; zoom?: boolean }
    }
  | { type: 'start adventure' }
  | { type: 'update gps'; payload: { gps: ViewState['gps'] } }
  | { type: 'loading'; payload: boolean }
  | { type: 'purchase'; payload: { npc: Actor; item: Item } }

export type LoadingParams = {
  dispatch: Dispatch<ViewActions>
  action: () => Promise<void>
}
