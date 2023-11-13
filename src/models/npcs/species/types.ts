import { ClimateZone } from '../../world/climate/types'
import { Culture } from '../cultures/types'

export const species__ages = {
  fleeting: 0.8,
  average: 1,
  enduring: 1.2,
  venerable: 2,
  ancient: 3
}

export const species__heights = {
  small: 0.6,
  short: 0.8,
  average: 1,
  tall: 1.2,
  large: 1.5,
  giant: 1.8
}

export interface Species {
  traits: {
    skin: 'skin' | 'fur' | 'scales' | 'feathers'
    age: keyof typeof species__ages
    height: keyof typeof species__heights
    bmi: number
    horns?: boolean
    piercings?: boolean // defaults to true
    facialHair?: number
  }
  appearance: (_params: { latitude: number; eastern?: boolean; zone: ClimateZone }) => {
    skin: Culture['appearance']['skin']
    hair?: Omit<Culture['appearance']['hair'], 'styles'>
  }
}
