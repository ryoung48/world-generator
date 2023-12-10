import { CULTURE } from '../../../npcs/cultures'
import { Culture } from '../../../npcs/cultures/types'
import { REGION } from '../../../regions'
import { Region } from '../../../regions/types'
import { ENTITY } from '../../../utilities/entities'
import { WeightedDistribution } from '../../../utilities/math/types'
import { PERFORMANCE } from '../../../utilities/performance'
import { BIOME } from '../../climate'
import { BiomeDetails } from '../../climate/types'

const speciesDist = (count: number, tribal = true): Culture['species'][] => {
  const dist: WeightedDistribution<Culture['species']> = tribal
    ? [
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

const setDevelopment = (region: Region, development: Region['development']) => {
  region.development = development
  region.civilized = development > 1
}

const assignCultures = () => {
  const nations = REGION.nations
  ENTITY.partitionBFS({
    items: nations,
    target: nations.length * 0.012,
    // regions in the same culture must have the same climate
    neighbors: region =>
      REGION.borders(region).filter(
        n => REGION.climate(n) === REGION.climate(region) && !n.desolate
      ),
    relaxed: region => REGION.borders(region).filter(n => !n.desolate)
  }).forEach(group => {
    const [origin] = group
    const culture = CULTURE.spawn(origin)
    group.forEach(n => CULTURE.expand(culture, n))
  })
}

const civilizationCenter = () => {
  let civil = 0
  const { cultures } = window.world
  const partition = Object.values(cultures)
    .filter(c => CULTURE.coastal(c) && !CULTURE.tribal(c))
    .sort((a, b) => {
      return CULTURE.score(b) - CULTURE.score(a)
    })
  const count = partition.length
  // civilized
  const civilized = Math.floor(count * 0.5)
  partition.slice(0, civilized).forEach(c => {
    const biome = CULTURE.biome(c)
    const development = civil < 3 && BIOME.zone[biome.latitude] === 'temperate' ? 6 : 2
    c.regions.map(r => window.world.regions[r]).forEach(r => setDevelopment(r, development))
    civil += development === 6 ? 1 : 0
  })
}

const assignDevelopment = () => {
  civilizationCenter()
  const { cultures } = window.world
  const arctic: BiomeDetails['latitude'][] = ['subpolar', 'polar']
  // tribal & nomadic
  Object.values(cultures)
    .filter(c => window.world.regions[c.origin].development === undefined)
    .forEach(c => {
      const majorityDistant = CULTURE.tribal(c)
      const development = majorityDistant ? 0 : 1
      c.regions.map(r => window.world.regions[r]).forEach(r => setDevelopment(r, development))
    })
  // industrial
  const industrial = window.world.regions.filter(r => r.development === 6)
  industrial.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development < 6 && !arctic.includes(REGION.biome(n).latitude))
      .forEach(n => {
        setDevelopment(n, 5)
      })
  })
  // colonial
  const enlightened = window.world.regions.filter(r => r.development === 5)
  enlightened.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development < 5 && !arctic.includes(REGION.biome(n).latitude))
      .forEach(n => {
        setDevelopment(n, 4)
      })
  })
  // mercantile
  const colonial = window.world.regions.filter(r => r.development === 4)
  colonial.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development < 4 && !arctic.includes(REGION.biome(n).latitude))
      .forEach(n => {
        setDevelopment(n, 3)
      })
  })
  // feudal
  const mercantile = window.world.regions.filter(r => r.development === 3)
  mercantile.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development < 3 && !arctic.includes(REGION.biome(n).latitude))
      .forEach(n => {
        setDevelopment(n, 2)
      })
  })
  // tribal
  const feudal = window.world.regions.filter(r => r.development === 2)
  feudal.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development < 2 && !arctic.includes(REGION.biome(n).latitude))
      .forEach(n => {
        setDevelopment(n, 1)
      })
  })
  // nomadic
  const nomadic = window.world.regions.filter(r => r.development === 0)
  nomadic.forEach(c => {
    c.borders
      .map(n => window.world.regions[n])
      .filter(n => n.development > 1)
      .forEach(n => {
        setDevelopment(n, n.development - 1)
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
