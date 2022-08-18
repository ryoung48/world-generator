import { province__markets } from '../../provinces/networks/trade_goods'
import { location__isSettlement } from '../'
import {
  location__isCity,
  location__isTown,
  location__isVillage
} from '../spawn/taxonomy/settlements'
import { Loc } from '../types'
import { LocationContext } from './types'

const location__isUrban = (location: Loc) => {
  let urban = false
  let city = false
  let village = false
  if (location__isSettlement(location)) {
    const isCity = location__isCity(location)
    const isTown = location__isTown(location)
    village = location__isVillage(location)
    urban = isCity || isTown
    city = isCity
  }
  return { urban, city, village }
}

export const location__context = (location: Loc): LocationContext => {
  const province = window.world.provinces[location.province]
  const region = window.world.regions[province.region]
  const { urban, city, village } = location__isUrban(location)
  const tradeGoods = province__markets(province)
  const gold = tradeGoods['metals (precious)']?.supply > 0
  return {
    idx: location.idx,
    urban,
    city,
    village,
    tribal: !region.civilized,
    remote: region.development === 'remote',
    coastal: tradeGoods.fish?.supply > 0,
    gold,
    mining:
      tradeGoods['metals (common)']?.supply > 0 ||
      gold ||
      tradeGoods['metals (gemstones)']?.supply > 0,
    lumber: tradeGoods.lumber?.supply > 0,
    herders: tradeGoods.livestock?.supply > 0,
    textiles: tradeGoods.fabric?.supply > 0 || tradeGoods.silk?.supply > 0,
    fur: tradeGoods.furs?.supply > 0,
    bees: tradeGoods.honey?.supply > 0,
    incense: tradeGoods.incense?.supply > 0,
    grain: tradeGoods.grains?.supply > 0,
    vegetables: tradeGoods.vegetables?.supply > 0,
    grapes: tradeGoods.grapes?.supply > 0,
    art: tradeGoods.artwork?.supply > 0,
    arcane:
      tradeGoods['products (arcane)']?.supply > 0 || tradeGoods['reagents (arcane)']?.supply > 0,
    stone:
      tradeGoods.stone?.supply > 0 ||
      tradeGoods.marble?.supply > 0 ||
      tradeGoods.clay?.supply > 0 ||
      tradeGoods.stonework?.supply > 0,
    herbs:
      tradeGoods['reagents (alchemical)']?.supply > 0 ||
      tradeGoods['products (alchemical)']?.supply > 0,
    alchemy: tradeGoods['products (alchemical)']?.supply > 0,
    cosmetics: tradeGoods.cosmetics?.supply > 0,
    smiths: tradeGoods.metalwork?.supply > 0,
    jewels: tradeGoods.jewelry?.supply > 0,
    clothing: tradeGoods['cloth goods']?.supply > 0,
    leather: tradeGoods.leatherwork?.supply > 0,
    glass: tradeGoods.glasswork?.supply > 0,
    mechanics: tradeGoods.machinery?.supply > 0,
    woodwork: tradeGoods.woodwork?.supply > 0,
    ships: tradeGoods.shipwrights?.supply > 0,
    alcohol: tradeGoods.spirits?.supply > 0,
    text: tradeGoods.texts?.supply > 0,
    ceramics: tradeGoods.ceramics?.supply > 0,
    mercenaries: tradeGoods.mercenaries?.supply > 0
  }
}
