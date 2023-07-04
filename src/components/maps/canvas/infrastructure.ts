import { hub__isTown, hub__isVillage } from '../../../models/regions/provinces/hubs'
import { Hub } from '../../../models/regions/provinces/hubs/types'
import { RouteTypes } from '../../../models/world/travel/types'
import { World } from '../../../models/world/types'
import { fonts } from '../../theme/fonts'
import { canvas__drawIcon, icon__scaling } from '../icons'
import { terrain__icons } from '../icons/terrain'
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

const locHighlight = (params: {
  loc: Hub
  ctx: CanvasRenderingContext2D
  scale: number
  color: string
}) => {
  const { loc: point, ctx, scale, color } = params
  const fontSize = baseFontSize()
  const radius = fontSize * (scale > map__breakpoints.regional ? 0.2 : 0.3)
  ctx.save()
  const gradient = ctx.createRadialGradient(point.x, point.y, radius, point.x, point.y, radius * 10)
  gradient.addColorStop(0, `rgba(${color}, 0.4)`)
  gradient.addColorStop(0.9, `rgba(${color}, 0)`)
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, window.world.dim.h, window.world.dim.h)
  ctx.restore()
}

const settings = {
  city: {
    radius: 0.2,
    name: { local: { size: 2, offset: 1 }, regional: { size: 2, offset: 0.5 } },
    type: { local: { size: 1, offset: 0.6 } }
  },
  town: {
    radius: 0.15,
    name: { local: { size: 1.3, offset: 0.7 }, regional: { size: 2, offset: 0.5 } },
    type: { local: { size: 0.6, offset: 0.4 } }
  },
  village: {
    radius: 0.1,
    name: { local: { size: 0.8, offset: 0.5 }, regional: { size: 2, offset: 0.5 } },
    type: { local: { size: 0.4, offset: 0.3 } }
  }
}

export const map__drawLocationsRegional = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nationSet: Set<number>
  cachedImages: Record<string, HTMLImageElement>
}) => {
  const { ctx, scale, nationSet, cachedImages } = params
  ctx.textAlign = 'center'
  ctx.shadowColor = 'white'
  const settlements = window.world.provinces.filter(province => nationSet.has(province.nation))
  const fontSize = baseFontSize()
  const iconScale = icon__scaling()
  const regional = scale <= map__breakpoints.regional
  settlements.forEach(loc => {
    const type = hub__isVillage(loc.hub) ? 'village' : hub__isTown(loc.hub) ? 'town' : 'city'
    const setting = settings[type]
    if (regional) {
      const capital = window.world.regions[loc.nation].capital === loc.idx
      if (capital)
        canvas__circle({
          point: loc.hub,
          radius: setting.radius + 0.1,
          fill: 'transparent',
          border: { width: 0.05, color: 'black' },
          ctx
        })
      canvas__circle({ point: loc.hub, radius: setting.radius, fill: 'black', ctx })
      ctx.fillStyle = 'black'
      ctx.font = `${fontSize * setting.name.regional.size}px ${fontFamily}`
      ctx.fillText(loc.name, loc.hub.x, loc.hub.y - setting.name.regional.offset)
    } else {
      const img = cachedImages[type]
      const icon = terrain__icons[type]
      canvas__drawIcon({ ctx, img, icon, ...iconScale, point: loc.hub })
      ctx.fillStyle = 'black'
      ctx.font = `${fontSize * setting.name.local.size}px ${fontFamily}`
      ctx.fillText(loc.name, loc.hub.x, loc.hub.y - setting.name.local.offset)
      ctx.font = `${fontSize * setting.type.local.size}px ${fontFamily}`
      ctx.fillText(loc.hub.type, loc.hub.x, loc.hub.y - setting.type.local.offset)
    }
    const nation = window.world.regions[loc.nation]
    const region = window.world.regions[loc.region]
    if (regional && loc.idx === nation.capital) {
      ctx.font = `${fontSize * 12}px ${fontFamily}`
      ctx.fillText(nation.name, loc.hub.x, loc.hub.y + 5)
    } else if (regional && loc.idx === region.capital) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.font = `${fontSize * 10}px ${fontFamily}`
      ctx.fillText(region.name, loc.hub.x, loc.hub.y + 4)
    }
  })
}

export const map__drawAvatarLocation = (params: {
  ctx: CanvasRenderingContext2D
  loc: Hub
  scale: number
}) => {
  locHighlight({ ...params, color: '0, 0, 255' })
}
