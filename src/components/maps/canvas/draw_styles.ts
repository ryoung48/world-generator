export type DrawStyles = 'Nations' | 'Climate' | 'Tech' | 'Cultures' | 'Religions'

export const map__styles = {
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
  }
}

export const map__breakpoints = {
  regional: 30,
  global: 5
}
