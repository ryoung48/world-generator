import { province__hub } from '../../../../regions/provinces'
import { addPath, routeBlacklist, shortestPath } from '../../../travel/navigation'
import { Shaper } from '..'
import { culturalSpheres } from './cultures'
import { urbanization } from './urbanization'

export class CivilizationShaper extends Shaper {
  get pipeline() {
    return [
      { name: 'Cultural Spheres', action: culturalSpheres },
      { name: 'Old Imperial Roads', action: this.imperialRoads },
      { name: 'Urbanization', action: urbanization }
    ]
  }
  private imperialRoads() {
    const cache: Record<number, Record<number, boolean>> = {}
    const { blacklist } = routeBlacklist()
    window.world.regions.forEach(region => {
      const src = window.world.provinces[region.capital]
      const targets = region.landBorders
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
        const path = shortestPath({
          type: 'land',
          start: province__hub(src).cell,
          end: province__hub(dst).cell
        })
        addPath({ src, dst, path, blacklist, type: 'land', imperial: true })
      })
    })
  }
}
