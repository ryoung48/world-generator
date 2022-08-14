import PriorityQueue from 'js-priority-queue'

import { culture__regions } from '../../../npcs/species/humanoids/cultures'
import { region__borders, region__neighbors } from '../../../regions'
import {
  province__cell,
  province__find_closest,
  province__hub,
  province__sort_closest
} from '../../../regions/provinces'
import { province__attach, province__connected } from '../../../regions/provinces/arteries'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { add_trade_path, route_blacklist, shortest_path } from '../../travel/navigation'
import { route_types } from '../../travel/types'
import { Shaper } from '.'
import { DisplayShaper } from './display'

const shared_water_source = (c1: Province, c2: Province) => {
  const c1_cell = province__cell(c1)
  const c2_cell = province__cell(c2)
  const water_sources = Array.from(c1_cell.water_sources ?? [])
  return water_sources.some(w => c2_cell.water_sources?.has?.(w))
}

const imperial_route = (params: { ref: Province; targets: Province[] }) => {
  const { ref, targets } = params
  const result: Record<number, number[]> = {}
  const queue = new PriorityQueue({
    comparator: (
      a: { n: Province; path: number[]; dist: number },
      b: { n: Province; path: number[]; dist: number }
    ) => a.dist - b.dist
  })
  queue.queue({ n: ref, path: [ref.idx], dist: 0 })
  const visited = new Set([ref.idx])
  const target_lookup = new Set(targets.map(target => target.idx))
  while (queue.length > 0 && Object.keys(result).length < targets.length) {
    const { n, dist, path } = queue.dequeue()
    Object.entries(n.trade.land)
      .map(([k, v]) => [parseInt(k), v])
      .filter(([k]) => !visited.has(k))
      .forEach(([k, v]) => {
        visited.add(k)
        const updated_path = [...path, k]
        if (target_lookup.has(k)) result[k] = updated_path
        queue.queue({
          n: window.world.provinces[k],
          path: updated_path,
          dist: dist + window.world.routes.land[v].path.length
        })
      })
  }
  return result
}

export class InfrastructureShaper extends Shaper {
  private pathing: Record<route_types, number> = {
    sea: 0.00015,
    land: 0.00012
  }
  get pipeline() {
    return [
      { name: 'Land Routes', action: () => this.roads('land') },
      { name: 'Sea Routes', action: () => this.roads('sea') },
      { name: 'Network Connections', action: this.networks },
      { name: 'Island Networks', action: this.connect_island_nations },
      { name: 'Finalize Borders', action: this.finalize_borders }
    ]
  }
  private roads(road_type: route_types) {
    const { blacklist } = route_blacklist()
    // iterate through all settlements
    window.world.provinces.forEach(src => {
      Object.keys(src.trade[road_type])
        .map(n => window.world.provinces[parseInt(n)])
        .filter(
          dst => src.trade[road_type][dst.idx] === -1 && !blacklist[src.idx].includes(dst.idx)
        )
        .forEach(dst => {
          const path = shortest_path({
            type: road_type,
            start: province__hub(src).cell,
            end: province__hub(dst).cell,
            limit: this.pathing[road_type]
          })
          add_trade_path(src, dst, path, blacklist, road_type)
        })
    })
  }

  private determine_path_type(province: Province, closest: Province): route_types {
    const sea = province__cell(province).landmark !== province__cell(closest).landmark
    return sea ? 'sea' : 'land'
  }

  private networks() {
    const { blacklist } = route_blacklist()
    window.world.regions.forEach(r => {
      // create the main arteries that connect to the capital
      const capital = window.world.provinces[r.capital]
      province__attach(capital, capital.idx)
      // connect settlements that are not part of main arteries
      const unconnected = r.provinces
        .map(t => window.world.provinces[t])
        .filter(province => !province__connected(province))
      province__sort_closest(unconnected, capital).forEach(province => {
        // check if not previously province__connected
        if (!province__connected(province)) {
          // create a road to the closest province__connected city
          const connections = r.provinces
            .map(t => window.world.provinces[t])
            .filter(c => province__connected(c))
          let closest = province__find_closest(connections, province)
          const type = this.determine_path_type(province, closest)
          // we need to pick two ports to connect islands
          if (type === 'sea') {
            const former = closest
            const water_sources = Array.from(province__cell(province).water_sources ?? [])
            const common_sea = shared_water_source(province, closest)
            if (!common_sea) {
              closest = province__find_closest(
                connections.filter(c => shared_water_source(province, c)),
                province
              )
            }
            // if two ports don't exist, connect by any means necessary
            if (water_sources.length < 1 || !closest) {
              closest = former
            }
          }
          const dist = shortest_path({
            type,
            start: province__hub(province).cell,
            end: province__hub(closest).cell,
            limit: Infinity
          })
          add_trade_path(province, closest, dist, blacklist, type)
          province__attach(province, closest.idx)
        }
      })
    })
  }

  private connect_regions(r1: Region, r2: Region, blacklist: { [index: string]: number[] }) {
    const r1_capital = window.world.provinces[r1.capital]
    const r2_capital = window.world.provinces[r2.capital]
    const type = this.determine_path_type(r1_capital, r2_capital)
    const sea = type === 'sea'
    const foreign = province__find_closest(
      r2.provinces.map(t => window.world.provinces[t]).filter(c => province__cell(c).beach || !sea),
      r1_capital
    )
    if (!foreign) {
      return
    }
    const guest = province__find_closest(
      r1.provinces.map(t => window.world.provinces[t]).filter(c => province__cell(c).beach || !sea),
      foreign
    )
    if (!guest) {
      return
    }
    if (!blacklist[foreign.idx].includes(guest.idx)) {
      const dist = shortest_path({
        type,
        start: province__hub(foreign).cell,
        end: province__hub(guest).cell,
        limit: Infinity
      })
      add_trade_path(foreign, guest, dist, blacklist, type)
    }
  }
  private connect_island_nations() {
    const template_blacklist = route_blacklist().blacklist
    let blacklist = { ...template_blacklist }
    // connect island nations
    window.world.regions.forEach(region => {
      const region_capital = window.world.provinces[region.capital]
      const neighbors = region__neighbors(region)
      region__borders(region)
        .filter(n => !neighbors.includes(n.idx))
        .forEach(n => {
          const n_capital = window.world.provinces[n.capital]
          const land =
            province__cell(region_capital).landmark === province__cell(n_capital).landmark
          const province__connected = !land || n.land_borders.includes(region.idx)
          if (province__connected) this.connect_regions(region, n, blacklist)
        })
    })
    // connect really isolated regions if all else fails
    blacklist = { ...template_blacklist }
    window.world.regions.forEach(region => {
      if (region__neighbors(region).length < 1) {
        const capitals = region.borders.map(r => {
          const n = window.world.regions[r]
          return window.world.provinces[n.capital]
        })
        const { curr_nation } = province__find_closest(
          capitals,
          window.world.provinces[region.capital]
        )
        this.connect_regions(region, window.world.regions[curr_nation], blacklist)
      }
    })
  }
  private finalize_borders() {
    // final relations
    window.world.regions.forEach(region => {
      region.regional.provinces = region.provinces.concat()
      region.regional.coastal = region.provinces
        .map(p => window.world.provinces[p])
        .some(province => province.ocean > 0)
    })
    DisplayShaper.draw_borders()
    window.world.display.regions = window.world.display.borders
    window.world.display.borders = {}
    window.world.regions.forEach(region => {
      region.borders_changed = true
    })
    // finalize cultural relations
    window.world.cultures.forEach(c => {
      c.neighbors = Array.from(
        new Set(
          culture__regions(c)
            .map(r => region__neighbors(r).map(b => window.world.regions[b]))
            .flat()
            .filter(r => r.culture.ruling !== c.idx)
            .map(r => r.culture.ruling)
        )
      )
    })
  }
  private imperial_roads() {
    const cache: Record<number, Record<number, boolean>> = {}
    window.world.regions.forEach(region => {
      const ref = window.world.provinces[region.capital]
      const targets = region.land_borders
        .map(i => {
          const border = window.world.regions[i]
          return window.world.provinces[border.capital]
        })
        .filter(target => !cache[ref.idx]?.[target.idx])
      targets.forEach(target => {
        if (!cache[ref.idx]) cache[ref.idx] = {}
        cache[ref.idx][target.idx] = true
        if (!cache[target.idx]) cache[target.idx] = {}
        cache[target.idx][ref.idx] = true
      })
      Object.values(imperial_route({ ref, targets })).forEach(path => {
        path.slice(1).forEach((p, i) => {
          const src = window.world.provinces[p]
          const dst = window.world.provinces[path[i]]
          const road = src.trade.land[dst.idx]
          window.world.routes.land[road].imperial = true
        })
      })
    })
  }
}
