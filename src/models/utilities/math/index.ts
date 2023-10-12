import { geoDistance, range, scaleLinear, scalePow } from 'd3'

import { WeightedDistribution } from './types'

export const MATH = {
  buildDistribution: <T>(map: WeightedDistribution<T>, qty = 1): WeightedDistribution<T> => {
    const total = map.reduce((sum, { w }) => sum + w, 0)
    return map.map(({ w, v }) => ({ v, w: total === 0 ? 0 : (w / total) * qty }))
  },
  counter: <T extends string | number>(arr: T[]) =>
    arr.reduce((acc: Record<string, number>, item) => {
      return { ...acc, [item]: (acc[item.toString()] || 0) + 1 }
    }, {}) as Record<T, number>,
  counterDist: (arr: number[]) => {
    const dist = Object.entries<number>(MATH.counter(arr)).map(([value, count]) => ({
      value: parseInt(value),
      count
    }))
    const total = dist.reduce((sum, { count }) => sum + count, 0)
    return dist.map(({ value, count }) => ({ value, count: count / total }))
  },
  degrees: (r: number) => (r * 180) / Math.PI,
  distance: (p1: [number, number], p2: [number, number]) => {
    return geoDistance(p1, p2)
  },
  distanceCheap: ([x1, y1]: number[], [x2, y2]: number[]) => {
    const lat1 = MATH.radians(y1)
    const lon1 = MATH.radians(x1)
    const lat2 = MATH.radians(y2)
    const lon2 = MATH.radians(x2)
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2)
    const y = lat2 - lat1
    return Math.sqrt(x * x + y * y)
  },
  kmToMi: (km: number) => km / 1.609,
  miToKM: (mi: number) => mi * 1.609,
  ftToKm: (ft: number) => ft / 3281,
  normalize: (a: number[]) => {
    const total = a.reduce((sum, i) => sum + i, 0)
    return a.map(i => i / total)
  },
  permutations: <T>(a: T[], b: T[]) => {
    return a.reduce((combined: T[][], left) => {
      return [...combined, ...b.map(right => [left, right])]
    }, [])
  },
  radians: (d: number) => (d * Math.PI) / 180,
  /**
   * round number to nearest increment of n
   * @param x number to round
   * @param n base number increment to round to
   * @returns rounded number
   */
  roundToNearestN: (x: number, n: number) => Math.round(x / n) * n,
  scale: (domain: number[], range: number[], v: number) => {
    const scaleFn = scaleLinear().domain(domain).range(range)
    return scaleFn(v)
  },
  scaleDiscrete: (count: number) => range(count).map(i => i / (count - 1)),
  scaleExp: (domain: number[], range: number[], v: number, exp: number) => {
    const scaleFn = scalePow().exponent(exp).domain(domain).range(range)
    return scaleFn(v)
  }
}
