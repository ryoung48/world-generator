import { location__moveToCoast } from '../../../../regions/locations/spawn'
import { world__waterFeatures } from '../../..'
import { cell__commonEdge, cell__neighbors } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { climates } from '../../../climate/types'
import { seaLevelCutoff } from '../../../types'
import { Shaper } from '..'

export const removeLake = (params: { lakes: ExteriorCell[]; lake: number }) => {
  const { lakes, lake } = params
  const lakeCells = lakes.filter(cell => cell.landmark === lake)
  const shallow = lakeCells.find(cell => cell.shallow)
  const { landmark } = cell__neighbors(shallow).find(cell => cell.landmark !== lake)
  lakeCells.forEach(cell => {
    cell.landmark = landmark
    cell.isWater = false
    cell.shallow = false
    cell.h = seaLevelCutoff
    Shaper.regionLand[cell.region].push(cell)
    cell__neighbors(cell)
      .filter(n => !n.isWater)
      .forEach(n => {
        const coast = n.n.filter(p => window.world.cells[p].isWater)
        n.isCoast = coast.length > 0
      })
  })
  delete window.world.landmarks[lake]
  window.world.landmarks[landmark].size += lakeCells.length
}

const cleanupLakes = () => {
  const lakes = Shaper.water.filter(cell => !cell.ocean)
  const shallow = lakes.filter(cell => cell.shallow)
  world__waterFeatures()
    .filter(idx => window.world.landmarks[idx].type !== 'ocean')
    .forEach(landmark => {
      const border = shallow.filter(cell => cell.landmark === landmark)
      const arid = border.some(cell => climates[window.world.regions[cell.region].climate].arid)
      const mountainous = border.some(cell => cell__neighbors(cell).some(n => n.isMountains))
      if (arid || mountainous) removeLake({ lakes, lake: landmark })
    })
  Shaper.reset('water')
  Shaper.reset('land')
}

export const regional__coastalEdges = () => {
  cleanupLakes()
  // iterate through all coastal polygons
  window.world.cells
    .filter(p => p.isCoast)
    .forEach(p => {
      p.coastalEdges = []
      p.waterSources = new Set()
      cell__neighbors(p)
        .filter(n => n.isWater)
        .forEach(neighbor => {
          // add water source
          p.waterSources.add(neighbor.landmark)
          // mark edge as coastal
          const edge = cell__commonEdge(p.idx, neighbor.idx)
          window.world.coasts.push({
            land: p.landmark,
            water: neighbor.landmark,
            edge: edge
          })
          // get coastal edge coordinates
          // add them to the coastal polygon coordinates list (used for location placement)
          p.coastalEdges.push([
            {
              x: edge[0][0],
              y: edge[0][1]
            },
            {
              x: edge[1][0],
              y: edge[1][1]
            }
          ])
        })
    })
  // fix regional capitals
  window.world.locations.forEach(loc => location__moveToCoast(loc))
}
