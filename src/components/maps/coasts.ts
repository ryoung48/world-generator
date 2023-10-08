import { WORLD } from '../../models/world'
import { MAP } from './common'
import { DrawMapParams } from './common/types'

const styles = {
  lakes: {
    border: { color: '#d5dde0', waves: '41, 74, 84' },
    interior: { color: '#e6edef', waves: '41, 84, 94' }
  },
  oceans: {
    color: '#e6edef',
    waves: '88, 103, 117'
  },
  waves: [
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
}

export const DRAW_LANDMARKS = {
  islands: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.curveClosed(projection)
    const drawnLands = WORLD.features('land')
    ctx.save()
    // fill the ocean
    ctx.fillStyle = styles.oceans.color
    ctx.beginPath()
    ctx.fill(new Path2D(path({ type: 'Sphere' })))
    // draw coastlines
    const mod = scale
    const { islands } = window.world.display
    ctx.lineCap = 'round'
    ctx.fillStyle = '#aaa8a2'
    styles.waves.forEach(({ strokeWidth, opacity }) => {
      drawnLands.forEach(i => {
        const island = islands[i]
        ctx.strokeStyle = `rgba(${styles.oceans.waves},${opacity})`
        ctx.lineWidth = strokeWidth * mod
        const p = MAP.polygon({ points: island.path, path, direction: 'inner' })
        ctx.stroke(p)
      })
    })
    drawnLands.forEach(i => {
      const { opacity, strokeWidth } = styles.waves[0]
      ctx.strokeStyle = `rgba(${styles.oceans.waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      const p = MAP.polygon({ points: islands[i].path, path, direction: 'inner' })
      ctx.fill(p)
      ctx.stroke(p)
    })
    ctx.restore()
    return new Set(drawnLands)
  },
  lakes: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.curveClosed(projection)
    const drawnLakes = WORLD.features('water').filter(
      i => window.world.landmarks[i].type !== 'ocean'
    )
    const { lakes } = window.world.display
    ctx.lineCap = 'round'
    const mod = scale
    const { border, interior } = styles.lakes
    styles.waves.forEach(({ strokeWidth, opacity }, j) => {
      drawnLakes.forEach(i => {
        ctx.save()
        const lake = lakes[i]
        ctx.fillStyle = lake.border ? border.color : interior.color
        const waves = lake.border ? border.waves : interior.waves
        ctx.strokeStyle = `rgba(${waves},${opacity})`
        ctx.lineWidth = strokeWidth * mod
        const p = MAP.polygon({ points: lake.path, path, direction: 'inner' })
        ctx.clip(p)
        if (j === 0) ctx.fill(p)
        ctx.stroke(p)
        ctx.restore()
      })
    })
  }
}
