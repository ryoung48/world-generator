import { createContext, Dispatch, useContext } from 'react'

import { itemPrice } from '../../models/npcs/equipment'
import { REGION } from '../../models/regions'
// import { adventurers } from '../../models/npcs/professions/adventurers'
import { PROVINCE } from '../../models/regions/provinces'
import { Dice } from '../../models/utilities/math/dice'
import { ViewActions, ViewState } from './types'

const init: ViewState = {
  id: '',
  region: 0,
  province: 0,
  journal: [],
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
  context: () => {
    return useContext(ViewContext)
  },
  init,
  reducer: (state: ViewState, action: ViewActions): ViewState => {
    switch (action.type) {
      case 'init world': {
        const updated = { ...state, id: action.payload.id }
        // always zoom to the same region on every load
        const dice = new Dice(updated.id)
        const region = dice.choice(REGION.nations.filter(region => !region.shattered))
        // set starting codex values
        updated.region = region.idx
        updated.province = region.capital
        updated.time = window.world.date
        return updated
      }
      case 'transition': {
        const { tag, idx, zoom } = action.payload
        const updated = { ...state }
        if (tag === 'nation') {
          const target = window.world.regions[idx]
          const capital = window.world.provinces[target.capital]
          updated.province = target.capital
          updated.region = target.idx
          updated.view = 'nation'
          if (zoom) updated.gps = { x: capital.hub.x, y: capital.hub.y, zoom: 10 }
        } else if (tag === 'province') {
          const target = window.world.provinces[idx]
          updated.province = target.idx
          updated.region = PROVINCE.nation(target).idx
          updated.view = 'province'
          if (zoom) updated.gps = { x: target.hub.x, y: target.hub.y, zoom: 50 }
        }
        return updated
      }
      case 'start adventure': {
        return {
          ...state,
          avatar: {
            pcs: [], // adventurers({ count: 5, province: state.province }),
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
}
