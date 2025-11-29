import { geoDistance } from 'd3'
import { PROVINCE } from '../../../models/provinces'
import { ARRAY } from '../../../models/utilities/array'
import { CachedImages, WorldPaintParams } from '../types'
import { DRAW_BORDERS } from './border'
import { DRAW_LANDMARKS } from './coast'
import { DRAW_EMBELLISHMENTS } from './embellishments'
import { ICON } from './icons'
import { DRAW_LOCATION } from './icons/locations'
import { DRAW_TERRAIN } from './icons/terrain'
import { DRAW_INFRASTRUCTURE } from './infrastructure'
import { MAP_SHAPES } from './shapes'
import { DRAW_CACHE } from './shapes/caching'

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = path
  })
}

export const loadImages = async (): Promise<CachedImages> =>
  (
    await Promise.all([
      ...Object.entries(DRAW_LOCATION.definitions).map(async ([k, v]) => ({
        img: await loadImage(ICON.path + v.path),
        index: k
      })),
      ...Object.entries(DRAW_TERRAIN.definitions).map(async ([k, v]) => ({
        img: await loadImage(ICON.path + v.path),
        index: k
      })),
      (async () => ({
        img: await loadImage(MAP_SHAPES.clouds.heavy),
        index: 'clouds'
      }))()
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})


const visibleProvinces = (center: [number, number], maxRadius: number, scale: number) => {
  const threshold = Math.min(Math.PI / 2, Math.asin(Math.min(1, maxRadius / (scale * MAP_SHAPES.scale.init))))

  const visible = new Set(
    center
      ? window.world.provinces
        .filter(p => {
          return geoDistance(center, [p.hub.x, p.hub.y]) < threshold
        })
        .map(p => p.idx)
      : window.world.provinces.map(p => p.idx)
  )

  return visible
}

export const paint = ({
  ctx,
  projection,
  style,
  province,
  cachedImages,
  rotation,
  units
}: WorldPaintParams) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const center = projection.invert?.([ctx.canvas.width / 2, ctx.canvas.height / 2])
  const scale = MAP_SHAPES.scale.derived(projection)
  const maxRadius = Math.hypot(ctx.canvas.width, ctx.canvas.height)
  const visible = visibleProvinces(center, maxRadius / 2, scale)
  const narrow = visibleProvinces(center, maxRadius / 4, scale)

  const place = province.hub
  const nation = PROVINCE.nation(province)
  const nations = ARRAY.unique(
    window.world.provinces
      .filter(p => !p.desolate && narrow.has(p.idx))
      .map(p => PROVINCE.nation(p).idx)
      .concat(nation.idx)
  ).map(n => window.world.provinces[n])
  const nationSet = new Set(nations.map(n => n.idx))
  DRAW_CACHE.paths.clear()
  DRAW_LANDMARKS.oceans({ ctx, projection, style, visible })
  DRAW_BORDERS.regions({ ctx, projection, style, nations, province, nationSet, visible })
  DRAW_LANDMARKS.lakes({ ctx, projection, style, visible })
  DRAW_LANDMARKS.rivers({ ctx, projection })
  DRAW_INFRASTRUCTURE.roads({ ctx, projection, nationSet, style, visible })
  DRAW_TERRAIN.icons({ ctx, projection, cachedImages, visible })
  DRAW_INFRASTRUCTURE.provinces({ ctx, projection, nationSet, style, cachedImages, place, visible })
  DRAW_EMBELLISHMENTS.graticule({ ctx, projection })
  DRAW_EMBELLISHMENTS.clouds({ ctx, projection, cachedImages })
  DRAW_EMBELLISHMENTS.scale({ ctx, projection, units })
  DRAW_EMBELLISHMENTS.legend({ ctx, style, province, nationSet, units })
  DRAW_EMBELLISHMENTS.compass({ ctx, rotation, projection })
}
