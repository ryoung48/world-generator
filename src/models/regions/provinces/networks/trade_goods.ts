import { markets, trade_good } from '../../../items/economy'
import { scale } from '../../../utilities/math'
import { day_ms } from '../../../utilities/math/time'
import { decorated_profile } from '../../../utilities/performance'
import { BasicCache, memoize } from '../../../utilities/performance/memoization'
import { climate_lookup } from '../../../world/climate/types'
import { region__demand } from '../..'
import { region__at_peace } from '../../diplomacy/status'
import { province__cell } from '..'
import { Province } from '../types'
import { province__network } from '.'

interface TradeGood {
  flow: number
  supply: number
  rarity: number
  demand: number
}

type TradeGoods = Partial<Record<trade_good, TradeGood>>

// assumes 3 mph travel speed
const _travel_debt = (city: Province, loc: Province) => {
  const distances = province__network(city)
  const cell_distance = (distances[loc.idx] || Infinity) - 1
  const actual_distance = cell_distance * window.world.dim.cell_length
  return actual_distance / 3 / 24 + 1
}
type travel_debt_cache = Record<number, Record<number, number>>
const travel_debt = memoize(_travel_debt, {
  store: (): travel_debt_cache => ({}),
  get: (cache: travel_debt_cache, city: Province, loc: Province) => {
    if (cache[city.idx]?.[loc.idx]) return cache[city.idx][loc.idx]
  },
  set: (cache: travel_debt_cache, cost: number, city: Province, loc: Province) => {
    if (!cache[city.idx]) cache[city.idx] = {}
    cache[city.idx][loc.idx] = cost
    if (!cache[loc.idx]) cache[loc.idx] = {}
    cache[loc.idx][city.idx] = cost
  }
})

const transport_costs = (city: Province, loc: Province) => {
  const tariffs = city.curr_nation !== loc.curr_nation
  const curr_nation = window.world.regions[loc.curr_nation]
  const war = !region__at_peace(curr_nation)
  return travel_debt(city, loc) ** (war ? 2 : tariffs ? 1.8 : 1.6)
}
const province_demand = (province: Province) => {
  // compute regional demand (resets yearly)
  region__demand(province.region)
  const region = window.world.regions[province.region]
  if (province.memory.trade_demand < region.memory.trade_demand) {
    province.memory.trade_demand = region.memory.trade_demand
    markets.forEach(market => {
      province.resources.demand[market] = region.trade_demand[market] + window.dice.norm(0, 0.05)
    })
  }
}
const _trade_sim = (city: Province): TradeGoods => {
  // set base demand
  province_demand(city)
  // compute supply
  const trade_goods: TradeGoods = {}
  markets.forEach(market => {
    const flow = window.world.provinces.reduce((sum, province) => {
      const supply = province.resources.supply[market] ?? 0
      return sum + supply / transport_costs(city, province)
    }, 0)
    trade_goods[market] = {
      flow,
      supply: city.resources.supply[market] ?? 0,
      demand: city.resources.demand[market] ?? 0,
      rarity: scale([0.5, 1, 2, 3, 5, 20], [-0.5, 0, 0.2, 0.5, 1, 5], 0.5 + (1 / flow) * 0.003)
    }
  })
  // adjust demand based on events
  const curr_nation = window.world.regions[city.curr_nation]
  // regions at war will need weapons, armor, medicine, and arcane wares
  if (!region__at_peace(curr_nation)) {
    const war_effort: trade_good[] = [
      'metals (common)',
      'metalwork',
      'products (alchemical)',
      'products (arcane)'
    ]
    war_effort.forEach(market => (trade_goods[market].demand += 0.3))
  }
  // tropical regions don't need furs
  if (climate_lookup[curr_nation.climate].zone === 'Tropical') {
    trade_goods.furs.demand -= 0.5
  }
  // inland provinces don't need skilled shipwrights
  if (!province__cell(city).beach) {
    trade_goods.shipwrights.demand -= 0.3
  }
  return trade_goods
}
const trade_sim = memoize(_trade_sim, {
  store: (): BasicCache<TradeGoods> => ({}),
  get: (cache, province) => {
    // recompute very 30 days
    if (province.memory.trade_goods < window.world.date) {
      province.memory.trade_goods = window.world.date + 30 * day_ms
    } else {
      return cache[province.idx]
    }
  },
  set: (cache, res, province) => {
    cache[province.idx] = res
  }
})
export const province__markets = decorated_profile(trade_sim, 'province__markets')
