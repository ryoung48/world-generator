import { Box, Grid } from '@mui/material'
import { pointer, select, zoom, ZoomBehavior, zoomIdentity } from 'd3'
import React, { useEffect, useRef, useState } from 'react'

import { fonts } from '../theme/fonts'
import { BLUEPRINT } from '../world/blueprints'
import { BLUEPRINT_CONSTANTS } from '../world/blueprints/constants'
import { DISTRICT } from '../world/blueprints/districts'
import Legend from './legend'
import { TransformState, UrbanMapProps, ZoomEventType } from './types'
import ZoomControls from './zoom-controls'

const dimensions = BLUEPRINT_CONSTANTS.dimensions
const fontFamily = fonts.maps

const UrbanMap: React.FC<UrbanMapProps> = ({ city }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoomBehaviorRef = useRef<ZoomBehavior<HTMLCanvasElement, unknown>>(null)
  const [transform, setTransform] = useState<TransformState>({ x: 0, y: 0, k: 1 })
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isZoomInitialized, setIsZoomInitialized] = useState(false)

  // Calculate the position of a gate between two points
  const calculateGatePosition = (p1: [number, number], p2: [number, number]) => {
    // Find the midpoint between the two points
    const midX = (p1[0] + p2[0]) / 2
    const midY = (p1[1] + p2[1]) / 2

    // Calculate the direction vector from p1 to p2
    const dirX = p2[0] - p1[0]
    const dirY = p2[1] - p1[1]

    // Normalize the direction vector
    const length = Math.sqrt(dirX * dirX + dirY * dirY)
    const normDirX = dirX / length
    const normDirY = dirY / length

    // Calculate perpendicular vector (rotate 90 degrees)
    const perpDirX = -normDirY
    const perpDirY = normDirX

    return {
      mid: [midX, midY],
      dir: [normDirX, normDirY],
      perp: [perpDirX, perpDirY],
      length
    }
  }

  // Draw a gate at the specified edge
  const drawGate = (
    ctx: CanvasRenderingContext2D,
    p1: [number, number],
    p2: [number, number],
    radius: number
  ) => {
    const { mid, dir, perp, length } = calculateGatePosition(p1, p2)

    if (length < radius * 4) {
      // Edge is too short for a gate, just place a single marker
      ctx.beginPath()
      ctx.arc(mid[0], mid[1], radius * 0.5, 0, 2 * Math.PI)
      ctx.fillStyle = '#555555'
      ctx.fill()
      ctx.strokeStyle = 'black'
      ctx.lineWidth = radius * 0.1
      ctx.stroke()
      return
    }

    // Gate dimensions
    const gateWidth = radius * 1.6 // Increased to create more space
    const gateHeight = radius * 1.0

    // Calculate the positions for the towers with a gap between them
    // Towers are positioned further apart but with the opening centered on the wall
    const tower1X = mid[0] - dir[0] * (gateWidth / 2)
    const tower1Y = mid[1] - dir[1] * (gateWidth / 2)
    const tower2X = mid[0] + dir[0] * (gateWidth / 2)
    const tower2Y = mid[1] + dir[1] * (gateWidth / 2)

    // Draw the wall segments on either side of the gate
    ctx.beginPath()
    // First wall segment - from p1 to tower1
    if (Math.abs(p1[0] - tower1X) > radius * 0.5 || Math.abs(p1[1] - tower1Y) > radius * 0.5) {
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(tower1X, tower1Y)
    }

    // Second wall segment - from tower2 to p2
    if (Math.abs(p2[0] - tower2X) > radius * 0.5 || Math.abs(p2[1] - tower2Y) > radius * 0.5) {
      ctx.moveTo(tower2X, tower2Y)
      ctx.lineTo(p2[0], p2[1])
    }

    ctx.strokeStyle = '#555555'
    ctx.lineWidth = radius * 0.6
    ctx.stroke()

    // Draw the gate opening (path or road)
    ctx.beginPath()
    ctx.moveTo(tower1X, tower1Y)
    ctx.lineTo(tower2X, tower2Y)
    ctx.strokeStyle = '#999999' // Lighter color for the opening
    ctx.lineWidth = radius * 0.6
    ctx.stroke()

    // Calculate the tower points to create a square perpendicular to the wall
    const makeSquarePoints = (centerX: number, centerY: number) => {
      // Half of the square's side length
      const half = gateHeight / 2

      // Calculate corners of the square using direction and perpendicular vectors
      return [
        [centerX + perp[0] * half - dir[0] * half, centerY + perp[1] * half - dir[1] * half],
        [centerX + perp[0] * half + dir[0] * half, centerY + perp[1] * half + dir[1] * half],
        [centerX - perp[0] * half + dir[0] * half, centerY - perp[1] * half + dir[1] * half],
        [centerX - perp[0] * half - dir[0] * half, centerY - perp[1] * half - dir[1] * half]
      ]
    }

    // Get points for both towers
    const tower1Points = makeSquarePoints(tower1X, tower1Y)
    const tower2Points = makeSquarePoints(tower2X, tower2Y)

    // Draw both towers
    const drawTower = (points: number[][]) => {
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1])
      }
      ctx.closePath()
      ctx.fillStyle = '#555555'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = radius * 0.1
      ctx.fill()
      ctx.stroke()
    }

    drawTower(tower1Points)
    drawTower(tower2Points)
  }

  const paintCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the canvas
    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply transform
    ctx.translate(transform.x, transform.y)
    ctx.scale(transform.k, transform.k)

    const { blocks, districts: d, wall } = BLUEPRINT.spawn()
    blocks.forEach(({ path, land }) => {
      const p = new Path2D(path)
      ctx.strokeStyle = !land ? 'rgba(4, 47, 83, 0.04)' : 'rgba(136, 136, 136, 0.1)'
      ctx.fillStyle = !land ? '#95b5b84c' : '#ffffff'
      ctx.fill(p)
      ctx.stroke(p)
    })

    const districts = blocks
      .filter(({ district }) => district)
      .filter(({ type }) => type !== 'river')

    // Draw buildings
    ctx.strokeStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#caccbb'
    const averageArea = districts.reduce((sum, { area }) => sum + area, 0) / districts.length
    const radius = Math.sqrt(averageArea) / 1.5
    ctx.lineWidth = radius * 0.2

    districts.forEach(({ structures }) => {
      structures.forEach(({ path }) => {
        const p = new Path2D(path)
        ctx.stroke(p)
        ctx.fill(p)
      })
    })

    // Draw districts
    const showDistricts = DISTRICT.cutoff({ count: districts.length }) > transform.k
    ctx.lineWidth = radius * 0.3
    districts.forEach(({ district: { path } }) => {
      const p = new Path2D(path)
      ctx.stroke(p)
    })

    districts.forEach(({ district: { idx }, center: [x, y] }) => {
      ctx.lineWidth = radius * 0.3
      ctx.fillStyle = 'black'
      if (showDistricts) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.font = `${radius * 1.25}px ${fontFamily}`
        ctx.fillText(idx.toString(), x, y + radius * 0.3)
      } else {
        ctx.lineWidth = radius * 0.08
        d[idx].buildings.forEach(({ x, y, idx }) => {
          ctx.fillStyle = 'black'
          ctx.beginPath()
          ctx.arc(x, y, radius * 0.3, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = 'white'
          ctx.font = `${radius * 0.3}px ${fontFamily}`
          ctx.fillText(idx.toString(), x, y + radius * 0.05)
        })
      }
    })

    // Draw city wall
    if (wall && wall.length > 0) {
      const wallPath = new Path2D()

      // Move to the first point
      wallPath.moveTo(wall[0][0], wall[0][1])

      // Draw lines to each subsequent point
      for (let i = 1; i < wall.length; i++) {
        wallPath.lineTo(wall[i][0], wall[i][1])
      }

      // If the wall forms a complete loop, close the path
      if (
        wall.length > 2 &&
        wall[0][0] === wall[wall.length - 1][0] &&
        wall[0][1] === wall[wall.length - 1][1]
      ) {
        wallPath.closePath()
      }

      // Draw the wall
      ctx.strokeStyle = '#555555'
      ctx.lineWidth = radius * 0.5
      ctx.stroke(wallPath)

      // Draw circular towers at each wall joint
      const towerRadius = radius * 0.5 // Make towers slightly larger than district markers

      // First pass to draw tower shadows/outlines
      wall.forEach((point, i) => {
        // Skip the last point if it's the same as the first (prevents double drawing at loop closure)
        if (i === wall.length - 1 && point[0] === wall[0][0] && point[1] === wall[0][1]) {
          return
        }

        ctx.beginPath()
        ctx.arc(point[0], point[1], towerRadius, 0, 2 * Math.PI)
        ctx.fillStyle = '#555555' // Dark gray shadow
        ctx.fill()
      })

      // Second pass to draw the actual towers
      wall.forEach((point, i) => {
        // Skip the last point if it's the same as the first (prevents double drawing at loop closure)
        if (i === wall.length - 1 && point[0] === wall[0][0] && point[1] === wall[0][1]) {
          return
        }

        ctx.beginPath()
        ctx.arc(point[0], point[1], towerRadius * 0.9, 0, 2 * Math.PI)
        ctx.fillStyle = '#555555' // Gray for towers
        ctx.strokeStyle = 'black'
        ctx.lineWidth = radius * 0.1
        ctx.fill()
        ctx.stroke()
      })

      // Draw gates at gate districts
      const gateDistricts = Object.values(d).filter(
        district => district.type === 'gate' && district.gate !== undefined
      )

      gateDistricts.forEach(district => {
        // Find the gate block and district block
        const districtBlock = blocks.find(b => b.idx === district.block)
        const gateBlock = blocks.find(b => b.idx === district.gate)

        if (!districtBlock || !gateBlock) return

        // Find the best edge for the gate - an edge between the district and the gate block
        let bestEdgeStart: [number, number] | null = null
        let bestEdgeEnd: [number, number] | null = null
        let longestEdge = 0

        // Check all edges of the district block
        for (let i = 0; i < districtBlock.data.length; i++) {
          const current = districtBlock.data[i]
          const next = districtBlock.data[(i + 1) % districtBlock.data.length]

          // Check if this edge is shared with the gate block
          for (let j = 0; j < gateBlock.data.length; j++) {
            const gCurrent = gateBlock.data[j]
            const gNext = gateBlock.data[(j + 1) % gateBlock.data.length]

            const isSharedEdge =
              (current[0] === gCurrent[0] &&
                current[1] === gCurrent[1] &&
                next[0] === gNext[0] &&
                next[1] === gNext[1]) ||
              (current[0] === gNext[0] &&
                current[1] === gNext[1] &&
                next[0] === gCurrent[0] &&
                next[1] === gCurrent[1])

            if (isSharedEdge) {
              // Calculate edge length
              const length = Math.sqrt(
                Math.pow(next[0] - current[0], 2) + Math.pow(next[1] - current[1], 2)
              )

              // If this is longer than our current best edge, use it
              if (length > longestEdge) {
                longestEdge = length
                bestEdgeStart = current
                bestEdgeEnd = next
              }
            }
          }
        }

        // Draw the gate if we found a valid edge
        if (bestEdgeStart && bestEdgeEnd) {
          drawGate(ctx, bestEdgeStart, bestEdgeEnd, radius * 0.75)
        }
      })
    }

    // Restore canvas state
    ctx.restore()
  }

  const resize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.w * dpr
    canvas.height = dimensions.h * dpr
    canvas.style.width = `${dimensions.w}px`
    canvas.style.height = `${dimensions.h}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }

  const drawMap = () => {
    paintCanvas()
  }

  const setupZoom = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize zoom behavior with extent constraints
    const zoomInstance = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([1, 200]) // min/max zoom levels
      .translateExtent([
        [0, 0],
        [dimensions.w, dimensions.h]
      ])
      .on('zoom', (event: ZoomEventType) => {
        // Update state with the transform from the event
        setTransform({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k
        })
      })

    // Save zoom behavior reference
    zoomBehaviorRef.current = zoomInstance

    // Apply zoom behavior to canvas
    select(canvas).call(zoomInstance)

    // Reset zoom when double clicked
    select(canvas).on('dblclick.zoom', () => {
      select(canvas).call(zoomInstance.transform, zoomIdentity)
    })

    // Track mouse position
    select(canvas).on('mousemove', event => {
      const [screenX, screenY] = pointer(event)

      // Convert screen coordinates to map coordinates by inverting the transform
      const untransformedX = (screenX - transform.x) / transform.k
      const untransformedY = (screenY - transform.y) / transform.k

      setCursorPosition({ x: untransformedX, y: untransformedY })
    })

    setIsZoomInitialized(true)
  }

  // Initialize once on mount
  useEffect(() => {
    resize()
    setupZoom()
    drawMap()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Redraw when transform changes
  useEffect(() => {
    drawMap()

    // Also update cursor position when transform changes to maintain accuracy
    const canvas = canvasRef.current
    if (canvas) {
      const handler = (e: MouseEvent) => {
        const [screenX, screenY] = pointer(e, canvas)
        const untransformedX = (screenX - transform.x) / transform.k
        const untransformedY = (screenY - transform.y) / transform.k
        setCursorPosition({ x: untransformedX, y: untransformedY })
      }

      canvas.addEventListener('mousemove', handler)
      return () => {
        canvas.removeEventListener('mousemove', handler)
      }
    }
  }, [transform])

  return (
    <Grid container wrap='wrap'>
      <Grid item xs={3}>
        <Legend x={cursorPosition.x} y={cursorPosition.y} city={city} transform={transform} />
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            position: 'relative',
            height: `${dimensions.h}px`,
            width: `${dimensions.w}px`,
            overflow: 'hidden'
          }}
        >
          <Box
            component='canvas'
            ref={canvasRef}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#ffffff',
              cursor: 'move'
            }}
          />
          {isZoomInitialized && zoomBehaviorRef.current && (
            <ZoomControls zoomBehavior={zoomBehaviorRef.current} canvasRef={canvasRef} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default UrbanMap
