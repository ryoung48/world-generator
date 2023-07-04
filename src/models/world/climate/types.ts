export const rain = {
  dry: 0.05,
  low: 0.15,
  moderate: 0.25,
  wet: 0.4,
  humid: 0.8
}

export interface Climate {
  name:
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

export const climates: Record<Climate['name'], Climate> = {
  'tropical rainforest': {
    name: 'tropical rainforest',
    code: 'Af',
    zone: 'tropical',
    display: 'hsl(240, 100%, 50%)',
    population: 1,
    scorePenalty: 1.2,
    diurnalHeat: diurnalVariation.low,
    precipitation: [0.6, 0.3],
    affixes: ['jungle'],
    terrain: 'forest'
  },
  'tropical monsoon': {
    name: 'tropical monsoon',
    code: 'Am',
    zone: 'tropical',
    population: 1.5,
    scorePenalty: 1,
    diurnalHeat: diurnalVariation.low,
    display: 'hsl(212, 100%, 50%)',
    precipitation: [0.8, 0.1],
    affixes: ['jungle'],
    terrain: 'forest'
  },
  savanna: {
    name: 'savanna',
    code: 'Aw',
    zone: 'tropical',
    display: 'hsl(207, 95%, 63%)',
    population: 1.5,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.1],
    affixes: ['savanna'],
    terrain: 'plains'
  },
  'hot steppe': {
    name: 'hot steppe',
    code: 'BSh',
    zone: 'temperate',
    display: 'hsl(40, 99%, 48%)',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.2, 0.05],
    affixes: ['steppe', 'plains'],
    terrain: 'plains'
  },
  'cold steppe': {
    name: 'cold steppe',
    code: 'BWh',
    zone: 'temperate',
    display: 'hsl(46, 100%, 69%)',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['steppe', 'plains'],
    terrain: 'plains'
  },
  'hot desert': {
    name: 'hot desert',
    code: 'BWk',
    zone: 'tropical',
    display: 'hsl(0, 100%, 50%)',
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
    name: 'cold desert',
    code: 'BSk',
    zone: 'temperate',
    display: 'hsl(1, 98%, 79%)',
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
    name: 'mediterranean',
    code: 'Cfa',
    zone: 'temperate',
    display: 'hsl(60, 100%, 50%)',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.1, 0.35],
    affixes: ['forest'],
    terrain: 'forest'
  },
  oceanic: {
    name: 'oceanic',
    code: 'Cwa',
    zone: 'temperate',
    display: 'hsl(105, 100%, 60%)',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.6, 0.4],
    affixes: ['forest'],
    terrain: 'forest'
  },
  subtropical: {
    name: 'subtropical',
    code: 'Csa',
    zone: 'temperate',
    display: 'hsl(79, 100%, 65%)',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.5, 0.3],
    affixes: ['forest'],
    terrain: 'forest'
  },
  'temperate monsoon': {
    name: 'temperate monsoon',
    code: 'Cfb',
    zone: 'temperate',
    display: 'hsl(120, 100%, 80%)',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -5 },
    precipitation: [0.6, 0.1],
    affixes: ['forest'],
    terrain: 'forest'
  },
  laurentian: {
    name: 'laurentian',
    code: 'Dfa',
    zone: 'temperate',
    display: 'hsl(197, 100%, 61%)',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.2],
    affixes: ['forest'],
    terrain: 'forest'
  },
  manchurian: {
    name: 'manchurian',
    code: 'Dwa',
    zone: 'temperate',
    display: 'hsl(236, 100%, 84%)',
    population: 2,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['forest'],
    terrain: 'forest'
  },
  subarctic: {
    name: 'subarctic',
    code: 'Dfc',
    zone: 'arctic',
    display: 'hsl(180, 100%, 25%)',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.35, 0.15],
    affixes: ['boreal'],
    terrain: 'forest'
  },
  siberian: {
    name: 'siberian',
    code: 'Dwc',
    zone: 'arctic',
    display: 'hsl(237, 42%, 51%)',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['boreal'],
    terrain: 'forest'
  },
  polar: {
    name: 'polar',
    code: 'ET',
    zone: 'arctic',
    display: 'hsl(0, 0%, 70%)',
    population: 0.3,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['glacial'],
    terrain: 'arctic'
  }
}

export const glacierLatitudeCutoff = 80
