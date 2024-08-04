import * as turf from '@turf/turf'
import * as jdenticon from 'jdenticon'

import { CELL } from '../../../models/cells'
import { PROVINCE } from '../../../models/regions/provinces'
import { Wilderness } from '../../../models/regions/sites/wilderness/types'
import { Region } from '../../../models/regions/types'
import { fonts } from '../../theme/fonts'
import { MAP_SHAPES } from '../shapes'
import { HERALDRY } from '../shapes/heraldry'
import { DrawInfraParams } from './types'

const fontFamily = fonts.maps

const _heraldry: Record<number, HTMLCanvasElement> = {}

const drawHeraldry = (nation: Region) => {
  if (!_heraldry[nation.idx]) {
    const tempCanvas = document.createElement('canvas')
    const initialSize = 100
    tempCanvas.width = initialSize
    tempCanvas.height = initialSize
    const tempCtx = tempCanvas.getContext('2d')
    const config = HERALDRY.config(nation)
    jdenticon.drawIcon(tempCtx, nation.name, initialSize, config)
    _heraldry[nation.idx] = tempCanvas
  }
  return _heraldry[nation.idx]
}

export const DRAW_INFRASTRUCTURE = {
  provinces: ({ ctx, projection, nationSet, place }: DrawInfraParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    ctx.textAlign = 'center'
    ctx.shadowColor = 'white'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    const base = 1
    ctx.lineWidth = 0.05 * scale
    const provinces = window.world.provinces.map(province => {
      const hub = PROVINCE.hub(province)
      const geojson = turf.point([hub.x, hub.y])
      geojson.properties = { idx: province.idx }
      return geojson
    })
    const radius = 0.2 * scale
    const pathGen = MAP_SHAPES.path.linear(projection).pointRadius(radius * 2)
    const offset = 0.25 * scale
    if (scale > MAP_SHAPES.breakpoints.global) {
      provinces
        .filter(p => !PROVINCE.nation(window.world.provinces[p.properties.idx]).desolate)
        .forEach(province => {
          const loc = window.world.provinces[province.properties.idx]
          if (nationSet.has(PROVINCE.nation(loc).idx)) {
            const capital = PROVINCE.isCapital(loc)
            const center = pathGen.centroid(province)
            const hub = PROVINCE.hub(loc)
            if (place === hub) {
              MAP_SHAPES.highlight({
                ctx,
                point: { x: center[0], y: center[1] },
                scale: scale * 0.3,
                color: '255,255,255',
                opacity: 1
              })
            }
            const radius = MAP_SHAPES.settlement({
              ctx,
              point: { x: center[0], y: center[1] },
              scale,
              capital,
              population: hub.population
            })
            const city = hub.population > 10e3
            const rural = hub.population < 1e3
            ctx.fillStyle = 'black'
            ctx.font = (city ? 1.5 : rural ? 0.8 : 1.0) * scale * base + 'px ' + fontFamily
            ctx.fillText(
              hub.name,
              center[0],
              center[1] - radius - offset * (city ? 2.5 : rural ? 1.2 : 1.5)
            )
          }
        })
    }
    // region titles
    if (scale > MAP_SHAPES.breakpoints.regional) return
    provinces
      .filter(province => window.world.provinces[province.properties.idx].capital)
      .forEach(capital => {
        const loc = window.world.provinces[capital.properties.idx]
        const nation = PROVINCE.nation(loc)
        const region = PROVINCE.region(loc)
        const center = pathGen.centroid(capital)
        const major = loc.idx === nation.capital && !nation.desolate
        if (major) {
          ctx.font = `${5 * scale * base}px ${fontFamily}`
          ctx.fillStyle = 'black'
          ctx.fillText(region.name, center[0], center[1] + offset * 20 * base)
          ctx.save()
          const tempCanvas = drawHeraldry(nation)
          const config = HERALDRY.config(nation)
          const backColor = config?.backColor ?? '#ffffff'
          const iconSize = 3 * scale * base
          HERALDRY.draw({
            ctx,
            x: center[0] - 1.25 * scale * base,
            y: center[1] + 6.5 * scale * base,
            h: iconSize + 2 * scale * base,
            w: iconSize + 0.5 * scale * base,
            borderWidth: 0.2 * scale * base,
            backColor
          })
          // Copy the identicon from the temporary canvas to the main canvas at the new size
          ctx.drawImage(
            tempCanvas,
            center[0] - 1 * scale * base,
            center[1] + 7 * scale * base,
            iconSize,
            iconSize
          )
          ctx.restore()
        } else if (!nation.desolate) {
          ctx.font = `${4.5 * scale * base}px ${fontFamily}`
          ctx.fillStyle = 'rgba(0,0,0,0.5)'
          ctx.fillText(region.name, center[0], center[1] + offset * 18)
        }
      })
  },
  places: ({ ctx, projection, nationSet, place }: Omit<DrawInfraParams, 'style'>) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    if (scale <= MAP_SHAPES.breakpoints.global) return
    ctx.textAlign = 'center'
    ctx.shadowColor = 'white'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    const mod = 0.5
    ctx.lineWidth = 0.05 * scale * mod
    const places = window.world.provinces
      .filter(province => nationSet.has(PROVINCE.nation(province).idx))
      .map(province =>
        province.sites.slice(1).map(site => {
          const cell = window.world.cells[site.cell]
          const geojson = turf.point([site.x, site.y])
          const province = CELL.province(cell)
          geojson.properties = { idx: site.idx, province: province.idx }
          return geojson
        })
      )
      .flat()
    const pathGen = MAP_SHAPES.path.linear(projection)
    const offset = 0.4 * scale
    const base = 1.2 * mod
    places.forEach(_place => {
      const center = pathGen.centroid(_place)
      const province = window.world.provinces[_place.properties.province]
      const loc = province.sites[_place.properties.idx] as Wilderness
      if (place === loc) {
        MAP_SHAPES.highlight({
          ctx,
          point: { x: center[0], y: center[1] },
          scale: scale * 0.3,
          color: '255,255,255',
          opacity: 1
        })
      }
      if (loc.type === 'ruin') {
        MAP_SHAPES.ruins({ point: { x: center[0], y: center[1] }, scale: scale * 2, ctx })
      } else if (loc.type === 'wilderness') {
        MAP_SHAPES.wilderness({ point: { x: center[0], y: center[1] }, scale: scale * 2, ctx })
      }
      ctx.fillStyle = 'black'
      ctx.font = scale * base + 'px ' + fontFamily
      ctx.fillText(loc.name ?? 'Point', center[0], center[1] - offset * 2.2 * mod)
    })
  },
  roads: ({ ctx, projection }: Omit<DrawInfraParams, 'style' | 'place'>) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.curve(projection)
    const { routes } = window.world.display
    ctx.save()
    const mod = scale > MAP_SHAPES.breakpoints.regional ? 0.5 : 1
    ctx.lineCap = 'butt'
    let width = 0.25 * scale * mod
    let dashes = [1 * scale * mod, 0.5 * scale * mod]
    ctx.lineWidth = width
    ctx.setLineDash(dashes)
    // imperial roads
    ctx.strokeStyle = MAP_SHAPES.color.routes.land(0.8)
    const imperial = path(
      turf.multiLineString(routes.land.filter(r => r.imperial).map(r => r.path))
    )
    ctx.stroke(new Path2D(imperial))
    // land roads
    ctx.strokeStyle = MAP_SHAPES.color.routes.land(0.3)
    const land = path(turf.multiLineString(routes.land.filter(r => !r.imperial).map(r => r.path)))
    ctx.stroke(new Path2D(land))
    // sea routes
    ctx.strokeStyle = MAP_SHAPES.color.routes.sea(0.5)
    const sea = path(turf.multiLineString(routes.sea.map(r => r.path)))
    ctx.stroke(new Path2D(sea))
    ctx.restore()
  }
}
