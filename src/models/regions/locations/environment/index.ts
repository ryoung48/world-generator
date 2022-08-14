import { world__gps } from '../../../world'
import { terrain_types } from '../../../world/climate/terrain'
import { climate_lookup, climates } from '../../../world/climate/types'
import { compute_heat } from '../../../world/climate/weather'
import { province__hub } from '../../provinces'
import { location__is_settlement } from '..'
import { Loc } from '../types'

const location__climate = (location: Loc) => {
  if (!location._climate) {
    const cell = window.world.cells[location.cell]
    const province = window.world.provinces[location.province]
    const region = window.world.regions[province.region]
    const { latitude } = world__gps(location)
    const winter = compute_heat({
      cell,
      month: latitude < 0 ? 5 : 0,
      climate: climate_lookup[region.climate]
    })
    location._climate = winter > 64 ? 'Warm' : winter >= 32 ? 'Temperate' : 'Cold'
  }
  return location._climate
}

const location_terrain = (loc: Loc): terrain_types => {
  if (!loc._terrain) {
    const cell = window.world.cells[loc.cell]
    if (cell.is_water) {
      loc._terrain = 'Oceanic'
    } else {
      const province = window.world.provinces[loc.province]
      const region = window.world.regions[province.region]
      const hub = loc === province__hub(province)
      const mountainous = province.mountains > 0
      if (!location__is_settlement(loc) || !hub) {
        loc._terrain = location_terrain(province__hub(province))
      } else if (cell.is_mountains || (mountainous && window.dice.flip)) {
        loc._terrain = 'Mountains'
      } else if (Object.keys(province.lakes).length > 0) {
        loc._terrain = 'Marsh'
      } else if (region.climate === climates.POLAR) {
        loc._terrain = 'Arctic'
      } else {
        loc._terrain = climate_lookup[region.climate].terrain
      }
    }
  }
  return loc._terrain
}

const no_prefix_terrains: terrain_types[] = ['Arctic']

export const location__terrain = (location: Loc) => {
  const terrain = location_terrain(location)
  const climate = location__climate(location)
  return {
    key: no_prefix_terrains.includes(terrain) ? terrain : `${climate} ${terrain}`,
    terrain,
    climate
  }
}
