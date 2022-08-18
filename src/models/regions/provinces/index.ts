import { point__distance } from '../../utilities/math/points'
import { decorateText } from '../../utilities/text/decoration'
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
export const province__filterNoFutureInvasions = (provinces: Province[]) =>
  provinces.filter(province => province.memory.nextInvasion.time <= window.world.date)

export const province__localNeighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.currNation === provinces.currNation)

export const province__foreignNeighbors = (provinces: Province) =>
  province__neighbors(provinces).filter(n => n.currNation !== provinces.currNation)

export const province__foreignStates = (provinces: Province[]) =>
  Array.from(
    new Set(
      provinces
        .map(t => {
          return province__foreignNeighbors(t).map(n => n.currNation)
        })
        .flat()
    )
  )

const distanceTo = (c1: Province, c2: Province) => {
  const c1Cell = province__cell(c1)
  const c2Cell = province__cell(c2)
  return point__distance({ points: [c1Cell, c2Cell] })
}

export const province__sortClosest = (provinces: Province[], dst: Province) => {
  return provinces.sort((a, b) => {
    const aDist = distanceTo(dst, a)
    const bDist = distanceTo(dst, b)
    return aDist - bDist
  })
}
export const province__findClosest = (provinces: Province[], dst: Province): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = distanceTo(dst, province)
      return d < selected.d ? { d, province: province } : selected
    },
    { d: Infinity, province: undefined }
  ).province
}
export const province__findFurthest = (provinces: Province[], dists: Province[]): Province => {
  return provinces.reduce(
    (selected, province) => {
      const d = dists.map(dst => distanceTo(dst, province)).reduce((sum, dist) => sum + dist, 0)
      return d > selected.d ? { d, province: province } : selected
    },
    { d: -Infinity, province: undefined }
  ).province
}
export const province__isCapital = (province: Province) => {
  return window.world.regions[province.currNation].capital === province.idx
}

export const province__hub = (province: Province) => window.world.locations[province.hub]
export const province__cell = (province: Province) =>
  window.world.cells[province__hub(province).cell]

export const province__decoration = (provinces: Province[]) =>
  provinces
    .sort((a, b) => province__hub(b).population - province__hub(a).population)
    .map(province => {
      const hub = province__hub(province)
      return decorateText({ link: hub, tooltip: hub.type })
    })
    .join(', ')

export const province__culture = (province: Province) => {
  const region = window.world.regions[province.region]
  const nation = window.world.regions[province.currNation]
  return { local: region, ruling: nation }
}
