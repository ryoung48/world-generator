import { range } from 'd3'

import { religion__spawn } from '../../../npcs/religions'
import { species__map } from '../../../npcs/species'
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

const steppeNomads = (region: Region) =>
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
    religion__spawn()
    window.world.regions.forEach(region => {
      const { religion: ridx } = window.world.cultures[region.culture.ruling]
      const religion = window.world.religions[ridx]
      region.religion = religion.idx
    })
  }
  private history() {
    const { provinces, regions } = window.world
    const civilized = window.world.regions.filter(r => r.development === 'civilized')
    const frontier = window.world.regions.filter(r => r.development === 'frontier')
    const tribal = window.world.regions.filter(r => r.development === 'tribal')
    const remote = window.world.regions.filter(r => r.development === 'remote')
    // empires
    const imperium: RegionalCounters = {
      civilized: { target: 0.05, current: 0, total: civilized.length },
      frontier: { target: 0.05, current: 0, total: frontier.length },
      tribal: { target: 0.025, current: 0, total: tribal.length },
      remote: { target: 0, current: 0, total: remote.length }
    }
    const sizeLimit = (region: Region) => {
      const culture = window.world.cultures[region.culture.native]
      const species = species__map[culture.species]
      return culture.species !== 'ogre' && species.traits.height !== 'small'
    }
    window.dice
      .shuffle(regions)
      .filter(sizeLimit)
      .forEach(region => {
        const { current, target, total } = imperium[region.development]
        if (region.provinces.length > 0 && current / total < target) {
          let completed = false
          while (!completed) {
            const neighbors = region__neighbors(region).filter(n => n.size !== 'empire')
            if (neighbors.length === 0) break
            const closest = findClosestRegion({ ref: region, neighbors })
            claimRegion({ nation: region, region: closest })
            completed = region__domains(region).length > 5
          }
          if (region__domains(region).length >= 5) {
            imperium[region.development].current++
            region.size = 'empire'
          }
        }
      })
    // regular conquest
    window.dice
      .shuffle(regions)
      .filter(sizeLimit)
      .forEach(region => {
        const neighbors = region__neighbors(region).filter(
          neighbor => region__domains(neighbor).length === 1
        )
        if (
          region.provinces.length > 1 &&
          neighbors.length > 0 &&
          region.size !== 'empire' &&
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
    // realm titles
    regions
      .filter(region => region.size !== 'empire')
      .forEach(region => {
        if (region.provinces.length === 1) {
          region.size = 'free city'
        } else if (region.provinces.length <= 8) {
          region.size = 'barony'
        } else if (region.provinces.length <= 16) {
          region.size = 'duchy'
        } else {
          region.size = 'kingdom'
        }
      })
    //government
    const used = new Set<Region['government']>()
    regions.forEach(region => {
      const { civilized, coastal, development, size } = region
      const large = size === 'kingdom' || size === 'empire'
      const nonRemote = development !== 'remote'
      const nonCivilized = development !== 'civilized'
      const steppe = steppeNomads(region)
      region.government =
        steppe && region.size === 'empire'
          ? 'steppe horde'
          : civilized && region.size === 'free city'
          ? 'free city'
          : window.dice.weightedChoice([
              { w: nonRemote ? 2 : 0, v: 'autocratic monarchy' },
              { w: civilized || !coastal ? 0 : 1, v: 'colonial overlord' },
              { w: nonRemote ? 2 : 0, v: 'feudal monarchy' },
              { w: nonCivilized ? 1 : 0, v: 'fragmented warlords' },
              { w: nonRemote && size !== 'empire' && coastal ? 2 : 0, v: 'free cities' },
              { w: nonRemote && !large ? 1 : 0, v: 'holy orders' },
              { w: civilized && large ? 2 : 0, v: 'imperial bureaucracy' },
              { w: civilized && !large ? 1 : 0, v: 'merchant republic' },
              { w: civilized ? 0 : 2, v: 'nomadic tribes' },
              { w: nonRemote && nonCivilized && !large ? 1 : 0, v: 'sorcerous cabal' },
              { w: nonRemote && nonCivilized && !large ? 1 : 0, v: 'splintered cults' },
              { w: nonRemote ? 2 : 0, v: 'theocratic authority' },
              { w: civilized ? 0 : 2, v: 'tribal confederacy' }
            ])
      used.add(region.government)
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
      if (current / total < target && region.provinces.length > 1 && !regionAtWar(region)) {
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
          const battlegrounds = borders.slice(0, Math.max(0.5 * borders.length, 3))
          battlegrounds
            .map(p => window.world.provinces[p])
            .forEach(province => {
              province.conflict = 'war'
            })
          window.world.conflicts.push({
            type: 'war',
            provinces: battlegrounds,
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
