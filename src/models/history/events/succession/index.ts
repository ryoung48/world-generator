import { actor__birthDate, actor__expirationDate, getAge } from '../../../npcs/actors/stats/age'
import { region__isActive } from '../../../regions'
import { Region } from '../../../regions/types'
import { addEvent, logEvent } from '../..'
import { EventController } from '../../types'
import { SuccessionEvent } from './types'

const ruler__spawn = (params: { nation: Region; culture?: number }) => {
  const { nation } = params
  const culture = window.world.cultures[params.culture ?? nation.culture.ruling]
  const { succession } = nation.government
  const inherited = succession === 'hereditary'
  const successionDate = window.world.date
  const birthDate = actor__birthDate({ culture, ages: [inherited ? 1 : 30, 60] })
  const expirationDate = actor__expirationDate({
    culture,
    birthDate: birthDate,
    living: true,
    venerable: false
  })
  nation.ruler = { birthDate, successionDate, expirationDate, culture: culture.idx }
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
    start: nation.ruler.successionDate,
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
  const { ruler } = nation
  // set next election date
  // add noise to the date on the first transition of the sim
  const nextPassing = ruler.expirationDate
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
  const { birthDate } = nation.ruler
  const inherited = succession === 'hereditary'
  return `A new ruler ${inherited ? 'inherits the throne of' : 'is elected in'} ${
    nation.name
  } at age ${getAge({ birth: birthDate, ref: window.world.date })}.`
}

class SuccessionController extends EventController {
  public title = 'Succession'
  public spawn(...args: Parameters<typeof transitionLeadership>) {
    transitionLeadership(...args)
  }
  public tick(event: SuccessionEvent) {
    const { type, time, death, start } = event
    const nation = window.world.regions[event.nation]
    const { ruler } = nation
    const { succession } = nation.government
    const governmentChange = !death && succession !== 'hereditary'
    // the event is invalid and will not process in the following circumstances:
    const invalid =
      // the region was conquered
      !region__isActive(nation) ||
      // the ruler no longer rules the region (rebels took over)
      ruler.successionDate !== start ||
      // the ruler died prematurely
      ruler.expirationDate < time ||
      // the government was reformed to a non-electoral government
      governmentChange
    // create a new event with the updated ruler expiration time
    // if the event is not valid and death driven, but the ruler has not yet expired
    const stayOfExecution = !invalid && death && ruler.expirationDate > time
    if (stayOfExecution) {
      spawn({ nation, time: ruler.expirationDate, death: true })
    } else if (!invalid) {
      // otherwise process the event normally
      // find the next ruler
      transitionLeadership({ nation })
      const passing = death
      logEvent({
        eventType: type,
        title: 'Succession Event',
        text: `The current ruler ${passing ? 'has passed away' : 'steps down'} at age ${getAge({
          birth: ruler.birthDate,
          ref: window.world.date
        })}. ${successionText(nation)}`,
        actors: [nation]
      })
    }
  }
}

export const event__succession = new SuccessionController()
