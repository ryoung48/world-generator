export type Trait<Tags extends string, Constraints> = {
  constraints?: Constraints
  conflicts?: Tags[]
  weight?: number
}

export type TraitSelectionArgs<Tags extends string, Args> = {
  available: Partial<Record<Tags, Trait<Tags, Args>>>
  current?: Tags[]
  used?: Tags[]
  constraints?: Required<Args>
  samples?: number
  usagePenalty?: (_used?: number) => number
}
