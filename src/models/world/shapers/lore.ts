import { range } from 'd3'

import { NATION } from '../../nations'
import { RELIGION } from '../../npcs/religions'
import { SPECIES } from '../../npcs/species'
import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { HUB } from '../../regions/provinces/hubs'
import { Province } from '../../regions/provinces/types'
import { DiplomaticRelation, Region } from '../../regions/types'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { WORLD } from '..'
import { CIVILIZATION } from './civilization'

type RegionalCounters = Record<string, { target: number; current: number; total: number }>

const claimRegion = (params: { nation: Region; region: Region }) => {
  const { nation, region } = params
  const provinces = REGION.provinces(region)
  const domains = REGION.domains(region).filter(r => r.idx !== region.idx)
  region.provinces = []
  provinces
    .filter(p => p.region === region.idx)
    .forEach(p => PROVINCE.move({ province: p, nation }))
  domains.forEach(domain => {
    provinces
      .filter(p => p.region === domain.idx)
      .forEach(p => PROVINCE.move({ province: p, nation: domain }))
  })
  // leftovers
  const candidates = domains.concat([nation])
  provinces
    .filter(p => PROVINCE.nation(p).idx === region.idx)
    .forEach(province => {
      const neighbors = PROVINCE.neighbors({ province, type: 'foreign' })
      const best = candidates.reduce(
        (selected, candidate) => {
          const matches = neighbors.filter(n => PROVINCE.nation(n).idx === candidate.idx).length
          return matches > selected.d ? { d: matches, region: candidate } : selected
        },
        { d: -Infinity, region: nation }
      )
      PROVINCE.move({ province, nation: best.region })
    })
}

const claimProvince = (params: { nation: Region; province: Province }) => {
  const { nation, province } = params
  const region = PROVINCE.nation(province)
  PROVINCE.move({ province, nation })
  region.provinces = region.provinces.filter(p => p !== province.idx)
}

const steppeNomads = (region: Region) =>
  REGION.biome(region).terrain === 'plains' &&
  window.world.landmarks[window.world.cells[window.world.provinces[region.capital].cell].landmark]
    .type === 'continent'

export const LORE = PERFORMANCE.profile.wrapper({
  label: 'LORE',
  o: {
    _demographics: () => {
      // go through each region and finalize the cities
      Object.values(window.world.regions).forEach(region => {
        const capital = window.world.provinces[region.capital]
        // find all settlements in the region
        const cities = REGION.provinces(region)
        // find all towns in the region
        const towns = cities.filter(town => !town.capital)
        // set the capital's population
        const capitalMod = window.dice.uniform(0.02, 0.03)
        let pop = REGION.population(region) * capitalMod
        if ((region.civilized && pop < 10000) || (!region.civilized && pop > 15000))
          pop = window.dice.uniform(10000, 15000)
        HUB.setPopulation(capital.hub, pop)
        // set the next largest city
        pop = Math.round(pop * window.dice.uniform(0.2, 0.6))
        towns
          .sort((a, b) => PROVINCE.cell(b).score - PROVINCE.cell(a).score)
          .forEach(province => {
            const rural = window.dice.randint(50, 300)
            const urban = pop > 300 ? pop : rural
            HUB.setPopulation(province.hub, urban)
            const conflict =
              HUB.urban(province.hub) &&
              PROVINCE.neighbors({ province }).some(
                neighbor =>
                  HUB.urban(neighbor.hub) &&
                  POINT.distance.geo({ points: [neighbor.hub, province.hub] }) <
                    WORLD.placement.spacing.provinces * 2
              )
            // make each city's population some fraction of the previous city's population
            if (conflict) HUB.setPopulation(province.hub, rural)
            else pop = Math.round(pop * (1 - window.dice.uniform(0.2, 0.5)))
          })
      })
    },
    _history: () => {
      const { provinces } = window.world
      const regions = window.world.regions
      const industrial = regions.filter(r => r.development === 6)
      const enlightened = regions.filter(r => r.development === 5)
      const colonial = regions.filter(r => r.development === 4)
      const mercantile = regions.filter(r => r.development === 3)
      const feudal = regions.filter(r => r.development === 2)
      const agrarian = regions.filter(r => r.development === 1)
      const nomadic = regions.filter(r => r.development === 0)
      // empires
      const imperium: RegionalCounters = {
        [6]: { target: 0.025, current: 0, total: industrial.length },
        [5]: { target: 0.025, current: 0, total: enlightened.length },
        [4]: { target: 0.025, current: 0, total: colonial.length },
        [3]: { target: 0.05, current: 0, total: mercantile.length },
        [2]: { target: 0.05, current: 0, total: feudal.length },
        [1]: { target: 0.025, current: 0, total: agrarian.length },
        [0]: { target: 0, current: 0, total: nomadic.length }
      }
      const sizeLimit = (region: Region) => {
        const culture = window.world.cultures[region.culture]
        const species = SPECIES.lookup[culture.species]
        return culture.species !== 'ogre' && species.traits.height !== 'small'
      }
      window.dice
        .shuffle(regions)
        .filter(sizeLimit)
        .forEach(region => {
          const { current, target, total } = imperium[region.development]
          if (REGION.provinces(region).length > 0 && current / total < target) {
            let completed = false
            while (!completed) {
              const neighbors = REGION.neighbors({ region }).filter(n => n.size !== 'empire')
              if (neighbors.length === 0) break
              const closest = REGION.find({ ref: region, regions: neighbors, type: 'closest' })
              claimRegion({ nation: region, region: closest })
              completed = REGION.domains(region).length > 5
            }
            if (REGION.domains(region).length >= 5) {
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
          const neighbors = REGION.neighbors({ region }).filter(
            neighbor => REGION.domains(neighbor).length === 1
          )
          if (
            REGION.provinces(region).length > 1 &&
            neighbors.length > 0 &&
            region.size !== 'empire' &&
            window.dice.random < 0.4
          ) {
            const closest = PROVINCE.sort({
              provinces: neighbors.map(neighbor => provinces[neighbor.capital]),
              ref: provinces[region.capital],
              type: 'closest'
            })
              .map(province => PROVINCE.region(province))
              .slice(0, window.dice.choice([1, 1, 2]))
            closest.forEach(neighbor => claimRegion({ nation: region, region: neighbor }))
          }
        })
      // random expansion
      window.dice.shuffle(regions).forEach(nation => {
        if (REGION.provinces(nation).length > 1) {
          range(window.dice.randint(0, 10)).forEach(() => {
            const prospects = Array.from(
              new Set(
                REGION.provinces(nation)
                  .map(p =>
                    PROVINCE.neighbors({ province: p, type: 'foreign' }).map(({ idx }) => idx)
                  )
                  .flat()
              )
            )
              .map(p => window.world.provinces[p])
              .filter(province => !PROVINCE.isCapital(province))
            const target = PROVINCE.find({
              provinces: prospects,
              ref: window.world.provinces[nation.capital],
              type: 'closest'
            })
            if (target) claimProvince({ nation, province: target })
          })
        }
      })
      //shattered
      Object.entries(CIVILIZATION.shattered).forEach(([r, subjects]) => {
        const epicenter = window.world.regions[parseInt(r)]
        subjects.forEach(subject => {
          claimRegion({ nation: epicenter, region: window.world.regions[subject] })
        })
      })
      // realm titles
      regions
        .filter(region => region.size !== 'empire')
        .forEach(region => {
          if (REGION.provinces(region).length === 1) {
            region.size = 'free city'
          } else if (REGION.provinces(region).length <= 8) {
            region.size = 'barony'
          } else if (REGION.provinces(region).length <= 16) {
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
        const nonRemote = development !== 0
        const nonCivilized = development < 4
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
      // leadership
      const monarchies: Region['government'][] = [
        'autocratic monarchy',
        'feudal monarchy',
        'imperial bureaucracy',
        'theocratic authority'
      ]
      regions
        .filter(region => monarchies.includes(region.government))
        .forEach(region => {
          region.leadership =
            region.size === 'empire'
              ? { male: 'emperor', female: 'empress' }
              : region.size === 'kingdom'
              ? { male: 'king', female: 'queen' }
              : region.size === 'duchy'
              ? { male: 'duke', female: 'duchess' }
              : { male: 'baron', female: 'baroness' }
        })
      const steppeHorde: Region['government'][] = ['steppe horde']
      regions
        .filter(region => steppeHorde.includes(region.government))
        .forEach(region => {
          region.leadership = { male: 'great khan', female: 'great khan' }
        })
      // wars
      const wars: RegionalCounters = {
        [6]: { target: 0.1, current: 0, total: industrial.length },
        [5]: { target: 0.1, current: 0, total: enlightened.length },
        [4]: { target: 0.1, current: 0, total: colonial.length },
        [3]: { target: 0.1, current: 0, total: mercantile.length },
        [2]: { target: 0.1, current: 0, total: feudal.length },
        [1]: { target: 0.1, current: 0, total: agrarian.length },
        [0]: { target: 0.1, current: 0, total: nomadic.length }
      }
      window.dice.shuffle(regions).forEach(region => {
        const { current, target, total } = wars[region.development]
        if (
          current / total < target &&
          REGION.provinces(region).length > 1 &&
          !REGION.atWar(region)
        ) {
          const neighbors = REGION.neighbors({ region }).filter(
            neighbor =>
              REGION.provinces(region).length > 1 &&
              !neighbor.relations[region.idx] &&
              !REGION.atWar(neighbor)
          )
          const prospects = window.dice.shuffle(
            REGION.sort({ ref: region, regions: neighbors, type: 'closest' }).slice(0, 3)
          )
          if (prospects.length > 0) {
            const [belligerent] = prospects
            belligerent.relations[region.idx] = 'at war'
            region.relations[belligerent.idx] = 'at war'
            wars[region.development].current++
            const regionBorders = REGION.provinces(region).filter(p =>
              PROVINCE.neighboringRegions([p]).includes(belligerent.idx)
            )
            const belligerentBorders = REGION.provinces(belligerent).filter(p =>
              PROVINCE.neighboringRegions([p]).includes(region.idx)
            )
            const contested = regionBorders.concat(belligerentBorders)
            const borders = window.dice.shuffle(
              window.dice.weightedChoice([
                {
                  v: contested,
                  w: 0.3
                },
                {
                  v:
                    REGION.provinces(region) > REGION.provinces(belligerent)
                      ? belligerentBorders
                      : regionBorders,
                  w: 0.3
                },
                {
                  v: window.dice.choice([belligerentBorders, regionBorders]),
                  w: 0.3
                }
              ])
            )
            const battlegrounds = borders.slice(0, Math.max(0.5 * borders.length, 3))
            battlegrounds.forEach(province => {
              province.conflict = window.world.conflicts.length
            })
            window.world.conflicts.push({
              type: 'war',
              provinces: battlegrounds.map(p => p.idx),
              regions: [region.idx, belligerent.idx]
            })
          }
        }
      })
      // diplomacy
      regions.forEach(region => {
        REGION.neighbors({ region })
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
          const atWar = REGION.relations({ target: 'at war', region })
          REGION.relations({ target: 'vassal', region }).forEach(vassal => {
            const vassalWar = REGION.relations({ target: 'at war', region: vassal })
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
      NATION.init()
    },
    _religions: () => {
      RELIGION.spawn()
      window.world.regions.forEach(region => {
        const { religion: ridx } = window.world.cultures[region.culture]
        const religion = window.world.religions[ridx]
        region.religion = religion.idx
      })
    },
    _settlements: () => {
      window.world.provinces
        .filter(
          p =>
            !PROVINCE.region(p).civilized &&
            HUB.village(p.hub) &&
            PROVINCE.isBorder(p) &&
            window.dice.random < 0.4
        )
        .forEach(p => (p.hub.type = 'trading outpost'))
      window.world.provinces
        .filter(
          p =>
            PROVINCE.region(p).civilized &&
            HUB.village(p.hub) &&
            PROVINCE.isBorder(p) &&
            window.dice.random < 0.4
        )
        .forEach(p => (p.hub.type = 'military outpost'))
      window.world.provinces
        .filter(
          p =>
            !PROVINCE.region(p).civilized &&
            HUB.seaside(p.hub) &&
            !PROVINCE.isCapital(p) &&
            window.dice.random < 0.1
        )
        .forEach(p => (p.hub.type = 'colonial outpost'))
    },
    build: () => {
      LORE._demographics()
      LORE._religions()
      LORE._history()
      // LORE._settlements()
    }
  }
})
