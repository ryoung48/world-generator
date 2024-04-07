export type bfsTraversalParams<T> = { src: T; n: (_item: T) => T[]; depth?: number; used?: Set<T> }
export type bfsPartitionParams<T> = {
  items: T[]
  target: number
  neighbors: (_item: T) => T[]
  relaxed?: (_item: T) => T[]
}
