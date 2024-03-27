import { createContext, Dispatch, useContext } from 'react'

import { itemPrice } from '../../models/npcs/equipment'
import { adventurers } from '../../models/npcs/professions/adventurers'
import { REGION } from '../../models/regions'
import { DICE } from '../../models/utilities/math/dice'
import { LoadingParams, ViewActions, ViewState } from './types'

const init: ViewState = {
  id: '',
  loc: { province: 0, place: 0 },
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  avatar: { pcs: [], cp: 0 },
  loading: false,
  view: 'nation'
}

export const ViewContext = createContext(
  {} as {
    state: ViewState
    dispatch: Dispatch<ViewActions>
  }
)

export const VIEW = {
  context: () => useContext(ViewContext),
  init,
  reducer: (state: ViewState, action: ViewActions): ViewState => {
    switch (action.type) {
      case 'init world': {
        const updated = { ...state, id: action.payload.id }
        // always zoom to the same region on every load
        const region = DICE.swap(updated.id, () => window.dice.choice(REGION.nations))
        // set starting codex values
        updated.loc = { province: region.capital, place: 0 }
        updated.time = window.world.date
        return updated
      }
      case 'transition': {
        const { tag, province, place, zoom } = action.payload
        const target = window.world.provinces[province].places[place]
        const updated = { ...state }
        updated.loc = { province, place }
        updated.view = tag
        if (zoom) updated.gps = { x: target.x, y: target.y, zoom: tag === 'nation' ? 10 : 50 }
        updated.time = window.world.date
        return updated
      }
      case 'start adventure': {
        return {
          ...state,
          avatar: {
            pcs: adventurers({ count: 5, province: state.loc.province }),
            cp: 50
          }
        }
      }
      case 'update gps': {
        const updated = { ...state, gps: action.payload.gps }
        console.log('updating gps')
        return updated
      }
      case 'loading': {
        return { ...state, loading: action.payload }
      }
      case 'purchase': {
        const { item, npc } = action.payload
        const loc = window.world.provinces[state.loc.province]
        loc.market.goods = loc.market.goods.filter(g => g !== item)
        const { equipment } = npc
        const old = equipment.findIndex(e => e.slot === item.slot)
        equipment.splice(old, 1, item)
        return { ...state, avatar: { ...state.avatar, cp: state.avatar.cp - itemPrice(item) } }
      }
    }
  },
  loading: async ({ action, dispatch }: LoadingParams) => {
    dispatch({ type: 'loading', payload: true })
    await action()
    dispatch({ type: 'loading', payload: false })
  }
}
