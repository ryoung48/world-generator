import * as turf from '@turf/turf'
import { geoInterpolate, scaleLinear } from 'd3'

import { GEOGRAPHY } from '../../../models/cells/geography'
import { SHAPER_DISPLAY } from '../../../models/shapers/display'
import { World } from '../../../models/types'
import { PERFORMANCE } from '../../../models/utilities/performance'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { DrawMapParams } from '../shapes/types'
import { DrawOceanParams } from './types'

const styles = {
  lakes: { color: MAP_SHAPES.color.water.fresh, waves: '41, 84, 94' },
  oceans: { color: MAP_SHAPES.color.water.salt, waves: '88, 103, 117' },
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

const oceanBorder = PERFORMANCE.memoize.decorate({
  f: (ocean: World['oceanRegions'][number]) => {
    return SHAPER_DISPLAY.borders.oceanic([ocean])
  },
  keyBuilder: ocean => ocean.idx.toString()
})

export const DRAW_LANDMARKS = {
  oceans: ({ ctx, projection }: DrawOceanParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    const drawnLands = GEOGRAPHY.landmarks('land')
    ctx.save()
    // fill the ocean
    ctx.fillStyle = styles.oceans.color
    ctx.beginPath()
    ctx.fill(new Path2D(path({ type: 'Sphere' })))
    // sea ice extent
    const extent = (type: 'permanent sea ice' | 'seasonal sea ice') => {
      ctx.fillStyle =
        type === 'permanent sea ice'
          ? MAP_SHAPES.color.water.seaIce.permanent
          : MAP_SHAPES.color.water.seaIce.seasonal
      window.world.oceanRegions
        .filter(region => region.feature === type)
        .forEach(ocean => {
          const border = oceanBorder(ocean)
          const geojson = turf.multiLineString(border)
          const extentPath = new Path2D(path(geojson))
          ctx.fill(extentPath)
        })
    }
    extent('seasonal sea ice')
    extent('permanent sea ice')
    // draw ocean boundaries
    // window.world.oceanRegions.forEach(region => {
    //   const border = SHAPER_DISPLAY.borders.oceanic([region])
    //   const geojson = turf.multiLineString(border)
    //   const extentPath = new Path2D(path(geojson))
    //   ctx.strokeStyle = 'hsla(0, 0%, 0%, 0.5)'
    //   ctx.stroke(extentPath)
    // })
    // draw coastlines
    const mod = scale
    ctx.lineCap = 'round'
    const curved = MAP_SHAPES.path.curveClosed(projection)
    styles.waves.forEach(({ strokeWidth, opacity }) => {
      ctx.strokeStyle = `rgba(${styles.oceans.waves},${opacity})`
      ctx.lineWidth = strokeWidth * mod
      drawnLands.forEach(i => {
        ctx.stroke(DRAW_CACHE.paths.island({ idx: i, path: curved }))
      })
    })
    ctx.restore()
    // ctx.save()
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    // ctx.textAlign = 'center'
    // const oceans = window.world.oceanRegions.reduce((acc, region) => {
    //   if (!acc.has(region.ocean)) acc.set(region.ocean, [])
    //   acc.get(region.ocean)?.push(region.idx)
    //   return acc
    // }, new Map<number, number[]>())
    // oceans.forEach(regions => {
    //   const oceans = regions.map(r => window.world.oceanRegions[r])
    //   const points = turf.points(
    //     oceans
    //       .map(r => window.world.cells[r.cell])
    //       .map((cell, j) => {
    //         j === 0 && GEOGRAPHY.landmark(cell)
    //         return [cell.x, cell.y]
    //       })
    //   )
    //   const sea = oceans[0].type === 'sea'
    //   ctx.font = `${scale * (sea ? 4 : 12)}px ${fonts.maps}`
    //   const center = geoCentroid(points)
    //   let threshold = sea ? 6 : 20
    //   let found = -1
    //   const cells = oceans.map(r => r.cells.map(c => window.world.cells[c])).flat()
    //   while (found === -1) {
    //     const prospects = cells.filter(cell => cell.landDist > threshold)
    //     const bestProspect = prospects.reduce(
    //       (max, curr) => {
    //         const dist = MATH.distance.geoCheap(center, [curr.x, curr.y])
    //         return max.dist < dist
    //           ? max
    //           : { cell: [curr.x, curr.y] as [number, number], dist, idx: curr.idx }
    //       },
    //       { cell: center, dist: Infinity, idx: -1 }
    //     )
    //     found = bestProspect.idx
    //     threshold -= 1
    //   }
    //   const cell = window.world.cells[found]
    //   const label = path.centroid(turf.point([cell.x, cell.y]))
    //   ctx.fillText(
    //     `${GEOGRAPHY.landmark(cell).replace(/\(.*\)/, '')} ${sea ? 'Sea' : 'Ocean'}`,
    //     label[0],
    //     label[1]
    //   )
    // })
    // ctx.restore()
    return new Set(drawnLands)
  },
  lakes: ({ ctx, projection }: DrawOceanParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.curveClosed(projection)
    const drawnLakes = GEOGRAPHY.landmarks('water').filter(
      i => window.world.landmarks[i].type !== 'ocean'
    )
    const { lakes } = window.world.display
    ctx.lineCap = 'round'
    const mod = scale
    const cache: Record<number, Path2D> = {}
    styles.waves.forEach(({ strokeWidth, opacity }, j) => {
      ctx.lineWidth = strokeWidth * mod * 0.5
      drawnLakes.forEach(i => {
        ctx.save()
        const lake = lakes[i]
        if (!cache[i])
          cache[i] = MAP_SHAPES.polygon({ points: lake.path, path, direction: 'inner' })
        ctx.fillStyle =
          window.world.landmarks[i].type === 'salt flat' ? '#fffbea' : styles.lakes.color
        const waves = styles.lakes.waves
        ctx.strokeStyle = `rgba(${waves},${opacity})`
        ctx.clip(cache[i])
        if (j === 0) {
          ctx.fill(cache[i])
        }
        ctx.stroke(cache[i])
        ctx.restore()
      })
    })
  },
  rivers: ({ ctx, projection }: DrawMapParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.curve(projection)
    ctx.lineCap = 'round'
    ctx.strokeStyle = MAP_SHAPES.river.color(0.4)
    ctx.lineWidth = 0.25 * scale
    const maxWidth = scaleLinear([1, 25], [0.1, 0.4])
    const rivers = Object.values(window.world.rivers)
    rivers.forEach(river => {
      const max = maxWidth(river.segments.length)
      const riverWidth = scaleLinear([0, river.segments.length], [0.05, max])
      river.segments
        .map((s, i) => {
          const prev = river.segments[i - 1] ?? []
          const next = river.segments[i + 1] ?? []
          const segment = prev.concat(s).concat(next)
          return segment
        })
        .forEach((s, i) => {
          ctx.lineWidth = riverWidth(i) * scale
          let segment = path(turf.lineString(s))
          if (i === river.segments.length - 1) {
            const [start, end] = s.splice(-2, 2)
            const buffer = geoInterpolate(start, end)(0.99)
            segment = path(turf.lineString([...s, start, buffer, end]))
          }
          ctx.stroke(new Path2D(segment))
        })
    })
  }
}
