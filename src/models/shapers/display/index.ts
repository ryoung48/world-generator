import { TerrainIcon } from '../../../components/world/icons/terrain/types'
import { CELL } from '../../cells'
import { GEOGRAPHY } from '../../cells/geography'
import { LOCATION } from '../../cells/locations'
import { Cell } from '../../cells/types'
import { PROVINCE } from '../../provinces'
import { Province } from '../../provinces/types'
import { CoastalEdge, RouteTypes, World } from '../../types'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { Display } from './types'

const drawCoasts = (params: {
  landmarks: number[]
  coastFilter: (_landmark: number) => (_edge: CoastalEdge) => boolean
}) => {
  const { landmarks, coastFilter } = params
  const coast = Object.values(window.world.coasts)
  const boundaries: { path: [number, number][]; idx: number }[] = []
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
    boundaries.push({ path: ordered, idx: i })
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
      const province = CELL.province(cell)
      const hub = PROVINCE.hub(province)
      return cell.idx === hub.cell ? [hub.x, hub.y] : [cell.x, cell.y]
    }) as [number, number][]
    window.world.display.routes[route].push({
      path: points,
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

export const SHAPER_DISPLAY = PERFORMANCE.profile.wrapper({
  label: 'DISPLAY',
  o: {
    borders: {
      provinces: (provinces: Province[]) => {
        const edges = provinces
          .map(province => {
            return CELL.bfsNeighborhood({
              start: window.world.cells[PROVINCE.cell(province).idx],
              spread: cell => cell.province === province.idx
            })
          })
          .flat()
        const group = new Set(edges.map(e => e.idx))
        return CELL.boundary({
          cells: edges.filter(edge => !edge.isWater),
          boundary: cell => !group.has(cell.idx) || cell.isWater
        })
      },
      locations: (locations: World['locations']) => {
        const edges = locations
          .map(loc => {
            return CELL.bfsNeighborhood({
              start: window.world.cells[LOCATION.cell(loc).idx],
              spread: cell => cell.location === loc.idx
            })
          })
          .flat()
        const group = new Set(edges.map(e => e.idx))
        return CELL.boundary({
          cells: edges.filter(edge => !edge.isWater),
          boundary: cell => !group.has(cell.idx) || cell.isWater
        })
      },
      oceanic: (oceanRegions: World['oceanRegions']) => {
        const borders = oceanRegions
          .map(region => {
            return CELL.bfsNeighborhood({
              start: window.world.cells[region.cell],
              spread: cell => cell.oceanRegion === region.idx
            })
          })
          .flat()
        const group = new Set(borders)
        return CELL.boundary({
          cells: borders,
          boundary: cell => !group.has(cell)
        })
      },
      cells: (cells: World['cells']) => {
        const group = new Set(cells)
        return CELL.boundary({
          cells: cells,
          boundary: cell => !group.has(cell)
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
      let valid = (m: Cell) => window.dice.random > 0.5 && !CELL.hasRoads(m)
      // mountains
      const mountains = window.world.cells.filter(p => p.isMountains).sort((a, b) => b.h - a.h)
      mountains
        .filter(m => valid(m))
        .forEach(m => {
          used.add(m.idx)
          const usedNeighbors = CELL.neighbors({ cell: m }).some(n => used.has(n.idx))
          if (m.h > 0.9 && !usedNeighbors) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice(['mountain_1_1_1', 'mountain_1_1_2', 'mountain_1_1_3']),
              cell: m.idx
            })
          } else if (m.h > 0.8 && !usedNeighbors) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice([
                'mountain_1_2_1',
                'mountain_1_2_2',
                'mountain_1_2_3',
                'mountain_1_2_4'
              ]),
              cell: m.idx
            })
          } else if (m.h > 0.7 && !usedNeighbors) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice([
                'mountain_1_3_1',
                'mountain_1_3_2',
                'mountain_1_3_3',
                'mountain_1_3_4'
              ]),
              cell: m.idx
            })
          } else if (m.h > 0.6) {
            display.icons.push({
              x: m.x,
              y: m.y,
              type: window.dice.choice([
                'mountain_1_4_1',
                'mountain_1_4_2',
                'mountain_1_4_3',
                'mountain_1_4_4'
              ]),
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
        !CELL.hasRoads(m) &&
        !used.has(m.idx) &&
        window.dice.random > 0.8 &&
        CELL.neighbors({ cell: m }).every(i => !used.has(i.idx))
      // grass
      const grasslands: Cell['vegetation'][] = ['grasslands', 'sparse']
      const biomes = GEOGRAPHY.land().filter(p => !p.isMountains && !p.isWater && !p.isCoast)
      const grass = biomes.filter(p => grasslands.includes(p.vegetation))
      const grassIcons: Display['icons'][number]['type'][] = [
        'grass_5',
        'grass_6',
        'grass_7',
        'grass_8'
      ]
      grass.forEach(m => {
        if (valid(m)) {
          const arctic = m.climate === 'arctic' || m.climate === 'subarctic'
          const sparse = m.vegetation === 'sparse'
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.weightedChoice([
              {
                w: ['tropical', 'subtropical'].includes(m.climate) ? 0.2 : 0,
                v: window.dice.choice(['savanna_1', 'savanna_2', 'savanna_3', 'savanna_4'])
              },
              {
                w: m.climate === 'temperate' ? 0.2 : 0,
                v: window.dice.choice(['grass_1', 'grass_2', 'grass_3', 'grass_4'])
              },
              {
                w: sparse ? 0.2 : 0.1,
                v: window.dice.choice(['desert_9', 'desert_10', 'desert_11'])
              },
              { w: arctic || !sparse ? 0 : 0.1, v: 'desert_13' },
              { w: arctic || !sparse ? 0 : 0.1, v: 'desert_14' },
              { w: 0.8, v: window.dice.choice(grassIcons) }
            ]),
            cell: m.idx
          })
        }
      })
      // forest
      const forestStyles: Record<number, number> = {}
      const forest = biomes.filter(
        p =>
          (p.vegetation === 'forest' || p.vegetation === 'woods') &&
          ['tropical', 'subtropical', 'temperate'].includes(p.climate)
      )
      forest.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!forestStyles[m.province]) forestStyles[m.province] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              forestStyles[m.province] === 1
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
      const borealStyles: Record<number, number> = {}
      const boreal = biomes.filter(
        p =>
          (p.vegetation === 'forest' || p.vegetation === 'woods') &&
          (p.climate === 'boreal' || p.climate === 'temperate')
      )
      boreal.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!borealStyles[m.province]) borealStyles[m.province] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice(
              borealStyles[m.province] === 1
                ? ['boreal_1', 'boreal_2', 'boreal_3', 'boreal_4']
                : ['boreal_5', 'boreal_6', 'boreal_7', 'boreal_8']
            ),
            cell: m.idx
          })
        }
      })
      // tropical
      const tropicalStyles: Record<number, number> = {}
      const tropical = biomes.filter(
        p =>
          (p.vegetation === 'forest' || p.vegetation === 'jungle') &&
          ['tropical', 'subtropical'].includes(p.climate)
      )
      tropical.forEach(m => {
        if (valid(m)) {
          used.add(m.idx)
          if (!tropicalStyles[m.province]) tropicalStyles[m.province] = window.dice.choice([1, 2])
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice<TerrainIcon>(
              tropicalStyles[m.province] === 1
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
        if (valid(m) && CELL.neighbors({ cell: m }).every(freeSpace)) {
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.choice<TerrainIcon>(['tropical_20', 'tropical_21', 'tropical_22']),
            cell: m.idx
          })
        }
      })
      valid = m =>
        !CELL.hasRoads(m) &&
        window.dice.random > 0.8 &&
        CELL.neighbors({ cell: m }).every(i => !used.has(i.idx))
      // desert
      const desert = biomes.filter(p => p.vegetation === 'desert')
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
          const arctic = m.climate === 'arctic' || m.climate === 'subarctic'
          used.add(m.idx)
          display.icons.push({
            x: m.x,
            y: m.y,
            type: window.dice.weightedChoice([
              { w: 8, v: window.dice.choice(desertIcons) },
              { w: 1, v: 'desert_9' },
              { w: 1, v: 'desert_10' },
              { w: 1, v: 'desert_11' },
              { w: 0.1, v: 'desert_12' },
              { w: arctic ? 0 : 1, v: 'desert_13' },
              { w: arctic ? 0 : 1, v: 'desert_14' }
            ]),
            cell: m.idx
          })
        }
      })
      // arctic
      const arcticClimates: Cell['climate'][] = ['arctic', 'subarctic']
      const arctic = biomes.filter(p => arcticClimates.includes(p.climate))
      arctic.forEach(m => {
        if (valid(m)) {
          const glacier = m.vegetation === 'desert'
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
        .filter(route => Math.abs(PROVINCE.cell(window.world.provinces[route.src]).y) < 70)
      const validSeaIcon = (p: Cell) =>
        p.ocean &&
        !p.shallow &&
        !used.has(p.idx) &&
        CELL.neighbors({ cell: p, depth: 2 }).every(cell => !used.has(cell.idx) && cell.ocean)
      const scale = 1 / window.world.scale
      seaRoutes.slice(0, Math.floor(seaRoutes.length * 0.25 * scale)).forEach(route => {
        const cells = route.path
          .map(p => CELL.neighbors({ cell: window.world.cells[p] }))
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
              'ship_15',
              'ship_16'
            ]),
            cell: cell.idx
          })
        }
      })
    },
    _islands: () => {
      // land (ocean)
      const islands = drawCoasts({
        landmarks: GEOGRAPHY.landmarks('land'),
        coastFilter: i => e => e.land === i && window.world.landmarks[e.water].type === 'ocean'
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
        landmarks: GEOGRAPHY.landmarks('water').filter(
          i => window.world.landmarks[i].type !== 'ocean'
        ),
        coastFilter: i => e => e.water === i
      })
      PERFORMANCE.profile.apply({
        label: 'curve',
        f: () => {
          // create ocean curve
          const lakeEdges = GEOGRAPHY.water().filter(
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
      SHAPER_DISPLAY._islands()
      SHAPER_DISPLAY._lakes()
      SHAPER_DISPLAY._roads()
      SHAPER_DISPLAY._icons()
    }
  }
})
