export const map__styles = ['Nations', 'Cultures', 'Religions', 'Climate', 'Government'] as const
export type MapStyle = typeof map__styles[number]

export type CachedImages = Record<string, HTMLImageElement>
