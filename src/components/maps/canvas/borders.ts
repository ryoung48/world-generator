import { range } from 'd3'

import { province__foreignNeighbors } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { cell__bfsNeighborhood, cells__boundary } from '../../../models/world/cells'
import { climateLookup } from '../../../models/world/climate/types'
import { display__coastCurve } from '../../../models/world/spawn/shapers/display/coasts'
import { DrawStyles, map__breakpoints } from './draw_styles'

export const map__drawRegions = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  style: DrawStyles
  nations: Region[]
}) => {
  const { ctx, scale, style, nations } = params
  if (style === 'Climate') drawClimates(ctx)
  else if (style === 'Tech') drawTech(ctx)
  else if (style === 'Cultures') drawCulture(ctx)
  else if (style === 'Religions') drawReligions(ctx)
  else drawNations({ ctx, scale, nations })
}

/** Creates a canvas filled with a horizontal striped pattern.
 * @returns the filled HTMLCanvasElement. */
const stripesPattern = (color: string) => {
  const patternCanvas = document.createElement('canvas')
  const ctx = patternCanvas.getContext('2d')

  const canvasSideLength = 4
  patternCanvas.width = canvasSideLength
  patternCanvas.height = canvasSideLength

  const thickness = 1
  const lines = Math.floor(canvasSideLength / thickness)
  range(lines).forEach((_, i) => {
    ctx.beginPath()
    ctx.strokeStyle = i % 2 ? color : 'transparent'
    ctx.lineWidth = thickness
    const dist = thickness * (i + 0.5)
    ctx.moveTo(0, dist)
    ctx.lineTo(canvasSideLength, dist)
    ctx.stroke()
  })
  return patternCanvas
}

const drawNations = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
}) => {
  const { ctx, scale, nations } = params
  const { borders } = window.world.display
  const globalScale = scale <= map__breakpoints.global
  const drawnBorders = nations
  // nations
  ctx.lineWidth = 2
  drawnBorders.forEach(nation => {
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
  // wars
  const usedWars = new Set<number>()
  const usedRebellions = new Set<number>()
  const conflictZones = globalScale ? drawnBorders : nations
  conflictZones.forEach(nation => {
    const rebellions = nation.regions
      .map(r => {
        const province = window.world.provinces[r]
        const region = window.world.regions[province.region]
        return window.world.rebellions[region.rebellions.current]
      })
      .filter(rebellion => rebellion && rebellion.events.length > 0)
    const wars = nation.wars.current.map(w => window.world.wars[w])
    const conflicts = [...rebellions, ...wars].filter(conflict =>
      conflict.type === 'war' ? !usedWars.has(conflict.idx) : !usedRebellions.has(conflict.idx)
    )
    conflicts.forEach(conflict => {
      if (conflict.type === 'war') usedWars.add(conflict.idx)
      else if (conflict.type === 'rebellion') usedRebellions.add(conflict.idx)
      const color = conflict.type === 'war' ? 'rgba(225, 0, 0, 0.5)' : 'rgba(101, 42, 32, 0.5)'
      const pattern = ctx.createPattern(stripesPattern(color), 'repeat')
      ctx.fillStyle = pattern
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.lineCap = 'round'
      const edges = Array.from(
        new Set(
          conflict.events
            .map(e => e.provinces)
            .flat()
            .concat(conflict.nextBattle.province)
        )
      )
        .filter(p => {
          const province = window.world.provinces[p]
          if (conflict.type === 'rebellion') return true
          return province__foreignNeighbors(province).some(
            n => n.currNation === conflict.defender.idx || n.currNation === conflict.invader.idx
          )
        })
        .map(p => {
          const province = window.world.provinces[p]
          return cell__bfsNeighborhood({
            start: window.world.cells[province.cell],
            spread: cell => cell.province === province.idx
          })
        })
        .flat()
      const group = new Set(edges.map(e => e.idx))
      cells__boundary({
        cells: edges.filter(edge => !edge.isWater),
        boundary: cell => !group.has(cell.idx) || cell.isWater
      })
        .map(path => display__coastCurve()(path))
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

const drawClimates = (ctx: CanvasRenderingContext2D) => {
  const { regions } = window.world.display
  ctx.lineWidth = 1
  Object.values(regions)
    .flat()
    .forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      const color = climateLookup[window.world.regions[border.r].climate].display
      ctx.fillStyle = color
      ctx.clip(p)
      ctx.strokeStyle = color
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
}

const drawTech = (ctx: CanvasRenderingContext2D) => {
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

const drawCulture = (ctx: CanvasRenderingContext2D) => {
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

const drawReligions = (ctx: CanvasRenderingContext2D) => {
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
