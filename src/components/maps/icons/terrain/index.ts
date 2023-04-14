import { cell__isHub } from '../../../../models/world/cells'
import { map__breakpoints } from '../../canvas/draw_styles'
import { canvas__drawIcon, icon__scaling } from '..'
import { IconDef } from '../types'
import { desert__icons } from './desert'
import { element__icons } from './elements'
import { grass__icons } from './grass'
import { mountain__icons } from './mountains'
import { tree__icons } from './trees'
import { TerrainIcon } from './types'

export const terrain__icons: Record<TerrainIcon, IconDef> = {
  ...desert__icons,
  ...grass__icons,
  ...mountain__icons,
  ...tree__icons,
  ...element__icons
}

export const map__drawTerrainIcons = (params: {
  ctx: CanvasRenderingContext2D
  cachedImages: Record<string, HTMLImageElement>
  scale: number
  regions: Set<number>
  lands: Set<number>
}) => {
  const { ctx, cachedImages, scale, regions, lands } = params
  const globalScale = scale <= map__breakpoints.global
  const { sh, sw } = icon__scaling()
  const sortedIcons = window.world.display.icons
    .filter(m => {
      const cell = window.world.cells[m.cell]
      const valid = !cell__isHub(cell) || scale <= 20
      const province = window.world.provinces[cell.province]
      const contained = regions.has(province.region)
      const drawnLand = cell.isWater || lands.has(cell.landmark)
      const globalMountains = globalScale && cell.isMountains
      const shouldDraw = globalMountains || (contained && drawnLand)
      return valid && shouldDraw
    })
    .sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x
      }
      return a.y - b.y
    })
  ctx.save()
  sortedIcons.forEach(i => {
    const img = cachedImages[i.type]
    const icon = terrain__icons[i.type]
    canvas__drawIcon({ ctx, img, icon, sw, sh, point: i })
  })
  ctx.restore()
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'rgba(88, 103, 117, 0.2)'
  ctx.lineWidth = scale < 20 ? 1 : 0.5
  window.world.display.icebergs
    .filter(({ idx }) => {
      const cell = window.world.cells[idx]
      const contained = regions.has(cell.region)
      return contained || globalScale
    })
    .forEach(({ path }) => {
      const p = new Path2D(path)
      ctx.fill(p)
      ctx.stroke(p)
    })
  ctx.restore()
}
