import { nation__regionalTerritories, region__isActive } from '../../regions'
import { region__formattedWealth } from '../../regions/diplomacy/status'
import {
  province__decoration,
  province__filterNoFutureInvasions,
  province__hub,
  province__neighbors
} from '../../regions/provinces'
import { Province } from '../../regions/provinces/types'
import { dayMS } from '../../utilities/math/time'
import { decorateText } from '../../utilities/text/decoration'
import { addEvent, logEvent } from '..'
import { event__encode } from '../encoding'
import { recordBattle } from '../war/battles'
import { rebellion__achieveGoals } from './background'
import { rebel__actors, Rebellion, RebellionEvent } from './types'

/**
 * finalizes the end of a rebellion
 * @param event - the rebellion event to end
 * @param victory - are the rebels victorious?
 * @param early_end - did the rebellion end prematurely?
 */
const endRebellion = (params: { event: RebellionEvent; victory: boolean; earlyEnd: boolean }) => {
  const { event, victory, earlyEnd } = params
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
  rebellion.result = earlyEnd
    ? ' External Forces end the rebellion.'
    : `${victory ? `The rebels are victorious` : `The rebellion is crushed`}.`
  // if the rebels won, transfer control to them
  if (victory && !earlyEnd) rebellion__achieveGoals(rebellion)
  // log the results
  logEvent({
    eventType: event.type,
    title: `End: ${event__encode({ type: 'rebellion', entity: rebellion.idx })}`,
    text: `Rebellion (${rebellion.background.type}) ends in ${
      nation.name
    } (${region__formattedWealth(nation)}). ${
      earlyEnd
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
  rebellion.rebelProvinces = rebellion.rebelProvinces.filter(
    idx => window.world.provinces[idx].currNation === nation.idx
  )
  const rebelProvinces = province__filterNoFutureInvasions(
    rebellion.rebelProvinces.map(idx => window.world.provinces[idx])
  )
  const loyalistProvinces = province__filterNoFutureInvasions(
    nation__regionalTerritories({ nation, region })
  ).filter(p => !rebelProvinces.includes(p))
  let attacker: rebel__actors = window.dice.random < event.odds ? 'rebels' : 'loyalists'
  let borderingProvinces =
    attacker === 'rebels'
      ? loyalistProvinces.filter(province =>
          province__neighbors(province).some(province => rebelProvinces.includes(province))
        )
      : rebelProvinces.filter(province =>
          province__neighbors(province).some(province => loyalistProvinces.includes(province))
        )
  const lastBattle = window.world.provinces[event.lastBattle]
  let noStronghold = false
  if (borderingProvinces.length === 0 && lastBattle && window.dice.random > 0.6) {
    noStronghold = true
    attacker = rebelProvinces.length > loyalistProvinces.length ? 'loyalists' : 'rebels'
    borderingProvinces = province__filterNoFutureInvasions(
      province__neighbors(lastBattle).filter(province => province.currNation === nation.idx)
    )
  }
  const capital = window.world.provinces[region.capital]
  const rebelCapital = rebellion.rebelProvinces.includes(capital.idx)
  const loyalistWantCapital = attacker === 'loyalists' && rebelCapital && !noStronghold
  const rebelsWantCapital = attacker === 'rebels' && !rebelCapital && !noStronghold
  const capitalWanted =
    borderingProvinces.includes(capital) && (loyalistWantCapital || rebelsWantCapital)
  const nextBattle = capitalWanted ? capital : window.dice.choice(borderingProvinces)
  if (nextBattle) {
    event.time += window.dice.randint(75, 150) * dayMS
    rebellion.nextBattle = { province: nextBattle.idx, attacker, odds: event.odds }
    nextBattle.memory.nextInvasion = { type: 'rebellions', time: event.time, idx: event.idx }
    addEvent(event)
  } else {
    endRebellion({
      event,
      victory: rebelProvinces.length > loyalistProvinces.length,
      earlyEnd: false
    })
  }
}

const rebellion__decoratedProvinces = (rebellion: Rebellion) => {
  const rebelProvinces = rebellion.rebelProvinces.map(p => window.world.provinces[p])
  return `Rebel Provinces: ${
    rebelProvinces.length > 0 ? province__decoration(rebelProvinces) : 'none'
  }.`
}

export const rebellion__battle = (params: {
  event: RebellionEvent
  battleground: Province
  victor: rebel__actors
}) => {
  const { event, battleground, victor } = params
  const rebellion = window.world.rebellions[event.idx]
  const { attacker } = rebellion.nextBattle
  const nation = window.world.regions[rebellion.loyalists.idx]
  if (victor === 'rebels' && attacker === 'rebels') {
    rebellion.rebelProvinces.push(battleground.idx)
  } else if (victor === 'loyalists' && attacker === 'loyalists') {
    rebellion.rebelProvinces = rebellion.rebelProvinces.filter(i => i !== battleground.idx)
  }
  const { battles } = event
  const title = recordBattle(event, battleground)
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
  const text = `${results} ${decorateText({
    link: hub,
    tooltip: hub.type
  })} (${region__formattedWealth(nation, cost)}). ${rebellion__decoratedProvinces(rebellion)}`
  const mod = window.dice.uniform(0.05, 0.1) * (victor === 'rebels' ? 1 : -1)
  const preBattleOdds = event.odds
  event.odds = Math.max(0, Math.min(1, event.odds + mod))
  rebellion.events.push({
    title,
    text,
    odds: preBattleOdds,
    victory: victor === attacker,
    attacker,
    time: event.time,
    provinces: [battleground.idx]
  })
  battleground.memory.lastInvasion = {
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
export const rebellion__resolveBattle = (event: RebellionEvent) => {
  const rebellion = window.world.rebellions[event.idx]
  const { nextBattle } = rebellion
  const nation = window.world.regions[rebellion.loyalists.idx]
  const region = window.world.regions[rebellion.rebels.idx]
  const capital = window.world.provinces[region.capital]
  // is this the final battle?
  const capitalIsNext = nextBattle.province === capital.idx
  const rebelHoldCapital = rebellion.rebelProvinces.includes(capital.idx)
  const rebelsAttackingCapital = capitalIsNext && nextBattle.attacker === 'rebels'
  const rebelVictory = event.odds > 0.75 && (rebelHoldCapital || rebelsAttackingCapital)
  const loyalistsAttackingCapital = capitalIsNext && nextBattle.attacker === 'loyalists'
  const loyalistVictory = event.odds < 0.25 && (!rebelHoldCapital || loyalistsAttackingCapital)
  const endingRebellion = rebelVictory || loyalistVictory
  const warVictor = rebelVictory ? 'rebels' : 'loyalists'
  // decide the outcome of the battle
  const rebelAttackers = nextBattle.attacker === 'rebels'
  const odds = rebelAttackers ? event.odds : 1 - event.odds
  const victory = endingRebellion ? warVictor === nextBattle.attacker : window.dice.random < odds
  // was the region conquered before the rebellion ended?
  const active = region__isActive(nation) && capital.currNation === nation.idx
  // select the battleground
  const battleground = window.world.provinces[nextBattle.province]
  if (active && battleground && battleground.currNation === nation.idx) {
    event.lastBattle = battleground.idx
    const victor = victory ? nextBattle.attacker : rebelAttackers ? 'loyalists' : 'rebels'
    rebellion__battle({ event, battleground, victor })
  }
  // end the rebellion if applicable
  if (!active || endingRebellion) {
    endRebellion({ event, victory: rebelVictory, earlyEnd: !active })
  } else {
    // otherwise schedule the next battle
    rebellion__plan(event)
  }
}
