import { actor__birth_date, actor__expiration_date, get_age } from '../../../npcs/actors/stats/age'
import { region__is_active } from '../../../regions'
import { Region } from '../../../regions/types'
import { add_event, log_event } from '../..'
import { EventController } from '../../types'
import { SuccessionEvent } from './types'

const ruler__spawn = (params: { nation: Region; culture?: number }) => {
  const { nation } = params
  const culture = window.world.cultures[params.culture ?? nation.culture.ruling]
  const { succession } = nation.government
  const inherited = succession === 'hereditary'
  const succession_date = window.world.date
  const birth_date = actor__birth_date({ culture, ages: [inherited ? 1 : 30, 60] })
  const expiration_date = actor__expiration_date({
    culture,
    birth_date,
    living: true,
    venerable: false
  })
  nation.ruler = { birth_date, succession_date, expiration_date, culture: culture.idx }
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
    start: nation.ruler.succession_date,
    death
  }
  add_event(event)
}

/**
 * selects a new ruler for the specified nation
 * @param params.nation - nation whose leader is being transitioned
 * @param params.init - is this the first transition in the sim?
 * @param params.ruler - pre-generated ruler (used by rebels)
 * @returns the new ruler
 */
const transition_leadership = (params: { nation: Region; init?: boolean; ruler?: number }) => {
  const { nation, init } = params
  // generate the new ruler
  ruler__spawn({ nation })
  const { ruler } = nation
  // set next election date
  // add noise to the date on the first transition of the sim
  const next_passing = ruler.expiration_date
  // get the date of the next succession
  // if monarchy or the leader expires before the next election date - use expiration date
  // otherwise use the next election date
  const next_succession = next_passing
  // record the succession event on first transition
  if (init) {
    log_event({
      event_type: 'succession',
      title: 'Succession Event',
      text: succession_text(nation),
      actors: [nation]
    })
  }
  spawn({ nation, time: next_succession, death: true })
}

/**
 * describes the transition based on government type
 * @param nation - reference nation
 * @param ruler - reference ruler
 * @returns {text} textual transition description
 */
const succession_text = (nation: Region) => {
  const { succession } = nation.government
  const { birth_date } = nation.ruler
  const inherited = succession === 'hereditary'
  return `A new ruler ${inherited ? 'inherits the throne of' : 'is elected in'} ${
    nation.name
  } at age ${get_age({ birth: birth_date, ref: window.world.date })}.`
}

class SuccessionController extends EventController {
  public title = 'Succession'
  public spawn(...args: Parameters<typeof transition_leadership>) {
    transition_leadership(...args)
  }
  public tick(event: SuccessionEvent) {
    const { type, time, death, start } = event
    const nation = window.world.regions[event.nation]
    const { ruler } = nation
    const { succession } = nation.government
    const government_change = !death && succession !== 'hereditary'
    // the event is invalid and will not process in the following circumstances:
    const invalid =
      // the region was conquered
      !region__is_active(nation) ||
      // the ruler no longer rules the region (rebels took over)
      ruler.succession_date !== start ||
      // the ruler died prematurely
      ruler.expiration_date < time ||
      // the government was reformed to a non-electoral government
      government_change
    // create a new event with the updated ruler expiration time
    // if the event is not valid and death driven, but the ruler has not yet expired
    const stay_of_execution = !invalid && death && ruler.expiration_date > time
    if (stay_of_execution) {
      spawn({ nation, time: ruler.expiration_date, death: true })
    } else if (!invalid) {
      // otherwise process the event normally
      // find the next ruler
      transition_leadership({ nation })
      const passing = death
      log_event({
        event_type: type,
        title: 'Succession Event',
        text: `The current ruler ${passing ? 'has passed away' : 'steps down'} at age ${get_age({
          birth: ruler.birth_date,
          ref: window.world.date
        })}. ${succession_text(nation)}`,
        actors: [nation]
      })
    }
  }
}

export const event__succession = new SuccessionController()
