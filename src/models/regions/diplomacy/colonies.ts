import { region__nation } from '..'
import { Region } from '../types'

export const region__colonists = (region: Region) =>
  Array.from(
    new Set(
      region.colonial_presence.colonies.map(
        ({ nation }) => region__nation(window.world.regions[nation]).idx
      )
    )
  ).map(n => window.world.regions[n])

export const region__prospect_colony = (region: Region) => {
  const overlord = region__nation(region)
  return !overlord.civilized && !region.civilized
}
