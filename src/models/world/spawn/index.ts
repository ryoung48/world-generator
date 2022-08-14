import PriorityQueue from 'js-priority-queue'

import { WorldEvent } from '../../history/types'
import { humanoid__species_init } from '../../npcs/species/humanoids/taxonomy'
import { canvas_dims } from '../../utilities/dimensions'
import { Dice } from '../../utilities/math/dice'
import { day_ms } from '../../utilities/math/time'
import { profile__spawn, profile__switch } from '../../utilities/performance'
import { memoize__clear_cache } from '../../utilities/performance/memoization'
import { World } from '../types'
import { ContinentTemplate } from './shapers/continents/templates'

export const world__spawn = (params: {
  seed: string
  res: number
  template: ContinentTemplate['isles']
}) => {
  const { seed, res, template } = params
  window.dice = new Dice(seed)
  window.profiles = {
    history: profile__spawn('Total'),
    current: profile__spawn('Total')
  }
  profile__switch(window.profiles.history)
  memoize__clear_cache()
  // start date
  const year = window.dice.randint(100, 3000)
  const month = window.dice.randint(0, 11)
  const day = window.dice.randint(0, 28)
  const hours = window.dice.randint(0, 23)
  const minutes = window.dice.randint(0, 59)
  const date = new Date(year, month, day, hours, minutes).getTime()
  const first_new_moon = date - day_ms * window.dice.randint(0, 30)
  const world: World = {
    id: seed,
    cells: [],
    landmarks: {},
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
      icebergs: []
    },
    template,
    coasts: [],
    dim: {
      // display image width / height (pixels)
      ...canvas_dims,
      // voronoi cell resolution
      cells: 16000 * res,
      // actual width / height (miles)
      rh: 6000,
      rw: 6000,
      // noise resolution
      res: 256,
      // scale + cell metrics
      sh: 0,
      sw: 0,
      // cell dimensions
      cell_area: 0,
      cell_length: 0
    },
    regions: [],
    provinces: [],
    locations: [],
    cultures: [],
    humanoids: humanoid__species_init(),
    beasts: [],
    primordials: [],
    actors: [],
    actor_events: [],
    religions: [],
    threads: [],
    unique_names: {},
    date,
    first_new_moon,
    lunar_cycle: 28,
    rotation: 24,
    tilt: 23.5,
    seasons: {
      winter: [10, 11, 0],
      spring: [1, 2, 3],
      summer: [4, 5, 6],
      fall: [7, 8, 9]
    },
    geo_bounds: {
      lat: [-10, 90],
      long: [0, 80]
    },
    past: [],
    future: new PriorityQueue({
      comparator: (a: WorldEvent, b: WorldEvent) => a.time - b.time
    }),
    history_recording: false,
    rebellions: [],
    wars: [],
    statistics: {
      current: { wars: 0, rebellions: 0, regions: 0 },
      past: []
    }
  }
  // average voronoi cell area (square miles)
  world.dim.cell_area = (world.dim.rh * world.dim.rw) / world.dim.cells
  world.dim.cell_length = world.dim.cell_area ** 0.5
  // scaled height & width (used in distance calculations)
  world.dim.sh = world.dim.rh / world.dim.h
  world.dim.sw = world.dim.rw / world.dim.w
  // determine hemisphere
  const southern_hemisphere = window.dice.flip
  if (southern_hemisphere) {
    world.geo_bounds.lat = world.geo_bounds.lat.reverse().map(l => -l)
    const { winter, spring, summer, fall } = world.seasons
    world.seasons.winter = summer
    world.seasons.spring = fall
    world.seasons.summer = winter
    world.seasons.fall = spring
  }
  return world
}
