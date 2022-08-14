import { location__random_destination } from '../../../regions/locations/actors/demographics/origins'
import {
  location__random_profession,
  location__valid_profession
} from '../../../regions/locations/actors/professions'
import { year_ms } from '../../../utilities/math/time'
import { species__by_culture } from '../../species/humanoids/taxonomy'
import { actor__relation } from '..'
import { actor__is_child, actor__life_phase } from '../stats/age'
import { convert_age_standard, life_phases } from '../stats/age/life_phases'
import {
  profession__progression,
  profession__set,
  profession__social_class,
  social_class__random_drift
} from '../stats/professions'
import { fluency__apply_skill, native_speaker } from '../stats/skills/fluency'
import { Actor } from '../types'
import { actor__events } from './events'

const event_loc_change = (loc: number) => (e: { time: number; loc: number }) =>
  e.loc !== undefined && e.loc !== loc

export const actor__init_background = (actor: Actor) => {
  fluency__apply_skill({
    actor,
    exp: native_speaker,
    culture: actor.culture,
    loc: actor.location.birth,
    force: true
  })
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const childhood = convert_age_standard(ages, window.dice.uniform(12, 16))
  actor.history.childhood_end = actor.birth_date + childhood * year_ms
  actor.history.next_background = actor.history.childhood_end
  // check to see if parents move before childhood ends
  const parents = background__check_relation({
    actor,
    start: actor.birth_date,
    end: actor.history.next_background,
    type: 'parent'
  }).filter(event_loc_change(actor.location.birth))
  const [next] = parents.sort((a, b) => a.time - b.time)
  if (next) actor.history.next_background = next.time
  // create the first childhood background
  actor.history.backgrounds = [
    {
      loc: actor.location.birth,
      start: actor.birth_date
    }
  ]
  // set transition cutoff after which location is static (based on spouse if applicable)
  const [spouse] = actor__relation({ actor, type: 'spouse' })
  actor.history.transition_cutoff =
    spouse?.history.transition_cutoff ??
    actor.birth_date +
      window.dice.weighted_choice([
        { v: ages['childhood'], w: 0.3 },
        { v: ages['adolescence'], w: 0.3 },
        { v: ages['young adult'], w: 0.1 },
        { v: ages['adult'], w: 0.1 },
        { v: ages['middle age'], w: 0.1 }
      ]) *
        year_ms
}

interface BackgroundProps {
  actor: Actor
  start: number
  end: number
}

interface BackgroundCheckProps extends BackgroundProps {
  loc: number
}

export const background__find_events = ({
  actor,
  start,
  end = window.world.date
}: BackgroundProps) =>
  actor__events({ actor, type: 'child' })
    .concat(actor__events({ actor, type: 'union' }))
    .filter(e => e.time >= start && e.time < end)

const background__find = ({ actor, start, end = window.world.date }: BackgroundProps) =>
  actor.history.backgrounds.filter(b => b.start >= start && b.start < end)

const transition_chance: Record<life_phases, number> = {
  childhood: 0.01,
  adolescence: 0.05,
  'young adult': 0.1,
  adult: 0.05,
  'middle age': 0.025,
  old: 0,
  venerable: 0
}

const background__check_relation = (
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

const background__check_spouse = (params: BackgroundProps) => {
  const [union] = actor__events({ actor: params.actor, type: 'union' })
  return background__check_relation({ ...params, type: 'spouse' }).filter(
    e => e.time >= union?.time
  )
}

const background__planned_events = (params: BackgroundCheckProps) => {
  const child = actor__is_child({ actor: params.actor, ref_date: params.start })
  const spouse = background__check_spouse(params)
  const parent = child
    ? background__check_relation({ ...params, type: 'parent' }).filter(({ time }) =>
        actor__is_child({ actor: params.actor, ref_date: time })
      )
    : []
  const children = background__check_relation({ ...params, type: 'child' }).filter(
    ({ actor, time }) => actor__is_child({ actor, ref_date: time })
  )
  const events = background__find_events(params).map(e => ({ time: e.time, loc: e.loc }))
  return {
    parent_bound: parent.length > 0,
    spouse_bound: spouse.length > 0,
    planned: [...events, ...spouse, ...parent, ...children].filter(event_loc_change(params.loc))
  }
}

const background__event_location = (params: BackgroundCheckProps) => {
  const { planned, parent_bound, spouse_bound } = background__planned_events(params)
  const [next] = planned.sort((a, b) => a.time - b.time)
  return {
    next_loc: next,
    bound: spouse_bound || parent_bound
  }
}

const background__check_relations = (params: BackgroundCheckProps) => {
  const { planned } = background__planned_events(params)
  const [early_end] = planned.sort((a, b) => a.time - b.time)
  return early_end
}

const background__skill_record = (
  start: number
): Actor['history']['backgrounds'][number]['skills'][number] => ({
  start,
  check_date: start,
  exp: {}
})

export const actor__check_background = (actor: Actor) => {
  const target_profession = actor.occupation
  const location_cutoff = actor.history.transition_cutoff
  const target_progress = profession__progression({
    actor,
    profession: target_profession,
    time: actor.history.next_background
  })
  const profession_cutoff = Math.min(
    location_cutoff,
    actor.spawn_date - Math.max(5, target_progress.total) * year_ms,
    target_progress.transition ? Infinity : actor.history.next_background
  )
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  while (
    actor.history.next_background < window.world.date &&
    actor.history.next_background < actor.expires
  ) {
    let end = actor.history.next_background
    const [curr] = actor.history.backgrounds.slice(-1)
    let { occupation: next_profession, loc } = curr
    let next_target = { key: curr.target }
    const { start } = curr
    const last_skills = curr.skills?.slice(-1)?.[0]
    // get the next background check date
    const next = end + convert_age_standard(ages, window.dice.uniform(4, 6)) * year_ms
    // determine if this check corresponds to the current date
    // we don't want to change locations|professions for npcs on the current date
    // because we need certain actors to stay where they are and do what they do for quest purposes
    const locked = next >= window.world.date
    const phase = actor__life_phase({ actor, ref_date: start })
    const odds = transition_chance[phase]
    // will this actor move to a new location?
    const { bound, next_loc } = background__event_location({
      actor,
      start: end,
      end: next,
      loc
    })
    if (next_loc) end = next_loc.time
    const event_transition = next_loc !== undefined && loc !== next_loc.loc
    const location_locked = locked || next >= location_cutoff
    const planned_transition = location_locked && actor.location.residence !== loc && !bound
    const random_transition = !location_locked && !bound && odds > window.dice.random
    let curr_loc = window.world.locations[loc]
    if (planned_transition || event_transition || random_transition) {
      loc = planned_transition
        ? actor.location.residence
        : event_transition
        ? next_loc.loc
        : location__random_destination(curr_loc).idx
    }
    curr_loc = window.world.locations[loc]
    // will this actor take up a new profession?
    let prof_change = false
    const adult = end >= actor.history.childhood_end
    if (adult) {
      const profession_odds = odds * (next_target.key === target_profession.key ? 0.5 : 1)
      const profession_locked = locked || next >= profession_cutoff
      const random_profession = !profession_locked && profession_odds > window.dice.random
      const fresh_start =
        !profession_locked &&
        (!next_target.key ||
          !location__valid_profession({
            profession: next_target.key ?? target_progress.profession.key,
            time: end,
            loc: curr_loc
          }))
      if (fresh_start || profession_locked || random_profession) {
        const social = social_class__random_drift(
          profession__social_class(next_profession?.key ?? target_progress.profession.key)
        )
        next_target = profession_locked
          ? target_profession
          : { key: location__random_profession({ loc: curr_loc, social, time: end }) }
        profession__set({ actor, profession: next_target })
      }
      // has this actor's profession changed?
      next_profession = profession__progression({
        actor,
        profession: next_target,
        time: end
      }).profession
      prof_change =
        next_profession.key !== curr.occupation?.key ||
        next_profession.spec !== curr.occupation?.spec
    }
    // if there are any changes, end the current background
    // and start the next one
    if (prof_change || loc !== curr.loc) {
      curr.end = end
      actor.history.backgrounds.push({
        loc,
        target: next_target.key,
        occupation: next_profession,
        start: end,
        skills: adult ? [background__skill_record(end)] : undefined
      })
    } else if (curr.skills) {
      curr.skills.push(background__skill_record(end))
    }
    if (next >= actor.expires) {
      const [final_background] = actor.history.backgrounds.slice(-1)
      final_background.end = actor.expires
      const final_skills = final_background.skills?.slice(-1)?.[0]
      if (final_skills) final_skills.end = final_background.end
      // TODO: this does not remove them from the planned location list
      actor.location.residence = final_background.loc
      actor.occupation = final_background.occupation
    }
    if (last_skills) last_skills.end = end
    // figure out if the next event comes before the next check
    const next_promotion = adult
      ? profession__progression({
          actor,
          profession: actor.occupation,
          time: end
        }).next *
          year_ms +
        end
      : Infinity
    const [next_background] = actor.history.backgrounds.slice(-1)
    const next_event = background__check_relations({
      actor,
      start: next_background.start,
      end: next,
      loc: next_background.loc
    })
    const childhood_end = !adult ? actor.history.childhood_end : Infinity
    actor.history.next_background = Math.min(
      next,
      actor.expires,
      childhood_end,
      next_promotion,
      next_event?.time ?? Infinity
    )
  }
  const [latest] = actor.history.backgrounds.slice(-1)
  actor.location.residence = latest.loc
}
