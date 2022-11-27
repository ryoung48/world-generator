import { range } from 'd3'

import { province__foreignNeighbors } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { cell__bfsNeighborhood, cells__boundary } from '../../../models/world/cells'
import { display__coastCurve } from '../../../models/world/spawn/shapers/display/coasts'
import { map__breakpoints } from './draw_styles'

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
