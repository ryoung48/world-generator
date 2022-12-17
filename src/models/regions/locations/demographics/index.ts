import { location__getClosestSettlement } from '..'
import { buildDistribution, scale, WeightedDistribution } from '../../../utilities/math'
import { dayMS } from '../../../utilities/math/time'
import { decoratedProfile } from '../../../utilities/performance'
import { BasicCache, memoize } from '../../../utilities/performance/memoization'
import { province__culture } from '../../provinces'
import { province__network } from '../../provinces/network'
import { Loc } from '../types'

interface Demographics {
  common: WeightedDistribution<number>
  native: WeightedDistribution<number>
  foreign: WeightedDistribution<number>
}

const _demographics = (loc: Loc): Demographics => {
  const common: Record<string, number> = {}
  window.world.cultures.forEach(k => (common[k.idx] = 0))
  const popScale = scale([0, 100000], [40, 400], loc.population)
  const origins = scale([0, 100000], [0.9, 0.6], loc.population)
  const province = window.world.provinces[loc.province]
  const network = province__network(province)
  Object.entries(network)
    .map(([k, v]) => {
      const mod = v / popScale + 1
      const provinceIdx = parseInt(k)
      const traffic = 1 / v ** mod
      const { local, ruling } = province__culture(window.world.provinces[provinceIdx])
      return {
        province: {
          idx: provinceIdx,
          value: traffic
        },
        regional: {
          region: local.idx,
          ruling: local.culture.ruling,
          native: local.culture.native,
          value: traffic * origins
        },
        national: {
          region: ruling.idx,
          ruling: ruling.culture.ruling,
          native: ruling.culture.native,
          value: traffic * (1 - origins)
        }
      }
    })
    .forEach(({ regional, national }) => {
      common[regional.ruling] += regional.value * 0.3
      common[national.ruling] += national.value * 0.3
      common[regional.native] += regional.value * 0.7
      common[national.native] += national.value * 0.7
    })
  const commonDist = Object.entries(common)
    .map(([k, v]) => {
      return { w: v, v: parseInt(k) }
    })
    .sort((a, b) => b.w - a.w)
  const nativeIdx = window.world.regions[province.region].culture.native
  const rulingIdx = window.world.regions[province.nation].culture.ruling
  return {
    common: buildDistribution(commonDist),
    native: buildDistribution(commonDist.filter(({ v }) => v === nativeIdx || v === rulingIdx)),
    foreign: buildDistribution(commonDist.filter(({ v }) => v !== nativeIdx && v !== rulingIdx))
  }
}
const computeDemographics = memoize(_demographics, {
  store: (): BasicCache<Demographics> => ({}),
  get: (cache, loc) => {
    // recompute very 10 days
    if (loc.memory._demographics === undefined || loc.memory._demographics < window.world.date) {
      loc.memory._demographics = window.world.date + 10 * dayMS
    } else {
      return cache[loc.idx]
    }
  },
  set: (cache, res, loc) => {
    cache[loc.idx] = res
  }
})
const _location__demographics = (loc: Loc): Demographics => {
  const settlement = location__getClosestSettlement(loc)
  return computeDemographics(settlement)
}
export const location__demographics = decoratedProfile(_location__demographics)
