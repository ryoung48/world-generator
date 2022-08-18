export const entity__tags = ['nation', 'location', 'culture', 'actor'] as const

// all things that have codex pages
// and need to reference one of the world lists
export interface TaggedEntity {
  tag: typeof entity__tags[number]
  name: string
  idx: number
}

/**
 * partitions tagged entities
 * less control over group targets
 * but more even partition size distributions
 * @param params.items - items to be grouped
 * @param params.target - target group size
 * @param params.neighbors - function to find neighboring members to expand a group
 * @param params.relaxed - relaxed version of neighbors used as a fallback when there are too few members
 * @returns groups of tagged entities
 */
export const entity__partitionBFS = <T extends TaggedEntity>(params: {
  items: T[]
  target: number
  neighbors: (_item: T) => T[]
  relaxed?: (_item: T) => T[]
}) => {
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
  return groups
    .map((group, idx) => {
      if (group.length < 2) {
        group.forEach(item => {
          // find members who can take in the loner
          const [prospect] = relaxed(item)
            .filter(n => assigned.get(n) !== undefined)
            .map(n => {
              const groupIdx = assigned.get(n)
              return { idx: groupIdx, group: groups[groupIdx] }
            })
            .sort((a, b) => a.group.length - b.group.length)
          if (prospect) {
            prospect.group.push(item)
            assigned.set(item, prospect.idx)
          }
        })
        return group.filter(item => assigned.get(item) === idx)
      }
      return group
    })
    .filter(group => group.length > 0)
}
