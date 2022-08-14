import { entity__traits } from '../../../../utilities/traits'
import { region__colonists } from '../../../diplomacy/colonies'
import { Loc } from '../../types'
import { location__templates } from '../taxonomy'
import { dungeon__traits } from './dungeons'
import { settlement__traits } from './settlements'
import { location__tag, LocationTrait } from './types'

const location__traits: Record<location__tag, LocationTrait> = {
  ...dungeon__traits,
  ...settlement__traits
}

const dungeon_traits = new Set(Object.keys(dungeon__traits))
const settlement_traits = new Set(Object.keys(settlement__traits))

type categories = 'dungeon' | 'settlement'
const trait_categories: Record<categories, (_trait: LocationTrait) => boolean> = {
  dungeon: trait => dungeon_traits.has(trait.tag),
  settlement: trait => settlement_traits.has(trait.tag)
}

const { colors, spawn } = entity__traits({ traits: location__traits, tag: 'location' })

const check_embassy = (loc: Loc) => {
  const region = window.world.regions[loc.region]
  const colonists = region__colonists(region)
  return loc.hub && loc.province === region.colonial_presence.embassy && colonists.length > 1
}

/**
 * Assigns traits to a location site
 * @param loc - location site
 */
export const location__spawn_traits = (loc: Loc) => {
  if (!loc.finalized) {
    loc.finalized = true
    if (!loc.hostile && !loc.population) return
    const pre_selected = location__templates[loc.type]?.traits?.(loc) ?? []
    const type = loc.hostile ? 'dungeon' : 'settlement'
    if (!loc.hostile && check_embassy(loc)) pre_selected.push('colonial embassies')
    pre_selected.map(tag => location__traits[tag]).forEach(trait => spawn({ entity: loc, trait }))
    while (loc.traits.length < 3) {
      spawn({ entity: loc, filter: trait_categories[type] })
    }
  }
}

export const location__trait_colors = colors
