import { world__tick } from '../../../history/events'
import { event__diplomacy } from '../../../history/events/diplomacy'
import { event__healthCheck } from '../../../history/events/health'
import { event__succession } from '../../../history/events/succession'
import { TradeGood } from '../../../items/economy'
import { folkReligion__spawn, organizedReligion__spawn } from '../../../npcs/species/religions'
import { region__neighbors } from '../../../regions'
import { region__prospectColony } from '../../../regions/diplomacy/colonies'
import {
  location__isCity,
  location__isTown
} from '../../../regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../../../regions/locations/types'
import { province__cell, province__hub } from '../../../regions/provinces'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { yearMS } from '../../../utilities/math/time'
import { profile } from '../../../utilities/performance'
import { climates } from '../../climate/types'
import { Shaper } from '.'

const maxMarketsTotal: Partial<Record<Loc['type'], number>> = {
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

let maxMarkets: Partial<Record<Loc['type'], number>> = {
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

const marketMap = new Map<Province, number>()

const placeResources = (key: TradeGood, markets: Province[], weights: number[]) => {
  markets.forEach((market, i) => {
    market.resources.supply[key] = weights[i]
    const count = marketMap.get(market) || 0
    marketMap.set(market, count + 1)
  })
}

const randomPlacement = (key: TradeGood, market: Province[], rarity: number) => {
  const target = Math.ceil(market.length * rarity)
  const open = market.filter(m => (marketMap.get(m) || 0) < maxMarkets[province__hub(m).type])
  const closed = market.filter(m => (marketMap.get(m) || 0) >= maxMarkets[province__hub(m).type])
  const refs = window.dice.shuffle(open).concat(window.dice.shuffle(closed)).slice(0, target)
  const weights = window.dice.uniformDist(target)
  placeResources(key, refs, weights)
}

const climateRandomPlacement = (key: TradeGood, climes: climates[], rarity: number) => {
  const markets = window.world.provinces.filter(province =>
    climes.includes(window.world.regions[province.region].climate)
  )
  randomPlacement(key, markets, rarity)
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
        action: this.worldReligions
      },
      {
        name: 'Imperial Colonies',
        action: this.imperialColonies
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
  private worldReligions() {
    folkReligion__spawn()
    organizedReligion__spawn()
    window.world.regions.forEach(region => {
      const { religion: ridx } = window.world.cultures[region.culture.ruling]
      const religion = window.world.religions[ridx]
      region.religion.state = religion.idx
      region.religion.native = religion.idx
      if (religion.leadership === 'secular') region.religion.authority = 'theocratic'
    })
  }
  private imperialColonies() {
    const coastalRegions = window.world.regions.filter(region => region.regional.coastal)
    const prospectColonies = coastalRegions
      .filter(
        region =>
          region__prospectColony(region) &&
          region__neighbors(region).every(n => !window.world.regions[n].civilized)
      )
      .sort((a, b) => b.wealth - a.wealth)
    const prospectColonists = coastalRegions.filter(region => region.development === 'civilized')
    prospectColonists.forEach(colonist => {
      const neighbors = new Set(region__neighbors(colonist))
      window.dice
        .shuffle(
          prospectColonies
            .filter(
              colony => !neighbors.has(colony.idx) && colony.colonialPresence.colonies.length < 3
            )
            .slice(0, 50)
        )
        .slice(0, colonist.development === 'civilized' ? 3 : 1)
        .forEach(colony => {
          const initiative = window.dice.choice<
            Region['colonialPresence']['colonies'][number]['tag']
          >(['trading company', 'colonial settlers'])
          colonist.colonialPresence.colonies.push({
            nation: colony.idx,
            tag: initiative,
            type: 'overlord'
          })
          colony.colonialPresence.colonies.push({
            nation: colonist.idx,
            tag: initiative,
            type: 'colony'
          })
        })
    })
    prospectColonies
      .filter(colony => colony.colonialPresence.colonies.length > 0)
      .forEach(colony => {
        colony.colonialPresence.embassy = colony.provinces
          .map(p => window.world.provinces[p])
          .filter(province => province.ocean > 0)
          .reduce((largest, province) => {
            if (largest === -1) return province.idx
            const largestHub = province__hub(window.world.provinces[largest])
            const currHub = province__hub(province)
            return largestHub.population > currHub.population ? largest : province.idx
          }, -1)
      })
  }
  private markets() {
    const productRarity = 0.1
    const towns = window.world.provinces.filter(province => {
      const hub = province__hub(province)
      return location__isCity(hub) || location__isTown(hub)
    })
    const industrial = towns.filter(province => {
      const hub = province__hub(province)
      const region = window.world.regions[province.region]
      return location__isCity(hub) && region.civilized
    })
    const coastalTowns = towns.filter(province => province__cell(province).beach)
    randomPlacement('machinery', industrial, productRarity)
    randomPlacement('texts', industrial, productRarity)
    randomPlacement('cosmetics', industrial, productRarity)
    randomPlacement('shipwrights', coastalTowns, productRarity)
    randomPlacement('products (alchemical)', towns, productRarity)
    randomPlacement('products (arcane)', towns, productRarity)
    randomPlacement('artwork', towns, productRarity)
    randomPlacement('candles', towns, productRarity)
    randomPlacement('ceramics', towns, productRarity)
    randomPlacement('cloth goods', towns, productRarity)
    randomPlacement('glasswork', towns, productRarity)
    randomPlacement('jewelry', towns, productRarity)
    randomPlacement('leatherwork', towns, productRarity)
    randomPlacement('metalwork', towns, productRarity)
    randomPlacement('spirits', towns, productRarity)
    randomPlacement('stonework', towns, productRarity)
    randomPlacement('woodwork', towns, productRarity)
    randomPlacement('mercenaries', towns, productRarity)
    randomPlacement('paper', towns, productRarity)
    maxMarkets = maxMarketsTotal
    const commodityRarity = 0.15
    const coastalSettlements = window.world.provinces.filter(
      province => province__cell(province).beach
    )
    randomPlacement('fish', coastalSettlements, 1)
    const mountainProvinces = window.world.provinces.filter(province => province.mountains > 0)
    randomPlacement('metals (gemstones)', mountainProvinces, commodityRarity)
    randomPlacement('metals (precious)', mountainProvinces, commodityRarity)
    randomPlacement('metals (common)', mountainProvinces, 0.6)
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
    climateRandomPlacement(
      'furs',
      [climates.CONTINENTAL, climates.OCEANIC, climates.SUBARCTIC, climates.POLAR],
      commodityRarity
    )
    climateRandomPlacement(
      'spices',
      [climates.EQUATORIAL, climates.TROPICAL_MONSOON, climates.SAVANNA, climates.SUBTROPICAL],
      commodityRarity
    )
    climateRandomPlacement('lumber', trees, 0.6)
    climateRandomPlacement('silk', trees, commodityRarity)
    climateRandomPlacement('grapes', farmland, commodityRarity)
    climateRandomPlacement('oils', farmland, commodityRarity)
    climateRandomPlacement('vegetables', farmland, commodityRarity)
    climateRandomPlacement('wax', farmland, commodityRarity)
    climateRandomPlacement('fabric', farmland, commodityRarity)
    climateRandomPlacement('grains', farmland, commodityRarity + 0.1)
    climateRandomPlacement('honey', farmland, commodityRarity)
    climateRandomPlacement('livestock', farmland, commodityRarity)
    climateRandomPlacement('marble', common, commodityRarity)
    climateRandomPlacement('salt', common, commodityRarity)
    climateRandomPlacement('stone', common, commodityRarity)
    const tribalCities = window.world.provinces.filter(c => {
      const region = window.world.regions[c.region]
      return !region.civilized
    })
    randomPlacement('creatures', tribalCities, commodityRarity)
    climateRandomPlacement('clay', common, commodityRarity)
    climateRandomPlacement('dyes', common, commodityRarity)
    climateRandomPlacement('incense', common, commodityRarity)
    climateRandomPlacement('reagents (alchemical)', [...common, climates.POLAR], commodityRarity)
    randomPlacement('reagents (arcane)', window.world.provinces, commodityRarity)
  }
  private history() {
    const current = window.world.date
    profile({
      label: 'Initialize',
      f: () => {
        event__healthCheck.spawn()
        window.world.regions.forEach(region => {
          event__succession.spawn({ nation: region, init: true })
          event__diplomacy.spawn(region)
        })
      }
    })
    world__tick(current + yearMS * this.years)
  }
}
