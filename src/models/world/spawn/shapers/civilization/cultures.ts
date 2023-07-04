import {
  culture__coastal,
  culture__finalize,
  culture__regions,
  culture__spawn,
  culture__subCulture
} from '../../../../npcs/cultures'
import { Culture } from '../../../../npcs/cultures/types'
import { region__borders } from '../../../../regions'
import { Region } from '../../../../regions/types'
import { entity__partitionBFS } from '../../../../utilities/entities'
import { WeightedDistribution } from '../../../../utilities/math'
import { Directions } from '../../../../utilities/math/points'
import { Climate, climates } from '../../../climate/types'

const speciesDist = (count: number, tribal = true): Culture['species'][] => {
  const dist: WeightedDistribution<Culture['species']> = tribal
    ? [
        { v: 'human', w: 3 },
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
    : [
        { v: 'human', w: 8 },
        { v: 'dwarf', w: 1 },
        { v: 'orc', w: 1 },
        { v: 'elf', w: 1 }
      ]
  const total = dist.reduce((sum, { w }) => sum + w, 0)
  return window.dice.shuffle(
    dist
      .filter(({ w }) => w > 0)
      .map(({ v, w }) => Array<Culture['species']>(Math.ceil((w / total) * count)).fill(v))
      .flat()
  )
}

const culture__cultureScore = (culture: Culture) =>
  culture__regions(culture)
    .map(r => climates[r.climate].population * (r.coastal ? 1.5 : 1))
    .reduce((sum, pop) => sum + pop, 0) / culture.regions.length

const distantClimates: Climate['name'][] = ['polar', 'tropical rainforest']

const tribalLands: Climate['name'][] = ['hot steppe', 'cold desert', 'cold steppe', 'savanna']

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
const setDevelopment = (region: Region, development: Region['development']) => {
  region.development = development
  region.civilized = civilized.includes(development)
}

const assignCultures = () => {
  entity__partitionBFS({
    items: window.world.regions,
    target: window.world.regions.length * 0.012,
    // regions in the same culture must have the same climate
    neighbors: region => region__borders(region).filter(n => n.climate === region.climate),
    relaxed: region__borders
  }).forEach(group => {
    const [origin] = group
    const culture = culture__spawn(origin)
    group.forEach(n => culture__subCulture(culture, n))
  })
}

const civilizationCenter = (side: Directions) => {
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
    const development = civil < 3 && c.zone === 'temperate' ? 'civilized' : 'frontier'
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
  const civilSpecies = speciesDist(civil.length, false)
  civil.forEach(culture => culture__finalize(culture, civilSpecies.pop()))
  const nonCivil = allCultures.filter(c => !window.world.regions[c.origin].civilized)
  const species = speciesDist(nonCivil.length)
  nonCivil.forEach(culture => culture__finalize(culture, species.pop()))
}

export const culturalSpheres = () => {
  assignCultures()
  assignDevelopment()
}
