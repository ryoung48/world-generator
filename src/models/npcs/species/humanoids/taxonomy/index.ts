import { Loc } from '../../../../regions/locations/types'
import { weighted_distribution } from '../../../../utilities/math'
import { world__gps } from '../../../../world'
import { Culture } from '../cultures/types'
import { humanoids__beastfolk } from './beastfolk'
import { humanoid__spawn } from './common'
import { eye_color, facial_hair, hair_styles } from './common/appearance'
import { humanoids__demihumans } from './demihumans'
import { Humanoid, humanoid__species } from './types'

export const humanoid__species_init = (): Record<humanoid__species, Humanoid> => ({
  ...humanoids__beastfolk,
  ...humanoids__demihumans,
  human: humanoid__spawn({
    name: 'human',
    age: 'average',
    height: 'average',
    bmi: 22,
    appearance: point => {
      const { latitude, longitude } = world__gps(point)
      const lat = Math.abs(latitude)
      const eastern = longitude >= 40
      const eyes = eye_color({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const hair = {
        textures: ['straight'],
        colors: ['black'],
        styles: hair_styles()
      }
      if (lat <= 18) {
        skin.colors = ['light brown', 'dark brown']
        hair.colors = ['brown', 'black']
        hair.textures = ['wavy', 'curly', 'kinky']
      } else if (lat > 18 && lat <= 32) {
        skin.colors = ['dark tan', 'light brown']
        hair.colors = ['brown', 'black']
        hair.textures = ['straight', 'wavy', 'curly']
      } else if (lat > 32 && lat <= 50) {
        skin.colors = ['light tan', 'dark tan']
        hair.colors = ['auburn', 'brown', 'black']
        hair.textures = window.dice.sample(['straight', 'wavy', 'curly'], 2)
      } else if (lat > 50 && lat <= 72) {
        skin.colors = ['fair', 'light tan']
        hair.colors = ['blond', 'red', 'brown', 'black']
        hair.textures = ['straight', window.dice.choice(['wavy', 'curly'])]
      } else {
        skin.colors = eastern ? ['light tan', 'dark tan'] : ['fair', 'light tan']
        hair.colors = eastern ? ['auburn', 'brown', 'black'] : ['blond', 'red', 'brown']
        hair.textures = ['straight']
      }
      return {
        skin,
        eyes,
        hair,
        facial_hair: facial_hair(),
        tattoos: true
      }
    }
  })
})

export const humanoid__species_dist = (count: number, tribal = true): humanoid__species[] => {
  const dist: weighted_distribution<humanoid__species> = tribal
    ? [
        { v: 'human', w: 3 },
        { v: 'dwarf', w: 1 },
        { v: 'orc', w: 1 },
        { v: 'ogre', w: 1 },
        { v: 'elf', w: 1 },
        { v: 'firbolg', w: 1 },
        { v: 'satyr', w: 1 },
        { v: 'orlan', w: 1 },
        { v: 'gnoll', w: 1 },
        { v: 'bovine', w: 1 },
        { v: 'feline', w: 1 },
        { v: 'avian', w: 1 },
        { v: 'draconic', w: 1 }
      ]
    : [
        { v: 'human', w: 8 },
        { v: 'dwarf', w: 1 },
        { v: 'orc', w: 1 },
        { v: 'elf', w: 1 }
      ]
  const total = dist.reduce((sum, { w }) => sum + w, 0)
  return window.dice.shuffle(
    dist
      .filter(({ w }) => w > 0)
      .map(({ v, w }) => Array<humanoid__species>(Math.ceil((w / total) * count)).fill(v))
      .flat()
  )
}

export const species__by_culture = (culture: Culture) => window.world.humanoids[culture.species]

export const species__finalize_culture = (params: { culture: Culture; capital: Loc }) => {
  const { culture, capital } = params
  const species = species__by_culture(culture)
  species.cultures.push(culture.idx)
  culture.appearance = species.appearance?.(capital)
}
