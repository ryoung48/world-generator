import { range } from 'd3'

import { region__domains } from '../../../models/regions'
import { Region } from '../../../models/regions/types'
import { cell__bfsNeighborhood, cells__boundary } from '../../../models/world/cells'
import { display__coastCurve } from '../../../models/world/spawn/shapers/display/coasts'

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

export const map__drawRegions = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
}) => {
  const { ctx, scale, nations } = params
  const { borders, regions } = window.world.display
  // const globalScale = scale <= map__breakpoints.global
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
      ctx.restore()
    })
  })
  // regions
  nations
    .map(region__domains)
    .flat()
    .forEach(region => {
      ctx.fillStyle = region.colors.replace('%)', '%, 0.15)')
      regions[region.idx].forEach(border => {
        ctx.save()
        const p = new Path2D(border.d)
        ctx.clip(p)
        ctx.fill(p)
        ctx.restore()
      })
    })
  // nations
  ctx.lineWidth = 2
  drawnBorders.forEach(nation => {
    borders[nation.idx].forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      ctx.clip(p)
      ctx.filter = `blur(${scale}px)`
      ctx.strokeStyle = window.world.regions[border.r].colors.replace('%)', '%, 0.75)')
      ctx.stroke(p)
      ctx.restore()
    })
  })
  // wars
  const conflictZones = new Set(drawnBorders.map(region => region.idx))
  window.world.conflicts
    .filter(conflict => conflict.regions.some(r => conflictZones.has(r)))
    .forEach(conflict => {
      const color = conflict.type === 'war' ? 'rgba(225, 0, 0, 0.5)' : 'rgba(101, 42, 32, 0.5)'
      const pattern = ctx.createPattern(stripesPattern(color), 'repeat')
      ctx.fillStyle = pattern
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.lineCap = 'round'
      const edges = conflict.provinces
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
}
