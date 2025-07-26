import { World, WorldSpawn } from './types'
import { DICE } from './utilities/math/dice'
import { TIME } from './utilities/math/time'
import { PERFORMANCE } from './utilities/performance'

export const WORLD = {
  spawn: ({ seed, res }: WorldSpawn) => {
    console.log(seed)
    DICE.spawn(seed)
    window.profiles = {
      history: PERFORMANCE.profile.spawn('Total'),
      current: PERFORMANCE.profile.spawn('Total')
    }
    PERFORMANCE.profile.switch(window.profiles.history)
    PERFORMANCE.memoize.clear()
    // start date
    const year = window.dice.randint(3000, 4000)
    const month = window.dice.randint(0, 11)
    const day = window.dice.randint(0, 28)
    const hours = window.dice.randint(0, 23)
    const minutes = window.dice.randint(0, 59)
    const date = new Date(year, month, day, hours, minutes).getTime()
    const firstNewMoon = date - TIME.constants.dayMS * window.dice.randint(0, 30)

    // cell dimensions
    const count = res * 16000
    const radius = 3.959e3 // miles
    const surfaceArea = 4 * Math.PI * radius ** 2
    const area = surfaceArea / count
    const length = area ** 0.5

    const world: World = {
      id: seed,
      resolution: res,
      cells: [],
      cell: { length, count, area },
      scale: res / 4,
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
        regions: {},
        icons: [],
        icebergs: []
      },
      coasts: [],
      provinces: [],
      locations: [],
      cultures: [],
      oceanRegions: [],
      actors: [],
      wars: [],
      uniqueNames: {},
      radius: 3.959e3, // miles
      date,
      firstNewMoon,
      lunarCycle: 28,
      rotation: 24,
      tilt: 23.5,
      meridian: 0
    }
    return world
  }
}
