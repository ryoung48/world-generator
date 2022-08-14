import { Rebellion } from '../../history/events/rebellion/types'
import { War } from '../../history/events/war/types'
import { actor__finalize } from '../../npcs/actors/spawn/finalize'
import { Actor } from '../../npcs/actors/types'
import { Beast } from '../../npcs/species/beasts/types'
import { Culture } from '../../npcs/species/humanoids/cultures/types'
import { religion__spawn_traits } from '../../npcs/species/humanoids/religions/traits'
import { Religion } from '../../npcs/species/humanoids/religions/types'
import { Primordial } from '../../npcs/species/primordials/types'
import { region__finalize } from '../../regions/finalize'
import { location__is_settlement } from '../../regions/locations'
import { location__spawn_traits } from '../../regions/locations/spawn/traits'
import { Loc } from '../../regions/locations/types'
import { province__sprawl } from '../../regions/provinces/spawn/sprawl'
import { Region } from '../../regions/types'
import { codex_categories, TaggedEntity } from './entities'

export type TaggedEntities =
  | Region
  | Loc
  | Culture
  | Religion
  | Actor
  | Beast
  | Primordial
  | War
  | Rebellion

type CodexHistory = Record<TaggedEntity['tag'] & 'current', string>

export interface Codex {
  current: TaggedEntity['tag']
  location: number
  nation: number
  culture: number
  religion: number
  actor: number
  war: number
  rebellion: number
  beast: number
  primordial: number
  history: CodexHistory[]
}

export const codex__spawn: Codex = {
  location: null,
  nation: null,
  culture: null,
  religion: null,
  actor: null,
  war: null,
  rebellion: null,
  beast: null,
  primordial: null,
  current: null,
  history: []
}

const update: Record<TaggedEntity['tag'], (_params: { codex: Codex; idx: number }) => boolean> = {
  nation: ({ idx, codex }) => {
    const old = codex.nation
    const region = window.world.regions[idx]
    const capital = window.world.provinces[region.capital]
    codex.nation = capital.curr_nation
    codex.location = capital.idx
    return old !== codex.nation
  },
  location: ({ idx, codex }) => {
    const old = codex.location
    codex.location = idx
    return old !== codex.location
  },
  culture: ({ idx, codex }) => {
    const old = codex.culture
    codex.culture = idx
    return old !== codex.culture
  },
  religion: ({ idx, codex }) => {
    const old = codex.religion
    codex.religion = idx
    return old !== codex.religion
  },
  actor: ({ idx, codex }) => {
    const old = codex.actor
    codex.actor = idx
    return old !== codex.actor
  },
  beast: ({ idx, codex }) => {
    const old = codex.beast
    codex.beast = idx
    return old !== codex.beast
  },
  primordial: ({ idx, codex }) => {
    const old = codex.primordial
    codex.primordial = idx
    return old !== codex.primordial
  },
  war: ({ idx, codex }) => {
    const old = codex.war
    codex.war = idx
    return old !== codex.war
  },
  rebellion: ({ idx, codex }) => {
    const old = codex.rebellion
    codex.rebellion = idx
    return old !== codex.rebellion
  }
}

const codex__finalize = (codex: Codex) => {
  const actor = window.world.actors[codex.actor]
  if (actor) actor__finalize(actor)
  const loc = window.world.locations[codex.location]
  const province = window.world.provinces[loc?.province]
  if (province) province__sprawl(province)
  region__finalize(window.world.regions[codex.nation])
  if (loc) location__spawn_traits(loc)
  const religion = window.world.religions[codex.religion]
  if (religion) religion__spawn_traits(religion)
}

export const codex__restore_history = (codex: Codex) => {
  const history = codex.history.pop()
  Object.entries<string>(history).forEach(([k, v]) => {
    if (k === 'current') codex[k] = v as TaggedEntity['tag']
    else update[k as TaggedEntity['tag']]({ codex, idx: parseInt(v) })
  })
  codex.history = [...codex.history]
  codex__finalize(codex)
}

export const codex__add_history = (codex: Codex, old?: Codex) => {
  const past = old ?? codex
  const history: CodexHistory = codex_categories.reduce(
    (hist, k) => {
      return { ...hist, [k]: past[k]?.toString() }
    },
    { current: past.current }
  )
  codex.history = [...codex.history, history]
}

export interface UpdateCodex {
  target: Omit<TaggedEntity, 'name'>
  codex: Codex
}

export const codex__update = ({ target, codex }: UpdateCodex) => {
  const { idx, tag } = target
  const old_codex = { ...codex }
  const null_tag = codex.current === null
  const content_change = update[tag]({ idx, codex })
  const cat_change = codex.current !== tag
  const change = cat_change || content_change
  codex.current = tag
  if (change && !null_tag) codex__add_history(codex, old_codex)
  codex__finalize(codex)
}

export const location__zoom = (loc: Loc) => {
  return location__is_settlement(loc) ? 50 : 100
}

export const codex__zoom_location = (target: UpdateCodex['target']) => {
  const { tag, idx } = target
  if (tag === 'nation') {
    const nation = window.world.regions[idx]
    const capital = window.world.provinces[nation.capital]
    const hub = window.world.locations[capital.hub]
    return { x: hub.x, y: hub.y, zoom: 10 }
  }
  if (tag === 'location') {
    const location = window.world.locations[idx]
    return { x: location.x, y: location.y, zoom: location__zoom(location) }
  }
  return false
}
