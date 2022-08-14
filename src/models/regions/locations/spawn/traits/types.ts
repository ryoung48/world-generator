import { Trait } from '../../../../utilities/traits/types'
import type { Loc } from '../../types'
import { dungeon__trait } from './dungeons/types'
import { community__trait } from './settlements/types'

export type location__tag = dungeon__trait | community__trait

export type LocationTrait = Trait<location__tag, { entity: Loc }>
