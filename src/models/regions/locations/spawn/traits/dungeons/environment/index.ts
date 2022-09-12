import { attributes } from '../../../../../../npcs/actors/stats/attributes/types'
import { decorateText } from '../../../../../../utilities/text/decoration'
import { climateLookup } from '../../../../../../world/climate/types'
import { Loc } from '../../../../types'
import { locationPlaceholder } from '../../../placeholders'
import { LocationTrait } from '../../types'
import { dungeon__requiresInhabitants } from '../inhabitants'
import { dungeon__environment } from './types'

const terrain = new Set<LocationTrait['tag']>([
  'flooding',
  'contagion',
  'wild magic',
  'infestation',
  'noxious fumes',
  'lingering curse'
])

const terrainSpawn = (weight: number) => (params: { entity: Loc }) => {
  const currTerrain = params.entity.traits.reduce((sum, { tag }) => {
    return sum + (terrain.has(tag) ? 1 : 0)
  }, 0)
  return currTerrain > 1 ? 0 : currTerrain > 0 ? weight * 0.5 : weight
}

const infrastructureRequired = (weight: number) => (params: { entity: Loc }) => {
  const noInfra: Loc['type'][] = ['camp', 'shrine', 'battlefield']
  return noInfra.includes(params.entity.type) ? 0 : weight
}

export const dungeon__environmentTraits: Record<dungeon__environment, LocationTrait> = {
  'abundant traps': {
    tag: 'abundant traps',
    text: () => {
      return `The ${locationPlaceholder} is crusted over with dangerous snares and security measures, the relics of an anticipated ${window.dice.choice(
        ['internal struggle', 'invasion']
      )} that may never have come. Most of the traps are likely still functional, and the entire place might be a snare.`
    },
    spawn: () => 1
  },
  'ancient monument': {
    tag: 'ancient monument',
    text: () => {
      return `the remnants of an ancient structure ${window.dice.choice([
        'artistic',
        'cultural',
        'arcane'
      ])} is present at this ${locationPlaceholder}.`
    },
    spawn: () => 1
  },
  chokepoint: {
    tag: 'chokepoint',
    text: () => {
      return `There's a natural choke point that excludes access to this ${locationPlaceholder}. The ${locationPlaceholder} inhabitants will likely use this chokepoint to bolster their defenses.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1 })
  },
  contagion: {
    tag: 'contagion',
    text: () =>
      `This ${locationPlaceholder} is contaminated with a contagious disease that will significantly hinder any intruders.`,
    spawn: terrainSpawn(1)
  },
  'dampened arcana': {
    tag: 'dampened arcana',
    conflicts: ['wild magic'],
    text: () => {
      return `All magic is dampened at this ${locationPlaceholder}, with some areas nullifying all arcane effects.`
    },
    spawn: terrainSpawn(0.5)
  },
  'decrepit structure': {
    tag: 'decrepit structure',
    text: () => {
      return `This ${locationPlaceholder} is falling apart, and anyone venturing into it risks bringing it down on top of their heads if they create too much of a commotion. Floors, ceilings, and walls can go at any time.`
    },
    spawn: infrastructureRequired(1)
  },
  'dungeon heart': {
    tag: 'dungeon heart',
    text: () => {
      return `The ${locationPlaceholder}'s physical integrity is bound with a particular resident creature or object, and if it is destroyed or removed the place will collapse.`
    },
    spawn: infrastructureRequired(0.5)
  },
  flooding: {
    tag: 'flooding',
    text: () => {
      return `The ${locationPlaceholder} is partially flooded, making navigation treacherous.`
    },
    spawn: terrainSpawn(1)
  },
  'honey traps': {
    tag: 'honey traps',
    text: () => {
      return `There are locations within this ${locationPlaceholder} that look very appealing to intruders. In actuality, it's a trap to catch and murder intruders when their guard is down.`
    },
    spawn: () => 1
  },
  infestation: {
    tag: 'infestation',
    text: () => {
      return `The ${locationPlaceholder} is infested by vast hordes of small vermin, providing a constant nuisance to any intruders.`
    },
    spawn: terrainSpawn(1)
  },
  isolation: {
    tag: 'isolation',
    text: () => {
      return `The area around this ${locationPlaceholder} is remarkably tangled and treacherous, such that it's almost impossible to cross it without a guide or very good map.`
    },
    spawn: () => 1
  },
  labyrinthine: {
    tag: 'labyrinthine',
    text: () => {
      return `The interior of the ${locationPlaceholder} is extremely difficult to navigate due to ${window.dice.choice(
        ['maze-like layouts', 'persistent heavy fog', 'shifting layouts', 'intricate illusions']
      )}.`
    },
    spawn: infrastructureRequired(1)
  },
  'limited access': {
    tag: 'limited access',
    text: () => {
      return `The ${locationPlaceholder} is magically sealed and can only be accessed ${window.dice.choice(
        ['at certain times', 'with certain special keys']
      )}.`
    },
    spawn: infrastructureRequired(0.5)
  },
  'lingering curse': {
    tag: 'lingering curse',
    text: () => {
      return `This ${locationPlaceholder} is afflicted by a ${decorateText({
        label: 'malign enchantment',
        tooltip: window.dice.choice([...attributes])
      })} that will weaken any intruders.`
    },
    spawn: terrainSpawn(0.5)
  },
  'noxious fumes': {
    tag: 'noxious fumes',
    text: () => {
      return `The ${locationPlaceholder} is filled with noxious fumes that slowly burn any intruders.`
    },
    spawn: terrainSpawn(1)
  },
  'taboo territory': {
    tag: 'taboo territory',
    text: () => {
      return `The ${locationPlaceholder} is forbidden by ${window.dice.choice([
        'ancient law',
        'local custom',
        'the conviction of a powerful local faith'
      ])} and has wardens on guard against intruders.`
    },
    spawn: () => 1
  },
  'temporal distortion': {
    tag: 'temporal distortion',
    text: () => {
      return `Time passes ${window.dice.choice([
        'quickly',
        'slowly'
      ])} at this ${locationPlaceholder}.`
    },
    spawn: terrainSpawn(0.5)
  },
  'unusual biome': {
    tag: 'unusual biome',
    conflicts: ['dampened arcana'],
    text: ({ entity: loc }) => {
      const { climate } = window.world.regions[loc.region]
      const { zone } = climateLookup[climate]
      return `An old, mutated enchantment has created strange weather patterns in this area (${window.dice.weightedChoice(
        [
          { v: 'everlasting storms', w: 1 },
          { v: 'thick fog', w: 1 },
          { v: 'crystalline formations', w: 1 },
          { v: 'alien ecology', w: 1 },
          { v: 'prehistoric ecology', w: 1 },
          { v: 'desolate wasteland', w: 1 },
          {
            v: `perpetual ${window.dice.choice(['summer', 'fall', 'winter', 'spring'])}`,
            w: zone === 'Temperate' ? 1 : 0
          },
          {
            v: `${zone === 'Arctic' ? 'arctic' : 'tropical'} conditions`,
            w: zone !== 'Tropical' ? 1 : 0
          }
        ]
      )}).`
    },
    spawn: terrainSpawn(0.5)
  },
  'wild magic': {
    tag: 'wild magic',
    conflicts: ['dampened arcana'],
    text: () => {
      return `Magic is chaotic at this ${locationPlaceholder}. All spells have small chance to have unintended side effects.`
    },
    spawn: terrainSpawn(0.5)
  }
}
