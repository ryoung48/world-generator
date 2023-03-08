export const rain = {
  dry: 0.05,
  low: 0.15,
  moderate: 0.25,
  wet: 0.4,
  humid: 0.8
}

export interface Climate {
  type:
    | 'tropical rainforest'
    | 'tropical monsoon'
    | 'savanna'
    | 'hot steppe'
    | 'hot desert'
    | 'cold desert'
    | 'cold steppe'
    | 'subtropical'
    | 'temperate monsoon'
    | 'mediterranean'
    | 'oceanic'
    | 'laurentian'
    | 'manchurian'
    | 'subarctic'
    | 'siberian'
    | 'polar'
  zone: 'arctic' | 'temperate' | 'tropical'
  code: string
  display: string
  population: number
  scorePenalty: number
  heatMod?: { summer: number; winter: number }
  diurnalHeat: [number, number]
  precipitation: [number, number]
  affixes: string[]
  terrain: 'forest' | 'plains' | 'desert' | 'arctic'
  arid?: boolean
}

const diurnalVariation: Record<'low' | 'standard' | 'extreme', [number, number]> = {
  low: [10, 3],
  standard: [15, 3.5],
  extreme: [20, 4]
}

export const climates: Record<Climate['type'], Climate> = {
  'tropical rainforest': {
    type: 'tropical rainforest',
    code: 'Af',
    zone: 'tropical',
    display: '#0000FE',
    population: 1,
    scorePenalty: 1.2,
    diurnalHeat: diurnalVariation.low,
    precipitation: [0.6, 0.3],
    affixes: ['jungle'],
    terrain: 'forest'
  },
  'tropical monsoon': {
    type: 'tropical monsoon',
    code: 'Am',
    zone: 'tropical',
    population: 1.5,
    scorePenalty: 1,
    diurnalHeat: diurnalVariation.low,
    display: '#0077FF',
    precipitation: [0.8, 0.1],
    affixes: ['jungle'],
    terrain: 'forest'
  },
  savanna: {
    type: 'savanna',
    code: 'Aw',
    zone: 'tropical',
    display: '#46A9FA',
    population: 1.5,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.1],
    affixes: ['savanna'],
    terrain: 'plains'
  },
  'hot steppe': {
    type: 'hot steppe',
    code: 'BSh',
    zone: 'temperate',
    display: '#F5A301',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.2, 0.05],
    affixes: ['steppe', 'plains'],
    terrain: 'plains'
  },
  'cold steppe': {
    type: 'cold steppe',
    code: 'BWh',
    zone: 'temperate',
    display: '#FFDB63',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['steppe', 'plains'],
    terrain: 'plains'
  },
  'hot desert': {
    type: 'hot desert',
    code: 'BWk',
    zone: 'tropical',
    display: '#FE0000',
    population: 0.5,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.extreme,
    precipitation: [0.1, 0.01],
    affixes: ['desert'],
    terrain: 'desert',
    heatMod: { summer: 10, winter: 0 },
    arid: true
  },
  'cold desert': {
    type: 'cold steppe',
    code: 'BSk',
    zone: 'temperate',
    display: '#FE9695',
    population: 0.5,
    scorePenalty: 1,
    diurnalHeat: diurnalVariation.extreme,
    precipitation: [0.1, 0.01],
    affixes: ['desert'],
    terrain: 'desert',
    heatMod: { summer: 10, winter: 0 },
    arid: true
  },
  mediterranean: {
    type: 'mediterranean',
    code: 'Cfa',
    zone: 'temperate',
    display: '#FFFF00',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.1, 0.35],
    affixes: ['forest'],
    terrain: 'forest'
  },
  oceanic: {
    type: 'oceanic',
    code: 'Cwa',
    zone: 'temperate',
    display: '#66FF33',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.6, 0.4],
    affixes: ['forest'],
    terrain: 'forest'
  },
  subtropical: {
    type: 'subtropical',
    code: 'Csa',
    zone: 'temperate',
    display: '#C6FF4E',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.5, 0.3],
    affixes: ['forest'],
    terrain: 'forest'
  },
  'temperate monsoon': {
    type: 'temperate monsoon',
    code: 'Cfb',
    zone: 'temperate',
    display: '#96FF96',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -5 },
    precipitation: [0.6, 0.1],
    affixes: ['forest'],
    terrain: 'forest'
  },
  laurentian: {
    type: 'laurentian',
    code: 'Dfa',
    zone: 'temperate',
    display: '#38C7FF',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.2],
    affixes: ['forest'],
    terrain: 'forest'
  },
  manchurian: {
    type: 'manchurian',
    code: 'Dwa',
    zone: 'temperate',
    display: '#ABB1FF',
    population: 2,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['forest'],
    terrain: 'forest'
  },
  subarctic: {
    type: 'subarctic',
    code: 'Dfc',
    zone: 'arctic',
    display: '#007E7D',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.35, 0.15],
    affixes: ['boreal'],
    terrain: 'forest'
  },
  siberian: {
    type: 'siberian',
    code: 'Dwc',
    zone: 'arctic',
    display: '#4C51B5',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['boreal'],
    terrain: 'forest'
  },
  polar: {
    type: 'polar',
    code: 'ET',
    zone: 'arctic',
    display: '#B2B2B2',
    population: 0.3,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['glacial'],
    terrain: 'arctic'
  }
}

export const glacierLatitudeCutoff = 80
