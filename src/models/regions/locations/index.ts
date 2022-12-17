import { point__distance } from '../../utilities/math/points'
import { hoursPerDay } from '../../utilities/math/time'
import { region__neighbors } from '..'
import { province__foreignNeighbors, province__foreignStates, province__hub } from '../provinces'
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
    hours: (miles / mpd) * hoursPerDay,
    miles
  }
}

export const location__isSettlement = (city: Loc) => city.population > 0
export const location__isRemote = (city: Loc) => {
  const { development } = window.world.regions[city.region]
  return development === 'remote'
}

export const location__isBorder = (city: Loc) => {
  const province = window.world.provinces[city.province]
  return province__foreignNeighbors(province).length > 0
}
export const location__raiders = (city: Loc) => {
  const province = window.world.provinces[city.province]
  const region = window.world.regions[province.nation]
  const raiders = new Set(
    region__neighbors(region)
      .filter(n => {
        const relation = region.relations[n.idx]
        const unfriendly =
          relation === 'at war' || relation === 'suspicious' || relation === 'neutral'
        return unfriendly && !n.civilized
      })
      .map(n => n.idx)
  )
  return province__foreignStates([province]).filter(i => raiders.has(i))
}

export const location__getClosestSettlement = (loc: Loc) =>
  location__isSettlement(loc) ? loc : location__hub(loc)
