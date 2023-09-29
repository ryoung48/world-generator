import { Dice } from './models/utilities/math/dice'
import { Profiles } from './models/utilities/performance'
import { World } from './models/world/types'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dice: Dice
    world: World
    profiles: Profiles
  }
}

declare module 'd3-geo-voronoi' {
  export = <any>{}
}
