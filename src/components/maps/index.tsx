import { Grid } from '@mui/material'
import { pointer, select, zoom, ZoomTransform } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { view__context } from '../../context'
import { region__neighbors } from '../../models/regions'
import { Loc } from '../../models/regions/locations/types'
import { province__hub, province__neighbors } from '../../models/regions/provinces'
import { point__distance } from '../../models/utilities/math/points'
import { delay } from '../../models/utilities/math/time'
import { cell__nation } from '../../models/world/cells'
import { css_colors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { draw_regions } from './canvas/borders'
import { draw_lakes, draw_oceans } from './canvas/coasts'
import { canvas__breakpoints } from './canvas/draw_styles'
import {
  draw_avatar_location,
  draw_locations,
  draw_locations_regional,
  draw_roads
} from './canvas/infrastructure'
import { icon_path } from './icons'
import { location__icons } from './icons/locations'
import { draw_terrain_icons, terrain__icons } from './icons/terrain'

type CachedImages = Record<string, HTMLImageElement>

const load_image = (path: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = path
  })
}

const load_images = async () =>
  (
    await Promise.all([
      ...Object.entries(terrain__icons).map(async ([k, v]) => ({
        img: await load_image(icon_path + v.path),
        index: k
      })),
      ...Object.entries(location__icons).map(async ([k, v]) => ({
        img: await load_image(icon_path + v.path),
        index: k
      }))
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})

const paint = (params: {
  scale: number
  cached_images: CachedImages
  loc: Loc
  ctx: CanvasRenderingContext2D
}) => {
  const { scale, cached_images, loc, ctx } = params
  const province = window.world.provinces[loc.province]
  const nation = window.world.regions[province.curr_nation]
  const borders = region__neighbors(nation).map(r => window.world.regions[r])
  const nations = [nation].concat(borders)
  const nation_set = new Set(nations.map(n => n.idx))
  const expanded = new Set(
    nations
      .map(r =>
        r.regions
          .map(p => {
            const province = window.world.provinces[p]
            const region = window.world.regions[province.region]
            return [region.idx, ...region.borders]
          })
          .flat()
      )
      .flat()
  )
  const lands = draw_oceans({ ctx, scale, nations })
  draw_regions({ ctx, style: 'Nations', scale, nations })
  draw_lakes({ ctx, scale, nations })
  draw_roads({ ctx, scale, nation_set })
  draw_terrain_icons({ ctx, cached_images, scale, regions: expanded, lands })
  draw_avatar_location({ ctx, loc, scale })
  draw_locations_regional({ ctx, scale, nation_set, cached_images })
  draw_locations({ ctx, scale, province, cached_images })
}

export function WorldMap() {
  const { state, dispatch } = view__context()
  const [cached_images, set_cached_images] = useState<CachedImages>({})
  const [transform, set_transform] = useState({
    dx: 0,
    dy: 0,
    scale: 1
  })
  const [zoom_controller, set_zoom] = useState({ zoom: zoom() })
  const [cursor, set_cursor] = useState({ x: 0, y: 0 })
  const [init, set_init] = useState(false)
  const canvas_ref = useRef<HTMLCanvasElement>(null)
  const container_ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const init = async () => {
      const canvas = canvas_ref.current
      const ctx = canvas.getContext('2d')
      // images
      const loaded_images = await load_images()
      set_cached_images(loaded_images)
      // font
      ctx.font = `4px ${fonts.maps}`
      ctx.fillText('text', 0, 8)
      await delay(50)
      // pan & zoom
      const controller = zoom()
        .scaleExtent([1, 200])
        .translateExtent([
          [0, 0],
          [window.world.dim.w, window.world.dim.h]
        ])
        .on('zoom', (event: { transform: ZoomTransform }) => {
          const { x, y, k } = event.transform
          set_transform({
            scale: k,
            dx: x,
            dy: y
          })
        })
      const node = select(canvas) as any
      node.call(controller)
      set_zoom({ zoom: controller })
      // initial zoom
      const nation = window.world.regions[state.codex.nation]
      const capital = window.world.provinces[nation.capital]
      const hub = province__hub(capital)
      dispatch({
        type: 'update gps',
        payload: {
          gps: {
            y: hub.y,
            x: hub.x,
            zoom: 10
          }
        }
      })
    }
    init()
  }, [])
  useEffect(() => {
    const { x, y, zoom } = state.gps
    if (zoom_controller && zoom > 0) {
      const canvas = canvas_ref.current
      const node = select(canvas) as any
      zoom_controller.zoom.scaleTo(node, zoom)
      zoom_controller.zoom.translateTo(node, x, y)
      set_init(true)
    }
  }, [state.gps, zoom_controller])
  useEffect(() => {
    if (Object.keys(cached_images).length > 0 && init) {
      const canvas = canvas_ref.current
      canvas.width = container_ref.current.clientWidth
      canvas.height = container_ref.current.clientHeight
      const ctx = canvas.getContext('2d')
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.translate(transform.dx, transform.dy)
      ctx.scale(transform.scale, transform.scale)
      const loc = window.world.locations[state.codex.location]
      paint({
        scale: transform.scale,
        cached_images,
        loc,
        ctx
      })
      ctx.restore()
    }
  }, [cached_images, transform, state, init])
  return (
    <Grid container>
      {/* <Grid.Col span={3} py={0}></Grid.Col> */}
      <Grid item xs={12} ref={container_ref} pb={0}>
        <canvas
          ref={canvas_ref}
          style={{
            backgroundColor: css_colors.background.map,
            border: `thick double ${css_colors.primary}`,
            filter: 'contrast(0.9) sepia(0.3) url(#noiseFilter)',
            height: `${window.world.dim.h}px`,
            width: `100%`
          }}
          onMouseMove={event => {
            const [clientX, clientY] = pointer(event)
            const nx = (clientX - transform.dx) / transform.scale
            const ny = (clientY - transform.dy) / transform.scale
            set_cursor({ x: nx, y: ny })
          }}
          onClick={() => {
            const cell = window.world.diagram.delaunay.find(cursor.x, cursor.y)
            const poly = window.world.cells[cell]
            const province = window.world.provinces[poly.province]
            const provinces = [province].concat(province__neighbors(province))
            const prospects = provinces
              .map(prov => prov.locations.map(l => window.world.locations[l]))
              .flat()
            const hub = province__hub(province)
            const nation = cell__nation(poly)
            const local_scale = transform.scale > canvas__breakpoints.regional
            const global_scale = transform.scale <= canvas__breakpoints.global
            const local = (state.codex.current === 'location' && !global_scale) || local_scale
            const { loc } =
              state.codex.current === 'location' && local_scale
                ? prospects.reduce(
                    (closest, curr) => {
                      const dist = point__distance({ points: [curr, { x: cursor.x, y: cursor.y }] })
                      return dist < closest.dist ? { loc: curr, dist } : closest
                    },
                    { loc: undefined, dist: Infinity }
                  )
                : { loc: hub }

            const current = local ? 'location' : 'nation'
            dispatch({
              type: 'update codex',
              payload: {
                target: current === 'location' ? loc : window.world.regions[nation],
                disable_zoom: true
              }
            })
          }}
        ></canvas>
        {/* https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ */}
        <svg height='0'>
          <filter id='noiseFilter' x='0%' y='0%' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.02' result='noise' numOctaves='5' />
            <feDiffuseLighting in='noise' lightingColor='white' result='paper' surfaceScale='2'>
              <feDistantLight azimuth='45' elevation='60' />
            </feDiffuseLighting>
            <feBlend in='SourceGraphic' in2='paper' mode='multiply' />
          </filter>
        </svg>
      </Grid>
    </Grid>
  )
}
