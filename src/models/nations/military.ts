import { scaleLinear } from 'd3'

import { Province } from '../provinces/types'
import { ARRAY } from '../utilities/array'
import { WeightedDistribution } from '../utilities/math/dice/types'
import { NATION } from '.'

const units = [
  'slaves',
  'standing army',
  'levies',
  'tribal warbands',
  'mercenaries',
  'knights',
  'warships'
] as const

type Unit = typeof units[number]

const _military: Record<number, [Unit, number, number][]> = {}

const calculate = (nation: Province) => {
  const totalPopulation = NATION.population(nation)
  const decentralized = nation.decentralization !== undefined
  const navy = NATION.coastal(nation) && !decentralized && nation.size !== 'city-state'
  const development = nation.development

  const composition: WeightedDistribution<Unit> =
    development < 2
      ? [
          { v: 'slaves', w: decentralized ? 0 : 0.03 },
          { v: 'standing army', w: decentralized ? 0 : 0.05 },
          { v: 'levies', w: 0.23 },
          { v: 'tribal warbands', w: 0.33 },
          { v: 'mercenaries', w: 0.04 },
          { v: 'knights', w: 0.25 },
          { v: 'warships', w: navy ? 0.05 : 0 }
        ]
      : development < 3
      ? [
          { v: 'slaves', w: decentralized ? 0 : 0.05 },
          { v: 'standing army', w: decentralized ? 0 : 0.2 },
          { v: 'levies', w: 0.22 },
          { v: 'tribal warbands', w: 0.08 },
          { v: 'mercenaries', w: 0.17 },
          { v: 'knights', w: 0.15 },
          { v: 'warships', w: navy ? 0.15 : 0 }
        ]
      : [
          { v: 'slaves', w: decentralized ? 0 : 0.03 },
          { v: 'standing army', w: decentralized ? 0 : 0.4 },
          { v: 'levies', w: 0.15 },
          { v: 'tribal warbands', w: 0 },
          { v: 'mercenaries', w: 0.1 },
          { v: 'knights', w: 0.05 },
          { v: 'warships', w: navy ? 0.25 : 0 }
        ]

  const tribes = scaleLinear([1, 4], [1, 0.1]).clamp(true)(nation.development) * totalPopulation
  const count = 3
  const selected = ARRAY.counter(window.dice.weightedSample(composition, count, false))
  const military: [Unit, number, number][] = []

  if (selected['knights']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.0015 * selected['knights'] * mod) / count
    military.push(['knights', total, total * 10])
  }
  if (selected['standing army']) {
    const mod = window.dice.uniform(0.8, 1.2)
    const total = (totalPopulation * 0.005 * selected['standing army'] * mod) / count
    military.push(['standing army', total, total * 3])
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
  levies: 'Peasants and townsfolk raised in wartime, numerous but poorly trained',
  knights: 'Elite noble cavalry, costly to maintain but formidable on the battlefield',
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
