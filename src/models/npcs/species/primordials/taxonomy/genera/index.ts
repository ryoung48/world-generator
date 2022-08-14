import { Primordial } from '../../types'
import { lichens } from './fungi/lichens'
import { molds } from './fungi/mold'
import { mushrooms } from './fungi/mushrooms'
import { algae } from './plants/algae'
import { ferns } from './plants/ferns'
import { grass } from './plants/grass'
import { herbaceous } from './plants/herbaceous'
import { moss } from './plants/moss'
import { shrubs } from './plants/shrubs'
import { succulents } from './plants/succulents'
import { trees } from './plants/trees'
import { vines } from './plants/vines'
import { PrimordialGenus } from './types'

export const primordial__genera: Record<Primordial['genus'], PrimordialGenus> = {
  mushroom: mushrooms,
  lichen: lichens,
  mold: molds,
  tree: trees,
  shrub: shrubs,
  vine: vines,
  herbaceous: herbaceous,
  grass: grass,
  fern: ferns,
  moss: moss,
  algae: algae,
  succulent: succulents
}
