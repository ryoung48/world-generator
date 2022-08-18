import { Loc } from '../../../../types'
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
  lore: {
    tag: 'lore',
    text: () => {
      return `This site contains valuable ${window.dice.choice([
        'arcane',
        'alchemical',
        'religious',
        'cultural',
        'historical'
      ])} ${window.dice.choice(['research', 'texts'])}.`
    },
    spawn: rewardsRestriction(1)
  },
  secrets: {
    tag: 'secrets',
    text: () => {
      return `This site contains evidence of some atrocity, crime, or terrible practice that has some meaningful connection to the present-day natives of the province.`
    },
    spawn: rewardsRestriction(1)
  },
  wealth: {
    tag: 'wealth',
    text: () => {
      return `This site is rumored to hold vast treasures.`
    },
    spawn: rewardsRestriction(1)
  },
  key: {
    tag: 'key',
    text: () => {
      return `The site's reward is a key of some kind needed to get into someplace important.`
    },
    spawn: rewardsRestriction(1)
  },
  artifact: {
    tag: 'artifact',
    text: () => {
      return `There is a powerful enchanted item within this site that can be claimed or destroyed.`
    },
    spawn: rewardsRestriction(1)
  },
  resource: {
    tag: 'resource',
    text: () => {
      return `Some precious ore, rare wood, magical elixir, arcanely-potent extract, or other natural product is in great supply here.`
    },
    spawn: rewardsRestriction(1)
  },
  plot: {
    tag: 'plot',
    text: () => {
      return `Somewhere in the site, there's clear evidence of a sinister plot in the outside world.`
    },
    spawn: rewardsRestriction(1)
  },
  legitimacy: {
    tag: 'legitimacy',
    text: () => {
      return `There's a piece of regalia or a genealogical text somewhere in this site that either proves the local ruling family is illegitimate or confers that legitimacy on whoever holds it.`
    },
    spawn: rewardsRestriction(1)
  },
  maps: {
    tag: 'maps',
    text: () => {
      return `There's a ruin or cache that nobody knows about, but this map gives relatively clear directions to it. The map might leave out important information about the destination site's defenses or nature.`
    },
    spawn: rewardsRestriction(1)
  }
}
