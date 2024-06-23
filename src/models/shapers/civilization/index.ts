import { range } from 'd3'

import { CLIMATE } from '../../cells/climate'
import { Climate } from '../../cells/climate/types'
import { NAVIGATION } from '../../cells/navigation'
import { CULTURE } from '../../heritage'
import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { ARRAY } from '../../utilities/array'
import { COLOR } from '../../utilities/color'
import { PERFORMANCE } from '../../utilities/performance'
import { PROVINCE_BUILDER as URBANIZATION_BUILDER } from './provinces'
import { DistributeCulturesParams, DistributeReligionsPArams } from './types'

const distributeCultures = ({ groups, dist }: DistributeCulturesParams) => {
  const species = window.dice.distribute({ dist, count: groups.length })
  groups.forEach(regions => CULTURE.spawn({ regions, species: species.pop() }))
  window.world.cultures.forEach(culture => {
    const usedHues = new Set(
      culture.regions
        .map(region =>
          window.world.regions[region].borders
            .map(b => window.world.regions[b].culture)
            .filter(c => window.world.cultures[c]?.display?.color)
            .map(c => window.world.cultures[c].display.hue)
        )
        .flat()
    )
    const hue =
      usedHues.size > 0
        ? COLOR.findMostDistantHue(Array.from(usedHues))
        : window.dice.randint(0, 360)
    culture.display = { color: window.dice.color([hue, hue]), hue }
  })
}

const distributeReligions = ({ groups, dist }: DistributeReligionsPArams) => {
  const type = window.dice.distribute({ dist, count: groups.length })
  groups.forEach(culture => {
    const religion = type.pop()
    culture.regions
      .map(region => window.world.regions[region])
      .forEach(region => {
        region.religion = religion
      })
  })
}

const arctic: Climate['latitude'][] = ['subpolar', 'polar']

const maximumDevelopment = 7

const civilizationCenter = () => {
  let civil = 0
  const { regions } = window.world
  const partition = regions
    .filter(c => REGION.coastal(c) && REGION.climate(c).habitability > 0.5)
    .sort((a, b) => REGION.climate(b).habitability - REGION.climate(a).habitability)
  const count = partition.length
  // civilized
  const civilized = Math.floor(count * 0.5)
  partition.slice(0, civilized).forEach(c => {
    const biome = REGION.climate(c)
    const development =
      civil < 5 && CLIMATE.zone[biome.latitude] === 'temperate' ? maximumDevelopment : 3
    c.development = development
    civil += development === maximumDevelopment ? 1 : 0
  })
  regions
    .filter(c => c.development === undefined)
    .forEach(c => {
      const development = REGION.climate(c).latitude === 'polar' ? 0 : 1
      c.development = development
    })
  range(maximumDevelopment - 1, 0, -1).forEach(development => {
    const group = window.world.regions.filter(r => r.development === development + 1)
    group.forEach(c => {
      c.borders
        .map(n => window.world.regions[n])
        .filter(
          n => n.development < development + 1 && !arctic.includes(REGION.climate(n).latitude)
        )
        .forEach(n => {
          n.development = development
        })
    })
  })
  // nomadic
  const nomadic = window.world.regions.filter(r => r.development === 0)
  nomadic.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development > 1)
      .forEach(n => {
        n.development -= 1
      })
  })
  const semiNomadic = window.world.regions.filter(r => r.development === 1)
  semiNomadic.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development > 2)
      .forEach(n => {
        n.development -= 1
      })
  })
}

export const CIVILIZATION_BUILDER = PERFORMANCE.profile.wrapper({
  label: 'CIVILIZATION',
  o: {
    _development: () => {
      civilizationCenter()
      REGION.nations.forEach(region => {
        region.civilized = region.development > 3
        region.wealth = Math.max(
          0,
          region.development === maximumDevelopment
            ? region.development
            : window.dice.randint(region.development - 1, region.development + 1)
        )
      })
    },
    _cultures: () => {
      const nations = REGION.nations
      const groups = ARRAY.partition.bfs({
        items: nations,
        target: nations.length * 0.008,
        // regions in the same culture must have the same climate
        neighbors: region =>
          REGION.borders(region).filter(n => REGION.zone(n) === REGION.zone(region) && !n.desolate),
        relaxed: region => REGION.borders(region).filter(n => !n.desolate)
      })
      const civilized = groups.filter(([region]) => region.civilized)
      distributeCultures({
        groups: civilized,
        dist: [
          { v: 'human', w: 8 },
          { v: 'dwarf', w: 1 },
          { v: 'orc', w: 1 },
          { v: 'elf', w: 1 }
        ]
      })
      const uncivilized = groups.filter(([region]) => !region.civilized)
      distributeCultures({
        groups: uncivilized,
        dist: [
          { v: 'human', w: 5 },
          { v: 'dwarf', w: 1 },
          { v: 'orc', w: 1 },
          { v: 'elf', w: 1 },
          { v: 'orlan', w: 1 },
          { v: 'bovine', w: 1 },
          { v: 'feline', w: 1 },
          { v: 'avian', w: 1 },
          { v: 'draconic', w: 1 },
          { v: 'gnoll', w: 1 }
        ]
      })
    },
    _imperialRoads: () => {
      const cache: Record<number, Record<number, boolean>> = {}
      const { blacklist } = NAVIGATION.blacklist
      REGION.nations.forEach(region => {
        const src = window.world.provinces[region.capital]
        const targets = region.landBorders
          .map(i => {
            const border = window.world.regions[i]
            return window.world.provinces[border.capital]
          })
          .filter(target => !cache[src.idx]?.[target.idx] && !PROVINCE.region(target).desolate)
        targets.forEach(dst => {
          if (!cache[src.idx]) cache[src.idx] = {}
          cache[src.idx][dst.idx] = true
          if (!cache[dst.idx]) cache[dst.idx] = {}
          cache[dst.idx][src.idx] = true
          NAVIGATION.addRoute({ src, dst, blacklist, type: 'land', imperial: true })
        })
      })
    },
    _religions: () => {
      const civilized = window.world.cultures.filter(h => CULTURE.civilized(h))
      distributeReligions({
        groups: civilized,
        dist: [
          { v: 'atheistic', w: 0.15 },
          { v: 'nontheistic', w: 1 },
          { v: 'monotheistic', w: 1 },
          { v: 'polytheistic', w: 0.5 }
        ]
      })
      const uncivilized = window.world.cultures.filter(h => !CULTURE.civilized(h))
      distributeReligions({
        groups: uncivilized,
        dist: [
          { v: 'monotheistic', w: 1 },
          { v: 'dualistic', w: 0.25 },
          { v: 'polytheistic', w: 1 },
          { v: 'animistic', w: 2 },
          { v: 'ancestor worship', w: 1 }
        ]
      })
    },
    build: () => {
      CIVILIZATION_BUILDER._development()
      URBANIZATION_BUILDER.build()
      CIVILIZATION_BUILDER._cultures()
      CIVILIZATION_BUILDER._religions()
      CIVILIZATION_BUILDER._imperialRoads()
    }
  }
})
