import { geoDistance, range, scaleLinear, scalePow } from 'd3'

import { Directions } from './points/types'
import { DegreeToPerimeterParams, WeightedDistribution } from './types'

export const MATH = {
  buildDistribution: <T>(map: WeightedDistribution<T>, qty = 1): WeightedDistribution<T> => {
    const total = map.reduce((sum, { w }) => sum + w, 0)
    return map.map(({ w, v }) => ({ v, w: total === 0 ? 0 : (w / total) * qty }))
  },
  conversion: {
    angles: {
      degrees: (rad: number) => rad * (180 / Math.PI),
      radians: (deg: number) => deg * (Math.PI / 180)
    },
    area: {
      mi: {
        km: (mi: number) => mi * 1.609
      }
    },
    distance: {
      feet: {
        km: (feet: number) => feet / 3281
      },
      km: {
        miles: (km: number) => km / 1.609
      },
      miles: {
        km: (miles: number) => miles * 1.609
      }
    },
    height: {
      mm: {
        in: (mm: number) => mm / 25.4
      }
    },
    population: {
      mi: {
        km: (mi: number) => mi / 1.609
      }
    },
    temperature: {
      celsius: {
        fahrenheit: (celsius: number) => (celsius * 9) / 5 + 32
      },
      fahrenheit: {
        celsius: (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9
      }
    }
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
  degreeToPerimeter: ({
    degree: d,
    height,
    width
  }: DegreeToPerimeterParams): { x: number; y: number } => {
    const degree = (d + 90) % 360
    if (degree >= 0 && degree < 45) {
      return { x: width, y: scaleLinear([0, 45], [height * 0.5, 0])(degree) }
    } else if (degree >= 45 && degree < 90) {
      return { x: scaleLinear([45, 90], [width, width * 0.5])(degree), y: 0 }
    } else if (degree >= 90 && degree < 135) {
      return { x: scaleLinear([90, 135], [width * 0.5, 0])(degree), y: 0 }
    } else if (degree >= 135 && degree < 180) {
      return { x: 0, y: scaleLinear([135, 180], [0, height * 0.5])(degree) }
    } else if (degree >= 180 && degree < 225) {
      return { x: 0, y: scaleLinear([180, 225], [height * 0.5, height])(degree) }
    } else if (degree >= 225 && degree < 270) {
      return { x: scaleLinear([225, 270], [0, width * 0.5])(degree), y: height }
    } else if (degree >= 270 && degree < 315) {
      return { x: scaleLinear([270, 315], [width * 0.5, width])(degree), y: height }
    } else {
      return { x: width, y: scaleLinear([315, 360], [height, height * 0.5])(degree) }
    }
  },
  distance: {
    euclidean: (p1: [number, number], p2: [number, number]) => {
      return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
    },
    geo: (p1: [number, number], p2: [number, number]) => {
      return geoDistance(p1, p2)
    },
    geoCheap: ([x1, y1]: number[], [x2, y2]: number[]) => {
      const lat1 = MATH.conversion.angles.radians(y1)
      const lon1 = MATH.conversion.angles.radians(x1)
      const lat2 = MATH.conversion.angles.radians(y2)
      const lon2 = MATH.conversion.angles.radians(x2)
      const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2)
      const y = lat2 - lat1
      return Math.sqrt(x * x + y * y)
    }
  },
  direction: {
    opposite: (direction: Directions) => {
      switch (direction) {
        case 'N':
          return 'S'
        case 'S':
          return 'N'
        case 'E':
          return 'W'
        case 'W':
          return 'E'
      }
    }
  },
  normalize: (a: number[]) => {
    const total = a.reduce((sum, i) => sum + i, 0)
    return a.map(i => i / total)
  },
  permutations: <T>(a: T[], b: T[]) => {
    return a.reduce((combined: T[][], left) => {
      return [...combined, ...b.map(right => [left, right])]
    }, [])
  },
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
