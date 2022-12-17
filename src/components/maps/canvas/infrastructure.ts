import { location__hub } from '../../../models/regions/locations'
import { location__icon } from '../../../models/regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../../../models/regions/locations/types'
import { province__hub, province__neighbors } from '../../../models/regions/provinces'
import { Province } from '../../../models/regions/provinces/types'
import { scaleExp } from '../../../models/utilities/math'
import { RouteTypes } from '../../../models/world/travel/types'
import { World } from '../../../models/world/types'
import { fonts } from '../../theme/fonts'
import { canvas__drawIcon, icon__scaling } from '../icons'
import { location__icons } from '../icons/locations'
import { canvas__circle } from '.'
import { map__breakpoints, map__styles } from './draw_styles'

const fontFamily = fonts.maps
const baseFontSize = () => window.world.dim.h / 2000

const regionalPath =
  (regions: Set<number>) => (route: World['display']['routes'][RouteTypes][number]) => {
    return route.provinces.some(idx => {
      const province = window.world.provinces[idx]
      return regions.has(province.nation)
    })
  }

export const map__drawRoads = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nationSet: Set<number>
}) => {
  const { ctx, scale, nationSet } = params
  const { routes } = window.world.display
  ctx.save()
  ctx.lineCap = 'square'
  let width = 0.15
  let dashes = [1, 0.6]
  if (scale > map__breakpoints.regional) {
    width /= 4
    dashes = dashes.map(dash => dash / 4)
  }
  ctx.lineWidth = width
  ctx.setLineDash(dashes)
  const roadFilter = regionalPath(nationSet)
  // land roads
  routes.land.filter(roadFilter).forEach(r => {
    ctx.strokeStyle = r.imperial ? 'rgb(107, 27, 27, 0.8)' : 'rgba(107, 27, 27, 0.3)'
    const path = new Path2D(r.d)
    ctx.stroke(path)
  })
  // sea routes
  ctx.lineWidth = width
  ctx.setLineDash(dashes)
  ctx.strokeStyle = `rgba(${map__styles.roads.sea}, 0.5)`
  routes.sea.filter(roadFilter).forEach(r => ctx.stroke(new Path2D(r.d)))
  ctx.restore()
}

const popScale = [500, 300000]

const locRadius = (city: Loc, font: number) => {
  const rel = font * 2
  return scaleExp(popScale, [rel * 0.15, rel * 0.65], city.population, 0.5)
}

const locFont = (city: Loc, font: number) => {
  return scaleExp(popScale, [font * 2, font * 5], city.population, 0.5)
}

const locHighlight = (params: {
  loc: Loc
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}) => {
  const { loc, ctx, scale, color } = params
  const fontSize = baseFontSize()
  const hub = location__hub(loc)
  const point = scale > map__breakpoints.regional ? loc : hub
  const radius =
    fontSize * (scale > map__breakpoints.regional ? 0.08 : locRadius(hub, fontSize) * 2)
  ctx.save()
  const gradient = ctx.createRadialGradient(point.x, point.y, radius, point.x, point.y, radius * 10)
  gradient.addColorStop(0, `rgba(${color}, 0.4)`)
  gradient.addColorStop(0.9, `rgba(${color}, 0)`)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, window.world.dim.h, window.world.dim.h)
  ctx.restore()
}

const drawLocation = (params: {
  ctx: CanvasRenderingContext2D
  location: Loc
  text: { fontSize: number; offset: number }
  fill: { color: string; radius: number }
  border?: { color: string; width: number }
}) => {
  const { ctx, fill, text, location, border } = params
  canvas__circle({ point: location, radius: fill.radius, fill: fill.color, border, ctx })
  ctx.fillStyle = 'black'
  ctx.font = `${text.fontSize}px ${fontFamily}`
  ctx.fillText(location.name, location.x, location.y - text.offset)
}

export const map__drawLocationsRegional = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nationSet: Set<number>
  cachedImages: Record<string, HTMLImageElement>
}) => {
  const { ctx, scale, nationSet } = params
  ctx.textAlign = 'center'
  ctx.shadowColor = 'white'
  if (scale <= map__breakpoints.regional) {
    const settlements = window.world.provinces.filter(province => nationSet.has(province.nation))
    const fontSize = baseFontSize()
    const towns = settlements.filter(province => {
      const city = province.hub
      return (
        city !== window.world.regions[province.nation].capital &&
        city !== window.world.regions[province.region].capital
      )
    })
    towns.forEach(province => {
      const c = province__hub(province)
      const radius = locRadius(c, fontSize)
      const offset = 0.3 + radius
      drawLocation({
        ctx,
        fill: { radius, color: 'black' },
        text: { fontSize: locFont(c, fontSize), offset },
        location: c
      })
    })
    const defunct = settlements.filter(province => {
      const city = province.hub
      return (
        city !== window.world.regions[province.nation].capital &&
        city === window.world.regions[province.region].capital
      )
    })
    defunct.forEach(province => {
      const c = province__hub(province)
      const radius = locRadius(c, fontSize)
      const offset = 0.5 + radius
      drawLocation({
        ctx,
        fill: { radius, color: 'black' },
        text: { fontSize: fontSize * 4, offset },
        location: c
      })
      // region name
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.font = `${fontSize * 10}px ${fontFamily}`
      ctx.fillText(window.world.regions[province.region].name, c.x, c.y + 4 + radius)
    })
    const capitals = settlements.filter(province => {
      const city = province.hub
      return city === window.world.regions[province.nation].capital
    })
    capitals.forEach(province => {
      const c = province__hub(province)
      const radius = locRadius(c, fontSize)
      const offset = 0.8 + radius
      drawLocation({
        ctx,
        fill: { radius, color: 'white' },
        border: { width: radius, color: 'black' },
        text: { fontSize: fontSize * 6, offset },
        location: c
      })
      // region name
      ctx.font = `${fontSize * 12}px ${fontFamily}`
      ctx.fillText(window.world.regions[province.region].name, c.x, c.y + 5 + radius)
    })
  }
}

export const map__drawLocations = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  scale: number
  province: Province
}) => {
  const { scale, cachedImages, ctx, province } = params
  if (scale >= map__breakpoints.regional) {
    const sphere = province__neighbors(province)
      .concat([province])
      .map(({ locations }) => locations)
      .flat()
    const locs = sphere.map(loc => window.world.locations[loc])
    const baseFont = baseFontSize()
    const { sh, sw } = icon__scaling()
    ctx.save()
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    locs.forEach(loc => {
      const tag = location__icon(loc)
      const img = cachedImages[tag]
      const icon = location__icons[tag]
      const { height } = canvas__drawIcon({ ctx, img, icon, sh, sw, point: loc, bigger: loc.hub })
      ctx.font = `${icon.fontScale * baseFont * (loc.hub ? 1.75 : 1.5)}px ${fontFamily}`
      ctx.fillText(loc.name, loc.x, loc.y - height - 0.23)
      ctx.font = `${icon.fontScale * baseFont * 0.75}px ${fontFamily}`
      ctx.fillText(loc.subtype ?? loc.type, loc.x, loc.y - height - 0.04)
    })
    ctx.restore()
  }
}

export const map__drawAvatarLocation = (params: {
  ctx: CanvasRenderingContext2D
  loc: Loc
  scale: number
}) => {
  locHighlight({ ...params, color: '0, 0, 255' })
}
