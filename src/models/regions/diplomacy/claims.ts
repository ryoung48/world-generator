import { log_event } from '../../history'
import { event__succession } from '../../history/events/succession'
import { title_case } from '../../utilities/text'
import { decorate_text } from '../../utilities/text/decoration'
import { region__is_active } from '..'
import {
  province__find_closest,
  province__is_capital,
  province__local_neighbors,
  province__sort_closest
} from '../provinces'
import { province__attach, province__connected, province__sever } from '../provinces/arteries'
import { Province } from '../provinces/types'
import { Region } from '../types'
import { region__allies, region__set_relation } from './relations'
import { region__formatted_wealth } from './status'

export const region__claim_subject = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const free = region__release_subjects(subject)
  subject.overlord.idx = nation.idx
  subject.overlord.join_date = window.world.date
  nation.subjects.push(subject.idx)
  region__set_relation({ relation: 'ally', n1: nation, n2: subject })
  const text = `${decorate_text({ link: subject })} (${region__formatted_wealth(
    subject
  )}) becomes a vassal of ${decorate_text({
    link: nation
  })} (${region__formatted_wealth(nation)}) ${free.text}.`
  log_event({
    event_type: 'diplomacy',
    title: `New Vassal: ${decorate_text({ link: subject })}`,
    text,
    actors: [nation, subject]
  })
  return {
    text: `${decorate_text({ link: subject })} (${region__formatted_wealth(
      subject
    )}) becomes a vassal of ${decorate_text({
      link: nation
    })} (${region__formatted_wealth(nation)}) ${free.text}.`,
    actors: Array.from(new Set([nation, subject].map(({ idx }) => idx).concat(free.actors)))
  }
}

const region__release_subjects = (nation: Region) => {
  const outcome = { text: '', actors: [nation.idx] }
  if (nation.subjects.length > 0) {
    outcome.text = `The subjects of ${decorate_text({
      link: nation
    })} have been released: ${nation.subjects
      .map(s => decorate_text({ link: window.world.regions[s] }))
      .join(', ')}.`
    outcome.actors.push(...nation.subjects)
    nation.subjects.forEach(s => {
      const subject = window.world.regions[s]
      subject.overlord.idx = -1
      region__set_relation({ relation: 'suspicious', n1: nation, n2: subject })
    })
    nation.subjects = []
    log_event({
      event_type: 'diplomacy',
      title: `Lost Subjects: ${decorate_text({ link: nation })}`,
      text: outcome.text,
      actors: outcome.actors.map(r => window.world.regions[r])
    })
  }
  return outcome
}
export const region__release_overlord = (nation: Region) => {
  const outcome = { text: '', actors: [nation.idx] }
  const suzerain = window.world.regions[nation.overlord.idx]
  if (suzerain) {
    nation.overlord.idx = -1
    region__set_relation({ relation: 'suspicious', n1: nation, n2: suzerain })
    const capital = window.world.provinces[nation.capital]
    const verbiage = suzerain.idx === capital.curr_nation ? 'annexed' : 'lost'
    outcome.text = `${decorate_text({
      link: suzerain
    })} has ${verbiage} it's vassal ${decorate_text({
      link: nation
    })}.`
    outcome.actors.push(suzerain.idx)
    suzerain.subjects = suzerain.subjects.filter(subject => subject !== nation.idx)
    log_event({
      event_type: 'diplomacy',
      title: `${title_case(verbiage)} Vassal: ${decorate_text({ link: nation })}`,
      text: outcome.text,
      actors: outcome.actors.map(r => window.world.regions[r])
    })
  }
  return outcome
}

const release_contracts = (nation: Region) => {
  // subjects
  const subjects_released = region__release_subjects(nation)
  // overlord
  const freedom = region__release_overlord(nation)
  // allies
  const allies = region__allies(nation)
  allies.forEach(ally => region__set_relation({ relation: 'neutral', n1: nation, n2: ally }))
  return [subjects_released, freedom].filter(({ text }) => text)
}

export const region__claim_province = (params: { nation: Region; province: Province }) => {
  const { nation, province } = params
  const old = window.world.regions[province.curr_nation]
  const severed = province__sever(province)
  const capitals = severed.filter(t => t.regional_capital).map(({ idx }) => idx)
  // remove capital cities from old owner
  old.regions = old.regions.filter(r => !capitals.includes(r))
  // add regions to new owner
  capitals.forEach(idx => {
    nation.regions.push(idx)
  })
  // remove city from old region's list of settlements
  old.provinces = old.provinces
    .map(t => window.world.provinces[t])
    .filter(c => !severed.includes(c))
    .map(({ idx }) => idx)
  // add it to the new region
  severed.forEach(province => {
    province.curr_nation = nation.idx
    province.prev_nation = old.idx
    nation.provinces.push(province.idx)
    if (province__is_capital(province) && province.artery.length === 0) {
      province.artery.push(province.idx)
    }
  })
  severed.forEach(province => {
    old.max_wealth -= province.wealth
    nation.max_wealth += province.wealth
  })
  // connect to the new capital artery
  const partials = severed.filter(city =>
    province__local_neighbors(city).some(c => province__connected(c))
  )
  const nation_capital = window.world.provinces[nation.capital]
  province__sort_closest(partials, nation_capital).forEach(city => {
    if (!province__connected(city)) {
      const connections = province__local_neighbors(city).filter(c => province__connected(c))
      const closest = province__find_closest(connections, city)
      province__attach(city, closest.idx)
    }
  })
  const active = region__is_active(old)
  const war_ended = !active ? release_contracts(old) : []
  if (!active) {
    old.wealth = 0
    war_ended.unshift({
      text: `${decorate_text({ link: old })} (${old.wealth.toFixed(
        2
      )}) has been taken by ${decorate_text({
        link: nation
      })} (${region__formatted_wealth(nation)}).`,
      actors: [nation.idx, old.idx]
    })
  }
  nation.borders_changed = true
  old.borders_changed = true
  return { conquered: severed, war_ended }
}

export const nation__annex_region = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const nation_capital = window.world.provinces[nation.capital]
  const cities = province__sort_closest(
    subject.provinces.map(t => window.world.provinces[t]),
    nation_capital
  )
  for (const claim of cities) {
    if (claim.curr_nation !== nation.idx) {
      region__claim_province({ nation, province: claim })
    }
  }
  subject.wealth = Math.max(0, subject.wealth)
  nation.wealth = Math.min(nation.max_wealth * 1.5, nation.wealth + subject.wealth)
}
export const nation__release_region = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const capital = window.world.provinces[subject.capital]
  const cities = province__sort_closest(
    nation.provinces
      .map(t => window.world.provinces[t])
      .filter(city => city.region === subject.idx && city.idx !== capital.idx),
    capital
  ).filter(province => province.memory.next_invasion.time < window.world.date)
  region__claim_province({ nation: subject, province: capital })
  for (const claim of cities) {
    if (claim.curr_nation !== subject.idx) {
      region__claim_province({ nation: subject, province: claim })
    }
  }
  event__succession.spawn({ nation: subject, init: true })
  subject.memory.last_update = window.world.date
}
