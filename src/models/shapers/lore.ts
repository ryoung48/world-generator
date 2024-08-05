import { range } from 'd3'

import { WORLD } from '..'
import { CELL } from '../cells'
import { SPECIES } from '../heritage/species'
import { REGION } from '../regions'
import { PROVINCE } from '../regions/provinces'
import { Province } from '../regions/provinces/types'
import { HUB } from '../regions/sites/hubs'
import { WILDERNESS } from '../regions/sites/wilderness'
import { TRADE_GOODS } from '../regions/trade'
import { DiplomaticRelation, Region } from '../regions/types'
import { WAR } from '../regions/wars'
import { ARRAY } from '../utilities/array'
import { POINT } from '../utilities/math/points'
import { PERFORMANCE } from '../utilities/performance'

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

export const LORE = PERFORMANCE.profile.wrapper({
  label: 'LORE',
  o: {
    _conflict: () => {
      const regions = REGION.nations
      const target = 0.15
      const wars = { target, current: 0, total: regions.length }
      window.dice.shuffle(regions).forEach(region => {
        const { current, target, total } = wars
        if (
          current / total < target &&
          REGION.provinces(region).length > 1 &&
          !REGION.atWar(region)
        ) {
          const neighbors = REGION.neighbors({ region }).filter(
            neighbor =>
              REGION.provinces(region).length > 1 &&
              neighbor.relations[region.idx] !== 'at war' &&
              neighbor.relations[region.idx] !== 'vassal' &&
              !REGION.atWar(neighbor)
          )
          const prospects = window.dice.shuffle(
            REGION.sort({ ref: region, group: neighbors, type: 'closest' }).slice(0, 3)
          )
          if (prospects.length > 0) {
            const [belligerent] = prospects
            REGION.relations.set({ target: 'at war', r1: region, r2: belligerent })
            wars.current++
            WAR.spawn({ defender: region, attacker: belligerent })
          }
        }
      })
      regions
        .filter(region => Object.values(region.relations).some(relation => relation === 'vassal'))
        .forEach(region => {
          const atWar = REGION.relations.get({ target: 'at war', region })
          REGION.relations.get({ target: 'vassal', region }).forEach(vassal => {
            const vassalWar = REGION.relations.get({ target: 'at war', region: vassal })
            vassalWar
              .filter(belligerent => region.relations[belligerent.idx])
              .forEach(belligerent => {
                REGION.relations.set({ target: 'suspicious', r1: region, r2: belligerent })
              })
            atWar
              .filter(belligerent => vassal.relations[belligerent.idx])
              .forEach(belligerent => {
                REGION.relations.set({ target: 'suspicious', r1: vassal, r2: belligerent })
              })
          })
        })
    },
    _demographics: () => {
      // go through each region and finalize the cities
      Object.values(window.world.regions).forEach(region => {
        const capital = window.world.provinces[region.capital]
        // find all settlements in the region
        const cities = REGION.provinces(region)
        // find all towns in the region
        const towns = cities.filter(town => !town.capital)
        // set the capital's population
        const capitalMod = window.dice.uniform(0.03, 0.04)
        let pop = REGION.population(region) * capitalMod
        if (region.civilized && pop < 10000) pop = window.dice.randint(10000, 15000)
        if (pop < 1000) pop = window.dice.randint(1000, 5000)
        PROVINCE.hub(capital).population = pop
        const capitalPop = PROVINCE.hub(capital).population
        const largeTownPop = () => window.dice.randint(5000, 10000)
        const smallTownPop = () => window.dice.randint(1000, 5000)
        const largeVillagePop = () => window.dice.randint(500, 1000)
        const smallVillagePop = () => window.dice.randint(150, 500)

        // set the next largest city
        pop = Math.round(pop * window.dice.uniform(0.3, 0.5))
        towns
          .sort((a, b) => PROVINCE.cell(b).score - PROVINCE.cell(a).score)
          .forEach(province => {
            const rural = window.dice.weightedChoice([
              { w: capitalPop < 10000 ? 0 : 1, v: largeTownPop },
              { w: capitalPop < 5000 ? 0 : 1, v: smallTownPop },
              { w: 1, v: largeVillagePop },
              { w: 1, v: smallVillagePop }
            ])()
            const urban = pop > 10000 ? pop : rural
            const hub = PROVINCE.hub(province)
            const conflict =
              urban &&
              ARRAY.unique(
                PROVINCE.neighbors({ province })
                  .map(n => PROVINCE.neighbors({ province: n }).map(n => n.idx))
                  .flat()
              ).some(n => {
                const neighbor = window.world.provinces[n]
                const nHub = PROVINCE.hub(neighbor)
                return (
                  n !== province.idx &&
                  HUB.isCity(hub) &&
                  POINT.distance.geo({ points: [nHub, hub] }) <
                    WORLD.placement.spacing.provinces * 2
                )
              })
            hub.population = conflict ? rural : urban
            // make each city's population some fraction of the previous city's population
            const mod = window.dice.uniform(0.5, 0.8)
            if (!conflict) pop = Math.round(pop * (1 - mod))
          })
      })
    },
    _history: () => {
      const { provinces } = window.world
      const regions = REGION.nations
      // empires
      const imperium = { target: 0.02, current: 0, total: regions.length }
      const sizeLimit = (region: Region) => {
        const culture = window.world.cultures[region.culture]
        const details = SPECIES.lookup[culture.species]
        return culture.species !== 'ogre' && details.traits.height !== 'small'
      }
      window.dice
        .shuffle(regions)
        .filter(sizeLimit)
        .forEach(region => {
          const { current, target, total } = imperium
          if (REGION.provinces(region).length > 0 && current / total < target) {
            let completed = false
            while (!completed) {
              const neighbors = REGION.neighbors({ region }).filter(
                n => n.size !== 'empire' && n.development <= region.development
              )
              if (neighbors.length === 0) break
              const closest = REGION.find({ ref: region, group: neighbors, type: 'closest' })
              claimRegion({ nation: region, region: closest })
              completed = REGION.domains(region).length > 5
            }
            if (REGION.domains(region).length >= 5) {
              imperium.current++
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
            neighbor =>
              REGION.domains(neighbor).length === 1 && neighbor.development <= region.development
          )
          if (
            REGION.provinces(region).length > 1 &&
            neighbors.length > 0 &&
            region.size !== 'empire' &&
            window.dice.random < 0.4
          ) {
            const closest = PROVINCE.sort({
              group: neighbors.map(neighbor => provinces[neighbor.capital]),
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
              group: prospects,
              ref: window.world.provinces[nation.capital],
              type: 'closest'
            })
            if (target) claimProvince({ nation, province: target })
          })
        }
      })
      // realm titles
      regions.forEach(region => {
        if (REGION.provinces(region).length === 1) {
          region.size = 'city-state'
        } else if (REGION.provinces(region).length <= 10) {
          region.size = 'principality'
        } else if (REGION.provinces(region).length <= 30) {
          region.size = 'kingdom'
        } else region.size = 'empire'
      })
      // diplomacy
      regions.forEach(region => {
        REGION.neighbors({ region })
          .filter(neighbor => !region.relations[neighbor.idx])
          .forEach(neighbor => {
            const relation = window.dice.weightedChoice<DiplomaticRelation>([
              { v: 'ally', w: 0.1 },
              { v: 'friendly', w: 0.15 },
              { v: 'neutral', w: 0.35 },
              { v: 'suspicious', w: 0.4 }
            ])
            REGION.relations.set({ target: relation, r1: region, r2: neighbor })
          })
      })
      //government
      const sizes: Region['size'][] = ['empire', 'kingdom', 'principality', 'city-state']
      sizes.forEach(size => {
        const regions = window.world.regions.filter(region => region.size === size)
        regions.forEach(region => {
          const powerLimit = REGION.provinces(region).length * 4
          const overlords = REGION.neighbors({ region }).filter(
            n =>
              n.government !== 'fragmented' &&
              n.government !== 'confederation' &&
              n.overlord === undefined &&
              region.relations[n.idx] !== 'at war' &&
              REGION.provinces(n).length > powerLimit
          )
          region.government = window.dice.weightedChoice([
            { w: region.civilized ? 3 : 1, v: 'autocracy' },
            { w: region.civilized ? 1 : 0, v: 'republic' },
            { w: region.civilized ? 2 : 1, v: 'oligarchy' },
            { w: region.civilized ? 0.5 : 1, v: 'confederation' },
            { w: region.religion === 'atheistic' ? 0 : region.civilized ? 1 : 0.5, v: 'theocracy' },
            { w: overlords.length > 0 ? 2 : 0, v: 'vassal' },
            { w: region.civilized || region.size === 'empire' ? 0 : 1, v: 'fragmented' }
          ])
          if (region.government === 'vassal')
            REGION.vassals.add({ overlord: window.dice.choice(overlords), vassal: region })
        })
      })
    },
    _places: () => {
      const base = 2000
      const count = Math.floor(base * WORLD.placement.ratio())
      const spacing = WORLD.placement.spacing.provinces * 0.6
      const { provinces } = window.world
      WORLD.placement
        .close({
          count,
          spacing,
          whitelist: WORLD.land().filter(
            poly => !CELL.place(poly) && !window.world.regions[poly.region].desolate
          ),
          blacklist: provinces.map(province => PROVINCE.cell(province))
        })
        .forEach(cell => {
          const province = CELL.province(cell)
          const site = WILDERNESS.spawn(cell)
          province.sites.push(site)
        })
    },
    _trade: () => {
      REGION.nations.forEach(region => {
        TRADE_GOODS.spawn(region)
      })
    },
    build: () => {
      LORE._demographics()
      LORE._history()
      LORE._conflict()
      LORE._places()
      LORE._trade()
    }
  }
})
