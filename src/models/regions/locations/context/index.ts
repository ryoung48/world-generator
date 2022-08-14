import { province__markets } from '../../provinces/networks/trade_goods'
import { location__is_settlement } from '../'
import {
  location__is_city,
  location__is_town,
  location__is_village
} from '../spawn/taxonomy/settlements'
import { Loc } from '../types'
import { LocationContext } from './types'

const location__is_urban = (location: Loc) => {
  let urban = false
  let city = false
  let village = false
  if (location__is_settlement(location)) {
    const is_city = location__is_city(location)
    const is_town = location__is_town(location)
    village = location__is_village(location)
    urban = is_city || is_town
    city = is_city
  }
  return { urban, city, village }
}

export const location__context = (location: Loc): LocationContext => {
  const province = window.world.provinces[location.province]
  const region = window.world.regions[province.region]
  const { urban, city, village } = location__is_urban(location)
  const trade_goods = province__markets(province)
  const gold = trade_goods['metals (precious)']?.supply > 0
  return {
    idx: location.idx,
    urban,
    city,
    village,
    tribal: !region.civilized,
    remote: region.development === 'remote',
    coastal: trade_goods.fish?.supply > 0,
    gold,
    mining:
      trade_goods['metals (common)']?.supply > 0 ||
      gold ||
      trade_goods['metals (gemstones)']?.supply > 0,
    lumber: trade_goods.lumber?.supply > 0,
    herders: trade_goods.livestock?.supply > 0,
    textiles: trade_goods.fabric?.supply > 0 || trade_goods.silk?.supply > 0,
    fur: trade_goods.furs?.supply > 0,
    bees: trade_goods.honey?.supply > 0,
    incense: trade_goods.incense?.supply > 0,
    grain: trade_goods.grains?.supply > 0,
    vegetables: trade_goods.vegetables?.supply > 0,
    grapes: trade_goods.grapes?.supply > 0,
    art: trade_goods.artwork?.supply > 0,
    arcane:
      trade_goods['products (arcane)']?.supply > 0 || trade_goods['reagents (arcane)']?.supply > 0,
    stone:
      trade_goods.stone?.supply > 0 ||
      trade_goods.marble?.supply > 0 ||
      trade_goods.clay?.supply > 0 ||
      trade_goods.stonework?.supply > 0,
    herbs:
      trade_goods['reagents (alchemical)']?.supply > 0 ||
      trade_goods['products (alchemical)']?.supply > 0,
    alchemy: trade_goods['products (alchemical)']?.supply > 0,
    cosmetics: trade_goods.cosmetics?.supply > 0,
    smiths: trade_goods.metalwork?.supply > 0,
    jewels: trade_goods.jewelry?.supply > 0,
    clothing: trade_goods['cloth goods']?.supply > 0,
    leather: trade_goods.leatherwork?.supply > 0,
    glass: trade_goods.glasswork?.supply > 0,
    mechanics: trade_goods.machinery?.supply > 0,
    woodwork: trade_goods.woodwork?.supply > 0,
    ships: trade_goods.shipwrights?.supply > 0,
    alcohol: trade_goods.spirits?.supply > 0,
    text: trade_goods.texts?.supply > 0,
    ceramics: trade_goods.ceramics?.supply > 0,
    mercenaries: trade_goods.mercenaries?.supply > 0
  }
}
