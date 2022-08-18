import { range } from 'd3'

import { developmentMap } from '../../../../regions/development'
import { Region } from '../../../../regions/types'
import { scale } from '../../../../utilities/math'

const domain = [1, 2.5, 4]

const government = (region: Region) => {
  const { development, civilized } = region
  const developmentScore = developmentMap[development]
  region.government = {
    structure: window.dice.weightedChoice<Region['government']['structure']>([
      { v: 'autocratic', w: scale(domain, [10, 15, 30], developmentScore) },
      { v: 'republic', w: scale(domain, [1, 10, 25], developmentScore) },
      { v: 'oligarchic', w: scale(domain, [5, 15, 20], developmentScore) },
      { v: 'confederation', w: scale(domain, [20, 30, 15], developmentScore) },
      { v: 'autonomous', w: scale(domain, [64, 25, 10], developmentScore) }
    ]),
    succession: window.dice.weightedChoice<Region['government']['succession']>([
      { v: 'hereditary', w: scale(domain, [80, 70, 50], developmentScore) },
      { v: 'elected', w: scale(domain, [20, 30, 50], developmentScore) }
    ]),
    entry: window.dice.weightedChoice<Region['government']['entry']>([
      { v: 'merit', w: scale(domain, [3, 9, 49], developmentScore) },
      { v: 'wealth', w: scale(domain, [9, 19, 19], developmentScore) },
      { v: 'hereditary', w: scale(domain, [39, 19, 14], developmentScore) },
      { v: 'eunuchs', w: scale(domain, [5, 19, 4], developmentScore) },
      { v: 'assigned', w: scale(domain, [39, 29, 10], developmentScore) }
    ])
  }
  const centralized: Region['government']['structure'][] = ['autocratic', 'oligarchic']
  region.imperialTitle = `${region.name} ${window.dice.choice(
    centralized.includes(region.government.structure)
      ? ['Dynasty', 'Empire', 'Imperium']
      : region.government.structure === 'republic'
      ? ['Republic']
      : civilized
      ? ['Union', 'Pact', 'League']
      : ['Horde', 'Khanate', 'Confederacy']
  )}`
}

const legalSystem = (region: Region) => {
  const { development } = region
  const developmentScore = developmentMap[development]
  region.law = {
    ruleOfLaw: window.dice.weightedChoice<Region['law']['ruleOfLaw']>([
      { v: 'ubiquitous', w: scale(domain, [10, 33, 50], developmentScore) },
      { v: 'selective', w: scale(domain, [30, 33, 30], developmentScore) },
      { v: 'none', w: scale(domain, [60, 34, 20], developmentScore) }
    ]),
    accountability: window.dice.weightedChoice<Region['law']['accountability']>([
      { v: 'judicial', w: scale(domain, [5, 33, 50], developmentScore) },
      { v: 'top-down', w: scale(domain, [35, 33, 45], developmentScore) },
      { v: 'informal', w: scale(domain, [60, 34, 5], developmentScore) }
    ]),
    magic: window.dice.weightedChoice<Region['law']['magic']>([
      { v: 'banned', w: scale(domain, [0, 10, 10], developmentScore) },
      { v: 'restricted', w: scale(domain, [20, 40, 80], developmentScore) },
      { v: 'unrestricted', w: scale(domain, [80, 50, 10], developmentScore) }
    ])
  }
}

const religion = (region: Region) => {
  const { development } = region
  const developmentScore = developmentMap[development]
  region.religion = {
    authority: window.dice.weightedChoice<Region['religion']['authority']>([
      { v: 'protest', w: scale(domain, [20, 10, 13], developmentScore) },
      { v: 'theocratic', w: scale(domain, [30, 30, 14], developmentScore) },
      { v: 'aristocratic', w: scale(domain, [10, 20, 20], developmentScore) },
      { v: 'independent', w: scale(domain, [40, 40, 53], developmentScore) }
    ]),
    tolerance: window.dice.choice(['traditional', 'selective', 'cosmopolitan']),
    state: -1,
    native: -1
  }
}

const military = (region: Region) => {
  const { development } = region
  const developmentScore = developmentMap[development]
  return window.dice.weightedChoice<Region['military'][number]>([
    { v: 'slave army', w: scale(domain, [5, 10, 10], developmentScore) },
    { v: 'centralized draft', w: scale(domain, [5, 15, 50], developmentScore) },
    { v: 'regional draft', w: scale(domain, [15, 25, 20], developmentScore) },
    { v: 'tribal militias', w: scale(domain, [35, 10, 2], developmentScore) },
    { v: 'mercenaries', w: scale(domain, [5, 20, 13], developmentScore) },
    {
      v: 'aristocratic mounted',
      w: scale(domain, [25, 10, 5], developmentScore)
    }
  ])
}

const economy = (region: Region) => {
  const { development } = region
  const developmentScore = developmentMap[development]
  region.economy = {
    trade: window.dice.weightedChoice<Region['economy']['trade']>([
      { v: 'free', w: scale(domain, [95, 70, 40], developmentScore) },
      { v: 'protectionism', w: scale(domain, [5, 30, 60], developmentScore) }
    ]),
    management: window.dice.weightedChoice<Region['economy']['management']>([
      { v: 'barter', w: scale(domain, [60, 5, 0], developmentScore) },
      { v: 'market', w: scale(domain, [35, 75, 50], developmentScore) },
      { v: 'mixed', w: scale(domain, [5, 15, 35], developmentScore) },
      { v: 'planned', w: scale(domain, [0, 5, 15], developmentScore) }
    ]),
    status: window.dice.choice(['struggling', 'healthy', 'prosperous'])
  }
}

export const regionalSociety = () => {
  window.world.regions.forEach(region => {
    government(region)
    legalSystem(region)
    religion(region)
    economy(region)
    region.military = Array.from(new Set(range(2).map(() => military(region))))
  })
}
