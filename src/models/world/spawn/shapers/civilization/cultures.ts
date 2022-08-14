import {
  culture__coastal,
  culture__flavorize,
  culture__regions,
  culture__spawn,
  culture__sub_culture
} from '../../../../npcs/species/humanoids/cultures'
import { Culture } from '../../../../npcs/species/humanoids/cultures/types'
import { humanoid__species_dist } from '../../../../npcs/species/humanoids/taxonomy'
import { region__borders } from '../../../../regions'
import { development_rank } from '../../../../regions/development'
import { Region } from '../../../../regions/types'
import { tagged__bfs_partition } from '../../../../utilities/codex/grouping'
import { directions } from '../../../../utilities/math/points'
import { climate_lookup, climates } from '../../../climate/types'

const culture__culture_score = (culture: Culture) =>
  culture__regions(culture)
    .map(r => climate_lookup[r.climate].population * (r.coastal ? 1.5 : 1))
    .reduce((sum, pop) => sum + pop, 0) / culture.regions.length

const distant_climates = [climates.POLAR, climates.EQUATORIAL]

const tribal_lands = [
  climates.HOT_STEPPE,
  climates.COLD_DESERT,
  climates.COLD_STEPPE,
  climates.SAVANNA
]

const is_distant = (culture: Culture) => {
  const regions = culture__regions(culture)
  const distant = regions.reduce((sum, r) => {
    const is_remote = distant_climates.includes(r.climate)
    return sum + (is_remote ? 1 : 0)
  }, 0)
  return distant / regions.length > 0.5
}

const is_tribal = (culture: Culture) => {
  const regions = culture__regions(culture)
  const grass = regions.reduce((sum, r) => {
    const has_biome = tribal_lands.includes(r.climate)
    return sum + (has_biome ? 1 : 0)
  }, 0)
  return grass / regions.length > 0.5
}
const civilized = ['civilized', 'frontier']
const set_development = (region: Region, development: development_rank) => {
  region.development = development
  region.civilized = civilized.includes(development)
}

const assign_cultures = () => {
  tagged__bfs_partition({
    items: window.world.regions,
    target: 4,
    // regions in the same culture must have the same climate
    neighbors: region => region__borders(region).filter(n => n.climate === region.climate),
    relaxed: region__borders
  }).forEach(group => {
    const [origin] = group
    const culture = culture__spawn(origin)
    group.forEach(n => culture__sub_culture(culture, n))
  })
}

const civilization_center = (side: directions) => {
  let civil = 0
  const { cultures } = window.world
  const partition = Object.values(cultures)
    .filter(c => c.side === side && culture__coastal(c) && !is_distant(c) && !is_tribal(c))
    .sort((a, b) => {
      return culture__culture_score(b) - culture__culture_score(a)
    })
  const count = partition.length
  // civilized
  const civilized = Math.floor(count * 0.5)
  partition.slice(0, civilized).forEach(c => {
    const development = civil < 3 && c.zone === 'Temperate' ? 'civilized' : 'frontier'
    c.regions.map(r => window.world.regions[r]).forEach(r => set_development(r, development))
    civil += development === 'civilized' ? 1 : 0
  })
}

const assign_development = () => {
  civilization_center('E')
  civilization_center('W')
  const { cultures } = window.world
  // tribal
  Object.values(cultures)
    .filter(c => window.world.regions[c.origin].development === undefined)
    .forEach(c => {
      const majority_distant = is_distant(c)
      const development = majority_distant ? 'remote' : 'tribal'
      c.regions.map(r => window.world.regions[r]).forEach(r => set_development(r, development))
    })
  // frontier
  const civilized = window.world.regions.filter(r => r.development === 'civilized')
  civilized.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => !n.civilized && !is_distant(window.world.cultures[n.culture.ruling]))
      .forEach(n => {
        set_development(n, 'frontier')
      })
  })
  const all_cultures = Object.values(cultures)
  const civil = all_cultures.filter(c => window.world.regions[c.origin].civilized)
  const civil_species = humanoid__species_dist(civil.length, false)
  civil.forEach(culture => culture__flavorize(culture, civil_species.pop()))
  const non_civil = all_cultures.filter(c => !window.world.regions[c.origin].civilized)
  const species = humanoid__species_dist(non_civil.length)
  non_civil.forEach(culture => culture__flavorize(culture, species.pop()))
}

export const cultural_spheres = () => {
  assign_cultures()
  assign_development()
}
