import { LANGUAGE } from '../../heritage/languages'
import { Cell } from '../types'
import { RIVER } from './rivers'

const _oceans: Record<number, string> = {}

const nameFeature = (cell: Cell) => {
  const province = window.world.provinces[cell.province]
  if (!province.desolate) {
    const culture = window.world.cultures[province.culture]
    return LANGUAGE.word.unique({ key: 'landmark', lang: culture.language }).word
  }
  const empire = window.dice.choice(window.world.provinces)
  const culture = window.world.cultures[empire.culture]
  return LANGUAGE.word.unique({ key: 'landmark', lang: culture.language }).word
}

export const GEOGRAPHY_NAMES = {
  landmark: (cell: Cell) => {
    const landmark = window.world.landmarks[cell.landmark]
    if (landmark.type === 'ocean') return GEOGRAPHY_NAMES.oceans(cell)
    if (!landmark.name) landmark.name = nameFeature(cell)
    const dist = (landmark.size / window.world.cells.length) * 100
    return `${landmark.name} (${landmark.type}, ${dist.toFixed(2)}%)`
  },
  oceans: (cell: Cell) => {
    const region = window.world.oceanRegions[cell.oceanRegion]
    if (_oceans[region.ocean]) return _oceans[region.ocean]
    const size = window.world.oceanRegions
      .filter(r => r.ocean === region.ocean)
      .reduce((acc, r) => acc + r.cells.length, 0)
    const dist = (size / window.world.cells.length) * 100
    _oceans[region.ocean] = `${nameFeature(cell)} (${region.type}, ${dist.toFixed(2)}%)`
    return _oceans[region.ocean]
  },
  mountains: (cell: Cell) => {
    const mountains = window.world.mountains[cell.mountain]
    if (!mountains.name) mountains.name = nameFeature(cell)
    return `${mountains.name} (mountains)`
  },
  river: (cell: Cell) => {
    const river = RIVER.parent(cell.river)
    if (!river.name) river.name = nameFeature(cell)
    return `${river.name} (river, ${RIVER.length(river.idx)})`
  },
  name: (cell: Cell) => {
    try {
      if (cell.isMountains) return GEOGRAPHY_NAMES.mountains(cell)
      if (cell.river !== undefined) return GEOGRAPHY_NAMES.river(cell)
      return GEOGRAPHY_NAMES.landmark(cell)
    } catch (e) {
      console.error(e)
      return 'unknown'
    }
  }
}
