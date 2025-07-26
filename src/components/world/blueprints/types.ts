import { Delaunay, Voronoi } from 'd3'

import { Directions } from '../../../models/utilities/math/points/types'
import { Block } from './blocks/types'
import { District } from './districts/types'

export type Blueprint = {
  seed: string
  density: number
  districts: Record<number, District>
  oceanDir?: Directions
  isCity: boolean
  foreigners: boolean
  regionalCapital: boolean
  population: number
  blocks: Block[]
  diagram?: Voronoi<Delaunay.Point>
  miles?: number
  wall?: Array<[number, number]>
}
