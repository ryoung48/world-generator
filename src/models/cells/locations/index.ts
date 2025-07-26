import { Cell } from '../types'
import { Loc } from './types'

export const LOCATION = {
  cell: (loc: Loc) => window.world.cells[loc.cells[0]],
  neighbors: (loc: Loc) => loc.neighbors.map(n => window.world.locations[n]),
  spawn: (cell: Cell) => {
    const loc: Loc = {
      idx: window.world.locations.length,
      cells: [cell.idx],
      neighbors: [],
      province: -1
    }
    cell.location = loc.idx
    window.world.locations.push(loc)
    return loc
  }
}
