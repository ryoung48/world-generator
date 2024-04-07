import { LANGUAGE } from '../heritage/languages'
import { REGION } from '../regions'
import { Cell } from './types'

const nameFeature = (cell: Cell) => {
  const region = window.world.regions[cell.region]
  if (!region.desolate) {
    const culture = REGION.culture(region)
    return LANGUAGE.word.unique({ key: 'landmark', lang: culture.language })
  }
  const empire = window.world.regions.find(r => r.size === 'empire')
  const culture = REGION.culture(empire)
  return LANGUAGE.word.unique({ key: 'landmark', lang: culture.language })
}

export const GEOGRAPHY = {
  landmark: (cell: Cell) => {
    const landmark = window.world.landmarks[cell.landmark]
    if (!landmark.name) landmark.name = nameFeature(cell)
    return `${landmark.name} (${landmark.type})`
  },
  mountains: (cell: Cell) => {
    const mountains = window.world.mountains[cell.mountain]
    if (!mountains.name) mountains.name = nameFeature(cell)
    return `${mountains.name} (mountains)`
  },
  name: (cell: Cell) => {
    if (cell.isMountains) return GEOGRAPHY.mountains(cell)
    return GEOGRAPHY.landmark(cell)
  }
}
