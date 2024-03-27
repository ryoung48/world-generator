import { range } from 'd3'

import { WORLD } from '..'
import { CELL } from '../cells'
import { CULTURE } from '../npcs/cultures'
import { LANGUAGE } from '../npcs/languages'
import { RELIGION } from '../npcs/religions'
import { SPECIES } from '../npcs/species'
import { REGION } from '../regions'
import { CAMP } from '../regions/places/camp'
import { HUB } from '../regions/places/hub'
import { RUIN } from '../regions/places/ruin'
import { VILLAGE } from '../regions/places/village'
import { WILDERNESS } from '../regions/places/wilderness'
import { PROVINCE } from '../regions/provinces'
import { Province } from '../regions/provinces/types'
import { DiplomaticRelation, Region } from '../regions/types'
import { POINT } from '../utilities/math/points'
import { PERFORMANCE } from '../utilities/performance'
import { TEXT } from '../utilities/text'
import { TRAIT } from '../utilities/traits'

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

const regionsByTech = () => {
  const regions = window.world.regions.filter(r => !r.desolate)
  const industrial = regions.filter(r => r.development === 6)
  const enlightened = regions.filter(r => r.development === 5)
  const colonial = regions.filter(r => r.development === 4)
  const mercantile = regions.filter(r => r.development === 3)
  const feudal = regions.filter(r => r.development === 2)
  const agrarian = regions.filter(r => r.development === 1)
  const nomadic = regions.filter(r => r.development === 0)
  return {
    regions,
    industrial,
    enlightened,
    colonial,
    mercantile,
    feudal,
    agrarian,
    nomadic
  }
}

export const LORE = PERFORMANCE.profile.wrapper({
  label: 'LORE',
  o: {
    _conflict: () => {
      const { regions, industrial, enlightened, colonial, mercantile, feudal, agrarian, nomadic } =
        regionsByTech()
      const target = 0.1
      const wars: RegionalCounters = {
        [6]: { target, current: 0, total: industrial.length },
        [5]: { target, current: 0, total: enlightened.length },
        [4]: { target, current: 0, total: colonial.length },
        [3]: { target, current: 0, total: mercantile.length },
        [2]: { target, current: 0, total: feudal.length },
        [1]: { target, current: 0, total: agrarian.length },
        [0]: { target, current: 0, total: nomadic.length }
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
            wars[region.development].current++
            const regionBorders = REGION.provinces(region).filter(p =>
              PROVINCE.neighboringRegions([p]).includes(belligerent.idx)
            )
            const belligerentBorders = REGION.provinces(belligerent).filter(p =>
              PROVINCE.neighboringRegions([p]).includes(region.idx)
            )
            const borders = window.dice.weightedChoice([
              {
                v:
                  REGION.provinces(region) > REGION.provinces(belligerent)
                    ? belligerentBorders
                    : regionBorders,
                w: 1
              },
              {
                v: window.dice.choice([belligerentBorders, regionBorders]),
                w: 1
              }
            ])
            const battlegrounds = window.dice
              .shuffle(borders)
              .slice(0, Math.max(0.5 * borders.length, 3))
            const idx = window.world.wars.length
            belligerent.war = idx
            region.war = idx
            const [attacker, defender] =
              borders === regionBorders ? [belligerent, region] : [region, belligerent]
            battlegrounds.forEach(province => {
              province.conflict = idx
            })
            const sameCulture = attacker.culture === defender.culture
            const attackerIsAtheist = REGION.religion(attacker).type === 'atheistic'
            const sameSpecies =
              window.world.cultures[attacker.culture].species ===
              window.world.cultures[defender.culture].species
            const civilized = attacker.civilized && defender.civilized
            window.world.wars.push({
              idx,
              tag: 'war',
              name: LANGUAGE.word.simple({
                lang: window.world.cultures[attacker.culture].language,
                key: 'war'
              }),
              belligerents: `${TEXT.decorate({
                label: attacker.name.toLowerCase(),
                tooltip: 'invader'
              })}, ${TEXT.decorate({
                label: defender.name.toLowerCase(),
                tooltip: 'defender'
              })}`,
              provinces: battlegrounds.map(p => p.idx),
              status: window.dice.choice(['decisive', 'stalemated', 'struggling']),
              losses: window.dice.spin('{low|heavy} casualties, {mild|severe} destruction'),
              reasons: window.dice
                .weightedSample(
                  [
                    {
                      v: {
                        tag: `raider's haven`,
                        text: 'raiders are taking refuge in their lands'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `pillager's harvest`,
                        text: 'their lands are rich and bountiful, ripe for the taking'
                      },
                      w: !attacker.civilized ? 1 : 0
                    },
                    {
                      v: {
                        tag: `resource dispute`,
                        text: 'ownership of a resource site is disputed'
                      },
                      w: 3
                    },
                    {
                      v: {
                        tag: `territorial expansion`,
                        text: 'we seek to expand our sphere of influence'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `ancestral homelands`,
                        text: 'they hold territories that were previously ours'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `artifact theft`,
                        text: 'they stole an important {cultural|religious} relic'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `water obstructions`,
                        text: 'they are building a dam that will affect our water supply'
                      },
                      w: defender.civilized ? 1 : 0
                    },
                    {
                      v: {
                        tag: `criminal shelter`,
                        text: '{an usurper is|{criminals|rebels} are} being sheltered there'
                      },
                      w: 1
                    },
                    {
                      v: { tag: `holy crusade`, text: 'a troublemaking religion is based there' },
                      w: attackerIsAtheist ? 0 : 1
                    },
                    {
                      v: {
                        tag: `religious reclamation`,
                        text: 'there are disputes over holy sites along the border'
                      },
                      w: attackerIsAtheist ? 0 : 1
                    },
                    {
                      v: {
                        tag: `pilgrimage disruption`,
                        text: "they're hindering our people's pilgrimage to a sacred site"
                      },
                      w: attackerIsAtheist ? 0 : 1
                    },
                    {
                      v: {
                        tag: `throne claim`,
                        text: 'our rulers have a political claim on their throne'
                      },
                      w: sameSpecies ? 1 : 0
                    },
                    {
                      v: { tag: `marital discord`, text: 'a diplomatic marriage is going sour' },
                      w: sameSpecies ? 1 : 0
                    },
                    {
                      v: { tag: `past strife`, text: 'a past war’s savagery has left deep scars' },
                      w: 1
                    },
                    {
                      v: {
                        tag: `cultural encroachment`,
                        text: 'their culture is supplanting local beliefs'
                      },
                      w: sameCulture ? 0 : 1
                    },
                    {
                      v: {
                        tag: `ethnic liberation`,
                        text: 'they’re persecuting co-ethnics close to our border'
                      },
                      w: sameCulture ? 0 : 1
                    },
                    {
                      v: {
                        tag: `broken alliance`,
                        text: 'they broke off an important alliance pact'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `trade blockade`,
                        text: 'border tariffs and taxes are blocking trade'
                      },
                      w: civilized ? 1 : 0
                    },
                    {
                      v: {
                        tag: `smuggling crackdown`,
                        text: 'our merchants have been executed for alleged smuggling'
                      },
                      w: attacker.civilized ? 1 : 0
                    },
                    {
                      v: {
                        tag: `beast incursion`,
                        text: 'they drove a terrible beast into this land'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `enchantment wreckage`,
                        text: 'an enchantment of theirs caused problems here'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `spy network`,
                        text: 'a spy ring has been discovered gathering information and sowing discord'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `assassination suspicions`,
                        text: 'they’re suspected of backing assassinations'
                      },
                      w: 1
                    },
                    {
                      v: {
                        tag: `insurgency support`,
                        text: 'they’re supporting rebel groups in our lands'
                      },
                      w: 1
                    }
                  ],
                  2
                )
                .map(({ tag, text }) => ({ tag, text: window.dice.spin(text) }))
            })
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
      window.world.cultures.forEach(culture => CULTURE.finalize(culture))
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
      const { regions, industrial, enlightened, colonial, mercantile, feudal, agrarian, nomadic } =
        regionsByTech()
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
              const neighbors = REGION.neighbors({ region }).filter(
                n => n.size !== 'empire' && n.development <= region.development
              )
              if (neighbors.length === 0) break
              const closest = REGION.find({ ref: region, group: neighbors, type: 'closest' })
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
            neighbor =>
              REGION.domains(neighbor).length === 1 && region.development >= neighbor.development
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
          region.size = 'free city'
        } else if (REGION.provinces(region).length <= 10) {
          region.size = 'duchy'
        } else if (REGION.provinces(region).length <= 30) {
          region.size = 'kingdom'
        } else region.size = 'empire'
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
            : window.dice.weightedChoice([
                { w: nonRemote ? 2 : 0, v: 'autocratic monarchy' },
                { w: nonRemote ? 2 : 0, v: 'feudal monarchy' },
                { w: nonCivilized ? 0 : 1, v: 'fragmented warlords' },
                {
                  w: nonRemote && size !== 'empire' && coastal ? 1 : 0,
                  v: 'city-state confederation'
                },
                {
                  w: nonRemote && size !== 'empire' && coastal ? 1 : 0,
                  v: 'plutocratic council'
                },
                { w: nonRemote && !large ? 1 : 0, v: 'holy orders' },
                { w: civilized && large ? 2 : 0, v: 'imperial bureaucracy' },
                { w: civilized ? 0 : 2, v: 'fragmented tribes' },
                { w: nonRemote && nonCivilized && !large ? 1 : 0, v: 'sorcerous council' },
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
    _religions: () => {
      RELIGION.spawn()
      REGION.nations.forEach(region => {
        const { religion: ridx } = window.world.cultures[region.culture]
        const religion = window.world.religions[ridx]
        region.religion = religion.idx
      })
    },
    _difficulty: () => {
      const queue = window.dice.sample(window.world.regions, 6)
      queue.forEach(region => {
        region.difficulty = 0
      })
      while (queue.length > 0) {
        const region = queue.shift()
        REGION.neighbors({ region }).forEach(neighbor => {
          if (neighbor.difficulty === undefined) {
            neighbor.difficulty = Math.min(region.difficulty + 1, 8)
            queue.push(neighbor)
          }
        })
      }
      window.world.provinces.forEach(province => {
        const region = PROVINCE.region(province)
        const base = region.desolate ? 8 : region.difficulty
        province.difficulty = base + window.dice.random
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
      LORE._difficulty()
      LORE._religions()
      LORE._history()
      LORE._conflict()
      // LORE._places()
    }
  }
})
