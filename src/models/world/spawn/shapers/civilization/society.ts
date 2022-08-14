import { range } from 'd3'

import { development_map } from '../../../../regions/development'
import { Region } from '../../../../regions/types'
import { scale } from '../../../../utilities/math'

const domain = [1, 2.5, 4]

const government = (region: Region) => {
  const { development, civilized } = region
  const development_score = development_map[development]
  region.government = {
    structure: window.dice.weighted_choice<Region['government']['structure']>([
      { v: 'autocratic', w: scale(domain, [10, 15, 30], development_score) },
      { v: 'republic', w: scale(domain, [1, 10, 25], development_score) },
      { v: 'oligarchic', w: scale(domain, [5, 15, 20], development_score) },
      { v: 'confederation', w: scale(domain, [20, 30, 15], development_score) },
      { v: 'autonomous', w: scale(domain, [64, 25, 10], development_score) }
    ]),
    succession: window.dice.weighted_choice<Region['government']['succession']>([
      { v: 'hereditary', w: scale(domain, [80, 70, 50], development_score) },
      { v: 'elected', w: scale(domain, [20, 30, 50], development_score) }
    ]),
    entry: window.dice.weighted_choice<Region['government']['entry']>([
      { v: 'merit', w: scale(domain, [3, 9, 49], development_score) },
      { v: 'wealth', w: scale(domain, [9, 19, 19], development_score) },
      { v: 'hereditary', w: scale(domain, [39, 19, 14], development_score) },
      { v: 'eunuchs', w: scale(domain, [5, 19, 4], development_score) },
      { v: 'assigned', w: scale(domain, [39, 29, 10], development_score) }
    ])
  }
  const centralized: Region['government']['structure'][] = ['autocratic', 'oligarchic']
  region.imperial_title = `${region.name} ${window.dice.choice(
    centralized.includes(region.government.structure)
      ? ['Dynasty', 'Empire', 'Imperium']
      : region.government.structure === 'republic'
      ? ['Republic']
      : civilized
      ? ['Union', 'Pact', 'League']
      : ['Horde', 'Khanate', 'Confederacy']
  )}`
}

const legal_system = (region: Region) => {
  const { development } = region
  const development_score = development_map[development]
  region.law = {
    rule_of_law: window.dice.weighted_choice<Region['law']['rule_of_law']>([
      { v: 'ubiquitous', w: scale(domain, [10, 33, 50], development_score) },
      { v: 'selective', w: scale(domain, [30, 33, 30], development_score) },
      { v: 'none', w: scale(domain, [60, 34, 20], development_score) }
    ]),
    accountability: window.dice.weighted_choice<Region['law']['accountability']>([
      { v: 'judicial', w: scale(domain, [5, 33, 50], development_score) },
      { v: 'top-down', w: scale(domain, [35, 33, 45], development_score) },
      { v: 'informal', w: scale(domain, [60, 34, 5], development_score) }
    ]),
    magic: window.dice.weighted_choice<Region['law']['magic']>([
      { v: 'banned', w: scale(domain, [0, 10, 10], development_score) },
      { v: 'restricted', w: scale(domain, [20, 40, 80], development_score) },
      { v: 'unrestricted', w: scale(domain, [80, 50, 10], development_score) }
    ])
  }
}

const religion = (region: Region) => {
  const { development } = region
  const development_score = development_map[development]
  region.religion = {
    authority: window.dice.weighted_choice<Region['religion']['authority']>([
      { v: 'protest', w: scale(domain, [20, 10, 13], development_score) },
      { v: 'theocratic', w: scale(domain, [30, 30, 14], development_score) },
      { v: 'aristocratic', w: scale(domain, [10, 20, 20], development_score) },
      { v: 'independent', w: scale(domain, [40, 40, 53], development_score) }
    ]),
    tolerance: window.dice.choice(['traditional', 'selective', 'cosmopolitan']),
    state: -1,
    native: -1
  }
}

const military = (region: Region) => {
  const { development } = region
  const development_score = development_map[development]
  return window.dice.weighted_choice<Region['military'][number]>([
    { v: 'slave army', w: scale(domain, [5, 10, 10], development_score) },
    { v: 'centralized draft', w: scale(domain, [5, 15, 50], development_score) },
    { v: 'regional draft', w: scale(domain, [15, 25, 20], development_score) },
    { v: 'tribal militias', w: scale(domain, [35, 10, 2], development_score) },
    { v: 'mercenaries', w: scale(domain, [5, 20, 13], development_score) },
    {
      v: 'aristocratic mounted',
      w: scale(domain, [25, 10, 5], development_score)
    }
  ])
}

const economy = (region: Region) => {
  const { development } = region
  const development_score = development_map[development]
  region.economy = {
    trade: window.dice.weighted_choice<Region['economy']['trade']>([
      { v: 'free', w: scale(domain, [95, 70, 40], development_score) },
      { v: 'protectionism', w: scale(domain, [5, 30, 60], development_score) }
    ]),
    management: window.dice.weighted_choice<Region['economy']['management']>([
      { v: 'barter', w: scale(domain, [60, 5, 0], development_score) },
      { v: 'market', w: scale(domain, [35, 75, 50], development_score) },
      { v: 'mixed', w: scale(domain, [5, 15, 35], development_score) },
      { v: 'planned', w: scale(domain, [0, 5, 15], development_score) }
    ]),
    status: window.dice.choice(['struggling', 'healthy', 'prosperous'])
  }
}

export const regional_society = () => {
  window.world.regions.forEach(region => {
    government(region)
    legal_system(region)
    religion(region)
    economy(region)
    region.military = Array.from(new Set(range(2).map(() => military(region))))
  })
}
