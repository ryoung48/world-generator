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
  const place = province.hub
  const nation = PROVINCE.nation(province)
  const nations = ARRAY.unique(
    window.world.provinces
      .filter(p => !p.desolate && !PROVINCE.far(province, p, 4))
      .map(p => PROVINCE.nation(p).idx)
      .concat(nation.idx)
  ).map(n => window.world.provinces[n])
  const nationSet = new Set(nations.map(n => n.idx))
  DRAW_CACHE.paths.clear()
  DRAW_LANDMARKS.oceans({ ctx, projection, style })
  DRAW_BORDERS.regions({ ctx, projection, style, nations, province, nationSet })
  DRAW_LANDMARKS.lakes({ ctx, projection, style })
  // DRAW_LANDMARKS.rivers({ ctx, projection })
  DRAW_INFRASTRUCTURE.roads({ ctx, projection, nationSet, style })
  DRAW_TERRAIN.icons({ ctx, projection, cachedImages })
  DRAW_INFRASTRUCTURE.provinces({ ctx, projection, nationSet, style, cachedImages, place })
  DRAW_EMBELLISHMENTS.graticule({ ctx, projection })
  DRAW_EMBELLISHMENTS.clouds({ ctx, projection, cachedImages })
  DRAW_EMBELLISHMENTS.scale({ ctx, projection, units })
  DRAW_EMBELLISHMENTS.legend({ ctx, style, province, nationSet, units })
  DRAW_EMBELLISHMENTS.compass({ ctx, rotation, projection })
}
