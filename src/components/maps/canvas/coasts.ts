import { world__nations } from '../../../models/regions'
import { Region } from '../../../models/regions/types'
import { canvas__breakpoints, canvas__map_styles } from './draw_styles'

const waves = [
  {
    strokeWidth: 1,
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

export const draw_oceans = (params: {
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
            .map(p => Object.keys(window.world.provinces[p].lands).map(i => parseInt(i)))
            .flat()
        )
        .flat()
    )
  )
  const global_scale = scale <= canvas__breakpoints.global
  const drawn_lands = global_scale
    ? Array.from(
        new Set(
          world__nations()
            .map(r =>
              r.provinces
                .map(p => Object.keys(window.world.provinces[p].lands).map(i => parseInt(i)))
                .flat()
            )
            .flat()
        )
      )
    : landmarks
  ctx.save()
  ctx.fillStyle = canvas__map_styles.oceans.color
  ctx.fillRect(0, 0, window.world.dim.w, window.world.dim.h)
  const { islands } = window.world.display
  ctx.lineCap = 'round'
  ctx.fillStyle = '#aaa8a2'
  const mod = scale < canvas__breakpoints.regional ? 1 : 0.5
  waves.forEach(({ strokeWidth, opacity }) => {
    drawn_lands.forEach(i => {
      const island = islands[i]
      ctx.strokeStyle = `rgba(${canvas__map_styles.oceans.waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      const p = new Path2D(island.d)
      ctx.stroke(p)
      ctx.fill(p)
    })
  })
  ctx.restore()
  return new Set(landmarks)
}

export const draw_lakes = (params: {
  ctx: CanvasRenderingContext2D
  scale: number
  nations: Region[]
}) => {
  const { ctx, scale, nations } = params
  const global_scale = scale <= canvas__breakpoints.global
  const drawn_lands = global_scale ? world__nations() : nations
  const landmarks = Array.from(
    new Set(
      drawn_lands
        .map(r =>
          r.provinces
            .map(p => Object.keys(window.world.provinces[p].lakes).map(i => parseInt(i)))
            .flat()
        )
        .flat()
    )
  )
  const { lakes } = window.world.display
  ctx.lineCap = 'round'
  const mod = scale < canvas__breakpoints.regional ? 0.3 : 0.15
  const { border, interior } = canvas__map_styles.lakes
  waves.forEach(({ strokeWidth, opacity }, j) => {
    landmarks.forEach(i => {
      ctx.save()
      const lake = lakes[i]
      ctx.fillStyle = lake.border ? border.color : interior.color
      const waves = lake.border ? border.waves : interior.waves
      ctx.strokeStyle = `rgba(${waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      const p = new Path2D(lake.d)
      ctx.clip(p)
      if (j === 0) ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    })
  })
}
