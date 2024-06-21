import { Box, Grid, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { GeoProjection, scaleLinear } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { WORLD } from '../../models'
import { CLIMATE } from '../../models/cells/climate'
import { GEOGRAPHY } from '../../models/cells/geography'
import { REGION } from '../../models/regions'
import { PROVINCE } from '../../models/regions/provinces'
import { POINT } from '../../models/utilities/math/points'
import { delay } from '../../models/utilities/math/time'
import { NationView } from '../codex/Nation'
import { PlaceView } from '../codex/places'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { ACTION } from './actions'
import { CanvasTransform } from './actions/types'
import { DRAW_BORDERS } from './border'
import { DRAW_LANDMARKS } from './coast'
import { DRAW_EMBELLISHMENTS } from './embellishments'
import { ICON } from './icons'
import { DRAW_TERRAIN } from './icons/terrain'
import { DRAW_INFRASTRUCTURE } from './infrastructure'
import { MAP_SHAPES } from './shapes'
import { MAP_METRICS } from './shapes/metrics'
import { CachedImages, MapStyle, WorldPaintParams } from './types'

const markStyle = { fontFamily: fonts.maps, fontSize: 18 }

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

const paint = ({
  ctx,
  projection,
  month,
  style,
  loc,
  cachedImages,
  rotation
}: WorldPaintParams) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const province = window.world.provinces[loc.province]
  const scale = MAP_SHAPES.scale.derived(projection)
  const place =
    scale <= MAP_SHAPES.breakpoints.regional ? PROVINCE.hub(province) : province.places[loc.place]
  const nation = PROVINCE.nation(province)
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
  DRAW_LANDMARKS.oceans({ ctx, projection, month })
  DRAW_BORDERS.regions({ ctx, projection, month, style, nations, province })
  DRAW_LANDMARKS.lakes({ ctx, projection })
  DRAW_INFRASTRUCTURE.roads({ ctx, projection, nationSet, cachedImages, place })
  DRAW_TERRAIN.icons({ ctx, projection, cachedImages, regions: expanded, lands: landmarks })
  DRAW_INFRASTRUCTURE.provinces({ ctx, projection, nationSet, style, cachedImages, place })
  DRAW_INFRASTRUCTURE.places({ ctx, projection, nationSet, cachedImages, place })
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
  const [month, setMonth] = useState(0)
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
      month,
      projection
    })
  }
  const transition = () => {
    const { x, y } = cursor
    const poly = window.world.cells[window.world.diagram.find(x, y)]
    const province = window.world.provinces[poly.province]
    const nation = PROVINCE.nation(province)
    if (nation.desolate) return
    const scale = MAP_SHAPES.scale.derived(projection)
    if (state.view === 'place') {
      // find closest place to cursor
      const closest =
        scale <= MAP_SHAPES.breakpoints.regional
          ? { place: PROVINCE.hub(province) }
          : province.places.slice(1).reduce(
              (min, place) => {
                const dist = POINT.distance.geo({ points: [place, { x, y }] })
                return dist < min.dist ? { place, dist } : min
              },
              {
                place: province.places[0],
                dist: POINT.distance.geo({ points: [province.places[0], { x, y }] })
              }
            )
      dispatch({
        type: 'transition',
        payload: { tag: 'place', province: province.idx, place: closest.place.idx }
      })
    } else {
      const capital = REGION.capital(nation)
      dispatch({
        type: 'transition',
        payload: { tag: 'nation', province: capital.idx, place: 0 }
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
      await delay(50)
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
      const nation = window.world.regions[province.nation]
      const capital = window.world.provinces[nation.capital]
      const hub = PROVINCE.hub(capital)
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
  }, [month, style, transform, state.loc])
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
  const holdridge = CLIMATE.holdridge[cell.climate]
  const province = window.world.provinces[cell.province]
  const infoOpacity = scaleLinear().domain([400, 6000]).range([0, 1]).clamp(true)(transform.scale)
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
            width: 200,
            padding: 1
          }}
        >
          <Grid item xs={12}>
            {decimalToDMS(cursor.y, cursor.x)}
          </Grid>
          {!cell.isWater && (
            <Grid item xs={12}>
              <span>{`${
                cell.isMountains ? 'mountains' : province.topography
              }, ${MAP_METRICS.elevation.format(WORLD.heightToKM(cell.h))}`}</span>
            </Grid>
          )}
          {!cell.isWater && (
            <Grid item xs={12}>{`${cell.isMountains ? 'alpine' : holdridge.latitude}, ${
              holdridge.name
            }`}</Grid>
          )}
          <Grid item xs={12}>
            {<StyledText text={GEOGRAPHY.name(cell)}></StyledText>}
          </Grid>
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
            top: MAP_SHAPES.height + 35,
            left: MAP_SHAPES.width * 0.72,
            background: 'rgba(238, 238, 221, 0.85)'
          }}
        >
          {MAP_SHAPES.styles.map(label => (
            <ToggleButton key={label} value={label}>
              <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 20 }}>
                {label}
              </span>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {(style === 'Temperature' || style === 'Rain') && (
          <Box
            style={{
              zIndex: 2,
              position: 'absolute',
              width: 500,
              top: MAP_SHAPES.height - 25,
              left: MAP_SHAPES.width * 0.78,
              background: 'transparent'
            }}
          >
            <Slider
              aria-label='Always visible'
              value={month}
              color='primary'
              min={0}
              max={11}
              step={1}
              onChange={(_, value) => {
                if (typeof value === 'number') setMonth(value)
              }}
              marks={[
                {
                  value: 0,
                  label: <span style={markStyle}>Jan</span>
                },
                {
                  value: 1,
                  label: <span style={markStyle}>Feb</span>
                },
                {
                  value: 2,
                  label: <span style={markStyle}>Mar</span>
                },
                {
                  value: 3,
                  label: <span style={markStyle}>Apr</span>
                },
                {
                  value: 4,
                  label: <span style={markStyle}>May</span>
                },
                {
                  value: 5,
                  label: <span style={markStyle}>Jun</span>
                },
                {
                  value: 6,
                  label: <span style={markStyle}>Jul</span>
                },
                {
                  value: 7,
                  label: <span style={markStyle}>Aug</span>
                },
                {
                  value: 8,
                  label: <span style={markStyle}>Sep</span>
                },
                {
                  value: 9,
                  label: <span style={markStyle}>Oct</span>
                },
                {
                  value: 10,
                  label: <span style={markStyle}>Nov</span>
                },
                {
                  value: 11,
                  label: <span style={markStyle}>Dec</span>
                }
              ]}
              valueLabelDisplay='off'
            />
          </Box>
        )}
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
            {state.view === 'place' && <PlaceView></PlaceView>}
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
