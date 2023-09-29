export type Trait<Tags extends string, Constraints> = {
  text?: string | ((_params: Constraints) => string)
  constraints?: Constraints
  conflicts?: Tags[]
}

export type TraitSelectionArgs<Tags extends string, Args> = {
  available: Record<Tags, Trait<Tags, Args>>
  current: Tags[]
  used?: Tags[]
  constraints?: Required<Args>
  samples?: number
}
