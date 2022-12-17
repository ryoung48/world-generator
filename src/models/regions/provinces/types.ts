import { RouteTypes } from '../../world/travel/types'

export interface Province {
  idx: number
  cell: number
  region: number
  capital: boolean
  finalized: boolean
  population: number // urban + rural
  nation: number // current owner
  // travel
  hub: number
  locations: number[]
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<RouteTypes, Record<string, number>>
  neighbors: number[]
  artery: number[]
  // geography
  islands: Record<number, number>
  land: number
  ocean: number
  mountains: number
}
