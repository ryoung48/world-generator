import { decorateText } from '../../../utilities/text/decoration'
import { actor__location } from '..'
import { actor__age, actor__expired, actor__lifePhaseAdj } from '../stats/age'
import { profession__title } from '../stats/professions'
import { Actor } from '../types'

interface ActorDetailsParams {
  actor: Actor
  link?: boolean
}

// narrative nouns|pronouns|information
export const actor__details = {
  name: ({ actor, link }: ActorDetailsParams) => {
    return link
      ? decorateText({ link: actor, tooltip: profession__title({ actor }).toLowerCase() })
      : actor.name
  },
  fullName: ({ actor, link }: ActorDetailsParams) => {
    const name = `${actor.name} ${actor.surname}`
    return link
      ? decorateText({
          link: actor,
          label: name,
          tooltip: profession__title({ actor }).toLowerCase()
        })
      : name
  },
  nameS: ({ actor, link }: ActorDetailsParams) => {
    const label = `${actor.name}'${actor.name.slice(-1) !== 's' ? 's' : ''}`
    return link
      ? decorateText({ link: actor, label, tooltip: profession__title({ actor }).toLowerCase() })
      : label
  },
  subject: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'he' : 'she'
    return link ? decorateText({ link: actor, label }) : label
  },
  object: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'him' : 'her'
    return link ? decorateText({ link: actor, label }) : label
  },
  possessive: ({ actor, link }: ActorDetailsParams) => {
    const label = actor.gender === 'male' ? 'his' : 'her'
    return link ? decorateText({ link: actor, label }) : label
  },
  location: ({ actor, link }: ActorDetailsParams) => {
    const loc = actor__location(actor)
    return link ? decorateText({ link: loc }) : loc.name
  },
  age: ({ actor }: ActorDetailsParams) => {
    const age = actor__age({ actor, expireCap: true })
    let phase = actor__lifePhaseAdj({ actor, expireCap: true })
    if (age <= 1) phase = 'an infant'
    const expired = actor__expired(actor)
    return decorateText({
      label: phase,
      tooltip: `${age} years old${expired ? ' (deceased)' : ''}`
    })
  },
  species: ({ actor, link }: ActorDetailsParams) => {
    const { culture } = actor
    const actorCulture = window.world.cultures[culture]
    return link
      ? decorateText({
          label: actorCulture.species.toLowerCase(),
          link: actorCulture,
          tooltip: actorCulture.name.toLowerCase()
        })
      : actorCulture.species.toLowerCase()
  }
}
