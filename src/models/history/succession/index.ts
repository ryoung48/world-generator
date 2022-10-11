import { actor__plan } from '../../npcs/actors/history/events/planning'
import { actor__birthDate, actor__expirationDate, getAge } from '../../npcs/actors/stats/age'
import { region__isActive } from '../../regions'
import { Region } from '../../regions/types'
import { addEvent, logEvent } from '..'
import { event__encode } from '../encoding'
import { EventController } from '../types'
import { SuccessionEvent } from './types'

const addRuler = (params: {
  nation: Region
  birth: number
  death: number
  dynasty: number
  parent?: number
  actor?: number
}) => {
  const { nation, birth, death, dynasty, parent, actor } = params
  const culture = window.world.cultures[nation.culture.ruling]
  nation.ruler = window.world.actorPlans.length
  const spawned = window.world.actors[actor]
  const finalized = spawned?.history?.events?.length > 0
  window.world.actorPlans.push({
    birth,
    death,
    region: nation.idx,
    culture: culture.idx,
    gender: culture.lineage,
    dynasty,
    parent,
    actor,
    events: !finalized
      ? actor__plan({
          culture: culture.idx,
          birth,
          death,
          events: [],
          occupation: { key: 'noble (major)' }
        })
      : [...spawned.history.events]
  })
  if (!finalized && spawned) {
    spawned.history.events = [...window.world.actorPlans[nation.ruler].events]
  }
}

const dynasty__spawn = (params: { nation: Region }) => {
  const { nation } = params
  const culture = window.world.cultures[nation.culture.ruling]
  const birth = actor__birthDate({ culture, ages: [25, 60] })
  const death = actor__expirationDate({ culture, birthDate: birth, living: true, venerable: false })
  addRuler({ nation, birth, death, dynasty: window.world.dynasties.length })
  window.world.dynasties.push('')
}

const ruler__spawn = (params: { nation: Region }) => {
  const { nation } = params
  const { succession } = nation.government
  const culture = window.world.cultures[nation.culture.ruling]
  if (succession !== 'hereditary') return dynasty__spawn({ nation })
  else {
    const current = window.world.actorPlans[nation.ruler]
    if (!current) return dynasty__spawn({ nation })
    const heirs = current.events
      .map(e => window.world.actorEvents[e])
      .filter(
        event =>
          event.type === 'child' &&
          event.gender === culture.lineage &&
          event.expires > window.world.date
      )
    const crownPrince = heirs.slice(1).reduce((eldest, current) => {
      return eldest.time < current.time ? eldest : current
    }, heirs[0])
    if (!crownPrince) return dynasty__spawn({ nation })
    addRuler({
      nation,
      birth: crownPrince.time,
      death: crownPrince.expires,
      dynasty: current.dynasty,
      parent: nation.ruler,
      actor: crownPrince.actor
    })
    current.heir = nation.ruler
  }
}

/**
 * creates a new succession event
 * @param params.nation - the reference nation
 * @param params.time - the time of that the succession will take place
 * @param params.death - will the event be triggered by the ruler's death?
 */
const spawn = (params: { nation: Region; time: number; death: boolean }) => {
  const { nation, time, death } = params
  const event: SuccessionEvent = {
    time,
    type: 'succession',
    nation: nation.idx,
    ruler: nation.ruler,
    death
  }
  addEvent(event)
}

/**
 * selects a new ruler for the specified nation
 * @param params.nation - nation whose leader is being transitioned
 * @param params.init - is this the first transition in the sim?
 * @param params.ruler - pre-generated ruler (used by rebels)
 * @returns the new ruler
 */
const transitionLeadership = (params: { nation: Region; init?: boolean; ruler?: number }) => {
  const { nation, init } = params
  // generate the new ruler
  ruler__spawn({ nation })
  const ruler = window.world.actorPlans[nation.ruler]
  // set next election date
  // add noise to the date on the first transition of the sim
  const nextPassing = ruler.death
  // get the date of the next succession
  // if monarchy or the leader expires before the next election date - use expiration date
  // otherwise use the next election date
  const nextSuccession = nextPassing
  // record the succession event on first transition
  if (init) {
    logEvent({
      eventType: 'succession',
      title: 'Succession Event',
      text: successionText(nation),
      actors: [nation]
    })
  }
  spawn({ nation, time: nextSuccession, death: true })
}

/**
 * describes the transition based on government type
 * @param nation - reference nation
 * @param ruler - reference ruler
 * @returns {text} textual transition description
 */
const successionText = (nation: Region) => {
  const { succession } = nation.government
  const ruler = window.world.actorPlans[nation.ruler]
  const inherited = succession === 'hereditary'
  return `${event__encode({ entity: nation.ruler, type: 'succession' })} ${
    inherited ? 'inherits the throne of' : 'is elected in'
  } ${nation.name} at age ${getAge({ birth: ruler.birth, ref: window.world.date })}.`
}

class SuccessionController extends EventController {
  public title = 'Succession'
  public spawn(...args: Parameters<typeof transitionLeadership>) {
    transitionLeadership(...args)
  }
  public tick(event: SuccessionEvent) {
    const { type, time, death } = event
    const nation = window.world.regions[event.nation]
    const ruler = window.world.actorPlans[nation.ruler]
    const encoded = event__encode({ entity: nation.ruler, type: 'succession' })
    const { succession } = nation.government
    const governmentChange = !death && succession !== 'hereditary'
    // the event is invalid and will not process in the following circumstances:
    const invalid =
      // the region was conquered
      !region__isActive(nation) ||
      // the ruler no longer rules the region (rebels took over)
      nation.ruler !== event.ruler ||
      // the ruler died prematurely
      ruler.death < time ||
      // the government was reformed to a non-electoral government
      governmentChange
    // create a new event with the updated ruler expiration time
    // if the event is not valid and death driven, but the ruler has not yet expired
    const stayOfExecution = !invalid && death && ruler.death > time
    if (stayOfExecution) {
      spawn({ nation, time: ruler.death, death: true })
    } else if (!invalid) {
      // otherwise process the event normally
      // find the next ruler
      transitionLeadership({ nation })
      const passing = death
      logEvent({
        eventType: type,
        title: 'Succession Event',
        text: `${encoded} ${passing ? 'has passed away' : 'steps down'} at age ${getAge({
          birth: ruler.birth,
          ref: window.world.date
        })}. ${successionText(nation)}`,
        actors: [nation]
      })
    }
  }
}

export const event__succession = new SuccessionController()
