import { scale } from '../../../../utilities/math'
import { dayMS } from '../../../../utilities/math/time'
import { decoratedProfile } from '../../../../utilities/performance'
import { BasicCache, memoize } from '../../../../utilities/performance/memoization'
import { province__culture } from '../../../provinces'
import { province__network } from '../../../provinces/networks'
import { location__getClosestSettlement } from '../..'
import { Loc } from '../../types'

interface Demographics {
  provinces: Record<string, number>
  regions: Record<string, number>
  commonCultures: Record<string, number>
  rulingCultures: Record<string, number>
  species: Record<string, number>
}

export const location__culture = (location: Loc) => {
  const province = window.world.provinces[location.province]
  return province__culture(province)
}

const scaleDemographic = (demographic: Record<string, number>) => {
  const totalProvinces = Object.values(demographic).reduce((sum, v) => sum + v, 0)
  Object.entries(demographic).forEach(([k, v]) => {
    demographic[k] = v / totalProvinces
  })
}
const _settlementDemographics = (loc: Loc): Demographics => {
  const demographics: Demographics = {
    provinces: {},
    regions: {},
    commonCultures: {},
    rulingCultures: {},
    species: {}
  }
  window.world.provinces.forEach(k => (demographics.provinces[k.idx] = 0))
  window.world.regions.forEach(k => (demographics.regions[k.idx] = 0))
  window.world.cultures.forEach(k => (demographics.commonCultures[k.idx] = 0))
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
    .forEach(({ regional, national, province }) => {
      demographics.provinces[province.idx] += province.value
      demographics.regions[regional.region] += regional.value
      demographics.regions[national.region] += national.value
      demographics.commonCultures[regional.ruling] += regional.value * 0.3
      demographics.commonCultures[national.ruling] += national.value * 0.3
      demographics.commonCultures[regional.native] += regional.value * 0.7
      demographics.commonCultures[national.native] += national.value * 0.7
    })
  const nativeIdx = window.world.regions[province.region].culture.native
  const rulingIdx = window.world.regions[province.currNation].culture.ruling
  const majorityMod = 4
  demographics.rulingCultures = {
    ...demographics.commonCultures,
    [nativeIdx]: demographics.commonCultures[nativeIdx] * majorityMod,
    [rulingIdx]: demographics.commonCultures[rulingIdx] * majorityMod
  }
  scaleDemographic(demographics.provinces)
  scaleDemographic(demographics.regions)
  scaleDemographic(demographics.commonCultures)
  scaleDemographic(demographics.rulingCultures)
  scaleDemographic(demographics.species)
  return demographics
}
const computeDemographics = memoize(_settlementDemographics, {
  store: (): BasicCache<Demographics> => ({}),
  get: (cache, loc) => {
    // recompute very 10 days
    if (loc.memory.demographics === undefined || loc.memory.demographics < window.world.date) {
      loc.memory.demographics = window.world.date + 10 * dayMS
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
