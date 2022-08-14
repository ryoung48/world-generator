import { location__is_remote } from '../../../..'
import { location__is_city, location__is_village } from '../../../taxonomy/settlements'
import { LocationTrait } from '../../types'
import { settlement__environment } from './types'

export const settlement__environment_traits: Record<settlement__environment, LocationTrait> = {
  'artistic patronage': {
    tag: 'artistic patronage',
    text: () =>
      `This site is a haven for those with artistic talents with plentiful patrons and inspiration.`,
    spawn: () => 0.5
  },
  'brilliant innovation': {
    tag: 'brilliant innovation',
    text: () =>
      `A new ${window.dice.choice([
        'alchemy',
        'metallurgy',
        'manufacturing',
        'mechanics',
        'arcana'
      ])} technique has recently been discovered that is drastically changing regional industry.`,
    spawn: () => 0.5
  },
  'corrupt laws': {
    tag: 'corrupt laws',
    text: () =>
      `The ruling authority in this province is ostensibly corrupt. Predatory laws, unfair trials, bribery, and false charges are common.`,
    spawn: () => 1
  },
  crackdown: {
    tag: 'crackdown',
    text: () =>
      `Local law enforcement has implemented unusually strict measures to discourage undesirable behavior.`,
    spawn: () => 1
  },
  'decadent locals': {
    tag: 'decadent locals',
    text: () =>
      `The locals enjoy repulsive vices and shameful appetites (gambling, drugs, prostitution, etc.).`,
    spawn: () => 1
  },
  'despotic lords': {
    tag: 'despotic lords',
    conflicts: ['incompetent leaders', 'neglectful ruler'],
    text: () =>
      `Some brutal master lords over the settlement, crushing any hint of resistance and demanding extravagant service from the locals.`,
    spawn: () => 1
  },
  'faded remnant': {
    tag: 'faded remnant',
    conflicts: ['fallen prosperity'],
    text: () =>
      `This site used to be much larger and more prosperous, but something happened relatively long ago that left it a shrunken shadow of it's former self. Much of its former architecture is crumbling and abandoned.`,
    spawn: ({ entity: loc }) => (location__is_city(loc) ? 0 : 1)
  },
  'fallen prosperity': {
    tag: 'fallen prosperity',
    conflicts: ['faded remnant'],
    text: () =>
      `This site used to be much richer, but something happened recently to crush its source of prosperity. Different factions of the community might be trying to grasp at the remaining dregs of wealth, others might try to restart the failed industry, and some might look for a new livelihood.`,
    spawn: ({ entity: loc }) => (location__is_city(loc) ? 0 : 1)
  },
  'hazardous district': {
    tag: 'hazardous district',
    text: () =>
      `Some portion of of this site ${window.dice.choice([
        'has been closed off due to the release of an artificial contagion',
        'was built atop something unstable and now that substrate is crumbling'
      ])}.`,
    spawn: () => 1
  },
  'heavy fortifications': {
    tag: 'heavy fortifications',
    text: () =>
      `The community is remarkably well-fortified for a site of its size and role. Well-maintained walls, concentric defenses, a strategic terrain location, or a large body of standing troops might be present.`,
    spawn: () => 1
  },
  'hidden ruler': {
    tag: 'hidden ruler',
    conflicts: ['regency council'],
    text: () =>
      `While the community has a public leader, the real authority is hidden from outsiders.`,
    spawn: () => 1
  },
  'imperious architect': {
    tag: 'imperious architect',
    text: () =>
      `A noble is bent on constructing some costly and elaborate structure, whether a higher tier of city walls, an ornate temple, or a bigger palace. The exactions are impoverishing the locals, and some are being impressed as corvee labor on the work.`,
    spawn: () => 1
  },
  'impoverished district': {
    tag: 'impoverished district',
    text: () =>
      `Some portion of this site has extremely poor living standards and is rife with crime.`,
    spawn: () => 1
  },
  'incompetent leaders': {
    tag: 'incompetent leaders',
    conflicts: ['despotic lords', 'neglectful ruler'],
    text: () =>
      `The ruling authority is entirely incompetent and has trouble providing basic services due to ${window.dice.choice(
        [
          'uncontrolled passions',
          'hopeless impractical idealism',
          'pigheaded obstinacy in the face of failure',
          'a total lack of charisma',
          'profound laziness'
        ]
      )}. `,
    spawn: () => 1
  },
  'infamous prison': {
    tag: 'infamous prison',
    text: () => `This site is home to a renowned prison, hosting many infamous criminals.`,
    spawn: ({ entity: loc }) => (location__is_city(loc) ? 1 : 0)
  },
  'local festival': {
    tag: 'local festival',
    text: () =>
      `A ${window.dice.choice([
        'religious',
        'regional',
        'national',
        'cultural'
      ])} festival is currently underway.`,
    spawn: () => 1
  },
  'neglectful ruler': {
    tag: 'neglectful ruler',
    conflicts: ['despotic lords', 'incompetent leaders'],
    text: () =>
      `Whatever lord claims ownership of this site is indifferent to its troubles and ${window.dice.choice(
        [
          'is convinced that no solution exists to solve the current problems at hand',
          'is convinced that their representatives can handle all concerns',
          'hopes to punish past transgressions with neglect'
        ]
      )}.`,
    spawn: () => 1
  },
  'new industry': {
    tag: 'new industry',
    text: () =>
      `The natives have established a new industry here, and it's making them a great deal of profit. Old patterns of authority and wealth are being disrupted, and the established aristocracy are unlikely to be pleased about it.`,
    spawn: () => 1
  },
  'pilgrimage site': {
    tag: 'pilgrimage site',
    text: () =>
      `This community is centered around a major pilgrimage site (${window.dice.choice([
        'religious',
        'secular',
        'natural'
      ])}). Considerable local tension likely exists over controlling the access to the site and maximizing the profits from foreign visitors.`,
    spawn: () => 1
  },
  'punishment post': {
    tag: 'punishment post',
    text: () =>
      `The leader of this site once held a much higher station, but was demoted to this post due to some past transgression. They burn with resentment and will do whatever they must to restore their former glory.`,
    spawn: ({ entity: loc }) => (location__is_village(loc) ? 1 : 0)
  },
  'ritual combat': {
    tag: 'ritual combat',
    text: () =>
      `This site regularly hosts some form of ritual combat for the entertainment of locals.`,
    spawn: () => 0.5
  },
  'regency council': {
    tag: 'regency council',
    conflicts: ['hidden ruler', 'warlord rule'],
    text: () =>
      `A council of powerful regents rule this site due to the incapacity of the legitimate ruler (${window.dice.choice(
        ['sickness', 'youth', 'poor intellect']
      )}). Some of these regents may actually have the ruler's interests in mind, but others are exploiting the site's resources for their own benefit.`,
    spawn: ({ entity: loc }) => (!location__is_remote(loc) && !location__is_village(loc) ? 1 : 0)
  },
  'ruins beneath': {
    tag: 'ruins beneath',
    text: () => `This site was built on top of the ruins of a much older site.`,
    spawn: ({ entity: loc }) => (location__is_village(loc) ? 0 : 1)
  },
  'trade hub': {
    tag: 'trade hub',
    text: () =>
      `This site lies on a popular trade route and is frequently visited by foreign merchant caravans.`,
    spawn: ({ entity: loc }) => {
      const cell = window.world.cells[loc.cell]
      return cell.roads.land.length > 0 ? 1 : 0
    }
  },
  'unique product': {
    tag: 'unique product',
    text: () =>
      `This site produces a very rare ${window.dice.choice([
        'resource',
        'commodity',
        'recipe'
      ])} (${window.dice.choice(['metal', 'textile', 'herbs', 'brew'])}).`,
    spawn: () => 1
  },
  'xenophobic locals': {
    tag: 'xenophobic locals',
    text: () =>
      `The locals regard foreigners with great distrust. Persecution is not uncommon in these communities.`,
    spawn: () => 1
  }
}
