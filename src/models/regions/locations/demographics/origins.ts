import { Culture } from '../../../npcs/cultures/types'
import { province__hub } from '../../provinces'
import { Loc } from '../types'
import { location__demographics } from './demo'

/**
 * foreigners who were born in the region they are currently reside in (2nd-gen)
 * @param loc - location where they currently reside
 * @returns {Loc} location of birth
 */
const foreignImmigrant = (loc: Loc) => {
  const { provinces } = location__demographics(loc)
  const region = window.world.regions[loc.region]
  const chosen = window.dice.weightedChoice(
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
export const location__randomDestination = (loc: Loc) => {
  const { provinces, regions } = location__demographics(loc)
  const region = window.dice.weightedChoice(
    window.world.regions.map(r => ({ v: r, w: regions[r.idx] ?? 0 }))
  )
  const chosen = window.dice.weightedChoice(
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
const localOrigin = (params: { loc: Loc; culture: Culture }) => {
  const { loc, culture } = params
  const { provinces, regions } = location__demographics(loc)
  const region =
    window.world.regions[
      window.dice.weightedChoice(culture.regions.map(r => ({ v: r, w: regions[r] })))
    ]
  const chosen = window.dice.weightedChoice(
    region.regional.provinces.map(t => ({ v: t, w: provinces[t] }))
  )
  return province__hub(window.world.provinces[chosen])
}

export const location__randomOrigin = (params: { loc: Loc; culture: Culture }) => {
  const odds = window.dice.random
  const { culture } = window.world.regions[params.loc.region]
  const foreigner = culture.native !== params.culture.idx
  if (odds < 0.01) return location__randomDestination(params.loc)
  if (odds < 0.03 && foreigner) return foreignImmigrant(params.loc)
  return localOrigin(params)
}
