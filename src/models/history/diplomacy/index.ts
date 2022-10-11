import { region__isActive, region__neighbors } from '../../regions'
import { nation__annexRegion, region__releaseOverlord } from '../../regions/diplomacy/claims'
import {
  randomRelation,
  region__allies,
  region__hasSubjectRelation,
  region__isAtWarWith,
  region__setRelation
} from '../../regions/diplomacy/relations'
import { region__atPeace, region__wealthPercent } from '../../regions/diplomacy/status'
import { province__sortClosest } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { yearMS } from '../../utilities/math/time'
import { decoratedProfile, profile } from '../../utilities/performance'
import { addEvent } from '../'
import { event__rebellion } from '../rebellion'
import { EventController } from '../types'
import { event__war } from '../war'
import { DiplomaticEvent } from './types'

/**
 * spawns a diplomacy event for a region
 * @param agent - region to run diplomacy checks for
 */
const spawn = (agent: Region) => {
  const event: DiplomaticEvent = {
    // spawn 5-10 years in advance
    time: window.world.date + window.dice.uniform(5, 10) * yearMS,
    type: 'diplomacy',
    agent: agent.idx
  }
  addEvent(event)
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
    const maxRebels = window.world.regions.length * 0.1
    const rebels =
      window.world.statistics.current.rebellions < maxRebels &&
      nation.memory.rebelFatigue < window.world.date &&
      window.dice.random < 0.3
    if (rebels) profile({ label: 'rebellion', f: () => event__rebellion.spawn(nation) })
    // stop here if the region has been conquered
    if (region__isActive(nation)) {
      const neighbors = region__neighbors(nation).map(n => window.world.regions[n])
      const currYear = new Date(window.world.date).getFullYear()
      restoration(nation)
      // annex subjects if applicable
      const annexed = nation.subjects
        .map(s => window.world.regions[s])
        .filter(subject => {
          return (
            region__atPeace(subject) &&
            currYear - new Date(subject.overlord.joinDate).getFullYear() > 50 &&
            neighbors.some(n => n.idx === subject.idx)
          )
        })
      annexed.forEach(subject => nation__annexRegion({ subject, nation }))
      // neighboring relations
      neighbors.forEach(n => {
        restoration(n)
        if (
          !region__isAtWarWith(nation, n) && // not at war
          !nation.allies[n.idx] && // not an ally (debt)
          !n.allies[nation.idx] && // not an ally (credit)
          !region__hasSubjectRelation(nation, n) // not a subject / overlord
        ) {
          region__setRelation({
            relation: randomRelation(),
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
            region__releaseOverlord(ally)
          } else if (nation.overlord.idx === ally.idx) {
            // check of ally is the overlord
            region__releaseOverlord(nation)
          } else {
            region__setRelation({
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
      externalConflicts(nation, neighbors)
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
  if (region__atPeace(agent)) {
    const timePassed = window.world.date - agent.memory.lastUpdate
    const yearsPassed = timePassed / yearMS
    // pay tribute to suzerain if applicable
    const suzerain = window.world.regions[agent.overlord.idx]
    const tribute = suzerain ? 0.01 : 0
    // restore wealth using taxes collected after tribute is paid
    // between 6-12% every year is collected
    // TODO: vary % based on economic performance
    const taxes = window.dice.uniform(0.12, 0.06) - tribute
    agent.wealth = Math.min(
      Math.max(agent.wealth, agent.maxWealth),
      agent.maxWealth * taxes * yearsPassed + agent.wealth
    )
    if (tribute > 0 && suzerain) {
      suzerain.wealth = Math.min(
        Math.max(suzerain.wealth, suzerain.maxWealth * 1.5),
        agent.maxWealth * tribute * yearsPassed + suzerain.wealth
      )
    }
    agent.memory.lastUpdate = window.world.date
  }
}
/**
 * attempts to start a war between nations
 * @param invader - the invading nation
 * @param neighbors - prospect neighboring nations to start a war with
 */
const _externalConflicts = (invader: Region, neighbors: Region[]) => {
  const funds = invader.wars.current.length > 0 ? 0.6 : 0.3
  // only allow x% of nations to go to war at once
  const maxWars = window.world.regions.length * 0.05
  if (
    // cannot declare war if the region has an active rebellion
    invader.rebellions.current === -1 &&
    // prevent all nations from going to war at the same time
    window.world.statistics.current.wars < maxWars &&
    // regions cannot go to war if they don't have the requisite funding
    region__wealthPercent(invader) > funds &&
    // vassal states cannot declare war (debatable)
    !window.world.regions[invader.overlord.idx]
  ) {
    // gather valid neighboring prospects
    const potentials = neighbors.filter(n => {
      // always attack (weaker) rivals
      const opinion = invader.relations[n.idx]
      const enemy = opinion === 'neutral' || opinion === 'suspicious'
      // no fighting between subject states of the same overlord
      const commonOverlord =
        window.world.regions[invader.overlord.idx] && invader.overlord.idx === n.overlord.idx
      // no attacking subjects
      const isSubject = n.overlord.idx === invader.idx
      return (
        !isSubject &&
        !commonOverlord &&
        enemy &&
        invader.wealth > n.wealth &&
        invader.allies[n.idx] === undefined
      )
    })
    // if there exist potential prospects to attack
    if (potentials.length > 0) {
      // always attack the closest once
      const capital = window.world.provinces[invader.capital]
      const defender = province__sortClosest(
        potentials.map(r => window.world.provinces[r.capital]),
        capital
      )[0]
      // and then start the war
      profile({
        label: 'spawn war event',
        f: () =>
          event__war.spawn({
            invader,
            defender: window.world.regions[defender.currNation]
          })
      })
    }
  }
}

const externalConflicts = decoratedProfile(_externalConflicts)

export const event__diplomacy = new DiplomacyController()
