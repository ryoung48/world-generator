import { canvasDims } from '../../utilities/dimensions'
import { Dice } from '../../utilities/math/dice'
import { dayMS } from '../../utilities/math/time'
import { profile__spawn, profile__switch } from '../../utilities/performance'
import { memoize__clearCache } from '../../utilities/performance/memoization'
import { World } from '../types'
import { ContinentTemplate } from './shapers/continents/templates'

export const world__spawn = (params: {
  seed: string
  res: number
  template: ContinentTemplate['isles']
}) => {
  const { seed, res, template } = params
  console.log(seed)
  window.dice = new Dice(seed)
  window.profiles = {
    history: profile__spawn('Total'),
    current: profile__spawn('Total')
  }
  profile__switch(window.profiles.history)
  memoize__clearCache()
  // start date
  const year = window.dice.randint(100, 3000)
  const month = window.dice.randint(0, 11)
  const day = window.dice.randint(0, 28)
  const hours = window.dice.randint(0, 23)
  const minutes = window.dice.randint(0, 59)
  const date = new Date(year, month, day, hours, minutes).getTime()
  const firstNewMoon = date - dayMS * window.dice.randint(0, 30)
  const world: World = {
    id: seed,
    cells: [],
    landmarks: {},
    seaLevelCutoff: 0.06,
    mountains: [],
    routes: {
      land: [],
      sea: []
    },
    display: {
      routes: {
        land: [],
        sea: []
      },
      islands: [],
      lakes: [],
      borders: {},
      regions: {},
      icons: [],
      icebergs: [],
      runes: window.dice.sample('abcdefghijklmnopqrstuvwxyz'.split(''), 4)
    },
    template,
    coasts: [],
    dim: {
      res,
      // display image width / height (pixels)
      ...canvasDims,
      // voronoi cell resolution
      cells: 16000 * res,
      // actual width / height (miles)
      rh: 5000,
      rw: 5000,
      // noise resolution
      noise: 256,
      // scale + cell metrics
      sh: 0,
      sw: 0,
      // cell dimensions
      cellArea: 0,
      cellLength: 0
    },
    regions: [],
    provinces: [],
    cultures: [],
    religions: [],
    npcs: [],
    conflicts: [],
    threads: [],
    uniqueNames: {},
    date,
    firstNewMoon,
    lunarCycle: 28,
    rotation: 24,
    tilt: 23.5,
    seasons: {
      winter: [10, 11, 0],
      spring: [1, 2, 3],
      summer: [4, 5, 6],
      fall: [7, 8, 9]
    },
    geoBounds: {
      lat: [-10, 90],
      long: [0, 80]
    }
  }
  // average voronoi cell area (square miles)
  world.dim.cellArea = (world.dim.rh * world.dim.rw) / world.dim.cells
  world.dim.cellLength = world.dim.cellArea ** 0.5
  // scaled height & width (used in distance calculations)
  world.dim.sh = world.dim.rh / world.dim.h
  world.dim.sw = world.dim.rw / world.dim.w
  // determine hemisphere
  const southernHemisphere = window.dice.flip
  if (southernHemisphere) {
    world.geoBounds.lat = world.geoBounds.lat.reverse().map(l => -l)
    const { winter, spring, summer, fall } = world.seasons
    world.seasons.winter = summer
    world.seasons.spring = fall
    world.seasons.summer = winter
    world.seasons.fall = spring
  }
  return world
}
