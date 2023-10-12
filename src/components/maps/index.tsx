import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { geoOrthographic, GeoProjection } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { REGION } from '../../models/regions'
import { Province } from '../../models/regions/provinces/types'
import { delay } from '../../models/utilities/math/time'
import { WORLD } from '../../models/world'
import { CLIMATE } from '../../models/world/climate'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { ACTION } from './actions'
import { DRAW_BORDERS } from './border'
import { DRAW_LANDMARKS } from './coasts'
import { MAP } from './common'
import { DRAW_EMBELLISHMENTS } from './embellishments'
import { ICON } from './icons'
import { DRAW_TERRAIN } from './icons/terrain'
import { DRAW_INFRASTRUCTURE } from './infrastructure'
import { CachedImages, MapSeason, MapStyle } from './types'

function decimalToDMS(lat: number, lon: number): string {
  const convert = (decimalDegree: number, isLatitude: boolean): string => {
    const degree: number = Math.floor(decimalDegree)
    const direction = isLatitude ? (decimalDegree >= 0 ? 'N' : 'S') : decimalDegree >= 0 ? 'E' : 'W'
    return `${Math.abs(degree)}° ${direction}`
  }

  return `${convert(lat, true)},  ${convert(lon, false)}`
}

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
      ...Object.entries(DRAW_TERRAIN.icons).map(async ([k, v]) => ({
        img: await loadImage(ICON.path + v.path),
        index: k
      }))
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})

const paint = (params: {
  cachedImages: CachedImages
  province: Province
  ctx: CanvasRenderingContext2D
  style: MapStyle
  season: MapSeason
  projection: GeoProjection
}) => {
  const { ctx, projection, season, style, province, cachedImages } = params
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  console.log(MAP.scale.derived(projection))

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
  const landmarks = new Set(
    Array.from(
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
  )
  DRAW_LANDMARKS.islands({ ctx, projection })
  DRAW_BORDERS.regions({ ctx, projection, season, style, nations })
  DRAW_BORDERS.contested({ ctx, projection, nations })
  DRAW_LANDMARKS.lakes({ ctx, projection })
  DRAW_INFRASTRUCTURE.roads({ ctx, projection, nationSet })
  DRAW_TERRAIN.draw({ ctx, projection, cachedImages, regions: expanded, lands: landmarks })
  DRAW_INFRASTRUCTURE.provinces({ ctx, projection, nationSet })
  DRAW_EMBELLISHMENTS.scale({ ctx, projection })
  DRAW_EMBELLISHMENTS.legend({ ctx, style })
}

let projection: GeoProjection = null

export function WorldMap() {
  const { state, dispatch } = VIEW.context()
  const [cachedImages, setCachedImages] = useState<CachedImages>({})
  const [transform, setTransform] = useState({
    rotation: [0, 0, 0],
    scale: 1
  })
  const prevTransformRef = useRef<typeof transform>()
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [style, setStyle] = useState<MapStyle>('Nations')
  const [season, setSeason] = useState<MapSeason>('Winter')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const runPaint = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    paint({
      ...transform,
      cachedImages,
      province: window.world.provinces[state.province],
      ctx,
      style,
      season,
      projection
    })
  }
  const transition = () => {
    const { x, y } = cursor
    const poly = window.world.cells[window.world.diagram.find(x, y)]
    const province = window.world.provinces[poly.province]
    const nation = window.world.regions[province.nation]
    const localTransition = transform.scale / MAP.scale.init > MAP.breakpoints.regional
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
    const node = canvasRef.current
    node.width = containerRef.current.clientWidth
    node.height = containerRef.current.clientHeight
    const ctx = node.getContext('2d')
    projection = geoOrthographic()
      .scale(MAP.scale.init)
      .translate([ctx.canvas.width / 2, ctx.canvas.height / 2])
    const init = async () => {
      // images
      const loadedImages = await loadImages()
      setCachedImages(loadedImages)
      // font
      ctx.font = `4px ${fonts.maps}`
      ctx.fillText('text', 0, 8)
      await delay(50)
      ACTION.zoom({
        node,
        projection,
        onMove: params => setTransform({ ...transform, ...params })
      })
      ACTION.mouseover({ projection, node, onMove: params => setCursor(params) })
      ACTION.moveTo({ node, projection, scale: 2, x: 0, y: 0 })
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
    if (Object.keys(cachedImages).length > 0) runPaint()
  }, [season, style, transform, state.province, state.region])
  useEffect(() => {
    const oldScale = prevTransformRef.current?.scale / MAP.scale.init
    const newScale = transform.scale / MAP.scale.init
    const globalTransition = oldScale <= MAP.breakpoints.global && newScale > MAP.breakpoints.global
    const regionalTransition =
      oldScale > MAP.breakpoints.regional && newScale <= MAP.breakpoints.regional
    const localTransition =
      oldScale <= MAP.breakpoints.regional && newScale > MAP.breakpoints.regional
    if (regionalTransition || localTransition || globalTransition) {
      transition()
    }
    prevTransformRef.current = transform
  }, [transform])
  useEffect(() => {
    const { x, y, zoom } = state.gps
    if (projection && zoom > 0) {
      const node = canvasRef.current
      ACTION.moveTo({ node, projection, scale: zoom, x, y })
      setCursor({ x, y })
    }
  }, [state.gps])
  const cell = window.world.cells[window.world.diagram.find(cursor.x, cursor.y)]
  const climate = CLIMATE.holdridge[cell.climate]
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef}>
        <Grid
          justifyContent='space-between'
          container
          sx={{
            zIndex: 2,
            position: 'absolute',
            top: MAP.height * 0.145,
            left: MAP.width * 1.05,
            fontFamily: fonts.maps,
            fontSize: 20,
            backgroundColor: 'rgba(238, 238, 221, 0.5)',
            width: 165,
            padding: 1
          }}
        >
          <Grid item xs={12}>
            {decimalToDMS(cursor.y, cursor.x)}
          </Grid>
          {cell.heat && (
            <Grid item xs={12}>
              <span>{`${MAP.metrics.temperature.format(
                season === 'Summer' ? cell.heat.summer : cell.heat.winter
              )}, ${MAP.metrics.rain.format(
                season === 'Summer' ? cell.rain.summer : cell.rain.winter
              )}, ${MAP.metrics.elevation.format(WORLD.heightToKM(cell.h))}`}</span>
            </Grid>
          )}
          {cell.heat && (
            <Grid item xs={12}>{`${climate.name} (${
              cell.isMountains ? climate.altitude : climate.latitude
            })`}</Grid>
          )}
        </Grid>
        <ToggleButtonGroup
          color='primary'
          exclusive
          value={style}
          onChange={(_, value) => {
            if (value) setStyle(value)
          }}
          size='small'
          style={{
            zIndex: 2,
            position: 'absolute',
            top: MAP.height + 35,
            left: MAP.width * 0.42,
            background: 'rgba(238, 238, 221, 0.5)'
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
            onChange={(_, value) => {
              if (value) setSeason(value)
            }}
            size='small'
            style={{
              zIndex: 2,
              position: 'absolute',
              top: MAP.height - 10,
              left: MAP.width * 0.65,
              background: 'rgba(238, 238, 221, 0.5)'
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
            height: `${MAP.height}px`,
            width: `100%`
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
