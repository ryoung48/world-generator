import { culture__regions } from '../../../npcs/cultures'
import { region__borders, region__neighbors } from '../../../regions'
import {
  province__cell,
  province__findClosest,
  province__hub,
  province__sortClosest
} from '../../../regions/provinces'
import { province__attach, province__connected } from '../../../regions/provinces/arteries'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { addTradePath, routeBlacklist, shortestPath } from '../../travel/navigation'
import { RouteTypes } from '../../travel/types'
import { Shaper } from '.'
import { DisplayShaper } from './display'

const sharedWaterSource = (c1: Province, c2: Province) => {
  const c1Cell = province__cell(c1)
  const c2Cell = province__cell(c2)
  const waterSources = Array.from(c1Cell.waterSources ?? [])
  return waterSources.some(w => c2Cell.waterSources?.has?.(w))
}

export class InfrastructureShaper extends Shaper {
  private pathing: Record<RouteTypes, number> = {
    sea: 0.00015,
    land: 0.00012
  }
  get pipeline() {
    return [
      { name: 'Land Routes', action: () => this.roads('land') },
      { name: 'Sea Routes', action: () => this.roads('sea') },
      { name: 'Network Connections', action: this.networks },
      { name: 'Island Networks', action: this.connectIslandNations },
      { name: 'Finalize Borders', action: this.finalizeBorders }
    ]
  }
  private roads(roadType: RouteTypes) {
    const { blacklist } = routeBlacklist()
    // iterate through all settlements
    window.world.provinces.forEach(src => {
      Object.keys(src.trade[roadType])
        .map(n => window.world.provinces[parseInt(n)])
        .filter(dst => src.trade[roadType][dst.idx] === -1 && !blacklist[src.idx].includes(dst.idx))
        .forEach(dst => {
          const path = shortestPath({
            type: roadType,
            start: province__hub(src).cell,
            end: province__hub(dst).cell,
            limit: this.pathing[roadType]
          })
          addTradePath(src, dst, path, blacklist, roadType)
        })
    })
  }

  private determinePathType(province: Province, closest: Province): RouteTypes {
    const sea = province__cell(province).landmark !== province__cell(closest).landmark
    return sea ? 'sea' : 'land'
  }

  private networks() {
    const { blacklist } = routeBlacklist()
    window.world.regions.forEach(r => {
      // create the main arteries that connect to the capital
      const capital = window.world.provinces[r.capital]
      province__attach(capital, capital.idx)
      // connect settlements that are not part of main arteries
      const unconnected = r.provinces
        .map(t => window.world.provinces[t])
        .filter(province => !province__connected(province))
      province__sortClosest(unconnected, capital).forEach(province => {
        // check if not previously province__connected
        if (!province__connected(province)) {
          // create a road to the closest province__connected city
          const connections = r.provinces
            .map(t => window.world.provinces[t])
            .filter(c => province__connected(c))
          let closest = province__findClosest(connections, province)
          const type = this.determinePathType(province, closest)
          // we need to pick two ports to connect islands
          if (type === 'sea') {
            const former = closest
            const waterSources = Array.from(province__cell(province).waterSources ?? [])
            const commonSea = sharedWaterSource(province, closest)
            if (!commonSea) {
              closest = province__findClosest(
                connections.filter(c => sharedWaterSource(province, c)),
                province
              )
            }
            // if two ports don't exist, connect by any means necessary
            if (waterSources.length < 1 || !closest) {
              closest = former
            }
          }
          const dist = shortestPath({
            type,
            start: province__hub(province).cell,
            end: province__hub(closest).cell,
            limit: Infinity
          })
          addTradePath(province, closest, dist, blacklist, type)
          province__attach(province, closest.idx)
        }
      })
    })
  }

  private connectRegions(r1: Region, r2: Region, blacklist: { [index: string]: number[] }) {
    const r1Capital = window.world.provinces[r1.capital]
    const r2Capital = window.world.provinces[r2.capital]
    const type = this.determinePathType(r1Capital, r2Capital)
    const sea = type === 'sea'
    const foreign = province__findClosest(
      r2.provinces.map(t => window.world.provinces[t]).filter(c => province__cell(c).beach || !sea),
      r1Capital
    )
    if (!foreign) {
      return
    }
    const guest = province__findClosest(
      r1.provinces.map(t => window.world.provinces[t]).filter(c => province__cell(c).beach || !sea),
      foreign
    )
    if (!guest) {
      return
    }
    if (!blacklist[foreign.idx].includes(guest.idx)) {
      const dist = shortestPath({
        type,
        start: province__hub(foreign).cell,
        end: province__hub(guest).cell,
        limit: Infinity
      })
      addTradePath(foreign, guest, dist, blacklist, type)
    }
  }
  private connectIslandNations() {
    const templateBlacklist = routeBlacklist().blacklist
    let blacklist = { ...templateBlacklist }
    // connect island nations
    window.world.regions.forEach(region => {
      const regionCapital = window.world.provinces[region.capital]
      const neighbors = region__neighbors(region)
      region__borders(region)
        .filter(n => !neighbors.includes(n))
        .forEach(n => {
          const nCapital = window.world.provinces[n.capital]
          const land = province__cell(regionCapital).landmark === province__cell(nCapital).landmark
          const province__connected = !land || n.landBorders.includes(region.idx)
          if (province__connected) this.connectRegions(region, n, blacklist)
        })
    })
    // connect really isolated regions if all else fails
    blacklist = { ...templateBlacklist }
    window.world.regions.forEach(region => {
      if (region__neighbors(region).length < 1) {
        const capitals = region.borders.map(r => {
          const n = window.world.regions[r]
          return window.world.provinces[n.capital]
        })
        const { nation: currNation } = province__findClosest(
          capitals,
          window.world.provinces[region.capital]
        )
        this.connectRegions(region, window.world.regions[currNation], blacklist)
      }
    })
  }
  private finalizeBorders() {
    // final relations
    window.world.regions.forEach(region => {
      region.regional.provinces = region.provinces.concat()
      region.regional.coastal = region.provinces
        .map(p => window.world.provinces[p])
        .some(province => province.ocean > 0)
    })
    DisplayShaper.drawBorders()
    window.world.display.regions = window.world.display.borders
    window.world.display.borders = {}
    // finalize cultural relations
    window.world.cultures.forEach(c => {
      c.neighbors = Array.from(
        new Set(
          culture__regions(c)
            .map(r => region__neighbors(r))
            .flat()
            .filter(r => r.culture.ruling !== c.idx)
            .map(r => r.culture.ruling)
        )
      )
    })
  }
}
