import { weighted_distribution } from '../../../../utilities/math'
import { decorate_text } from '../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../utilities/text/placeholders'
import { species__size } from '../../size'
import { Beast } from '../types'

const beast__group_sizes: Record<Beast['social'], string> = {
  solitary: '1-2',
  small: '1-12',
  medium: '6-24',
  large: '20-80',
  huge: '80-300'
}

/**
 * determines a species' social pattern
 * @param params.diet - species diet type
 * @param params.size - species size rank
 * @returns social pattern
 */
export const beast__social = (params: { role: Beast['role']; size: number }) => {
  const { size, role } = params
  // huge species will not congregate in large groups
  const huge = size > species__size.large
  const fine = size === species__size.fine
  const dist: Record<Beast['role'], weighted_distribution<Beast['social']>> = {
    predator: [
      { v: 'solitary', w: 60 },
      { v: 'small', w: 40 }
    ],
    prey: [
      { v: 'solitary', w: 10 },
      { v: 'small', w: 30 },
      { v: 'medium', w: huge ? 0 : 35 },
      { v: 'large', w: huge ? 0 : 25 },
      { v: 'huge', w: huge ? 0 : fine ? 10 : 1 }
    ]
  }
  return window.dice.weighted_choice(dist[role])
}

/**
 * describes a species' social pattern
 * @param species
 * @returns descriptive text
 */
export const beast__describe_social = ({ social }: Beast) => {
  const tooltip = `${beast__group_sizes[social]} individuals`
  return `${entity_placeholder} lives ${
    social === 'solitary'
      ? `a mostly ${decorate_text({ label: social, tooltip })} lifestyle.`
      : `in ${decorate_text({ label: `${social} groups`, tooltip })}.`
  }`
}
