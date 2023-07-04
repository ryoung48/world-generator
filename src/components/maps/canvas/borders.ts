import { region__nation } from '../../../models/regions'
import { governments, Region } from '../../../models/regions/types'
import { colors__randomPreset } from '../../../models/utilities/colors'
import { cell__bfsNeighborhood, cells__boundary } from '../../../models/world/cells'
import { climates } from '../../../models/world/climate/types'
import { display__coastCurve } from '../../../models/world/spawn/shapers/display/coasts'
import { MapStyle } from '../types'

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

const drawRegions = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
  style: MapStyle
}) => {
  const { ctx, scale, nations: drawnBorders, style } = params
  const { borders, regions } = window.world.display
  const regionStyle = style === 'Nations'
  // nations
  if (regionStyle) {
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
  }
  const governmentColors = colors__randomPreset({
    tags: [...governments],
    seed: `government`
  })
  // regions
  ctx.lineWidth = 0.5
  if (style !== 'Government') {
    window.world.regions.forEach(region => {
      const nation = region__nation(region)
      const base = regionStyle
        ? region.colors
        : style === 'Cultures'
        ? window.world.cultures[region.culture.native].display
        : style === 'Religions'
        ? window.world.religions[region.religion].display
        : style === 'Climate'
        ? climates[region.climate].display
        : governmentColors[nation.government]
      const color = base.replace('%)', '%, 0.25)')
      ctx.fillStyle = color.replace('%)', '%, 0.25)')
      ctx.strokeStyle = color.replace('%)', '%, 0.15)')
      regions[region.idx].forEach(border => {
        ctx.save()
        const p = new Path2D(border.d)
        ctx.clip(p)
        ctx.fill(p)
        regionStyle && ctx.stroke(p)
        ctx.restore()
      })
    })
  } else {
    window.world.regions
      .filter(region => region.provinces.length > 0)
      .forEach(nation => {
        ctx.fillStyle = governmentColors[nation.government].replace('%)', '%, 0.25)')
        borders[nation.idx].forEach(border => {
          ctx.save()
          const p = new Path2D(border.d)
          ctx.clip(p)
          ctx.fill(p)
          ctx.restore()
        })
      })
  }
  // nations
  ctx.lineWidth = 2
  if (regionStyle) {
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
  }
}

// const cultureBorder = (idx: number) => {
//   const { origin } = window.world.cultures[idx]
//   const region = window.world.regions[origin]
//   const capital = window.world.provinces[region.capital]
//   const start = window.world.cells[capital.cell]
//   const border = cell__bfsNeighborhood({
//     start,
//     spread: cell => cell__culture(cell) === idx
//   }).filter(p => !p.isWater && (cell__isCultureBorder(p) || p.isCoast))
//   const paths = cells__boundary({
//     cells: border,
//     boundary: cell => cell__culture(cell) !== idx || cell.isWater
//   }).map(path => display__coastCurve()(path))
//   return paths
// }

// const drawCultures = (params: {
//   ctx: CanvasRenderingContext2D
//   scale: number
//   nations: Region[]
// }) => {
//   const { ctx, scale, nations } = params
//   const { regions } = window.world.display
//   const cultures = Array.from(new Set(nations.map(nation => nation.culture.native))).map(
//     c => window.world.cultures[c]
//   )
//   // nations
//   ctx.lineWidth = 2
//   cultures.forEach(culture => {
//     const borders = cultureBorder(culture.idx)
//     ctx.fillStyle = '#f7eedc'
//     borders.forEach(border => {
//       ctx.save()
//       const p = new Path2D(border)
//       ctx.clip(p)
//       ctx.strokeStyle = culture.display.replace('%)', '%, 0.75)')
//       ctx.fill(p)
//       ctx.restore()
//     })
//   })
//   // regions
//   ctx.lineWidth = 0
//   window.world.regions.forEach(region => {
//     const color = window.world.cultures[region.culture.native].display
//     ctx.fillStyle = color.replace('%)', '%, 0.25)')
//     regions[region.idx].forEach(border => {
//       ctx.save()
//       const p = new Path2D(border.d)
//       ctx.clip(p)
//       ctx.fill(p)
//       // ctx.stroke(p)
//       ctx.restore()
//     })
//   })
//   // nations
//   ctx.lineWidth = 2
//   cultures.forEach(culture => {
//     const borders = cultureBorder(culture.idx)
//     borders.forEach(border => {
//       ctx.save()
//       const p = new Path2D(border)
//       ctx.clip(p)
//       ctx.filter = `blur(${scale}px)`
//       ctx.strokeStyle = culture.display.replace('%)', '%, 0.75)')
//       ctx.stroke(p)
//       ctx.restore()
//     })
//   })
// }

export const map__drawRegions = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
  style: MapStyle
}) => {
  const { ctx, scale, nations, style } = params
  // const globalScale = scale <= map__breakpoints.global
  const drawnBorders = nations
  // nations
  drawRegions({ ctx, scale, nations: drawnBorders, style })
  // drawCultures({ ctx, scale, nations: drawnBorders })
  // wars
  if (style !== 'Nations') return
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
