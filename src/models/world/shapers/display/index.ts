import { TerrainIcon } from '../../../../components/maps/icons/terrain/types'
import { Province } from '../../../regions/provinces/types'
import { Region } from '../../../regions/types'
import { POINT } from '../../../utilities/math/points'
import { PERFORMANCE } from '../../../utilities/performance'
import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { CLIMATE } from '../../climate'
import { Climate } from '../../climate/types'
import { CoastalEdge, RouteTypes } from '../../types'
import { CURVES } from './curves'
import { Display, RegionSegment } from './types'

const drawCoasts = (params: {
  landmarks: number[]
  coastFilter: (_landmark: number) => (_edge: CoastalEdge) => boolean
}) => {
  const { landmarks, coastFilter } = params
  const coast = Object.values(window.world.coasts)
  const boundaries: { path: string; idx: number }[] = []
  const curve = CURVES.paths()
  landmarks.forEach(i => {
    // get ocean coastline edges
    const group = coast.filter(coastFilter(i)).map(e => e.edge)
    const start = group.shift()
    let [current] = start
    const [, end] = start
    // pick a random edge to start
    const ordered = [end, current]
    PERFORMANCE.profile.apply({
      label: 'ordering',
      f: () => {
        // loop until we arrive at the end
        while (group.length > 0) {
          let idx = 0
          // find the next edge in the segment
          for (let j = 0; j < group.length; j++) {
            const edge = group[j]
            // the next segment shares a vertex with the current segment
            if (POINT.sameEdge(edge[0], current) || POINT.sameEdge(edge[1], current)) {
              current = POINT.sameEdge(edge[0], current) ? edge[1] : edge[0]
              idx = j
              break
            }
          }
          // add current vertex
          ordered.push(current)
          // don't consider already visited points
          group.splice(idx, 1)
        }
      }
    })
    // add ordered path to the list of ocean paths
    boundaries.push({ path: curve(ordered), idx: i })
  })
  return boundaries
}

const roadSegment = (params: { route: RouteTypes; path: number[]; imperial: boolean }) => {
  const { route, path, imperial } = params
  if (path.length > 1) {
    const start = window.world.cells[path[0]]
    const end = window.world.cells[path[path.length - 1]]
    const points = path.map(i => {
      const cell = window.world.cells[i]
      const settlement = CELL.province(cell)
      const { hub } = settlement
      return cell.idx === hub.cell ? [hub.x, hub.y] : [cell.x, cell.y]
    }) as [number, number][]
    const curve = CURVES.paths()
    window.world.display.routes[route].push({
      d: curve(points),
      provinces: Array.from(new Set([start.province, end.province])),
      imperial
    })
  }
}

const road = (params: {
  used: Record<string, boolean>
  path: number[]
  imperial?: boolean
  route: RouteTypes
}) => {
  const { used, path, route, imperial } = params
  let [i, k] = [0, 1]
  for (let j = 0; k < path.length; j++, k++) {
    const [src, dst] = [path[j], path[k]]
    // make sure each segment is only drawn once
    if (used[[src, dst].toString()]) {
      roadSegment({ route, path: path.slice(i, k), imperial })
      i = k
    } else {
      used[[src, dst].toString()] = true
      used[[dst, src].toString()] = true
    }
  }
  roadSegment({ route, path: path.slice(i, k), imperial })
}

export const DISPLAY = PERFORMANCE.profile.wrapper({
  label: 'DISPLAY',
  o: {
    borders: {
      regions: (nations: Region[]) => {
        const regions: { path: string; r: number }[] = []
        const borders: Record<string, RegionSegment[]> = {}
        // iterate though all regions
        const borderCells = WORLD.borders()
        Object.values(nations).forEach(r => {
          borders[r.idx] = []
          // find all borders & coastline cells
          const land = borderCells.filter(cell => r.idx === CELL.nation(cell))
          CELL.boundary({
            cells: land,
            boundary: cell => cell.isWater || CELL.nation(cell) !== r.idx
          }).forEach(path => regions.push({ path, r: r.idx }))
        })
        PERFORMANCE.profile.apply({
          label: 'curve',
          f: () => {
            regions.forEach(({ path, r }) => {
              borders[r].push({ path, r })
            })
          }
        })
        return borders
      },
      provinces: (provinces: Province[]) => {
        const edges = provinces
          .map(province => {
            return CELL.bfsNeighborhood({
              start: window.world.cells[province.cell],
              spread: cell => cell.province === province.idx
            })
          })
          .flat()
        const group = new Set(edges.map(e => e.idx))
        return CELL.boundary({
          cells: edges.filter(edge => !edge.isWater),
          boundary: cell => !group.has(cell.idx) || cell.isWater
        })
      }
    },
    _icons: () => {
      const { display } = window.world
      const used = new Set<number>()
      // no icons on settlement cells
      // no icons on the coast
      // no icons on roads
      // no icons on rivers
      // 10% chance for no icon placement
      let valid = (m: Cell) =>
        window.dice.random > 0.5 &&
        (window.world.regions[m.region].shattered ||
          (!CELL.hasRoads(m) && CELL.neighbors(m).every(n => !CELL.isHub(n))))
      // mountains
      const mountains = window.world.cells.filter(p => p.isMountains)
      const volcanoes: Display['icons'][number]['type'][] = ['volcano_0', 'volcano_1', 'volcano_2']
      mountains
        .filter(m => valid(m))
        .forEach(m => {
          used.add(m.idx)
          const landmark = window.world.landmarks[m.landmark]
          const volcano = window.dice.random > (landmark.type === 'island' ? 0.75 : 0.98)
          if (m.h > 1) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(
                volcano
                  ? volcanoes
                  : [
                      'mountain_1_0_1',
                      'mountain_1_0_2',
                      'mountain_1_0_3',
                      'mountain_1_0_4',
                      'mountain_1_0_5'
                    ]
              ),
              cell: m.idx
            })
          } else if (m.h > 0.9) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(
                volcano ? volcanoes : ['mountain_1_1_1', 'mountain_1_1_2', 'mountain_1_1_3']
              ),
              cell: m.idx
            })
          } else if (m.h > 0.8) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(
                volcano
                  ? volcanoes
                  : ['mountain_1_2_1', 'mountain_1_2_2', 'mountain_1_2_3', 'mountain_1_2_4']
              ),
              cell: m.idx
            })
          } else if (m.h > 0.7) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(
                volcano
                  ? volcanoes
                  : ['mountain_1_3_1', 'mountain_1_3_2', 'mountain_1_3_3', 'mountain_1_3_4']
              ),
              cell: m.idx
            })
          } else if (m.h > 0.6) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(
                volcano
                  ? volcanoes
                  : ['mountain_1_4_1', 'mountain_1_4_2', 'mountain_1_4_3', 'mountain_1_4_4']
              ),
              cell: m.idx
            })
          } else {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice([
                'mountain_1_5_1',
                'mountain_1_5_2',
                'mountain_1_5_3',
                'mountain_1_5_4',
                'mountain_1_5_5',
                'mountain_1_5_6'
              ]),
              cell: m.idx
            })
          }
        })
      valid = m =>
        !m.isCoast &&
        (window.world.regions[m.region].shattered || !CELL.hasRoads(m)) &&
        !used.has(m.idx) &&
        window.dice.random > (window.world.regions[m.region].shattered ? 0.5 : 0.8) &&
        m.n.every(i => !used.has(i))
      // grass
      const grasslands: (keyof Climate)[] = ['savanna', 'hot steppe', 'cold steppe']
      const biomes = WORLD.land().filter(p => !p.isMountains && !p.isWater && !p.isCoast)
      const grass = biomes.filter(p => grasslands.includes(window.world.regions[p.region].climate))
      const grassIcons: Display['icons'][number]['type'][] = [
        'grass_5',
        'grass_6',
        'grass_7',
        'grass_8'
      ]
      grass.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              window.dice.random > 0.8
                ? CLIMATE.lookup[window.world.regions[m.region].climate].zone === 'tropical'
                  ? ['savanna_1', 'savanna_2', 'savanna_3', 'savanna_4']
                  : CLIMATE.lookup[window.world.regions[m.region].climate].zone === 'temperate'
                  ? ['grass_1', 'grass_2', 'grass_3', 'grass_4']
                  : grassIcons
                : grassIcons
            ),
            cell: m.idx
          })
        }
      })
      // forest
      const deciduous: (keyof Climate)[] = [
        'mediterranean',
        'subtropical',
        'temperate monsoon',
        'laurentian'
      ]
      const forestStyles: Record<number, number> = {}
      const forest = biomes.filter(p => deciduous.includes(window.world.regions[p.region].climate))
      forest.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!forestStyles[m.region]) forestStyles[m.region] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              forestStyles[m.region] === 1
                ? ['temperate_1', 'temperate_2', 'temperate_3']
                : [
                    'temperate_4',
                    'temperate_5',
                    'temperate_6',
                    'temperate_7',
                    'temperate_8',
                    'temperate_9'
                  ]
            ),
            cell: m.idx
          })
        }
      })
      // boreal
      const coniferous: (keyof Climate)[] = ['subarctic', 'oceanic', 'manchurian', 'siberian']
      const borealStyles: Record<number, number> = {}
      const boreal = biomes.filter(p => coniferous.includes(window.world.regions[p.region].climate))
      boreal.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!borealStyles[m.region]) borealStyles[m.region] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              borealStyles[m.region] === 1
                ? ['boreal_1', 'boreal_2', 'boreal_3', 'boreal_4']
                : ['boreal_5', 'boreal_6', 'boreal_7', 'boreal_8']
            ),
            cell: m.idx
          })
        }
      })
      // tropical
      const jungles: (keyof Climate)[] = ['tropical rainforest', 'tropical monsoon']
      const tropicalStyles: Record<number, number> = {}
      const tropical = biomes.filter(p => jungles.includes(window.world.regions[p.region].climate))
      tropical.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!tropicalStyles[m.region]) tropicalStyles[m.region] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice<TerrainIcon>(
              tropicalStyles[m.region] === 1
                ? ['tropical_1', 'tropical_2', 'tropical_3', 'tropical_4']
                : ['tropical_5', 'tropical_6', 'tropical_7', 'tropical_8']
            ),
            cell: m.idx
          })
        }
      })
      const freeSpace = (n: Cell) => !used.has(n.idx) && !n.isCoast && !CELL.hasRoads(n)
      // tropical hills
      tropical.forEach(m => {
        if (valid(m) && CELL.neighbors(m).every(freeSpace)) {
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice<TerrainIcon>(['tropical_20', 'tropical_21', 'tropical_22']),
            cell: m.idx
          })
        }
      })
      valid = m => !CELL.hasRoads(m) && window.dice.random > 0.8 && m.n.every(i => !used.has(i))
      // desert
      const deserts: (keyof Climate)[] = ['hot desert', 'cold desert']
      const desert = biomes.filter(p => deserts.includes(window.world.regions[p.region].climate))
      const desertIcons: TerrainIcon[] = [
        'desert_1',
        'desert_2',
        'desert_3',
        'desert_4',
        'desert_5',
        'desert_6',
        'desert_7',
        'desert_8'
      ]
      desert.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(desertIcons),
            cell: m.idx
          })
        }
      })
      // polar
      const polarClimates = ['polar']
      const polar = biomes.filter(p =>
        polarClimates.includes(window.world.regions[p.region].climate)
      )
      polar.forEach(m => {
        if (valid(m)) {
          const { latitude } = WORLD.gps(m)
          const lat = Math.abs(latitude)
          const glacier = lat > CLIMATE.glacierLatitudeCutoff
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              window.dice.weightedChoice([
                { w: 1, v: desertIcons },
                { w: glacier ? 0 : 0.3, v: grassIcons }
              ])
            ),
            cell: m.idx
          })
        }
      })
      // ships
      const seaRoutes = window.dice
        .shuffle(Object.values(window.world.routes.sea))
        .filter(
          route =>
            window.world.regions[window.world.provinces[route.src].region].development !== 'remote'
        )
      const validSeaIcon = (p: Cell) =>
        p.ocean &&
        !p.shallow &&
        !used.has(p.idx) &&
        CELL.neighbors(p, 2).every(cell => !used.has(cell.idx) && cell.ocean)
      seaRoutes.slice(0, Math.floor(seaRoutes.length * 0.05)).forEach(route => {
        const cells = route.path
          .map(p => CELL.neighbors(window.world.cells[p]))
          .flat()
          .filter(validSeaIcon)
        if (cells.length > 0) {
          const cell = window.dice.choice(cells)
          used.add(cell.idx)
          display.icons.push({
            x: cell.x,
            y: cell.y,
            type: window.dice.choice([
              'ship_1',
              'ship_3',
              'ship_4',
              'ship_5',
              'ship_6',
              'ship_14',
              'ship_15',
              'ship_16'
            ]),
            cell: cell.idx
          })
        }
      })
      // icebergs
      const polarCoast = WORLD.land()
        .filter(cell => cell.beach && window.world.regions[cell.region].climate === 'polar')
        .map(cell =>
          CELL.neighbors(cell, 3).filter(
            n =>
              n.ocean &&
              window.world.regions[n.region].climate === 'polar' &&
              !n.shallow &&
              !CELL.hasRoads(n) &&
              !used.has(n.idx) &&
              n.n.every(
                i =>
                  !used.has(i) &&
                  !CELL.hasRoads(window.world.cells[i]) &&
                  !window.world.cells[i].shallow
              )
          )
        )
        .flat()
      const validIceIcon = (p: Cell) => !used.has(p.idx) && p.n.every(i => !used.has(i))
      const line = CURVES.linear()
      window.dice.shuffle(polarCoast.slice(0, Math.floor(polarCoast.length * 0.25))).forEach(m => {
        if (validIceIcon(m)) {
          used.add(m.idx)
          window.world.display.icebergs.push({
            idx: m.idx,
            path: line(m.data)
          })
        }
      })
    },
    _islands: () => {
      // land (ocean)
      const islands = drawCoasts({
        landmarks: WORLD.features('land'),
        coastFilter: i => e => e.land === i && e.water === 1
      })
      PERFORMANCE.profile.apply({
        label: 'curve',
        f: () => {
          window.world.display.islands = islands.reduce(
            (dict: Display['islands'], { path, idx }) => {
              dict[idx] = { path, idx }
              return dict
            },
            {}
          )
        }
      })
    },
    _lakes: () => {
      // land (ocean)
      const lakes = drawCoasts({
        landmarks: WORLD.features('water').filter(i => window.world.landmarks[i].type !== 'ocean'),
        coastFilter: i => e => e.water === i
      })
      PERFORMANCE.profile.apply({
        label: 'curve',
        f: () => {
          // create ocean curve
          const lakeEdges = WORLD.water().filter(
            cell => cell.isWater && cell.shallow && !cell.ocean
          )
          window.world.display.lakes = lakes.reduce((dict: Display['lakes'], { path, idx }) => {
            dict[idx] = {
              path,
              idx,
              border: lakeEdges.some(cell => cell.landmark === idx && CELL.isNationBorder(cell))
            }
            return dict
          }, {})
        }
      })
    },
    _roads: () => {
      // used road paths
      const used: Record<string, boolean> = {}
      // iterate through each road type
      Object.entries(window.world.routes).forEach(([route, roads]) => {
        // draw each road segment
        const sorted = [...roads].sort((a, b) => (b.imperial ? 1 : 0) - (a.imperial ? 1 : 0))
        sorted.forEach(({ path, imperial }) => {
          road({ used, path, route: route as RouteTypes, imperial })
        })
      })
    },
    build: () => {
      DISPLAY._islands()
      DISPLAY._lakes()
      DISPLAY._roads()
      DISPLAY._icons()
    }
  }
})
