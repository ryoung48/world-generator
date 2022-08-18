import {
  culture__coastal,
  culture__flavorize,
  culture__regions,
  culture__spawn,
  culture__subCulture
} from '../../../../npcs/species/cultures'
import { Culture } from '../../../../npcs/species/cultures/types'
import { humanoid__speciesDist } from '../../../../npcs/species/taxonomy'
import { region__borders } from '../../../../regions'
import { DevelopmentRank } from '../../../../regions/development'
import { Region } from '../../../../regions/types'
import { entity__partitionBFS } from '../../../../utilities/codex/entities'
import { directions } from '../../../../utilities/math/points'
import { climateLookup, climates } from '../../../climate/types'

const culture__cultureScore = (culture: Culture) =>
  culture__regions(culture)
    .map(r => climateLookup[r.climate].population * (r.coastal ? 1.5 : 1))
    .reduce((sum, pop) => sum + pop, 0) / culture.regions.length

const distantClimates = [climates.POLAR, climates.EQUATORIAL]

const tribalLands = [
  climates.HOT_STEPPE,
  climates.COLD_DESERT,
  climates.COLD_STEPPE,
  climates.SAVANNA
]

const isDistant = (culture: Culture) => {
  const regions = culture__regions(culture)
  const distant = regions.reduce((sum, r) => {
    const isRemote = distantClimates.includes(r.climate)
    return sum + (isRemote ? 1 : 0)
  }, 0)
  return distant / regions.length > 0.5
}

const isTribal = (culture: Culture) => {
  const regions = culture__regions(culture)
  const grass = regions.reduce((sum, r) => {
    const hasBiome = tribalLands.includes(r.climate)
    return sum + (hasBiome ? 1 : 0)
  }, 0)
  return grass / regions.length > 0.5
}
const civilized = ['civilized', 'frontier']
const setDevelopment = (region: Region, development: DevelopmentRank) => {
  region.development = development
  region.civilized = civilized.includes(development)
}

const assignCultures = () => {
  entity__partitionBFS({
    items: window.world.regions,
    target: 4,
    // regions in the same culture must have the same climate
    neighbors: region => region__borders(region).filter(n => n.climate === region.climate),
    relaxed: region__borders
  }).forEach(group => {
    const [origin] = group
    const culture = culture__spawn(origin)
    group.forEach(n => culture__subCulture(culture, n))
  })
}

const civilizationCenter = (side: directions) => {
  let civil = 0
  const { cultures } = window.world
  const partition = Object.values(cultures)
    .filter(c => c.side === side && culture__coastal(c) && !isDistant(c) && !isTribal(c))
    .sort((a, b) => {
      return culture__cultureScore(b) - culture__cultureScore(a)
    })
  const count = partition.length
  // civilized
  const civilized = Math.floor(count * 0.5)
  partition.slice(0, civilized).forEach(c => {
    const development = civil < 3 && c.zone === 'Temperate' ? 'civilized' : 'frontier'
    c.regions.map(r => window.world.regions[r]).forEach(r => setDevelopment(r, development))
    civil += development === 'civilized' ? 1 : 0
  })
}

const assignDevelopment = () => {
  civilizationCenter('E')
  civilizationCenter('W')
  const { cultures } = window.world
  // tribal
  Object.values(cultures)
    .filter(c => window.world.regions[c.origin].development === undefined)
    .forEach(c => {
      const majorityDistant = isDistant(c)
      const development = majorityDistant ? 'remote' : 'tribal'
      c.regions.map(r => window.world.regions[r]).forEach(r => setDevelopment(r, development))
    })
  // frontier
  const civilized = window.world.regions.filter(r => r.development === 'civilized')
  civilized.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => !n.civilized && !isDistant(window.world.cultures[n.culture.ruling]))
      .forEach(n => {
        setDevelopment(n, 'frontier')
      })
  })
  const allCultures = Object.values(cultures)
  const civil = allCultures.filter(c => window.world.regions[c.origin].civilized)
  const civilSpecies = humanoid__speciesDist(civil.length, false)
  civil.forEach(culture => culture__flavorize(culture, civilSpecies.pop()))
  const nonCivil = allCultures.filter(c => !window.world.regions[c.origin].civilized)
  const species = humanoid__speciesDist(nonCivil.length)
  nonCivil.forEach(culture => culture__flavorize(culture, species.pop()))
}

export const culturalSpheres = () => {
  assignCultures()
  assignDevelopment()
}
