import { scaleLinear } from 'd3'
// @ts-ignore
import { S2 } from 's2-geometry'

import { POINT } from '../../utilities/math/points'
import { S2_EXTENDED } from '../../utilities/math/s2'
import { GEOGRAPHY } from '../geography'
import { Cell } from '../types'
import { CellPlacementParams } from './types'

export const PLACEMENT = {
  spacing: { regions: 350, provinces: 105, oceans: 800, oceanRegions: 150 },
  biome: scaleLinear([0, 0.1, 0.2, 0.6, 1], [1, 0.85, 0.7, 0.55, 0.5]),
  limit: (spacing: number) => Math.ceil((spacing * window.world.radius) / window.world.cell.length),
  run: ({ blacklist = [], whitelist, count, spacing, tag }: CellPlacementParams) => {
    const grid: Record<string, Cell[]> = {}

    const level = S2_EXTENDED.getS2LevelFromDistance(spacing)

    function getGridCell(cell: Cell): string {
      return S2.latLngToKey(cell.y, cell.x, level)
    }
    // Function to add a city to the grid
    function addCityToGrid(cell: Cell): void {
      const cellId = getGridCell(cell)
      if (!grid[cellId]) grid[cellId] = []
      grid[cellId].push(cell)
    }
    // Function to retrieve nearby cities from the grid
    function getNearbyCities(cell: Cell): Cell[] {
      const cellId = getGridCell(cell)
      const search: string[] = S2_EXTENDED.latLngToNeighborKeys(cell.y, cell.x, level)
      search.push(cellId)
      return search
        .map(i => grid[i])
        .filter(cells => cells)
        .flat()
    }

    const placed: Cell[] = []

    // Add blacklist cities to the grid if provided
    for (const city of blacklist) {
      addCityToGrid(city)
    }

    // Process each cell in the shuffled whitelist
    for (const cell of whitelist) {
      // Stop if we've placed the required number of cities
      if (placed.length >= count) break

      // Retrieve nearby cities to check for spacing constraints
      const nearbyCities = getNearbyCities(cell)
      let tooClose = false

      for (const city of nearbyCities) {
        const distance = POINT.distance.geo({ points: [city, cell] })
        if (distance < spacing) {
          tooClose = true
          break
        }
      }
      if (!tooClose) {
        // No nearby city violates the spacing constraint; place a city here
        placed.push(cell)
        addCityToGrid(cell)
      }
    }
    if (placed.length < count)
      console.log(`placement failure (${tag}): ${placed.length} / ${count}`)

    return placed
  },
  ratio: () => 2 ** (GEOGRAPHY.land().length / window.world.cells.length / 0.2 - 1)
}
