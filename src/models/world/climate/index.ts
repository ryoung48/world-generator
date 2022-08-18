import { Region } from '../../regions/types'
import { climates } from './types'

export const classifyClimate = (params: {
  region: Region
  location: 'inland' | 'west_coast' | 'east_coast'
  latitude: number
  continent: boolean
  monsoon: boolean
}) => {
  const { region, location, latitude, continent, monsoon } = params
  if (location === 'west_coast') {
    if (latitude < 5) {
      region.climate = climates.EQUATORIAL
    } else if (latitude < 10) {
      region.climate = monsoon ? climates.TROPICAL_MONSOON : climates.EQUATORIAL
    } else if (latitude < 20) {
      region.climate = climates.SAVANNA
    } else if (latitude < 30 && continent) {
      region.climate = climates.HOT_DESERT
    } else if (latitude < 35) {
      region.climate = climates.HOT_STEPPE
    } else if (latitude < 45) {
      region.climate = climates.MEDITERRANEAN
    } else if (latitude < 60) {
      region.climate = climates.OCEANIC
    } else if (latitude < 75) {
      region.climate = climates.SUBARCTIC
    } else {
      region.climate = climates.POLAR
    }
  } else if (location === 'inland') {
    if (latitude < 10) {
      region.climate = climates.EQUATORIAL
    } else if (latitude < 15) {
      region.climate = climates.SAVANNA
    } else if (latitude < 30 && continent) {
      region.climate = climates.HOT_DESERT
    } else if (latitude < 40) {
      region.climate = climates.HOT_STEPPE
    } else if (latitude < 45 && continent) {
      region.climate = climates.COLD_DESERT
    } else if (latitude < 60) {
      region.climate = climates.COLD_STEPPE
    } else if (latitude < 75) {
      region.climate = climates.SUBARCTIC
    } else {
      region.climate = climates.POLAR
    }
  } else if (location === 'east_coast') {
    if (latitude < 5) {
      region.climate = climates.EQUATORIAL
    } else if (latitude < 20) {
      region.climate = continent ? climates.TROPICAL_MONSOON : climates.EQUATORIAL
    } else if (latitude < 40) {
      region.climate = monsoon ? climates.TEMPERATE_MONSOON : climates.SUBTROPICAL
    } else if (latitude < 60) {
      region.climate = monsoon ? climates.MANCHURIAN : climates.CONTINENTAL
    } else if (latitude < 75) {
      region.climate = monsoon ? climates.SIBERIAN : climates.SUBARCTIC
    } else {
      region.climate = climates.POLAR
    }
  }
}
