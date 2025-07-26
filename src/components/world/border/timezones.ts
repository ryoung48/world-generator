import { GeoProjection } from 'd3'

import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { MAP_METRICS } from '../shapes/metrics'

// Cache of longitudinal band paths keyed by projection parameters so we can
// avoid the expensive geo calculations on every repaint. Each entry maps to
// an array of Path2D objects (one for each lon-band for the given step).
//
let LON_BAND_CACHE: Path2D[] = null

export function paintLonBands({
  ctx,
  projection
}: {
  ctx: CanvasRenderingContext2D
  projection: GeoProjection
}) {
  // Determine the step size for the current zoom level (clamped between 2–30°)
  const step = 15

  // Retrieve or lazily compute the Path2D objects for each longitudinal band.
  let bandPaths = LON_BAND_CACHE
  if (!bandPaths) {
    bandPaths = []

    const pathGen = MAP_SHAPES.path.linear(projection)

    let start = window.world.meridian - 7.5

    for (let i = 0; i < 24; i++) {
      const lon = ((start + i * step + 540) % 360) - 180
      const poly = MAP_SHAPES.polygon({
        direction: 'inner',
        path: pathGen,
        points: [
          [lon, 0], // equator, western edge
          [lon, 90], // up to North Pole along western meridian
          [lon + step, 90], // down to equator, eastern edge
          [lon + step, 0], // down to equator, eastern edge
          [lon, -90], // down to South Pole along western meridian
          [lon, 0] // close ring (along equator back west)
        ]
      })

      bandPaths.push(poly)
    }

    LON_BAND_CACHE = bandPaths
  }

  // Paint the cached bands onto the current clipped context.
  bandPaths.forEach((bandPath, idx) => {
    const i = idx > 12 ? 24 - idx : idx
    ctx.fillStyle = i % 2 === 0 ? MAP_METRICS.timezone.colors.even : MAP_METRICS.timezone.colors.odd
    ctx.fill(bandPath)
  })
}

export const DRAW_TIMEZONES = {
  land: ({ ctx, projection }: { ctx: CanvasRenderingContext2D; projection: GeoProjection }) => {
    LON_BAND_CACHE = null
    // base timezones
    const path = MAP_SHAPES.path.linear(projection)
    const scale = MAP_SHAPES.scale.derived(projection)
    // unified timezones
    window.world.provinces.forEach(p => {
      const base = MAP_METRICS.timezone.color(Math.floor(p.timezone?.offset ?? 0))
      DRAW_CACHE.paths.province({ province: p, path }).forEach(p => {
        ctx.fillStyle = base
        ctx.fill(p)
      })
    })
    // partial timezones
    const mask = MAP_SHAPES.patterns.stripes({
      ctx,
      scale,
      color: 'black'
    })
    const timezones: Record<number, CanvasPattern> = {}
    window.world.provinces
      .filter(p => p.timezone?.offset !== undefined && p.timezone?.offset % 1 !== 0)
      .forEach(p => {
        const tz = Math.abs(Math.ceil(p.timezone?.offset ?? 0))
        if (!timezones[tz]) {
          const pattern = MAP_SHAPES.patterns.masked({
            ctx,
            mask,
            color: MAP_METRICS.timezone.color(tz)
          })
          timezones[tz] = ctx.createPattern(pattern, 'repeat')
        }
        DRAW_CACHE.paths.province({ province: p, path }).forEach(p => {
          ctx.fillStyle = timezones[tz]
          ctx.fill(p)
        })
      })
  }
}
