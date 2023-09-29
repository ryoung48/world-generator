export type RecursiveArray<T> = Array<RecursiveArray<T> | T>
export type bfsParams<T> = { src: T; n: (_item: T) => T[]; depth?: number; used?: Set<T> }
