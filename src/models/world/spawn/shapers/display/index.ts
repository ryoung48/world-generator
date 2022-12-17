import { profile } from '../../../../utilities/performance'
import { cell__isNationBorder, cell__nation, cells__boundary } from '../../../cells'
import { Shaper } from '..'
import { display__coastCurve, display__coasts, display__lakes } from './coasts'
import { display__icons } from './icons'
import { display__roads } from './roads'
import { RegionSegment } from './types'

export class DisplayShaper extends Shaper {
  // Smooth region borders
  public static drawBorders() {
    const regions: { path: [number, number][]; r: number }[] = []
    const border = Shaper.land.filter(p => cell__isNationBorder(p) || p.isCoast)
    const borders: Record<string, RegionSegment[]> = {}
    // iterate though all regions
    Object.values(window.world.regions).forEach(r => {
      borders[r.idx] = []
      // find all borders & coastline cells
      const land = border.filter(cell => r.idx === cell__nation(cell))
      cells__boundary({
        cells: land,
        boundary: cell => cell.isWater || cell__nation(cell) !== r.idx
      }).forEach(path => regions.push({ path, r: r.idx }))
    })
    profile({
      label: 'curve',
      f: () => {
        // create border curve
        regions.forEach(({ path, r }) => {
          borders[r].push({
            d: display__coastCurve()(path),
            r
          })
        })
        const old = window.world.display.borders
        window.world.display.borders = { ...old, ...borders }
      }
    })
  }
  get pipeline() {
    return [
      { name: 'Draw Coast', action: () => display__coasts() },
      { name: 'Draw Lakes', action: () => display__lakes() },
      { name: 'Region Borders', action: DisplayShaper.drawBorders },
      { name: 'Draw Roads', action: () => display__roads() },
      { name: 'Draw Icons', action: () => display__icons() }
    ]
  }
}
