import { recent_battle_window } from '../../../models/history/events/war/battles'
import { region__imperial_name } from '../../../models/regions/diplomacy/status'
import { location__hub } from '../../../models/regions/locations'
import { location__icon } from '../../../models/regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../../../models/regions/locations/types'
import { province__hub, province__neighbors } from '../../../models/regions/provinces'
import { Province } from '../../../models/regions/provinces/types'
import { scaleExp } from '../../../models/utilities/math'
import { route_types } from '../../../models/world/travel/types'
import { World } from '../../../models/world/types'
import { fonts } from '../../theme/fonts'
import { draw_icon, icon__scaling } from '../icons'
import { location__icons } from '../icons/locations'
import { terrain__icons } from '../icons/terrain'
import { canvas__circle } from '.'
import { canvas__breakpoints, canvas__map_styles } from './draw_styles'

const font_family = fonts.maps
const base_font_size = () => window.world.dim.h / 2000

const regionalPath =
  (regions: Set<number>) => (route: World['display']['routes'][route_types][number]) => {
    return route.provinces.some(idx => {
      const province = window.world.provinces[idx]
      return regions.has(province.curr_nation)
    })
  }

export const draw_roads = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nation_set: Set<number>
}) => {
  const { ctx, scale, nation_set } = params
  const { routes } = window.world.display
  ctx.save()
  ctx.lineCap = 'square'
  let width = 0.15
  let dashes = [1, 0.6]
  if (scale > canvas__breakpoints.regional) {
    width /= 4
    dashes = dashes.map(dash => dash / 4)
  }
  ctx.lineWidth = width
  ctx.setLineDash(dashes)
  const roadFilter = regionalPath(nation_set)
  // land roads
  routes.land.filter(roadFilter).forEach(r => {
    ctx.strokeStyle = r.imperial ? 'rgb(107, 27, 27, 0.8)' : 'rgba(107, 27, 27, 0.3)'
    const path = new Path2D(r.d)
    ctx.stroke(path)
  })
  // sea routes
  ctx.lineWidth = width
  ctx.setLineDash(dashes)
  ctx.strokeStyle = `rgba(${canvas__map_styles.roads.sea}, 0.5)`
  routes.sea.filter(roadFilter).forEach(r => ctx.stroke(new Path2D(r.d)))
  ctx.restore()
}

const pop_scale = [500, 300000]

const loc_radius = (city: Loc, font: number) => {
  const rel = font * 2
  return scaleExp(pop_scale, [rel * 0.15, rel * 0.65], city.population, 0.5)
}

const loc_font = (city: Loc, font: number) => {
  return scaleExp(pop_scale, [font * 2, font * 5], city.population, 0.5)
}

const loc_highlight = (params: {
  loc: Loc
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}) => {
  const { loc, ctx, scale, color } = params
  const font_size = base_font_size()
  const hub = location__hub(loc)
  const point = scale > canvas__breakpoints.regional ? loc : hub
  const radius =
    font_size * (scale > canvas__breakpoints.regional ? 0.08 : loc_radius(hub, font_size) * 2)
  ctx.save()
  const gradient = ctx.createRadialGradient(point.x, point.y, radius, point.x, point.y, radius * 10)
  gradient.addColorStop(0, `rgba(${color}, 0.4)`)
  gradient.addColorStop(0.9, `rgba(${color}, 0)`)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, window.world.dim.h, window.world.dim.h)
  ctx.restore()
}

const draw_location = (params: {
  ctx: CanvasRenderingContext2D
  location: Loc
  text: { font_size: number; offset: number }
  fill: { color: string; radius: number }
  border?: { color: string; width: number }
}) => {
  const { ctx, fill, text, location, border } = params
  canvas__circle({ point: location, radius: fill.radius, fill: fill.color, border, ctx })
  ctx.fillStyle = 'black'
  ctx.font = `${text.font_size}px ${font_family}`
  ctx.fillText(location.name, location.x, location.y - text.offset)
}

const draw_battles = () => {
  const { sh, sw } = icon__scaling()
  return (params: {
    ctx: CanvasRenderingContext2D
    province: Province
    offset: number
    cached_images: Record<string, HTMLImageElement>
  }) => {
    const { ctx, province, offset, cached_images } = params
    const { next_invasion, last_invasion } = province.memory
    const c = province__hub(province)
    if (next_invasion.time > window.world.date) {
      draw_icon({
        ctx,
        img: cached_images['battle_pending'],
        icon: terrain__icons.battle_pending,
        sh,
        sw,
        point: { x: c.x, y: c.y + offset }
      })
    } else if (window.world.date - last_invasion.time < recent_battle_window) {
      draw_icon({
        ctx,
        img: cached_images['battle_old'],
        icon: terrain__icons.battle_old,
        sh,
        sw,
        point: { x: c.x, y: c.y + offset }
      })
    }
  }
}

export const draw_locations_regional = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nation_set: Set<number>
  cached_images: Record<string, HTMLImageElement>
}) => {
  const { ctx, scale, nation_set, cached_images } = params
  ctx.textAlign = 'center'
  ctx.shadowColor = 'white'
  if (scale <= canvas__breakpoints.regional) {
    const settlements = window.world.provinces.filter(province =>
      nation_set.has(province.curr_nation)
    )
    const font_size = base_font_size()
    const draw_battle_icon = draw_battles()
    const towns = settlements.filter(province => {
      const city = province.hub
      return (
        city !== window.world.regions[province.curr_nation].capital &&
        city !== window.world.regions[province.region].capital
      )
    })
    towns.forEach(province => {
      const c = province__hub(province)
      const radius = loc_radius(c, font_size)
      const offset = 0.3 + radius
      draw_battle_icon({ ctx, cached_images, province, offset })
      draw_location({
        ctx,
        fill: { radius, color: 'black' },
        text: { font_size: loc_font(c, font_size), offset },
        location: c
      })
    })
    const hubs = window.world.provinces
    const defunct = hubs.filter(province => {
      const city = province.hub
      return (
        city !== window.world.regions[province.curr_nation].capital &&
        city === window.world.regions[province.region].capital
      )
    })
    defunct.forEach(province => {
      const c = province__hub(province)
      const radius = loc_radius(c, font_size)
      const offset = 0.5 + radius
      draw_battle_icon({ ctx, cached_images, province, offset })
      draw_location({
        ctx,
        fill: { radius, color: 'black' },
        text: { font_size: font_size * 4, offset },
        location: c
      })
      // region name
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.font = `${font_size * 10}px ${font_family}`
      ctx.fillText(
        region__imperial_name(window.world.regions[province.region]),
        c.x,
        c.y + 4 + radius
      )
    })
    const capitals = hubs.filter(province => {
      const city = province.hub
      return city === window.world.regions[province.curr_nation].capital
    })
    capitals.forEach(province => {
      const c = province__hub(province)
      const radius = loc_radius(c, font_size)
      const offset = 0.8 + radius
      draw_battle_icon({ ctx, cached_images, province, offset: offset * 0.7 })
      draw_location({
        ctx,
        fill: { radius, color: 'white' },
        border: { width: radius, color: 'black' },
        text: { font_size: font_size * 6, offset },
        location: c
      })
      // region name
      ctx.font = `${font_size * 12}px ${font_family}`
      ctx.fillText(
        region__imperial_name(window.world.regions[province.region]),
        c.x,
        c.y + 5 + radius
      )
    })
  }
}

export const draw_locations = (params: {
  ctx: CanvasRenderingContext2D
  cached_images: Record<string, HTMLImageElement>
  scale: number
  province: Province
}) => {
  const { scale, cached_images, ctx, province } = params
  if (scale >= canvas__breakpoints.regional) {
    const sphere = province__neighbors(province)
      .concat([province])
      .map(({ locations }) => locations)
      .flat()
    const locs = sphere.map(loc => window.world.locations[loc])
    const base_font = base_font_size()
    const { sh, sw } = icon__scaling()
    ctx.save()
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    locs.forEach(loc => {
      const tag = location__icon(loc)
      const img = cached_images[tag]
      const icon = location__icons[tag]
      const { height } = draw_icon({ ctx, img, icon, sh, sw, point: loc, bigger: loc.hub })
      ctx.font = `${icon.font_scale * base_font * (loc.hub ? 1.75 : 1.5)}px ${font_family}`
      ctx.fillText(loc.name, loc.x, loc.y - height - 0.15)
      ctx.font = `${icon.font_scale * base_font * 0.75}px ${font_family}`
      ctx.fillText(loc.subtype ?? loc.type, loc.x, loc.y - height)
    })
    ctx.restore()
  }
}

export const draw_avatar_location = (params: {
  ctx: CanvasRenderingContext2D
  loc: Loc
  scale: number
}) => {
  loc_highlight({ ...params, color: '0, 0, 255' })
}
