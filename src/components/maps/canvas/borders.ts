import { range } from 'd3'

import { province__foreign_neighbors } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { cell__bfs_neighborhood, cells__boundary } from '../../../models/world/cells'
import { climate_lookup } from '../../../models/world/climate/types'
import { display__coast_curve } from '../../../models/world/spawn/shapers/display/coasts'
import { canvas__breakpoints, draw_styles } from './draw_styles'

export const draw_regions = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  style: draw_styles
  nations: Region[]
}) => {
  const { ctx, scale, style, nations } = params
  if (style === 'Climate') draw_climates(ctx)
  else if (style === 'Tech') draw_tech(ctx)
  else if (style === 'Cultures') draw_culture(ctx)
  else if (style === 'Religions') draw_religions(ctx)
  else draw_nations({ ctx, scale, nations })
}

/** Creates a canvas filled with a horizontal striped pattern.
 * @returns the filled HTMLCanvasElement. */
const stripes_pattern = (color: string) => {
  const patternCanvas = document.createElement('canvas')
  const ctx = patternCanvas.getContext('2d')

  const canvas_side_length = 4
  patternCanvas.width = canvas_side_length
  patternCanvas.height = canvas_side_length

  const thickness = 1
  const lines = Math.floor(canvas_side_length / thickness)
  range(lines).forEach((_, i) => {
    ctx.beginPath()
    ctx.strokeStyle = i % 2 ? color : 'transparent'
    ctx.lineWidth = thickness
    const dist = thickness * (i + 0.5)
    ctx.moveTo(0, dist)
    ctx.lineTo(canvas_side_length, dist)
    ctx.stroke()
  })
  return patternCanvas
}

const draw_nations = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
}) => {
  const { ctx, scale, nations } = params
  const { borders } = window.world.display
  const global_scale = scale <= canvas__breakpoints.global
  const drawn_borders = nations
  ctx.lineWidth = 2
  drawn_borders.forEach(nation => {
    ctx.fillStyle = '#f7eedc'
    borders[nation.idx].forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      ctx.clip(p)
      ctx.filter = `blur(${scale}px)`
      ctx.strokeStyle = window.world.regions[border.r].colors.replace('%)', '%, 0.75)')
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
  })
  const used_wars = new Set<number>()
  const used_rebellions = new Set<number>()
  const conflict_zones = global_scale ? drawn_borders : nations
  conflict_zones.forEach(nation => {
    const rebellions = nation.regions
      .map(r => {
        const province = window.world.provinces[r]
        const region = window.world.regions[province.region]
        return window.world.rebellions[region.rebellions.current]
      })
      .filter(rebellion => rebellion && rebellion.events.length > 0)
    const wars = nation.wars.current.map(w => window.world.wars[w])
    const conflicts = [...rebellions, ...wars].filter(conflict =>
      conflict.tag === 'war' ? !used_wars.has(conflict.idx) : !used_rebellions.has(conflict.idx)
    )
    conflicts.forEach(conflict => {
      if (conflict.tag === 'war') used_wars.add(conflict.idx)
      else if (conflict.tag === 'rebellion') used_rebellions.add(conflict.idx)
      const color = conflict.tag === 'war' ? 'rgba(225, 0, 0, 0.5)' : 'rgba(101, 42, 32, 0.5)'
      const pattern = ctx.createPattern(stripes_pattern(color), 'repeat')
      ctx.fillStyle = pattern
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.lineCap = 'round'
      const edges = Array.from(
        new Set(
          conflict.events
            .map(e => e.provinces)
            .flat()
            .concat(conflict.next_battle.province)
        )
      )
        .filter(p => {
          const province = window.world.provinces[p]
          if (conflict.tag === 'rebellion') return true
          return province__foreign_neighbors(province).some(
            n => n.curr_nation === conflict.defender.idx || n.curr_nation === conflict.invader.idx
          )
        })
        .map(p => {
          const province = window.world.provinces[p]
          return cell__bfs_neighborhood({
            start: window.world.cells[province.cell],
            spread: cell => cell.province === province.idx
          })
        })
        .flat()
      const group = new Set(edges.map(e => e.idx))
      cells__boundary({
        cells: edges.filter(edge => !edge.is_water),
        boundary: cell => !group.has(cell.idx) || cell.is_water
      })
        .map(path => display__coast_curve()(path))
        .forEach(path => {
          ctx.save()
          const p = new Path2D(path)
          ctx.clip(p)
          ctx.fill(p)
          ctx.restore()
        })
    })
  })
}

const draw_climates = (ctx: CanvasRenderingContext2D) => {
  const { regions } = window.world.display
  ctx.lineWidth = 1
  Object.values(regions)
    .flat()
    .forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      const color = climate_lookup[window.world.regions[border.r].climate].display
      ctx.fillStyle = color
      ctx.clip(p)
      ctx.strokeStyle = color
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
}

const draw_tech = (ctx: CanvasRenderingContext2D) => {
  const { regions } = window.world.display
  ctx.lineWidth = 1
  Object.values(regions)
    .flat()
    .forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      const region = window.world.regions[border.r]
      const dev = region.development
      const color =
        dev === 'civilized'
          ? '#efeae8'
          : dev === 'frontier'
          ? '#f7d9cf'
          : dev === 'tribal'
          ? '#f4bead'
          : '#efa088'
      ctx.strokeStyle = color
      ctx.clip(p)
      ctx.fillStyle = color
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
}

const draw_culture = (ctx: CanvasRenderingContext2D) => {
  const { regions } = window.world.display
  ctx.lineWidth = 1
  Object.values(regions)
    .flat()
    .forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      const region = window.world.regions[border.r]
      const color = window.world.cultures[region.culture.native].display.replace('%)', '%, 0.75)')
      ctx.strokeStyle = color
      ctx.clip(p)
      ctx.fillStyle = color
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
}

const draw_religions = (ctx: CanvasRenderingContext2D) => {
  const { regions } = window.world.display
  ctx.lineWidth = 1
  Object.values(regions)
    .flat()
    .forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      const region = window.world.regions[border.r]
      const color = window.world.religions[region.religion.native].display.replace('%)', '%, 0.75)')
      ctx.strokeStyle = color
      ctx.clip(p)
      ctx.fillStyle = color
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
}
