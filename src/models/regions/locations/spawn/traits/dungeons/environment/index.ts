import { attributes } from '../../../../../../npcs/actors/stats/attributes/types'
import { Loc } from '../../../../types'
import { LocationTrait } from '../../types'
import { dungeon__requires_inhabitants } from '../inhabitants'
import { dungeon__environment } from './types'

const terrain = new Set<LocationTrait['tag']>([
  'flooding',
  'contagion',
  'wild magic',
  'infestation',
  'noxious fumes',
  'lingering curse'
])

const terrain_spawn = (weight: number) => (params: { entity: Loc }) => {
  const curr_terrain = params.entity.traits.reduce((sum, { tag }) => {
    return sum + (terrain.has(tag) ? 1 : 0)
  }, 0)
  return curr_terrain > 1 ? 0 : curr_terrain > 0 ? weight * 0.5 : weight
}

const infrastructure_required = (weight: number) => (params: { entity: Loc }) => {
  const no_infra: Loc['type'][] = ['camp', 'shrine', 'battlefield']
  return no_infra.includes(params.entity.type) ? 0 : weight
}

export const dungeon__environment_traits: Record<dungeon__environment, LocationTrait> = {
  'abundant traps': {
    tag: 'abundant traps',
    text: () => {
      return `The site is crusted over with dangerous snares and security measures, the relics of an anticipated ${window.dice.choice(
        ['internal struggle', 'invasion']
      )} that may never have come. Most of the traps are likely still functional, and the entire place might be a snare.`
    },
    spawn: () => 1
  },
  chokepoint: {
    tag: 'chokepoint',
    text: () => {
      return `There's a natural choke point that excludes access to this site. The site inhabitants will likely use this chokepoint to bolster their defenses.`
    },
    spawn: dungeon__requires_inhabitants({ weight: 1 })
  },
  contagion: {
    tag: 'contagion',
    text: () =>
      `This site is contaminated with a contagious disease that will significantly hinder any intruders.`,
    spawn: terrain_spawn(1)
  },
  'dampened arcana': {
    tag: 'dampened arcana',
    conflicts: ['wild magic'],
    text: () => {
      return `All magic is dampened at this site, with some areas nullifying all arcane effects.`
    },
    spawn: terrain_spawn(0.5)
  },
  'decrepit structure': {
    tag: 'decrepit structure',
    text: () => {
      return `This site is falling apart, and anyone venturing into it risks bringing it down on top of their heads if they create too much of a commotion. Floors, ceilings, and walls can go at any time.`
    },
    spawn: infrastructure_required(1)
  },
  'dungeon heart': {
    tag: 'dungeon heart',
    text: () => {
      return `The site's physical integrity is bound with a particular resident creature or object, and if it is destroyed or removed the place will collapse.`
    },
    spawn: infrastructure_required(0.5)
  },
  flooding: {
    tag: 'flooding',
    text: () => {
      return `The site is partially flooded, making navigation treacherous.`
    },
    spawn: terrain_spawn(1)
  },
  'honey traps': {
    tag: 'honey traps',
    text: () => {
      return `The location looks like something very appealing to intruders. In actuality, it's a trap to catch and murder intruders when their guard is down.`
    },
    spawn: () => 1
  },
  infestation: {
    tag: 'infestation',
    text: () => {
      return `The site is infested by vast hordes of small vermin, providing a constant nuisance to any intruders.`
    },
    spawn: terrain_spawn(1)
  },
  isolation: {
    tag: 'isolation',
    text: () => {
      return `The area around this site is remarkably tangled and treacherous, such that it's almost impossible to cross it without a guide or very good map.`
    },
    spawn: () => 1
  },
  labyrinthine: {
    tag: 'labyrinthine',
    text: () => {
      return `The interior of the site is extremely difficult to navigate due to ${window.dice.choice(
        ['maze-like layouts', 'persistent heavy fog', 'shifting layouts', 'intricate illusions']
      )}.`
    },
    spawn: infrastructure_required(1)
  },
  'limited access': {
    tag: 'limited access',
    text: () => {
      return `The site is magically sealed and can only be accessed ${window.dice.choice([
        'at certain times',
        'with certain special keys'
      ])}.`
    },
    spawn: infrastructure_required(0.5)
  },
  'lingering curse': {
    tag: 'lingering curse',
    text: () => {
      return `This site is afflicted by a malign enchantment (${window.dice.choice([
        ...attributes
      ])}) that will weaken any intruders.`
    },
    spawn: terrain_spawn(0.5)
  },
  'noxious fumes': {
    tag: 'noxious fumes',
    text: () => {
      return `The site is filled with noxious fumes that slowly burn any intruders.`
    },
    spawn: terrain_spawn(1)
  },
  'taboo territory': {
    tag: 'taboo territory',
    text: () => {
      return `The site is forbidden by ${window.dice.choice([
        'ancient law',
        'local custom',
        'the conviction of a powerful local faith'
      ])}. Wardens have been appointed to guard the site against intruders.`
    },
    spawn: () => 1
  },
  'temporal distortion': {
    tag: 'temporal distortion',
    text: () => {
      return `Time passes ${window.dice.choice(['quickly', 'slowly'])} at this site.`
    },
    spawn: terrain_spawn(0.5)
  },
  'wild magic': {
    tag: 'wild magic',
    conflicts: ['dampened arcana'],
    text: () => {
      return `Magic is chaotic at this site. All spells have small chance to have unintended side effects.`
    },
    spawn: terrain_spawn(0.5)
  }
}
