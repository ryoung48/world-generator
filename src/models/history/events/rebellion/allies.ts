import { region__ally_relation, region__neutral_reason } from '../../../regions/diplomacy/relations'
import { province__foreign_states } from '../../../regions/provinces'
import { Region } from '../../../regions/types'
import { diplomatic_relation } from '../diplomacy/types'
import { WarActorRecord } from '../war/types'
import { Rebellion } from './types'

// relations that are considered 'friendly'
const friends: diplomatic_relation[] = ['friendly', 'ally']

type AllyRecord = WarActorRecord['allies'][number]

// sort allies by their neutrality
const neutrality_sort = (a: AllyRecord, b: AllyRecord) => {
  if (a.neutral && !b.neutral) return 1
  else if (!a.neutral && b.neutral) return -1
  return 0
}

/**
 * determine allies of the rebels
 * @param region - region where the rebellion is taking place
 * @param nation - nation that controls the rebelling region
 * @param neighbors - neighbors of the loyalist nation
 * @param rebel_type - rebel type (separatist|nobles|peasants|etc)
 * @returns a list of allies
 */
export const rebel_allies = (
  region: Region,
  nation: Region,
  neighbors: number[],
  rebel_type: Rebellion['background']['type']
): AllyRecord[] => {
  const capital = window.world.provinces[region.capital]
  const settlements = region.regional.provinces
    .map(t => window.world.provinces[t])
    .filter(province => province.curr_nation === capital.curr_nation)
  // separatists allies must border the rebel region
  return (rebel_type !== 'separatists' ? neighbors : province__foreign_states(settlements))
    .map(n => window.world.regions[n])
    .filter(neighbor => {
      // only non-friendly nations can be considered allies of the rebels
      const relation = nation.relations[neighbor.idx] ?? 'neutral'
      return !friends.includes(relation) && window.dice.random < 0.1
    })
    .map(neighbor => {
      return { idx: neighbor.idx, relation: 'Ally', neutral: false }
    })
}

/**
 * determines allies of the loyalists
 * @param nation - loyalist nation
 * @param neighbors - neighboring nations of the loyalists
 * @returns a list of allies
 */
export const loyalist_allies = (nation: Region, neighbors: number[]): AllyRecord[] => {
  return neighbors
    .map(n => window.world.regions[n])
    .filter(neighbor => {
      // only friendly nations can be considered allies of the loyalists
      const relation = nation.relations[neighbor.idx] ?? 'neutral'
      return relation === 'ally'
    })
    .map(neighbor => {
      const alliance = nation.overlord.idx === neighbor.idx || window.dice.random < 0.1
      return {
        idx: neighbor.idx,
        relation: `${region__ally_relation({ ref: nation, ally: neighbor, no_funds: true })}${
          alliance ? '' : ` (${region__neutral_reason(neighbor)})`
        }`,
        neutral: !alliance
      }
    })
    .sort(neutrality_sort)
}
