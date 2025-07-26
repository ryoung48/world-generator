import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { NAVIGATION } from '../../cells/navigation'
import { Cell } from '../../cells/types'
import { PROVINCE } from '../../provinces'
import { HUB } from '../../provinces/hubs'
import { Province } from '../../provinces/types'
import { VORONOI } from '../../utilities/math/voronoi'
import { PERFORMANCE } from '../../utilities/performance'

const provinceNetworks = (params: { provinces: Province[]; filter: (_cell: Cell) => boolean }) => {
  const { provinces, filter } = params
  const assigned: Record<number, number> = {}
  const neighbors: Record<number, Set<number>> = {}
  const queue = provinces.map(PROVINCE.cell)
  queue.forEach(cell => {
    assigned[cell.idx] = cell.province
    neighbors[cell.province] = new Set()
  })
  while (queue.length) {
    const curr = queue.shift()
    const prospects = CELL.neighbors({ cell: curr }).filter(filter)
    prospects
      .filter(n => assigned[n.idx] === undefined)
      .forEach(n => {
        queue.push(n)
        assigned[n.idx] = assigned[curr.idx]
      })
    prospects
      .filter(n => assigned[n.idx] !== assigned[curr.idx])
      .forEach(n => {
        neighbors[assigned[curr.idx]].add(assigned[n.idx])
        neighbors[assigned[n.idx]].add(assigned[curr.idx])
      })
  }
  return neighbors
}

export const INFRASTRUCTURE_SHAPER = PERFORMANCE.profile.wrapper({
  label: 'INFRASTRUCTURE_SHAPER',
  o: {
    imperialRoads: () => {
      GEOGRAPHY.landmarks('land').forEach(land => {
        let hubs = window.world.provinces.filter(
          p =>
            !p.desolate &&
            PROVINCE.cell(p).landmark === land &&
            (PROVINCE.hub(p).population > 50e3 ||
              (PROVINCE.capital(p) && p.size === 'empire' && p.decentralization !== 'tribes'))
        )
        const neighbors = provinceNetworks({
          provinces: hubs,
          filter: n => n.landmark === land && !CELL.province(n).desolate
        })
        while (hubs.length > 0) {
          const start = hubs[0]
          const visited = new Set([start.idx])
          const queue = [start]
          while (queue.length > 0) {
            const curr = queue.shift()
            Array.from(neighbors[curr.idx] ?? [])
              .map(n => window.world.provinces[n])
              .filter(n => !visited.has(n.idx))
              .forEach(n => {
                visited.add(n.idx)
                queue.push(n)
              })
          }
          const network = hubs.filter(p => visited.has(p.idx))
          hubs = hubs.filter(p => !visited.has(p.idx))
          if (network.length > 1) {
            VORONOI.urquhart(network.map(p => [p.hub.x, p.hub.y])).forEach(([x, y]) => {
              const src = network[x]
              const dst = network[y]
              NAVIGATION.addRoute({ src, dst, type: 'land', imperial: true })
            })
          }
        }
      })
    },
    land: () => {
      GEOGRAPHY.landmarks('land').forEach(land => {
        let hubs = window.world.provinces.filter(
          p => !p.desolate && PROVINCE.cell(p).landmark === land && PROVINCE.hub(p).population > 1e3
        )
        const neighbors = provinceNetworks({
          provinces: hubs,
          filter: n => n.landmark === land && !CELL.province(n).desolate
        })
        while (hubs.length > 0) {
          const start = hubs[0]
          const visited = new Set([start.idx])
          const queue = [start]
          while (queue.length > 0) {
            const curr = queue.shift()
            Array.from(neighbors[curr.idx] ?? [])
              .map(n => window.world.provinces[n])
              .filter(n => !visited.has(n.idx))
              .forEach(n => {
                visited.add(n.idx)
                queue.push(n)
              })
          }
          const network = hubs.filter(p => visited.has(p.idx))
          hubs = hubs.filter(p => !visited.has(p.idx))
          if (network.length > 1) {
            VORONOI.urquhart(network.map(p => [p.hub.x, p.hub.y])).forEach(([x, y]) => {
              const src = network[x]
              const dst = network[y]
              NAVIGATION.addRoute({ src, dst, type: 'land' })
            })
          }
        }
      })
    },
    sea: () => {
      GEOGRAPHY.landmarks('water').forEach(water => {
        const landmark = window.world.landmarks[water]
        if (!['ocean', 'sea'].includes(landmark.type)) return
        const settlementFilter = 1e3
        const neighbors = provinceNetworks({
          provinces: window.world.provinces.filter(p => {
            const coast = window.world.cells[PROVINCE.hub(p).water]
            return (
              !p.desolate &&
              coast?.landmark === water &&
              (coast?.heat.max > 0 || coast?.heat.min > 0) &&
              (PROVINCE.hub(p).population > settlementFilter || PROVINCE.capital(p))
            )
          }),
          filter: n => n.landmark === water && (n.heat.max > 0 || n.heat.min > 0)
        })
        const blacklist: Record<number, Record<number, boolean>> = {}
        Object.entries(neighbors).forEach(([k, v]) => {
          const src = window.world.provinces[parseInt(k)]
          if (!blacklist[src.idx]) blacklist[src.idx] = {}
          Array.from(v).forEach(n => {
            const dst = window.world.provinces[n]
            if (PROVINCE.far(src, dst, 5)) return
            if (!blacklist[dst.idx]) blacklist[dst.idx] = {}
            if (blacklist[dst.idx][src.idx]) return
            NAVIGATION.addRoute({ src, dst, type: 'sea' })
            blacklist[dst.idx][src.idx] = true
            blacklist[src.idx][dst.idx] = true
          })
        })
      })
    },
    skyships: () => {
      window.world.skyships = []
      const provinces = window.world.provinces.filter(
        p =>
          (PROVINCE.capital(p) || PROVINCE.hub(p).population >= 50e3) &&
          (p.development > 2.5 || PROVINCE.hub(p).population > 200e3)
      )
      VORONOI.urquhart(provinces.map(p => [p.hub.x, p.hub.y])).forEach(([x, y]) => {
        const src = provinces[x]
        const dst = provinces[y]
        if (PROVINCE.far(src, dst, 5)) return
        window.world.skyships.push([src.idx, dst.idx])
      })
    },
    sites: () => {
      window.world.provinces.forEach(province => {
        const hub = PROVINCE.hub(province)
        const { development, corruption } = province
        if (HUB.isCity(hub) || PROVINCE.capital(province)) return
        if (hub.population < 1e3) {
          hub.site = window.dice.weightedChoice([
            { v: 'hub', w: 5 },
            { v: 'military outpost', w: 0 },
            { v: 'camp', w: development < 1.5 ? 5 : 0 },
            { v: 'ruins', w: development < 1.5 || corruption > 0.5 ? 5 : 0 }
          ])
        }
      })
    },
    build: () => {
      INFRASTRUCTURE_SHAPER.imperialRoads()
      INFRASTRUCTURE_SHAPER.land()
      // INFRASTRUCTURE_SHAPER.sites()
      INFRASTRUCTURE_SHAPER.sea()
      INFRASTRUCTURE_SHAPER.skyships()
    }
  }
})
