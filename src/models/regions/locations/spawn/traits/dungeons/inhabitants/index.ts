import { recent_battle_window } from '../../../../../../history/events/war/battles'
import { location__raiders } from '../../../..'
import { Loc } from '../../../../types'
import { LocationTrait } from '../../types'
import { dungeon__inhabitant, dungeon__inhabitants } from './types'

const inhabitants = new Set<string>(dungeon__inhabitants)
const inhabitant_spawn = (weight: number) => (params: { entity: Loc }) => {
  const curr_inhabitants = params.entity.traits.reduce((sum, { tag }) => {
    return sum + (inhabitants.has(tag) ? 1 : 0)
  }, 0)
  return curr_inhabitants > 1 ? 0 : curr_inhabitants > 0 ? weight * 0.5 : weight
}

const lesser_intelligence: LocationTrait['tag'][] = ['beasts', 'primordials']
export const dungeon__requires_inhabitants =
  (params: { weight: number; intelligent?: boolean }) => (args: { entity: Loc }) => {
    const { weight, intelligent } = params
    const has_inhabitants = args.entity.traits.some(({ tag }) => {
      const required_intellect = !intelligent || !lesser_intelligence.includes(tag)
      return required_intellect && inhabitants.has(tag)
    })
    return has_inhabitants ? weight : 0
  }

export const dungeon__inhabitant_traits: Record<dungeon__inhabitant, LocationTrait> = {
  'exiled noble': {
    tag: 'exiled noble',
    text: () => {
      return window.dice.choice([
        `This site is home to an exiled noble house and their company of veteran mercenaries. They plot and scheme their eventual return to glory.`,
        `An exiled noble is searching at this site for something that might restore them to power. Elite mercenaries accompany the noble on this expedition.`
      ])
    },
    spawn: inhabitant_spawn(0.5)
  },
  aberrations: {
    tag: 'aberrations',
    text: () => {
      const swarm = window.dice.flip
      const experiment = window.dice.flip
      return `The result of ${experiment ? 'a' : 'an'} ${
        experiment ? 'failed experiment' : 'arcane anomaly'
      } has created ${
        swarm ? 'a group of aberrations' : 'one monstrous aberration'
      } (${window.dice.choice(['beast', 'humanoid', 'primordial'])}${
        swarm ? 's' : ''
      }) that now reside in this site. The transformation has made ${
        swarm ? 'these creatures' : 'this creature'
      } extremely aggressive and a constant danger to nearby communities.`
    },
    spawn: inhabitant_spawn(1)
  },
  automatons: {
    tag: 'automatons',
    text: () => {
      return `This site is fiercely guarded by enchanted constructs.`
    },
    spawn: ({ entity: loc }) =>
      loc.type === 'ruins' || loc.type === 'laboratory' ? inhabitant_spawn(1)({ entity: loc }) : 0
  },
  bandits: {
    tag: 'bandits',
    text: () => {
      return window.dice.choice([
        `This site is home to a group of bandits from which they raid nearby communities.`,
        `Bandits are present at this site searching for valuables.`
      ])
    },
    spawn: inhabitant_spawn(1)
  },
  beasts: {
    tag: 'beasts',
    conflicts: ['primordials'],
    text: () => {
      const swarm = window.dice.flip
      return `A ${swarm ? 'swarm of ' : 'monstrous'} beast${swarm ? 's' : ''} reside${
        swarm ? '' : 's'
      } at this site. Natives warn that this species is extremely ${window.dice.choice([
        'aggressive',
        'territorial'
      ])} and should be avoided if possible.`
    },
    spawn: inhabitant_spawn(1)
  },
  cultists: {
    tag: 'cultists',
    conflicts: ['zealous'],
    text: () => {
      return window.dice.choice([
        `Dark cultists worship a profane god at this site.`,
        `A dark cult is searching for something at this site.`
      ])
    },
    spawn: inhabitant_spawn(1)
  },
  deserters: {
    tag: 'deserters',
    text: () => {
      return 'Deserters from a recent conflict are camped at this site, causing problems for nearby communities.'
    },
    spawn: ({ entity: loc }) => {
      const { last_invasion } = window.world.provinces[loc.province].memory
      return last_invasion.time > window.world.date - recent_battle_window
        ? 5 * inhabitant_spawn(1)({ entity: loc })
        : 0
    }
  },
  haunted: {
    tag: 'haunted',
    text: () => {
      return 'Some great atrocity occurred at this site. The wraiths of those involved on both sides are trapped restlessly searching for resolution and often react violently towards any intruder.'
    },
    spawn: inhabitant_spawn(1)
  },
  hivemind: {
    tag: 'hivemind',
    text: () => {
      return `A multi-bodied intellect exists at this site (${window.dice.choice([
        'construct',
        'primordial',
        'aberration'
      ])}). Conflict with these creatures is apt to be very dangerous, as they're capable of coordination at a level impossible to others, yet their single mind makes them more vulnerable to a single point of failure.`
    },
    spawn: inhabitant_spawn(0.5)
  },
  occultists: {
    tag: 'occultists',
    conflicts: ['zealous'],
    text: () => {
      return `A cabal of ${window.dice.choice([
        'witches',
        'necromancers',
        'warlocks'
      ])} perform dark ${window.dice.choice(['rituals', 'experiments'])} at this site.`
    },
    spawn: inhabitant_spawn(1)
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
      } at this site. Natives warn that this species is extremely ${window.dice.choice([
        'aggressive',
        'territorial'
      ])} and should be avoided if possible.`
    },
    spawn: inhabitant_spawn(1)
  },
  raiders: {
    tag: 'raiders',
    text: () => {
      return window.dice.choice([
        `Foreign raiders use this site as a base of operations, from which they plunder nearby communities.`,
        `Foreign raiders are present at this site searching for valuables.`
      ])
    },
    spawn: ({ entity: loc }) => {
      const raiders_present = location__raiders(loc).length > 0 ? 3 : 0
      return inhabitant_spawn(1)({ entity: loc }) * raiders_present
    }
  },
  sentient: {
    tag: 'sentient',
    text: () => {
      return `This entire site is ${window.dice.choice([
        'infused with the spirit of some arcane mind',
        'a vast microcosm (primordial)'
      ])}. Physical damage to the site usually brings some hostile response, however muted by age and disrepair, and the structure itself may be conscious enough to strike bargains with inhabitants.`
    },
    spawn: inhabitant_spawn(0.5)
  },
  spirits: {
    tag: 'spirits',
    text: ({ entity: loc }) => {
      const type =
        loc.subtype.match(/portal \((?<type>.*)\)/)?.groups?.type ??
        window.dice.choice(['elementals', 'fiends', 'celestials', 'fey'])
      return `A host of outsider spirits (${type}) linger at this site due to ${window.dice.choice([
        'a natural crossing between realms',
        'an arcane summoning ritual'
      ])}.`
    },
    spawn: inhabitant_spawn(1)
  },
  titan: {
    tag: 'titan',
    text: () => {
      return `A monstrous entity (${window.dice.choice([
        'beast',
        'aberration',
        'primordial',
        'spirit'
      ])}) patrols around this site capable of shattering even the most seasoned adventurers. It should be avoided at all costs.`
    },
    spawn: () => 0.5
  },
  undeath: {
    tag: 'undeath',
    text: () => {
      return `A horde of undead reside at this site ${window.dice.choice([
        'standing as eternal guardians to the valuables contained within',
        'wandering aimlessly long after their dark masters have perished'
      ])}.`
    },
    spawn: inhabitant_spawn(1)
  },
  vampiric: {
    tag: 'vampiric',
    text: () => {
      return window.dice.choice([
        `Vampires reside at this site, from which they feed on nearby communities.`,
        `Vampires are present at this site searching for valuables.`
      ])
    },
    spawn: inhabitant_spawn(1)
  }
}
