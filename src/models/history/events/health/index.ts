import { region__isActive, region__rebellionInProgress, world__nations } from '../../../regions'
import { region__allies, region__warRivals } from '../../../regions/diplomacy/relations'
import { region__atPeace } from '../../../regions/diplomacy/status'
import { Region } from '../../../regions/types'
import { yearMS } from '../../../utilities/math/time'
import { addEvent, logEvent } from '../..'
import { EventController, LogRecord } from '../../types'
import { HealthCheckEvent } from './types'

export const statusSplitter = '###' // used to create new lines within tooltips

/**
 * gets the current political status for a given region
 */
export const region__politics = (nation: Region): Omit<LogRecord, 'idx'> => {
  const capital = window.world.provinces[nation.capital]
  const suzerain = window.world.regions[nation.overlord.idx]
  const sovereignty = !region__isActive(nation)
    ? `Conquered by ${window.world.regions[capital.currNation].name}`
    : suzerain
    ? `vassal of ${suzerain.name}`
    : 'Sovereign'
  const text = [`${sovereignty}`]
  const { current } = nation.wars
  if (current.length > 0)
    text.push(
      `At war with ${region__warRivals(nation)
        .map(r => r.name)
        .join(', ')}`
    )
  if (region__rebellionInProgress(nation)) text.push('Civil war in progress')
  if (region__atPeace(nation)) text.push('At Peace')
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
    type: 'healthCheck',
    text: text.join(statusSplitter),
    actors: [{ idx: nation.idx, wealth: nation.wealth, maxWealth: nation.maxWealth }]
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
      type: 'healthCheck'
    }
    addEvent(event)
  }
  public tick(event: HealthCheckEvent) {
    // record health check
    window.world.regions.forEach(nation => {
      const status = region__politics(nation)
      logEvent({
        eventType: status.type,
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
    event.time = window.world.date + yearMS
    addEvent(event)
  }
}

export const event__healthCheck = new HealthCheckController()
