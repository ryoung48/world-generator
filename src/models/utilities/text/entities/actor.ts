import { actor__location } from '../../../npcs/actors'
import { actor__spawn_parents } from '../../../npcs/actors/spawn/relations/parent'
import { actor__age, actor__expired, actor__life_phase_adj } from '../../../npcs/actors/stats/age'
import { profession__title } from '../../../npcs/actors/stats/professions'
import { Actor } from '../../../npcs/actors/types'
import { decorate_text } from '../decoration'

interface ActorDetailsParams {
  actor: Actor
  link?: boolean
}

// narrative nouns|pronouns|information
export const actor__details = {
  name: ({ actor, link }: ActorDetailsParams) => {
    return link
      ? decorate_text({ link: actor, tooltip: profession__title({ actor }).toLowerCase() })
      : actor.name
  },
  full_name: ({ actor, link }: ActorDetailsParams) => {
    const name = `${actor.name} ${actor.surname}`
    return link
      ? decorate_text({
          link: actor,
          label: name,
          tooltip: profession__title({ actor }).toLowerCase()
        })
      : name
  },
  name_s: ({ actor, link }: ActorDetailsParams) => {
    const label = `${actor.name}'${actor.name.slice(-1) !== 's' ? 's' : ''}`
    return link
      ? decorate_text({ link: actor, label, tooltip: profession__title({ actor }).toLowerCase() })
      : label
  },
  subject: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'he' : 'she'
    return link ? decorate_text({ link: actor, label }) : label
  },
  object: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'him' : 'her'
    return link ? decorate_text({ link: actor, label }) : label
  },
  possessive: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'his' : 'her'
    return link ? decorate_text({ link: actor, label }) : label
  },
  location: ({ actor, link }: ActorDetailsParams) => {
    const loc = actor__location(actor)
    return link ? decorate_text({ link: loc }) : loc.name
  },
  age: ({ actor }: ActorDetailsParams) => {
    const age = actor__age({ actor, expire_cap: true })
    let phase = actor__life_phase_adj({ actor, expire_cap: true })
    if (age <= 1) phase = 'an infant'
    const expired = actor__expired(actor)
    return decorate_text({
      label: phase,
      tooltip: `${age} years old${expired ? ' (deceased)' : ''}`
    })
  },
  species: ({ actor }: ActorDetailsParams) => {
    const { culture } = actor
    const actor_culture = window.world.cultures[culture]
    return decorate_text({
      label: actor_culture.species.toLowerCase(),
      link: actor_culture,
      tooltip: actor_culture.name.toLowerCase()
    })
  }
}

export const actor__describe_relation = (params: { actor: Actor; ref: Actor }) => {
  const { actor, ref } = params
  const actor_parents = actor__spawn_parents(actor)
  const ref_parents = actor__spawn_parents(ref)
  if (actor_parents.some(parent => ref_parents.includes(parent))) {
    const actor_age = actor__age({ actor })
    const ref_age = actor__age({ actor: ref })
    return `${actor_age > ref_age ? 'younger' : 'older'} ${
      ref.gender === 'female' ? 'sister' : 'brother'
    }`
  }
  return false
}
