import { world__tick } from '../../models/history/events'
import { region__nation } from '../../models/regions'
import { province__hub } from '../../models/regions/provinces'
import {
  codex__restore_history,
  codex__spawn,
  codex__update,
  codex__zoom_location
} from '../../models/utilities/codex'
import { Dice } from '../../models/utilities/math/dice'
import { DisplayShaper } from '../../models/world/spawn/shapers/display'
import { view__actions, view__state } from './types'

export const view__init: view__state = {
  id: '',
  codex: { ...codex__spawn },
  gps: { x: 0, y: 0, zoom: 0 },
  time: Date.now(),
  border_change: true,
  avatar: -1
}

export const view__reducer = (state: view__state, action: view__actions): view__state => {
  switch (action.type) {
    case 'back': {
      const updated: view__state = { ...state, codex: window.structuredClone(state.codex) }
      if (updated.codex.history.length > 0) {
        codex__restore_history(updated.codex)
        const { current, location, nation } = updated.codex
        if (['location', 'nation'].includes(current)) {
          const target =
            current === 'location' ? window.world.locations[location] : window.world.regions[nation]
          const zoom = codex__zoom_location(target)
          if (zoom) updated.gps = zoom
        }
      }
      return updated
    }
    case 'init': {
      const updated = { ...state, id: action.payload.id }
      // always zoom to the same region on every load
      const dice = new Dice(updated.id)
      const region = dice.choice(window.world.regions)
      const nation = region__nation(region)
      // set starting codex values
      updated.codex.location = province__hub(window.world.provinces[region.capital]).idx
      updated.codex.culture = nation.culture.native
      updated.codex.war = 0
      updated.codex.rebellion = 0
      codex__update({ codex: updated.codex, target: nation })
      return updated
    }
    case 'set avatar': {
      const updated = { ...state, avatar: action.payload.avatar.idx }
      return updated
    }
    case 'tick': {
      const updated = { ...state }
      const { duration } = action.payload
      world__tick(window.world.date + duration)
      updated.time = window.world.date
      const redraw = window.world.regions.some(r => r.borders_changed)
      if (redraw) {
        DisplayShaper.draw_borders()
        updated.border_change = !updated.border_change
        console.log('border change')
      }
      return updated
    }
    case 'update gps': {
      const updated = { ...state, gps: action.payload.gps }
      return updated
    }
    case 'update codex': {
      const updated = { ...state, codex: window.structuredClone(state.codex) }
      const { target, disable_zoom } = action.payload
      codex__update({ target, codex: updated.codex })
      const zoom = codex__zoom_location(target)
      if (!disable_zoom && zoom) updated.gps = zoom
      return updated
    }
  }
}
