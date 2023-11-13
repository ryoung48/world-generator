import { Divider, Grid } from '@mui/material'
import { mean, pointer, select, zoom, ZoomBehavior, ZoomTransform } from 'd3'
import { useEffect, useRef, useState } from 'react'

import { BLUEPRINT } from '../../models/regions/provinces/blueprints'
import { BUILDING } from '../../models/regions/provinces/blueprints/buildings'
import { StyledText } from '../codex/common/text/StyledText'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { fonts } from '../theme/fonts'
import { HubPaintParams } from './types'

let zoomRef: ZoomBehavior<Element, unknown> = null

const paint = ({ canvas, province, transform }: HubPaintParams) => {
  const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D
  ctx.save()
  ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
  ctx.translate(transform.dx, transform.dy)
  ctx.scale(transform.scale, transform.scale)
  const font = fonts.maps
  const { blocks } = BLUEPRINT.get(province.idx)
  blocks.forEach(({ path, land }) => {
    const p = new Path2D(path)
    ctx.strokeStyle = !land ? 'rgba(4, 47, 83, 0.04)' : 'rgba(136, 136, 136, 0.1)'
    ctx.fillStyle = !land ? '#95b5b84c' : cssColors.background.cards
    ctx.fill(p)
    ctx.stroke(p)
  })
  const districts = blocks.filter(({ district }) => district)
  // draw buildings
  ctx.strokeStyle = 'white'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#caccbb'
  const averageArea = mean(blocks.map(({ area }) => area))
  const radius = averageArea ** 0.5 / 1.5
  ctx.lineWidth = radius * 0.2
  districts.forEach(({ structures }) => {
    structures.forEach(({ path }) => {
      const p = new Path2D(path)
      ctx.stroke(p)
      ctx.fill(p)
    })
  })
  // draw districts
  const showDistricts = BLUEPRINT.districts.cutoff(districts.length) > transform.scale
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
      ctx.font = `${radius * 1.25}px ${font}`
      ctx.fillText(idx.toString(), x, y + radius * 0.3)
    } else {
      ctx.lineWidth = radius * 0.08
      province.hub.map.districts[idx].buildings.forEach(({ x, y, idx }) => {
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(x, y, radius * 0.3, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.font = `${radius * 0.3}px ${font}`
        ctx.fillText(idx.toString(), x, y + radius * 0.05)
      })
    }
  })
  ctx.restore()
}

export function HubMap(props: { selected: boolean }) {
  if (!props.selected) return <span></span>
  const { state } = VIEW.context()
  const province = window.world.provinces[state.province]
  const { blocks, diagram } = BLUEPRINT.get(province.idx)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [transform, setTransform] = useState({
    dx: 0,
    dy: 0,
    scale: 1
  })
  const center = () => {
    const canvas = canvasRef.current
    // re-center
    const target = 2
    const districts = blocks.filter(({ district }) => district)
    const x = mean(districts.map(({ center }) => center[0]))
    const y = mean(districts.map(({ center }) => center[1]))
    const init = select(canvas as Element)
    zoomRef.scaleTo(init, target)
    zoomRef.translateTo(init, x, y)
    paint({ canvas: canvasRef, province, transform })
  }
  useEffect(() => {
    const node = canvasRef.current
    node.width = containerRef.current.clientWidth
    node.height = containerRef.current.clientHeight
    zoomRef = zoom()
      .scaleExtent([2, 200])
      .translateExtent([
        [0, 0],
        [BLUEPRINT.dimensions.w * 0.9, BLUEPRINT.dimensions.h * 0.9]
      ])
      .on('zoom', (event: { transform: ZoomTransform }) => {
        const { x, y, k } = event.transform
        setTransform({
          scale: k,
          dx: x,
          dy: y
        })
      })
    const init = select(node as Element)
    init.call(zoomRef)
  }, [])
  useEffect(() => {
    paint({ canvas: canvasRef, province, transform })
  }, [transform])
  useEffect(() => center(), [state.province, props.selected])
  const i = diagram.delaunay.find(cursor.x, cursor.y)
  const block = blocks[i]
  const neighbors = block.n.map(n => blocks[n])
  const zone = [block, ...neighbors]
    .filter(n => n.district)
    .map(block => province.hub.map.districts[block.district.idx])
    .sort((a, b) => a.idx - b.idx)
  const showDistricts =
    BLUEPRINT.districts.cutoff(Object.values(province.hub.map.districts).length) > transform.scale
  const selected = province.hub.map.districts[block?.district?.idx]
  const buildings = selected?.buildings ?? []
  const building = BUILDING.findClosest({
    buildings: buildings,
    point: { x: cursor.x, y: cursor.y }
  })
  return (
    <Grid container>
      <Grid item xs={12} ref={containerRef}>
        <Grid
          container
          sx={{
            zIndex: 2,
            position: 'absolute',
            top: BLUEPRINT.dimensions.h * 0.145 + 370,
            left: BLUEPRINT.dimensions.w * 1.05 + 635,
            fontFamily: fonts.maps,
            fontSize: 20,
            backgroundColor: 'rgba(238, 238, 221, 0.75)',
            width: 200,
            padding: 1
          }}
        >
          <Grid item xs={12}>
            {selected
              ? `District #${selected.idx}: ${selected.name} (${selected.type})`
              : block.land
              ? 'Outskirts'
              : 'Ocean'}
          </Grid>
          {building && (
            <Grid item xs={12}>
              {`Building #${building.idx}: ${building.type}, ${building.quality.desc}`}
            </Grid>
          )}
          <Grid item xs={12} mt={1}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <ol
              style={{
                listStylePosition: 'inside',
                paddingInlineStart: 0,
                marginBlockStart: 10,
                marginBlockEnd: 0
              }}
            >
              {showDistricts
                ? zone.map(district => (
                    <li key={district.idx} value={district.idx}>
                      <StyledText
                        text={`${district.name} (${BLUEPRINT.districts.decorate(district)})`}
                      ></StyledText>
                    </li>
                  ))
                : buildings.map(building => {
                    return (
                      <li
                        key={building.idx}
                        value={building.idx}
                      >{`${building.type}, ${building.quality.desc}`}</li>
                    )
                  })}
            </ol>
          </Grid>
        </Grid>
        <canvas
          ref={canvasRef}
          style={{
            backgroundColor: cssColors.background.cards,
            filter: 'url(#noiseFilter)',
            height: `${BLUEPRINT.dimensions.h}px`,
            width: `100%`,
            border: `3px double ${cssColors.subtitle}`
          }}
          onMouseMove={event => {
            const [clientX, clientY] = pointer(event)
            const nx = (clientX - transform.dx) / transform.scale
            const ny = (clientY - transform.dy) / transform.scale
            setCursor({ x: nx, y: ny })
          }}
        ></canvas>
      </Grid>
    </Grid>
  )
}
