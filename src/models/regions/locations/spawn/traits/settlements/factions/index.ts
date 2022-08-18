import { decorateText } from '../../../../../../utilities/text/decoration'
import { region__nation } from '../../../../..'
import { region__colonists } from '../../../../../diplomacy/colonies'
import { location__isRemote, location__missionaries, location__prospectColony } from '../../../..'
import { location__isCity, location__isVillage } from '../../../taxonomy/settlements'
import { LocationTrait } from '../../types'
import { settlement__faction } from './types'

export const settlement__factionTraits: Record<settlement__faction, LocationTrait> = {
  'artisan guilds': {
    tag: 'artisan guilds',
    text: () =>
      `Local artisan guilds exert great influence in this site seeking to protect trade secrets and their group members.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'criminal bosses': {
    tag: 'criminal bosses',
    text: () => `One or more criminal networks exert great influence in this site.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'colonial outpost': {
    tag: 'colonial outpost',
    conflicts: ['colonial embassies'],
    text: ({ entity: loc }) => {
      const region = window.world.regions[loc.region]
      const colony = window.dice.choice(region.colonialPresence.colonies)
      return `A foreign power (${decorateText({
        link: region__nation(window.world.regions[colony.nation])
      })}) has established a colony (${colony.tag}) on this site.`
    },
    spawn: ({ entity: loc }) => location__prospectColony({ loc })
  },
  'colonial embassies': {
    tag: 'colonial embassies',
    conflicts: ['colonial outpost'],
    text: ({ entity: loc }) => {
      const region = window.world.regions[loc.region]
      const colonists = region__colonists(region)
      return `This sites hosts embassies for each colonial authority present in the region: ${colonists
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
        .join(', ')}.`
    },
    spawn: () => 0
  },
  'druidic circle': {
    tag: 'druidic circle',
    text: () =>
      `A circle of druids who reside in this site. They ${window.dice.choice([
        'protect a nearby sacred grove',
        'combat spirit incursions'
      ])}.`,
    spawn: () => 1
  },
  'foreign enclave': {
    tag: 'foreign enclave',
    text: () => {
      return `This site hosts a substantial foreign minority (${window.dice.choice([
        'immigrants',
        'refugees'
      ])}).`
    },
    spawn: () => 1
  },
  'guard outpost': {
    tag: 'guard outpost',
    text: () =>
      `The local guard uses this site as a strong point to launch patrols and keep watch on the road.`,
    spawn: () => 0
  },
  'knightly order': {
    tag: 'knightly order',
    text: () =>
      `A renowned knightly order operates resides in this site. ${window.dice.choice([
        'They assist troubled travelers and celebrate kindness, condemning deception and malice even when dealing with their enemies',
        'They were originally founded as the royal guard for high-ranking government officials long ago',
        'They emphasize honesty and diplomacy over cruelty and aggression'
      ])}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'legendary figure': {
    tag: 'legendary figure',
    text: () =>
      `An individual of great renown (${window.dice.choice([
        'artisan',
        'artist',
        'military',
        'arcane',
        'religious',
        'scholar',
        'political',
        'criminal'
      ])}) resides within this site.`,
    spawn: () => 1
  },
  'major temple': {
    tag: 'major temple',
    text: () =>
      `This site is home to a prominent temple. Locals are obliged to respect the wishes of its high clergy.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'mercenary company': {
    tag: 'mercenary company',
    text: () =>
      `A renowned mercenary company operates within this site. ${window.dice.choice([
        'These soldiers are dedicated to conducting warfare mercilessly and with extreme brutality in order to bring a swift end to conflicts',
        'They are warriors with a solemn reverence for the sanctity of contracts, they fulfill their obligations with unemotional, unswerving commitment and without moral judgment'
      ])}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'merchants guild': {
    tag: 'merchants guild',
    text: () =>
      `A powerful merchants guild exists in this site seeking to regulate the economy and ensure fair prices.`,
    spawn: ({ entity: loc }) => (!location__isVillage(loc) && !location__isRemote(loc) ? 1 : 0)
  },
  'military outpost': {
    tag: 'military outpost',
    text: () => `A military garrison is located on this site.`,
    spawn: () => 0
  },
  'missionary activity': {
    tag: 'missionary activity',
    text: ({ entity: loc }) => {
      const missionary = window.dice.choice(location__missionaries(loc))
      const religion = window.world.religions[missionary.religion.state]
      return `Missionaries from ${decorateText({
        link: missionary
      })} work to spread their ${decorateText({
        label: 'faith',
        tooltip: religion.name
      })} in this site.`
    },
    spawn: ({ entity: loc }) => {
      const religions = location__missionaries(loc)
      return religions.length > 0 ? 1 : 0
    }
  },
  'nomadic populace': {
    tag: 'nomadic populace',
    text: ({ entity: loc }) => {
      return `Traditionalist, ${window.dice.weightedChoice([
        { v: 'rural', w: 1 },
        { v: 'seafaring', w: loc.coastal ? 1 : 0 }
      ])}, nominally migratory ${window.dice.choice(['native', 'diaspora'])} ${window.dice.choice([
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
    text: () => `This site is a safe haven for pirates.`,
    spawn: ({ entity: loc }) => (loc.coastal ? 1 : 0)
  },
  'prestigious academy': {
    tag: 'prestigious academy',
    text: () =>
      `A ${window.dice.choice([
        'prominent',
        'rising',
        'waning'
      ])} institution of higher learning is located within this site.`,
    spawn: ({ entity: loc }) => (!location__isRemote(loc) && !location__isVillage(loc) ? 1 : 0)
  },
  'prominent monastery': {
    tag: 'prominent monastery',
    text: () =>
      `This site is home to a prominent monastery. The monks there are dedicated to ${window.dice.choice(
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
      ])} of mages exert great influence in this site. They study approved schools of magic and safeguard arcane artifacts.`,
    spawn: ({ entity: loc }) => (!location__isVillage(loc) && !location__isRemote(loc) ? 1 : 0)
  },
  'secret police': {
    tag: 'secret police',
    text: () =>
      `A faction of fervent patriots employed by the central government to suppress political dissidents.`,
    spawn: ({ entity: loc }) => (location__isCity(loc) ? 1 : 0)
  },
  'templar order': {
    tag: 'templar order',
    text: () =>
      `A militant religious order operates resides in this site. ${window.dice.choice([
        'They assist troubled travelers and celebrate kindness, condemning deception and malice even when dealing with their enemies',
        'They have risen up to protect members of minority faiths',
        'They are sworn to protect the devout worshipers on pilgrimage to holy sites and safeguard religious artifacts',
        'This feared order works with powerful individuals and business interests to hunt down those who violate contracts, especially if said contracts were endorsed by a local priest',
        'They emphasize honesty and diplomacy over cruelty and aggression'
      ])}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0 : 1)
  },
  'volunteer militia': {
    tag: 'volunteer militia',
    text: () =>
      `A volunteer fighting force was created to fend off invaders where the central government is either unwilling or unable to assist.`,
    spawn: ({ entity: loc }) => (location__isCity(loc) ? 0 : 1)
  }
}
