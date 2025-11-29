import { createContext, Dispatch, useContext } from 'react'

import { NATION } from '../../models/nations'
import { DICE } from '../../models/utilities/math/dice'
import { LoadingParams, ViewActions, ViewState } from './types'

const init: ViewState = {
  id: '',
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  loading: false,
  codex: { idx: 0, tag: 'nation' },
  units: 'metric',
  history: [],
  stats: false
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
        const region = DICE.swap(updated.id, () => window.dice.choice(NATION.nations()))
        // set starting codex values
        updated.codex = { tag: 'nation', idx: region.idx }
        updated.time = window.world.date
        return updated
      }
      case 'transition': {
        const { tag, zoom, idx } = action.payload
        const updated = { ...state }
        // Push current codex state to history before transitioning
        updated.history = [...state.history, state.codex]
        updated.codex = { tag, idx }
        if (zoom && (tag === 'province' || tag === 'nation')) {
          const target = window.world.provinces[idx]?.hub
          updated.gps = { x: target.x, y: target.y, zoom: tag === 'nation' ? 10 : 50 }
        }
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
      case 'toggle units': {
        return { ...state, units: state.units === 'metric' ? 'imperial' : 'metric' }
      }
      case 'toggle stats': {
        return { ...state, stats: !state.stats }
      }
      case 'back': {
        if (state.history.length === 0) return state
        const updated = { ...state }
        const [previous] = updated.history.slice(-1)
        updated.history = updated.history.slice(0, -1)
        updated.codex = previous
        updated.time = window.world.date
        return updated
      }
    }
  },
  loading: async ({ action, dispatch }: LoadingParams) => {
    dispatch({ type: 'loading', payload: true })
    await action()
    dispatch({ type: 'loading', payload: false })
  }
}
