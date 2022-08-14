import { point__distance } from '../../utilities/math/points'
import { decorate_text } from '../../utilities/text/decoration'
import { Province } from './types'

export const province__neighbors = (province: Province) =>
  province.neighbors.map(n => window.world.provinces[n])

export const province__neighborhood = (province: Province) =>
  province__neighbors(province)
    .map(prov => prov.locations)
    .concat(province.locations)
    .flat()
    .map(i => window.world.locations[i])

/**
 * find provinces that do not have any future conflicts scheduled
 * @param provinces
 * @returns a list of provinces that have no scheduled battles
 */
export const province__filter_no_future_invasions = (provinces: Province[]) =>
  provinces.filter(province => province.memory.next_invasion.time <= window.world.date)

export const province__local_neighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.curr_nation === provinces.curr_nation)

export const province__foreign_neighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.curr_nation !== provinces.curr_nation)

export const province__foreign_states = (provinces: Province[]) =>
  Array.from(
    new Set(
      provinces
        .map(t => {
          return province__foreign_neighbors(t).map(n => n.curr_nation)
        })
        .flat()
    )
  )

const distance_to = (c1: Province, c2: Province) => {
  const c1_cell = province__cell(c1)
  const c2_cell = province__cell(c2)
  return point__distance({ points: [c1_cell, c2_cell] })
}

export const province__sort_closest = (provinces: Province[], dst: Province) => {
  return provinces.sort((a, b) => {
    const a_dist = distance_to(dst, a)
    const b_dist = distance_to(dst, b)
    return a_dist - b_dist
  })
}
export const province__find_closest = (provinces: Province[], dst: Province): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = distance_to(dst, province)
      return d < selected.d ? { d, province: province } : selected
    },
    { d: Infinity, province: undefined }
  ).province
}
export const province__find_furthest = (provinces: Province[], dists: Province[]): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = dists.map(dst => distance_to(dst, province)).reduce((sum, dist) => sum + dist, 0)
      return d > selected.d ? { d, province: province } : selected
    },
    { d: -Infinity, province: undefined }
  ).province
}
export const province__is_capital = (province: Province) => {
  return window.world.regions[province.curr_nation].capital === province.idx
}

export const province__hub = (province: Province) => window.world.locations[province.hub]
export const province__cell = (province: Province) =>
  window.world.cells[province__hub(province).cell]

export const decorated_provinces = (provinces: Province[]) =>
  provinces
    .sort((a, b) => province__hub(b).population - province__hub(a).population)
    .map(province => {
      const hub = province__hub(province)
      return decorate_text({ link: hub, tooltip: hub.type })
    })
    .join(', ')

export const province__culture = (province: Province) => {
  const region = window.world.regions[province.region]
  const nation = window.world.regions[province.curr_nation]
  return { local: region, ruling: nation }
}
