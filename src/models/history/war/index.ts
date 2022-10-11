import { region__isActive, region__population } from '../../regions'
import {
  region__allies,
  region__allyRelation,
  region__hasSameReligion,
  region__hasSubjectRelation,
  region__neutralReason,
  region__setRelation
} from '../../regions/diplomacy/relations'
import {
  region__atPeace,
  region__overextended,
  region__wealthPercent
} from '../../regions/diplomacy/status'
import { Region } from '../../regions/types'
import { romanize } from '../../utilities/text'
import { logEvent } from '..'
import { EventController } from '../types'
import { war__background } from './background'
import { war__battle, war__plan } from './battles'
import { war__ceasefire, war__resolve } from './truce'
import { WarEvent } from './types'

class WarController extends EventController {
  public title = 'War'
  public tick(event: WarEvent) {
    const invader = window.world.regions[event.invader]
    const defender = window.world.regions[event.defender]
    const war = window.world.wars[event.idx]
    const battleground = window.world.provinces[war.nextBattle.province]
    const aggressor = window.world.regions[war.nextBattle.aggressor]
    const path = battleground.neighbors
      .map(n => window.world.provinces[n])
      .some(n => n.currNation === aggressor.idx)
    battleground.memory.nextInvasion.time = -Infinity
    if (!region__isActive(aggressor)) {
      // the war was ended by external forces
      war__resolve(event, { external: true })
    } else if (invader.wealth <= 0 && defender.wealth <= 0) {
      // both parties are exhausted => truce
      war__ceasefire(event)
    } else if (invader.rebellions.current !== -1 && defender.rebellions.current !== -1) {
      // both parties unstable => truce
      war__ceasefire(event)
    } else if (!path) {
      // if there no longer exists a path, replan
      war__plan({ event, aggressor })
    } else {
      // otherwise simulate the battle
      war__battle(event)
    }
  }
  public spawn(args: { invader: Region; defender: Region }) {
    const { invader, defender } = args
    // determine the goal of the invader
    // will vassalize if overextended
    const vassalize = region__overextended(invader)
    const idx = window.world.wars.length
    // get the reason for the invasion
    const background = war__background({ invader, defender })
    // start the invasion
    region__invade({
      invader,
      defender,
      war: idx,
      holyWar: background.type === 'jihad' || background.type === 'excommunication'
    })
    const type = 'war'
    // how many wars have been fought by these two regions (used for the title)
    const rank = invader.wars.past.reduce((sum, i) => {
      const past = window.world.wars[i]
      const participant = past.invader.idx === defender.idx || past.defender.idx === defender.idx
      return sum + (participant ? 1 : 0)
    }, 1)
    // sort names for consistent titles
    const sorted = [invader.name, defender.name].sort().join('-')
    const title = `${sorted}${rank > 1 ? ` ${romanize(rank)}` : ''}`
    window.world.wars.push({
      idx,
      name: title,
      start: window.world.date,
      end: Infinity,
      type: 'war',
      background,
      invader: {
        idx: invader.idx,
        allies: gatheredAllies(invader).concat(neutralAllies(invader)),
        wealth: nonAlliedWealth(invader),
        wealthPercent: region__wealthPercent(invader),
        pop: region__population(invader)
      },
      defender: {
        idx: defender.idx,
        allies: gatheredAllies(defender).concat(neutralAllies(defender)),
        wealth: nonAlliedWealth(defender),
        wealthPercent: region__wealthPercent(defender),
        pop: region__population(defender)
      },
      events: [],
      nextBattle: { province: -1, aggressor: invader.idx }
    })
    const record = {
      title: `Start of War: ${window.world.wars[idx].name}`,
      text: background.text,
      eventIdx: idx,
      eventType: type
    }
    logEvent({ ...record, actors: [invader, defender], eventType: type })
    const event: WarEvent = {
      idx,
      time: window.world.date,
      type,
      title,
      invader: invader.idx,
      defender: defender.idx,
      vassalize,
      ownedProvinces: {
        invader: [...invader.provinces],
        defender: [...defender.provinces]
      },
      battles: {},
      startingWealth: invader.wealth
    }
    war__plan({ event, aggressor: invader, init: true })
  }
}

/**
 * officially start the war
 * @param params.invader - the invading nation
 * @param params.defender - the nation being invaded
 * @param params.war - the war index
 * @param params.holy_war - is this war driven by religion?
 */
const region__invade = (params: {
  invader: Region
  defender: Region
  war: number
  holyWar?: boolean
}) => {
  const { invader, defender, war, holyWar } = params
  // add the war to each actor's list of wars
  invader.wars.current.push(war)
  defender.wars.current.push(war)
  // increment the global war count
  window.world.statistics.current.wars += 1
  // set the relation between actors to rival
  region__setRelation({ relation: 'at war', n1: invader, n2: defender })
  // gather defender's allies
  const defenderAllies = region__allies(defender)
  defenderAllies
    // nations allied to both remain neutral
    .filter(ally => region__isActive(ally) && invader.allies[ally.idx] === undefined)
    // allies cannot double commit
    .filter(ally => region__atPeace(ally) && defender.allies[ally.idx] === 0)
    .forEach(ally => {
      const contrib = ally.wealth * 0.5
      defender.wealth += contrib
      ally.wealth -= contrib
      defender.allies[ally.idx] = contrib
    })
  const invaderAllies = region__allies(invader)
  invaderAllies
    // nations allied to both remain neutral
    .filter(ally => region__isActive(ally) && defender.allies[ally.idx] === undefined)
    // gather invader's vassals / overlord / fellow crusaders
    .filter(ally => {
      const crusader = holyWar && region__hasSameReligion(invader, ally)
      return crusader || region__hasSubjectRelation(invader, ally)
    })
    // allies cannot double commit
    .filter(ally => region__atPeace(ally) && invader.allies[ally.idx] === 0)
    .forEach(ally => {
      const contrib = ally.wealth * 0.5
      invader.wealth += contrib
      ally.wealth -= contrib
      invader.allies[ally.idx] = contrib
    })
}

/**
 * gets each of a region's ally and its respective relation
 */
const gatheredAllies = (region: Region) =>
  Object.entries(region.allies)
    .filter(([, v]) => v > 0)
    .map(([k]) => parseInt(k))
    .map(idx => {
      const ally = window.world.regions[idx]
      return { idx, relation: region__allyRelation({ ref: region, ally }) }
    })

/**
 * gets the region wealth that is not owed to allies
 * @param region
 * @returns {number} total wealth not indebted
 */
const nonAlliedWealth = (region: Region) =>
  region.wealth - Object.values(region.allies).reduce((sum, v) => sum + v, 0)

/**
 * get all allies who have not committed resources to the cause with reasons why
 * @param region
 * @returns
 */
const neutralAllies = (region: Region) =>
  Object.entries(region.allies)
    .filter(([, v]) => v === 0)
    .map(([k]) => parseInt(k))
    .map(idx => {
      const ally = window.world.regions[idx]
      const relation = region__allyRelation({ ref: region, ally, noFunds: true })
      const reason = region__neutralReason(ally)
      return { idx, relation: `${relation} (${reason})`, neutral: true }
    })

export const event__war = new WarController()
