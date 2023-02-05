import { range } from 'd3'

import { religion__folk, religion__organized } from '../../../npcs/religions'
import { region__domains, region__neighbors } from '../../../regions'
import {
  province__findClosest,
  province__foreignNeighbors,
  province__foreignStates,
  province__sortClosest
} from '../../../regions/provinces'
import { Province } from '../../../regions/provinces/types'
import { DiplomaticRelation, Region } from '../../../regions/types'
import { Shaper } from '.'

type RegionalCounters = Record<
  Region['development'],
  { target: number; current: number; total: number }
>

const claimRegion = (params: { nation: Region; region: Region }) => {
  const { nation, region } = params
  const { provinces } = region
  nation.provinces.push(...provinces)
  region.provinces = []
  provinces
    .map(p => window.world.provinces[p])
    .forEach(province => {
      province.nation = nation.idx
    })
}

const claimProvince = (params: { nation: Region; province: Province }) => {
  const { nation, province } = params
  const region = window.world.regions[province.nation]
  nation.provinces.push(province.idx)
  region.provinces = region.provinces.filter(idx => idx !== province.idx)
  province.nation = nation.idx
}

const government = (params: {
  development: Region['development']
  governments: (_region: Region) => Region['government']
}) => {
  const { development, governments } = params
  const regions = window.world.regions.filter(region => region.development === development)
  regions.forEach(region => {
    region.government = governments(region)
  })
  return regions
}

const sortClosestRegion = (params: { ref: Region; neighbors: Region[] }) => {
  const { ref, neighbors } = params
  return province__sortClosest(
    neighbors.map(neighbor => window.world.provinces[neighbor.capital]),
    window.world.provinces[ref.capital]
  ).map(province => window.world.regions[province.region])
}
const findClosestRegion = (params: { ref: Region; neighbors: Region[] }) => {
  const { ref, neighbors } = params
  const closest = province__findClosest(
    neighbors.map(neighbor => window.world.provinces[neighbor.capital]),
    window.world.provinces[ref.capital]
  )
  return window.world.regions[closest.region]
}

const regionRelations = (params: { target: DiplomaticRelation; region: Region }) =>
  Object.entries(params.region.relations)
    .filter(([_, relation]) => relation === params.target)
    .map(([r]) => window.world.regions[parseInt(r)])

const regionAtWar = (region: Region) => regionRelations({ target: 'at war', region }).length > 0

const isDuchy = (region: Region) => region.provinces.length <= 15

const validSteppeNomads = (region: Region) =>
  region.climate.includes('steppe') &&
  window.world.landmarks[window.world.cells[window.world.provinces[region.capital].cell].landmark]
    .type === 'continent'

export class LoreShaper extends Shaper {
  constructor() {
    super()
  }
  get pipeline() {
    return [
      {
        name: 'Words of Faith',
        action: this.worldReligions
      },
      {
        name: 'Historical March',
        action: this.history
      }
    ]
  }
  private worldReligions() {
    religion__folk()
    religion__organized()
    window.world.regions.forEach(region => {
      const { religion: ridx } = window.world.cultures[region.culture.ruling]
      const religion = window.world.religions[ridx]
      region.religion = religion.idx
    })
  }
  private history() {
    const { provinces, regions } = window.world
    const civilized = government({
      development: 'civilized',
      governments: () =>
        window.dice.weightedChoice([
          { v: 'autocratic kingdom', w: 0.4 },
          { v: 'theocratic kingdom', w: 0.05 },
          { v: 'oligarchic kingdom', w: 0.2 },
          { v: 'city-state confederacy', w: 0.2 },
          { v: 'warring states', w: 0.1 }
        ])
    })
    const frontier = government({
      development: 'frontier',
      governments: () =>
        window.dice.weightedChoice([
          { v: 'autocratic kingdom', w: 0.15 },
          { v: 'theocratic kingdom', w: 0.05 },
          { v: 'oligarchic kingdom', w: 0.35 },
          { v: 'city-state confederacy', w: 0.3 },
          { v: 'warring states', w: 0.1 }
        ])
    })
    const tribal = government({
      development: 'tribal',
      governments: region =>
        validSteppeNomads(region)
          ? 'steppe nomads'
          : window.dice.weightedChoice([
              { v: 'autocratic chiefdom', w: 0.025 },
              { v: 'theocratic chiefdom', w: 0.025 },
              { v: 'oligarchic chiefdom', w: 0.25 },
              { v: 'tribal confederacy', w: 0.5 },
              { v: 'autonomous tribes', w: 0.1 },
              { v: 'warring tribes', w: 0.1 }
            ])
    })
    const remote = government({
      development: 'remote',
      governments: region =>
        validSteppeNomads(region)
          ? 'steppe nomads'
          : window.dice.weightedChoice([
              { v: 'oligarchic chiefdom', w: 0.04 },
              { v: 'tribal confederacy', w: 0.15 },
              { v: 'autonomous tribes', w: 0.8 },
              { v: 'warring tribes', w: 0.05 }
            ])
    })
    // empires
    const imperium: RegionalCounters = {
      civilized: { target: 0.05, current: 0, total: civilized.length },
      frontier: { target: 0.05, current: 0, total: frontier.length },
      tribal: { target: 0.025, current: 0, total: tribal.length },
      remote: { target: 0, current: 0, total: remote.length }
    }
    const decentralized: Region['government'][] = [
      'warring states',
      'warring tribes',
      'autonomous tribes',
      'tribal confederacy',
      'free city',
      'pirate republic'
    ]
    const imperial: Region['government'][] = [
      'autocratic empire',
      'theocratic empire',
      'oligarchic empire',
      'steppe horde',
      'grand republic'
    ]
    window.dice.shuffle(regions).forEach(region => {
      const { current, target, total } = imperium[region.development]
      if (
        region.provinces.length > 0 &&
        !decentralized.includes(region.government) &&
        current / total < target
      ) {
        let completed = false
        while (!completed) {
          const neighbors = region__neighbors(region).filter(n => !imperial.includes(n.government))
          if (neighbors.length === 0) break
          const closest = findClosestRegion({ ref: region, neighbors })
          claimRegion({ nation: region, region: closest })
          completed = region__domains(region).length > 5
        }
        if (region__domains(region).length >= 5) {
          imperium[region.development].current++
          region.government =
            region.government === 'city-state confederacy'
              ? 'grand republic'
              : region.government === 'autocratic kingdom' ||
                region.government === 'autocratic chiefdom'
              ? 'autocratic empire'
              : region.government === 'theocratic kingdom' ||
                region.government === 'theocratic chiefdom'
              ? 'theocratic empire'
              : region.government === 'steppe nomads'
              ? 'steppe horde'
              : 'oligarchic empire'
        }
      }
    })
    // regular conquest
    const anarchy: Region['government'][] = ['warring states', 'warring tribes', 'pirate republic']
    window.dice.shuffle(regions).forEach(region => {
      const neighbors = region__neighbors(region).filter(
        neighbor => region__domains(neighbor).length === 1
      )
      if (
        region.provinces.length > 1 &&
        neighbors.length > 0 &&
        !anarchy.includes(region.government) &&
        !imperial.includes(region.government) &&
        window.dice.random < 0.4
      ) {
        const closest = province__sortClosest(
          neighbors.map(neighbor => provinces[neighbor.capital]),
          provinces[region.capital]
        )
          .map(province => regions[province.region])
          .slice(0, window.dice.choice([1, 1, 2]))
        closest.forEach(neighbor => claimRegion({ nation: region, region: neighbor }))
      }
    })
    // random expansion
    window.dice.shuffle(regions).forEach(nation => {
      if (nation.provinces.length > 1) {
        range(window.dice.randint(0, 10)).forEach(() => {
          const prospects = Array.from(
            new Set(
              nation.provinces
                .map(p =>
                  province__foreignNeighbors(window.world.provinces[p]).map(({ idx }) => idx)
                )
                .flat()
            )
          )
            .map(p => window.world.provinces[p])
            .filter(province => province.idx !== window.world.regions[province.nation].capital)
          const target = province__findClosest(prospects, window.world.provinces[nation.capital])
          if (target) claimProvince({ nation, province: target })
        })
      }
    })
    // grand duchies
    regions.forEach(region => {
      if (
        isDuchy(region) &&
        !anarchy.includes(region.government) &&
        region.provinces.length > 1 &&
        region.civilized
      ) {
        region.government = 'grand duchy'
      }
    })
    // free cities
    regions
      .filter(region => region.provinces.length === 1)
      .forEach(region => {
        region.government = region.civilized ? 'free city' : 'autonomous tribes'
      })
    // colonial domains
    const colonial: Region['government'][] = imperial.concat([
      'pirate republic',
      'trading company',
      'exiled kingdom'
    ])
    const overlords = regions.filter(region => region.development === 'civilized')
    const domains = regions.filter(
      region =>
        !region.civilized &&
        region__domains(region).length === 1 &&
        region.provinces.map(p => window.world.provinces[p]).some(province => province.hub.coastal)
    )
    window.dice
      .shuffle(domains)
      .filter(isDuchy)
      .slice(0, Math.ceil(window.world.regions.length * 0.02))
      .forEach(region => {
        const prospects = overlords.filter(colony => colony.side === region.side)
        if (prospects.length === 0) return
        region.government = 'pirate republic'
        region.culture.ruling = window.dice.choice(prospects).culture.native
      })
    window.dice
      .shuffle(domains)
      .filter(region => !isDuchy(region) && !colonial.includes(region.government))
      .slice(0, Math.ceil(window.world.regions.length * 0.02))
      .forEach(region => {
        const prospects = overlords.filter(colony => colony.side === region.side)
        if (prospects.length === 0) return
        region.government = 'exiled kingdom'
        region.culture.ruling = window.dice.choice(prospects).culture.native
      })
    window.dice
      .shuffle(domains)
      .filter(region => !colonial.includes(region.government))
      .slice(0, Math.ceil(window.world.regions.length * 0.04))
      .forEach(region => {
        region.government = 'trading company'
        const prospects = overlords.filter(
          overlord => overlord.side === region.side && overlord.provinces.length > 1
        )
        if (prospects.length === 0) return
        const selected = window.dice.choice(prospects)
        region.culture.ruling = selected.culture.native
        selected.relations[region.idx] = 'vassal'
        region.relations[selected.idx] = 'suzerain'
      })
    // subjects
    const theocracy: Region['government'][] = [
      'theocratic chiefdom',
      'theocratic kingdom',
      'theocratic empire'
    ]
    window.dice.shuffle(regions).forEach(region => {
      const domain = region__domains(region).length
      const neighbors = province__sortClosest(
        region__neighbors(region)
          .filter(
            neighbor =>
              region__domains(neighbor).length === 1 &&
              neighbor.provinces.length < region.provinces.length &&
              !anarchy.includes(neighbor.government) &&
              Object.values(neighbor.relations).every(
                relation => relation !== 'vassal' && relation !== 'suzerain'
              )
          )
          .map(neighbor => provinces[neighbor.capital]),
        provinces[region.capital]
      )
        .map(province => window.world.regions[province.nation])
        .slice(
          0,
          window.dice.weightedChoice([
            { w: 8, v: 0 },
            { w: domain < 2 ? 0 : 4, v: 1 },
            { w: domain < 3 ? 0 : 2, v: 2 },
            { w: domain < 4 ? 0 : 1, v: 3 }
          ])
        )
      if (
        region.provinces.length > 0 &&
        !decentralized.includes(region.government) &&
        Object.values(region.relations).every(relation => relation !== 'suzerain')
      ) {
        neighbors.forEach(neighbor => {
          neighbor.relations[region.idx] = 'suzerain'
          region.relations[neighbor.idx] = 'vassal'
          if (
            region.civilized &&
            theocracy.includes(region.government) &&
            neighbor.provinces.length > 1 &&
            window.dice.flip
          ) {
            neighbor.government = 'monastic order'
          }
        })
      }
    })
    // wars
    const wars: RegionalCounters = {
      civilized: { current: 0, total: civilized.length, target: 0.1 },
      frontier: { current: 0, total: frontier.length, target: 0.1 },
      tribal: { current: 0, total: tribal.length, target: 0.1 },
      remote: { current: 0, total: remote.length, target: 0.1 }
    }
    window.dice.shuffle(regions).forEach(region => {
      const { current, target, total } = wars[region.development]
      if (
        current / total < target &&
        region.provinces.length > 1 &&
        !anarchy.includes(region.government) &&
        !regionAtWar(region)
      ) {
        const neighbors = region__neighbors(region).filter(
          neighbor =>
            region.provinces.length > 1 && !neighbor.relations[region.idx] && !regionAtWar(neighbor)
        )
        const prospects = window.dice.shuffle(
          sortClosestRegion({ ref: region, neighbors }).slice(0, 3)
        )
        if (prospects.length > 0) {
          const [belligerent] = prospects
          belligerent.relations[region.idx] = 'at war'
          region.relations[belligerent.idx] = 'at war'
          wars[region.development].current++
          const regionBorders = region.provinces.filter(p =>
            province__foreignStates([provinces[p]]).includes(belligerent.idx)
          )
          const belligerentBorders = belligerent.provinces.filter(p =>
            province__foreignStates([provinces[p]]).includes(region.idx)
          )
          const contested = regionBorders.concat(belligerentBorders)
          const borders = window.dice.shuffle(
            window.dice.weightedChoice([
              {
                v: contested,
                w: 0.3
              },
              {
                v: region.provinces > belligerent.provinces ? belligerentBorders : regionBorders,
                w: 0.3
              },
              {
                v: window.dice.choice([belligerentBorders, regionBorders]),
                w: 0.3
              }
            ])
          )
          window.world.conflicts.push({
            type: 'war',
            provinces: borders.slice(0, Math.max(0.5 * borders.length, 3)),
            regions: [region.idx, belligerent.idx]
          })
        }
      }
    })
    // diplomacy
    regions.forEach(region => {
      region__neighbors(region)
        .filter(neighbor => !region.relations[neighbor.idx])
        .forEach(neighbor => {
          const relation = window.dice.weightedChoice<DiplomaticRelation>([
            { v: 'ally', w: 0.1 },
            { v: 'friendly', w: 0.2 },
            { v: 'neutral', w: 0.3 },
            { v: 'suspicious', w: 0.4 }
          ])
          region.relations[neighbor.idx] = relation
          neighbor.relations[region.idx] = relation
        })
    })
    regions
      .filter(region => Object.values(region.relations).some(relation => relation === 'vassal'))
      .forEach(region => {
        const atWar = regionRelations({ target: 'at war', region })
        regionRelations({ target: 'vassal', region }).forEach(vassal => {
          const vassalWar = regionRelations({ target: 'at war', region: vassal })
          vassalWar
            .filter(belligerent => region.relations[belligerent.idx])
            .forEach(belligerent => {
              region.relations[belligerent.idx] = 'suspicious'
              belligerent.relations[region.idx] = 'suspicious'
            })
          atWar
            .filter(belligerent => vassal.relations[belligerent.idx])
            .forEach(belligerent => {
              vassal.relations[belligerent.idx] = 'suspicious'
              belligerent.relations[vassal.idx] = 'suspicious'
            })
        })
      })
  }
}
