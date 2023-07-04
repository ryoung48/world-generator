import { createContext, Dispatch, useContext } from 'react'

import { itemPrice } from '../../models/npcs/equipment'
import { adventurers } from '../../models/npcs/professions/adventurers'
import { Dice } from '../../models/utilities/math/dice'
import { Avatar, ViewActions, ViewState } from './types'

export const view__init: ViewState = {
  id: '',
  region: 0,
  province: 0,
  journal: [],
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  borderChange: true,
  avatar: { pcs: [], cp: 0 },
  loading: false
}

export const view__reducer = (state: ViewState, action: ViewActions): ViewState => {
  switch (action.type) {
    case 'init world': {
      const updated = { ...state, id: action.payload.id }
      // always zoom to the same region on every load
      const dice = new Dice(updated.id)
      const region = dice.choice(window.world.regions)
      // set starting codex values
      updated.province = region.capital
      updated.time = window.world.date
      return updated
    }
    case 'select region': {
      const { target } = action.payload
      const updated = { ...state }
      updated.province = target.capital
      updated.region = target.idx
      return updated
    }
    case 'select province': {
      const { target } = action.payload
      const updated = { ...state }
      updated.province = target.idx
      updated.region = target.nation
      updated.gps = { x: target.hub.x, y: target.hub.y, zoom: 50 }
      return updated
    }
    case 'start adventure': {
      const updated = {
        ...state,
        avatar: {
          pcs: adventurers({ count: 5, province: state.province }),
          cp: 50
        }
      }
      return updated
    }
    case 'update gps': {
      const updated = { ...state, gps: action.payload.gps }
      console.log('updating gps')
      return updated
    }
    case 'progress': {
      const { thread } = action.payload
      if (thread.closed) return state
      const { duration, cp } = thread.outcome
      window.world.date += duration
      state.avatar.cp += cp
      thread.closed = true
      const avatar = window.structuredClone(state.avatar) as Avatar
      return { ...state, avatar, time: window.world.date }
    }
    case 'loading': {
      return { ...state, loading: action.payload }
    }
    case 'refresh journal': {
      return { ...state, journal: window.world.quests.map(quest => quest.idx) }
    }
    case 'purchase': {
      const { item, npc } = action.payload
      const loc = window.world.provinces[state.province]
      loc.market.goods = loc.market.goods.filter(g => g !== item)
      const { equipment } = npc
      const old = equipment.findIndex(e => e.slot === item.slot)
      equipment.splice(old, 1, item)
      return { ...state, avatar: { ...state.avatar, cp: state.avatar.cp - itemPrice(item) } }
    }
  }
}

export const ViewContext = createContext(
  {} as {
    state: ViewState
    dispatch: Dispatch<ViewActions>
  }
)

export const view__context = () => {
  return useContext(ViewContext)
}
