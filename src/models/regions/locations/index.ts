import { recent_battle_window } from '../../history/events/war/battles'
import { point__distance } from '../../utilities/math/points'
import { hours_per_day } from '../../utilities/math/time'
import { region__neighbors } from '..'
import { province__foreign_neighbors, province__foreign_states, province__hub } from '../provinces'
import { Loc } from './types'

/**
 * Quick access to a location's province hub
 * @param loc - location
 * @returns {Loc} - province hub
 */
export const location__hub = (loc: Loc) => {
  const province = window.world.provinces[loc.province]
  return province__hub(province)
}

/**
 * Function that determines how long it takes to travel from one location to another
 * using established roads
 * @param params.src starting location
 * @param params.dst destination location
 * @returns an object containing miles to be traveled and time debt (in hours)
 */
export const location__travel = (params: { src: Loc; dst: Loc }) => {
  const { src, dst } = params
  const { sw, sh } = window.world.dim
  const miles = point__distance({ points: [src, dst], scale: [sw, sh] })
  const mpd = 24
  return {
    hours: (miles / mpd) * hours_per_day,
    miles
  }
}

export const location__is_settlement = (city: Loc) => city.population > 0
export const location__is_remote = (city: Loc) => {
  const { development } = window.world.regions[city.region]
  return development === 'remote'
}
export const location__prospect_colony = (params: { loc: Loc }) => {
  const { loc } = params
  const province = window.world.provinces[loc.province]
  const region = window.world.regions[loc.region]
  const nation = window.world.regions[province.curr_nation]
  const valid_colony = region.colonial_presence.colonies.some(({ type }) => type === 'colony')
  return !nation.civilized && valid_colony && loc.coastal ? 10 : 0
}
export const location__is_border = (city: Loc) => {
  const province = window.world.provinces[city.province]
  return province__foreign_neighbors(province).length > 0
}
export const location__raiders = (city: Loc) => {
  const province = window.world.provinces[city.province]
  const region = window.world.regions[province.curr_nation]
  const raiders = new Set(
    region__neighbors(region)
      .map(i => window.world.regions[i])
      .filter(n => {
        const relation = region.relations[n.idx]
        const unfriendly =
          relation === 'at war' || relation === 'suspicious' || relation === 'neutral'
        return unfriendly && !n.civilized
      })
      .map(n => n.idx)
  )
  return province__foreign_states([province]).filter(i => raiders.has(i))
}

export const location__missionaries = (loc: Loc) => {
  const province = window.world.provinces[loc.province]
  const region = window.world.regions[loc.region]
  const nation = window.world.regions[province.curr_nation]
  const religion = region.religion.state
  return region__neighbors(nation)
    .map(i => window.world.regions[i])
    .concat([nation])
    .filter(n => {
      return religion !== n.religion.state
    })
}

export const location__recent_battle = (loc: Loc) => {
  const { last_invasion } = window.world.provinces[loc.province].memory
  return last_invasion.time > window.world.date - recent_battle_window
}
export const location__pending_invasion = (loc: Loc) => {
  const province = window.world.provinces[loc.province]
  const { next_invasion } = province.memory
  return next_invasion.time > window.world.date && loc.idx === province.hub
}

export const location__get_closest_settlement = (loc: Loc) =>
  location__is_settlement(loc) ? loc : location__hub(loc)
