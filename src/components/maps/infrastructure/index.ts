import * as jdenticon from 'jdenticon'

import { PROVINCE } from '../../../models/regions/provinces'
import { Hub } from '../../../models/regions/provinces/hubs/types'
import { RouteTypes, World } from '../../../models/world/types'
import { HERALDRY } from '../../codex/common/Heraldry'
import { fonts } from '../../theme/fonts'
import { MAP } from '../common'
import { DrawInfraParams } from './types'

const fontFamily = fonts.maps
const baseFontSize = () => MAP.height / 2000

const regionalPath =
  (regions: Set<number>) => (route: World['display']['routes'][RouteTypes][number]) => {
    return route.provinces.some(idx => {
      const province = window.world.provinces[idx]
      return regions.has(PROVINCE.nation(province).idx)
    })
  }

const locHighlight = (params: {
  loc: Hub
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}) => {
  const { loc: point, ctx, scale, color } = params
  const fontSize = baseFontSize()
  const radius = fontSize * (scale > MAP.breakpoints.regional ? 0.2 : 0.3)
  ctx.save()
  const gradient = ctx.createRadialGradient(point.x, point.y, radius, point.x, point.y, radius * 10)
  gradient.addColorStop(0, `rgba(${color}, 0.4)`)
  gradient.addColorStop(0.9, `rgba(${color}, 0)`)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()
}

export const map__drawAvatarLocation = (params: {
  ctx: CanvasRenderingContext2D
  loc: Hub
  scale: number
}) => {
  locHighlight({ ...params, color: '0, 0, 255' })
}

export const DRAW_INFRASTRUCTURE = {
  provinces: ({ ctx, projection, nationSet }: DrawInfraParams) => {
    const scale = MAP.scale.derived(projection)
    ctx.textAlign = 'center'
    ctx.shadowColor = 'white'
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.05 * scale
    ctx.font = 1 * scale + 'px ' + fontFamily
    const provinces = window.world.provinces
      .filter(province => nationSet.has(PROVINCE.nation(province).idx))
      .map(province => {
        const geojson = MAP.geojson.point(province.hub)
        geojson.properties = { idx: province.idx }
        return geojson
      })
    const radius = 0.2 * scale
    // capital provinces
    const capitals = provinces.filter(p => window.world.provinces[p.properties.idx].capital)
    const pathGen = MAP.path.linear(projection).pointRadius(radius * 2)
    ctx.stroke(new Path2D(pathGen(MAP.geojson.features(capitals))))
    // regular provinces
    pathGen.pointRadius(radius)
    ctx.fill(new Path2D(pathGen(MAP.geojson.features(provinces))))
    const offset = 0.25 * scale
    provinces.forEach(province => {
      const center = pathGen.centroid(MAP.geojson.features([province]))
      const loc = window.world.provinces[province.properties.idx]
      ctx.fillText(loc.name, center[0], center[1] - offset * (PROVINCE.isCapital(loc) ? 3 : 2.5))
    })
    // region titles
    capitals.forEach(capital => {
      const loc = window.world.provinces[capital.properties.idx]
      const nation = PROVINCE.nation(loc)
      const region = PROVINCE.region(loc)
      const center = pathGen.centroid(MAP.geojson.features([capital]))
      if (loc.idx === nation.capital) {
        ctx.font = `${5 * scale}px ${fontFamily}`
        ctx.fillStyle = 'black'
        ctx.fillText(region.name, center[0], center[1] + offset * 20)
        ctx.save()
        const tempCanvas = document.createElement('canvas')
        const initialSize = 100
        tempCanvas.width = initialSize
        tempCanvas.height = initialSize
        const tempCtx = tempCanvas.getContext('2d')
        const config = HERALDRY.config(nation)
        jdenticon.drawIcon(tempCtx, nation.name, initialSize, config)
        const backColor = config?.backColor ?? '#ffffff'
        const iconSize = 3 * scale
        HERALDRY.draw({
          ctx,
          x: center[0] - 1.25 * scale,
          y: center[1] + 6.5 * scale,
          h: iconSize + 2 * scale,
          w: iconSize + 0.5 * scale,
          borderWidth: 0.2 * scale,
          backColor
        })
        // Copy the identicon from the temporary canvas to the main canvas at the new size
        ctx.drawImage(tempCanvas, center[0] - 1 * scale, center[1] + 7 * scale, iconSize, iconSize)
        ctx.restore()
      } else {
        ctx.font = `${4.5 * scale}px ${fontFamily}`
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillText(region.name, center[0], center[1] + offset * 18)
      }
    })
  },
  roads: ({ ctx, projection, nationSet }: DrawInfraParams) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.linear(projection)
    const { routes } = window.world.display
    ctx.save()
    ctx.lineCap = 'square'
    let width = 0.25 * scale
    let dashes = [1 * scale, 1 * scale]
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
