import { Climate, ClimateKey, ClimateZone } from './types'

const diurnalVariation: Record<Climate['diurnalVariation'], [number, number]> = {
  low: [10, 3],
  standard: [15, 3.5],
  high: [20, 4]
}

const holdridge: Record<ClimateKey, Climate> = {
  'rain forest (tropical)': {
    idx: 1,
    name: 'rain forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#1AFFA1',
    habitability: 0.1429,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#0000FE', code: 'Af' }
  },
  'wet forest (tropical)': {
    idx: 2,
    name: 'wet forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#3EFF91',
    habitability: 0.2857,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#0077FF', code: 'Am' }
  },
  'moist forest (tropical)': {
    idx: 3,
    name: 'moist forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#60FF81',
    habitability: 0.4286,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#0077FF', code: 'Am' }
  },
  'dry forest (tropical)': {
    idx: 4,
    name: 'dry forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#81FF81',
    habitability: 0.5714,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#46A9FA', code: 'Aw/As' }
  },
  'very dry forest (tropical)': {
    idx: 5,
    name: 'very dry forest',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#A1FF81',
    habitability: 0.2857,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#46A9FA', code: 'Aw/As' }
  },
  'thorn woodland (tropical)': {
    idx: 6,
    name: 'thorn woodland',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#C1FF81',
    habitability: 0.2286,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert scrub (tropical)': {
    idx: 7,
    name: 'desert scrub',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#E1FF81',
    habitability: 0.0571,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert (tropical)': {
    idx: 8,
    name: 'desert',
    latitude: 'tropical',
    altitude: 'lowlands',
    color: '#FFFF81',
    habitability: 0.0286,
    terrain: 'desert',
    diurnalVariation: 'high',
    koppen: { color: '#FE0000', code: 'BWh' }
  },
  'rain forest (subtropical)': {
    idx: 9,
    name: 'rain forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#1AE1C1',
    habitability: 0.5714,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#C6FF4E', code: 'Cfa' }
  },
  'wet forest (subtropical)': {
    idx: 10,
    name: 'wet forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#3EE191',
    habitability: 0.7143,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#C6FF4E', code: 'Cfa' }
  },
  'moist forest (subtropical)': {
    idx: 11,
    name: 'moist forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#60E181',
    habitability: 0.8571,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#96FF96', code: 'Cwa' }
  },
  'dry forest (subtropical)': {
    idx: 12,
    name: 'dry forest',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#81E181',
    habitability: 0.7143,
    terrain: 'forest',
    diurnalVariation: 'low',
    koppen: { color: '#FFFF00', code: 'Csa' }
  },
  'thorn steppe (subtropical)': {
    idx: 13,
    name: 'thorn steppe',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#A1E181',
    habitability: 0.4286,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert scrub (subtropical)': {
    idx: 14,
    name: 'desert scrub',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#C1E181',
    habitability: 0.0857,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert (subtropical)': {
    idx: 15,
    name: 'desert',
    latitude: 'subtropical',
    altitude: 'highlands',
    color: '#E1E181',
    habitability: 0.0286,
    terrain: 'desert',
    diurnalVariation: 'high',
    koppen: { color: '#FE0000', code: 'BWh' }
  },
  'rain forest (warm temperate)': {
    idx: 16,
    name: 'rain forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#1AE1C1',
    habitability: 0.7143,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#C6FF4E', code: 'Cfa' }
  },
  'wet forest (warm temperate)': {
    idx: 17,
    name: 'wet forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#3EE191',
    habitability: 0.8571,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#C6FF4E', code: 'Cfa' }
  },
  'moist forest (warm temperate)': {
    idx: 18,
    name: 'moist forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#60E181',
    habitability: 1,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#96FF96', code: 'Cwa' }
  },
  'dry forest (warm temperate)': {
    idx: 19,
    name: 'dry forest',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#81E181',
    habitability: 0.8571,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#C6C700', code: 'Csb' }
  },
  'thorn steppe (warm temperate)': {
    idx: 20,
    name: 'thorn steppe',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#A1E181',
    habitability: 0.5714,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert scrub (warm temperate)': {
    idx: 21,
    name: 'desert scrub',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#C1E181',
    habitability: 0.1429,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#F5A301', code: 'BSh' }
  },
  'desert (warm temperate)': {
    idx: 22,
    name: 'desert',
    latitude: 'warm temperate',
    altitude: 'lower montane',
    color: '#E1E181',
    habitability: 0.0571,
    terrain: 'desert',
    diurnalVariation: 'high',
    koppen: { color: '#FE0000', code: 'BWh' }
  },
  'rain forest (cool temperate)': {
    idx: 23,
    name: 'rain forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#1AC1C1',
    habitability: 0.5714,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#66FF33', code: 'Cfb' }
  },
  'wet forest (cool temperate)': {
    idx: 24,
    name: 'wet forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#3EC191',
    habitability: 0.7143,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#ABB1FF', code: 'Dwa' }
  },
  'moist forest (cool temperate)': {
    idx: 25,
    name: 'moist forest',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#60C181',
    habitability: 0.8571,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#ABB1FF', code: 'Dwa' }
  },
  'steppe (cool temperate)': {
    idx: 26,
    name: 'steppe',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#81C181',
    habitability: 0.4543,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#FFDB63', code: 'BSk' }
  },
  'desert scrub (cool temperate)': {
    idx: 27,
    name: 'desert scrub',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#A1C181',
    habitability: 0.1143,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#FFDB63', code: 'BSk' }
  },
  'desert (cool temperate)': {
    idx: 28,
    name: 'desert',
    latitude: 'cool temperate',
    altitude: 'montane',
    color: '#C1C181',
    habitability: 0.0571,
    terrain: 'desert',
    diurnalVariation: 'high',
    koppen: { color: '#FE9695', code: 'BWk' }
  },
  'rain forest (boreal)': {
    idx: 29,
    name: 'rain forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#1AA1C1',
    habitability: 0.2286,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#007E7D', code: 'Dfc' }
  },
  'wet forest (boreal)': {
    idx: 30,
    name: 'wet forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#3EA191',
    habitability: 0.2857,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#007E7D', code: 'Dfc' }
  },
  'moist forest (boreal)': {
    idx: 31,
    name: 'moist forest',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#60A181',
    habitability: 0.3429,
    terrain: 'forest',
    diurnalVariation: 'standard',
    koppen: { color: '#007E7D', code: 'Dfc' }
  },
  'dry scrub (boreal)': {
    idx: 32,
    name: 'dry scrub',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#81A181',
    habitability: 0.1429,
    terrain: 'plains',
    diurnalVariation: 'standard',
    koppen: { color: '#FFDB63', code: 'BSk' }
  },
  'desert (boreal)': {
    idx: 33,
    name: 'desert',
    latitude: 'boreal',
    altitude: 'subalpine',
    color: '#A1A181',
    habitability: 0.0286,
    terrain: 'desert',
    diurnalVariation: 'high',
    koppen: { color: '#FE9695', code: 'BWk' }
  },
  'rain tundra (subpolar)': {
    idx: 34,
    name: 'rain tundra',
    latitude: 'subpolar',
    altitude: 'alpine',
    color: '#1A81C1',
    habitability: 0.0286,
    terrain: 'tundra',
    diurnalVariation: 'standard',
    koppen: { color: '#B2B2B2', code: 'ET' }
  },
  'wet tundra (subpolar)': {
    idx: 35,
    name: 'wet tundra',
    latitude: 'subpolar',
    altitude: 'alpine',
    color: '#3E8191',
    habitability: 0.0286,
    terrain: 'tundra',
    diurnalVariation: 'standard',
    koppen: { color: '#B2B2B2', code: 'ET' }
  },
  'moist tundra (subpolar)': {
    idx: 36,
    name: 'moist tundra',
    latitude: 'subpolar',
    altitude: 'alpine',
    color: '#608181',
    habitability: 0.0286,
    terrain: 'tundra',
    diurnalVariation: 'standard',
    koppen: { color: '#B2B2B2', code: 'ET' }
  },
  'dry tundra (subpolar)': {
    idx: 37,
    name: 'dry tundra',
    latitude: 'subpolar',
    altitude: 'alpine',
    color: '#818181',
    habitability: 0.0143,
    terrain: 'tundra',
    diurnalVariation: 'standard',
    koppen: { color: '#B2B2B2', code: 'ET' }
  },
  'desert (polar)': {
    idx: 38,
    name: 'glacial',
    latitude: 'polar',
    altitude: 'ice cap',
    color: '#FFFFFF',
    habitability: 0.0057,
    terrain: 'glacier',
    diurnalVariation: 'high',
    koppen: { color: '#686868', code: 'EF' }
  }
}

const zones: Record<Climate['latitude'], ClimateZone> = {
  tropical: 'tropical',
  subtropical: 'tropical',
  'warm temperate': 'temperate',
  'cool temperate': 'temperate',
  boreal: 'arctic',
  subpolar: 'arctic',
  polar: 'arctic'
}

export const CLIMATE = {
  holdridge,
  zone: zones,
  diurnalVariation: (climate: Climate) => diurnalVariation[climate.diurnalVariation]
}
