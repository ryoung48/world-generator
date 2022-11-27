import { location__isSettlement } from '../../regions/locations'
import { location__isCity } from '../../regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../../regions/locations/types'
import { province__neighbors } from '../../regions/provinces'
import { world__gps } from '..'
import { climates, glacierLatitudeCutoff } from './types'

type elevation = 'mountainous' | 'highlands' | 'hills' | 'flat'

const locTerrain = (params: { loc: Loc; height: elevation }) => {
  const { loc, height } = params
  const province = window.world.provinces[loc.province]
  const region = window.world.regions[province.region]
  const climate = climates[region.climate]
  const tropical = climate.zone === 'tropical'
  const arctic = climate.zone === 'arctic'
  const nearbyDesert = province__neighbors(province).some(p => {
    const r = window.world.regions[p.region]
    return climates[r.climate].terrain === 'desert'
  })
  const nearbyPlains = province__neighbors(province).some(p => {
    const r = window.world.regions[p.region]
    return climates[r.climate].terrain === 'plains'
  })
  const nearbyForest = province__neighbors(province).some(p => {
    const r = window.world.regions[p.region]
    return climates[r.climate].terrain === 'forest'
  })
  const mountainous = height === 'mountainous'
  const flat = height === 'flat'
  const city = location__isCity(loc)
  const settlement = location__isSettlement(loc)
  let terrain = { name: '', desc: '', water: '' }
  if (climate.terrain === 'forest') {
    const arctic = climate.zone === 'arctic'
    const wilds = tropical || arctic
    terrain.name = tropical ? 'jungle' : 'forest'
    terrain.desc = mountainous
      ? 'sparse'
      : nearbyDesert
      ? 'grass'
      : nearbyPlains
      ? 'sparse'
      : window.dice.weightedChoice([
          { v: 'sparse', w: 0.1 },
          { v: 'medium', w: !wilds ? 0.3 : 0.6 },
          { v: 'dense', w: wilds ? 0.6 : 0.3 }
        ])
    if (terrain.desc === 'grass') terrain.name = 'plains'
  } else if (climate.terrain === 'plains') {
    terrain.name = 'plains'
    terrain.desc =
      mountainous || nearbyDesert
        ? 'dry'
        : nearbyForest
        ? 'sparse'
        : window.dice.weightedChoice([
            { v: 'grass', w: 0.8 },
            { v: 'dry', w: 0.1 },
            { v: 'sparse', w: tropical ? 0.2 : 0.1 }
          ])
    if (terrain.desc === 'sparse') terrain.name = 'forest'
  } else if (climate.terrain === 'desert') {
    terrain.name = 'desert'
    terrain.desc = mountainous
      ? 'rocky'
      : nearbyForest
      ? 'dry'
      : window.dice.weightedChoice([
          { v: 'rocky', w: tropical ? 0.4 : 0.6 },
          { v: 'sandy', w: tropical ? 0.6 : 0.4 }
        ])
    if (terrain.desc === 'dry') terrain.name = 'plains'
  } else if (climate.terrain === 'arctic') {
    const { latitude } = world__gps(loc)
    terrain.name = Math.abs(latitude) > glacierLatitudeCutoff ? 'glacier' : 'tundra'
  }
  if (city) terrain.desc = 'farms'
  let waterChance = city ? 0.6 : settlement ? 0.3 : 0.2
  if (mountainous || terrain.name === 'glacier' || terrain.desc === 'dry') waterChance = 0
  else if (climate.terrain === 'plains' || terrain.name === 'tundra') waterChance /= 2
  else if (climate.terrain === 'desert' || terrain.name === 'glacier') waterChance /= 4
  const water = window.dice.random < waterChance
  if (water) {
    terrain.water =
      terrain.name === 'desert'
        ? 'oasis'
        : window.dice.weightedChoice([
            { v: 'lake', w: loc.coastal || !flat ? 0 : 0.5 },
            { v: 'fjords', w: loc.coastal && arctic ? 0.5 : 0 },
            {
              v: 'marsh',
              w: !city && flat ? 0.5 : 0
            }
          ])
  }
  return terrain
}

const locElevation = (loc: Loc): elevation => {
  const cell = window.world.cells[loc.cell]
  const province = window.world.provinces[loc.province]
  const mountainous = province.mountains > 0
  if (cell.isMountains || (mountainous && window.dice.random > 0.6)) return 'mountainous'
  if (mountainous && window.dice.random > 0.6) return 'highlands'
  if (mountainous || (!cell.coastal && window.dice.random > 0.75)) return 'hills'
  return 'flat'
}

export const location__terrain = (loc: Loc) => {
  if (!loc._terrain) {
    const height = locElevation(loc)
    const { name, desc, water } = locTerrain({ loc, height })
    loc._terrain = {
      terrain: `${name} ${
        desc || water ? `(${desc}${water ? `${desc ? ', ' : ''}${water}` : ''})` : ''
      }`,
      elevation: height
    }
  }
  return loc._terrain
}
