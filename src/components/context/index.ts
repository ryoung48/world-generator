import { createContext, Dispatch, useContext } from 'react'

import { npc__spawn } from '../../models/npcs'
import { itemPrice } from '../../models/npcs/equipment'
import { Profession } from '../../models/npcs/professions/types'
import { region__nation } from '../../models/regions'
import {
  codex__restoreHistory,
  codex__spawn,
  codex__targetZoom,
  codex__update
} from '../../models/utilities/codex'
import { Dice } from '../../models/utilities/math/dice'
import { Avatar, ViewActions, ViewState } from './types'

export const view__init: ViewState = {
  id: '',
  codex: { ...codex__spawn },
  journal: [],
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  borderChange: true,
  avatar: { pcs: [], cp: 0 },
  loading: false
}

export const view__reducer = (state: ViewState, action: ViewActions): ViewState => {
  switch (action.type) {
    case 'back': {
      const updated: ViewState = { ...state, codex: window.structuredClone(state.codex) }
      if (updated.codex.history.length > 0) {
        codex__restoreHistory(updated.codex)
        const { current, province: location, nation } = updated.codex
        if (['province', 'nation'].includes(current)) {
          const target =
            current === 'province' ? window.world.provinces[location] : window.world.regions[nation]
          const zoom = codex__targetZoom(target)
          if (zoom) updated.gps = zoom
        }
      }
      return updated
    }
    case 'init world': {
      const updated = { ...state, id: action.payload.id }
      // always zoom to the same region on every load
      const dice = new Dice(updated.id)
      const region = dice.choice(window.world.regions)
      const nation = region__nation(region)
      // set starting codex values
      updated.codex.province = region.capital
      updated.codex.culture = nation.culture.native
      updated.time = window.world.date
      codex__update({ codex: updated.codex, target: nation })
      return updated
    }
    case 'start adventure': {
      const adventurers = window.dice.sample<Profession>(
        [
          'barbarian',
          'chanter',
          'cipher',
          'druid',
          'fighter',
          'monk',
          'paladin',
          'cleric',
          'ranger',
          'rogue',
          'wizard'
        ],
        5
      )
      const updated = {
        ...state,
        avatar: {
          pcs: adventurers.map(profession => {
            const npc = npc__spawn({
              loc: window.world.provinces[state.codex.province],
              profession,
              age: 'young adult',
              pc: true
            })
            return npc.idx
          }),
          cp: 50
        }
      }
      return updated
    }
    case 'update gps': {
      const updated = { ...state, gps: action.payload.gps }
      return updated
    }
    case 'refresh journal': {
      const updated = { ...state, journal: window.world.threads.map(thread => thread.idx) }
      return updated
    }
    case 'update codex': {
      const updated = { ...state, codex: window.structuredClone(state.codex) }
      const { target, disableZoom } = action.payload
      codex__update({ target, codex: updated.codex })
      const zoom = codex__targetZoom(target)
      if (!disableZoom && zoom) updated.gps = zoom
      return updated
    }
    case 'progress': {
      const { duration, cp } = action.payload
      window.world.date += duration
      state.avatar.cp += cp
      const avatar = window.structuredClone(state.avatar) as Avatar
      return { ...state, avatar, time: window.world.date }
    }
    case 'loading': {
      return { ...state, loading: action.payload }
    }
    case 'purchase': {
      const { item, npc } = action.payload
      const loc = window.world.provinces[state.codex.province]
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
