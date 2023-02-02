import { Region } from '../../../models/regions/types'
import { cell__bfsNeighborhood, cells__boundary } from '../../../models/world/cells'
import { display__coastCurve } from '../../../models/world/spawn/shapers/display/coasts'

const contested = 'rgba(225, 0, 0, 0.4)'

const stripesPattern = (ctx: CanvasRenderingContext2D) => {
  const color1 = 'transparent'
  const color2 = contested
  const thickness = 1
  const numberOfStripes = ctx.canvas.height / thickness
  ctx.lineWidth = thickness * 0.75
  for (let i = 0; i < numberOfStripes * 2; i++) {
    ctx.beginPath()
    ctx.strokeStyle = i % 2 ? color1 : color2
    const x = i * thickness + thickness / 2
    const path = new Path2D(`M${x - ctx.canvas.height} 0 L${x} ${ctx.canvas.height} Z`)
    ctx.stroke(path)
  }
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
      ctx.strokeStyle = window.world.regions[border.r].colors.replace('%)', '%, 0.75)')
      ctx.fill(p)
      ctx.restore()
    })
  })
  // regions
  ctx.lineWidth = 0.5
  window.world.regions.forEach(region => {
    ctx.fillStyle = region.colors.replace('%)', '%, 0.25)')
    ctx.strokeStyle = region.colors.replace('%)', '%, 0.15)')
    regions[region.idx].forEach(border => {
      ctx.save()
      const p = new Path2D(border.d)
      ctx.clip(p)
      ctx.fill(p)
      ctx.stroke(p)
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
  ctx.lineCap = 'round'
  const conflictZones = new Set(drawnBorders.map(region => region.idx))
  window.world.conflicts
    .filter(conflict => conflict.regions.some(r => conflictZones.has(r)))
    .forEach(conflict => {
      const edges = conflict.provinces
        .map(p => window.world.provinces[p])
        .filter(province => nations.includes(window.world.regions[province.nation]))
        .map(province => {
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
          ctx.setLineDash([])
          stripesPattern(ctx)
          ctx.restore()
        })
    })
}
