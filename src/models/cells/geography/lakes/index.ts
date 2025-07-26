import { CELL } from '../..'
import { GEOGRAPHY } from '..'
import { MergeLakeParams, RemoveLakeParams } from './types'

export const LAKES = {
  get: () => GEOGRAPHY.water().filter(cell => !cell.ocean),
  merge: ({ lakes, lake }: MergeLakeParams) => {
    const lakeCells = lakes.filter(cell => cell.landmark === lake)
    const { landmark } = lakeCells
      .map(cell => CELL.neighbors({ cell }))
      .flat()
      .find(cell => cell.landmark !== lake)
    lakeCells.forEach(cell => {
      cell.landmark = landmark
      cell.isWater = true
      cell.shallow = false
      cell.h = GEOGRAPHY.elevation.seaLevel - 0.01
    })
    delete window.world.landmarks[lake]
    window.world.landmarks[landmark].size += lakeCells.length
    return lakeCells
  },
  remove: ({ lakes, lake }: RemoveLakeParams) => {
    const lakeCells = lakes.filter(cell => cell.landmark === lake)
    const shallow = lakeCells.find(cell => cell.shallow)
    const { landmark } = CELL.neighbors({ cell: shallow }).find(cell => cell.landmark !== lake)
    lakeCells.forEach(cell => {
      cell.landmark = landmark
      cell.isWater = false
      cell.shallow = false
      cell.wasLake = true
      cell.h = GEOGRAPHY.elevation.seaLevel
      CELL.neighbors({ cell })
        .filter(n => !n.isWater)
        .forEach(n => {
          const coast = CELL.neighbors({ cell: n }).filter(p => p.isWater)
          n.isCoast = coast.length > 0
        })
    })
    delete window.world.landmarks[lake]
    window.world.landmarks[landmark].size += lakeCells.length
    return lakeCells
  }
}
