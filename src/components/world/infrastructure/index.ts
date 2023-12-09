import * as jdenticon from 'jdenticon'

import { PROVINCE } from '../../../models/regions/provinces'
import { RouteTypes, World } from '../../../models/world/types'
import { HERALDRY } from '../../codex/common/Heraldry'
import { fonts } from '../../theme/fonts'
import { MAP } from '../common'
import { DrawInfraParams } from './types'

const fontFamily = fonts.maps

const regionalPath =
  (regions: Set<number>) => (route: World['display']['routes'][RouteTypes][number]) => {
    return (
      route.provinces.some(idx => {
        const province = window.world.provinces[idx]
        return regions.has(PROVINCE.nation(province).idx)
      }) &&
      route.provinces.every(idx => {
        const province = window.world.provinces[idx]
        return !PROVINCE.nation(province).shattered
      })
    )
  }

export const DRAW_INFRASTRUCTURE = {
  provinces: ({ ctx, projection, nationSet, style }: DrawInfraParams) => {
    const scale = MAP.scale.derived(projection)
    ctx.textAlign = 'center'
    ctx.shadowColor = 'white'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    const base = 1
    ctx.lineWidth = 0.05 * scale
    const provinces = window.world.provinces
      .filter(province => nationSet.has(PROVINCE.nation(province).idx))
      .map(province => {
        const geojson = MAP.geojson.point(province.hub)
        geojson.properties = { idx: province.idx }
        return geojson
      })
    const radius = 0.2 * scale
    // capital provinces
    const capitals = provinces.filter(p =>
      PROVINCE.isCapital(window.world.provinces[p.properties.idx])
    )
    const pathGen = MAP.path.linear(projection).pointRadius(radius * 2)
    ctx.stroke(
      new Path2D(
        pathGen(
          MAP.geojson.features(
            capitals.filter(
              p => !PROVINCE.nation(window.world.provinces[p.properties.idx]).shattered
            )
          )
        )
      )
    )
    // regular provinces
    pathGen.pointRadius(radius)
    ctx.fill(
      new Path2D(
        pathGen(
          MAP.geojson.features(
            provinces.filter(
              p => !PROVINCE.nation(window.world.provinces[p.properties.idx]).shattered
            )
          )
        )
      )
    )
    const offset = 0.25 * scale
    provinces
      .filter(p => !PROVINCE.nation(window.world.provinces[p.properties.idx]).shattered)
      .forEach(province => {
        const center = pathGen.centroid(MAP.geojson.features([province]))
        const loc = window.world.provinces[province.properties.idx]
        const capital = PROVINCE.isCapital(loc)
        ctx.font = 1 * scale * base + 'px ' + fontFamily
        ctx.fillText(loc.name, center[0], center[1] - offset * (capital ? 4.5 : 4))
        ctx.font = 0.5 * scale * base + 'px ' + fontFamily
        ctx.fillText(loc.hub.type, center[0], center[1] - offset * (capital ? 2.5 : 1.5))
      })
    // region titles
    if (scale > MAP.breakpoints.regional) return
    const cultureView = style === 'Cultures'
    provinces
      .filter(province => window.world.provinces[province.properties.idx].capital)
      .forEach(capital => {
        const loc = window.world.provinces[capital.properties.idx]
        const nation = PROVINCE.nation(loc)
        const region = PROVINCE.region(loc)
        const culture = window.world.cultures[region.culture]
        const center = pathGen.centroid(MAP.geojson.features([capital]))
        const major =
          style !== 'Cultures'
            ? loc.idx === nation.capital && !nation.shattered
            : culture.origin === region.idx
        if (major) {
          ctx.font = `${(cultureView ? 8 : 5) * scale * base}px ${fontFamily}`
          ctx.fillStyle = 'black'
          ctx.fillText(
            cultureView ? culture.name : region.name,
            center[0],
            center[1] + offset * 20 * base
          )
          if (cultureView) return
          ctx.save()
          const tempCanvas = document.createElement('canvas')
          const initialSize = 100
          tempCanvas.width = initialSize
          tempCanvas.height = initialSize
          const tempCtx = tempCanvas.getContext('2d')
          const config = HERALDRY.config(nation)
          jdenticon.drawIcon(tempCtx, nation.name, initialSize, config)
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
        } else if (!cultureView) {
          ctx.font = `${4.5 * scale * base}px ${fontFamily}`
          ctx.fillStyle = 'rgba(0,0,0,0.5)'
          ctx.fillText(region.name, center[0], center[1] + offset * 18)
        }
      })
  },
  roads: ({ ctx, projection, nationSet }: Omit<DrawInfraParams, 'style'>) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.linear(projection)
    const { routes } = window.world.display
    ctx.save()
    const mod = scale > MAP.breakpoints.regional ? 0.5 : 1
    ctx.lineCap = 'square'
    let width = 0.25 * scale * mod
    let dashes = [1 * scale * mod, 1 * scale * mod]
    ctx.lineWidth = width
    ctx.setLineDash(dashes)
    const roadFilter = regionalPath(nationSet)
    // imperial roads
    ctx.strokeStyle = 'rgb(107, 27, 27, 0.8)'
    const imperial = path(
      MAP.geojson.multiline(routes.land.filter(r => r.imperial && roadFilter(r)).map(r => r.path))
    )
    ctx.stroke(new Path2D(imperial))
    // land roads
    ctx.strokeStyle = 'rgba(107, 27, 27, 0.3)'
    const land = path(
      MAP.geojson.multiline(routes.land.filter(r => !r.imperial && roadFilter(r)).map(r => r.path))
    )
    ctx.stroke(new Path2D(land))
    // sea routes
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)'
    const sea = path(MAP.geojson.multiline(routes.sea.filter(roadFilter).map(r => r.path)))
    ctx.stroke(new Path2D(sea))
    ctx.restore()
  }
}
