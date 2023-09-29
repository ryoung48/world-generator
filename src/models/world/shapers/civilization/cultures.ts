import { CULTURE } from '../../../npcs/cultures'
import { Culture } from '../../../npcs/cultures/types'
import { REGION } from '../../../regions'
import { Region } from '../../../regions/types'
import { ENTITY } from '../../../utilities/entities'
import { Directions } from '../../../utilities/math/points/types'
import { WeightedDistribution } from '../../../utilities/math/types'
import { PERFORMANCE } from '../../../utilities/performance'

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

const civilized = ['civilized', 'frontier']
const setDevelopment = (region: Region, development: Region['development']) => {
  region.development = development
  region.civilized = civilized.includes(development)
}

const assignCultures = () => {
  ENTITY.partitionBFS({
    items: window.world.regions,
    target: window.world.regions.length * 0.012,
    // regions in the same culture must have the same climate
    neighbors: region => REGION.borders(region).filter(n => n.climate === region.climate),
    relaxed: REGION.borders
  }).forEach(group => {
    const [origin] = group
    const culture = CULTURE.spawn(origin)
    group.forEach(n => CULTURE.expand(culture, n))
  })
}

const civilizationCenter = (side: Directions) => {
  let civil = 0
  const { cultures } = window.world
  const partition = Object.values(cultures)
    .filter(c => c.side === side && CULTURE.coastal(c) && !CULTURE.distant(c) && !CULTURE.tribal(c))
    .sort((a, b) => {
      return CULTURE.score(b) - CULTURE.score(a)
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
      const majorityDistant = CULTURE.distant(c)
      const development = majorityDistant ? 'remote' : 'tribal'
      c.regions.map(r => window.world.regions[r]).forEach(r => setDevelopment(r, development))
    })
  // frontier
  const civilized = window.world.regions.filter(r => r.development === 'civilized')
  civilized.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => !n.civilized && !CULTURE.distant(window.world.cultures[n.culture]))
      .forEach(n => {
        setDevelopment(n, 'frontier')
      })
  })
  const allCultures = Object.values(cultures)
  const civil = allCultures.filter(c => window.world.regions[c.origin].civilized)
  const civilSpecies = speciesDist(civil.length, false)
  civil.forEach(culture => CULTURE.finalize(culture, civilSpecies.pop()))
  const nonCivil = allCultures.filter(c => !window.world.regions[c.origin].civilized)
  const species = speciesDist(nonCivil.length)
  nonCivil.forEach(culture => CULTURE.finalize(culture, species.pop()))
}

export const CULTURAL = PERFORMANCE.profile.wrapper({
  label: 'CULTURAL',
  o: {
    _cultures: assignCultures,
    _development: assignDevelopment,
    spheres: () => {
      CULTURAL._cultures()
      CULTURAL._development()
    }
  }
})
