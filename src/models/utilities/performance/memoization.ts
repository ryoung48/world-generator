export interface MemCache {
  registry: Record<string, () => unknown>
  cache: Record<string, unknown>
}

export type BasicCache<T> = Record<string, T>

window.memcache = {
  registry: {},
  cache: {}
}

/**
 * creates a memoized function that caches results
 * @param params.store - storage for results
 * @param params.get - accessor for the store
 * @param params.set - setter for the store
 * @param params.f - function to be memoized
 * @returns memoized function
 */
export const memoize = <T, K extends unknown[], Cache>(
  f: (..._args: K) => T,
  params: {
    store: () => Cache
    get: (_cache: Cache, ..._args: K) => T | undefined
    set: (_cache: Cache, _res: T, ..._args: K) => void
  }
) => {
  const { store, get, set } = params
  window.memcache.registry[f.name] = store
  window.memcache.cache[f.name] = store()
  return (...args: K) => {
    const cache = window.memcache.cache[f.name] as Cache
    const mem = get(cache, ...args)
    if (mem) return mem
    const res = f(...args)
    set(cache, res, ...args)
    return res
  }
}

export const memoize__clearCache = () => {
  const { registry, cache } = window.memcache
  Object.entries(registry).forEach(([key, store]) => {
    cache[key] = store()
  })
}
