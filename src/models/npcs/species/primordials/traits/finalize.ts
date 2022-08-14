import { primordial__trait_tags } from '../types'
import { primordial__aesthetic_trait_finalize } from './aesthetic/finalize'
import { primordial__behavior_trait_finalize } from './behavior/finalize'
import { PrimordialTraitParams } from './types'

export const primordial__trait_finalize: Partial<
  Record<primordial__trait_tags, (_params: PrimordialTraitParams) => void>
> = {
  ...primordial__behavior_trait_finalize,
  ...primordial__aesthetic_trait_finalize
}
