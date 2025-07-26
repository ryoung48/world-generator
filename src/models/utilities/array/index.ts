import { bfsPartitionParams, bfsTraversalParams } from './types'

export const ARRAY = {
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
  counter: <T extends string | number | symbol>(arr: T[]): Record<T, number> => {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    }, {} as Record<T, number>)
  },
  partition: {
    /**
     * partitions array items
     * less control over group targets
     * but more even partition size distributions
     * @param params.items - items to be grouped
     * @param params.target - target group size
     * @param params.neighbors - function to find neighboring members to expand a group
     * @param params.relaxed - relaxed version of neighbors used as a fallback when there are too few members
     * @returns groups of array items
     */
    bfs: <T>(params: bfsPartitionParams<T>) => {
      const { items, target, neighbors } = params
      // items that still need to be grouped
      let remainder = [...items]
      // current groups
      const groups: T[][] = []
      // assigned items
      const assigned = new Map<T, number>()
      // floodfill to get initial groups
      while (remainder.length > 0) {
        // take the next item from the list
        const start = remainder.pop()
        // assign it a group
        assigned.set(start, groups.length)
        // create a group
        const group = [start]
        // create a the queue
        const queue = [start]
        // iterate through the queue until we get the targeted group size
        while (queue.length > 0) {
          // how close are we to the target?
          const diff = target - group.length
          // get the next item in the queue
          const curr = queue.pop()
          // get the valid neighbors to expand the group
          const spread = neighbors(curr)
            // only consider members not already assigned
            .filter(item => assigned.get(item) === undefined)
            .slice(0, diff)
          // assign neighbors and add them to the queue
          spread.forEach(n => {
            assigned.set(n, groups.length)
            group.push(n)
            queue.push(n)
          })
        }
        // push the final group
        groups.push(group)
        // eliminate items that have been grouped
        remainder = remainder.filter(item => assigned.get(item) === undefined)
      }
      // eliminate groups that are too small
      const relaxed = params.relaxed ?? neighbors
      const limit = Math.round(target / 3)
      const blacklist: Record<number, boolean> = {}
      let outliers = true
      while (outliers) {
        outliers = false
        groups.forEach((group, idx) => {
          if (group.length <= limit && group.length > 0 && !blacklist[idx]) {
            outliers = true
            group.forEach(item => {
              // find members who can take in the loner
              const [prospect] = relaxed(item)
                .filter(n => assigned.get(n) !== idx)
                .map(n => {
                  const groupIdx = assigned.get(n)
                  return { idx: groupIdx, group: groups[groupIdx] }
                })
                .sort((a, b) => a.group.length - b.group.length)
              if (prospect) {
                prospect.group.push(item)
                assigned.set(item, prospect.idx)
              } else {
                blacklist[idx] = true
              }
            })
            groups[idx] = group.filter(item => assigned.get(item) === idx)
          }
        })
      }
      return groups.filter(group => group.length > 0)
    }
  },
  traversal: {
    bfs: <T>({ src, n, depth = 1, used = new Set<T>() }: bfsTraversalParams<T>): T[] => {
      used.add(src)
      const neighbors = n(src).filter(r => !used.has(r))
      neighbors.forEach(n => used.add(n))
      if (depth > 1 && neighbors.length > 0)
        return ARRAY.unique(
          neighbors.concat(
            neighbors
              .map(i =>
                ARRAY.traversal.bfs({
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
    }
  },
  unique: <T>(arr: T[]) => Array.from(new Set(arr))
}
