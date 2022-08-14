import { recent_battle_window } from '../../../../../../history/events/war/battles'
import { decorate_text } from '../../../../../../utilities/text/decoration'
import { terrain__is_wet } from '../../../../../../world/climate/terrain'
import { region__neighbors, region__non_allied_neighbors } from '../../../../..'
import { relation__is_hostile } from '../../../../../diplomacy/relations'
import { province__find_closest } from '../../../../../provinces'
import { location__pending_invasion, location__raiders, location__recent_battle } from '../../../..'
import { location__terrain } from '../../../../environment'
import { location__is_city, location__is_village } from '../../../taxonomy/settlements'
import { LocationTrait } from '../../types'
import { settlement__conflict } from './types'

export const settlement__conflict_traits: Record<settlement__conflict, LocationTrait> = {
  'blood feud': {
    tag: 'blood feud',
    text: ({ entity: loc }) => {
      const { civilized, development } = window.world.regions[loc.region]
      const remote = development === 'remote'
      return `Two rival groups (${window.dice.weighted_choice([
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
      const { last_invasion } = window.world.provinces[loc.province].memory
      const event =
        location__recent_battle(loc) && window.world[last_invasion.type][last_invasion.idx]
      return `This site was recently the victim of a violent conflict and has sustained great damage (${
        event
          ? decorate_text({ link: event })
          : location__raiders(loc).length > 0
          ? 'raiders'
          : window.dice.choice(['bandits', 'titanic beast'])
      }).`
    },
    spawn: ({ entity: loc }) => {
      const plundered = location__is_village(loc)
      return location__recent_battle(loc) ? 5 : plundered ? 0.5 : 0
    }
  },
  'enslaved workers': {
    tag: 'enslaved workers',
    text: () => {
      return `The economy of this site is heavily dependent on slave labor. A large proportion of the population is enslaved.`
    },
    spawn: ({ entity: loc }) => {
      return location__is_village(loc) ? 1 : 0.5
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
      const region = window.world.regions[province.curr_nation]
      return region__neighbors(region).some(n => {
        const neighbor = window.world.regions[n]
        const relation = region.relations[n]
        const hostile = relation__is_hostile(relation)
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
      const { last_invasion } = province.memory
      const event = window.world[last_invasion.type]?.[last_invasion.idx]
      return loc.hub &&
        event?.type === 'war' &&
        last_invasion.time > window.world.date - recent_battle_window &&
        !event.result &&
        event.defender.idx !== province.curr_nation
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
      const { next_invasion } = window.world.provinces[loc.province].memory
      const event = window.world[next_invasion.type][next_invasion.idx]
      if (event.type === 'war') {
        const { next_battle, defender } = event
        return `The forces of ${decorate_text({
          link: window.world.regions[next_battle.aggressor]
        })} prepare to ${
          next_battle.aggressor === defender.idx ? 'retake' : 'assault'
        } this site. (${decorate_text({
          link: event
        })})`
      } else {
        const { next_battle } = event
        return `The ${next_battle.attacker} prepare to capture this site. (${decorate_text({
          link: event
        })})`
      }
    },
    spawn: ({ entity: loc }) => {
      return location__pending_invasion(loc) ? 1000 : 0
    }
  },
  'natural disaster': {
    tag: 'natural disaster',
    text: ({ entity: loc }) => {
      const { coastal } = loc
      const { terrain } = location__terrain(loc)
      return `A recent ${window.dice.weighted_choice([
        { v: 'flood', w: terrain__is_wet(terrain) || coastal ? 1 : 0 },
        { v: 'earthquake', w: 1 },
        { v: 'volcanic eruption', w: 0.5 },
        { v: 'tsunami', w: coastal ? 1 : 0 },
        { v: 'drought', w: coastal ? 0 : 1 },
        { v: 'tornado', w: location__is_city(loc) ? 0 : 0.5 },
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
    spawn: ({ entity: loc }) => (location__is_city(loc) ? 1 : 0)
  },
  'stolen tribute': {
    tag: 'stolen tribute',
    text: () =>
      `The taxes owed by this site have been stolen and need to be reacquired before officials begin an inquiry.`,
    spawn: ({ entity: loc }) => (location__is_village(loc) ? 1 : 0)
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
      const nation = window.world.regions[province.curr_nation]
      const envoy =
        window.world.regions[
          province__find_closest(
            region__non_allied_neighbors(nation).map(
              n => window.world.provinces[window.world.regions[n].capital]
            ),
            province
          ).curr_nation
        ]
      const relation = nation.relations[envoy.idx] ?? 'neutral'
      const friendly = relation === 'friendly' || relation === 'neutral'
      return `An envoy from ${decorate_text({
        link: envoy
      })} has arrived to negotiate a possible ${
        friendly ? 'alliance' : 'end to hostilities'
      }. Some parties seek its fruition and others its downfall.`
    },
    spawn: ({ entity: loc }) => {
      const province = window.world.provinces[loc.province]
      const nation = window.world.regions[province.curr_nation]
      return region__non_allied_neighbors(nation).length > 0 ? (location__is_city(loc) ? 1 : 0) : 0
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
    spawn: ({ entity: loc }) => (location__is_village(loc) ? 0.5 : 0)
  },
  'witch hunts': {
    tag: 'witch hunts',
    text: () => `Magic users are being hunted and executed due to a recent transgression.`,
    spawn: () => 1
  }
}
