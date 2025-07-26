import { Cell } from '../types'

export type CellPlacementParams = {
  count: number // the number of cities to place
  spacing: number // how far apart each city should be
  whitelist: Cell[] // a of cells where the cities can be placed
  blacklist?: Cell[] // a list of cities that have already been placed
  tag: string
}
