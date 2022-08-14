export interface TraitEnriched<tags extends string> {
  traits: { tag: tags; text: string }[]
}

export interface Trait<tags extends string, args extends { entity: TraitEnriched<tags> }> {
  tag: tags
  text: (_params: args) => string
  spawn: (_params: args) => number
  conflicts?: tags[]
}
