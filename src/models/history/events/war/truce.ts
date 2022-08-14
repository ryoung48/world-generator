import { region__is_active } from '../../../regions'
import { nation__release_region, region__claim_subject } from '../../../regions/diplomacy/claims'
import { region__allies, region__set_relation } from '../../../regions/diplomacy/relations'
import { region__formatted_wealth } from '../../../regions/diplomacy/status'
import { decorated_provinces } from '../../../regions/provinces'
import { Region } from '../../../regions/types'
import { decorate_text } from '../../../utilities/text/decoration'
import { log_event } from '../..'
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

const pay_debts = (nation: Region) => {
  if (nation.wars.current.length < 1 && nation.provinces.length > 0) {
    region__allies(nation)
      .filter(ally => region__is_active(ally))
      .forEach(ally => {
        const contrib = nation.allies[ally.idx]
        nation.wealth -= contrib
        ally.wealth += contrib
        nation.allies[ally.idx] = 0
      })
    nation.memory.last_update = window.world.date
  }
}

const end_war = (region: Region, war: number) => {
  region.wars.current = region.wars.current.filter(n => n !== war)
  region.wars.past.push(war)
  // return debts to allies
  pay_debts(region)
}

const truce = (n1: Region, n2: Region, war: number) => {
  end_war(n1, war)
  end_war(n2, war)
  if (n1.relations[n2.idx] === 'at war') {
    region__set_relation({ relation: 'suspicious', n1, n2 })
  }
  window.world.statistics.current.wars -= 1
}

const regional_transfers = (event: WarEvent) => {
  const { owned_provinces } = event
  const invader = window.world.regions[event.invader]
  const provinces = invader.provinces
    .filter(idx => owned_provinces.defender.includes(idx))
    .map(t => window.world.provinces[t])
  const regions = provinces.filter(
    province => province.regional_capital && province.region !== event.defender
  )
  const text =
    provinces.length > 0
      ? `${decorate_text({
          link: invader
        })} has gained the following provinces: ${decorated_provinces(provinces)}.${
          regions.length > 0
            ? ` Control over the following regions has shifted to ${decorate_text({
                link: invader
              })}: ${regions
                .map(r => decorate_text({ link: window.world.regions[r.region] }))
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

const log_end_of_war = (event: WarEvent, actors: Region[], title: string, text: string[]) => {
  window.world.wars[event.idx].result = text.join(' ')
  log_event({
    title,
    text: text.join(' '),
    event_idx: event.idx,
    event_type: event.type,
    actors
  })
}

const actors = (event: WarEvent, effects: WarEffect[]) => {
  // province transfers
  const { transfers, text } = regional_transfers(event)
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
    nation__release_region({ nation: invader, subject: defender })
    const { text, actors } = region__claim_subject({
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
  const title = `End of War: ${decorate_text({
    label: event.title,
    link: window.world.wars[event.idx]
  })}`
  if (external)
    log_end_of_war(event, nations, title, ['External Forces have ended the war.'].concat(text))
  else {
    const winner = offensive ? invader : defender
    const loser = offensive ? defender : invader
    if (!offensive) {
      text.unshift(
        `${decorate_text({ link: winner })} (${region__formatted_wealth(
          winner
        )}) has repelled the ${decorate_text({
          link: loser
        })} (${region__formatted_wealth(loser)}) invasion.`
      )
    }
    log_end_of_war(event, nations, title, effects.map(({ text }) => text).concat(text))
  }
}

export const war__ceasefire = (event: WarEvent) => {
  const invader = window.world.regions[event.invader]
  const defender = window.world.regions[event.defender]
  const effects: WarEffect[] = []
  truce(invader, defender, event.idx)
  const { nations, text } = actors(event, effects)
  const title = `End of War: ${decorate_text({
    label: event.title,
    link: window.world.wars[event.idx]
  })}`
  text.unshift(
    `${decorate_text({ link: invader })} (${region__formatted_wealth(invader)}) & ${decorate_text({
      link: defender
    })} (${region__formatted_wealth(defender)}) sign a peace treaty and end the war.`
  )
  log_end_of_war(event, nations, title, text)
  window.world.wars[event.idx].end = window.world.date
}
