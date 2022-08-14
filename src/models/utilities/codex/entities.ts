export const codex_categories = [
  'nation',
  'location',
  'culture',
  'actor',
  'beast',
  'primordial',
  'war',
  'rebellion',
  'religion'
] as const

// all things that had codex pages
// and needed to reference one of the world lists
export interface TaggedEntity {
  tag: typeof codex_categories[number]
  name: string
  idx: number
}
