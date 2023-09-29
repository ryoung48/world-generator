export type MapStyle = typeof MAP.styles[number]
export type MapSeason = typeof MAP.seasons[number]
export type CachedImages = Record<string, HTMLImageElement>

export const MAP = {
  styles: [
    'Nations',
    'Cultures',
    'Religions',
    'Climate',
    'Elevation',
    'Rain',
    'Temperature'
  ] as const,
  seasons: ['Summer', 'Winter'] as const,
  oceans: {
    color: '#e6edef',
    waves: '88, 103, 117'
  },
  lakes: {
    border: { color: '#d5dde0', waves: '41, 74, 84' },
    interior: { color: '#e6edef', waves: '41, 84, 94' }
  },
  roads: {
    sea: '128, 128, 128'
  },
  breakpoints: {
    regional: 30,
    global: 3
  }
}
