import { Biome, BiomeDetails, Climate, ClimateClassifyParams } from './types'

const diurnalVariation: Record<'low' | 'standard' | 'extreme', [number, number]> = {
  low: [10, 3],
  standard: [15, 3.5],
  extreme: [20, 4]
}

const holdridge: Record<Biome, BiomeDetails> = {
  'rain forest (tropical)': {
    name: 'rain forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#1AFFA1'
  },
  'wet forest (tropical)': {
    name: 'wet forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#3EFF91'
  },
  'moist forest (tropical)': {
    name: 'moist forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#60FF81'
  },
  'dry forest (tropical)': {
    name: 'dry forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#81FF81'
  },
  'very dry forest (tropical)': {
    name: 'very dry forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#A1FF81'
  },
  'thorn woodland (tropical)': {
    name: 'thorn woodland',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#C1FF81'
  },
  'desert scrub (tropical)': {
    name: 'desert scrub',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#E1FF81'
  },
  'desert (tropical)': {
    name: 'desert',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#FFFF81'
  },
  'rain forest (subtropical)': {
    name: 'rain forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#1AE1C1'
  },
  'wet forest (subtropical)': {
    name: 'wet forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#3EE191'
  },
  'moist forest (subtropical)': {
    name: 'moist forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#60E181'
  },
  'dry forest (subtropical)': {
    name: 'dry forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#81E181'
  },
  'thorn steppe (subtropical)': {
    name: 'thorn steppe',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#A1E181'
  },
  'desert scrub (subtropical)': {
    name: 'desert scrub',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#C1E181'
  },
  'desert (subtropical)': {
    name: 'desert',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#E1E181'
  },
  'rain forest (warm temperate)': {
    name: 'rain forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#1AE1C1'
  },
  'wet forest (warm temperate)': {
    name: 'wet forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#3EE191'
  },
  'moist forest (warm temperate)': {
    name: 'moist forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#60E181'
  },
  'dry forest (warm temperate)': {
    name: 'dry forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#81E181'
  },
  'thorn steppe (warm temperate)': {
    name: 'thorn steppe',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#A1E181'
  },
  'desert scrub (warm temperate)': {
    name: 'desert scrub',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#C1E181'
  },
  'desert (warm temperate)': {
    name: 'desert',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#E1E181'
  },
  'rain forest (cool temperate)': {
    name: 'rain forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#1AC1C1'
  },
  'wet forest (cool temperate)': {
    name: 'wet forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#3EC191'
  },
  'moist forest (cool temperate)': {
    name: 'moist forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#60C181'
  },
  'steppe (cool temperate)': {
    name: 'steppe',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#81C181'
  },
  'desert scrub (cool temperate)': {
    name: 'desert scrub',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#A1C181'
  },
  'desert (cool temperate)': {
    name: 'desert',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#C1C181'
  },
  'rain forest (boreal)': {
    name: 'rain forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#1AA1C1'
  },
  'wet forest (boreal)': {
    name: 'wet forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#3EA191'
  },
  'moist forest (boreal)': {
    name: 'moist forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#60A181'
  },
  'dry scrub (boreal)': {
    name: 'dry scrub',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#81A181'
  },
  'desert (boreal)': {
    name: 'desert',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#A1A181'
  },
  'rain tundra (subarctic)': {
    name: 'rain tundra',
    latitude: 'subarctic',
    altitude: 'alpine',
    color: '#1A81C1'
  },
  'wet tundra (subarctic)': {
    name: 'wet tundra',
    latitude: 'subarctic',
    altitude: 'alpine',
    color: '#3E8191'
  },
  'moist tundra (subarctic)': {
    name: 'moist tundra',
    latitude: 'subarctic',
    altitude: 'alpine',
    color: '#608181'
  },
  'dry tundra (subarctic)': {
    name: 'dry tundra',
    latitude: 'subarctic',
    altitude: 'alpine',
    color: '#818181'
  },
  'desert (arctic)': {
    name: 'desert',
    latitude: 'arctic',
    altitude: 'ice cap',
    color: '#FFFFFF'
  }
}

const climates: Climate = {
  'tropical rainforest': {
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
    code: 'Csa',
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
    code: 'Cfb',
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
    code: 'Cfa',
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
    code: 'Cwa',
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
    code: 'ET',
    zone: 'arctic',
    display: 'hsl(0, 0%, 70%)',
    population: 0.3,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['glacial'],
    terrain: 'arctic'
  },
  'ice cap': {
    code: 'EF',
    zone: 'arctic',
    display: 'hsl(0, 0%, 41%)',
    population: 0.3,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['glacial'],
    terrain: 'arctic'
  }
}

export const CLIMATE = {
  classify: ({ region, location, latitude, continent, monsoon }: ClimateClassifyParams) => {
    if (location === 'west_coast') {
      if (latitude < 5) {
        region.climate = 'tropical rainforest'
      } else if (latitude < 10) {
        region.climate = monsoon ? 'tropical monsoon' : 'tropical rainforest'
      } else if (latitude < 20) {
        region.climate = 'savanna'
      } else if (latitude < 30 && continent) {
        region.climate = 'hot desert'
      } else if (latitude < 35) {
        region.climate = 'hot steppe'
      } else if (latitude < 45) {
        region.climate = 'mediterranean'
      } else if (latitude < 60) {
        region.climate = 'oceanic'
      } else if (latitude < 75) {
        region.climate = 'subarctic'
      } else {
        region.climate = 'polar'
      }
    } else if (location === 'inland') {
      if (latitude < 10) {
        region.climate = 'tropical rainforest'
      } else if (latitude < 15) {
        region.climate = 'savanna'
      } else if (latitude < 30 && continent) {
        region.climate = 'hot desert'
      } else if (latitude < 35) {
        region.climate = 'hot steppe'
      } else if (latitude < 45 && continent) {
        region.climate = 'cold desert'
      } else if (latitude < 60) {
        region.climate = 'cold steppe'
      } else if (latitude < 75) {
        region.climate = 'subarctic'
      } else {
        region.climate = 'polar'
      }
    } else if (location === 'east_coast') {
      if (latitude < 5) {
        region.climate = 'tropical rainforest'
      } else if (latitude < 20) {
        region.climate = continent ? 'tropical monsoon' : 'tropical rainforest'
      } else if (latitude < 40) {
        region.climate = monsoon ? 'temperate monsoon' : 'subtropical'
      } else if (latitude < 60) {
        region.climate = monsoon ? 'manchurian' : 'laurentian'
      } else if (latitude < 75) {
        region.climate = monsoon ? 'siberian' : 'subarctic'
      } else {
        region.climate = 'polar'
      }
    }
  },
  glacierLatitudeCutoff: 80,
  lookup: climates,
  holdridge
}
