import { scaleLinear, scalePow } from 'd3'

export const scale = (domain: number[], range: number[], v: number) => {
  const scale_fn = scaleLinear().domain(domain).range(range)
  return scale_fn(v)
}

export const scaleExp = (domain: number[], range: number[], v: number, exp: number) => {
  const scale_fn = scalePow().exponent(exp).domain(domain).range(range)
  return scale_fn(v)
}
export const radians = (d: number) => (d * Math.PI) / 180
export const degrees = (r: number) => (r * 180) / Math.PI

export const range = (n: number, start = 0) => Array.from({ length: n }, (_, i) => start + i)

export const average = (n: number[]) => n.reduce((sum, i) => sum + i, 0) / n.length

export const distance = ([x1, y1]: number[], [x2, y2]: number[], scale = [1, 1]) => {
  const [sx, sy] = scale
  return Math.hypot((x1 - x2) * sx, (y1 - y2) * sy)
}

export const permutations = <T>(a: T[], b: T[]) => {
  return a.reduce((combined: T[][], left) => {
    return [...combined, ...b.map(right => [left, right])]
  }, [])
}

export const percentage_scale = (a: number[]) => {
  const total = a.reduce((sum, i) => sum + i, 0)
  return a.map(i => i / total)
}
export type weighted_distribution<T> = { v: T; w: number }[]
export const build_distribution = <T>(
  map: weighted_distribution<T>,
  qty: number
): weighted_distribution<T> => {
  const total = map.reduce((sum, { w }) => sum + w, 0)
  return map.map(({ w, v }) => ({ v, w: (w / total) * qty }))
}
type nested_distribution<T> = (T | nested_distribution<T>)[]
export const build_nested_distribution = <T>(
  dist: nested_distribution<T>
): weighted_distribution<T> =>
  dist.reduce((list: weighted_distribution<T>, elm) => {
    if (Array.isArray(elm)) list.concat(build_distribution(build_nested_distribution(elm), 1))
    else list.push({ v: elm, w: 1 })
    return list
  }, [])

/**
 * round number to nearest increment of n
 * @param x number to round
 * @param n base number increment to round to
 * @returns rounded number
 */
export const round_to_nearest_n = (x: number, n: number) => Math.round(x / n) * n

/**
 * round number to nearest decimal precision
 * @param x number to round
 * @param precision decimal precision
 * @returns rounded number
 */
export const decimal_precision = (x: number, precision: number) => {
  const p = 10 ** precision
  return Math.round((x + Number.EPSILON) * p) / p
}

// https://en.wikipedia.org/wiki/Triangular_number
export const triangular_number = (n: number) => (n * (n + 1)) / 2
export const triangular_root = (n: number) => Math.floor((Math.sqrt(8 * n + 1) - 1) / 2)

export const imperial_height = (height: number) =>
  `${Math.floor(height / 12)}.${Math.floor(height % 12)}`
export const compute_weight = (height: number, bmi: number) => (bmi * height ** 2) / 703 // pounds

export const find_ranges = (params: {
  domain: [number, number]
  voids: [number, number][]
}): [number, number][] => {
  const { domain, voids } = params
  return voids.reduce(
    (ranges, empty) => {
      const [empty_min, empty_max] = empty // [0, 10] [4-6] >> [0, 4], [6, 10]
      return ranges
        .map(([min, max]) => {
          const min_in_range = empty_min > min && empty_min < max
          const max_in_range = empty_max > min && empty_max < max
          if (empty_min < min && empty_max > max) return []
          if (!min_in_range && !max_in_range) return [[min, max]]
          if (min_in_range && !max_in_range) return [[min, empty_min]]
          if (!min_in_range && max_in_range) return [[empty_max, max]]
          return [
            [min, empty_min],
            [empty_max, max]
          ]
        })
        .flat() as [number, number][]
    },
    [domain]
  )
}
