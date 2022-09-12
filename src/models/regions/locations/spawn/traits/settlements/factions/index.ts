import { decorateText } from '../../../../../../utilities/text/decoration'
import { region__nation } from '../../../../..'
import { region__colonists } from '../../../../../diplomacy/colonies'
import { location__isRemote, location__missionaries, location__prospectColony } from '../../../..'
import { locationPlaceholder } from '../../../placeholders'
import { location__isCity, location__isVillage } from '../../../taxonomy/settlements'
import { LocationTrait } from '../../types'
import { settlement__faction } from './types'

export const settlement__factionTraits: Record<settlement__faction, LocationTrait> = {
  'artisan guilds': {
    tag: 'artisan guilds',
    text: () =>
      `local artisan guilds exert great influence within this ${locationPlaceholder} seeking to protect trade secrets and their group members.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'criminal bosses': {
    tag: 'criminal bosses',
    text: () =>
      `${window.dice.choice([
        `a single cohesive criminal network thrives`,
        `multiple splintered criminal networks thrive`
      ])} within this ${locationPlaceholder} and are known for ${window.dice.choice([
        'hired assassinations and other violence',
        'bandit raids on the surrounding area',
        'extortion of local artisans and merchants',
        'persecuting practitioners of foreign customs',
        'lucrative and forbidden black market transactions',
        'blackmailing and spying for the rich',
        'theft and embezzlement targeted at well-off citizens',
        'having intrenched connections with the ruling elite',
        'providing essential local services to offset illegal activity'
      ])}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'colonial outpost': {
    tag: 'colonial outpost',
    conflicts: ['colonial embassies'],
    text: ({ entity: loc }) => {
      const region = window.world.regions[loc.region]
      const colony = window.dice.choice(region.colonialPresence.colonies)
      return `a foreign power (${decorateText({
        link: region__nation(window.world.regions[colony.nation])
      })}) has established a colonial outpost (${
        colony.tag
      }) within this ${locationPlaceholder}. ${window.dice.choice([
        'the colonists struggle to curry favor with the native ruling elite',
        'the colonists struggle from frequent violent clashes with the natives',
        'the colonists struggle to adapt to the foreign environment',
        'the colonists exploit the native population with one-sided diplomatic agreements',
        'the colonists and the natives work together against a common threat',
        'the colonists have mostly supplanted the native ruling elite'
      ])}`
    },
    spawn: ({ entity: loc }) => location__prospectColony({ loc })
  },
  'colonial embassies': {
    tag: 'colonial embassies',
    conflicts: ['colonial outpost'],
    text: ({ entity: loc }) => {
      const region = window.world.regions[loc.region]
      const colonists = region__colonists(region)
      return `this ${locationPlaceholder} is an important cosmopolitan hub where natives and foreign powers (${colonists
        .map(colonist => {
          return decorateText({
            link: colonist,
            tooltip: Array.from(
              new Set(
                region.colonialPresence.colonies
                  .filter(
                    ({ nation }) =>
                      region__nation(window.world.regions[nation]).idx === colonist.idx
                  )
                  .map(({ tag }) => tag)
              )
            ).join(' & ')
          })
        })
        .join(', ')}) negotiate trade deals and settlement agreements.`
    },
    spawn: () => 0
  },
  'druidic circle': {
    tag: 'druidic circle',
    text: () =>
      `this ${locationPlaceholder} is known for its prominent druidic circle, which is responsible for ${window.dice.choice(
        ['protecting a nearby sacred grove', 'combating spirit incursions']
      )}.`,
    spawn: () => 1
  },
  'foreign enclave': {
    tag: 'foreign enclave',
    text: () => {
      return `a recent influx of newcomers (${window.dice.choice([
        'economic migrants',
        'religious exiles',
        'war-ravaged refugees'
      ])}) have established a major foreign enclave within this ${locationPlaceholder}. ${window.dice.choice(
        [
          'locals struggle to provide resources and opportunities to support the newcomers',
          'law enforcement struggles to maintain order within the enclave',
          'enclave leaders despise local customs',
          'conflicts between local and foreign customs are common',
          'criminals hide within the enclave and are complicating foreign relations'
        ]
      )}`
    },
    spawn: () => 1
  },
  'knightly order': {
    tag: 'knightly order',
    text: () =>
      `a renowned knightly order operates resides in this ${locationPlaceholder}. ${window.dice.choice(
        [
          'they assist troubled travelers and celebrate kindness, condemning deception and malice even when dealing with their enemies',
          'they were originally founded as the royal guard for high-ranking government officials long ago',
          'they emphasize honesty and diplomacy over cruelty and aggression'
        ]
      )}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'legendary figure': {
    tag: 'legendary figure',
    text: () =>
      `an individual of great renown (${window.dice.choice([
        'artisan',
        'artist',
        'military',
        'arcane',
        'religious',
        'scholar',
        'political',
        'criminal'
      ])}) resides within this ${locationPlaceholder}. ${window.dice.choice([
        'they have been retired for some time and their skills are not what they once were',
        'they are deeply embittered and are known to decline all requests for help',
        'they are still spirit broken after a crushing defeat and wish to live in solitude'
      ])}.`,
    spawn: () => 1
  },
  'major temple': {
    tag: 'major temple',
    text: () =>
      `this ${locationPlaceholder} is home to a major temple. locals are obliged to respect the wishes of its high clergy.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'mercenary company': {
    tag: 'mercenary company',
    text: () =>
      `a renowned mercenary company operates within this ${locationPlaceholder}. ${window.dice.choice(
        [
          'these soldiers are dedicated to conducting warfare mercilessly and with extreme brutality in order to bring a swift end to conflicts',
          'they are warriors with a solemn reverence for the sanctity of contracts, they fulfill their obligations with unemotional, unswerving commitment and without moral judgment'
        ]
      )}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'merchants guild': {
    tag: 'merchants guild',
    text: () =>
      `a powerful merchants guild exists in this ${locationPlaceholder} seeking to regulate the economy and ensure fair prices.`,
    spawn: ({ entity: loc }) => (!location__isVillage(loc) && !location__isRemote(loc) ? 1 : 0)
  },
  'missionary activity': {
    tag: 'missionary activity',
    text: ({ entity: loc }) => {
      const missionary = window.dice.choice(location__missionaries(loc))
      const religion = window.world.religions[missionary.religion.state]
      return `missionaries from ${decorateText({
        link: missionary
      })} work to spread their ${decorateText({
        label: 'faith',
        tooltip: religion.name
      })} in this ${locationPlaceholder}.`
    },
    spawn: ({ entity: loc }) => {
      const religions = location__missionaries(loc)
      return religions.length > 0 ? 1 : 0
    }
  },
  'nomadic populace': {
    tag: 'nomadic populace',
    text: ({ entity: loc }) => {
      return `${window.dice.weightedChoice([
        { v: 'rural', w: 1 },
        { v: 'seafaring', w: loc.coastal ? 1 : 0 }
      ])} nomadic ${window.dice.choice(['native', 'diaspora'])} ${window.dice.choice([
        'tribes',
        'clans'
      ])} dwell at the outskirts of society. They ${window.dice.choice([
        'find themselves constantly in conflict with their more sedentary neighbors over land and resources',
        'are a primarily peaceful people seeking to preserve their way of life'
      ])}.`
    },
    spawn: () => 1
  },
  'pirate enclave': {
    tag: 'pirate enclave',
    text: () => `This ${locationPlaceholder} is a safe haven for pirates.`,
    spawn: ({ entity: loc }) => (loc.coastal ? 1 : 0)
  },
  'prestigious academy': {
    tag: 'prestigious academy',
    text: () =>
      `a ${window.dice.choice([
        'prominent',
        'rising',
        'waning'
      ])} institution of higher learning is located within this ${locationPlaceholder}.`,
    spawn: ({ entity: loc }) => (!location__isRemote(loc) && !location__isVillage(loc) ? 1 : 0)
  },
  'prominent monastery': {
    tag: 'prominent monastery',
    text: () =>
      `this ${locationPlaceholder} is home to a prominent monastery. the monks there are dedicated to ${window.dice.choice(
        [
          `seeking enlightenment through ${window.dice.choice([
            'scholarly pursuits',
            'complex rituals'
          ])}`,
          `the preservation of ${window.dice.choice(['cultural history', 'religious texts'])}`,
          `safeguarding religious artifacts`
        ]
      )}.`,
    spawn: ({ entity: loc }) => (!location__isRemote(loc) ? 0 : 1)
  },
  'sorcerous cabal': {
    tag: 'sorcerous cabal',
    text: () =>
      `A ${window.dice.choice([
        'guild',
        'cabal'
      ])} of mages exert great influence in this ${locationPlaceholder}. They study approved schools of magic and safeguard arcane artifacts.`,
    spawn: ({ entity: loc }) => (!location__isVillage(loc) && !location__isRemote(loc) ? 1 : 0)
  },
  'secret police': {
    tag: 'secret police',
    text: () =>
      `The ruling elite employ a cadre of fervent patriots to serve as secret police against political dissidents.`,
    spawn: ({ entity: loc }) => (location__isCity(loc) ? 1 : 0)
  },
  'templar order': {
    tag: 'templar order',
    text: () =>
      `a renowned militant religious order operates resides in this ${locationPlaceholder}. ${window.dice.choice(
        [
          'They assist troubled travelers and celebrate kindness, condemning deception and malice even when dealing with their enemies',
          'They have risen up to protect members of minority faiths',
          'They are sworn to protect the devout worshipers on pilgrimage to holy sites and safeguard religious artifacts',
          'This feared order works with powerful individuals and business interests to hunt down those who violate contracts, especially if said contracts were endorsed by a local priest',
          'They emphasize honesty and diplomacy over cruelty and aggression'
        ]
      )}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'volunteer militia': {
    tag: 'volunteer militia',
    text: () =>
      `A volunteer fighting force was created to fend off invaders where the central government is either unwilling or unable to assist.`,
    spawn: ({ entity: loc }) => (location__isCity(loc) ? 0 : 1)
  }
}
