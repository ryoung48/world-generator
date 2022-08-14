import { region__is_active, region__neighbors } from '../../../regions'
import { nation__annex_region, region__release_overlord } from '../../../regions/diplomacy/claims'
import {
  random_relation,
  region__allies,
  region__has_subject_relation,
  region__is_at_war_with,
  region__set_relation
} from '../../../regions/diplomacy/relations'
import { region__at_peace, region__wealth_percent } from '../../../regions/diplomacy/status'
import { province__sort_closest } from '../../../regions/provinces'
import { Region } from '../../../regions/types'
import { year_ms } from '../../../utilities/math/time'
import { decorated_profile, profile } from '../../../utilities/performance'
import { add_event } from '../..'
import { EventController } from '../../types'
import { event__rebellion } from '../rebellion'
import { event__war } from '../war'
import { DiplomaticEvent } from './types'

/**
 * spawns a diplomacy event for a region
 * @param agent - region to run diplomacy checks for
 */
const spawn = (agent: Region) => {
  const event: DiplomaticEvent = {
    // spawn 5-10 years in advance
    time: window.world.date + window.dice.uniform(5, 10) * year_ms,
    type: 'diplomacy',
    agent: agent.idx
  }
  add_event(event)
}

/**
 * diplomacy event tasks:
 * * change regional relations
 * * trigger wars, rebellions, and plagues
 */
class DiplomacyController extends EventController {
  public title = 'Diplomacy'
  public spawn(agent: Region) {
    spawn(agent)
  }
  public tick(event: DiplomaticEvent) {
    const nation = window.world.regions[event.agent]
    // spawn rebels if applicable
    const max_rebels = window.world.regions.length * 0.1
    const rebels =
      window.world.statistics.current.rebellions < max_rebels &&
      nation.memory.rebel_fatigue < window.world.date &&
      window.dice.random < 0.3
    if (rebels) profile({ label: 'rebellion', f: () => event__rebellion.spawn(nation) })
    // stop here if the region has been conquered
    if (region__is_active(nation)) {
      const neighbors = region__neighbors(nation).map(n => window.world.regions[n])
      const curr_year = new Date(window.world.date).getFullYear()
      restoration(nation)
      // annex subjects if applicable
      const annexed = nation.subjects
        .map(s => window.world.regions[s])
        .filter(subject => {
          return (
            region__at_peace(subject) &&
            curr_year - new Date(subject.overlord.join_date).getFullYear() > 50 &&
            neighbors.some(n => n.idx === subject.idx)
          )
        })
      annexed.forEach(subject => nation__annex_region({ subject, nation }))
      // neighboring relations
      neighbors.forEach(n => {
        restoration(n)
        if (
          !region__is_at_war_with(nation, n) && // not at war
          !nation.allies[n.idx] && // not an ally (debt)
          !n.allies[nation.idx] && // not an ally (credit)
          !region__has_subject_relation(nation, n) // not a subject / overlord
        ) {
          region__set_relation({
            relation: random_relation(),
            n1: n,
            n2: nation
          })
        }
      })
      // remove non-border allies / relations
      region__allies(nation)
        .filter(ally => {
          return !neighbors.find(n => n.idx === ally.idx)
        })
        .forEach(ally => {
          if (ally.overlord.idx === nation.idx) {
            // check of ally is a vassal
            region__release_overlord(ally)
          } else if (nation.overlord.idx === ally.idx) {
            // check of ally is the overlord
            region__release_overlord(nation)
          } else {
            region__set_relation({
              relation: 'neutral',
              n1: ally,
              n2: nation
            })
          }
        })
      Object.keys(nation.relations)
        .map(r => window.world.regions[parseInt(r)])
        .filter(r => !neighbors.find(n => n.idx === r.idx))
        .forEach(r => {
          if (r.overlord.idx !== nation.idx && !r.subjects.includes(nation.idx)) {
            delete nation.relations[r.idx]
            delete r.relations[nation.idx]
          }
        })
      // go to wat if applicable
      external_conflicts(nation, neighbors)
    }
    // spawn next diplomacy event
    spawn(nation)
  }
}

/**
 * collects taxes and tribute which restores regional wealth over time
 * @param agent - region to restore
 */
const restoration = (agent: Region) => {
  if (region__at_peace(agent)) {
    const time_passed = window.world.date - agent.memory.last_update
    const years_passed = time_passed / year_ms
    // pay tribute to suzerain if applicable
    const suzerain = window.world.regions[agent.overlord.idx]
    const tribute = suzerain ? 0.01 : 0
    // restore wealth using taxes collected after tribute is paid
    // between 6-12% every year is collected
    // TODO: vary % based on economic performance
    const taxes = window.dice.uniform(0.12, 0.06) - tribute
    agent.wealth = Math.min(
      Math.max(agent.wealth, agent.max_wealth),
      agent.max_wealth * taxes * years_passed + agent.wealth
    )
    if (tribute > 0 && suzerain) {
      suzerain.wealth = Math.min(
        Math.max(suzerain.wealth, suzerain.max_wealth * 1.5),
        agent.max_wealth * tribute * years_passed + suzerain.wealth
      )
    }
    agent.memory.last_update = window.world.date
  }
}
/**
 * attempts to start a war between nations
 * @param invader - the invading nation
 * @param neighbors - prospect neighboring nations to start a war with
 */
const _external_conflicts = (invader: Region, neighbors: Region[]) => {
  const funds = invader.wars.current.length > 0 ? 0.6 : 0.3
  // only allow x% of nations to go to war at once
  const max_wars = window.world.regions.length * 0.05
  if (
    // cannot declare war if the region has an active rebellion
    invader.rebellions.current === -1 &&
    // prevent all nations from going to war at the same time
    window.world.statistics.current.wars < max_wars &&
    // regions cannot go to war if they don't have the requisite funding
    region__wealth_percent(invader) > funds &&
    // vassal states cannot declare war (debatable)
    !window.world.regions[invader.overlord.idx]
  ) {
    // gather valid neighboring prospects
    const potentials = neighbors.filter(n => {
      // always attack (weaker) rivals
      const opinion = invader.relations[n.idx]
      const enemy = opinion === 'neutral' || opinion === 'suspicious'
      // no fighting between subject states of the same overlord
      const common_overlord =
        window.world.regions[invader.overlord.idx] && invader.overlord.idx === n.overlord.idx
      // no attacking subjects
      const is_subject = n.overlord.idx === invader.idx
      return (
        !is_subject &&
        !common_overlord &&
        enemy &&
        invader.wealth > n.wealth &&
        invader.allies[n.idx] === undefined
      )
    })
    // if there exist potential prospects to attack
    if (potentials.length > 0) {
      // always attack the closest once
      const capital = window.world.provinces[invader.capital]
      const defender = province__sort_closest(
        potentials.map(r => window.world.provinces[r.capital]),
        capital
      )[0]
      // and then start the war
      profile({
        label: 'spawn war event',
        f: () =>
          event__war.spawn({
            invader,
            defender: window.world.regions[defender.curr_nation]
          })
      })
    }
  }
}

const external_conflicts = decorated_profile(_external_conflicts)

export const event__diplomacy = new DiplomacyController()
