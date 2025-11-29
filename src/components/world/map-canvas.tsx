import { GeoProjection } from 'd3'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import { PROVINCE } from '../../models/provinces'
import { ENTITY } from '../../models/utilities/entities'
import { TIME } from '../../models/utilities/math/time'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { ACTION } from './actions'
import { CanvasTransform } from './actions/types'
import { loadImages, paint } from './paint'
import { MAP_SHAPES } from './paint/shapes'
import { CachedImages, MapStyle, ProjectionType } from './types'

type MapCanvasProps = {
  style: MapStyle
  transform: CanvasTransform
  onTransformChange: (_transform: Partial<CanvasTransform>) => void
  onCursorMove: (_params: { x: number; y: number }) => void
  onTransition: () => void
  projectionType: ProjectionType
  cachedImages: CachedImages
  onCachedImagesLoad: (_images: CachedImages) => void
  projection: GeoProjection | null
  onProjectionChange: (_projection: GeoProjection) => void
}

export const MapCanvas = forwardRef<HTMLCanvasElement, MapCanvasProps>(function MapCanvas(
  props,
  ref
) {
  const {
    style,
    transform,
    onTransformChange,
    onCursorMove,
    onTransition,
    projectionType,
    cachedImages,
    onCachedImagesLoad,
    projection,
    onProjectionChange
  } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { state, dispatch } = VIEW.context()

  useImperativeHandle(ref, () => canvasRef.current!, [canvasRef])

  const runPaint = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!projection) return

    paint({
      ...transform,
      cachedImages,
      province: ENTITY.province(state.codex),
      ctx,
      style,
      projection,
      units: state.units
    })
  }

  useEffect(() => {
    const node = canvasRef.current
    node.width = containerRef.current.clientWidth
    node.height = containerRef.current.clientHeight
    const ctx = node.getContext('2d')

    const init = async () => {
      const loadedImages = await loadImages()
      onCachedImagesLoad(loadedImages)

      ctx.font = `4px ${fonts.maps}`
      ctx.fillText('text', 0, 8)
      await TIME.delay(50)

      const newProjection = MAP_SHAPES.projection[projectionType](ctx)
      onProjectionChange(newProjection)

      ACTION.zoom({
        node,
        projection: newProjection,
        onMove: params => onTransformChange({ ...transform, ...params })
      })

      ACTION.mouseover({
        projection: newProjection,
        node,
        onMove: params => onCursorMove(params)
      })

      ACTION.moveTo({ node, projection: newProjection, scale: 2, x: 0, y: 0 })
      // initial zoom
      const province = window.world.provinces[state.codex.idx]
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
    if (projection) {
      const node = canvasRef.current
      const ctx = node.getContext('2d')
      const newProjection = MAP_SHAPES.projection[projectionType](ctx)
      onProjectionChange(newProjection)

      ACTION.mouseover({
        projection: newProjection,
        node,
        onMove: params => onCursorMove(params)
      })

      ACTION.zoom({
        node,
        projection: newProjection,
        onMove: params => onTransformChange({ ...transform, ...params })
      })

      // initial zoom
      const province = window.world.provinces[state.codex.idx]
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
  }, [projectionType])

  useEffect(() => {
    if (Object.keys(cachedImages).length > 0) {
      runPaint()
    }
  }, [style, transform, state.codex, state.units, cachedImages])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: cssColors.background.map,
          filter: 'url(#noiseFilter)',
          height: '100%',
          width: '100%'
        }}
        onClick={onTransition}
      />
      <svg height='0'>
        <filter id='noiseFilter' x='0%' y='0%' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.02' result='noise' numOctaves='5' />
          <feDiffuseLighting in='noise' lightingColor='white' result='paper' surfaceScale='2'>
            <feDistantLight azimuth='45' elevation='60' />
          </feDiffuseLighting>
          <feBlend in='SourceGraphic' in2='paper' mode='multiply' />
        </filter>
      </svg>
    </div>
  )
})
