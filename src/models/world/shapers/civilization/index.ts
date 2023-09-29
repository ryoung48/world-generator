import { REGION } from '../../../regions'
import { PROVINCE } from '../../../regions/provinces'
import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
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
    _sundering: () => {
      const spacing = (window.world.dim.w + window.world.dim.h) * 0.05
      WORLD.placement({
        count: Math.floor(window.world.regions.length * 0.03),
        spacing,
        whitelist: window.dice.shuffle(
          window.world.regions.map(r => PROVINCE.cell(REGION.capital(r)))
        )
      })
        .map(poly => window.world.regions[poly.region])
        .forEach(region => {
          if (!region.shattered) {
            shattered[region.idx] = []
            region.shattered = true
            REGION.sort({
              ref: region,
              regions: window.dice.shuffle(
                REGION.landBorders({ region, depth: 2 }).filter(region => !region.shattered)
              ),
              type: 'closest'
            })
              .slice(0, 5)
              .forEach(n => {
                n.shattered = true
                shattered[region.idx].push(n.idx)
              })
          }
        })
    },
    build: () => {
      CULTURAL.spheres()
      // CIVILIZATION._sundering()
      CIVILIZATION._imperialRoads()
      URBANIZATION.build()
    }
  }
})
