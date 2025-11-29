import { range } from 'd3'

export const distribute = <Item>(params: {
  items: Item[]
  percentages: number[]
  buckets: [number, number][]
  neighbors: (_item: Item) => Item[]
  sorted?: (_items: Item[]) => Item[]
  score?: (_item: Item) => number
}) => {
  const { items, percentages, buckets, neighbors, sorted, score } = params
  const N = items.length // total number of items

  // Average sizes for each category
  const averageSizes = buckets.map(b => (b[0] + b[1]) / 2)

  // Compute D
  const D = percentages.reduce((sum, p, i) => sum + p * averageSizes[i], 0)

  // Total number of nations
  const M = N / D

  // Initial number of nations in each category
  const categories = percentages.map(p => Math.floor(M * p))

  // Adjust to ensure total groups sum to M
  let totalGroups = categories.reduce((sum, n) => sum + n, 0)
  const remainingGroups = Math.round(M) - totalGroups
  categories[0] += remainingGroups

  // Generate group sizes
  const groupSizes: number[] = categories
    .map((n, i) => range(n).map(() => window.dice.randint(...buckets[i])))
    .flat()
    .reverse()

  // Create a set of unassigned provinces
  const unassignedItems = new Set(items)

  // create assignments for later
  const assignments = new Map<Item, number>()

  // create the final result
  const groups: Item[][] = []

  // For each group size, create a group
  for (const groupSize of groupSizes) {
    const sortedItems = sorted ? sorted([...unassignedItems]) : [...unassignedItems]
    for (let attempt = 0; attempt < 20; attempt++) {
      // Pick a random starting province
      const startingItem = attempt > 10 ? window.dice.choice(sortedItems) : sortedItems[attempt]
      if (!startingItem) break
      const groupItems = [startingItem]

      const itemQueue = [startingItem]
      const visited = new Set([startingItem])

      while (groupItems.length < groupSize && itemQueue.length > 0) {
        const currentItem = itemQueue.shift()!
        const nextItems = neighbors(currentItem)

        const candidateItems: Item[] = []
        for (const nextItem of nextItems) {
          const unassigned = unassignedItems.has(nextItem)
          if (unassigned && !visited.has(nextItem)) {
            candidateItems.push(nextItem)
            visited.add(nextItem)
          }
        }

        // Sort candidates by score (higher score first) for more organic growth
        if (score && candidateItems.length > 1) {
          candidateItems.sort((a, b) => score(b) - score(a))
        }

        for (const nextItem of candidateItems) {
          groupItems.push(nextItem)
          itemQueue.push(nextItem)
          if (groupItems.length >= groupSize) break
        }
      }

      if (groupItems.length >= groupSize) {
        groups.push(groupItems)
        // Remove assigned provinces from unassignedProvinces
        for (const item of groupItems) {
          unassignedItems.delete(item)
          assignments.set(item, groups.length - 1)
        }
        break
      }
    }
  }

  Array.from(unassignedItems).forEach(item => {
    if (unassignedItems.has(item)) {
      const candidates = neighbors(item).filter(p => assignments.has(p))
      if (candidates.length > 0) {
        const neighbor = window.dice.choice(candidates)
        assignments.set(item, assignments.get(neighbor)!)
        groups[assignments.get(neighbor)!].push(item)
        unassignedItems.delete(item)
      }
    }
  })

  return { groups, unassigned: Array.from(unassignedItems) }
}
