import { recentBattleWindow } from '../../../../../../history/events/war/battles'
import { decorateText } from '../../../../../../utilities/text/decoration'
import { location__raiders } from '../../../..'
import { Loc } from '../../../../types'
import { locationPlaceholder } from '../../../placeholders'
import { LocationTrait } from '../../types'
import { dungeon__inhabitant, dungeon__inhabitants } from './types'

const inhabitants = new Set<string>(dungeon__inhabitants)
const inhabitantSpawn = (weight: number) => (params: { entity: Loc }) => {
  const currInhabitants = params.entity.traits.reduce((sum, { tag }) => {
    return sum + (inhabitants.has(tag) ? 1 : 0)
  }, 0)
  return currInhabitants > 1 ? 0 : currInhabitants > 0 ? weight * 0.5 : weight
}

const lesserIntelligence: LocationTrait['tag'][] = ['beasts', 'primordials']
export const dungeon__requiresInhabitants =
  (params: { weight: number; intelligent?: boolean }) => (args: { entity: Loc }) => {
    const { weight, intelligent } = params
    const hasInhabitants = args.entity.traits.some(({ tag }) => {
      const requiredIntellect = !intelligent || !lesserIntelligence.includes(tag)
      return requiredIntellect && inhabitants.has(tag)
    })
    return hasInhabitants ? weight : 0
  }

export const dungeon__inhabitantTraits: Record<dungeon__inhabitant, LocationTrait> = {
  'exiled noble': {
    tag: 'exiled noble',
    text: () => {
      return window.dice.choice([
        `This ${locationPlaceholder} is home to an exiled noble house and their company of veteran mercenaries. They plot and scheme their eventual return to glory.`,
        `An exiled noble is searching at this ${locationPlaceholder} for something that might restore them to power. Elite mercenaries accompany the noble on this expedition.`
      ])
    },
    spawn: inhabitantSpawn(0.5)
  },
  aberrations: {
    tag: 'aberrations',
    text: () => {
      const swarm = window.dice.flip
      const experiment = window.dice.flip
      return `The result of ${experiment ? 'a' : 'an'} ${
        experiment ? 'failed experiment' : 'arcane anomaly'
      } has created ${decorateText({
        label: swarm ? 'a group of aberrations' : 'one monstrous aberration',
        tooltip: window.dice.choice(['beast', 'humanoid', 'primordial'])
      })} that now reside in this ${locationPlaceholder}. The transformation has made ${
        swarm ? 'these creatures' : 'this creature'
      } extremely aggressive and a constant danger to nearby communities.`
    },
    spawn: inhabitantSpawn(1)
  },
  automatons: {
    tag: 'automatons',
    text: () => {
      return `This ${locationPlaceholder} is fiercely guarded by enchanted constructs.`
    },
    spawn: ({ entity: loc }) =>
      loc.type === 'ruins' || loc.type === 'laboratory' ? inhabitantSpawn(1)({ entity: loc }) : 0
  },
  bandits: {
    tag: 'bandits',
    text: () => {
      return window.dice.choice([
        `This ${locationPlaceholder} is home to a group of bandits from which they raid nearby communities.`,
        `Bandits are present at this ${locationPlaceholder} searching for valuables.`
      ])
    },
    spawn: inhabitantSpawn(1)
  },
  beasts: {
    tag: 'beasts',
    conflicts: ['primordials'],
    text: () => {
      const swarm = window.dice.flip
      return `A ${swarm ? 'swarm of ' : 'monstrous'} beast${swarm ? 's' : ''} reside${
        swarm ? '' : 's'
      } at this ${locationPlaceholder}. Natives warn that this species is extremely ${window.dice.choice(
        ['aggressive', 'territorial']
      )} and should be avoided if possible.`
    },
    spawn: inhabitantSpawn(1)
  },
  cultists: {
    tag: 'cultists',
    conflicts: ['zealous', 'occultists'],
    text: () => {
      return window.dice.choice([
        `Dark cultists worship a profane god at this ${locationPlaceholder}.`,
        `A dark cult is searching for something at this ${locationPlaceholder}.`
      ])
    },
    spawn: inhabitantSpawn(1)
  },
  deserters: {
    tag: 'deserters',
    text: () => {
      return `Deserters from a recent conflict are camped at this ${locationPlaceholder}, causing problems for nearby communities.`
    },
    spawn: ({ entity: loc }) => {
      const { lastInvasion } = window.world.provinces[loc.province].memory
      return lastInvasion.time > window.world.date - recentBattleWindow
        ? 5 * inhabitantSpawn(1)({ entity: loc })
        : 0
    }
  },
  haunted: {
    tag: 'haunted',
    text: () => {
      return `Some great atrocity occurred at this ${locationPlaceholder}. The wraiths of those involved on both sides are trapped restlessly searching for resolution and often react violently towards any intruder.`
    },
    spawn: inhabitantSpawn(1)
  },
  hivemind: {
    tag: 'hivemind',
    text: () => {
      return `A multi-bodied intellect exists at this ${locationPlaceholder} (${window.dice.choice([
        'construct',
        'primordial',
        'aberration'
      ])}). Conflict with these creatures is apt to be very dangerous, as they're capable of coordination at a level impossible to others, yet their single mind makes them more vulnerable to a single point of failure.`
    },
    spawn: inhabitantSpawn(0.5)
  },
  occultists: {
    tag: 'occultists',
    conflicts: ['zealous', 'cultists'],
    text: () => {
      return `A cabal of ${window.dice.choice([
        'witches',
        'necromancers',
        'warlocks'
      ])} perform dark ${window.dice.choice([
        'rituals',
        'experiments'
      ])} at this ${locationPlaceholder}.`
    },
    spawn: inhabitantSpawn(1)
  },
  primordials: {
    tag: 'primordials',
    conflicts: ['beasts'],
    text: () => {
      const swarm = window.dice.flip
      const primordial = window.dice.flip
        ? swarm
          ? 'fungi'
          : 'fungus'
        : swarm
        ? 'plants'
        : 'plant'
      return `A ${swarm ? 'cluster of ' : 'monstrous'} carnivorous ${primordial} reside${
        swarm ? '' : 's'
      } at this ${locationPlaceholder}. Natives warn that this species is extremely ${window.dice.choice(
        ['aggressive', 'territorial']
      )} and should be avoided if possible.`
    },
    spawn: inhabitantSpawn(1)
  },
  raiders: {
    tag: 'raiders',
    text: () => {
      return window.dice.choice([
        `Foreign raiders use this ${locationPlaceholder} as a base of operations, from which they plunder nearby communities.`,
        `Foreign raiders are present at this ${locationPlaceholder} searching for valuables.`
      ])
    },
    spawn: ({ entity: loc }) => {
      const raidersPresent = location__raiders(loc).length > 0 ? 3 : 0
      return inhabitantSpawn(1)({ entity: loc }) * raidersPresent
    }
  },
  sentient: {
    tag: 'sentient',
    text: () => {
      return `This entire ${locationPlaceholder} is ${window.dice.choice([
        'infused with the spirit of some arcane mind',
        'a vast microcosm (primordial)'
      ])}. Physical damage to the ${locationPlaceholder} usually brings some hostile response, however muted by age and disrepair, and the structure itself may be conscious enough to strike bargains with inhabitants.`
    },
    spawn: inhabitantSpawn(0.5)
  },
  spirits: {
    tag: 'spirits',
    text: ({ entity: loc }) => {
      const type =
        loc.subtype.match(/portal \((?<type>.*)\)/)?.groups?.type ??
        window.dice.choice(['elementals', 'fiends', 'celestials', 'fey'])
      return `A host of outsider spirits (${type}) linger at this ${locationPlaceholder} due to ${window.dice.choice(
        ['a natural crossing between realms', 'an arcane summoning ritual']
      )}.`
    },
    spawn: inhabitantSpawn(1)
  },
  titan: {
    tag: 'titan',
    text: () => {
      return `A ${decorateText({
        label: 'monstrous entity',
        tooltip: window.dice.choice(['beast', 'aberration', 'primordial', 'spirit'])
      })} patrols around this ${locationPlaceholder} capable of shattering even the most seasoned adventurers. It should be avoided at all costs.`
    },
    spawn: () => 0.5
  },
  undeath: {
    tag: 'undeath',
    text: () => {
      return `A horde of undead reside at this ${locationPlaceholder} ${window.dice.choice([
        'standing as eternal guardians to the valuables contained within',
        'wandering aimlessly long after their dark masters have perished'
      ])}.`
    },
    spawn: inhabitantSpawn(1)
  },
  vampiric: {
    tag: 'vampiric',
    text: () => {
      return window.dice.choice([
        `Vampires reside at this ${locationPlaceholder}, from which they feed on nearby communities.`,
        `Vampires are present at this ${locationPlaceholder} searching for valuables.`
      ])
    },
    spawn: inhabitantSpawn(1)
  }
}
