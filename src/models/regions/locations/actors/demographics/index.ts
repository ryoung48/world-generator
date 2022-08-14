import { scale } from '../../../../utilities/math'
import { day_ms } from '../../../../utilities/math/time'
import { decorated_profile } from '../../../../utilities/performance'
import { BasicCache, memoize } from '../../../../utilities/performance/memoization'
import { province__culture } from '../../../provinces'
import { province__network } from '../../../provinces/networks'
import { location__get_closest_settlement } from '../..'
import { Loc } from '../../types'

interface Demographics {
  provinces: Record<string, number>
  regions: Record<string, number>
  common_cultures: Record<string, number>
  ruling_cultures: Record<string, number>
  species: Record<string, number>
}

export const location__culture = (location: Loc) => {
  const province = window.world.provinces[location.province]
  return province__culture(province)
}

const scale_demographic = (demographic: Record<string, number>) => {
  const total_provinces = Object.values(demographic).reduce((sum, v) => sum + v, 0)
  Object.entries(demographic).forEach(([k, v]) => {
    demographic[k] = v / total_provinces
  })
}
const _settlement_demographics = (loc: Loc): Demographics => {
  const demographics: Demographics = {
    provinces: {},
    regions: {},
    common_cultures: {},
    ruling_cultures: {},
    species: {}
  }
  window.world.provinces.forEach(k => (demographics.provinces[k.idx] = 0))
  window.world.regions.forEach(k => (demographics.regions[k.idx] = 0))
  window.world.cultures.forEach(k => (demographics.common_cultures[k.idx] = 0))
  const pop_scale = scale([0, 100000], [40, 400], loc.population)
  const origins = scale([0, 100000], [0.9, 0.6], loc.population)
  const province = window.world.provinces[loc.province]
  const network = province__network(province)
  Object.entries(network)
    .map(([k, v]) => {
      const mod = v / pop_scale + 1
      const province_idx = parseInt(k)
      const traffic = 1 / v ** mod
      const { local, ruling } = province__culture(window.world.provinces[province_idx])
      return {
        province: {
          idx: province_idx,
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
      demographics.common_cultures[regional.ruling] += regional.value * 0.3
      demographics.common_cultures[national.ruling] += national.value * 0.3
      demographics.common_cultures[regional.native] += regional.value * 0.7
      demographics.common_cultures[national.native] += national.value * 0.7
    })
  const native_idx = window.world.regions[province.region].culture.native
  const ruling_idx = window.world.regions[province.curr_nation].culture.ruling
  const majority_mod = 4
  demographics.ruling_cultures = {
    ...demographics.common_cultures,
    [native_idx]: demographics.common_cultures[native_idx] * majority_mod,
    [ruling_idx]: demographics.common_cultures[ruling_idx] * majority_mod
  }
  scale_demographic(demographics.provinces)
  scale_demographic(demographics.regions)
  scale_demographic(demographics.common_cultures)
  scale_demographic(demographics.ruling_cultures)
  scale_demographic(demographics.species)
  return demographics
}
const compute_demographics = memoize(_settlement_demographics, {
  store: (): BasicCache<Demographics> => ({}),
  get: (cache, loc) => {
    // recompute very 10 days
    if (loc.memory.demographics === undefined || loc.memory.demographics < window.world.date) {
      loc.memory.demographics = window.world.date + 10 * day_ms
    } else {
      return cache[loc.idx]
    }
  },
  set: (cache, res, loc) => {
    cache[loc.idx] = res
  }
})
const _location__demographics = (loc: Loc): Demographics => {
  const settlement = location__get_closest_settlement(loc)
  return compute_demographics(settlement)
}
export const location__demographics = decorated_profile(_location__demographics)
