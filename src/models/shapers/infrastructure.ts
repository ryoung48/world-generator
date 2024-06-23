import { WORLD } from '..'
import { CELL } from '../cells'
import { NAVIGATION } from '../cells/navigation'
import { REGION } from '../regions'
import { PROVINCE } from '../regions/provinces'
import { Province } from '../regions/provinces/types'
import { Region } from '../regions/types'
import { RouteTypes } from '../types'
import { PERFORMANCE } from '../utilities/performance'
import { SHAPER_DISPLAY } from './display'

const pathing: Record<RouteTypes, number> = {
  sea: 0.00015,
  land: 0.00012
}

function determinePathType(province: Province, closest: Province): RouteTypes {
  const sea = PROVINCE.cell(province).landmark !== PROVINCE.cell(closest).landmark
  return sea ? 'sea' : 'land'
}

function connectRegions(r1: Region, r2: Region, blacklist: { [index: string]: number[] }) {
  const r1Capital = window.world.provinces[r1.capital]
  const r2Capital = window.world.provinces[r2.capital]
  const type = determinePathType(r1Capital, r2Capital)
  const sea = type === 'sea'
  const foreign = PROVINCE.find({
    group: REGION.provinces(r2).filter(c => PROVINCE.cell(c).beach || !sea),
    ref: r1Capital,
    type: 'closest'
  })
  if (!foreign) {
    return
  }
  const guest = PROVINCE.find({
    group: REGION.provinces(r1).filter(c => PROVINCE.cell(c).beach || !sea),
    ref: foreign,
    type: 'closest'
  })
  if (!guest) {
    return
  }
  if (!blacklist[foreign.idx].includes(guest.idx))
    NAVIGATION.addTradeRoute({ src: foreign, dst: guest, blacklist, type })
}

export const SHAPER_INFRASTRUCTURE = PERFORMANCE.profile.wrapper({
  label: 'INFRASTRUCTURE',
  o: {
    _connectIslands: () => {
      const templateBlacklist = NAVIGATION.blacklist.blacklist
      let blacklist = { ...templateBlacklist }
      // connect island nations
      REGION.nations.forEach(region => {
        const regionCapital = window.world.provinces[region.capital]
        const neighbors = REGION.neighbors({ region })
        REGION.borders(region)
          .filter(n => !n.desolate && !neighbors.includes(n))
          .forEach(n => {
            const nCapital = window.world.provinces[n.capital]
            const land = PROVINCE.cell(regionCapital).landmark === PROVINCE.cell(nCapital).landmark
            const provinceConnected = !land || n.landBorders.includes(region.idx)
            if (provinceConnected) connectRegions(region, n, blacklist)
          })
      })
      // connect really isolated regions if all else fails
      blacklist = { ...templateBlacklist }
      REGION.nations.forEach(region => {
        if (REGION.neighbors({ region }).length < 1) {
          const capitals = REGION.borders(region).map(REGION.capital)
          if (capitals.length < 1) return
          const province = PROVINCE.find({
            group: capitals,
            ref: window.world.provinces[region.capital],
            type: 'closest'
          })
          const nation = PROVINCE.nation(province)
          connectRegions(region, nation, blacklist)
        }
      })
    },
    _extendedVoyages: () => {
      // iterate through all water bodies
      const allPorts = window.world.provinces
        .filter(province => PROVINCE.coastal(province) && !PROVINCE.region(province).desolate)
        .map(province => window.world.cells[province.hub.cell])
      const { blacklist } = NAVIGATION.blacklist
      WORLD.features('water').forEach(i => {
        // get all ports on the water body
        const ports = allPorts.filter(poly => {
          return CELL.neighbors(poly)
            .filter(n => n.isWater)
            .some(n => n.landmark === i)
        })
        if (ports.length > 1) {
          const potential = new Set(ports.map(p => p.province))
          for (const start of ports) {
            const src = window.world.provinces[start.province]
            // find all nearby ports
            PROVINCE.neighbors({ province: src })
              .map(province =>
                PROVINCE.neighbors({ province })
                  .filter(n => potential.has(n.idx) && n.idx !== start.province)
                  .concat(province)
              )
              .flat()
              .map(province =>
                PROVINCE.neighbors({ province })
                  .filter(n => potential.has(n.idx) && n.idx !== start.province)
                  .concat(province)
              )
              .flat()
              .map(n => PROVINCE.cell(n))
              .forEach(city => {
                // generate ocean routes between nearby ports
                const dst = window.world.provinces[city.province]
                if (!src.trade.sea[dst.idx] && !blacklist[src.idx].includes(dst.idx)) {
                  NAVIGATION.addTradeRoute({ src, dst, limit: pathing.sea, blacklist, type: 'sea' })
                }
              })
          }
        }
      })
    },
    _finalize: () => {
      // final relations
      REGION.nations.forEach(region => {
        const provinces = REGION.provinces(region)
        region.regional.provinces = provinces.map(r => r.idx)
        region.regional.coastal = provinces.some(province => province.ocean > 0)
      })
      window.world.display.regions = SHAPER_DISPLAY.borders.regions(window.world.regions)
    },
    _networks: () => {
      const { blacklist } = NAVIGATION.blacklist
      REGION.nations.forEach(r => {
        // create the main arteries that connect to the capital
        const capital = window.world.provinces[r.capital]
        PROVINCE.attach({ province: capital, idx: capital.idx })
        // connect settlements that are not part of main arteries
        const unconnected = REGION.provinces(r).filter(province => !PROVINCE.connected(province))
        PROVINCE.sort({ group: unconnected, ref: capital, type: 'closest' }).forEach(province => {
          // check if not previously PROVINCE.connected
          if (!PROVINCE.connected(province)) {
            // create a road to the closest PROVINCE.connected city
            const connections = REGION.provinces(r).filter(c => PROVINCE.connected(c))
            let closest = PROVINCE.find({
              group: connections,
              ref: province,
              type: 'closest'
            })
            const type = determinePathType(province, closest)
            // we need to pick two ports to connect islands
            if (type === 'sea') {
              const former = closest
              const waterSources = Array.from(PROVINCE.cell(province).waterSources ?? [])
              const commonSea = PROVINCE.sharedWaterSource(province, closest)
              if (!commonSea) {
                closest = PROVINCE.find({
                  group: connections.filter(c => PROVINCE.sharedWaterSource(province, c)),
                  ref: province,
                  type: 'closest'
                })
              }
              // if two ports don't exist, connect by any means necessary
              if (waterSources.length < 1 || !closest) {
                closest = former
              }
            }
            NAVIGATION.addTradeRoute({ src: province, dst: closest, blacklist, type })
            PROVINCE.attach({ province, idx: closest.idx })
          }
        })
      })
    },
    _roads: (roadType: RouteTypes) => {
      const { blacklist } = NAVIGATION.blacklist
      // iterate through all settlements
      window.world.provinces.forEach(src => {
        Object.keys(src.trade[roadType])
          .map(n => window.world.provinces[parseInt(n)])
          .filter(
            dst => src.trade[roadType][dst.idx] === -1 && !blacklist[src.idx].includes(dst.idx)
          )
          .forEach(dst => {
            NAVIGATION.addTradeRoute({
              src,
              dst,
              limit: pathing[roadType],
              blacklist,
              type: roadType
            })
          })
      })
    },
    build: () => {
      SHAPER_INFRASTRUCTURE._roads('land')
      SHAPER_INFRASTRUCTURE._roads('sea')
      SHAPER_INFRASTRUCTURE._extendedVoyages()
      SHAPER_INFRASTRUCTURE._networks()
      SHAPER_INFRASTRUCTURE._connectIslands()
      SHAPER_INFRASTRUCTURE._finalize()
    }
  }
})
