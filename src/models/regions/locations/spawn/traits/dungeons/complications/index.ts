import { locationPlaceholder } from '../../../placeholders'
import { LocationTrait } from '../../types'
import { dungeon__requiresInhabitants } from '../inhabitants'
import { dungeon__complications } from './types'

export const dungeon__complicationTraits: Record<dungeon__complications, LocationTrait> = {
  allies: {
    tag: 'allies',
    text: () => {
      return `A friendly faction is present to assist at this ${locationPlaceholder}.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1 })
  },
  'civil war': {
    tag: 'civil war',
    text: () => {
      return `Multiple factions within the ${locationPlaceholder} are constantly fighting each other.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  },
  'failed incursion': {
    tag: 'failed incursion',
    text: () => {
      return `The ${locationPlaceholder} recently experienced a serious incursion of outsiders. These intruders were repulsed, perhaps with significant loss of native life, and the ${locationPlaceholder} was considerably disrupted by the fighting.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1 })
  },
  'freshly looted': {
    tag: 'freshly looted',
    text: () => {
      return `The ${locationPlaceholder} has been recently plundered. Many creatures are either dead or driven off, and the rewards for exploration are limited.`
    },
    spawn: () => 1
  },
  'grand delusion': {
    tag: 'grand delusion',
    text: () => {
      return `The natives of this ${locationPlaceholder} are convinced of something that is simply not the case. They've developed rationalizations to explain obvious contradictions to their error, many of which involve hostile responses to bearers of iniquitous falsehood.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  },
  'hospitable natives': {
    tag: 'hospitable natives',
    text: () => {
      return `While not all denizens of the ${locationPlaceholder} are friendly, there's at least one faction that's known to be willing to host guests and negotiate for favors.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  },
  rivals: {
    tag: 'rivals',
    text: () => {
      return window.dice.choice([
        `One or more groups compete with the PCs to complete the objectives of this ${locationPlaceholder}.`,
        `Someone else seeks to explore the ${locationPlaceholder} at the same time as the PCs, and they are not interested in sharing their finds.`
      ])
    },
    spawn: () => 1
  },
  'sacrificial bargain': {
    tag: 'sacrificial bargain',
    text: () => {
      return `The natives of this ${locationPlaceholder} have made some kind of pact with a dark power, receiving support in exchange for some sacrifice.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  },
  'sealed evil': {
    tag: 'sealed evil',
    text: () => {
      return `The ${locationPlaceholder} serves as a prison for some terribly dangerous entity or power.`
    },
    spawn: () => 1
  },
  'secret alliance': {
    tag: 'secret alliance',
    text: () => {
      return `The occupants of this ${locationPlaceholder} have an arrangement with some outside power, doing their bidding in exchange for considerations.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  },
  survivor: {
    tag: 'survivor',
    text: () => {
      return `There exists at least one friendly denizen in distress that needs to be rescued and escorted from this ${locationPlaceholder}.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1 })
  },
  zealous: {
    tag: 'zealous',
    conflicts: ['cultists', 'occultists'],
    text: () => {
      return `The inhabitants of this ${locationPlaceholder} are driven by religious fanaticism.`
    },
    spawn: dungeon__requiresInhabitants({ weight: 1, intelligent: true })
  }
}
