import { location__isSettlement } from '../../regions/locations'
import { Loc } from '../../regions/locations/types'
import { province__sprawl } from '../../regions/provinces/spawn/sprawl'
import { entity__tags, TaggedEntity } from './entities'

type CodexHistory = Record<TaggedEntity['tag'] & 'current', string>

export interface Codex {
  current: TaggedEntity['tag']
  location: number
  nation: number
  culture: number
  actor: number
  religion: number
  history: CodexHistory[]
}

export const codex__spawn: Codex = {
  current: null,
  location: null,
  nation: null,
  culture: null,
  actor: null,
  religion: null,
  history: []
}

const updateTarget: Record<
  TaggedEntity['tag'],
  (_params: { codex: Codex; idx: number }) => boolean
> = {
  nation: ({ idx, codex }) => {
    const old = codex.nation
    const region = window.world.regions[idx]
    const capital = window.world.provinces[region.capital]
    codex.nation = capital.nation
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
  }
}

const finalize = (codex: Codex) => {
  const loc = window.world.locations[codex.location]
  const province = window.world.provinces[loc?.province]
  if (province) province__sprawl(province)
}

export const codex__restoreHistory = (codex: Codex) => {
  const history = codex.history.pop()
  Object.entries<string>(history).forEach(([k, v]) => {
    if (k === 'current') codex[k] = v as TaggedEntity['tag']
    else updateTarget[k as TaggedEntity['tag']]({ codex, idx: parseInt(v) })
  })
  codex.history = [...codex.history]
  finalize(codex)
}

const addHistory = (codex: Codex, old: Codex) => {
  const past = old
  const history: CodexHistory = entity__tags.reduce(
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
  const oldCodex = { ...codex }
  const nullTag = codex.current === null
  const contentChange = updateTarget[tag]({ idx, codex })
  const catChange = codex.current !== tag
  const change = catChange || contentChange
  codex.current = tag
  if (change && !nullTag) addHistory(codex, oldCodex)
  finalize(codex)
}

export const codex__locationZoom = (loc: Loc) => {
  return location__isSettlement(loc) ? 50 : 100
}

export const codex__targetZoom = (target: UpdateCodex['target']) => {
  const { tag, idx } = target
  if (tag === 'nation') {
    const nation = window.world.regions[idx]
    const capital = window.world.provinces[nation.capital]
    const hub = window.world.locations[capital.hub]
    return { x: hub.x, y: hub.y, zoom: 10 }
  }
  if (tag === 'location') {
    const location = window.world.locations[idx]
    return { x: location.x, y: location.y, zoom: codex__locationZoom(location) }
  }
  return false
}
