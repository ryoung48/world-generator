import { Grid } from '@mui/material'
import { GeoProjection } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { PROVINCE } from '../../models/provinces'
import { VIEW } from '../context'
import { ACTION } from './actions'
import { CanvasTransform } from './actions/types'
import { MapCanvas } from './map-canvas'
import { MapControls } from './map-controls'
import { MapInfoPanels } from './map-info-panels'
import { MapOverlay } from './map-overlay'
import { MapTranslateControls } from './paint/embellishments/controls/translate'
import { MapZoomControls } from './paint/embellishments/controls/zoom'
import { MAP_SHAPES } from './paint/shapes'
import { CachedImages, MapStyle, ProjectionType } from './types'

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
  const [projectionType, setProjectionType] = useState<ProjectionType>('orthographic')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const transition = () => {
    const { x, y } = cursor
    const poly = window.world.cells[window.world.diagram.find(x, y)]
    const province = window.world.provinces[poly.province]
    const nation = PROVINCE.nation(province)
    if (nation.desolate) return
    if (state.codex.tag !== 'nation') {
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

  const moveControls = ({ dx, dy, scale }: { dx: number; dy: number; scale: number }) => {
    if (!projection || !canvasRef.current) return

    const curr = MAP_SHAPES.scale.derived(projection)
    const r = projection.rotate()
    ACTION.moveTo({
      node: canvasRef.current,
      projection,
      scale: curr + scale,
      x: -r[0] + dx,
      y: -r[1] + dy
    })
  }

  const handleProjectionChange = (newProjection: GeoProjection) => {
    projection = newProjection
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <MapInfoPanels cursor={cursor} units={state.units} />

        <MapTranslateControls
          move={moveControls}
          scale={projection ? MAP_SHAPES.scale.derived(projection) : 1}
        />
        <MapZoomControls move={moveControls} />

        <MapControls
          style={style}
          onStyleChange={setStyle}
          onUnitsChange={() => dispatch({ type: 'toggle units' })}
          projectionType={projectionType}
          onProjectionChange={setProjectionType}
        />

        <MapOverlay transform={transform} />

        <MapCanvas
          ref={canvasRef}
          style={style}
          transform={transform}
          onTransformChange={newTransform => setTransform({ ...transform, ...newTransform })}
          onCursorMove={setCursor}
          onTransition={transition}
          projectionType={projectionType}
          cachedImages={cachedImages}
          onCachedImagesLoad={setCachedImages}
          projection={projection}
          onProjectionChange={handleProjectionChange}
        />
      </Grid>
    </Grid>
  )
}
