import { recentBattleWindow } from '../../../../../../history/events/war/battles'
import { decorateText } from '../../../../../../utilities/text/decoration'
import { terrain__isWet } from '../../../../../../world/climate/terrain'
import { region__neighbors, region__nonAlliedNeighbors } from '../../../../..'
import { relation__isHostile } from '../../../../../diplomacy/relations'
import { province__findClosest } from '../../../../../provinces'
import { location__pendingInvasion, location__raiders, location__recentBattle } from '../../../..'
import { location__terrain } from '../../../../environment'
import { location__isCity, location__isVillage } from '../../../taxonomy/settlements'
import { LocationTrait } from '../../types'
import { settlement__conflict } from './types'

export const settlement__conflictTraits: Record<settlement__conflict, LocationTrait> = {
  'blood feud': {
    tag: 'blood feud',
    text: ({ entity: loc }) => {
      const { civilized, development } = window.world.regions[loc.region]
      const remote = development === 'remote'
      return `Two rival groups (${window.dice.weightedChoice([
        { v: 'nobles', w: 1 },
        { v: 'ethnic', w: 1 },
        { v: 'criminal', w: remote ? 0 : 1 },
        { v: 'religious', w: remote ? 0 : 1 },
        { v: 'tribal', w: civilized ? 0 : 1 }
      ])}) are openly fighting over ${window.dice.choice(['past crimes', 'resources'])}.`
    },
    spawn: () => 1
  },
  "coup d'état": {
    tag: "coup d'état",
    text: () =>
      `There exists a hidden plot to ${window.dice.choice([
        'peacefully',
        'violently'
      ])} overthrow the established authority.`,
    spawn: () => 1
  },
  'culled nobility': {
    tag: 'culled nobility',
    text: () => {
      return `Most of the aristocratic family heads have fallen victim to a series of political executions intended to curb their growing influence.`
    },
    spawn: () => 0.5
  },
  'dark secret': {
    tag: 'dark secret',
    text: ({ entity: loc }) => {
      return `A portion of the local citizens are secretly ${
        loc?.subtype?.includes('vamp') ? 'vampires' : window.dice.choice(['vampires', 'werewolves'])
      } (${window.dice.choice(['indulgent', 'restrained'])}).`
    },
    spawn: () => 0.5
  },
  'deadly plague': {
    tag: 'deadly plague',
    text: () =>
      `A virulent disease afflicts this site. Many pray for a cure. Others try to sell false hope.`,
    spawn: () => 1
  },
  devastation: {
    tag: 'devastation',
    text: ({ entity: loc }) => {
      const { lastInvasion } = window.world.provinces[loc.province].memory
      const event = location__recentBattle(loc) && window.world[lastInvasion.type][lastInvasion.idx]
      return `This site was recently the victim of a violent conflict and has sustained great damage (${
        event
          ? event.name
          : location__raiders(loc).length > 0
          ? 'raiders'
          : window.dice.choice(['bandits', 'titanic beast'])
      }).`
    },
    spawn: ({ entity: loc }) => {
      const plundered = location__isVillage(loc)
      return location__recentBattle(loc) ? 5 : plundered ? 0.5 : 0
    }
  },
  'enslaved workers': {
    tag: 'enslaved workers',
    text: () => {
      return `The economy of this site is heavily dependent on slave labor. A large proportion of the population is enslaved.`
    },
    spawn: ({ entity: loc }) => {
      return location__isVillage(loc) ? 1 : 0.5
    }
  },
  'food shortage': {
    tag: 'food shortage',
    text: () =>
      `Repeated bad harvests have made food very scarce in this site. The majority of the populace is clearly malnourished.`,
    spawn: () => 1
  },
  'foreign spies': {
    tag: 'foreign spies',
    text: () =>
      `A network of foreign spies is rumored to be active in this site. They gather information and sow chaos in the interest of some foreign power.`,
    spawn: ({ entity: loc }) => {
      const province = window.world.provinces[loc.province]
      const region = window.world.regions[province.currNation]
      return region__neighbors(region).some(n => {
        const neighbor = window.world.regions[n]
        const relation = region.relations[n]
        const hostile = relation__isHostile(relation)
        return neighbor.development !== 'remote' && hostile
      })
        ? 1
        : 0
    }
  },
  'foreign occupation': {
    tag: 'foreign occupation',
    text: () =>
      `This site has recently been conquered and is occupied by enemy forces. Treatment of natives is harsh to deter insurgencies.`,
    spawn: ({ entity: loc }) => {
      const province = window.world.provinces[loc.province]
      const { lastInvasion } = province.memory
      const event = window.world[lastInvasion.type]?.[lastInvasion.idx]
      return loc.hub &&
        event?.type === 'war' &&
        lastInvasion.time > window.world.date - recentBattleWindow &&
        !event.result &&
        event.defender.idx !== province.currNation
        ? 1000
        : 0
    }
  },
  'foul sorcery': {
    tag: 'foul sorcery',
    text: () =>
      `A hidden cabal of ${window.dice.choice([
        'witches',
        'necromancers',
        'warlocks'
      ])} operates within this site. They study forbidden magic and conduct dark experiments in search of great power.`,
    spawn: () => 1
  },
  'heretical faith': {
    tag: 'heretical faith',
    text: () =>
      `A new ${window.dice.choice([
        'orthodox',
        'progressive',
        'syncretic',
        'dark'
      ])} religious cult${
        window.dice.random > 0.8 ? ' with political undertones' : ''
      } threatens to destabilize the established authority.`,
    spawn: () => 1
  },
  'imminent invasion': {
    tag: 'imminent invasion',
    text: ({ entity: loc }) => {
      const { nextInvasion } = window.world.provinces[loc.province].memory
      const event = window.world[nextInvasion.type][nextInvasion.idx]
      if (event.type === 'war') {
        const { nextBattle, defender } = event
        return `The forces of ${decorateText({
          link: window.world.regions[nextBattle.aggressor]
        })} prepare to ${
          nextBattle.aggressor === defender.idx ? 'retake' : 'assault'
        } this site. (${event.name})`
      } else {
        const { nextBattle: nextBattle } = event
        return `The ${nextBattle.attacker} prepare to capture this site. (${event.name})`
      }
    },
    spawn: ({ entity: loc }) => {
      return location__pendingInvasion(loc) ? 1000 : 0
    }
  },
  'natural disaster': {
    tag: 'natural disaster',
    text: ({ entity: loc }) => {
      const { coastal } = loc
      const { terrain } = location__terrain(loc)
      return `A recent ${window.dice.weightedChoice([
        { v: 'flood', w: terrain__isWet(terrain) || coastal ? 1 : 0 },
        { v: 'earthquake', w: 1 },
        { v: 'volcanic eruption', w: 0.5 },
        { v: 'tsunami', w: coastal ? 1 : 0 },
        { v: 'drought', w: coastal ? 0 : 1 },
        { v: 'tornado', w: location__isCity(loc) ? 0 : 0.5 },
        { v: 'wildfire', w: 1 },
        { v: 'hurricane', w: coastal ? 1 : 0 }
      ])} has ravaged this site.`
    },
    spawn: () => 1
  },
  'poacher problems': {
    tag: 'poacher problems',
    text: () =>
      `Outlaws are illegal hunting ${window.dice.choice(['endangered', 'sacred'])} creatures.`,
    spawn: ({ entity: loc }) => {
      const region = window.world.regions[loc.region]
      return region.development === 'civilized' ? 0 : 1
    }
  },
  'political asylum': {
    tag: 'political asylum',
    text: () =>
      `An exiled ${window.dice.choice([
        'ruler',
        'advisor',
        'aristocrat',
        'high priest',
        'rebel leader'
      ])} has been granted asylum and resides within this site.`,
    spawn: () => 0.5
  },
  'rebel stronghold': {
    tag: 'rebel stronghold',
    text: () =>
      `A major group of rebels are actively working against the established authority operate within this site.`,
    spawn: () => 0.5
  },
  'reformation edict': {
    tag: 'reformation edict',
    text: () =>
      `A major to change to an existing custom (${window.dice.choice([
        'taxes',
        'land',
        'immigration',
        'tolerance',
        'cultural',
        'trade',
        'military',
        'slavery',
        'bureaucracy'
      ])}) has been proposed. It is a controversial subject that has sparked great debate.`,
    spawn: ({ entity: loc }) => (location__isCity(loc) ? 1 : 0)
  },
  'stolen tribute': {
    tag: 'stolen tribute',
    text: () =>
      `The taxes owed by this site have been stolen and need to be reacquired before officials begin an inquiry.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 1 : 0)
  },
  'succession dispute': {
    tag: 'succession dispute',
    text: () =>
      "The site's rule is due to pass to the next generation, but there are multiple claimants to it.",
    spawn: () => 0.5
  },
  'tenuous diplomacy': {
    tag: 'tenuous diplomacy',
    text: ({ entity: loc }) => {
      const province = window.world.provinces[loc.province]
      const nation = window.world.regions[province.currNation]
      const envoy =
        window.world.regions[
          province__findClosest(
            region__nonAlliedNeighbors(nation).map(
              n => window.world.provinces[window.world.regions[n].capital]
            ),
            province
          ).currNation
        ]
      const relation = nation.relations[envoy.idx] ?? 'neutral'
      const friendly = relation === 'friendly' || relation === 'neutral'
      return `An envoy from ${decorateText({
        link: envoy
      })} has arrived to negotiate a possible ${
        friendly ? 'alliance' : 'end to hostilities'
      }. Some parties seek its fruition and others its downfall.`
    },
    spawn: ({ entity: loc }) => {
      const province = window.world.provinces[loc.province]
      const nation = window.world.regions[province.currNation]
      return region__nonAlliedNeighbors(nation).length > 0 ? (location__isCity(loc) ? 1 : 0) : 0
    }
  },
  'toxic economy': {
    tag: 'toxic economy',
    text: () => {
      return `This site is reliant on ${window.dice.choice([
        'the manufacture an addictive substance',
        'the hazardous extraction of a valuable resource'
      ])}.`
    },
    spawn: () => 0.5
  },
  'wanted outlaw': {
    tag: 'wanted outlaw',
    text: () =>
      `Some nefarious outlaw has made his home in or near this site, and there are locals that feel obligated to protect him for some reason.`,
    spawn: () => 1
  },
  'warlord rule': {
    tag: 'warlord rule',
    conflicts: ['regency council'],
    text: ({ entity: loc }) =>
      `A ${
        location__raiders(loc).length > 0 ? 'raider' : 'bandit'
      } warlord has ${window.dice.choice([
        'taken control over this site and rules with an iron fist',
        'made an agreement with the local authorities to create a safe haven from which raids on neighboring settlements can be staged'
      ])}.`,
    spawn: ({ entity: loc }) => (location__isVillage(loc) ? 0.5 : 0)
  },
  'witch hunts': {
    tag: 'witch hunts',
    text: () => `Magic users are being hunted and executed due to a recent transgression.`,
    spawn: () => 1
  }
}
