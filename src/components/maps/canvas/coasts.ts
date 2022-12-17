import { world__nations } from '../../../models/regions'
import { Region } from '../../../models/regions/types'
import { map__breakpoints, map__styles } from './draw_styles'

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

export const map__drawOceans = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
}) => {
  const { ctx, scale, nations } = params
  const landmarks = Array.from(
    new Set(
      nations
        .map(r =>
          r.provinces
            .map(p => Object.keys(window.world.provinces[p].islands).map(i => parseInt(i)))
            .flat()
        )
        .flat()
    )
  )
  const globalScale = scale <= map__breakpoints.global
  const drawnLands = globalScale
    ? Array.from(
        new Set(
          world__nations()
            .map(r =>
              r.provinces
                .map(p => Object.keys(window.world.provinces[p].islands).map(i => parseInt(i)))
                .flat()
            )
            .flat()
        )
      )
    : landmarks
  ctx.save()
  ctx.fillStyle = map__styles.oceans.color
  ctx.fillRect(0, 0, window.world.dim.w, window.world.dim.h)
  const { islands } = window.world.display
  ctx.lineCap = 'round'
  ctx.fillStyle = '#aaa8a2'
  const mod = scale < map__breakpoints.regional ? 1 : 0.5
  waves.forEach(({ strokeWidth, opacity }) => {
    drawnLands.forEach(i => {
      const island = islands[i]
      ctx.strokeStyle = `rgba(${map__styles.oceans.waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      const p = new Path2D(island.d)
      ctx.stroke(p)
      ctx.fill(p)
    })
  })
  ctx.restore()
  return new Set(landmarks)
}
