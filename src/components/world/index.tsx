import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { GeoProjection, scaleLinear } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { CELL } from '../../models/cells'
import { GEOGRAPHY_NAMES } from '../../models/cells/geography/names'
import { LOCATION } from '../../models/cells/locations'
import { RAIN } from '../../models/cells/weather/rain'
import { TEMPERATURE } from '../../models/cells/weather/temperature'
import { PROVINCE } from '../../models/provinces'
import { ARRAY } from '../../models/utilities/array'
import { TIME } from '../../models/utilities/math/time'
import { NationView } from '../codex/Nation'
import { ProvinceView } from '../codex/Province'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { ACTION } from './actions'
import { CanvasTransform } from './actions/types'
import { DRAW_BORDERS } from './border'
import { DRAW_LANDMARKS } from './coast'
import { DRAW_EMBELLISHMENTS } from './embellishments'
import { MapTranslateControls } from './embellishments/controls/translate'
import { MapZoomControls } from './embellishments/controls/zoom'
import { ICON } from './icons'
import { DRAW_LOCATION } from './icons/locations'
import { DRAW_TERRAIN } from './icons/terrain'
import { DRAW_INFRASTRUCTURE } from './infrastructure'
import { MAP_SHAPES } from './shapes'
import { DRAW_CACHE } from './shapes/caching'
import { MAP_METRICS } from './shapes/metrics'
import { CachedImages, MapStyle, WorldPaintParams } from './types'

const hidden: MapStyle[] = ['Resources', 'Temperature', 'Rain', 'Population']

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
      ...Object.entries(DRAW_LOCATION.definitions).map(async ([k, v]) => ({
        img: await loadImage(ICON.path + v.path),
        index: k
      })),
      ...Object.entries(DRAW_TERRAIN.definitions).map(async ([k, v]) => ({
        img: await loadImage(ICON.path + v.path),
        index: k
      })),
      (async () => ({
        img: await loadImage(MAP_SHAPES.clouds.heavy),
        index: 'clouds'
      }))()
    ])
  ).reduce((dict: Record<string, HTMLImageElement>, { index, img }) => {
    dict[index] = img
    return dict
  }, {})

const paint = ({ ctx, projection, style, loc, cachedImages, rotation }: WorldPaintParams) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const province = window.world.provinces[loc.province]
  const place = province.hub
  const nation = PROVINCE.nation(province)
  const nations = ARRAY.unique(
    window.world.provinces
      .filter(p => !p.desolate && !PROVINCE.far(province, p, 4))
      .map(p => PROVINCE.nation(p).idx)
      .concat(nation.idx)
  ).map(n => window.world.provinces[n])
  const nationSet = new Set(nations.map(n => n.idx))
  DRAW_CACHE.paths.clear()
  DRAW_LANDMARKS.oceans({ ctx, projection, style })
  DRAW_BORDERS.regions({ ctx, projection, style, nations, province, nationSet })
  DRAW_LANDMARKS.lakes({ ctx, projection, style })
  // if (style === 'Topography') DRAW_LANDMARKS.rivers({ ctx, projection })
  DRAW_INFRASTRUCTURE.roads({ ctx, projection, nationSet, style })
  DRAW_TERRAIN.icons({ ctx, projection, cachedImages })
  DRAW_INFRASTRUCTURE.provinces({ ctx, projection, nationSet, style, cachedImages, place })
  // DRAW_INFRASTRUCTURE.places({ ctx, projection, nationSet, cachedImages, place })
  DRAW_EMBELLISHMENTS.graticule({ ctx, projection })
  DRAW_EMBELLISHMENTS.clouds({ ctx, projection, cachedImages })
  DRAW_EMBELLISHMENTS.scale({ ctx, projection })
  DRAW_EMBELLISHMENTS.legend({ ctx, style, province, nationSet })
  DRAW_EMBELLISHMENTS.compass({ ctx, rotation, projection })
}

let projection: GeoProjection = null

export function WorldMap() {
  const { state, dispatch } = VIEW.context()
  const [cachedImages, setCachedImages] = useState<CachedImages>({})
  const [transform, setTransform] = useState<CanvasTransform>({
    rotation: [0, 0, 0],
    scale: 1
  })
  const prevTransformRef = useRef<number>()
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [style, setStyle] = useState<MapStyle>('Nations')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const runPaint = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!projection) projection = MAP_SHAPES.projection.build(ctx)
    paint({
      ...transform,
      cachedImages,
      loc: state.loc,
      ctx,
      style,
      projection
    })
  }
  const transition = () => {
    const { x, y } = cursor
    const poly = window.world.cells[window.world.diagram.find(x, y)]
    const province = window.world.provinces[poly.province]
    const nation = PROVINCE.nation(province)
    if (nation.desolate) return
    if (state.view !== 'nation') {
      dispatch({
        type: 'transition',
        payload: { tag: 'site', province: province.idx }
      })
    } else {
      dispatch({
        type: 'transition',
        payload: { tag: 'nation', province: nation.idx }
      })
    }
  }
  useEffect(() => {
    const node = canvasRef.current
    node.width = containerRef.current.clientWidth
    node.height = containerRef.current.clientHeight
    const ctx = node.getContext('2d')
    const init = async () => {
      // images
      const loadedImages = await loadImages()
      setCachedImages(loadedImages)
      // font
      ctx.font = `4px ${fonts.maps}`
      ctx.fillText('text', 0, 8)
      await TIME.delay(50)
      projection = MAP_SHAPES.projection.build(ctx)
      ACTION.zoom({
        node,
        projection,
        onMove: params => setTransform({ ...transform, ...params })
      })
      ACTION.mouseover({ projection, node, onMove: params => setCursor(params) })
      ACTION.moveTo({ node, projection, scale: 2, x: 0, y: 0 })
      // initial zoom
      const province = window.world.provinces[state.loc.province]
      const nation = PROVINCE.nation(province)
      const hub = PROVINCE.cell(nation)
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
    if (Object.keys(cachedImages).length > 0) runPaint()
  }, [style, transform, state.loc])
  useEffect(() => {
    const { x, y, zoom } = state.gps
    if (projection && zoom > 0) {
      const node = canvasRef.current
      ACTION.moveTo({ node, projection, scale: zoom, x, y })
      setCursor({ x, y })
    }
  }, [state.gps])
  useEffect(() => {
    if (projection) {
      const oldScale = prevTransformRef.current
      const newScale = MAP_SHAPES.scale.derived(projection)
      const globalTransition =
        newScale > MAP_SHAPES.breakpoints.global && oldScale <= MAP_SHAPES.breakpoints.global
      if (globalTransition) transition()
      prevTransformRef.current = newScale
    }
  }, [transform])
  const cell = window.world.cells[window.world.diagram.find(cursor.x, cursor.y)]
  const location = window.world.locations[cell.location]
  const province = window.world.provinces[cell.province]
  const temperature = cell.heat.mean
  const rain = cell.rain.annual
  const pop = MAP_METRICS.population.format(PROVINCE.population.density(province))
  const infoOpacity = scaleLinear().domain([400, 6000]).range([0, 1]).clamp(true)(transform.scale)

  const moveControls = ({ dx, dy, scale }: { dx: number; dy: number; scale: number }) => {
    const node = canvasRef.current
    const curr = MAP_SHAPES.scale.derived(projection)
    const r = projection?.rotate()
    ACTION.moveTo({ node, projection, scale: curr + scale, x: -r[0] + dx, y: -r[1] + dy })
  }
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef}>
        <Grid
          justifyContent='space-between'
          container
          sx={{
            zIndex: 2,
            position: 'absolute',
            top: MAP_SHAPES.height * 0.145,
            left: MAP_SHAPES.width * 0.04,
            fontFamily: fonts.maps,
            fontSize: 20,
            backgroundColor: 'rgba(238, 238, 221, 0.85)',
            width: 160,
            padding: 1
          }}
        >
          <Grid item xs={12}>
            {decimalToDMS(cursor.y, cursor.x)}
          </Grid>
          {!cell.isWater && (
            <Grid item xs={12}>
              <span>{`${
                location && !cell.isMountains ? LOCATION.cell(location).topography : cell.topography
              }, ${MAP_METRICS.topography.format(cell.elevation)}`}</span>
            </Grid>
          )}
          {!cell.isWater && <Grid item xs={12}>{`${cell.climate}, ${cell.vegetation}`}</Grid>}
          <Grid item xs={12}>
            {<StyledText text={GEOGRAPHY_NAMES.name(cell)}></StyledText>}
          </Grid>
        </Grid>

        <Grid item xs={12} ref={containerRef}>
          <Grid
            justifyContent='space-between'
            container
            sx={{
              zIndex: 2,
              position: 'absolute',
              top: MAP_SHAPES.height * 0.145,
              left: MAP_SHAPES.width * 0.15,
              fontFamily: fonts.maps,
              fontSize: 20,
              backgroundColor: 'rgba(238, 238, 221, 0.85)',
              width: 160,
              padding: 1
            }}
          >
            {!cell.isWater && (
              <Grid item xs={12}>
                {MAP_METRICS.temperature.format(temperature)} ({TEMPERATURE.describe(temperature)})
              </Grid>
            )}
            {!cell.isWater && (
              <Grid item xs={12}>
                {MAP_METRICS.rain.format(rain)} ({RAIN.describe(rain, 'annual')})
              </Grid>
            )}
            <Grid item xs={12}>
              {MAP_METRICS.oceanDist.format(CELL.distMiles(cell))} from{' '}
              {cell.isWater ? 'land' : 'ocean'}
            </Grid>
            {!cell.isWater && (
              <Grid item xs={12}>
                {pop}
              </Grid>
            )}
            {/* {!cell.isWater && (
              <Grid item xs={12}>
                {location.resource}
              </Grid>
            )} */}
          </Grid>
        </Grid>

        <Grid item xs={12} ref={containerRef}>
          <Grid
            justifyContent='space-between'
            container
            sx={{
              zIndex: 2,
              position: 'absolute',
              top: MAP_SHAPES.height * 0.145,
              left: MAP_SHAPES.width * 0.26,
              fontFamily: fonts.maps,
              fontSize: 20,
              backgroundColor: 'rgba(238, 238, 221, 0.85)',
              width: 160,
              padding: 1
            }}
          >
            <Grid item xs={12}>
              nation: {province.desolate ? 'none' : PROVINCE.nation(province).name}
            </Grid>
            <Grid item xs={12}>
              culture: {province.desolate ? 'none' : window.world.cultures[province.culture].name}
            </Grid>
            <Grid item xs={12}>
              province: {province.desolate ? 'none' : PROVINCE.hub(province).name}
            </Grid>
            <Grid item xs={12}>
              development: {province.development.toFixed(1)} (
              {PROVINCE.development.describe(province.development)})
            </Grid>
          </Grid>
        </Grid>

        <MapTranslateControls
          move={moveControls}
          scale={projection ? MAP_SHAPES.scale.derived(projection) : 1}
        ></MapTranslateControls>
        <MapZoomControls move={moveControls}></MapZoomControls>
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
            top: MAP_SHAPES.height + 35,
            left: MAP_SHAPES.width * 0.4,
            background: 'rgba(238, 238, 221, 0.85)'
          }}
        >
          {MAP_SHAPES.styles
            .filter(label => !hidden.includes(label))
            .map(label => (
              <ToggleButton key={label} value={label}>
                <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 20 }}>
                  {label}
                </span>
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
        {infoOpacity > 0 && (
          <Grid
            container
            sx={{
              zIndex: 2,
              position: 'absolute',
              top: MAP_SHAPES.height * 0.145,
              left: MAP_SHAPES.width * 0.8,
              fontFamily: fonts.maps,
              fontSize: 20,
              backgroundColor: `rgba(238, 238, 221, 0.9)`,
              width: 550,
              padding: 1,
              opacity: scaleLinear().domain([400, 1500]).range([0, 1]).clamp(true)(transform.scale)
            }}
          >
            {state.view === 'nation' && <NationView></NationView>}
            {state.view === 'site' && <ProvinceView></ProvinceView>}
          </Grid>
        )}
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: cssColors.background.map,
            border: `thick double ${cssColors.primary}`,
            filter: 'contrast(0.9) sepia(0.3) url(#noiseFilter)',
            height: `${MAP_SHAPES.height}px`,
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
