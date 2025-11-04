import { PROVINCE } from '../provinces'
import { DiplomaticRelation, Province } from '../provinces/types'
import { ARRAY } from '../utilities/array'
import {
  GetRelationParams,
  NationNeighborParams,
  SetRelationParams,
  SetVassalage
} from './types'

const colonies = new Set<DiplomaticRelation>(['colony', 'chartered company', 'dominion'])

export const NATION = {
  atWar: (nation: Province) => nation.war >= 0,
  coastal: (nation: Province) => NATION.provinces(nation).some(p => p.ocean > 0),
  colonized: (nation: Province) => colonies.has(window.world.provinces[nation.overlord]?.relations[nation.idx]),
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
  provinces: (nation: Province) => [nation, ...nation.territories.map(v => window.world.provinces[v])],
  population: (nation: Province) =>
    NATION.provinces(nation).reduce((sum, province) => sum + province.population, 0),
  nations: () => window.world.provinces.filter(p => p.nation === undefined && !p.desolate),
  relations: {
    get: ({ n1, n2 }: GetRelationParams) => n1.relations[n2.idx] ?? 'neutral',
    all: (nation: Province) =>
      Object.keys(nation.relations).map(i => window.world.provinces[parseInt(i)]),
    set: ({ n1, n2, relation }: SetRelationParams) => {
      n1.relations[n2.idx] = relation
      n2.relations[n1.idx] = relation
    },
    subject: ({ overlord, vassal, type }: SetVassalage) => {
      overlord.relations[vassal.idx] = type
      vassal.relations[overlord.idx] = 'suzerain'
      vassal.overlord = overlord.idx
    }
  }
}
