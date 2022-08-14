import { actor__expired } from '../../../npcs/actors/stats/age'
import { Profession } from '../../../npcs/actors/stats/professions/types'
import { Actor } from '../../../npcs/actors/types'
import { Loc } from '../types'

const location__living_actors = (location: Loc) =>
  location.actors.map(a => window.world.actors[a]).filter(actor => !actor__expired(actor))

const location__find_actor = (params: { location: Loc; condition: (_actor: Actor) => boolean }) => {
  const { location, condition } = params
  return location__living_actors(location).filter(actor => condition(actor))
}

export const location__find_profession = (params: {
  location: Loc
  professions: Profession['key'][]
}) => {
  const { location, professions } = params
  return location__find_actor({
    location,
    condition: (npc: Actor) => professions.includes(npc.occupation.key)
  })
}
