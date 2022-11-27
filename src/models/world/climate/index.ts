import { Region } from '../../regions/types'

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
      region.climate = 'tropical rainforest'
    } else if (latitude < 10) {
      region.climate = monsoon ? 'tropical monsoon' : 'tropical rainforest'
    } else if (latitude < 20) {
      region.climate = 'savanna'
    } else if (latitude < 30 && continent) {
      region.climate = 'hot desert'
    } else if (latitude < 35) {
      region.climate = 'hot steppe'
    } else if (latitude < 45) {
      region.climate = 'mediterranean'
    } else if (latitude < 60) {
      region.climate = 'oceanic'
    } else if (latitude < 75) {
      region.climate = 'subarctic'
    } else {
      region.climate = 'polar'
    }
  } else if (location === 'inland') {
    if (latitude < 10) {
      region.climate = 'tropical rainforest'
    } else if (latitude < 15) {
      region.climate = 'savanna'
    } else if (latitude < 30 && continent) {
      region.climate = 'hot desert'
    } else if (latitude < 40) {
      region.climate = 'hot steppe'
    } else if (latitude < 45 && continent) {
      region.climate = 'cold desert'
    } else if (latitude < 60) {
      region.climate = 'cold steppe'
    } else if (latitude < 75) {
      region.climate = 'subarctic'
    } else {
      region.climate = 'polar'
    }
  } else if (location === 'east_coast') {
    if (latitude < 5) {
      region.climate = 'tropical rainforest'
    } else if (latitude < 20) {
      region.climate = continent ? 'tropical monsoon' : 'tropical rainforest'
    } else if (latitude < 40) {
      region.climate = monsoon ? 'temperate monsoon' : 'subtropical'
    } else if (latitude < 60) {
      region.climate = monsoon ? 'manchurian' : 'laurentian'
    } else if (latitude < 75) {
      region.climate = monsoon ? 'siberian' : 'subarctic'
    } else {
      region.climate = 'polar'
    }
  }
}
