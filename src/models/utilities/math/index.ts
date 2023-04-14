import { scaleLinear, scalePow } from 'd3'

export const scale = (domain: number[], range: number[], v: number) => {
  const scaleFn = scaleLinear().domain(domain).range(range)
  return scaleFn(v)
}

export const scaleExp = (domain: number[], range: number[], v: number, exp: number) => {
  const scaleFn = scalePow().exponent(exp).domain(domain).range(range)
  return scaleFn(v)
}
export const radians = (d: number) => (d * Math.PI) / 180
export const degrees = (r: number) => (r * 180) / Math.PI

export const distance = ([x1, y1]: number[], [x2, y2]: number[], scale = [1, 1]) => {
  const [sx, sy] = scale
  return Math.hypot((x1 - x2) * sx, (y1 - y2) * sy)
}

export const permutations = <T>(a: T[], b: T[]) => {
  return a.reduce((combined: T[][], left) => {
    return [...combined, ...b.map(right => [left, right])]
  }, [])
}

export const percentageScale = (a: number[]) => {
  const total = a.reduce((sum, i) => sum + i, 0)
  return a.map(i => i / total)
}
export type WeightedDistribution<T> = { v: T; w: number }[]
export const buildDistribution = <T>(
  map: WeightedDistribution<T>,
  qty = 1
): WeightedDistribution<T> => {
  const total = map.reduce((sum, { w }) => sum + w, 0)
  return map.map(({ w, v }) => ({ v, w: total === 0 ? 0 : (w / total) * qty }))
}
type NestedDistribution<T> = (T | NestedDistribution<T>)[]
export const buildNestedDistribution = <T>(dist: NestedDistribution<T>): WeightedDistribution<T> =>
  dist.reduce((list: WeightedDistribution<T>, elm) => {
    if (Array.isArray(elm)) list.concat(buildDistribution(buildNestedDistribution(elm), 1))
    else list.push({ v: elm, w: 1 })
    return list
  }, [])

/**
 * round number to nearest increment of n
 * @param x number to round
 * @param n base number increment to round to
 * @returns rounded number
 */
export const roundToNearestN = (x: number, n: number) => Math.round(x / n) * n

/**
 * round number to nearest decimal precision
 * @param x number to round
 * @param precision decimal precision
 * @returns rounded number
 */
export const decimalPrecision = (x: number, precision: number) => {
  const p = 10 ** precision
  return Math.round((x + Number.EPSILON) * p) / p
}

// https://en.wikipedia.org/wiki/Triangular_number
export const triangularNumber = (n: number) => (n * (n + 1)) / 2
export const triangularRoot = (n: number) => Math.floor((Math.sqrt(8 * n + 1) - 1) / 2)

export const imperialHeight = (height: number) =>
  `${Math.floor(height / 12)}.${Math.floor(height % 12)} ft`
export const computeWeight = (height: number, bmi: number) => (bmi * height ** 2) / 703 // pounds

export const findRanges = (params: {
  domain: [number, number]
  voids: [number, number][]
}): [number, number][] => {
  const { domain, voids } = params
  return voids.reduce(
    (ranges, empty) => {
      const [emptyMin, emptyMax] = empty // [0, 10] [4-6] >> [0, 4], [6, 10]
      return ranges
        .map(([min, max]) => {
          const minInRange = emptyMin > min && emptyMin < max
          const maxInRange = emptyMax > min && emptyMax < max
          if (emptyMin < min && emptyMax > max) return []
          if (!minInRange && !maxInRange) return [[min, max]]
          if (minInRange && !maxInRange) return [[min, emptyMin]]
          if (!minInRange && maxInRange) return [[emptyMax, max]]
          return [
            [min, emptyMin],
            [emptyMax, max]
          ]
        })
        .flat() as [number, number][]
    },
    [domain]
  )
}

export const sorting = {
  descending: (a: number, b: number) => b - a
}

export const partition = <T>(array: T[], size: number) =>
  Array(Math.ceil(array.length / size))
    .fill(undefined)
    .map((_, i) => array.slice(i * size, i * size + size))
