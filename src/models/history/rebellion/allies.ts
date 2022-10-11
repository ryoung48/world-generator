import { region__allyRelation, region__neutralReason } from '../../regions/diplomacy/relations'
import { province__foreignStates } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { DiplomaticRelation } from '../diplomacy/types'
import { WarActorRecord } from '../war/types'
import { Rebellion } from './types'

// relations that are considered 'friendly'
const friends: DiplomaticRelation[] = ['friendly', 'ally']

type AllyRecord = WarActorRecord['allies'][number]

// sort allies by their neutrality
const neutralitySort = (a: AllyRecord, b: AllyRecord) => {
  if (a.neutral && !b.neutral) return 1
  else if (!a.neutral && b.neutral) return -1
  return 0
}

/**
 * determine allies of the rebels
 * @param region - region where the rebellion is taking place
 * @param nation - nation that controls the rebelling region
 * @param neighbors - neighbors of the loyalist nation
 * @param rebelType - rebel type (separatist|nobles|peasants|etc)
 * @returns a list of allies
 */
export const rebelAllies = (
  region: Region,
  nation: Region,
  neighbors: number[],
  rebelType: Rebellion['background']['type']
): AllyRecord[] => {
  const capital = window.world.provinces[region.capital]
  const settlements = region.regional.provinces
    .map(t => window.world.provinces[t])
    .filter(province => province.currNation === capital.currNation)
  // separatists allies must border the rebel region
  return (rebelType !== 'separatists' ? neighbors : province__foreignStates(settlements))
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
export const loyalistAllies = (nation: Region, neighbors: number[]): AllyRecord[] => {
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
        relation: `${region__allyRelation({ ref: nation, ally: neighbor, noFunds: true })}${
          alliance ? '' : ` (${region__neutralReason(neighbor)})`
        }`,
        neutral: !alliance
      }
    })
    .sort(neutralitySort)
}
