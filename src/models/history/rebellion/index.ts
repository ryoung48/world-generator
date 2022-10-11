import { nation__regionalTerritories, region__neighbors } from '../../regions'
import { developmentMap } from '../../regions/development'
import { region__formattedWealth } from '../../regions/diplomacy/status'
import { Region } from '../../regions/types'
import { yearMS } from '../../utilities/math/time'
import { decorateText } from '../../utilities/text/decoration'
import { logEvent } from '..'
import { event__encode } from '../encoding'
import { EventController } from '../types'
import { loyalistAllies, rebelAllies } from './allies'
import { rebellion__background } from './background'
import { rebellion__battle, rebellion__plan, rebellion__resolveBattle } from './battles'
import { RebellionEvent } from './types'

class RebellionController extends EventController {
  public title = 'Rebellion'
  public spawn(region: Region) {
    // increment the number of global rebellions
    window.world.statistics.current.rebellions += 1
    const nation = window.world.regions[window.world.provinces[region.capital].currNation]
    const { development } = region
    // determine the rebel type
    const background = rebellion__background({ nation, rebels: region })
    const idx = window.world.rebellions.length
    const neighbors = region__neighbors(nation)
    // set the region's current rebellion
    region.rebellions.current = idx
    // create the event
    window.world.rebellions.push({
      idx,
      type: 'rebellion',
      name: '',
      start: window.world.date,
      end: Infinity,
      background,
      rebels: {
        idx: region.idx,
        allies: rebelAllies(region, nation, neighbors, background.type)
      },
      loyalists: {
        idx: nation.idx,
        allies: loyalistAllies(nation, neighbors)
      },
      rebelProvinces: [],
      nextBattle: { province: -1, attacker: 'rebels', odds: 0 },
      events: []
    })
    const rebellion = window.world.rebellions[idx]
    // determine starting odds of victory
    // less developed region's rebelling against more advanced overlords are penalized
    const regionDev = developmentMap[development]
    const nationDev = developmentMap[nation.development]
    const techPenalty = regionDev < nationDev ? 0.1 : 0
    const odds =
      0.4 +
      window.dice.uniform(0, 0.1) +
      rebellion.rebels.allies.filter(({ neutral }) => !neutral).length * 0.04 -
      rebellion.loyalists.allies.filter(({ neutral }) => !neutral).length * 0.04 -
      techPenalty
    // determine rebellion duration
    const years = Math.max(1, Math.round(window.dice.norm(3, 1.5)))
    // create a major event to record all battles
    const rebelStronghold = window.dice.choice(nation__regionalTerritories({ nation, region }))
    const event: RebellionEvent = {
      idx,
      time: window.world.date,
      type: 'rebellion',
      title: `Start: ${event__encode({ type: 'rebellion', entity: idx })}`,
      odds,
      battles: {},
      lastBattle: -1
    }
    rebellion__battle({ event, battleground: rebelStronghold, victor: 'rebels' })
    // the region will not experience another rebellion until 6 years after the current rebellion ends
    region.memory.rebelFatigue = window.world.date + years * yearMS * 6
    logEvent({
      eventType: event.type,
      title: `Start: ${event__encode({ type: 'rebellion', entity: idx })}`,
      text: `Rebellion (${background.type}) erupts in ${decorateText({
        link: nation
      })} (${region__formattedWealth(nation)}).`,
      actors: nation !== region ? [nation, region] : [nation]
    })
    rebellion__plan(event)
  }
  public tick(event: RebellionEvent) {
    rebellion__resolveBattle(event)
  }
}

export const event__rebellion = new RebellionController()
