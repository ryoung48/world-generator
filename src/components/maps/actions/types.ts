import { GeoProjection, ZoomTransform } from 'd3'

type ActionParams = { projection: GeoProjection; node: Element }

export type ZoomParams = ActionParams & {
  onMove: (_p: { rotation: [number, number]; scale: number }) => void
}

export type ZoomEvent = { transform: ZoomTransform }

export type MouseoverParams = ActionParams & {
  onMove: (_p: { x: number; y: number }) => void
}

export type MoveToParams = ActionParams & { scale: number; x: number; y: number }
