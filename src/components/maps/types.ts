import { MAP } from './common'

export type MapStyle = typeof MAP.styles[number]
export type MapSeason = typeof MAP.seasons[number]
export type CachedImages = Record<string, HTMLImageElement>
