import { D3ZoomEvent, ZoomBehavior } from 'd3'
import { RefObject } from 'react'

export interface UrbanMapProps {
  city: {
    name: string
    type: string
  }
}

export interface TransformState {
  x: number
  y: number
  k: number
}

export interface LegendProps {
  x: number
  y: number
  city: {
    name: string
    type: string
  }
  transform?: TransformState
}

export interface ZoomControlsProps {
  zoomBehavior: ZoomBehavior<HTMLCanvasElement, unknown>
  canvasRef: RefObject<HTMLCanvasElement>
}

export type ZoomEventType = D3ZoomEvent<HTMLCanvasElement, unknown>
