import { range } from 'd3'

import { WORLD } from '..'
import { CELL } from '../cells'
import { CULTURE } from '../heritage/cultures'
import { LANGUAGE } from '../heritage/languages'
import { SPECIES } from '../heritage/species'
import { REGION } from '../regions'
import { CAMP } from '../regions/places/camp'
import { HUB } from '../regions/places/hub'
import { RUIN } from '../regions/places/ruin'
import { VILLAGE } from '../regions/places/village'
import { WILDERNESS } from '../regions/places/wilderness'
import { PROVINCE } from '../regions/provinces'
import { Province } from '../regions/provinces/types'
import { DiplomaticRelation, Region } from '../regions/types'
import { WAR } from '../regions/wars'
import { POINT } from '../utilities/math/points'
import { PERFORMANCE } from '../utilities/performance'
import { TRAIT } from '../utilities/traits'

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
              !REGION.atWar(neighbor)
          )
          const prospects = window.dice.shuffle(
            REGION.sort({ ref: region, group: neighbors, type: 'closest' }).slice(0, 3)
          )
          if (prospects.length > 0) {
            const [belligerent] = prospects
            belligerent.relations[region.idx] = 'at war'
            region.relations[belligerent.idx] = 'at war'
            wars.current++
            WAR.spawn({ defender: region, attacker: belligerent })
          }
        }
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
        const capitalMod = window.dice.uniform(0.04, 0.06)
        let pop = REGION.population(region) * capitalMod
        if (region.civilized && pop < 10000) pop = window.dice.uniform(10000, 15000)
        if (pop < 8000) pop = window.dice.uniform(5000, 8000)
        HUB.population.set(PROVINCE.hub(capital), pop)
        // set the next largest city
        pop = Math.round(pop * window.dice.uniform(0.3, 0.5))
        towns
          .sort((a, b) => PROVINCE.cell(b).score - PROVINCE.cell(a).score)
          .forEach(province => {
            const rural = window.dice.randint(1000, 1500)
            const urban = pop > 1000 ? pop : rural
            const hub = PROVINCE.hub(province)
            const conflict =
              HUB.city(hub) &&
              PROVINCE.neighbors({ province }).some(neighbor => {
                const nHub = PROVINCE.hub(neighbor)
                return (
                  HUB.city(nHub) &&
                  POINT.distance.geo({ points: [nHub, hub] }) <
                    WORLD.placement.spacing.provinces * 1.5
                )
              })
            HUB.population.set(hub, conflict ? rural : urban)
            // make each city's population some fraction of the previous city's population
            const mod = pop > 50e3 ? window.dice.uniform(0.5, 0.8) : window.dice.uniform(0.1, 0.3)
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
        const species = CULTURE.species(culture)
        const details = SPECIES.lookup[CULTURE.species(culture)]
        return species !== 'ogre' && details.traits.height !== 'small'
      }
      window.dice
        .shuffle(regions)
        .filter(sizeLimit)
        .forEach(region => {
          const { current, target, total } = imperium
          if (REGION.provinces(region).length > 0 && current / total < target) {
            let completed = false
            while (!completed) {
              const neighbors = REGION.neighbors({ region }).filter(n => n.size !== 'empire')
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
            neighbor => REGION.domains(neighbor).length === 1
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
      //government
      regions.forEach(region => {
        region.government = window.dice.weightedChoice([
          { w: region.civilized ? 3 : 1, v: 'autocratic' },
          { w: region.civilized ? 1 : 0, v: 'republic' },
          { w: region.civilized ? 2 : 1, v: 'oligarchic' },
          { w: region.civilized ? 0.5 : 1, v: 'confederation' },
          { w: region.civilized ? 0 : 1, v: 'fragmented' }
        ])
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
            region.relations[neighbor.idx] = relation
            neighbor.relations[region.idx] = relation
          })
      })
      // traits
      window.world.regions.forEach(region => {
        region.traits = TRAIT.selection({
          available: REGION.traits,
          current: [],
          used: window.world.regions.map(r => r.traits?.map(t => t.tag) ?? []).flat(),
          samples: 2
        }).map(tag => ({
          tag,
          text: REGION.traits[tag].text
        }))
      })
    },
    _places: () => {
      const base = 4800
      const count = Math.floor(base * WORLD.placement.ratio())
      const spacing = WORLD.placement.spacing.provinces * 0.6
      const { provinces } = window.world
      WORLD.placement
        .close({
          count,
          spacing,
          whitelist: WORLD.land().filter(poly => !CELL.place(poly)),
          blacklist: provinces.map(province => PROVINCE.cell(province))
        })
        .forEach(cell => {
          const province = CELL.province(cell)
          const road = cell.roads.land.length > 0
          const trade = road || cell.coastal
          const tribal = PROVINCE.region(province).civilized
          const { local } = PROVINCE.cultures(province)
          const culture = window.world.cultures[local.culture]
          if (!culture) return
          const type = window.dice.weightedChoice([
            { v: 'ruin', w: road ? 0.05 : 0.5 },
            { v: 'wilderness', w: road ? 0.05 : 0.5 },
            { v: 'village', w: trade ? 1 : 0.1 },
            { v: 'camp', w: tribal ? 0.2 : trade ? 0.1 : 0.01 }
          ])
          const place =
            type === 'ruin'
              ? RUIN.spawn(cell)
              : type === 'wilderness'
              ? WILDERNESS.spawn(cell)
              : type === 'village'
              ? VILLAGE.spawn(cell)
              : CAMP.spawn(cell)
          place.name = LANGUAGE.word.unique({
            lang: culture.language,
            key: type,
            len: window.dice.randint(2, 4)
          })
          province.places.push(place)
        })
    },
    build: () => {
      LORE._demographics()
      LORE._history()
      LORE._conflict()
      // LORE._places()
    }
  }
})
