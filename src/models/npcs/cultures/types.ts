import { TaggedEntity } from '../../utilities/codex/entities'
import { Hue } from '../../utilities/colors'
import { Directions } from '../../utilities/math/points'
import { Climate } from '../../world/climate/types'
import { Gender } from '../gender'
import { Language } from '../languages/types'

export interface Culture extends TaggedEntity {
  tag: 'culture'
  // neighboring cultures
  neighbors: number[]
  // origin region
  origin: number
  // cultural homelands (dialects)
  regions: number[]
  // species stats
  species:
    | 'human'
    | 'elf'
    | 'dwarf'
    | 'orlan'
    | 'firbolg'
    | 'orc'
    | 'ogre'
    | 'gnoll'
    | 'bovine'
    | 'feline'
    | 'avian'
    | 'draconic'
    | 'satyr'
  subspecies: string
  zone: Climate['zone']
  side: Directions
  // cultural traits
  civilized?: boolean
  language?: Language
  lineage: Gender
  religion?: number
  fashion: { color: Hue }
  // display colors (for maps)
  display: string
}
