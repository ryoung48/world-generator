import { lang__unique_name } from '../../../npcs/species/humanoids/languages/words'
import { nation__regional_territories, region__neighbors } from '../../../regions'
import { development_map } from '../../../regions/development'
import { region__formatted_wealth } from '../../../regions/diplomacy/status'
import { Region } from '../../../regions/types'
import { year_ms } from '../../../utilities/math/time'
import { decorate_text } from '../../../utilities/text/decoration'
import { log_event } from '../..'
import { EventController } from '../../types'
import { loyalist_allies, rebel_allies } from './allies'
import { rebellion__background } from './background'
import { rebellion__battle, rebellion__plan, rebellion__resolve_battle } from './battles'
import { RebellionEvent } from './types'

class RebellionController extends EventController {
  public title = 'Rebellion'
  public spawn(region: Region) {
    // increment the number of global rebellions
    window.world.statistics.current.rebellions += 1
    const nation = window.world.regions[window.world.provinces[region.capital].curr_nation]
    const culture = window.world.cultures[region.culture.ruling]
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
      tag: 'rebellion',
      type: 'rebellion',
      name: `${lang__unique_name({ lang: culture.language, key: 'rebellion' })} ${
        background.type === 'ideology'
          ? 'Revolution'
          : background.type === 'peasants'
          ? 'Uprising'
          : background.type === 'anarchism'
          ? 'Warfare'
          : window.dice.choice(['Rebellion', 'Civil War'])
      }`,
      start: window.world.date,
      end: Infinity,
      background,
      rebels: {
        idx: region.idx,
        allies: rebel_allies(region, nation, neighbors, background.type)
      },
      loyalists: {
        idx: nation.idx,
        allies: loyalist_allies(nation, neighbors)
      },
      rebel_provinces: [],
      next_battle: { province: -1, attacker: 'rebels', odds: 0 },
      events: []
    })
    const rebellion = window.world.rebellions[idx]
    // determine starting odds of victory
    // less developed region's rebelling against more advanced overlords are penalized
    const region_dev = development_map[development]
    const nation_dev = development_map[nation.development]
    const tech_penalty = region_dev < nation_dev ? 0.1 : 0
    const odds =
      0.4 +
      window.dice.uniform(0, 0.1) +
      rebellion.rebels.allies.filter(({ neutral }) => !neutral).length * 0.04 -
      rebellion.loyalists.allies.filter(({ neutral }) => !neutral).length * 0.04 -
      tech_penalty
    // determine rebellion duration
    const years = Math.max(1, Math.round(window.dice.norm(3, 1.5)))
    // create a major event to record all battles
    const rebel_stronghold = window.dice.choice(nation__regional_territories({ nation, region }))
    const event: RebellionEvent = {
      idx,
      time: window.world.date,
      type: 'rebellion',
      title: `Start: ${rebellion.name}`,
      odds,
      battles: {},
      last_battle: -1
    }
    rebellion__battle({ event, battleground: rebel_stronghold, victor: 'rebels' })
    // the region will not experience another rebellion until 6 years after the current rebellion ends
    region.memory.rebel_fatigue = window.world.date + years * year_ms * 6
    log_event({
      event_type: event.type,
      title: `Start: ${decorate_text({ link: window.world.rebellions[idx] })}`,
      text: `Rebellion (${background.type}) erupts in ${decorate_text({
        link: nation
      })} (${region__formatted_wealth(nation)}).`,
      actors: nation !== region ? [nation, region] : [nation]
    })
    rebellion__plan(event)
  }
  public tick(event: RebellionEvent) {
    rebellion__resolve_battle(event)
  }
}

export const event__rebellion = new RebellionController()
