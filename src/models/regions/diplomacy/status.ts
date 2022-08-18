import { formatters } from '../../utilities/text/formatters'
import { Region } from '../types'

const imperium = 3 // number regions needed to be considered an empire

/**
 * determines if a region is overextended
 * used to determine if a region will conqueror or vassalize as a war goal
 * @param region - reference region
 * @returns {boolean} true or false
 */
export const region__overextended = (region: Region) =>
  window.dice.random < region.regions.length / 6

/**
 * determines if a region is at peace
 * peace means no ongoing wars or rebellions
 * @param nation - reference nation
 * @returns {boolean} true or false
 */
export const region__atPeace = (nation: Region) => {
  return nation.rebellions.current === -1 && nation.wars.current.length === 0
}

/**
 * determines if a nation can be considered an empire
 * vassals can never be empires
 * @param nation - reference region
 * @returns {boolean} true or false
 */
export const region__isImperial = (nation: Region) => {
  const provinces = nation.regions
  return provinces.length > imperium && !window.world.regions[nation.overlord.idx]
}

/**
 * gets a nations name with imperial title if applicable
 * @param nation - reference region
 * @returns {string} the regions name
 */
export const region__imperialName = (nation: Region) => {
  return region__isImperial(nation) && nation.government ? nation.imperialTitle : nation.name
}

/**
 * get a nations remaining percentage of unspent wealth
 * @param nation - reference nation
 * @returns {number} wealth % between 0 and 1
 */
export const region__wealthPercent = (nation: Region) => {
  return Math.max(0, nation.maxWealth > 0 ? nation.wealth / nation.maxWealth : 0)
}
/**
 * get a regions wealth percent formatted as a string
 * @param nation - reference region
 * @returns {string} wealth % as text
 */
export const region__formattedWealthPercent = (nation: Region) => {
  return formatters.percent({ value: region__wealthPercent(nation), precision: 0 })
}
/**
 * get a nation's wealth formatted as a string with currency
 * @param nation - reference nation
 * @param value - optional wealth override used instead of nation's current wealth
 * @returns {string} the formatted wealth
 */
export const region__formattedWealth = (nation: Region, value?: number) => {
  const culture = window.world.cultures[nation.culture.ruling]
  const wealth = value ?? nation.wealth
  return `${wealth.toFixed(0)}${culture.currency}`
}

/**
 * computes a region's total wealth based on all of its collected provinces
 * @param nation - reference nation
 * @returns {number}
 */
export const region__optimalWealth = (nation: Region) => {
  return nation.provinces
    .map(t => window.world.provinces[t])
    .reduce((sum, city) => sum + city.wealth, 0)
}
