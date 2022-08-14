import { dungeon__complications } from './complications/types'
import { dungeon__environment } from './environment/types'
import { dungeon__inhabitant } from './inhabitants/types'
import { dungeon__reward } from './rewards/types'

export type dungeon__trait =
  | dungeon__inhabitant
  | dungeon__environment
  | dungeon__complications
  | dungeon__reward
