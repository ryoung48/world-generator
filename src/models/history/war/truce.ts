import { region__isActive } from '../../regions'
import { nation__releaseRegion, region__claimSubject } from '../../regions/diplomacy/claims'
import { region__allies, region__setRelation } from '../../regions/diplomacy/relations'
import { region__formattedWealth } from '../../regions/diplomacy/status'
import { province__decoration } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { decorateText } from '../../utilities/text/decoration'
import { logEvent } from '..'
import { WarEvent } from './types'

interface WarEffect {
  text: string
  actors: number[]
}

interface WarEndParams {
  offensive?: boolean
  external?: boolean
  effects?: WarEffect[]
}

const payDebts = (nation: Region) => {
  if (nation.wars.current.length < 1 && nation.provinces.length > 0) {
    region__allies(nation)
      .filter(ally => region__isActive(ally))
      .forEach(ally => {
        const contrib = nation.allies[ally.idx]
        nation.wealth -= contrib
        ally.wealth += contrib
        nation.allies[ally.idx] = 0
      })
    nation.memory.lastUpdate = window.world.date
  }
}

const endWar = (region: Region, war: number) => {
  region.wars.current = region.wars.current.filter(n => n !== war)
  region.wars.past.push(war)
  // return debts to allies
  payDebts(region)
}

const truce = (n1: Region, n2: Region, war: number) => {
  endWar(n1, war)
  endWar(n2, war)
  if (n1.relations[n2.idx] === 'at war') {
    region__setRelation({ relation: 'suspicious', n1, n2 })
  }
  window.world.statistics.current.wars -= 1
}

const regionalTransfers = (event: WarEvent) => {
  const { ownedProvinces } = event
  const invader = window.world.regions[event.invader]
  const provinces = invader.provinces
    .filter(idx => ownedProvinces.defender.includes(idx))
    .map(t => window.world.provinces[t])
  const regions = provinces.filter(
    province => province.capital && province.region !== event.defender
  )
  const text =
    provinces.length > 0
      ? `${decorateText({
          link: invader
        })} has gained the following provinces: ${province__decoration(provinces)}.${
          regions.length > 0
            ? ` Control over the following regions has shifted to ${decorateText({
                link: invader
              })}: ${regions
                .map(r => decorateText({ link: window.world.regions[r.region] }))
                .join(', ')}`
            : ''
        }`
      : ''
  const transfers = regions.map(city => city.region)
  // log the outcomes
  return {
    text: [text],
    transfers
  }
}

const logEndOfWar = (event: WarEvent, actors: Region[], title: string, text: string[]) => {
  window.world.wars[event.idx].result = text.join(' ')
  logEvent({
    title,
    text: text.join(' '),
    eventIdx: event.idx,
    eventType: event.type,
    actors
  })
}

const actors = (event: WarEvent, effects: WarEffect[]) => {
  // province transfers
  const { transfers, text } = regionalTransfers(event)
  return {
    nations: Array.from(
      new Set(
        [event.invader, event.defender]
          .concat(effects.map(({ actors }) => actors).flat())
          .concat(transfers)
      )
    ).map(idx => window.world.regions[idx]),
    text
  }
}

export const war__resolve = (
  event: WarEvent,
  { offensive = false, external = false, effects = [] }: WarEndParams
) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  // turn defender into a subject if the goal was to vassalize
  // or if the invader lacks centralized administration
  if (offensive && event.vassalize) {
    nation__releaseRegion({ nation: invader, subject: defender })
    const { text, actors } = region__claimSubject({
      nation: invader,
      subject: defender
    })
    effects.shift()
    effects.unshift({ text, actors })
  }
  // actually end the war
  truce(invader, defender, event.idx)
  window.world.wars[event.idx].end = window.world.date
  // log the outcomes
  const { nations, text } = actors(event, effects)
  const title = `End of War: ${window.world.wars[event.idx].name}`
  if (external)
    logEndOfWar(event, nations, title, ['External Forces have ended the war.'].concat(text))
  else {
    const winner = offensive ? invader : defender
    const loser = offensive ? defender : invader
    if (!offensive) {
      text.unshift(
        `${decorateText({ link: winner })} (${region__formattedWealth(
          winner
        )}) has repelled the ${decorateText({
          link: loser
        })} (${region__formattedWealth(loser)}) invasion.`
      )
    }
    logEndOfWar(event, nations, title, effects.map(({ text }) => text).concat(text))
  }
}

export const war__ceasefire = (event: WarEvent) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  const effects: WarEffect[] = []
  truce(invader, defender, event.idx)
  const { nations, text } = actors(event, effects)
  const title = `End of War: ${window.world.wars[event.idx].name}`
  text.unshift(
    `${decorateText({ link: invader })} (${region__formattedWealth(invader)}) & ${decorateText({
      link: defender
    })} (${region__formattedWealth(defender)}) sign a peace treaty and end the war.`
  )
  logEndOfWar(event, nations, title, text)
  window.world.wars[event.idx].end = window.world.date
}
