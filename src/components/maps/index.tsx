import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { pointer, select, zoom, ZoomTransform } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { REGION } from '../../models/regions'
import { Province } from '../../models/regions/provinces/types'
import { delay } from '../../models/utilities/math/time'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { map__drawRegions } from './canvas/borders'
import { map__drawEmbellishments } from './canvas/embellishments'
import {
  map__drawAvatarLocation,
  map__drawLocationsRegional,
  map__drawRoads
} from './canvas/infrastructure'
import { COAST } from './coasts'
import { iconPath } from './icons'
import { map__drawTerrainIcons, terrain__icons } from './icons/terrain'
import { CachedImages, MAP, MapSeason, MapStyle } from './types'

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
      }))
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})

const paint = (params: {
  scale: number
  dx: number
  dy: number
  cachedImages: CachedImages
  province: Province
  ctx: CanvasRenderingContext2D
  style: MapStyle
  season: MapSeason
}) => {
  const { scale, dx, dy, cachedImages, province, ctx, style, season } = params
  const nation = window.world.regions[province.nation]
  const borders = REGION.neighbors({ region: nation, depth: 2 })
  const nations = [nation].concat(borders)
  const nationSet = new Set(nations.map(n => n.idx))
  const expanded = new Set(
    nations
      .map(r =>
        REGION.domains(r)
          .map(region => {
            return [region.idx, ...region.borders]
          })
          .flat()
      )
      .flat()
  )
  const lands = COAST.islands({ ctx, scale, nations })
  map__drawRegions({ ctx, scale, nations, style, season })
  COAST.lakes({ ctx, scale, nations })
  map__drawRoads({ ctx, scale, nationSet })
  map__drawTerrainIcons({ ctx, cachedImages, scale, regions: expanded, lands })
  map__drawAvatarLocation({ ctx, loc: province.hub, scale })
  map__drawLocationsRegional({ ctx, scale, nationSet, cachedImages })
  map__drawEmbellishments({ ctx, scale, dx, dy, cachedImages })
}

export function WorldMap() {
  const { state, dispatch } = VIEW.context()
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
  const [style, setStyle] = useState<MapStyle>('Nations')
  const [season, setSeason] = useState<MapSeason>('Winter')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const transition = () => {
    const cell = window.world.diagram.delaunay.find(cursor.x, cursor.y)
    const poly = window.world.cells[cell]
    const province = window.world.provinces[poly.province]
    const nation = window.world.regions[province.nation]
    const localTransition = transform.scale > MAP.breakpoints.regional
    if (localTransition) {
      dispatch({
        type: 'transition',
        payload: { tag: 'province', idx: province.idx }
      })
    } else {
      dispatch({
        type: 'transition',
        payload: { tag: 'nation', idx: nation.idx }
      })
    }
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
      const province = window.world.provinces[state.province]
      const nation = window.world.regions[province.nation]
      const capital = window.world.provinces[nation.capital]
      dispatch({
        type: 'update gps',
        payload: {
          gps: {
            y: capital.hub.y,
            x: capital.hub.x,
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
      paint({
        ...transform,
        cachedImages,
        province: window.world.provinces[state.province],
        ctx,
        style,
        season
      })
      ctx.restore()
    }
  }, [cachedImages, transform, state, init, style, season])
  useEffect(() => {
    const oldScale = prevTransformRef.current?.scale
    const newScale = transform.scale
    const regionalTransition =
      oldScale > MAP.breakpoints.regional && newScale <= MAP.breakpoints.regional
    const localTransition =
      oldScale <= MAP.breakpoints.regional && newScale > MAP.breakpoints.regional
    if (regionalTransition || localTransition) {
      transition()
    }
    prevTransformRef.current = transform
  }, [transform])
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef}>
        <ToggleButtonGroup
          color='primary'
          exclusive
          value={style}
          onChange={(_, value) => setStyle(value)}
          size='small'
          style={{
            zIndex: 2,
            position: 'absolute',
            top: window.world.dim.h + 10,
            left: window.world.dim.w * 0.6
          }}
        >
          {MAP.styles.map(label => (
            <ToggleButton key={label} value={label}>
              <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 20 }}>
                {label}
              </span>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {(style === 'Temperature' || style === 'Rain') && (
          <ToggleButtonGroup
            color='primary'
            exclusive
            value={season}
            onChange={(_, value) => value && setSeason(value)}
            size='small'
            style={{
              zIndex: 2,
              position: 'absolute',
              top: window.world.dim.h - 35,
              left: window.world.dim.w * 0.82
            }}
          >
            {MAP.seasons.map(label => (
              <ToggleButton key={label} value={label}>
                <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 20 }}>
                  {label}
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
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
