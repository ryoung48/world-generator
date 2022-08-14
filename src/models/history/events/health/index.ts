import { region__is_active, region__rebellion_in_progress, world__nations } from '../../../regions'
import { region__allies, region__war_rivals } from '../../../regions/diplomacy/relations'
import { region__at_peace } from '../../../regions/diplomacy/status'
import { Region } from '../../../regions/types'
import { year_ms } from '../../../utilities/math/time'
import { add_event, log_event } from '../..'
import { EventController, LogRecord } from '../../types'
import { HealthCheckEvent } from './types'

export const status_splitter = '###' // used to create new lines within tooltips

/**
 * gets the current political status for a given region
 */
export const region__politics = (nation: Region): Omit<LogRecord, 'idx'> => {
  const capital = window.world.provinces[nation.capital]
  const suzerain = window.world.regions[nation.overlord.idx]
  const sovereignty = !region__is_active(nation)
    ? `Conquered by ${window.world.regions[capital.curr_nation].name}`
    : suzerain
    ? `vassal of ${suzerain.name}`
    : 'Sovereign'
  const text = [`${sovereignty}`]
  const { current } = nation.wars
  if (current.length > 0)
    text.push(
      `At war with ${region__war_rivals(nation)
        .map(r => r.name)
        .join(', ')}`
    )
  if (region__rebellion_in_progress(nation)) text.push('Civil war in progress')
  if (region__at_peace(nation)) text.push('At Peace')
  if (nation.subjects.length > 0)
    text.push(
      `Current Subjects (${nation.subjects.length}): ${nation.subjects
        .map(s => window.world.regions[s].name)
        .join(', ')}`
    )
  const allies = region__allies(nation).filter(
    ally => ally.idx !== nation.overlord.idx && !nation.subjects.includes(ally.idx)
  )
  if (allies.length > 0)
    text.push(`Current Allies (${allies.length}): ${allies.map(idx => idx.name).join(', ')}`)
  return {
    time: window.world.date,
    title: 'Pulse Check',
    type: 'health_check',
    text: text.join(status_splitter),
    actors: [{ idx: nation.idx, wealth: nation.wealth, max_wealth: nation.max_wealth }]
  }
}

/**
 * health check tasks:
 * * report on the political status for every region
 */
class HealthCheckController extends EventController {
  public title = 'Health Check'
  public spawn() {
    const event: HealthCheckEvent = {
      time: window.world.date,
      type: 'health_check'
    }
    add_event(event)
  }
  public tick(event: HealthCheckEvent) {
    // record health check
    window.world.regions.forEach(nation => {
      const status = region__politics(nation)
      log_event({
        event_type: status.type,
        title: status.title,
        text: status.text,
        actors: [nation]
      })
    })
    // record global event counts
    window.world.statistics.past.push({
      ...window.world.statistics.current,
      regions: world__nations().length,
      time: window.world.date
    })
    // repeat every year
    event.time = window.world.date + year_ms
    add_event(event)
  }
}

export const event__health_check = new HealthCheckController()
