import { appearance_trait__finalize } from './appearance/finalize'
import { behavior_trait__finalize } from './behavior/finalize'
import { reproduction_trait__finalize } from './reproduction/finalize'
import { beast_traits, BeastTraitFinalize } from './types'

export const beast__trait_finalize: Partial<
  Record<beast_traits, (_params: BeastTraitFinalize) => void>
> = {
  ...appearance_trait__finalize,
  ...behavior_trait__finalize,
  ...reproduction_trait__finalize
}
