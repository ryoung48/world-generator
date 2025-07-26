import { Grid } from '@mui/material'
import { GeoProjection } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { ACTION } from '../../world/actions'
import { CanvasTransform } from '../../world/actions/types'
import { HEIGHT_MAP } from '.'
import { MAP_SHAPES } from '../../world/shapes'
import { DrawMapParams } from '../../world/shapes/types'

const paint = ({ ctx, projection }: DrawMapParams) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  HEIGHT_MAP.draw({ ctx, projection })
}

let projection: GeoProjection = null

export function WorldMap() {
  const { state } = VIEW.context()
  const [transform, setTransform] = useState<CanvasTransform>({
    rotation: [0, 0, 0],
    scale: 1
  })
  // eslint-disable-next-line no-unused-vars
  const [_, setCursor] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const runPaint = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!projection) projection = MAP_SHAPES.projection.build(ctx)
    paint({
      ctx,
      projection
    })
  }
  useEffect(() => {
    const node = canvasRef.current
    node.width = 1024
    node.height = 512
    const ctx = node.getContext('2d')
    const init = async () => {
      projection = MAP_SHAPES.projection.build(ctx)
      ACTION.zoom({
        node,
        projection,
        onMove: params => setTransform({ ...transform, ...params })
      })
      ACTION.mouseover({ projection, node, onMove: params => setCursor(params) })
      ACTION.moveTo({ node, projection, scale: 0.8, x: 0, y: 0 })
      runPaint()
    }
    init()
  }, [])
  useEffect(() => {
    const { x, y, zoom } = state.gps
    if (projection && zoom > 0) {
      const node = canvasRef.current
      ACTION.moveTo({ node, projection, scale: zoom, x, y })
      setCursor({ x, y })
    }
  }, [state.gps])
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef}>
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: cssColors.background.map,
            border: `thick double ${cssColors.primary}`
          }}
        ></canvas>
      </Grid>
    </Grid>
  )
}
