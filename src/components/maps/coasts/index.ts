import { REGION } from '../../../models/regions'
import { MAP } from '../types'
import { DrawIslands } from './types'

const waves = [
  {
    strokeWidth: 0.5,
    opacity: 0.5
  },
  {
    strokeWidth: 2.5,
    opacity: 0.25
  },
  {
    strokeWidth: 5,
    opacity: 0.2
  },
  {
    strokeWidth: 8,
    opacity: 0.1
  }
]

const lakeStyle = {
  border: { color: '#d5dde0', waves: '41, 74, 84' },
  interior: { color: '#e6edef', waves: '41, 84, 94' }
}

export const COAST = {
  islands: ({ ctx, scale, nations }: DrawIslands) => {
    // const path = geoCurvePath(d3.curveCatmullRom, projection)
    const landmarks = Array.from(
      new Set(
        nations
          .map(r =>
            REGION.provinces(r)
              .map(p => Object.keys(p.islands).map(i => parseInt(i)))
              .flat()
          )
          .flat()
      )
    )
    const globalScale = scale <= MAP.breakpoints.global
    const drawnLands = globalScale
      ? Array.from(
          new Set(
            REGION.nations
              .map(r =>
                REGION.provinces(r)
                  .map(p => Object.keys(p.islands).map(i => parseInt(i)))
                  .flat()
              )
              .flat()
          )
        )
      : landmarks
    ctx.save()
    // fill the ocean
    ctx.fillStyle = MAP.oceans.color
    ctx.fillRect(0, 0, window.world.dim.w, window.world.dim.h)
    // draw coastlines
    const { islands } = window.world.display
    ctx.lineCap = 'round'
    ctx.fillStyle = '#aaa8a2'
    const mod = scale < MAP.breakpoints.regional ? 1 : 0.5
    waves.forEach(({ strokeWidth, opacity }) => {
      drawnLands.slice(0, 300).forEach(i => {
        const island = islands[i]
        ctx.strokeStyle = `rgba(${MAP.oceans.waves},${opacity})`
        ctx.lineWidth = strokeWidth * mod
        const p = new Path2D(island.path)
        ctx.stroke(p)
        ctx.fill(p)
      })
    })
    ctx.restore()
    return new Set(landmarks)
  },
  lakes: ({ ctx, scale }: DrawIslands) => {
    const drawnLands = REGION.nations
    const landmarks = Array.from(
      new Set(
        drawnLands
          .map(r =>
            REGION.provinces(r)
              .map(p => Object.keys(p.lakes).map(i => parseInt(i)))
              .flat()
          )
          .flat()
      )
    )
    const { lakes } = window.world.display
    ctx.lineCap = 'round'
    const mod = scale < MAP.breakpoints.regional ? 0.3 : 0.15
    const { border, interior } = lakeStyle
    waves.forEach(({ strokeWidth, opacity }, j) => {
      landmarks.forEach(i => {
        ctx.save()
        const lake = lakes[i]
        ctx.fillStyle = lake.border ? border.color : interior.color
        const waves = lake.border ? border.waves : interior.waves
        ctx.strokeStyle = `rgba(${waves},${opacity})`
        ctx.lineWidth = strokeWidth * mod
        const p = new Path2D(lake.path)
        ctx.clip(p)
        if (j === 0) ctx.fill(p)
        ctx.stroke(p)
        ctx.restore()
      })
    })
  }
}
