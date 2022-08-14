import { Culture } from '../../../../npcs/species/humanoids/cultures/types'
import { province__hub } from '../../../provinces'
import { Loc } from '../../types'
import { location__demographics } from '.'

/**
 * foreigners who were born in the region they are currently reside in (2nd-gen)
 * @param loc - location where they currently reside
 * @returns {Loc} location of birth
 */
const foreign_immigrant = (loc: Loc) => {
  const { provinces } = location__demographics(loc)
  const region = window.world.regions[loc.region]
  const chosen = window.dice.weighted_choice(
    region.regional.provinces.map(t => ({ v: t, w: provinces[t] }))
  )
  return province__hub(window.world.provinces[chosen])
}
/**
 * nationals who were born (possibly) outside of their cultural homeland
 * using the current location as a pivot
 * @param loc - location where they currently reside
 * @returns {Loc} location of birth
 */
export const location__random_destination = (loc: Loc) => {
  const { provinces, regions } = location__demographics(loc)
  const region = window.dice.weighted_choice(
    window.world.regions.map(r => ({ v: r, w: regions[r.idx] ?? 0 }))
  )
  const chosen = window.dice.weighted_choice(
    region.regional.provinces.map(t => ({ v: t, w: provinces[t] }))
  )
  return province__hub(window.world.provinces[chosen])
}
/**
 * nationals who were born in one of their cultural homelands
 * @param params.loc - location where they currently reside
 * @param params.culture - actor's culture
 * @returns {Loc} location of birth
 */
const local_origin = (params: { loc: Loc; culture: Culture }) => {
  const { loc, culture } = params
  const { provinces, regions } = location__demographics(loc)
  const region =
    window.world.regions[
      window.dice.weighted_choice(culture.regions.map(r => ({ v: r, w: regions[r] })))
    ]
  const chosen = window.dice.weighted_choice(
    region.regional.provinces.map(t => ({ v: t, w: provinces[t] }))
  )
  return province__hub(window.world.provinces[chosen])
}

export const location__random_origin = (params: { loc: Loc; culture: Culture }) => {
  const odds = window.dice.random
  const { culture } = window.world.regions[params.loc.region]
  const foreigner = culture.native !== params.culture.idx
  if (odds < 0.01) return location__random_destination(params.loc)
  if (odds < 0.03 && foreigner) return foreign_immigrant(params.loc)
  return local_origin(params)
}
