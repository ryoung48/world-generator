export const entity__tags = ['nation', 'province', 'culture', 'actor', 'religion', 'fauna'] as const

// all things that have codex pages
// and need to reference one of the world lists
export interface TaggedEntity {
  tag: typeof entity__tags[number]
  name: string
  idx: number
}
