import { Gender } from '../../actors/types'
import { ClimateZone } from '../../cells/climate/types'
import { Region } from '../../regions/types'
import { AllColors, ColorHue } from '../../utilities/color'
import { WeightedDistribution } from '../../utilities/math/dice/types'

export type SpeciesKey =
  | 'human'
  | 'elf'
  | 'dwarf'
  | 'orc'
  | 'orlan'
  | 'bovine'
  | 'feline'
  | 'avian'
  | 'draconic'
  | 'goblin'
  | 'hobgoblin'
  | 'ogre'
  | 'gnoll'
  | 'vulpine'

export type SpeciesAppearance = {
  skin: {
    colors: (AllColors | 'fair' | 'pale')[]
    texture?: string
  }
  eyes: {
    colors: (ColorHue | 'hazel')[]
  }
  hair?: {
    textures: ('straight' | 'wavy' | 'curly' | 'kinky')[]
    colors: ('white' | 'blond' | 'red' | 'auburn' | 'brown' | 'black')[]
    styles?: Record<
      Gender,
      WeightedDistribution<'long' | 'short' | 'ponytail' | 'topknot' | 'braided' | 'bun'>
    >
  }
  facialHair?: {
    chance: number
    styles: `${'trimmed' | 'full' | 'thick' | 'braided'} beard`[]
  }
}

export interface Species {
  traits: {
    skin: 'skin' | 'fur' | 'scales' | 'feathers'
    age: 'fleeting' | 'average' | 'enduring' | 'venerable' | 'ancient'
    height: 'short' | 'small' | 'average' | 'tall' | 'large' | 'giant'
    bmi: number
    horns?: boolean
    piercings?: boolean // defaults to true
    facialHair?: number
  }
  appearance: (_params: { latitude: number; eastern?: boolean; zone: ClimateZone }) => {
    skin: SpeciesAppearance['skin']
    hair?: Omit<SpeciesAppearance['hair'], 'styles'>
  }
}

export type SpeciesAppearanceParams = {
  region: Region
  species: SpeciesKey
}
