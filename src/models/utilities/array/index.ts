import { bfsParams, RecursiveArray } from './types'

export const ARRAY = {
  bfs: <T>({ src, n, depth = 1, used = new Set<T>() }: bfsParams<T>): T[] => {
    used.add(src)
    const neighbors = n(src).filter(r => !used.has(r))
    neighbors.forEach(n => used.add(n))
    if (depth > 1 && neighbors.length > 0)
      return ARRAY.unique(
        neighbors.concat(
          neighbors
            .map(i =>
              ARRAY.bfs({
                src: i,
                n,
                depth: depth - 1,
                used
              })
            )
            .flat()
        )
      )
    return neighbors
  },
  mode: <T>(arr: T[]): T[] => {
    // Step 1: Build a frequency map.
    const frequencyMap: Map<T, number> = new Map()

    for (const item of arr) {
      if (frequencyMap.has(item)) {
        frequencyMap.set(item, frequencyMap.get(item)! + 1)
      } else {
        frequencyMap.set(item, 1)
      }
    }
    // Step 2: Identify the highest frequency.
    let maxFrequency = -Infinity
    for (const frequency of frequencyMap.values()) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency
      }
    }
    // Step 3: Collect elements with highest frequency.
    const modes: T[] = []
    for (const [key, frequency] of frequencyMap.entries()) {
      if (frequency === maxFrequency) {
        modes.push(key)
      }
    }
    return modes
  },
  partition: <T>(array: T[], size: number) =>
    Array(Math.ceil(array.length / size))
      .fill(undefined)
      .map((_, i) => array.slice(i * size, i * size + size)),
  recursivePartition: <T>(array: T[], size: number): RecursiveArray<T> => {
    const split = ARRAY.partition(array, size)
    if (split.length <= size) return split
    return ARRAY.recursivePartition(split, size)
  },
  unique: <T>(arr: T[]) => Array.from(new Set(arr))
}
