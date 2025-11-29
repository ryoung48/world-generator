import { CULTURE } from '../../heritage'
import { RELIGION } from '../../heritage/religions'
import { distribute } from './distribute'

export const shapeReligions = () => {
  const cultures = window.world.cultures
  const { groups } = distribute({
    items: window.dice.shuffle(cultures),
    percentages: [0.4, 0.35, 0.2, 0.05],
    buckets: [
      [1, 1],
      [2, 2],
      [3, 4],
      [4, 6]
    ],
    neighbors: culture => CULTURE.neighbors(culture)
  })

  groups.forEach(group => {
    // Spawn religion with generated name
    RELIGION.spawn({
      cultures: group.map(c => c.idx)
    })
  })

  // Assign religions to any cultures that didn't get one
  cultures.forEach(culture => {
    if (culture.religion === -1) {
      const neighbors = CULTURE.neighbors(culture).filter(n => n.religion !== -1)
      if (neighbors.length > 0) {
        culture.religion = window.dice.choice(neighbors).religion
      } else {
        // Create a new religion for isolated cultures
        RELIGION.spawn({
          cultures: [culture.idx]
        })
      }
    }
  })
}
