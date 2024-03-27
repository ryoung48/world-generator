import { WORLD } from '../../../models'
import { Cell } from '../../../models/cells/types'
import { WEATHER } from '../../../models/cells/weather'
import { DISPLAY } from '../../../models/shapers/display'
import { MAP } from '../common'
import { DrawMapParams } from '../common/types'
import { DrawOceanParams } from './types'

const styles = {
  lakes: {
    border: { color: '#d5dde0', waves: '41, 74, 84' },
    interior: { color: '#e6edef', waves: '41, 84, 94' }
  },
  oceans: {
    color: '#cbd9db',
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

const seaIce = (month: number) =>
  window.world.oceanRegions.filter(region => {
    const cell = window.world.cells[region.cell]
    const temp = WEATHER.heat({ cell, month })
    return temp <= 0
  })

const _iceCache: Record<number, [number, number][][][]> = {}

export const DRAW_LANDMARKS = {
  oceans: ({ ctx, projection, month }: DrawOceanParams) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.linear(projection)
    const drawnLands = WORLD.features('land')
    ctx.save()
    // fill the ocean
    ctx.fillStyle = styles.oceans.color
    ctx.beginPath()
    ctx.fill(new Path2D(path({ type: 'Sphere' })))
    // fill sea ice
    ctx.lineCap = 'round'
    ctx.fillStyle = '#e3f1f2'
    seaIce(month).forEach(region => {
      if (!_iceCache[region.idx]) _iceCache[region.idx] = DISPLAY.borders.oceanRegions([region])
      _iceCache[region.idx].forEach(borders => {
        borders.slice(0, 1).forEach(border => {
          ctx.save()
          const p = MAP.polygon({ points: border, path, direction: 'inner' })
          ctx.clip(p)
          ctx.fill(p)
          ctx.restore()
        })
      })
    })
    // sea ice extent
    const dashes = [0.5 * scale, 1 * scale]
    ctx.lineCap = 'butt'
    ctx.setLineDash(dashes)
    const summer = { color: 'red', monthN: 6, monthS: 0 }
    const winter = { color: 'blue', monthN: 0, monthS: 6 }
    const hemisphere = { north: (cell: Cell) => cell.y >= 0, south: (cell: Cell) => cell.y < 0 }
    const extent = (m: number, color: string, filter: (_cell: Cell) => boolean) => {
      const regions = seaIce(m)
      const filtered = DISPLAY.borders.seaIceExtent(
        regions.filter(r => filter(window.world.cells[r.cell]))
      )
      ctx.strokeStyle = color
      const extentPath = path(MAP.geojson.multiline(filtered))
      ctx.stroke(new Path2D(extentPath))
    }
    extent(summer.monthN, summer.color, hemisphere.north)
    extent(summer.monthS, summer.color, hemisphere.south)
    extent(winter.monthN, winter.color, hemisphere.north)
    extent(winter.monthS, winter.color, hemisphere.south)
    ctx.setLineDash([])
    // draw coastlines
    const mod = scale
    const { islands } = window.world.display
    ctx.lineCap = 'round'
    ctx.fillStyle = '#aaa8a2'
    const cache: Record<number, Path2D> = {}
    styles.waves.forEach(({ strokeWidth, opacity }) => {
      ctx.strokeStyle = `rgba(${styles.oceans.waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      drawnLands.forEach(i => {
        if (!cache[i]) {
          const island = islands[i]
          cache[i] = MAP.polygon({ points: island.path, path, direction: 'inner' })
        }
        ctx.stroke(cache[i])
      })
    })
    const { opacity, strokeWidth } = styles.waves[0]
    ctx.strokeStyle = `rgba(${styles.oceans.waves},${opacity})`
    ctx.lineWidth = strokeWidth * mod
    drawnLands.forEach(i => {
      ctx.fill(cache[i])
      ctx.stroke(cache[i])
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
    const cache: Record<number, Path2D> = {}
    styles.waves.forEach(({ strokeWidth, opacity }, j) => {
      ctx.lineWidth = strokeWidth * mod
      drawnLakes.forEach(i => {
        ctx.save()
        const lake = lakes[i]
        if (!cache[i]) cache[i] = MAP.polygon({ points: lake.path, path, direction: 'inner' })
        ctx.fillStyle = lake.border ? border.color : interior.color
        const waves = lake.border ? border.waves : interior.waves
        ctx.strokeStyle = `rgba(${waves},${opacity})`
        ctx.clip(cache[i])
        if (j === 0) ctx.fill(cache[i])
        ctx.stroke(cache[i])
        ctx.restore()
      })
    })
  },
  rivers: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP.scale.derived(projection)
    const path = MAP.path.curve(projection)
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#407f96'
    ctx.lineWidth = 0.25 * scale
    // const maxWidth = scaleLinear([1, 25], [0.2, 0.8])
    // window.world.rivers.forEach(river => {
    //   const max = maxWidth(river.segments.length)
    //   const riverWidth = scaleLinear([0, river.segments.length], [0.2, max])
    //   if (river.idx === 0) console.log(river)
    //   river.segments
    //     .map((s, i) => {
    //       const prev = river.segments[i - 1] ?? []
    //       const next = river.segments[i + 1] ?? []
    //       return prev.concat(s).concat(next)
    //     })
    //     .forEach((s, i) => {
    //       ctx.lineWidth = riverWidth(i) * scale
    //       const segment = path(MAP.geojson.line(s))
    //       ctx.stroke(new Path2D(segment))
    //     })
    // })

    const rivers = path(MAP.geojson.multiline(window.world.rivers.map(r => r.segments.flat())))
    ctx.stroke(new Path2D(rivers))

    // 9srd99qn8v

    // const segments = window.world.rivers
    //   .map(r =>
    //     r.segments.map(s => {
    //       const geo = MAP.geojson.point({
    //         x: s[0],
    //         y: s[1]
    //       })
    //       geo.properties = { idx: r.idx, p: s }
    //       return geo
    //     })
    //   )
    //   .flat()
    // ctx.fillStyle = 'white'
    // ctx.fill(new Path2D(path(MAP.geojson.features(segments))))
    // ctx.fillStyle = 'black'
    // const fontFamily = fonts.maps
    // segments.forEach(seg => {
    //   const center = path.centroid(MAP.geojson.features([seg]))
    //   ctx.font = 1 * scale + 'px ' + fontFamily
    //   ctx.fillText(seg.properties.idx, center[0], center[1])
    // })
  }
}
