import { world__gps } from '../../../world'
import { Terrain } from '../../../world/climate/terrain'
import { climateLookup, climates } from '../../../world/climate/types'
import { computeHeat } from '../../../world/climate/weather'
import { province__hub } from '../../provinces'
import { location__isSettlement } from '..'
import { Loc } from '../types'

const locationClimate = (location: Loc) => {
  if (!location._climate) {
    const cell = window.world.cells[location.cell]
    const province = window.world.provinces[location.province]
    const region = window.world.regions[province.region]
    const { latitude } = world__gps(location)
    const winter = computeHeat({
      cell,
      month: latitude < 0 ? 5 : 0,
      climate: climateLookup[region.climate]
    })
    location._climate = winter > 64 ? 'Warm' : winter >= 32 ? 'Temperate' : 'Cold'
  }
  return location._climate
}

const locationTerrain = (loc: Loc): Terrain => {
  if (!loc._terrain) {
    const cell = window.world.cells[loc.cell]
    if (cell.isWater) {
      loc._terrain = 'Oceanic'
    } else {
      const province = window.world.provinces[loc.province]
      const region = window.world.regions[province.region]
      const hub = loc === province__hub(province)
      const mountainous = province.mountains > 0
      if (!location__isSettlement(loc) || !hub) {
        loc._terrain = locationTerrain(province__hub(province))
      } else if (cell.isMountains || (mountainous && window.dice.flip)) {
        loc._terrain = 'Mountains'
      } else if (Object.keys(province.lakes).length > 0) {
        loc._terrain = 'Marsh'
      } else if (region.climate === climates.POLAR) {
        loc._terrain = 'Arctic'
      } else {
        loc._terrain = climateLookup[region.climate].terrain
      }
    }
  }
  return loc._terrain
}

const noPrefixTerrains: Terrain[] = ['Arctic']

export const location__terrain = (location: Loc) => {
  const terrain = locationTerrain(location)
  const climate = locationClimate(location)
  return {
    key: noPrefixTerrains.includes(terrain) ? terrain : `${climate} ${terrain}`,
    terrain,
    climate
  }
}
