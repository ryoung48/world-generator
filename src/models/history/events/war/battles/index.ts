import { region__foreign_provinces, region__neighbors } from '../../../../regions'
import { region__claim_province } from '../../../../regions/diplomacy/claims'
import { region__formatted_wealth } from '../../../../regions/diplomacy/status'
import { decorated_provinces, province__hub } from '../../../../regions/provinces'
import { Province } from '../../../../regions/provinces/types'
import { Region } from '../../../../regions/types'
import { day_ms, year_ms } from '../../../../utilities/math/time'
import { decorated_profile } from '../../../../utilities/performance'
import { romanize } from '../../../../utilities/text'
import { decorate_text } from '../../../../utilities/text/decoration'
import { add_event } from '../../..'
import { war__resolve } from '../truce'
import { War, WarEvent } from '../types'

export const record_battle = (event: { battles: WarEvent['battles'] }, battleground: Province) => {
  const { battles } = event
  const name = province__hub(battleground).name
  if (!battles[name]) {
    battles[name] = {
      name: window.dice.choice([
        `Battle for ${name}`,
        `Battle of ${name}`,
        `Invasion of ${name}`,
        `Siege of ${name}`
      ]),
      count: 0
    }
  }
  battles[name].count++
  return `${battles[name].name}${
    battles[name].count > 1 ? ` ${romanize(battles[name].count)}` : ''
  }`
}

export const recent_battle_window = 5 * year_ms

export const battle_victory = (params: {
  event: WarEvent
  province: Province
  invader: Region
  defender: Region
  offensive: boolean
}) => {
  const { event, province, invader, defender, offensive } = params
  const { battles } = event
  const { conquered, war_ended } = region__claim_province({ nation: invader, province })
  const origin = offensive ? defender : invader
  const hostile = offensive ? invader : defender
  const hub = province__hub(province)
  const { count } = battles[hub.name]
  const cost =
    count *
    conquered
      .filter(c => c !== province)
      .reduce((sum, city) => sum + city.wealth * 0.5, province.wealth * 2)
  const invader_cost = cost * (invader.idx === event.invader ? 1.5 : 0.5)
  invader.wealth > 0 && (invader.wealth -= invader_cost)
  const defender_cost = cost * (defender.idx === event.invader ? 1 : 0.5)
  defender.wealth > 0 && (defender.wealth -= defender_cost)
  let text = `${decorate_text({ link: invader })} (${region__formatted_wealth(
    invader
  )}) defeats ${decorate_text({
    link: defender
  })} (${region__formatted_wealth(defender)}) at ${decorate_text({
    link: hub,
    tooltip: hub.type
  })} (${region__formatted_wealth(
    defender,
    cost
  )}). The following provinces were acquired by ${decorate_text({
    link: invader
  })}: ${decorated_provinces(conquered)}.`
  // nations that are completed surrounded will surrender
  const borders = region__neighbors(origin)
  const encircled =
    offensive && origin.regions.length === 1 && borders.length === 1 && borders[0] === hostile.idx
  if (encircled) {
    const surrender = region__claim_province({
      nation: invader,
      province: window.world.provinces[origin.capital]
    })
    war_ended.push(...surrender.war_ended)
    text += ` ${decorate_text({ link: defender })} surrenders.`
  }
  return { war_ended, cost, text, provinces: conquered }
}

export const battle_defeat = (params: {
  event: WarEvent
  province: Province
  defender: Region
  invader: Region
}) => {
  const { event, province, defender, invader } = params
  const hub = province__hub(province)
  const { battles } = event
  const { count } = battles[hub.name]
  const neighborhood = province.neighbors
    .map(n => window.world.provinces[n])
    .filter(n => n.curr_nation === defender.idx)
  const cost =
    count * neighborhood.reduce((sum, city) => sum + city.wealth * 0.5, province.wealth * 2)
  const invader_cost = cost * (invader.idx === event.invader ? 1.5 : 0.5)
  invader.wealth > 0 && (invader.wealth -= invader_cost)
  const defender_cost = cost * (defender.idx === event.invader ? 1 : 0.5)
  defender.wealth > 0 && (defender.wealth -= defender_cost)
  const text = `${decorate_text({ link: defender })} (${region__formatted_wealth(
    defender
  )}) defeats ${decorate_text({
    link: invader
  })} (${region__formatted_wealth(invader)}) at ${decorate_text({
    link: hub,
    tooltip: hub.type
  })} (${region__formatted_wealth(defender, cost)}). `
  return { war_ended: false, cost, text, provinces: [province] }
}

export const war__victory_odds = (n1: Region, n2: Region) => {
  const power1 = Math.max(1, n1.wealth)
  const power2 = Math.max(1, n2.wealth)
  const denom = power1 + power2
  return power1 / denom
}

const resolve_battle = (
  event: WarEvent,
  province: Province,
  invader: Region,
  defender: Region,
  offensive: boolean
) => {
  province.memory.last_invasion = { type: 'wars', time: event.time, idx: event.idx }
  const title = record_battle(event, province)
  const odds = war__victory_odds(invader, defender)
  const victory = odds > window.dice.random
  const { war_ended, cost, text, provinces } = victory
    ? battle_victory({ event, province, invader, defender, offensive })
    : battle_defeat({ event, province, defender, invader })
  window.world.wars[event.idx].events.push({
    title,
    text,
    time: event.time,
    odds,
    cost: cost.toFixed(0),
    attacker: invader.idx,
    victory,
    provinces: provinces.map(province => province.idx)
  })
  const victor = victory ? invader : defender
  return { war_ended, victor }
}

const find_battlegrounds = (invader: Region, defender: Region) =>
  region__foreign_provinces({ host: invader, guest: defender }).filter(
    province => province.memory.next_invasion.time < window.world.date
  )

const conquer = (event: WarEvent) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  const prospects = find_battlegrounds(invader, defender)
  if (prospects.length === 0) {
    war__resolve(event, { external: true })
    return false
  } else {
    const taken = window.dice.choice(prospects)
    return { province: taken.idx, aggressor: invader.idx }
  }
}

const reclaim = (event: WarEvent) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  const previous_ownership = (city: Province) => city.prev_nation === event.defender
  const prospects = region__foreign_provinces({
    host: defender,
    guest: invader
  }).filter(previous_ownership)
  if (prospects.length === 0) {
    const all_prospects = invader.provinces
      .map(t => window.world.provinces[t])
      .filter(previous_ownership)
    const invader_morale = invader.wealth / event.starting_wealth > 0.7
    if (invader_morale) {
      return conquer(event) // invader can continue the attack
    } else if (all_prospects.length > 0) {
      war__resolve(event, { external: true }) // there exists lost cities but there is no longer a path
      return false
    } else {
      war__resolve(event, { offensive: false }) // there is nothing left to retake >> defensive victory
      return false
    }
  } else {
    const reclaimed = window.dice.choice(prospects)
    return { province: reclaimed.idx, aggressor: defender.idx }
  }
}

const spawn_next_battle = (event: WarEvent, next_battle: War['next_battle'], init: boolean) => {
  if (!init) event.time += window.dice.randint(200, 400) * day_ms
  const war = window.world.wars[event.idx]
  war.next_battle = next_battle
  const battleground = window.world.provinces[next_battle.province]
  battleground.memory.next_invasion = { type: 'wars', time: event.time, idx: event.idx }
  add_event(event)
}

const _war__plan = (params: { event: WarEvent; aggressor: Region; init?: boolean }) => {
  const { event, aggressor, init = false } = params
  const invader = window.world.regions[event.invader]
  const invasion = aggressor === invader && invader.rebellions.current === -1
  const next_battle = invasion ? conquer(event) : reclaim(event)
  if (next_battle) spawn_next_battle(event, next_battle, init)
}

export const war__plan = decorated_profile(_war__plan)

const _war__battle = (event: WarEvent) => {
  const war = window.world.wars[event.idx]
  const { aggressor, province } = war.next_battle
  const offensive = aggressor === event.invader
  const invader = window.world.regions[offensive ? event.invader : event.defender]
  const defender = window.world.regions[offensive ? event.defender : event.invader]
  const { war_ended, victor } = resolve_battle(
    event,
    window.world.provinces[province],
    invader,
    defender,
    offensive
  )
  if (typeof war_ended !== 'boolean' && war_ended.length > 0) {
    war__resolve(event, { offensive, effects: war_ended })
  } else {
    war__plan({ event, aggressor: victor })
  }
}

export const war__battle = decorated_profile(_war__battle)
