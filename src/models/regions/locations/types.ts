import { location__icons } from '../../../components/maps/icons/locations'
import { Thread } from '../../threads/types'
import { TaggedEntity } from '../../utilities/codex/entities'
import { Point } from '../../utilities/math/points'

export interface Loc extends Point, TaggedEntity {
  tag: 'location'
  type:
    | 'metropolis'
    | 'huge city'
    | 'large city'
    | 'small city'
    | 'large town'
    | 'small town'
    | 'large village'
    | 'small village'
    | 'tiny village'
    | 'cave'
    | 'keep'
    | 'crypt'
    | 'temple'
    | 'ruins'
    | 'camp'
    | 'portal'
    | 'shrine'
    | 'mine'
    | 'farm'
    | 'inn'
    | 'laboratory'
    | 'battlefield'
    | 'shipwreck'
    | 'lighthouse'
    | 'watchtower'
  subtype?: string
  hostile?: boolean
  memory: { weather: number; demographics?: number; _demographics?: number }
  population?: number
  leadership?: {
    ruler: string
    courtiers?: { name: string; type: string }[]
  }
  finalized?: boolean
  // world location (quick access)
  region: number
  province: number
  cell: number
  // geography
  hub?: boolean
  coastal: boolean
  _terrain?: { terrain: string; elevation: string }
  _icon?: keyof typeof location__icons
  _threads: Thread[]
}
