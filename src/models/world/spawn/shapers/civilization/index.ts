import { developmentMap } from '../../../../regions/development'
import { province__hub } from '../../../../regions/provinces'
import { Region } from '../../../../regions/types'
import { scale } from '../../../../utilities/math'
import { addPath, routeBlacklist, shortestPath } from '../../../travel/navigation'
import { Shaper } from '..'
import { culturalSpheres } from './cultures'
import { urbanization } from './urbanization'

export class CivilizationShaper extends Shaper {
  get pipeline() {
    return [
      { name: 'Cultural Spheres', action: culturalSpheres },
      { name: 'Old Imperial Roads', action: this.imperialRoads },
      { name: 'Urbanization', action: urbanization },
      { name: 'Regional Government', action: this.government }
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
  private government() {
    const domain = [1, 2.5, 4]
    window.world.regions.forEach(region => {
      const { development } = region
      const developmentScore = developmentMap[development]
      const structure = window.dice.weightedChoice<Region['government']['structure']>([
        { v: 'autocratic', w: scale(domain, [10, 15, 35], developmentScore) },
        { v: 'theocratic', w: scale(domain, [1, 10, 20], developmentScore) },
        { v: 'oligarchic', w: scale(domain, [5, 15, 25], developmentScore) },
        { v: 'confederation', w: scale(domain, [20, 30, 15], developmentScore) },
        { v: 'anarchic', w: scale(domain, [64, 25, 5], developmentScore) }
      ])
      region.government = {
        structure,
        succession: window.dice.random > 0.9 ? 'elected' : 'hereditary'
      }
    })
  }
}
