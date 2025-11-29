import { NATION } from '../../nations'
import { PROVINCE } from '../../provinces'

export const shapeWalls = () => {
  const nations = NATION.nations()
  const target = 0.2
  const walls = { target, current: 0, total: nations.length }
  window.dice.shuffle(nations).forEach(nation => {
    const { current, target, total } = walls
    if (
      current / total < target &&
      (nation.size === 'kingdom' || nation.size === 'empire') &&
      !nation.decentralization
    ) {
      const neighbors = NATION.provinces(nation)
        .map(p =>
          PROVINCE.neighbors({ province: p, type: 'foreign' }).map(i => PROVINCE.nation(i).idx)
        )
        .flat()
        .reduce((acc, i) => {
          acc[i] = (acc[i] || 0) + 1
          return acc
        }, {} as Record<number, number>)
      const prospects = Object.entries(neighbors)
        .filter(neighbor => {
          const other = window.world.provinces[parseInt(neighbor[0])]
          const relation = NATION.relations.get({ n1: nation, n2: other })
          return (
            relation !== 'suzerain' &&
            relation !== 'vassal' &&
            !PROVINCE.far(nation, other) &&
            other.size !== 'city-state' &&
            other.size !== 'principality' &&
            other.government === 'fragmented' &&
            other.decentralization
          )
        })
        .sort((a, b) => b[1] - a[1])
        .map(neighbor => window.world.provinces[parseInt(neighbor[0])])
      if (prospects.length > 0) {
        const [raiders] = prospects
        walls.current++
        nation.walls = raiders.idx
        NATION.relations.set({ relation: 'suspicious', n1: nation, n2: raiders })
      }
    }
  })
}
