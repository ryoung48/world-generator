import { polygonCentroid } from 'd3'

import { cell__is_hub } from '../../../../models/world/cells'
import { canvas__breakpoints } from '../../canvas/draw_styles'
import { draw_icon, icon__scaling } from '..'
import { IconDef } from '../types'
import { desert__icons } from './desert'
import { element__icons } from './elements'
import { grass__icons } from './grass'
import { mountain__icons } from './mountains'
import { tree__icons } from './trees'
import { terrain_icon } from './types'

export const terrain__icons: Record<terrain_icon, IconDef> = {
  ...desert__icons,
  ...grass__icons,
  ...mountain__icons,
  ...tree__icons,
  ...element__icons
}

export const draw_terrain_icons = (params: {
  ctx: CanvasRenderingContext2D
  cached_images: Record<string, HTMLImageElement>
  scale: number
  regions: Set<number>
  lands: Set<number>
}) => {
  const { ctx, cached_images, scale, regions, lands } = params
  const global_scale = scale <= canvas__breakpoints.global
  const { sh, sw } = icon__scaling()
  const sorted_icons = window.world.display.icons
    .filter(m => {
      const cell = window.world.cells[m.cell]
      const valid = !cell__is_hub(cell) || scale <= 20
      const province = window.world.provinces[cell.province]
      const contained = regions.has(province.region)
      const drawn_land = cell.is_water || lands.has(cell.landmark)
      const global_mountains = global_scale && cell.is_mountains
      const should_draw = global_mountains || (contained && drawn_land)
      return valid && should_draw
    })
    .sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x
      }
      return a.y - b.y
    })
  ctx.save()
  sorted_icons.forEach(i => {
    const img = cached_images[i.type]
    const icon = terrain__icons[i.type]
    draw_icon({ ctx, img, icon, sw, sh, point: i })
  })
  ctx.restore()
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'rgba(88, 103, 117, 0.2)'
  ctx.lineWidth = scale < 20 ? 1 : 0.5
  const penguins: terrain_icon = 'penguin_1'
  const penguins_img = cached_images[penguins]
  const penguins_icon = terrain__icons[penguins]
  window.world.display.icebergs
    .filter(({ idx }) => {
      const cell = window.world.cells[idx]
      const contained = regions.has(cell.region)
      return contained || global_scale
    })
    .forEach(({ path, idx, penguins }) => {
      const p = new Path2D(path)
      ctx.fill(p)
      ctx.stroke(p)
      if (penguins) {
        const cell = window.world.cells[idx]
        const [x, y] = polygonCentroid(cell.data)
        draw_icon({ ctx, img: penguins_img, icon: penguins_icon, sw, sh, point: { x, y } })
      }
    })
  ctx.restore()
}
