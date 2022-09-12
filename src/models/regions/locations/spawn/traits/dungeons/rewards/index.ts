import { Loc } from '../../../../types'
import { locationPlaceholder } from '../../../placeholders'
import { LocationTrait } from '../../types'
import { dungeon__reward, dungeon__rewards } from './types'

const rewards = new Set<string>(dungeon__rewards)

const rewardsRestriction = (weight: number) => (params: { entity: Loc }) => {
  const hasRewards = params.entity.traits.some(({ tag }) => {
    return rewards.has(tag)
  })
  return hasRewards ? 0 : weight
}

export const dungeon__rewardsTraits: Record<dungeon__reward, LocationTrait> = {
  'ancient lore': {
    tag: 'ancient lore',
    text: () => {
      return `This ${locationPlaceholder} contains valuable ${window.dice.choice([
        'arcane',
        'alchemical',
        'religious',
        'cultural',
        'historical'
      ])} ${window.dice.choice(['research', 'texts'])}.`
    },
    spawn: rewardsRestriction(1)
  },
  'lethal treasure': {
    tag: 'lethal treasure',
    text: () => {
      return `the ${window.dice.choice([
        'resources',
        'secrets',
        'lore',
        'wealth'
      ])} of this ${locationPlaceholder} is afflicted by a ${window.dice.choice([
        'curse',
        'blight'
      ])} that will harm any new owners.`
    },
    spawn: rewardsRestriction(1)
  },
  'lost secrets': {
    tag: 'lost secrets',
    text: () => {
      return `This ${locationPlaceholder} contains evidence of some atrocity, crime, or terrible practice that has some meaningful connection to the present-day natives of the province.`
    },
    spawn: rewardsRestriction(1)
  },
  'vast wealth': {
    tag: 'vast wealth',
    text: () => {
      return `This ${locationPlaceholder} is rumored to hold vast treasures.`
    },
    spawn: rewardsRestriction(1)
  },
  'important key': {
    tag: 'important key',
    text: () => {
      return `The ${locationPlaceholder}'s reward is a key of some kind needed to get into someplace important.`
    },
    spawn: rewardsRestriction(1)
  },
  'arcane artifact': {
    tag: 'arcane artifact',
    text: () => {
      return `There is a powerful enchanted item within this ${locationPlaceholder} that can be claimed or destroyed.`
    },
    spawn: rewardsRestriction(1)
  },
  'resource rich': {
    tag: 'resource rich',
    text: () => {
      return `Some precious ore, rare wood, magical elixir, arcanely-potent extract, or other natural product is in great supply here.`
    },
    spawn: rewardsRestriction(1)
  },
  'sinister plot': {
    tag: 'sinister plot',
    text: () => {
      return `Somewhere in the ${locationPlaceholder}, there's clear evidence of a sinister plot in the outside world.`
    },
    spawn: rewardsRestriction(1)
  },
  'righteous legitimacy': {
    tag: 'righteous legitimacy',
    text: () => {
      return `There's a piece of regalia or a genealogical text somewhere in this ${locationPlaceholder} that either proves the local ruling family is illegitimate or confers that legitimacy on whoever holds it.`
    },
    spawn: rewardsRestriction(1)
  },
  'valuable maps': {
    tag: 'valuable maps',
    text: () => {
      return `There's a ruin or cache that nobody knows about, but this map gives relatively clear directions to it. The map might leave out important information about the destination ${locationPlaceholder}'s defenses or nature.`
    },
    spawn: rewardsRestriction(1)
  },
  'useless treasure': {
    tag: 'useless treasure',
    text: () => {
      return `the ${window.dice.choice([
        'resources',
        'secrets',
        'lore',
        'wealth'
      ])} of this ${locationPlaceholder} has decayed beyond repair.`
    },
    spawn: rewardsRestriction(1)
  }
}
