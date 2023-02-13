import { range } from 'd3'
import { createContext, Dispatch, useContext } from 'react'

import { npc__spawn } from '../../models/npcs'
import { region__nation } from '../../models/regions'
import { actor__cr } from '../../models/threads/actors'
import {
  codex__restoreHistory,
  codex__spawn,
  codex__targetZoom,
  codex__update
} from '../../models/utilities/codex'
import { Dice } from '../../models/utilities/math/dice'
import { ViewActions, ViewState } from './types'

export const view__init: ViewState = {
  id: '',
  codex: { ...codex__spawn },
  journal: [],
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  borderChange: true,
  avatar: { cr: 0, npcs: [] }
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
      const updated = {
        ...state,
        avatar: {
          cr: actor__cr(1),
          npcs: range(5).map(() => {
            const npc = npc__spawn({
              loc: window.world.provinces[state.codex.province],
              profession: 'mercenary',
              age: 'young adult',
              pc: true
            })
            return npc.idx
          })
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
      const { xp, duration } = action.payload
      window.world.date += duration
      const avatar = window.structuredClone(state.avatar)
      avatar.cr += xp
      return { ...state, avatar, time: window.world.date }
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
