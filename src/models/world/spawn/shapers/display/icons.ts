import { curveLinear, line, scaleLinear } from 'd3'

import { TerrainIcon } from '../../../../../components/maps/icons/terrain/types'
import { world__gps } from '../../..'
import { cell__hasRoads, cell__isHub, cell__neighbors } from '../../../cells'
import { ExteriorCell } from '../../../cells/types'
import { glacierLatitudeCutoff } from '../../../climate/terrain'
import { climateLookup, climates } from '../../../climate/types'
import { Shaper } from '..'
import { Display } from './types'

const d3Line = () => {
  const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
  const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
  return line()
    .x((d: number[]) => x(d[0]))
    .y((d: number[]) => y(d[1]))
    .curve(curveLinear)
}

export const display__icons = () => {
  const { display } = window.world
  const used = new Set<number>()
  // no icons on settlement cells
  // no icons on the coast
  // no icons on roads
  // no icons on rivers
  // 10% chance for no icon placement
  let valid = (m: ExteriorCell) =>
    window.dice.random > 0.5 && !cell__hasRoads(m) && cell__neighbors(m).every(n => !cell__isHub(n))
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
    !cell__hasRoads(m) &&
    !used.has(m.idx) &&
    window.dice.random > 0.8 &&
    m.n.every(i => !used.has(i))
  // grass
  const grasslands = [climates.SAVANNA, climates.HOT_STEPPE, climates.COLD_STEPPE]
  const biomes = Shaper.land.filter(p => !p.isMountains && !p.isWater && !p.isCoast)
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
            ? climateLookup[window.world.regions[m.region].climate].zone === 'Tropical'
              ? ['savanna_1', 'savanna_2', 'savanna_3', 'savanna_4']
              : climateLookup[window.world.regions[m.region].climate].zone === 'Temperate'
              ? ['grass_1', 'grass_2', 'grass_3', 'grass_4']
              : grassIcons
            : grassIcons
        ),
        cell: m.idx
      })
    }
  })
  // forest
  const swampIcons: TerrainIcon[] = ['swamp_1', 'swamp_2', 'swamp_3', 'swamp_4']
  const isLake = (cell: ExteriorCell) => cell.isWater && !cell.ocean
  const nearLake = (cell: ExteriorCell) =>
    cell__neighbors(cell).some(n => isLake(n) || cell__neighbors(n).some(isLake))
  const deciduous = [
    climates.MEDITERRANEAN,
    climates.SUBTROPICAL,
    climates.TEMPERATE_MONSOON,
    climates.CONTINENTAL
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
          nearLake(m)
            ? swampIcons
            : forestStyles[m.region] === 1
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
  const coniferous = [climates.SUBARCTIC, climates.OCEANIC, climates.MANCHURIAN, climates.SIBERIAN]
  const coldSwampIcons: TerrainIcon[] = ['swamp_5', 'swamp_6', 'swamp_7', 'swamp_8']
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
          nearLake(m)
            ? coldSwampIcons
            : borealStyles[m.region] === 1
            ? ['boreal_1', 'boreal_2', 'boreal_3', 'boreal_4']
            : ['boreal_5', 'boreal_6', 'boreal_7', 'boreal_8']
        ),
        cell: m.idx
      })
    }
  })
  // tropical
  const jungles = [climates.EQUATORIAL, climates.TROPICAL_MONSOON]
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
          nearLake(m)
            ? swampIcons
            : tropicalStyles[m.region] === 1
            ? ['tropical_1', 'tropical_2', 'tropical_3', 'tropical_4']
            : ['tropical_5', 'tropical_6', 'tropical_7', 'tropical_8']
        ),
        cell: m.idx
      })
    }
  })
  valid = m => !cell__hasRoads(m) && window.dice.random > 0.8 && m.n.every(i => !used.has(i))
  // desert
  const deserts = [climates.HOT_DESERT, climates.COLD_DESERT]
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
  const polarClimates = [climates.POLAR]
  const polar = biomes.filter(p => polarClimates.includes(window.world.regions[p.region].climate))
  polar.forEach(m => {
    if (valid(m)) {
      const { latitude } = world__gps(m)
      const lat = Math.abs(latitude)
      const glacier = lat > glacierLatitudeCutoff
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
  const seaRoutes = window.dice.shuffle(Object.values(window.world.routes.sea))
  const validSeaIcon = (p: ExteriorCell) =>
    p.ocean &&
    !used.has(p.idx) &&
    p.n.every(i => !used.has(i) && window.world.cells[i].isWater && !window.world.cells[i].shallow)
  seaRoutes.slice(0, Math.floor(seaRoutes.length * 0.15)).forEach(route => {
    const cells = route.path.map(p => window.world.cells[p]).filter(validSeaIcon)
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
          'ship_7',
          'ship_8',
          'ship_9',
          'ship_10',
          'ship_11',
          'ship_12',
          'ship_13',
          'ship_14',
          'ship_15',
          'ship_16'
        ]),
        cell: cell.idx
      })
    }
  })
  // icebergs
  const polarCoast = Shaper.land
    .filter(cell => cell.beach && window.world.regions[cell.region].climate === climates.POLAR)
    .map(cell =>
      cell__neighbors(cell)
        .filter(n => n.ocean)
        .map(n =>
          cell__neighbors(n)
            .map(k => cell__neighbors(k))
            .flat()
        )
        .flat()
        .filter(
          n =>
            n.ocean &&
            window.world.regions[n.region].climate === climates.POLAR &&
            !n.shallow &&
            !cell__hasRoads(n) &&
            !used.has(n.idx) &&
            n.n.every(
              i =>
                !used.has(i) &&
                !cell__hasRoads(window.world.cells[i]) &&
                !window.world.cells[i].shallow
            )
        )
    )
    .flat()
  const validIceIcon = (p: ExteriorCell) => !used.has(p.idx) && p.n.every(i => !used.has(i))
  window.dice.shuffle(polarCoast.slice(0, Math.floor(polarCoast.length * 0.25))).forEach(m => {
    if (validIceIcon(m)) {
      used.add(m.idx)
      window.world.display.icebergs.push({
        idx: m.idx,
        path: d3Line()(m.data),
        penguins: window.dice.random > 0.99
      })
    }
  })
}
