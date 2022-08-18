/* eslint-disable no-unused-vars */
import { Terrain } from './terrain'

type zones = 'Arctic' | 'Temperate' | 'Tropical'

export type BasicClimate = 'Warm' | 'Temperate' | 'Cold'

export const enum climates {
  EQUATORIAL = 'Tropical Rainforest (Af)',
  TROPICAL_MONSOON = 'Tropical Monsoon (Am)',
  SAVANNA = 'Savanna (Aw)',
  HOT_STEPPE = 'Hot Steppe (BSh)',
  HOT_DESERT = 'Hot Desert (BWh)',
  COLD_DESERT = 'Cold Desert (BWk)',
  COLD_STEPPE = 'Cold Steppe (BSk)',
  SUBTROPICAL = 'Subtropical (Cfa)',
  TEMPERATE_MONSOON = 'Temperate Monsoon (Cwa)',
  MEDITERRANEAN = 'Mediterranean (Csa)',
  OCEANIC = 'Oceanic (Cfb)',
  CONTINENTAL = 'Laurentian (Dfa)',
  MANCHURIAN = 'Manchurian (Dwa)',
  SUBARCTIC = 'Subarctic (Dfc)',
  SIBERIAN = 'Siberian (Dwc)',
  POLAR = 'Polar (ET)'
}

export const rain = {
  dry: 0.05,
  low: 0.15,
  moderate: 0.25,
  wet: 0.4,
  humid: 0.8
}

const baseBiodiversity = 30

export interface Climate {
  type: climates
  zone: zones
  display: string
  population: number
  scorePenalty: number
  heatMod?: { summer: number; winter: number }
  diurnalHeat: [number, number]
  precipitation: [number, number]
  affixes: string[]
  terrain: Terrain
  biodiversity: number
}

const diurnalVariation: Record<'low' | 'standard' | 'extreme', [number, number]> = {
  low: [10, 3],
  standard: [15, 3.5],
  extreme: [20, 4]
}

export const climateLookup: Record<climates, Climate> = {
  [climates.EQUATORIAL]: {
    type: climates.EQUATORIAL,
    zone: 'Tropical',
    display: '#0000FE',
    population: 1,
    scorePenalty: 1.2,
    diurnalHeat: diurnalVariation.low,
    precipitation: [0.6, 0.3],
    affixes: ['Jungle'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 3
  },
  [climates.TROPICAL_MONSOON]: {
    type: climates.TROPICAL_MONSOON,
    zone: 'Tropical',
    population: 1.5,
    scorePenalty: 1,
    diurnalHeat: diurnalVariation.low,
    display: '#0077FF',
    precipitation: [0.8, 0.1],
    affixes: ['Jungle'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 3
  },
  [climates.SAVANNA]: {
    type: climates.SAVANNA,
    zone: 'Tropical',
    display: '#46A9FA',
    population: 1.5,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.1],
    affixes: ['Savanna'],
    terrain: 'Plains',
    biodiversity: baseBiodiversity * 2
  },
  [climates.HOT_STEPPE]: {
    type: climates.HOT_STEPPE,
    zone: 'Temperate',
    display: '#F5A301',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.2, 0.05],
    affixes: ['Steppe', 'Plains'],
    terrain: 'Plains',
    biodiversity: baseBiodiversity * 1.8
  },
  [climates.COLD_STEPPE]: {
    type: climates.COLD_STEPPE,
    zone: 'Temperate',
    display: '#FFDB63',
    population: 1,
    scorePenalty: 0.8,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['Steppe', 'Plains'],
    terrain: 'Plains',
    biodiversity: baseBiodiversity * 1.5
  },
  [climates.HOT_DESERT]: {
    type: climates.HOT_DESERT,
    zone: 'Tropical',
    display: '#FE0000',
    population: 0.5,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.extreme,
    precipitation: [0.1, 0.01],
    affixes: ['Desert'],
    terrain: 'Desert',
    heatMod: { summer: 10, winter: 0 },
    biodiversity: baseBiodiversity * 1.2
  },
  [climates.COLD_DESERT]: {
    type: climates.COLD_DESERT,
    zone: 'Temperate',
    display: '#FE9695',
    population: 0.5,
    scorePenalty: 1,
    diurnalHeat: diurnalVariation.extreme,
    precipitation: [0.1, 0.01],
    affixes: ['Desert'],
    terrain: 'Desert',
    heatMod: { summer: 10, winter: 0 },
    biodiversity: baseBiodiversity * 1.1
  },
  [climates.MEDITERRANEAN]: {
    type: climates.MEDITERRANEAN,
    zone: 'Temperate',
    display: '#FFFF00',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.1, 0.35],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2.2
  },
  [climates.OCEANIC]: {
    type: climates.OCEANIC,
    zone: 'Temperate',
    display: '#66FF33',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.6, 0.4],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2
  },
  [climates.SUBTROPICAL]: {
    type: climates.SUBTROPICAL,
    zone: 'Temperate',
    display: '#C6FF4E',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.5, 0.3],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2.2
  },
  [climates.TEMPERATE_MONSOON]: {
    type: climates.TEMPERATE_MONSOON,
    zone: 'Temperate',
    display: '#96FF96',
    population: 2.5,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -5 },
    precipitation: [0.6, 0.1],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2.2
  },
  [climates.CONTINENTAL]: {
    type: climates.CONTINENTAL,
    zone: 'Temperate',
    display: '#38C7FF',
    population: 3,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.4, 0.2],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2
  },
  [climates.MANCHURIAN]: {
    type: climates.MANCHURIAN,
    zone: 'Temperate',
    display: '#ABB1FF',
    population: 2,
    scorePenalty: 0,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['Forest'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 2.2
  },
  [climates.SUBARCTIC]: {
    type: climates.SUBARCTIC,
    zone: 'Arctic',
    display: '#007E7D',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.35, 0.15],
    affixes: ['Boreal', 'Taiga'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 1.5
  },
  [climates.SIBERIAN]: {
    type: climates.SIBERIAN,
    zone: 'Arctic',
    display: '#4C51B5',
    population: 1,
    scorePenalty: 0.4,
    diurnalHeat: diurnalVariation.standard,
    heatMod: { summer: 0, winter: -8 },
    precipitation: [0.35, 0.1],
    affixes: ['Boreal', 'Taiga'],
    terrain: 'Forest',
    biodiversity: baseBiodiversity * 1.5
  },
  [climates.POLAR]: {
    type: climates.POLAR,
    zone: 'Arctic',
    display: '#B2B2B2',
    population: 0.3,
    scorePenalty: 1.5,
    diurnalHeat: diurnalVariation.standard,
    precipitation: [0.15, 0.05],
    affixes: ['Glacial'],
    terrain: 'Desert',
    biodiversity: baseBiodiversity
  }
}
