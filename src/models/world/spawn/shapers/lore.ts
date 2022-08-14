import { world__tick } from '../../../history/events'
import { event__diplomacy } from '../../../history/events/diplomacy'
import { event__health_check } from '../../../history/events/health'
import { event__succession } from '../../../history/events/succession'
import { trade_good } from '../../../items/economy'
import {
  folk_religion__spawn,
  organized_religion__spawn
} from '../../../npcs/species/humanoids/religions'
import { region__neighbors } from '../../../regions'
import { region__prospect_colony } from '../../../regions/diplomacy/colonies'
import {
  location__is_city,
  location__is_town
} from '../../../regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../../../regions/locations/types'
import { province__cell, province__hub } from '../../../regions/provinces'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { year_ms } from '../../../utilities/math/time'
import { profile } from '../../../utilities/performance'
import { climates } from '../../climate/types'
import { Shaper } from '.'

const max_markets_total: Partial<Record<Loc['type'], number>> = {
  'tiny village': 1,
  'small village': 2,
  'large village': 3,
  'small town': 6,
  'large town': 8,
  'small city': 10,
  'large city': 12,
  'huge city': 14,
  metropolis: 16
}

let max_markets: Partial<Record<Loc['type'], number>> = {
  'tiny village': 0,
  'small village': 0,
  'large village': 0,
  'small town': 1,
  'large town': 2,
  'small city': 4,
  'large city': 6,
  'huge city': 8,
  metropolis: 10
}

const market_map = new Map<Province, number>()

const place_resources = (key: trade_good, markets: Province[], weights: number[]) => {
  markets.forEach((market, i) => {
    market.resources.supply[key] = weights[i]
    const count = market_map.get(market) || 0
    market_map.set(market, count + 1)
  })
}

const random_placement = (key: trade_good, market: Province[], rarity: number) => {
  const target = Math.ceil(market.length * rarity)
  const open = market.filter(m => (market_map.get(m) || 0) < max_markets[province__hub(m).type])
  const closed = market.filter(m => (market_map.get(m) || 0) >= max_markets[province__hub(m).type])
  const refs = window.dice.shuffle(open).concat(window.dice.shuffle(closed)).slice(0, target)
  const weights = window.dice.uniform_dist(target)
  place_resources(key, refs, weights)
}

const climate_random_placement = (key: trade_good, climes: climates[], rarity: number) => {
  const markets = window.world.provinces.filter(province =>
    climes.includes(window.world.regions[province.region].climate)
  )
  random_placement(key, markets, rarity)
}

export class LoreShaper extends Shaper {
  private years = 100
  constructor(years: number) {
    super()
    this.years = years
  }
  get pipeline() {
    return [
      {
        name: 'Words of Faith',
        action: this.world_religions
      },
      {
        name: 'Imperial Colonies',
        action: this.imperial_colonies
      },
      {
        name: 'Wealth of Nations',
        action: this.markets
      },
      {
        name: 'Historical March',
        action: this.history
      }
    ]
  }
  private world_religions() {
    folk_religion__spawn()
    organized_religion__spawn()
    window.world.regions.forEach(region => {
      const { religion: ridx } = window.world.cultures[region.culture.ruling]
      const religion = window.world.religions[ridx]
      region.religion.state = religion.idx
      region.religion.native = religion.idx
      if (religion.leadership === 'secular') region.religion.authority = 'theocratic'
    })
  }
  private imperial_colonies() {
    const coastal_regions = window.world.regions.filter(region => region.regional.coastal)
    const prospect_colonies = coastal_regions
      .filter(
        region =>
          region__prospect_colony(region) &&
          region__neighbors(region).every(n => !window.world.regions[n].civilized)
      )
      .sort((a, b) => b.wealth - a.wealth)
    const prospect_colonists = coastal_regions.filter(region => region.development === 'civilized')
    prospect_colonists.forEach(colonist => {
      const neighbors = new Set(region__neighbors(colonist))
      window.dice
        .shuffle(
          prospect_colonies
            .filter(
              colony => !neighbors.has(colony.idx) && colony.colonial_presence.colonies.length < 3
            )
            .slice(0, 50)
        )
        .slice(0, colonist.development === 'civilized' ? 3 : 1)
        .forEach(colony => {
          const initiative = window.dice.choice<
            Region['colonial_presence']['colonies'][number]['tag']
          >(['trading company', 'colonial settlers'])
          colonist.colonial_presence.colonies.push({
            nation: colony.idx,
            tag: initiative,
            type: 'overlord'
          })
          colony.colonial_presence.colonies.push({
            nation: colonist.idx,
            tag: initiative,
            type: 'colony'
          })
        })
    })
    prospect_colonies
      .filter(colony => colony.colonial_presence.colonies.length > 0)
      .forEach(colony => {
        colony.colonial_presence.embassy = colony.provinces
          .map(p => window.world.provinces[p])
          .filter(province => province.ocean > 0)
          .reduce((largest, province) => {
            if (largest === -1) return province.idx
            const largest_hub = province__hub(window.world.provinces[largest])
            const curr_hub = province__hub(province)
            return largest_hub.population > curr_hub.population ? largest : province.idx
          }, -1)
      })
  }
  private markets() {
    const product_rarity = 0.1
    const towns = window.world.provinces.filter(province => {
      const hub = province__hub(province)
      return location__is_city(hub) || location__is_town(hub)
    })
    const industrial = towns.filter(province => {
      const hub = province__hub(province)
      const region = window.world.regions[province.region]
      return location__is_city(hub) && region.civilized
    })
    const coastal_towns = towns.filter(province => province__cell(province).beach)
    random_placement('machinery', industrial, product_rarity)
    random_placement('texts', industrial, product_rarity)
    random_placement('cosmetics', industrial, product_rarity)
    random_placement('shipwrights', coastal_towns, product_rarity)
    random_placement('products (alchemical)', towns, product_rarity)
    random_placement('products (arcane)', towns, product_rarity)
    random_placement('artwork', towns, product_rarity)
    random_placement('candles', towns, product_rarity)
    random_placement('ceramics', towns, product_rarity)
    random_placement('cloth goods', towns, product_rarity)
    random_placement('glasswork', towns, product_rarity)
    random_placement('jewelry', towns, product_rarity)
    random_placement('leatherwork', towns, product_rarity)
    random_placement('metalwork', towns, product_rarity)
    random_placement('spirits', towns, product_rarity)
    random_placement('stonework', towns, product_rarity)
    random_placement('woodwork', towns, product_rarity)
    random_placement('mercenaries', towns, product_rarity)
    random_placement('paper', towns, product_rarity)
    max_markets = max_markets_total
    const commodity_rarity = 0.15
    const coastal_settlements = window.world.provinces.filter(
      province => province__cell(province).beach
    )
    random_placement('fish', coastal_settlements, 1)
    const mountain_provinces = window.world.provinces.filter(province => province.mountains > 0)
    random_placement('metals (gemstones)', mountain_provinces, commodity_rarity)
    random_placement('metals (precious)', mountain_provinces, commodity_rarity)
    random_placement('metals (common)', mountain_provinces, 0.6)
    const deserts = [climates.HOT_DESERT, climates.COLD_DESERT]
    const grasslands = [climates.HOT_STEPPE, climates.COLD_STEPPE, climates.SAVANNA]
    const forests = [
      climates.EQUATORIAL,
      climates.TROPICAL_MONSOON,
      climates.SUBTROPICAL,
      climates.MEDITERRANEAN,
      climates.OCEANIC,
      climates.CONTINENTAL,
      climates.SUBARCTIC
    ]
    const farmland = [...forests, ...grasslands]
    const trees = [...forests]
    const common = [...deserts, ...grasslands, ...forests]
    climate_random_placement(
      'furs',
      [climates.CONTINENTAL, climates.OCEANIC, climates.SUBARCTIC, climates.POLAR],
      commodity_rarity
    )
    climate_random_placement(
      'spices',
      [climates.EQUATORIAL, climates.TROPICAL_MONSOON, climates.SAVANNA, climates.SUBTROPICAL],
      commodity_rarity
    )
    climate_random_placement('lumber', trees, 0.6)
    climate_random_placement('silk', trees, commodity_rarity)
    climate_random_placement('grapes', farmland, commodity_rarity)
    climate_random_placement('oils', farmland, commodity_rarity)
    climate_random_placement('vegetables', farmland, commodity_rarity)
    climate_random_placement('wax', farmland, commodity_rarity)
    climate_random_placement('fabric', farmland, commodity_rarity)
    climate_random_placement('grains', farmland, commodity_rarity + 0.1)
    climate_random_placement('honey', farmland, commodity_rarity)
    climate_random_placement('livestock', farmland, commodity_rarity)
    climate_random_placement('marble', common, commodity_rarity)
    climate_random_placement('salt', common, commodity_rarity)
    climate_random_placement('stone', common, commodity_rarity)
    const tribal_cities = window.world.provinces.filter(c => {
      const region = window.world.regions[c.region]
      return !region.civilized
    })
    random_placement('creatures', tribal_cities, commodity_rarity)
    climate_random_placement('clay', common, commodity_rarity)
    climate_random_placement('dyes', common, commodity_rarity)
    climate_random_placement('incense', common, commodity_rarity)
    climate_random_placement('reagents (alchemical)', [...common, climates.POLAR], commodity_rarity)
    random_placement('reagents (arcane)', window.world.provinces, commodity_rarity)
  }
  private history() {
    const current = window.world.date
    profile({
      label: 'Initialize',
      f: () => {
        event__health_check.spawn()
        window.world.regions.forEach(region => {
          event__succession.spawn({ nation: region, init: true })
          event__diplomacy.spawn(region)
        })
      }
    })
    world__tick(current + year_ms * this.years)
  }
}
