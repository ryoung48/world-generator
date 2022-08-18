import { logEvent } from '../../history'
import { event__succession } from '../../history/events/succession'
import { titleCase } from '../../utilities/text'
import { decorateText } from '../../utilities/text/decoration'
import { region__isActive } from '..'
import {
  province__findClosest,
  province__isCapital,
  province__localNeighbors,
  province__sortClosest
} from '../provinces'
import { province__attach, province__connected, province__sever } from '../provinces/arteries'
import { Province } from '../provinces/types'
import { Region } from '../types'
import { region__allies, region__setRelation } from './relations'
import { region__formattedWealth } from './status'

export const region__claimSubject = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const free = region__releaseSubjects(subject)
  subject.overlord.idx = nation.idx
  subject.overlord.joinDate = window.world.date
  nation.subjects.push(subject.idx)
  region__setRelation({ relation: 'ally', n1: nation, n2: subject })
  const text = `${decorateText({ link: subject })} (${region__formattedWealth(
    subject
  )}) becomes a vassal of ${decorateText({
    link: nation
  })} (${region__formattedWealth(nation)}) ${free.text}.`
  logEvent({
    eventType: 'diplomacy',
    title: `New Vassal: ${decorateText({ link: subject })}`,
    text,
    actors: [nation, subject]
  })
  return {
    text: `${decorateText({ link: subject })} (${region__formattedWealth(
      subject
    )}) becomes a vassal of ${decorateText({
      link: nation
    })} (${region__formattedWealth(nation)}) ${free.text}.`,
    actors: Array.from(new Set([nation, subject].map(({ idx }) => idx).concat(free.actors)))
  }
}

const region__releaseSubjects = (nation: Region) => {
  const outcome = { text: '', actors: [nation.idx] }
  if (nation.subjects.length > 0) {
    outcome.text = `The subjects of ${decorateText({
      link: nation
    })} have been released: ${nation.subjects
      .map(s => decorateText({ link: window.world.regions[s] }))
      .join(', ')}.`
    outcome.actors.push(...nation.subjects)
    nation.subjects.forEach(s => {
      const subject = window.world.regions[s]
      subject.overlord.idx = -1
      region__setRelation({ relation: 'suspicious', n1: nation, n2: subject })
    })
    nation.subjects = []
    logEvent({
      eventType: 'diplomacy',
      title: `Lost Subjects: ${decorateText({ link: nation })}`,
      text: outcome.text,
      actors: outcome.actors.map(r => window.world.regions[r])
    })
  }
  return outcome
}
export const region__releaseOverlord = (nation: Region) => {
  const outcome = { text: '', actors: [nation.idx] }
  const suzerain = window.world.regions[nation.overlord.idx]
  if (suzerain) {
    nation.overlord.idx = -1
    region__setRelation({ relation: 'suspicious', n1: nation, n2: suzerain })
    const capital = window.world.provinces[nation.capital]
    const verbiage = suzerain.idx === capital.currNation ? 'annexed' : 'lost'
    outcome.text = `${decorateText({
      link: suzerain
    })} has ${verbiage} it's vassal ${decorateText({
      link: nation
    })}.`
    outcome.actors.push(suzerain.idx)
    suzerain.subjects = suzerain.subjects.filter(subject => subject !== nation.idx)
    logEvent({
      eventType: 'diplomacy',
      title: `${titleCase(verbiage)} Vassal: ${decorateText({ link: nation })}`,
      text: outcome.text,
      actors: outcome.actors.map(r => window.world.regions[r])
    })
  }
  return outcome
}

const releaseContracts = (nation: Region) => {
  // subjects
  const subjectsReleased = region__releaseSubjects(nation)
  // overlord
  const freedom = region__releaseOverlord(nation)
  // allies
  const allies = region__allies(nation)
  allies.forEach(ally => region__setRelation({ relation: 'neutral', n1: nation, n2: ally }))
  return [subjectsReleased, freedom].filter(({ text }) => text)
}

export const region__claimProvince = (params: { nation: Region; province: Province }) => {
  const { nation, province } = params
  const old = window.world.regions[province.currNation]
  const severed = province__sever(province)
  const capitals = severed.filter(t => t.regionalCapital).map(({ idx }) => idx)
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
    province.currNation = nation.idx
    province.prevNation = old.idx
    nation.provinces.push(province.idx)
    if (province__isCapital(province) && province.artery.length === 0) {
      province.artery.push(province.idx)
    }
  })
  severed.forEach(province => {
    old.maxWealth -= province.wealth
    nation.maxWealth += province.wealth
  })
  // connect to the new capital artery
  const partials = severed.filter(city =>
    province__localNeighbors(city).some(c => province__connected(c))
  )
  const nationCapital = window.world.provinces[nation.capital]
  province__sortClosest(partials, nationCapital).forEach(city => {
    if (!province__connected(city)) {
      const connections = province__localNeighbors(city).filter(c => province__connected(c))
      const closest = province__findClosest(connections, city)
      province__attach(city, closest.idx)
    }
  })
  const active = region__isActive(old)
  const warEnded = !active ? releaseContracts(old) : []
  if (!active) {
    old.wealth = 0
    warEnded.unshift({
      text: `${decorateText({ link: old })} (${old.wealth.toFixed(
        2
      )}) has been taken by ${decorateText({
        link: nation
      })} (${region__formattedWealth(nation)}).`,
      actors: [nation.idx, old.idx]
    })
  }
  nation.bordersChanged = true
  old.bordersChanged = true
  return { conquered: severed, warEnded }
}

export const nation__annexRegion = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const nationCapital = window.world.provinces[nation.capital]
  const cities = province__sortClosest(
    subject.provinces.map(t => window.world.provinces[t]),
    nationCapital
  )
  for (const claim of cities) {
    if (claim.currNation !== nation.idx) {
      region__claimProvince({ nation, province: claim })
    }
  }
  subject.wealth = Math.max(0, subject.wealth)
  nation.wealth = Math.min(nation.maxWealth * 1.5, nation.wealth + subject.wealth)
}
export const nation__releaseRegion = (params: { nation: Region; subject: Region }) => {
  const { nation, subject } = params
  const capital = window.world.provinces[subject.capital]
  const cities = province__sortClosest(
    nation.provinces
      .map(t => window.world.provinces[t])
      .filter(city => city.region === subject.idx && city.idx !== capital.idx),
    capital
  ).filter(province => province.memory.nextInvasion.time < window.world.date)
  region__claimProvince({ nation: subject, province: capital })
  for (const claim of cities) {
    if (claim.currNation !== subject.idx) {
      region__claimProvince({ nation: subject, province: claim })
    }
  }
  event__succession.spawn({ nation: subject, init: true })
  subject.memory.lastUpdate = window.world.date
}
