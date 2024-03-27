export type GenericFunction<T, K extends unknown[]> = (..._args: K) => T

export type FindParams<T> = {
  group: T[]
  ref: T
  type: 'closest' | 'furthest'
}
