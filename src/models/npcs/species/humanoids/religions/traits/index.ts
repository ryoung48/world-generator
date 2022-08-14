import { entity__traits } from '../../../../../utilities/traits'
import { Religion } from '../types'
import { religion__tags, ReligionTrait } from './types'

const religion_traits: Record<religion__tags, ReligionTrait> = {
  'ancestor worship': {
    tag: 'ancestor worship',
    text: () => `The faith venerates past ancestors, heroes, and leaders.`,
    spawn: ({ entity }) => (entity.name.includes('Ancestors') ? 1000 : 1)
  },
  'antinomian clergy': {
    tag: 'antinomian clergy',
    text: () => `The clergy is convinced that they are above moral laws.`,
    spawn: () => 1
  },
  aristocratic: {
    tag: 'aristocratic',
    conflicts: ['underclass'],
    text: () =>
      `The faith is largely or exclusively practiced by the elite of the society, and believers from lesser classes are ${window.dice.choice(
        ['unable to carry out the obligations of the faith', 'prohibited from participating']
      )}.`,
    spawn: () => 1
  },
  asceticism: {
    tag: 'asceticism',
    conflicts: ['decadence', 'materially luxuriant'],
    text: () =>
      `The faith tends to scorn material wealth and comforts, esteeming poverty, simplicity, and deprivation. Its shrines and regalia tend to be very simple and austere.`,
    spawn: () => 1
  },
  astrology: {
    tag: 'astrology',
    text: () => `Celestial bodies play a big part in religious ceremony and omens.`,
    spawn: () => 1
  },
  'caste structure': {
    tag: 'caste structure',
    conflicts: ['underclass'],
    text: () =>
      `The religion imposes a strict caste system. Each caste has its purpose and role in this life and the next, and moving between castes is usually impossible. The burdens of the faith are rarely apportioned evenly, and some castes may be considered intrinsically contemptible.`,
    spawn: () => 1
  },
  charity: {
    tag: 'charity',
    text: () =>
      `The clergy feels responsible for the well-being of the poor and hosts a plethora of charity programs.`,
    spawn: () => 1
  },
  decadence: {
    tag: 'decadence',
    conflicts: ['asceticism'],
    text: () =>
      `The hierarchy has been corrupted by money, influence, or material comfort. Clergy are now selected for their ability to fit in with the existing order. The doctrine has been altered to support these excesses.`,
    spawn: () => 1
  },
  'dire sacrifices': {
    tag: 'dire sacrifices',
    text: () =>
      `Tremendous sacrifices are required of believers (${window.dice.choice([
        'blood',
        'wealth',
        'time'
      ])}).`,
    spawn: () => 1
  },
  'economic role': {
    tag: 'economic role',
    conflicts: ['underclass'],
    text: () =>
      `The faith has critical economic importance imbedded in it's doctrine (${window.dice.choice([
        'landowners',
        'merchants',
        'artisans',
        'bankers'
      ])}).`,
    spawn: ({ entity }) => (entity.folk ? 0 : 1)
  },
  esotericism: {
    tag: 'esotericism',
    conflicts: ['missionary zeal'],
    text: () => `Holy texts are written in a dead language known only by the clergy.`,
    spawn: () => 1
  },
  gnosticism: {
    tag: 'gnosticism',
    text: () =>
      `The religion holds that knowledge is the key to enlightenment. Many priests are scholars and many temples hold vast libraries.`,
    spawn: () => 1
  },
  harmonious: {
    tag: 'harmonious',
    conflicts: ['supremacy'],
    text: () => `This religion is built to co-exist with other religions.`,
    spawn: () => 1
  },
  'holy grounds': {
    tag: 'holy grounds',
    text: () =>
      `Several places or structures are of critical religious importance to the faith, and must be kept in sanctified safety at all costs. Regular pilgrimage to these sites is encouraged.`,
    spawn: () => 1
  },
  'idol worship': {
    tag: 'idol worship',
    text: () =>
      `Homes and holy places are often decorated with idols of revered religious figures.`,
    spawn: () => 1
  },
  legalism: {
    tag: 'legalism',
    text: () =>
      `The faith adheres to ${window.dice.choice(['an elaborate', 'a strict'])} legal code.`,
    spawn: () => 1
  },
  localized: {
    tag: 'localized',
    text: () =>
      `The faith has substantially different manifestations in different locations, each branch harmonized with local cultures and habits.`,
    spawn: () => 1
  },
  'materially luxuriant': {
    tag: 'materially luxuriant',
    conflicts: ['asceticism'],
    text: () =>
      `The religion prizes ornate regalia, splendid shrines, magnificent religious art, and the finest possible adornment of all things related to the faith.`,
    spawn: () => 1
  },
  militant: {
    tag: 'militant',
    conflicts: ['pacifist'],
    text: () =>
      `The faith is built for war, with many believers and clergy alike organized in a militarized way and equipped with martial training. Death in battle is usually considered to be the most splendid end possible for a faithful believer.`,
    spawn: () => 1
  },
  'missionary zeal': {
    tag: 'missionary zeal',
    conflicts: ['esotericism'],
    text: () =>
      `Holy texts are constantly being translated in all known languages and are spread throughout the globe.`,
    spawn: ({ entity }) => (entity.folk ? 0 : 1)
  },
  naturalism: {
    tag: 'naturalism',
    text: () =>
      `The faith teaches it's believers to venerate nature. Vegetarian dietary restrictions are common. Such faiths often have a plethora of sacred animals and plants.`,
    spawn: () => 1
  },
  pacifist: {
    tag: 'pacifist',
    conflicts: ['militant'],
    text: () => `Violence is condemned except as a last resort.`,
    spawn: () => 1
  },
  quietist: {
    tag: 'quietist',
    text: () =>
      `The faith seeks perfect communion with its deity through stillness of mind and soul, seeking silent meditation and disengagement from secular concerns.`,
    spawn: () => 1
  },
  reincarnation: {
    tag: 'reincarnation',
    text: () =>
      `The faith believes that souls cycle endlessly through different forms after death.`,
    spawn: () => 1
  },
  ritualism: {
    tag: 'ritualism',
    text: () =>
      `The religion is known for its elaborate rituals, many of which require great sacrifices.`,
    spawn: () => 1
  },
  simony: {
    tag: 'simony',
    conflicts: ['underclass'],
    text: () =>
      `Significant positions within the religion are available for sale, either openly or through a tacit exchange of resources. As a consequence, major clerics are often wealthy believers who take open advantage of their positions to advance their personal interests.`,
    spawn: ({ entity }) => (entity.folk ? 0 : 1)
  },
  supremacy: {
    tag: 'supremacy',
    conflicts: ['harmonious'],
    text: () =>
      `This faith strongly believes that it is the "one true faith" and that all other faiths are lesser, incomplete forms. The clergy strongly encourages the assimilation of non-believers.`,
    spawn: () => 1
  },
  underclass: {
    tag: 'underclass',
    conflicts: ['aristocratic', 'caste structure', 'economic role', 'simony'],
    text: () =>
      `While the religion may not specifically be oriented toward the underclass, the great majority of believers are from socially inferior classes.`,
    spawn: () => 1
  }
}

const { colors, spawn } = entity__traits({ traits: religion_traits, tag: 'religion' })

export const religion__spawn_traits = (religion: Religion) => {
  while (religion.traits.length < 3) {
    spawn({ entity: religion })
  }
}

export const religion__trait_colors = colors
