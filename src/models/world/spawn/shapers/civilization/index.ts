import { province__hub } from '../../../../regions/provinces'
import { add_path, route_blacklist, shortest_path } from '../../../travel/navigation'
import { Shaper } from '..'
import { cultural_spheres } from './cultures'
import { regional_society } from './society'
import { urbanization } from './urbanization'

export class CivilizationShaper extends Shaper {
  get pipeline() {
    return [
      { name: 'Cultural Spheres', action: cultural_spheres },
      { name: 'Old Imperial Roads', action: this.imperial_roads },
      { name: 'Urbanization', action: urbanization },
      { name: 'Government & Society', action: regional_society }
    ]
  }
  private imperial_roads() {
    const cache: Record<number, Record<number, boolean>> = {}
    const { blacklist } = route_blacklist()
    window.world.regions.forEach(region => {
      const src = window.world.provinces[region.capital]
      const targets = region.land_borders
        .map(i => {
          const border = window.world.regions[i]
          return window.world.provinces[border.capital]
        })
        .filter(target => !cache[src.idx]?.[target.idx])
      targets.forEach(dst => {
        if (!cache[src.idx]) cache[src.idx] = {}
        cache[src.idx][dst.idx] = true
        if (!cache[dst.idx]) cache[dst.idx] = {}
        cache[dst.idx][src.idx] = true
        const path = shortest_path({
          type: 'land',
          start: province__hub(src).cell,
          end: province__hub(dst).cell
        })
        add_path({ src, dst, path, blacklist, type: 'land', imperial: true })
      })
    })
  }
}
