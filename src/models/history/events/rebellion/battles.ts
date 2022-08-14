import { nation__regional_territories, region__is_active } from '../../../regions'
import { region__formatted_wealth } from '../../../regions/diplomacy/status'
import {
  decorated_provinces,
  province__filter_no_future_invasions,
  province__hub,
  province__neighbors
} from '../../../regions/provinces'
import { Province } from '../../../regions/provinces/types'
import { day_ms } from '../../../utilities/math/time'
import { decorate_text } from '../../../utilities/text/decoration'
import { add_event, log_event } from '../..'
import { record_battle } from '../war/battles'
import { rebellion__achieve_goals } from './background'
import { rebel__actors, Rebellion, RebellionEvent } from './types'

/**
 * finalizes the end of a rebellion
 * @param event - the rebellion event to end
 * @param victory - are the rebels victorious?
 * @param early_end - did the rebellion end prematurely?
 */
const end_rebellion = (params: { event: RebellionEvent; victory: boolean; early_end: boolean }) => {
  const { event, victory, early_end } = params
  const rebellion = window.world.rebellions[event.idx]
  const nation = window.world.regions[rebellion.loyalists.idx]
  const region = window.world.regions[rebellion.rebels.idx]
  // clear the region's current rebellion
  // a region can only have one rebellion at a time
  region.rebellions.current = -1
  // record event in the regional past rebellion list
  region.rebellions.past.push(event.idx)
  // reduce the number of global rebellions
  window.world.statistics.current.rebellions -= 1
  // set the rebellion end date and result
  rebellion.end = window.world.date
  rebellion.result = early_end
    ? ' External Forces end the rebellion.'
    : `${victory ? `The rebels are victorious` : `The rebellion is crushed`}.`
  // if the rebels won, transfer control to them
  if (victory && !early_end) rebellion__achieve_goals(rebellion)
  // log the results
  log_event({
    event_type: event.type,
    title: `End: ${decorate_text({ link: rebellion })}`,
    text: `Rebellion (${rebellion.background.type}) ends in ${
      nation.name
    } (${region__formatted_wealth(nation)}). ${
      early_end
        ? ' External Forces end the rebellion.'
        : `The rebels are ${victory ? 'victorious' : 'defeated'}.`
    }`,
    actors: nation !== region ? [nation, region] : [nation]
  })
}

export const rebellion__plan = (event: RebellionEvent) => {
  const rebellion = window.world.rebellions[event.idx]
  const nation = window.world.regions[rebellion.loyalists.idx]
  const region = window.world.regions[rebellion.rebels.idx]
  rebellion.rebel_provinces = rebellion.rebel_provinces.filter(
    idx => window.world.provinces[idx].curr_nation === nation.idx
  )
  const rebel_provinces = province__filter_no_future_invasions(
    rebellion.rebel_provinces.map(idx => window.world.provinces[idx])
  )
  const loyalist_provinces = province__filter_no_future_invasions(
    nation__regional_territories({ nation, region })
  ).filter(p => !rebel_provinces.includes(p))
  let attacker: rebel__actors = window.dice.random < event.odds ? 'rebels' : 'loyalists'
  let bordering_provinces =
    attacker === 'rebels'
      ? loyalist_provinces.filter(province =>
          province__neighbors(province).some(province => rebel_provinces.includes(province))
        )
      : rebel_provinces.filter(province =>
          province__neighbors(province).some(province => loyalist_provinces.includes(province))
        )
  const last_battle = window.world.provinces[event.last_battle]
  let no_stronghold = false
  if (bordering_provinces.length === 0 && last_battle && window.dice.random > 0.6) {
    no_stronghold = true
    attacker = rebel_provinces.length > loyalist_provinces.length ? 'loyalists' : 'rebels'
    bordering_provinces = province__filter_no_future_invasions(
      province__neighbors(last_battle).filter(province => province.curr_nation === nation.idx)
    )
  }
  const capital = window.world.provinces[region.capital]
  const rebel_capital = rebellion.rebel_provinces.includes(capital.idx)
  const loyalist_want_capital = attacker === 'loyalists' && rebel_capital && !no_stronghold
  const rebels_want_capital = attacker === 'rebels' && !rebel_capital && !no_stronghold
  const capital_wanted =
    bordering_provinces.includes(capital) && (loyalist_want_capital || rebels_want_capital)
  const next_battle = capital_wanted ? capital : window.dice.choice(bordering_provinces)
  if (next_battle) {
    event.time += window.dice.randint(75, 150) * day_ms
    rebellion.next_battle = { province: next_battle.idx, attacker, odds: event.odds }
    next_battle.memory.next_invasion = { type: 'rebellions', time: event.time, idx: event.idx }
    add_event(event)
  } else {
    end_rebellion({
      event,
      victory: rebel_provinces.length > loyalist_provinces.length,
      early_end: false
    })
  }
}

const rebellion__decorated_provinces = (rebellion: Rebellion) => {
  const rebel_provinces = rebellion.rebel_provinces.map(p => window.world.provinces[p])
  return `Rebel Provinces: ${
    rebel_provinces.length > 0 ? decorated_provinces(rebel_provinces) : 'none'
  }.`
}

export const rebellion__battle = (params: {
  event: RebellionEvent
  battleground: Province
  victor: rebel__actors
}) => {
  const { event, battleground, victor } = params
  const rebellion = window.world.rebellions[event.idx]
  const { attacker } = rebellion.next_battle
  const nation = window.world.regions[rebellion.loyalists.idx]
  if (victor === 'rebels' && attacker === 'rebels') {
    rebellion.rebel_provinces.push(battleground.idx)
  } else if (victor === 'loyalists' && attacker === 'loyalists') {
    rebellion.rebel_provinces = rebellion.rebel_provinces.filter(i => i !== battleground.idx)
  }
  const { battles } = event
  const title = record_battle(event, battleground)
  const hub = province__hub(battleground)
  const { count } = battles[hub.name]
  // determine and subtract the cost of the battle
  // repeat battles at the same location cost more
  const cost = (count + 1) * battleground.wealth
  nation.wealth -= cost
  // record the battle outcome
  // and update total victory odds
  const defeated = victor === 'rebels' ? 'loyalists' : 'rebels'
  const results =
    victor === attacker
      ? `The ${victor} defeat the ${defeated} at`
      : `The ${victor} repel the ${defeated.slice(0, -1)} attack on`
  const text = `${results} ${decorate_text({
    link: hub,
    tooltip: hub.type
  })} (${region__formatted_wealth(nation, cost)}). ${rebellion__decorated_provinces(rebellion)}`
  const mod = window.dice.uniform(0.05, 0.1) * (victor === 'rebels' ? 1 : -1)
  const pre_battle_odds = event.odds
  event.odds = Math.max(0, Math.min(1, event.odds + mod))
  rebellion.events.push({
    title,
    text,
    odds: pre_battle_odds,
    victory: victor === attacker,
    attacker,
    time: event.time,
    provinces: [battleground.idx]
  })
  battleground.memory.last_invasion = {
    type: 'rebellions',
    time: window.world.date,
    idx: event.idx
  }
}

/**
 * simulates a battle in a rebellion
 * @param event - rebellion event
 * @param victory - did the rebels win?
 */
export const rebellion__resolve_battle = (event: RebellionEvent) => {
  const rebellion = window.world.rebellions[event.idx]
  const { next_battle } = rebellion
  const nation = window.world.regions[rebellion.loyalists.idx]
  const region = window.world.regions[rebellion.rebels.idx]
  const capital = window.world.provinces[region.capital]
  // is this the final battle?
  const capital_is_next = next_battle.province === capital.idx
  const rebel_hold_capital = rebellion.rebel_provinces.includes(capital.idx)
  const rebels_attacking_capital = capital_is_next && next_battle.attacker === 'rebels'
  const rebel_victory = event.odds > 0.75 && (rebel_hold_capital || rebels_attacking_capital)
  const loyalists_attacking_capital = capital_is_next && next_battle.attacker === 'loyalists'
  const loyalist_victory = event.odds < 0.25 && (!rebel_hold_capital || loyalists_attacking_capital)
  const ending_rebellion = rebel_victory || loyalist_victory
  const war_victor = rebel_victory ? 'rebels' : 'loyalists'
  // decide the outcome of the battle
  const rebel_attackers = next_battle.attacker === 'rebels'
  const odds = rebel_attackers ? event.odds : 1 - event.odds
  const victory = ending_rebellion ? war_victor === next_battle.attacker : window.dice.random < odds
  // was the region conquered before the rebellion ended?
  const active = region__is_active(nation) && capital.curr_nation === nation.idx
  // select the battleground
  const battleground = window.world.provinces[next_battle.province]
  if (active && battleground && battleground.curr_nation === nation.idx) {
    event.last_battle = battleground.idx
    const victor = victory ? next_battle.attacker : rebel_attackers ? 'loyalists' : 'rebels'
    rebellion__battle({ event, battleground, victor })
  }
  // end the rebellion if applicable
  if (!active || ending_rebellion) {
    end_rebellion({ event, victory: rebel_victory, early_end: !active })
  } else {
    // otherwise schedule the next battle
    rebellion__plan(event)
  }
}
