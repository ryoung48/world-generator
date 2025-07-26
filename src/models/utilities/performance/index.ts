import * as Performance from './types'

// the current profile node context
let context: Performance.ProfileNode

// in-memory cache for memoized functions
const _cache: Performance.MemoCache = { store: {} }
const _lookup: Record<string, number> = {}

let _idx = 0

export const PERFORMANCE = {
  decorate: <T, K extends unknown[]>({ f, name, dirty }: Performance.PerfDecorate<T, K>) => {
    return PERFORMANCE.profile.decorate({
      f: PERFORMANCE.memoize.decorate({ f, dirty }),
      name
    })
  },
  memoize: {
    clear: () => Object.keys(_cache.store).forEach(key => (_cache.store[key] = {})),
    decorate: <T, K extends unknown[]>({
      f,
      dirty,
      keyBuilder
    }: Performance.MemoDecorate<T, K>) => {
      if (_lookup[f.toString()] === undefined) {
        const idx = _idx++
        _cache.store[idx] = {}
        _lookup[f.toString()] = idx
      }
      const idx = _lookup[f.toString()]
      return (...args: K) => {
        const cache = _cache.store[idx] as Record<string, T>
        const key = keyBuilder?.(...args) ?? PERFORMANCE.memoize.key(args)
        if (dirty !== undefined && dirty(...args)) delete cache[key]
        let result = cache[key]
        if (result !== undefined) return result
        result = f(...args)
        cache[key] = result
        return result
      }
    },
    key: (args: unknown[]) => JSON.stringify(args),
    remove: <T, K extends unknown[]>(f: Performance.MemoDecorate<T, K>['f']) =>
      (_cache.store[_lookup[f.toString()]] = {})
  },
  profile: {
    /**
     * records the time debt of function and stores it on the current profile
     * @param params.label - optional name for the profiled function (will default to the function name)
     * @param params.f - f function being profiled
     * @returns the result of f
     */
    apply: <T>({ label, f }: Performance.ProfileParams<T>): T => {
      const key = label ?? f.name
      if (!context.children[key]) context.children[key] = PERFORMANCE.profile.spawn(key)
      const oldContext = context
      context = context.children[key]
      const start = performance.now()
      const result = f()
      const end = performance.now()
      context.value += end - start
      context = oldContext
      return result
    },
    /**
     * decorated version of profile for ease of use
     * @param f - f function being profiled
     * @param name - optional override for functions that don't have names
     * @returns decorated function
     */
    decorate:
      <T, K extends unknown[]>({ name, f }: Performance.ProfileDecorate<T, K>) =>
      (...args: K) =>
        PERFORMANCE.profile.apply({
          label: name ?? f.name,
          f: () => f(...args)
        }),
    /**
     * creates a starting blank profile
     * @param key - the profile node label
     * @returns empty profile
     */
    spawn: (key: string) => ({
      label: key,
      color: window.dice.color(),
      value: 0,
      children: {}
    }),
    /**
     * switches the current profile context
     * used to switch from the pre-generation profile
     * to the post generation profile
     * @param profile - profile to switch to
     */
    switch: (profile: Performance.ProfileNode): void => {
      context = profile
    },
    wrapper: <T extends Object>(params: { o: T; label: string; ignore?: (keyof T)[] }) => {
      const { o, label } = params
      for (const key in o) {
        if (params.ignore?.includes(key as keyof T)) continue
        const name = `${label}.${key}`
        if (typeof o[key] === 'function') {
          o[key] = PERFORMANCE.profile.decorate({
            name,
            f: o[key] as unknown as Performance.MemoDecorate<unknown, unknown[]>['f']
          }) as unknown as any
        } else if (typeof o[key] === 'object') {
          PERFORMANCE.profile.wrapper({ o: o[key], label: name })
        }
      }
      return o
    }
  }
}
