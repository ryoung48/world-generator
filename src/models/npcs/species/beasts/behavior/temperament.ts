import { weighted_distribution } from '../../../../utilities/math'
import { entity_placeholder } from '../../../../utilities/text/placeholders'
import { Beast } from '../types'

const temperaments: Record<string, weighted_distribution<Beast['temperament']>> = {
  predator: [
    { v: 'aggressive', w: 15 },
    { v: 'defensive', w: 55 },
    { v: 'wary', w: 10 }
  ],
  prey: [
    { v: 'defensive', w: 5 },
    { v: 'wary', w: 20 },
    { v: 'skittish', w: 45 }
  ]
}

export const beast__temperament = (role: Beast['role']) =>
  window.dice.weighted_choice(temperaments[role])

/**
 * describes a species' temperament
 * @param species
 * @returns descriptive text
 */
export const beast__describe_temperament = (species: Beast) => {
  const attitude = species.temperament
  if (attitude === 'skittish')
    return `${entity_placeholder} is generally skittish when encountered in the wild.`
  if (attitude === 'wary')
    return `${entity_placeholder} is generally wary when encountered in the wild and will flee when approached.`
  if (attitude === 'defensive')
    return `${entity_placeholder} is generally defensive when encountered in the wild and will attack when approached.`
  return `${entity_placeholder} is generally aggressive when encountered in the wild.`
}
