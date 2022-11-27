import { markets, TradeGood } from '../../../items/economy'
import { scale } from '../../../utilities/math'
import { dayMS } from '../../../utilities/math/time'
import { decoratedProfile } from '../../../utilities/performance'
import { BasicCache, memoize } from '../../../utilities/performance/memoization'
import { climates } from '../../../world/climate/types'
import { region__demand } from '../..'
import { region__atPeace } from '../../diplomacy/status'
import { province__cell } from '..'
import { Province } from '../types'
import { province__network } from '.'

interface TradeGoodInstance {
  flow: number
  supply: number
  rarity: number
  demand: number
}

type TradeGoods = Partial<Record<TradeGood, TradeGoodInstance>>

// assumes 3 mph travel speed
const _travelDebt = (city: Province, loc: Province) => {
  const distances = province__network(city)
  const cellDistance = (distances[loc.idx] || Infinity) - 1
  const actualDistance = cellDistance * window.world.dim.cellLength
  return actualDistance / 3 / 24 + 1
}
type TravelDebtCache = Record<number, Record<number, number>>
const travelDebt = memoize(_travelDebt, {
  store: (): TravelDebtCache => ({}),
  get: (cache: TravelDebtCache, city: Province, loc: Province) => {
    if (cache[city.idx]?.[loc.idx]) return cache[city.idx][loc.idx]
  },
  set: (cache: TravelDebtCache, cost: number, city: Province, loc: Province) => {
    if (!cache[city.idx]) cache[city.idx] = {}
    cache[city.idx][loc.idx] = cost
    if (!cache[loc.idx]) cache[loc.idx] = {}
    cache[loc.idx][city.idx] = cost
  }
})

const transportCosts = (city: Province, loc: Province) => {
  const tariffs = city.currNation !== loc.currNation
  const currNation = window.world.regions[loc.currNation]
  const war = !region__atPeace(currNation)
  return travelDebt(city, loc) ** (war ? 2 : tariffs ? 1.8 : 1.6)
}
const provinceDemand = (province: Province) => {
  // compute regional demand (resets yearly)
  region__demand(province.region)
  const region = window.world.regions[province.region]
  if (province.memory.tradeDemand < region.memory.tradeDemand) {
    province.memory.tradeDemand = region.memory.tradeDemand
    markets.forEach(market => {
      province.resources.demand[market] = region.tradeDemand[market] + window.dice.norm(0, 0.05)
    })
  }
}
const _tradeSim = (city: Province): TradeGoods => {
  // set base demand
  provinceDemand(city)
  // compute supply
  const tradeGoods: TradeGoods = {}
  markets.forEach(market => {
    const flow = window.world.provinces.reduce((sum, province) => {
      const supply = province.resources.supply[market] ?? 0
      return sum + supply / transportCosts(city, province)
    }, 0)
    tradeGoods[market] = {
      flow,
      supply: city.resources.supply[market] ?? 0,
      demand: city.resources.demand[market] ?? 0,
      rarity: scale([0.5, 1, 2, 3, 5, 20], [-0.5, 0, 0.2, 0.5, 1, 5], 0.5 + (1 / flow) * 0.003)
    }
  })
  // adjust demand based on events
  const currNation = window.world.regions[city.currNation]
  // regions at war will need weapons, armor, medicine, and arcane wares
  if (!region__atPeace(currNation)) {
    const warEffort: TradeGood[] = [
      'metals (common)',
      'metalwork',
      'products (alchemical)',
      'products (arcane)'
    ]
    warEffort.forEach(market => (tradeGoods[market].demand += 0.3))
  }
  // tropical regions don't need furs
  if (climates[currNation.climate].zone === 'tropical') {
    tradeGoods.furs.demand -= 0.5
  }
  // inland provinces don't need skilled shipwrights
  if (!province__cell(city).beach) {
    tradeGoods.shipwrights.demand -= 0.3
  }
  return tradeGoods
}
const tradeSim = memoize(_tradeSim, {
  store: (): BasicCache<TradeGoods> => ({}),
  get: (cache, province) => {
    // recompute very 30 days
    if (province.memory.tradeGoods < window.world.date) {
      province.memory.tradeGoods = window.world.date + 30 * dayMS
    } else {
      return cache[province.idx]
    }
  },
  set: (cache, res, province) => {
    cache[province.idx] = res
  }
})
export const province__markets = decoratedProfile(tradeSim, 'province__markets')
