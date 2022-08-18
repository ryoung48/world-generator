import { region__foreignProvinces, region__neighbors } from '../../../../regions'
import { region__claimProvince } from '../../../../regions/diplomacy/claims'
import { region__formattedWealth } from '../../../../regions/diplomacy/status'
import { province__decoration, province__hub } from '../../../../regions/provinces'
import { Province } from '../../../../regions/provinces/types'
import { Region } from '../../../../regions/types'
import { dayMS, yearMS } from '../../../../utilities/math/time'
import { decoratedProfile } from '../../../../utilities/performance'
import { romanize } from '../../../../utilities/text'
import { decorateText } from '../../../../utilities/text/decoration'
import { addEvent } from '../../..'
import { war__resolve } from '../truce'
import { War, WarEvent } from '../types'

export const recordBattle = (event: { battles: WarEvent['battles'] }, battleground: Province) => {
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

export const recentBattleWindow = 5 * yearMS

export const battleVictory = (params: {
  event: WarEvent
  province: Province
  invader: Region
  defender: Region
  offensive: boolean
}) => {
  const { event, province, invader, defender, offensive } = params
  const { battles } = event
  const { conquered, warEnded } = region__claimProvince({ nation: invader, province })
  const origin = offensive ? defender : invader
  const hostile = offensive ? invader : defender
  const hub = province__hub(province)
  const { count } = battles[hub.name]
  const cost =
    count *
    conquered
      .filter(c => c !== province)
      .reduce((sum, city) => sum + city.wealth * 0.5, province.wealth * 2)
  const invaderCost = cost * (invader.idx === event.invader ? 1.5 : 0.5)
  invader.wealth > 0 && (invader.wealth -= invaderCost)
  const defenderCost = cost * (defender.idx === event.invader ? 1 : 0.5)
  defender.wealth > 0 && (defender.wealth -= defenderCost)
  let text = `${decorateText({ link: invader })} (${region__formattedWealth(
    invader
  )}) defeats ${decorateText({
    link: defender
  })} (${region__formattedWealth(defender)}) at ${decorateText({
    link: hub,
    tooltip: hub.type
  })} (${region__formattedWealth(
    defender,
    cost
  )}). The following provinces were acquired by ${decorateText({
    link: invader
  })}: ${province__decoration(conquered)}.`
  // nations that are completed surrounded will surrender
  const borders = region__neighbors(origin)
  const encircled =
    offensive && origin.regions.length === 1 && borders.length === 1 && borders[0] === hostile.idx
  if (encircled) {
    const surrender = region__claimProvince({
      nation: invader,
      province: window.world.provinces[origin.capital]
    })
    warEnded.push(...surrender.warEnded)
    text += ` ${decorateText({ link: defender })} surrenders.`
  }
  return { warEnded, cost, text, provinces: conquered }
}

export const battleDefeat = (params: {
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
    .filter(n => n.currNation === defender.idx)
  const cost =
    count * neighborhood.reduce((sum, city) => sum + city.wealth * 0.5, province.wealth * 2)
  const invaderCost = cost * (invader.idx === event.invader ? 1.5 : 0.5)
  invader.wealth > 0 && (invader.wealth -= invaderCost)
  const defenderCost = cost * (defender.idx === event.invader ? 1 : 0.5)
  defender.wealth > 0 && (defender.wealth -= defenderCost)
  const text = `${decorateText({ link: defender })} (${region__formattedWealth(
    defender
  )}) defeats ${decorateText({
    link: invader
  })} (${region__formattedWealth(invader)}) at ${decorateText({
    link: hub,
    tooltip: hub.type
  })} (${region__formattedWealth(defender, cost)}). `
  return { warEnded: false, cost, text, provinces: [province] }
}

export const war__victoryOdds = (n1: Region, n2: Region) => {
  const power1 = Math.max(1, n1.wealth)
  const power2 = Math.max(1, n2.wealth)
  const denom = power1 + power2
  return power1 / denom
}

const resolveBattle = (
  event: WarEvent,
  province: Province,
  invader: Region,
  defender: Region,
  offensive: boolean
) => {
  province.memory.lastInvasion = { type: 'wars', time: event.time, idx: event.idx }
  const title = recordBattle(event, province)
  const odds = war__victoryOdds(invader, defender)
  const victory = odds > window.dice.random
  const { warEnded, cost, text, provinces } = victory
    ? battleVictory({ event, province, invader, defender, offensive })
    : battleDefeat({ event, province, defender, invader })
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
  return { warEnded, victor }
}

const findBattlegrounds = (invader: Region, defender: Region) =>
  region__foreignProvinces({ host: invader, guest: defender }).filter(
    province => province.memory.nextInvasion.time < window.world.date
  )

const conquer = (event: WarEvent) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  const prospects = findBattlegrounds(invader, defender)
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
  const previousOwnership = (city: Province) => city.prevNation === event.defender
  const prospects = region__foreignProvinces({
    host: defender,
    guest: invader
  }).filter(previousOwnership)
  if (prospects.length === 0) {
    const allProspects = invader.provinces
      .map(t => window.world.provinces[t])
      .filter(previousOwnership)
    const invaderMorale = invader.wealth / event.startingWealth > 0.7
    if (invaderMorale) {
      return conquer(event) // invader can continue the attack
    } else if (allProspects.length > 0) {
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

const spawnNextBattle = (event: WarEvent, nextBattle: War['nextBattle'], init: boolean) => {
  if (!init) event.time += window.dice.randint(200, 400) * dayMS
  const war = window.world.wars[event.idx]
  war.nextBattle = nextBattle
  const battleground = window.world.provinces[nextBattle.province]
  battleground.memory.nextInvasion = { type: 'wars', time: event.time, idx: event.idx }
  addEvent(event)
}

const _war__plan = (params: { event: WarEvent; aggressor: Region; init?: boolean }) => {
  const { event, aggressor, init = false } = params
  const invader = window.world.regions[event.invader]
  const invasion = aggressor === invader && invader.rebellions.current === -1
  const nextBattle = invasion ? conquer(event) : reclaim(event)
  if (nextBattle) spawnNextBattle(event, nextBattle, init)
}

export const war__plan = decoratedProfile(_war__plan)

const _war__battle = (event: WarEvent) => {
  const war = window.world.wars[event.idx]
  const { aggressor, province } = war.nextBattle
  const offensive = aggressor === event.invader
  const invader = window.world.regions[offensive ? event.invader : event.defender]
  const defender = window.world.regions[offensive ? event.defender : event.invader]
  const { warEnded, victor } = resolveBattle(
    event,
    window.world.provinces[province],
    invader,
    defender,
    offensive
  )
  if (typeof warEnded !== 'boolean' && warEnded.length > 0) {
    war__resolve(event, { offensive, effects: warEnded })
  } else {
    war__plan({ event, aggressor: victor })
  }
}

export const war__battle = decoratedProfile(_war__battle)
