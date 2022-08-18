import {
  location__randomProfession,
  location__validProfession
} from '../../../regions/locations/actors'
import { location__randomDestination } from '../../../regions/locations/actors/demographics/origins'
import { yearMS } from '../../../utilities/math/time'
import { species__byCulture } from '../../species/taxonomy'
import { actor__relation } from '..'
import { actor__isChild, actor__lifePhase } from '../stats/age'
import { convertAgeStandard, LifePhase } from '../stats/age/life_phases'
import {
  profession__progression,
  profession__set,
  profession__socialClass,
  socialClass__randomDrift
} from '../stats/professions'
import { fluency__applySkill, nativeSpeaker } from '../stats/skills/fluency'
import { Actor } from '../types'
import { actor__events } from './events'

const eventLocChange = (loc: number) => (e: { time: number; loc: number }) =>
  e.loc !== undefined && e.loc !== loc

export const actor__initBackground = (actor: Actor) => {
  fluency__applySkill({
    actor,
    exp: nativeSpeaker,
    culture: actor.culture,
    loc: actor.location.birth,
    force: true
  })
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const childhood = convertAgeStandard(ages, window.dice.uniform(12, 16))
  actor.history.childhoodEnd = actor.birthDate + childhood * yearMS
  actor.history.nextBackground = actor.history.childhoodEnd
  // check to see if parents move before childhood ends
  const parents = background__checkRelation({
    actor,
    start: actor.birthDate,
    end: actor.history.nextBackground,
    type: 'parent'
  }).filter(eventLocChange(actor.location.birth))
  const [next] = parents.sort((a, b) => a.time - b.time)
  if (next) actor.history.nextBackground = next.time
  // create the first childhood background
  actor.history.backgrounds = [
    {
      loc: actor.location.birth,
      start: actor.birthDate
    }
  ]
  // set transition cutoff after which location is static (based on spouse if applicable)
  const [spouse] = actor__relation({ actor, type: 'spouse' })
  actor.history.transitionCutoff =
    spouse?.history.transitionCutoff ??
    actor.birthDate +
      window.dice.weightedChoice([
        { v: ages['childhood'], w: 0.3 },
        { v: ages['adolescence'], w: 0.3 },
        { v: ages['young adult'], w: 0.1 },
        { v: ages['adult'], w: 0.1 },
        { v: ages['middle age'], w: 0.1 }
      ]) *
        yearMS
}

interface BackgroundProps {
  actor: Actor
  start: number
  end: number
}

interface BackgroundCheckProps extends BackgroundProps {
  loc: number
}

export const background__findEvents = ({
  actor,
  start,
  end = window.world.date
}: BackgroundProps) =>
  actor__events({ actor, type: 'child' })
    .concat(actor__events({ actor, type: 'union' }))
    .filter(e => e.time >= start && e.time < end)

const background__find = ({ actor, start, end = window.world.date }: BackgroundProps) =>
  actor.history.backgrounds.filter(b => b.start >= start && b.start < end)

const transitionChance: Record<LifePhase, number> = {
  childhood: 0.01,
  adolescence: 0.05,
  'young adult': 0.1,
  adult: 0.05,
  'middle age': 0.025,
  old: 0,
  venerable: 0
}

const background__checkRelation = (
  params: BackgroundProps & { type: Actor['relations'][number]['type'] }
) => {
  const { actor, start, end, type } = params
  const relations = actor__relation({ actor, type })
  return relations
    .map(relation => {
      const backgrounds = background__find({ actor: relation, start, end })
      return backgrounds.map(background => ({
        time: background.start,
        loc: background.loc,
        actor
      }))
    })
    .flat()
}

const background__checkSpouse = (params: BackgroundProps) => {
  const [union] = actor__events({ actor: params.actor, type: 'union' })
  return background__checkRelation({ ...params, type: 'spouse' }).filter(e => e.time >= union?.time)
}

const background__plannedEvents = (params: BackgroundCheckProps) => {
  const child = actor__isChild({ actor: params.actor, refDate: params.start })
  const spouse = background__checkSpouse(params)
  const parent = child
    ? background__checkRelation({ ...params, type: 'parent' }).filter(({ time }) =>
        actor__isChild({ actor: params.actor, refDate: time })
      )
    : []
  const children = background__checkRelation({ ...params, type: 'child' }).filter(
    ({ actor, time }) => actor__isChild({ actor, refDate: time })
  )
  const events = background__findEvents(params).map(e => ({ time: e.time, loc: e.loc }))
  return {
    parentBound: parent.length > 0,
    spouseBound: spouse.length > 0,
    planned: [...events, ...spouse, ...parent, ...children].filter(eventLocChange(params.loc))
  }
}

const background__eventLocation = (params: BackgroundCheckProps) => {
  const { planned, parentBound, spouseBound } = background__plannedEvents(params)
  const [next] = planned.sort((a, b) => a.time - b.time)
  return {
    nextLoc: next,
    bound: spouseBound || parentBound
  }
}

const background__checkRelations = (params: BackgroundCheckProps) => {
  const { planned } = background__plannedEvents(params)
  const [earlyEnd] = planned.sort((a, b) => a.time - b.time)
  return earlyEnd
}

const background__skillRecord = (
  start: number
): Actor['history']['backgrounds'][number]['skills'][number] => ({
  start,
  checkDate: start,
  exp: {}
})

export const actor__checkBackground = (actor: Actor) => {
  const targetProfession = actor.occupation
  const locationCutoff = actor.history.transitionCutoff
  const targetProgress = profession__progression({
    actor,
    profession: targetProfession,
    time: actor.history.nextBackground
  })
  const professionCutoff = Math.min(
    locationCutoff,
    actor.spawnDate - Math.max(5, targetProgress.total) * yearMS,
    targetProgress.transition ? Infinity : actor.history.nextBackground
  )
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  while (
    actor.history.nextBackground < window.world.date &&
    actor.history.nextBackground < actor.expires
  ) {
    let end = actor.history.nextBackground
    const [curr] = actor.history.backgrounds.slice(-1)
    let { occupation: nextProfession, loc } = curr
    let nextTarget = { key: curr.target }
    const { start } = curr
    const lastSkills = curr.skills?.slice(-1)?.[0]
    // get the next background check date
    const next = end + convertAgeStandard(ages, window.dice.uniform(4, 6)) * yearMS
    // determine if this check corresponds to the current date
    // we don't want to change locations|professions for npcs on the current date
    // because we need certain actors to stay where they are and do what they do for quest purposes
    const locked = next >= window.world.date
    const phase = actor__lifePhase({ actor, refDate: start })
    const odds = transitionChance[phase]
    // will this actor move to a new location?
    const { bound, nextLoc } = background__eventLocation({
      actor,
      start: end,
      end: next,
      loc
    })
    if (nextLoc) end = nextLoc.time
    const eventTransition = nextLoc !== undefined && loc !== nextLoc.loc
    const locationLocked = locked || next >= locationCutoff
    const plannedTransition = locationLocked && actor.location.residence !== loc && !bound
    const randomTransition = !locationLocked && !bound && odds > window.dice.random
    let currLoc = window.world.locations[loc]
    if (plannedTransition || eventTransition || randomTransition) {
      loc = plannedTransition
        ? actor.location.residence
        : eventTransition
        ? nextLoc.loc
        : location__randomDestination(currLoc).idx
    }
    currLoc = window.world.locations[loc]
    // will this actor take up a new profession?
    let profChange = false
    const adult = end >= actor.history.childhoodEnd
    if (adult) {
      const professionOdds = odds * (nextTarget.key === targetProfession.key ? 0.5 : 1)
      const professionLocked = locked || next >= professionCutoff
      const randomProfession = !professionLocked && professionOdds > window.dice.random
      const freshStart =
        !professionLocked &&
        (!nextTarget.key ||
          !location__validProfession({
            profession: nextTarget.key ?? targetProgress.profession.key,
            time: end,
            loc: currLoc
          }))
      if (freshStart || professionLocked || randomProfession) {
        const social = socialClass__randomDrift(
          profession__socialClass(nextProfession?.key ?? targetProgress.profession.key)
        )
        nextTarget = professionLocked
          ? targetProfession
          : { key: location__randomProfession({ loc: currLoc, social, time: end }) }
        profession__set({ actor, profession: nextTarget })
      }
      // has this actor's profession changed?
      nextProfession = profession__progression({
        actor,
        profession: nextTarget,
        time: end
      }).profession
      profChange =
        nextProfession.key !== curr.occupation?.key || nextProfession.spec !== curr.occupation?.spec
    }
    // if there are any changes, end the current background
    // and start the next one
    if (profChange || loc !== curr.loc) {
      curr.end = end
      actor.history.backgrounds.push({
        loc,
        target: nextTarget.key,
        occupation: nextProfession,
        start: end,
        skills: adult ? [background__skillRecord(end)] : undefined
      })
    } else if (curr.skills) {
      curr.skills.push(background__skillRecord(end))
    }
    if (next >= actor.expires) {
      const [finalBackground] = actor.history.backgrounds.slice(-1)
      finalBackground.end = actor.expires
      const finalSkills = finalBackground.skills?.slice(-1)?.[0]
      if (finalSkills) finalSkills.end = finalBackground.end
      // TODO: this does not remove them from the planned location list
      actor.location.residence = finalBackground.loc
      actor.occupation = finalBackground.occupation
    }
    if (lastSkills) lastSkills.end = end
    // figure out if the next event comes before the next check
    const nextPromotion = adult
      ? profession__progression({
          actor,
          profession: actor.occupation,
          time: end
        }).next *
          yearMS +
        end
      : Infinity
    const [nextBackground] = actor.history.backgrounds.slice(-1)
    const nextEvent = background__checkRelations({
      actor,
      start: nextBackground.start,
      end: next,
      loc: nextBackground.loc
    })
    const childhoodEnd = !adult ? actor.history.childhoodEnd : Infinity
    actor.history.nextBackground = Math.min(
      next,
      actor.expires,
      childhoodEnd,
      nextPromotion,
      nextEvent?.time ?? Infinity
    )
  }
  const [latest] = actor.history.backgrounds.slice(-1)
  actor.location.residence = latest.loc
}
