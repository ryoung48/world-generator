import { Grid } from '@mui/material'
import { pointer, select, zoom, ZoomTransform } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { region__neighbors } from '../../models/regions'
import { Loc } from '../../models/regions/locations/types'
import { province__hub, province__neighbors } from '../../models/regions/provinces'
import { point__distance } from '../../models/utilities/math/points'
import { delay } from '../../models/utilities/math/time'
import { cell__nation } from '../../models/world/cells'
import { view__context } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { map__drawRegions } from './canvas/borders'
import { map__drawLakes, map__drawOceans } from './canvas/coasts'
import { map__breakpoints } from './canvas/draw_styles'
import {
  map__drawAvatarLocation,
  map__drawLocations,
  map__drawLocationsRegional,
  map__drawRoads
} from './canvas/infrastructure'
import { iconPath } from './icons'
import { location__icons } from './icons/locations'
import { map__drawTerrainIcons, terrain__icons } from './icons/terrain'

type CachedImages = Record<string, HTMLImageElement>

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = path
  })
}

const loadImages = async () =>
  (
    await Promise.all([
      ...Object.entries(terrain__icons).map(async ([k, v]) => ({
        img: await loadImage(iconPath + v.path),
        index: k
      })),
      ...Object.entries(location__icons).map(async ([k, v]) => ({
        img: await loadImage(iconPath + v.path),
        index: k
      }))
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})

const paint = (params: {
  scale: number
  cachedImages: CachedImages
  loc: Loc
  ctx: CanvasRenderingContext2D
}) => {
  const { scale, cachedImages, loc, ctx } = params
  const province = window.world.provinces[loc.province]
  const nation = window.world.regions[province.currNation]
  const borders = region__neighbors(nation).map(r => window.world.regions[r])
  const nations = [nation].concat(borders)
  const nationSet = new Set(nations.map(n => n.idx))
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
  const lands = map__drawOceans({ ctx, scale, nations })
  map__drawRegions({ ctx, scale, nations })
  map__drawLakes({ ctx, scale, nations })
  map__drawRoads({ ctx, scale, nationSet })
  map__drawTerrainIcons({ ctx, cachedImages, scale, regions: expanded, lands })
  map__drawAvatarLocation({ ctx, loc, scale })
  map__drawLocationsRegional({ ctx, scale, nationSet, cachedImages })
  map__drawLocations({ ctx, scale, province, cachedImages })
}

export function WorldMap() {
  const { state, dispatch } = view__context()
  const [cachedImages, setCachedImages] = useState<CachedImages>({})
  const [transform, setTransform] = useState({
    dx: 0,
    dy: 0,
    scale: 1
  })
  const prevTransformRef = useRef<typeof transform>()
  const [zoomController, setZoom] = useState({ zoom: zoom() })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [init, setInit] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const transition = () => {
    const cell = window.world.diagram.delaunay.find(cursor.x, cursor.y)
    const poly = window.world.cells[cell]
    const province = window.world.provinces[poly.province]
    const provinces = [province].concat(province__neighbors(province))
    const prospects = provinces
      .map(prov => prov.locations.map(l => window.world.locations[l]))
      .flat()
    const hub = province__hub(province)
    const nation = cell__nation(poly)
    const localScale = transform.scale > map__breakpoints.regional
    const globalScale = transform.scale <= map__breakpoints.global
    const local = (state.codex.current === 'location' && !globalScale) || localScale
    const { loc } =
      state.codex.current === 'location' && localScale
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
        disableZoom: true
      }
    })
  }
  useEffect(() => {
    const init = async () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      // images
      const loadedImages = await loadImages()
      setCachedImages(loadedImages)
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
          setTransform({
            scale: k,
            dx: x,
            dy: y
          })
        })
      const node = select(canvas) as any
      node.call(controller)
      setZoom({ zoom: controller })
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
    if (zoomController && zoom > 0) {
      const canvas = canvasRef.current
      const node = select(canvas) as any
      zoomController.zoom.scaleTo(node, zoom)
      zoomController.zoom.translateTo(node, x, y)
      setCursor({ x, y })
      setInit(true)
    }
  }, [state.gps, zoomController])
  useEffect(() => {
    if (Object.keys(cachedImages).length > 0 && init) {
      const canvas = canvasRef.current
      canvas.width = containerRef.current.clientWidth
      canvas.height = containerRef.current.clientHeight
      const ctx = canvas.getContext('2d')
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.translate(transform.dx, transform.dy)
      ctx.scale(transform.scale, transform.scale)
      const loc = window.world.locations[state.codex.location]
      paint({
        scale: transform.scale,
        cachedImages,
        loc,
        ctx
      })
      ctx.restore()
    }
  }, [cachedImages, transform, state, init])
  useEffect(() => {
    const oldScale = prevTransformRef.current?.scale
    const newScale = transform.scale
    const regionalTransition =
      oldScale <= map__breakpoints.global && newScale > map__breakpoints.global
    const globalTransition =
      newScale <= map__breakpoints.global && oldScale > map__breakpoints.global
    const localTransition =
      oldScale <= map__breakpoints.regional && newScale > map__breakpoints.regional
    if (regionalTransition || localTransition || globalTransition) {
      transition()
    }
    prevTransformRef.current = transform
  }, [transform])
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef} pb={0}>
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: cssColors.background.map,
            border: `thick double ${cssColors.primary}`,
            filter: 'contrast(0.9) sepia(0.3) url(#noiseFilter)',
            height: `${window.world.dim.h}px`,
            width: `100%`
          }}
          onMouseMove={event => {
            const [clientX, clientY] = pointer(event)
            const nx = (clientX - transform.dx) / transform.scale
            const ny = (clientY - transform.dy) / transform.scale
            setCursor({ x: nx, y: ny })
          }}
          onClick={transition}
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
