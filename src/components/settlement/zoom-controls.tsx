import { Box, IconButton } from '@mui/material'
import { select, zoomIdentity } from 'd3'
import { MinusBox, PlusBox, RefreshCircle } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'

import { TransformState, ZoomControlsProps, ZoomEventType } from './types'

const ZOOM_FACTOR = 1.5
const MIN_SCALE = 0.5
const MAX_SCALE = 8

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomBehavior, canvasRef }) => {
  const [currentTransform, setCurrentTransform] = useState<TransformState>({ x: 0, y: 0, k: 1 })

  // Set up a listener for zoom events to keep track of the current transform
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !zoomBehavior) return

    // Attach a zoom event listener to update our transform state
    const onZoom = (event: ZoomEventType) => {
      setCurrentTransform({
        x: event.transform.x,
        y: event.transform.y,
        k: event.transform.k
      })
    }

    // Add the listener to the zoom behavior
    zoomBehavior.on('zoom.controls', onZoom)

    // Clean up listener when component unmounts
    return () => {
      zoomBehavior.on('zoom.controls', null)
    }
  }, [zoomBehavior, canvasRef])

  const handleZoomIn = () => {
    const canvas = canvasRef.current
    if (!canvas || !zoomBehavior) return

    // Create a selection for the canvas
    const selection = select(canvas)

    // Use the current transform from our state
    const newScale = Math.min(currentTransform.k * ZOOM_FACTOR, MAX_SCALE) // limit to scaleExtent max

    // Only zoom if we're not at max scale
    if (newScale === currentTransform.k) return

    // Use the zoom behavior's convenience method to scale
    zoomBehavior.scaleTo(selection, newScale)
  }

  const handleZoomOut = () => {
    const canvas = canvasRef.current
    if (!canvas || !zoomBehavior) return

    // Create a selection for the canvas
    const selection = select(canvas)

    // Use the current transform from our state
    const newScale = Math.max(currentTransform.k / ZOOM_FACTOR, MIN_SCALE) // limit to scaleExtent min

    // Only zoom if we're not at min scale
    if (newScale === currentTransform.k) return

    // Use the zoom behavior's convenience method to scale
    zoomBehavior.scaleTo(selection, newScale)
  }

  const handleReset = () => {
    const canvas = canvasRef.current
    if (!canvas || !zoomBehavior) return

    // Create a selection for the canvas
    const selection = select(canvas)

    // Reset to identity transform
    zoomBehavior.transform(selection, zoomIdentity)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 1,
        padding: 0.5
      }}
    >
      <IconButton onClick={handleZoomIn} size='small' color='primary'>
        <PlusBox />
      </IconButton>
      <IconButton onClick={handleZoomOut} size='small' color='primary'>
        <MinusBox />
      </IconButton>
      <IconButton onClick={handleReset} size='small' color='primary'>
        <RefreshCircle />
      </IconButton>
    </Box>
  )
}

export default ZoomControls
