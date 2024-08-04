import { createContext, Dispatch, useContext } from 'react'

import { REGION } from '../../models/regions'
import { DICE } from '../../models/utilities/math/dice'
import { LoadingParams, ViewActions, ViewState } from './types'

const init: ViewState = {
  id: '',
  loc: { province: 0, idx: 0 },
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
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
        updated.loc = { province: region.capital, idx: 0 }
        updated.time = window.world.date
        return updated
      }
      case 'transition': {
        const { tag, province, zoom, idx = 0 } = action.payload
        const target = window.world.provinces[province]
        const site = target.sites[idx]
        const updated = { ...state }
        updated.loc = { province, idx }
        updated.view = tag
        if (zoom) updated.gps = { x: site.x, y: site.y, zoom: tag === 'nation' ? 10 : 50 }
        updated.time = window.world.date
        return updated
      }
      case 'update gps': {
        const updated = { ...state, gps: action.payload.gps }
        console.log('updating gps')
        return updated
      }
      case 'loading': {
        return { ...state, loading: action.payload }
      }
    }
  },
  loading: async ({ action, dispatch }: LoadingParams) => {
    dispatch({ type: 'loading', payload: true })
    await action()
    dispatch({ type: 'loading', payload: false })
  }
}
