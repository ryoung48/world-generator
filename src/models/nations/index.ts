import { PROVINCE } from '../provinces'
import { Province } from '../provinces/types'
import { ARRAY } from '../utilities/array'
import {
  GetRelationParams,
  NationNeighborParams,
  SetColony,
  SetRelationParams,
  SetVassalage
} from './types'

export const NATION = {
  atWar: (nation: Province) => nation.war >= 0,
  coastal: (nation: Province) => NATION.provinces(nation).some(p => p.ocean > 0),
  colonized: (nation: Province) => NATION.provinces(nation).some(p => p.colonists !== undefined),
  neighbors: ({ nation, depth = 0 }: NationNeighborParams): Province[] => {
    const provinces = NATION.provinces(nation)
    const neighbors = ARRAY.unique(
      provinces
        .map(t => {
          return PROVINCE.neighbors({ province: t, type: 'foreign' }).map(
            n => PROVINCE.nation(n).idx
          )
        })
        .flat()
    ).map(r => window.world.provinces[r])
    if (depth === 0) return neighbors
    return ARRAY.unique(
      neighbors
        .map(n => NATION.neighbors({ nation: n, depth: depth - 1 }))
        .flat()
        .filter(n => n !== nation)
    )
  },
  provinces: (nation: Province) => [nation, ...nation.subjects.map(v => window.world.provinces[v])],
  nations: () => window.world.provinces.filter(p => p.nation === undefined && !p.desolate),
  relations: {
    get: ({ n1, n2 }: GetRelationParams) => n1.relations[n2.idx] ?? 'neutral',
    all: (nation: Province) =>
      Object.keys(nation.relations).map(i => window.world.provinces[parseInt(i)]),
    set: ({ n1, n2, relation }: SetRelationParams) => {
      n1.relations[n2.idx] = relation
      n2.relations[n1.idx] = relation
    },
    vassalage: ({ overlord, vassal }: SetVassalage) => {
      overlord.relations[vassal.idx] = 'vassal'
      vassal.relations[overlord.idx] = 'suzerain'
      vassal.suzerain = overlord.idx
    },
    colonize: ({ overlord, colony }: SetColony) => {
      const nation = PROVINCE.nation(colony)
      overlord.relations[nation.idx] = 'colony'
      nation.relations[overlord.idx] = window.dice.weightedChoice([
        { v: 'trading company', w: 5 },
        { v: 'colonial settlers', w: 2 },
        { v: 'penal colony', w: 1 }
      ])
      colony.colonists = overlord.idx
      colony.minority = overlord.culture
      overlord.colonial = true
    }
  }
}
