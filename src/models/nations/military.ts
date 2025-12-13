import { scaleLinear } from 'd3'

import { Province } from '../provinces/types'
import { ARRAY } from '../utilities/array'
import { WeightedDistribution } from '../utilities/math/dice/types'
import { NATION } from '.'
import { RELIGION } from '../heritage/religions'

const units = [
  'slaves',
  'standing army',
  'levies',
  'tribal warbands',
  'mercenaries',
  'holy orders',
  'national militia',
  'warships'
] as const

export type Unit = typeof units[number]

const _military: Record<number, [Unit, number, number][]> = {}

const calculate = (nation: Province) => {
  const totalPopulation = NATION.population(nation)
  const decentralized = nation.decentralization === 'tribes'
  const navy = NATION.coastal(nation) && !decentralized && nation.size !== 'city-state'
  const development = nation.development
  const theocracy = nation.government === 'theocracy'
  const culture = window.world.cultures[nation.culture]
  const irreligious =
    culture.religion !== -1
      ? RELIGION.irreligious(window.world.religions[culture.religion])
      : false

  const colonial = Object.values(nation.relations).some(
    relation => relation === 'colony' || relation === 'chartered company' || relation === 'dominion'
  )

  const slavery = nation.policies.slavery === 'slave trade'

  const base: WeightedDistribution<Unit> =
    development < 2
      ? [,
          { v: 'levies', w: decentralized ? 0 : 0.23 },
          { v: 'tribal warbands', w: decentralized ? 1 : 0.33 }
        ]
      : development < 3
      ? [
          { v: 'standing army', w: decentralized ? 0 : 0.1 },
          { v: 'levies', w: 0.2 }
        ]
      : [
          { v: 'standing army', w: decentralized ? 0 : 0.35 },
          { v: 'levies', w: 0.12 }
        ]

  const composition: WeightedDistribution<Unit> =
    development < 2
      ? [
          { v: 'slaves', w: !slavery || decentralized ? 0 : 0.05 },
          { v: 'standing army', w: decentralized ? 0 : 0.05 },
          { v: 'levies', w: decentralized ? 0 : 0.23 },
          { v: 'tribal warbands', w: decentralized ? 1 : 0.33 },
          { v: 'mercenaries', w: 0.04 },
          { v: 'holy orders', w: decentralized || irreligious ? 0 : theocracy ? 0.2 : 0.08 },
          { v: 'national militia', w: 0 },
          { v: 'warships', w: navy ? 0.05 : 0 }
        ]
      : development < 3
      ? [
          { v: 'slaves', w: !slavery || decentralized ? 0 : 0.2 },
          { v: 'standing army', w: decentralized ? 0 : 0.2 },
          { v: 'levies', w: 0.2 },
          { v: 'tribal warbands', w: 0.08 },
          { v: 'mercenaries', w: 0.15 },
          { v: 'holy orders', w: irreligious ? 0 : theocracy ? 0.25 : 0.12 },
          { v: 'national militia', w: decentralized ? 0 : 0.05 },
          { v: 'warships', w: navy ? 0.15 : 0 }
        ]
      : [
          { v: 'slaves', w: !slavery || decentralized ? 0 : 0.2 },
          { v: 'standing army', w: decentralized ? 0 : 0.35 },
          { v: 'levies', w: 0.12 },
          { v: 'tribal warbands', w: 0 },
          { v: 'mercenaries', w: 0.08 },
          { v: 'holy orders', w: irreligious ? 0 :theocracy ? 0.1 : 0.03 },
          { v: 'national militia', w: decentralized ? 0 : 0.05 },
          { v: 'warships', w: navy ? 0.25 : 0 }
        ]

  const tribes = scaleLinear([1, 4], [1, 0.1]).clamp(true)(nation.development) * totalPopulation
  const count = 3
  const selected = ARRAY.counter(
    window.dice
      .weightedSample(composition, colonial ? 1 : 2, false)
      .concat(colonial ? ['warships'] : [])
      .concat([window.dice.weightedChoice(base)])
  )

  // Cap warships at 1, redistribute leftovers
  const singular: Unit[] = ['holy orders', 'slaves', 'mercenaries', 'national militia', 'warships']
  singular.forEach(unit => {
    if (selected[unit] && selected[unit] > 1) {
      const leftover = selected[unit] - 1
      selected[unit] = 1
      if (decentralized) {
        selected['tribal warbands'] = (selected['tribal warbands'] || 0) + leftover
      } else {
        selected['standing army'] = (selected['standing army'] || 0) + leftover
      }
    }
  })
  const military: [Unit, number, number][] = []

  if (selected['holy orders']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.0025 * selected['holy orders'] * mod) / count
    military.push(['holy orders', total, total * 10])
  }
  if (selected['standing army']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.005 * selected['standing army'] * mod) / count
    military.push(['standing army', total, total * 3])
  }
  if (selected['national militia']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.008 * selected['national militia'] * mod) / count
    military.push(['national militia', total, total * 2])
  }
  if (selected['levies']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.01 * selected['levies'] * mod) / count
    military.push(['levies', total, total * 1.5])
  }
  if (selected['tribal warbands']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (tribes * 0.015 * selected['tribal warbands'] * mod) / count
    military.push(['tribal warbands', total, total])
  }
  if (selected['mercenaries']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.0025 * selected['mercenaries'] * mod) / count
    military.push(['mercenaries', total, total * 6])
  }
  if (selected['slaves']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.005 * selected['slaves'] * mod) / count
    military.push(['slaves', total, total * 3])
  }
  if (selected['warships']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const sailors = (totalPopulation * 0.0025 * selected['warships'] * mod) / count
    military.push(['warships', sailors / 600, sailors * 6])
  }

  return military.map(([k, c, v]) => [k, Math.max(1, Math.floor(c)), v] as [Unit, number, number])
}

const tooltip: Record<Unit, string> = {
  'standing army': 'Professional soldiers kept year-round, trained and equipped by the state',
  'national militia': 'Citizen soldiers and reserves, trained part-time but ready for mobilization',
  levies: 'Peasants and townsfolk raised in wartime, numerous but poorly trained',
  'holy orders': 'Religious warriors bound by sacred vows, elite and zealous in battle',
  mercenaries: 'Hired warriors, skilled and flexible, but expensive and often unreliable',
  'tribal warbands': 'Clan-based fighters called to arms, fierce in battle but loosely organized',
  slaves: 'Enslaved recruits trained as elite troops, loyal to their masters but costly to sustain',
  warships: 'Naval vessels crewed by sailors, projecting power at sea and securing trade'
}

export const MILITARY = {
  get: (nation: Province) => {
    if (!_military[nation.idx]) {
      _military[nation.idx] = calculate(nation)
    }
    return _military[nation.idx]
  },
  tooltip
}
