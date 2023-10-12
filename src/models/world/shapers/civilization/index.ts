import { PROVINCE } from '../../../regions/provinces'
import { PERFORMANCE } from '../../../utilities/performance'
import { NAVIGATION } from '../../navigation'
import { CULTURAL } from './cultures'
import { URBANIZATION } from './urbanization'

const shattered: Record<number, number[]> = {}

export const CIVILIZATION = PERFORMANCE.profile.wrapper({
  label: 'CIVILIZATION',
  o: {
    shattered,
    _imperialRoads: () => {
      const cache: Record<number, Record<number, boolean>> = {}
      const { blacklist } = NAVIGATION.blacklist
      window.world.regions
        .filter(region => !region.shattered)
        .forEach(region => {
          const src = window.world.provinces[region.capital]
          const targets = region.landBorders
            .map(i => {
              const border = window.world.regions[i]
              return window.world.provinces[border.capital]
            })
            .filter(target => !cache[src.idx]?.[target.idx] && !PROVINCE.region(target).shattered)
          targets.forEach(dst => {
            if (!cache[src.idx]) cache[src.idx] = {}
            cache[src.idx][dst.idx] = true
            if (!cache[dst.idx]) cache[dst.idx] = {}
            cache[dst.idx][src.idx] = true
            NAVIGATION.addRoute({ src, dst, blacklist, type: 'land', imperial: true })
          })
        })
    },
    build: () => {
      CULTURAL.spheres()
      CIVILIZATION._imperialRoads()
      URBANIZATION.build()
    }
  }
})
