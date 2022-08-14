import { location__move_to_coast } from '../../../../regions/locations/spawn'
import { world__water_features } from '../../..'
import { cell__common_edge, cell__neighbors } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { climates } from '../../../climate/types'
import { sea_level_cutoff } from '../../../types'
import { Shaper } from '..'

const arid_climates = [
  climates.SAVANNA,
  climates.HOT_DESERT,
  climates.HOT_STEPPE,
  climates.COLD_DESERT,
  climates.COLD_STEPPE,
  climates.POLAR
]

export const remove_lake = (params: { lakes: ExteriorCell[]; lake: number }) => {
  const { lakes, lake } = params
  const lake_cells = lakes.filter(cell => cell.landmark === lake)
  const shallow = lake_cells.find(cell => cell.shallow)
  const { landmark } = cell__neighbors(shallow).find(cell => cell.landmark !== lake)
  lake_cells.forEach(cell => {
    cell.landmark = landmark
    cell.is_water = false
    cell.shallow = false
    cell.h = sea_level_cutoff
    Shaper.region_land[cell.region].push(cell)
    cell__neighbors(cell)
      .filter(n => !n.is_water)
      .forEach(n => {
        const coast = n.n.filter(p => window.world.cells[p].is_water)
        n.is_coast = coast.length > 0
      })
  })
  delete window.world.landmarks[lake]
  window.world.landmarks[landmark].size += lake_cells.length
}

const cleanup_lakes = () => {
  const lakes = Shaper.water.filter(cell => !cell.ocean)
  const shallow = lakes.filter(cell => cell.shallow)
  world__water_features()
    .filter(idx => window.world.landmarks[idx].type !== 'ocean')
    .forEach(landmark => {
      const border = shallow.filter(cell => cell.landmark === landmark)
      const arid = border.some(cell =>
        arid_climates.includes(window.world.regions[cell.region].climate)
      )
      const mountainous = border.some(cell => cell__neighbors(cell).some(n => n.is_mountains))
      if (arid || mountainous) remove_lake({ lakes, lake: landmark })
    })
  Shaper.reset('water')
  Shaper.reset('land')
}

export const regional__coastal_edges = () => {
  cleanup_lakes()
  // iterate through all coastal polygons
  window.world.cells
    .filter(p => p.is_coast)
    .forEach(p => {
      p.coastal_edges = []
      p.water_sources = new Set()
      cell__neighbors(p)
        .filter(n => n.is_water)
        .forEach(neighbor => {
          // add water source
          p.water_sources.add(neighbor.landmark)
          // mark edge as coastal
          const edge = cell__common_edge(p.idx, neighbor.idx)
          window.world.coasts.push({
            land: p.landmark,
            water: neighbor.landmark,
            edge: edge
          })
          // get coastal edge coordinates
          // add them to the coastal polygon coordinates list (used for location placement)
          p.coastal_edges.push([
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
  window.world.locations.forEach(loc => location__move_to_coast(loc))
}
