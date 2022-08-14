export type draw_styles = 'Nations' | 'Climate' | 'Tech' | 'Cultures' | 'Religions'

export const canvas__map_styles = {
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

export const canvas__breakpoints = {
  regional: 40,
  global: 10
}
